import React, { useEffect, useState } from 'react';
import ChatWindow from './ChatWindow';
import logo from './logo.svg';
import './ChatPage.css';

const ChatPage = () => {
  const user_id = localStorage.getItem("userEmail") || "anonymous";
  const [sessionId, setSessionId] = useState(() => sessionStorage.getItem("chatSessionId") || null);
  const [messages, setMessages] = useState([]);

  // ✅ Generate sessionId if missing
  useEffect(() => {
    if (!sessionId) {
      const now = new Date();
      const newSessionId = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
      sessionStorage.setItem("chatSessionId", newSessionId);
      setSessionId(newSessionId);
    }
  }, [sessionId]);

  // ✅ Fetch chat history if sessionId exists
  useEffect(() => {
    if (!sessionId) return;

    fetch(`http://localhost:5000/chat-history?user_id=${user_id}&session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []));
  }, [sessionId, user_id]);

  return (
    <div className="chat-layout">

      {/* Middle Column: Chat History */}
      <div className="chat-history-column">
        <h3>Chat History</h3>
        <div className="chat-history-list">
          {messages.map((msg, index) => (
            <div key={index} className="chat-history-item">
              <p><strong>You:</strong> {msg.user_message}</p>
              {msg.bot_reply?.map((reply, i) => (
                <p key={i}><strong>Bot:</strong> {reply}</p>
              ))}
              <hr />
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Chat Interface */}
      <div className="chat-main">
        <div className="chat-header">
          <img src={logo} alt="Logo" className="app-logo" />
          <h1 className="app-title">Mental Health Chatbot</h1>
        </div>
        <ChatWindow
          sessionId={sessionId}
          setSessionId={(id) => {
            sessionStorage.setItem("chatSessionId", id);
            setSessionId(id);
          }}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
};

export default ChatPage;
