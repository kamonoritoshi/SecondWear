import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "./css/MessageList.css";

export default function MessageList() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const stompClientRef = useRef(null);

  const fetchChatRooms = async () => {
    try {
      const accountId = currentUser?.accountId;
      const token = localStorage.getItem("jwtToken");
      if (!accountId || !token) return;

      const res = await axios.get(`/api/chat/rooms/${accountId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      const formatted = data.map((room) => ({
        id: room.roomId,
        customer:
          currentUser.role === "seller" ? room.buyerName : room.sellerName,
        lastMessage: room.lastMessage || "(Chưa có tin nhắn)",
      }));

      setMessages(formatted);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách phòng chat:", err);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    fetchChatRooms(); // Fetch dữ liệu ban đầu

    // WebSocket setup
    // MessageList.jsxn
    const client = new Client({
      webSocketFactory: () => new WebSocket("ws://localhost:8080/ws"),
      reconnectDelay: 3000,
    });


    client.onConnect = () => {
      console.log("✅ WebSocket connected");

      // Subscribe để lắng nghe cập nhật lastMessage realtime
      client.subscribe("/topic/chat/rooms", (message) => {
        console.log("📨 Received message:", message.body);
        const { roomId, content } = JSON.parse(message.body);

        setMessages((prevMessages) =>
          prevMessages.map((room) =>
            room.id === roomId ? { ...room, lastMessage: content } : room
          )
        );
      });
    };

    client.onStompError = (frame) => {
      console.error("❌ STOMP error:", frame.headers["message"]);
    };

    client.activate();
    stompClientRef.current = client;

    return () => {
      stompClientRef.current?.deactivate();
    };
  }, [currentUser]);

  return (
    <div className="message-list-container">
      <h1>TIN NHẮN KHÁCH HÀNG</h1>
      {messages.length === 0 ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <ul className="message-list">
          {messages.map((msg) => (
            <li key={msg.id}>
              <div>
                <strong>{msg.customer}</strong>
                <p>{msg.lastMessage}</p>
              </div>
              <button
                className="btn-chat"
                onClick={() => navigate(`/chat/${msg.id}`)}
              >
                Chat
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
