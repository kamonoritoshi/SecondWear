import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import EmojiPicker from "emoji-picker-react"; // 🎯 emoji picker
import "./css/ChatRoom.css";

export default function ChatRoom() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [chatMessages, setChatMessages] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imageFile, setImageFile] = useState(null); // 📸 ảnh upload
  const chatEndRef = useRef(null);
  const stompClientRef = useRef(null);

  const [showSidebar, setShowSidebar] = useState(true);

  const token = localStorage.getItem("jwtToken");
  const accountId = currentUser?.accountId;

  useEffect(() => {
    if (!token || !currentUser) {
      navigate("/login");
    }
  }, [token, currentUser, navigate]);

  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);


  const API_URL = "http://localhost:8080";
  // Load danh sách phòng
  useEffect(() => {
    if (!token || !accountId) return;

    fetch(`${API_URL}/api/chat/rooms/${accountId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setChatRooms(data))
      .catch((err) => console.error("Lỗi load danh sách phòng:", err));
  }, [token, accountId]);

  // Load tin nhắn của phòng
  useEffect(() => {
    if (!token || !roomId) return;

    fetch(`${API_URL}/api/chat/room/${roomId}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setChatMessages(data))
      .catch((err) => console.error("Lỗi load tin nhắn:", err));
  }, [roomId, token]);

  // WebSocket nhận tin nhắn realtime
  useEffect(() => {
    if (!roomId) return;

    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe(`/topic/chat/${roomId}`, (message) => {
          const newMsg = JSON.parse(message.body);
          setChatMessages((prev) => [...prev, newMsg]);
        });
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [roomId]);

  const handleSendMessage = async () => {
    if (!message.trim() && !imageFile) return;

    const formData = new FormData();
    formData.append("senderId", accountId);
    if (message.trim()) formData.append("content", message.trim());
    if (imageFile) formData.append("file", imageFile);

    try {
      const res = await fetch(`${API_URL}/api/chat/room/${roomId}/message`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error(`Lỗi ${res.status}`);

      setMessage("");
      setImageFile(null);
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
    }
  };


  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const currentRoom = chatRooms.find((r) => r.roomId === Number(roomId));
  const opponentName =
    currentRoom &&
    (currentRoom.sellerName !== currentUser.name
      ? currentRoom.sellerName
      : currentRoom.buyerName);

  const formatTime = (time) =>
    new Date(time).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="chat-container">
      {/* Sidebar */}
      {showSidebar && (
        <div className="chat-sidebar">
          <h3>Đoạn chat</h3>
          <ul>
            {chatRooms.map((room) => (
              <Link
                key={room.roomId}
                to={`/chat/${room.roomId}`}
                className="chat-room-link"
              >
                <li className={room.roomId === Number(roomId) ? "active" : ""}>
                  {room.sellerName && room.sellerName !== currentUser.name
                    ? room.sellerName
                    : room.buyerName}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}

      {/* Main Chat */}
      <div className="chat-window">
        {/* Header có nút ☰ */}
        <div className="chat-header">
          <button
            className="toggle-sidebar"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            ☰
          </button>
          {opponentName}
        </div>

        <div className="chat-messages" ref={chatBoxRef}>
          {chatMessages.map((msg, idx) => {
            const isMine = msg.senderId === accountId;
            return (
              <div key={idx} className={`chat-message ${isMine ? "mine" : ""}`}>
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="ảnh"
                    style={{ maxWidth: "200px", borderRadius: "8px" }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
                {msg.content && <div className="content">{msg.content}</div>}
                <div className="timestamp">{formatTime(msg.timestamp)}</div>
              </div>
            );
          })}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input */}
        <div className="chat-input">
          <button
            className="sendIcon"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😊
          </button>
          {showEmojiPicker && (
            <div className="emoji-picker-container">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
          <input
            type="text"
            value={message}
            placeholder="Nhập tin nhắn..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={{ display: "none" }}
            id="imageUpload"
          />
          <button onClick={handleSendMessage}>Gửi</button>
        </div>

        {/* Preview ảnh trước khi gửi */}
        {imageFile && (
          <div style={{ padding: "5px" }}>
            <img
              src={URL.createObjectURL(imageFile)}
              alt="preview"
              style={{ maxWidth: "100px", borderRadius: "5px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
