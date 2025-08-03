const ChatBubble = ({ text, from }) => {
  const isUser = from === "user";
  return (
    <div className={`chat-row ${isUser ? "chat-row-user" : "chat-row-bot"}`}>
      <div className={`chat-bubble ${isUser ? "bubble-user" : "bubble-bot"}`}>
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
