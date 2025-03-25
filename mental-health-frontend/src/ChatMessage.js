import React from 'react';

const ChatMessage = ({ text, sender }) => {
  return (
    <div className={`chat-message ${sender}`}>
      <span>{text}</span>
    </div>
  );
};

export default ChatMessage;
