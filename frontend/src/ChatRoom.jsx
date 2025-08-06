import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useParams } from "react-router-dom";
import "./css/ChatRoom.css";

export default function ChatRoom() {
  const { currentUser } = useAuth();
  const { roomId } = useParams();
  const [chatMessages, setChatMessages] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  const token = localStorage.getItem("jwtToken");
  const accountId = currentUser?.accountId; // ép kiểu ngay

  // Cuộn xuống cuối mỗi khi có tin nhắn mới
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // Load tin nhắn của phòng hiện tại
  useEffect(() => {
    if (!token) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat/room/${roomId}/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Lỗi ${res.status}`);
        const data = await res.json();
        console.log("Data: ", data)
        setChatMessages(data);
      } catch (err) {
        console.error("Lỗi load tin nhắn:", err);
      }
    };

    fetchMessages();
  }, [roomId, token]);

  // Load danh sách đoạn chat
  useEffect(() => {
    if (!token || !accountId) return;

    const fetchRooms = async () => {
      try {
        const res = await fetch(`/api/chat/rooms/${accountId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Lỗi ${res.status}`);
        const data = await res.json();
        setChatRooms(data);
      } catch (err) {
        console.error("Lỗi load danh sách phòng:", err);
      }
    };

    fetchRooms();
  }, [token, accountId]);

  // Gửi tin nhắn
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    if (!accountId || accountId <= 0) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    const msgObj = {
      content: message,
      senderId: accountId,
    };

    try {
      const res = await fetch(`/api/chat/room/${roomId}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(msgObj),
      });

      if (!res.ok) throw new Error(`Lỗi ${res.status}`);
      const newMsg = await res.json();
      setChatMessages((prev) => [...prev, newMsg]);
      setMessage("");
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
    }
  };

  const currentRoom = chatRooms.find((r) => r.roomId === Number(roomId));
  const opponentName =
    currentRoom &&
    (currentRoom.sellerName !== currentUser.name
      ? currentRoom.sellerName
      : currentRoom.buyerName);

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3>Đoạn chat</h3>
        <ul>
          {chatRooms.map((room) => (
            <li
              key={room.roomId}
              className={room.roomId === Number(roomId) ? "active" : ""}
            >
              <a href={`/chat/${room.roomId}`}>
                {room.sellerName && room.sellerName !== currentUser.name
                  ? room.sellerName
                  : room.buyerName}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-window">
        <div className="chat-header">
          {opponentName || `Phòng chat #${roomId}`}
        </div>

        <div className="chat-messages">
          {chatMessages.map((msg, idx) => {
            const isMine = msg.senderId === accountId;
            return (
              <div key={idx} className={`chat-message ${isMine ? "mine" : ""}`}>
                <div className="content">{msg.content}</div>
                <div className="timestamp">{formatTime(msg.timestamp)}</div>
              </div>
            );
          })}
          <div ref={chatEndRef}></div>
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={message}
            placeholder="Nhập tin nhắn..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Gửi</button>
        </div>
      </div>
    </div>
  );
}
