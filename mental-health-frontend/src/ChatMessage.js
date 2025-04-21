import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ text, sender }) => {
      console.log("Rendering ChatMessage:", { text, sender }); // ✅ Debug log

  return (
    <div className={`chat-message ${sender}`}>
        <span>{text}</span>
    </div>
  );
};

export default ChatMessage;