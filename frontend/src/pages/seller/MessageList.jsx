import React, { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import "./css/MessageList.css";

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    // Giả lập API
    setTimeout(() => {
      setMessages([
        { id: 1, customer: "Nguyễn Văn A", lastMessage: "Sản phẩm còn hàng không?" },
        { id: 2, customer: "Trần Thị B", lastMessage: "Ship trong bao lâu vậy?" }
      ]);
    }, 1000);
  }, []);

  return (
    <div className="message-list-container">
      <h1>Tin nhắn khách hàng</h1>
      {messages.length === 0 ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <ul className="message-list">
          {messages.map(msg => (
            <li key={msg.id}>
              <div>
                <strong>{msg.customer}</strong>
                <p>{msg.lastMessage}</p>
              </div>
              <button className="btn-chat" onClick={() => setSelectedChat(msg)}>Chat</button>
            </li>
          ))}
        </ul>
      )}

      {selectedChat && (
        <ChatBox
          customer={selectedChat.customer}
          onClose={() => setSelectedChat(null)}
        />
      )}
    </div>
  );
}
