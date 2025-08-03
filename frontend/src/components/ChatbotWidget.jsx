import React, { useState, useEffect } from "react";
import "./ChatbotWidget.css";
import ChatBubble from "./ChatBubble";
import SuggestionCard from "./SuggestionCard";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const location = useLocation();

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("/api/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMessage = {
        from: "bot",
        text: data.reply,
        suggestions: data.suggestions || [],
      };

      const delay = Math.floor(Math.random() * 2000) + 3000; // 3000–5000ms

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
      }, delay);

      setInput(""); // vẫn reset input ngay sau khi gửi
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Xin lỗi, hệ thống đang bận." },
      ]);
    }
  };

  useEffect(() => {
    setIsOpen(false);
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 0) {
        setMessages([
          {
            from: "bot",
            text: "👋 Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
          },
        ]);
        setHasNewMessage(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
    
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  const getLastBotMessage = () => {
    const lastBot = [...messages].reverse().find((m) => m.from === "bot");
    return lastBot?.text || "";
  };

  return (
    <div className="chatbot-widget">
      {!isOpen ? (
        <div className="chatbot-toggle-wrapper">
          <button className="chatbot-toggle" onClick={toggleChat}>
            💬
            {hasNewMessage && <span className="chatbot-notify-dot"></span>}
          </button>
          {hasNewMessage && (
            <div className="chatbot-preview">
              {getLastBotMessage().length > 40
                ? getLastBotMessage().slice(0, 40) + "..."
                : getLastBotMessage()}
            </div>
          )}
        </div>
      ) : (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>Trợ lý SecondWear</span>
            <button className="chatbot-close" onClick={toggleChat}>
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) =>
              msg.from === "bot" ? (
                <div key={idx}>
                  <ChatBubble text={msg.text} from="bot" />
                  {msg.suggestions?.length > 0 && (
                    <div className="suggestion-list">
                      {msg.suggestions.map((item) => (
                        <SuggestionCard key={item.id} item={item} />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <ChatBubble key={idx} text={msg.text} from="user" />
              )
            )}
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Bạn cần hỏi gì?"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="chatbot-button" onClick={handleSend}>
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
