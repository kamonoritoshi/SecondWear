import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import EmojiPicker from "emoji-picker-react";
import "./css/ChatRoom.css";

export default function ChatRoom() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [chatMessages, setChatMessages] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const chatEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  const stompClientRef = useRef(null);

  const token = localStorage.getItem("jwtToken");
  const accountId = currentUser?.accountId;
  const API_URL = "http://localhost:8080";

  // Redirect nếu chưa login
  useEffect(() => {
    if (!token || !currentUser) {
      navigate("/login");
    }
  }, [token, currentUser, navigate]);

  // Auto scroll xuống cuối khi có message mới
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // ✅ Helper: merge + lọc trùng messages
  const mergeUniqueMessages = (prev, incoming) => {
    const merged = [...prev, ...incoming];
    const unique = merged.filter(
      (msg, index, self) =>
        index ===
        self.findIndex(
          (m) =>
            (m.id && msg.id && m.id === msg.id) ||
            (!msg.id &&
              m.senderId === msg.senderId &&
              m.content === msg.content &&
              m.timestamp === msg.timestamp)
        )
    );
    return unique.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  // ✅ Helper: cập nhật room theo roomId
  const updateRoomPosition = (roomId, updates = {}) => {
    setChatRooms((prevRooms) => {
      const updatedRooms = prevRooms
        .map((r) =>
          Number(r.roomId) === Number(roomId)
            ? { ...r, ...updates }
            : r
        )
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      return updatedRooms;
    });
  };

  // ✅ Load danh sách phòng ban đầu
  useEffect(() => {
    if (!accountId) return;

    fetch(`${API_URL}/api/chat/rooms/${accountId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) =>
        setChatRooms(
          data
            .map((room) => ({
              ...room,
              // ⚡ Ưu tiên lấy roomName từ BE
              roomName: room.roomName || "Không rõ",
              // ⚡ Chuẩn hóa lastMessage
              lastMessage:
                room.messageType === "IMAGE"
                  ? "[Hình ảnh]"
                  : room.messageType === "PRODUCT"
                    ? "[Sản phẩm]"
                    : room.lastMessage || "...",
            }))
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        )
      )
      .catch((err) => console.error("❌ Lỗi fetch rooms:", err));
  }, [accountId, token]);

  // ✅ Load tin nhắn trong phòng
  useEffect(() => {
    if (!token || !roomId) return;

    setChatMessages([]);

    fetch(`${API_URL}/api/chat/room/${roomId}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) =>
        setChatMessages((prev) => mergeUniqueMessages(prev, data))
      )
      .catch((err) => console.error("Lỗi load tin nhắn:", err));
  }, [roomId, token]);

  // ✅ Khi click đổi phòng → gọi API markAsRead
  useEffect(() => {
    if (!roomId || !accountId) return;

    fetch(`${API_URL}/api/chat/room/${roomId}/read?accountId=${accountId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        updateRoomPosition(roomId, { unread: 0 });
      })
      .catch((err) => console.error("❌ Lỗi markAsRead:", err));
  }, [roomId, accountId, token]);

  // ✅ WebSocket realtime: tin nhắn trong phòng + danh sách phòng
  useEffect(() => {
    if (!accountId) return;

    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 300,
      onConnect: () => {
        // Realtime tin nhắn trong phòng
        if (roomId) {
          stompClient.subscribe(`/topic/chat/${roomId}`, (message) => {
            const newMsg = JSON.parse(message.body);
            setChatMessages((prev) => mergeUniqueMessages(prev, [newMsg]));

            updateRoomPosition(roomId, {
              lastMessage:
                newMsg.messageType === "IMAGE" ? "[Hình ảnh]" : newMsg.content,
              unread: 0, // đang mở phòng thì reset unread
              timestamp: newMsg.timestamp,
            });
          });
        }

        // Realtime cập nhật danh sách phòng
        stompClient.subscribe(`/topic/rooms/${accountId}`, (message) => {
          const updatedRoom = JSON.parse(message.body);
          const lastMessage =
            updatedRoom.messageType === "IMAGE"
              ? "[Hình ảnh]"
              : updatedRoom.content;

          setChatRooms((prevRooms) => {
            const exists = prevRooms.find(
              (r) => Number(r.roomId) === Number(updatedRoom.roomId)
            );

            if (exists) {
              return prevRooms
                .map((r) => {
                  if (Number(r.roomId) === Number(updatedRoom.roomId)) {
                    return {
                      ...r,
                      lastMessage,
                      timestamp: updatedRoom.timestamp || r.timestamp,
                      unread:
                        Number(updatedRoom.roomId) === Number(roomId)
                          ? 0 // 👉 nếu đang mở thì reset 0
                          : (r.unread || 0) + 1, // 👉 nếu đang ở phòng khác thì chỉ cộng thêm 1
                      roomName: updatedRoom.roomName || r.roomName,
                      avatarUrl: updatedRoom.avatarUrl || r.avatarUrl,
                      buyerName: updatedRoom.buyerName || r.buyerName,
                    };
                  }
                  return r;
                })
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            }

            // 👉 Phòng mới thì thêm vào
            return [
              { ...updatedRoom, lastMessage, unread: 1 },
              ...prevRooms,
            ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          });

        });
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, [roomId, accountId]);

  // ✅ Gửi tin nhắn
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

      updateRoomPosition(roomId, {
        lastMessage: imageFile ? "[Hình ảnh]" : message.trim(),
        unread: 0,
      });
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
    }
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const currentRoom = chatRooms.find((r) => r.roomId === Number(roomId));
  const opponentName = currentRoom?.roomName;

  const formatTime = (time) =>
    new Date(time).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="chat-container">
      {/* Sidebar */}
      {showSidebar && (
        <div className={`chat-sidebar ${showSidebar ? "show" : "hide"}`}>
          <h3>
            <strong>ĐOẠN CHAT</strong>
          </h3>
          <ul>
            {chatRooms.map((room) => (
              <Link
                key={room.roomId}
                to={`/chat/${room.roomId}`}
                className="chat-room-link"
              >
                <li className={room.roomId === Number(roomId) ? "active" : ""}>
                  <div className="room-header">
                    <div className="room-name">{room.roomName}</div>
                    {room.unread > 0 && (
                      <span className="unread-badge">{room.unread}</span>
                    )}
                  </div>
                  <div className="last-message">
                    {room.lastMessage || "..."}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}

      {/* Main Chat */}
      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-header-left">
            <button
              className="toggle-sidebar"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill="var(--main-text)"
              >
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </svg>
            </button>
            <span className="chat-opponent">{opponentName}</span>
          </div>
        </div>

        <div className="chat-messages" ref={chatBoxRef}>
          {chatMessages.map((msg, idx) => {
            const isMine = msg.senderId === accountId;
            return (
              <div
                key={msg.chatId || `${msg.senderId}-${msg.timestamp}-${idx}`}
                className={`chat-message ${isMine ? "mine" : ""}`}
              >
                {msg.messageType === "PRODUCT" && (
                  <div className="product-bubble">
                    {msg.productImageUrl && (
                      <img
                        src={msg.productImageUrl}
                        alt={msg.productName}
                        className="product-thumb"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    )}
                    <div>
                      <strong>{msg.productName}</strong>
                      <p>{msg.productPrice?.toLocaleString("vi-VN")} ₫</p>
                      {msg.content && <p className="note">{msg.content}</p>}
                      <Link
                        to={`/products/${msg.productId}`}
                        className="view-btn"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                )}

                {msg.content && msg.messageType === "TEXT" && (
                  <div className="content">{msg.content}</div>
                )}

                {msg.messageType === "IMAGE" && msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="ảnh"
                    style={{ maxWidth: "200px", borderRadius: "8px" }}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}

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

        {/* Preview ảnh */}
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
