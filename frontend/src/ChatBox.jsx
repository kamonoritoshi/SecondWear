import { useEffect, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function ChatBox({ roomId, currentUser, onClose }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const stompClientRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/chat/${roomId}`, (msg) => {
        const body = JSON.parse(msg.body);
        setChatHistory((prev) => [...prev, body]);
      });
    });

    return () => {
      if (stompClient.connected) stompClient.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const messageObj = {
      senderId: currentUser.id,
      content: newMessage,
      chatRoom: { id: roomId }
    };
    stompClientRef.current.send("/app/chat.send", {}, JSON.stringify(messageObj));
    setNewMessage("");
  };

  return (
    <div className="chatbox-overlay">
      <div className="chatbox">
        <div className="chatbox-header">
          <h3>Chat</h3>
          <button onClick={onClose} className="btn-close">X</button>
        </div>
        <div className="chatbox-messages">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`message ${msg.senderId === currentUser.id ? "self" : "other"}`}>
              {msg.content}
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
          <button onClick={sendMessage}>Gửi</button>
        </div>
      </div>
    </div>
  );
}
