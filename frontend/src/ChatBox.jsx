import React, { useState } from "react";
import "./css/ChatBox.css";

export default function ChatBox({ customer, onClose }) {
  const [chatHistory, setChatHistory] = useState([
    { sender: "customer", text: "Xin chào, sản phẩm còn hàng không?" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setChatHistory([...chatHistory, { sender: "seller", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="chatbox-overlay">
      <div className="chatbox">
        <div className="chatbox-header">
          <h3>Chat với {customer}</h3>
          <button onClick={onClose} className="btn-close">X</button>
        </div>
        <div className="chatbox-messages">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chatbox-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
          />
          <button onClick={sendMessage} className="btn-send">Gửi</button>
        </div>
      </div>
    </div>
  );
}
