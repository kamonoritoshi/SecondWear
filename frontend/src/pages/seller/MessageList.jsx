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

  // Format thời gian: trả về "x phút trước" hoặc giờ cụ thể
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // giây

    if (diff < 60) return "Vừa xong";
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;

    // Nếu khác ngày thì hiện ngày + giờ
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Hàm gọi API lấy danh sách phòng chat
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
        lastTime: room.lastTime || null,
        unreadCount: room.unreadCount || 0,
      }));

      // 👇 Sort: phòng nào có lastTime mới nhất thì nằm trên, null thì xuống dưới
      formatted.sort((a, b) => {
        if (!a.lastTime && !b.lastTime) return 0;
        if (!a.lastTime) return 1;
        if (!b.lastTime) return -1;
        return new Date(b.lastTime) - new Date(a.lastTime);
      });

      setMessages(formatted);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách phòng chat:", err);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    fetchChatRooms();

    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 300,
    });

    client.onConnect = () => {
      console.log("✅ WebSocket connected (MessageList)");

      client.subscribe("/topic/chat/rooms", (message) => {
        console.log("📨 Received update:", message.body);
        const { roomId, content, timestamp, unreadCount } = JSON.parse(message.body);

        setMessages((prevMessages) => {
          const updatedRoom = prevMessages.find((room) => room.id === roomId);
          if (!updatedRoom) return prevMessages;

          const newUnread =
            unreadCount !== undefined
              ? unreadCount
              : (updatedRoom.unreadCount || 0) + 1; // fallback chắc chắn không mất

          const newRoom = {
            ...updatedRoom,
            lastMessage: content,
            lastTime: timestamp,
            unreadCount: newUnread,
          };

          // Đưa room này lên đầu danh sách
          const filtered = prevMessages.filter((room) => room.id !== roomId);
          return [newRoom, ...filtered];
        });
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
                <small className="time-text">{formatTime(msg.lastTime)}</small>
              </div>
              <div className="chat-actions">
                {msg.unreadCount > 0 && (
                  <span className="badge">{msg.unreadCount}</span>
                )}
                <button
                  className="btn-chat"
                  onClick={() => navigate(`/chat/${msg.id}`)}
                >
                  Chat
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
