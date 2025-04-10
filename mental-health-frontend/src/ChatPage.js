import React from 'react';
import ChatWindow from './ChatWindow';
import logo from './logo.svg';
import './ChatPage.css';

const ChatPage = () => {
  return (
    <div className="chat-layout">

      <div className="chat-main">
        <div className="chat-header">
          <img src={logo} alt="Logo" className="app-logo" />
          <h1 className="app-title">Mental Health Chatbot</h1>
        </div>
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;
