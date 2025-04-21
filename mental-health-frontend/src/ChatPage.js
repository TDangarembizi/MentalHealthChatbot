import React, { useEffect, useState } from 'react';
import ChatWindow from './ChatWindow';
import logo from './logo.svg';
import './ChatPage.css';

const ChatPage = () => {
  const userEmail = localStorage.getItem("userEmail")?.replace(/\./g, "_");
  const [sessionId, setSessionId] = useState(() => sessionStorage.getItem("chatSessionId") || null);
  const [messages, setMessages] = useState([]);
    const [sessions, setSessions] = useState([]);  // ← renamed from messages

    useEffect(() => {
  if (!sessionId) {
    const now = new Date();
    const newSessionId = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Save to sessionStorage and state
    sessionStorage.setItem("chatSessionId", newSessionId);
    setSessionId(newSessionId);

    // Update sessions immediately in frontend
    setSessions((prev) => {
      if (prev.includes(newSessionId)) return prev;
      const updated = [newSessionId, ...prev];
      return updated.sort((a, b) => {
        const dateA = new Date(`2025-${a.slice(3, 5)}-${a.slice(0, 2)}T${a.slice(6)}:00`);
        const dateB = new Date(`2025-${b.slice(3, 5)}-${b.slice(0, 2)}T${b.slice(6)}:00`);
        return dateB - dateA;
      });
    });
  }
}, []);


 useEffect(() => {
  if (userEmail) {
    fetch(`/chat-sessions?user_id=${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
  const sorted = (data.sessions || []).sort((a, b) => {
    // Convert strings like "21-04 19:22" into Date objects for comparison
    const dateA = new Date(`2025-${a.slice(3, 5)}-${a.slice(0, 2)}T${a.slice(6)}:00`);
    const dateB = new Date(`2025-${b.slice(3, 5)}-${b.slice(0, 2)}T${b.slice(6)}:00`);
    return dateB - dateA; // Most recent first
  });
  setSessions(sorted);
});

  }
}, [userEmail]);


 useEffect(() => {
  if (userEmail && sessionId) {
    fetch(`/chat-history?user_id=${userEmail}&session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
  const normalised = (data.messages || []).flatMap((entry) => {
    const parts = [{ text: entry.user_message, sender: "user" }];
    if (Array.isArray(entry.bot_response)) {
      parts.push(...entry.bot_response.map((res) => ({
        text: res.text,
        sender: "bot"
      })));
    }
    return parts;
  });

  setMessages(normalised);
})
      .catch((err) => console.error("Failed to load messages:", err));
  }
}, [userEmail, sessionId]);

 const startNewChat = () => {
  const now = new Date();
  const newSessionId = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

  sessionStorage.setItem("chatSessionId", newSessionId);
  setSessionId(newSessionId);
  setMessages([]); // Reset messages for new session

  setSessions((prev) => {
    if (prev.includes(newSessionId)) return prev;
    const updated = [newSessionId, ...prev];
    return updated.sort((a, b) => {
      const dateA = new Date(`2025-${a.slice(3, 5)}-${a.slice(0, 2)}T${a.slice(6)}:00`);
      const dateB = new Date(`2025-${b.slice(3, 5)}-${b.slice(0, 2)}T${b.slice(6)}:00`);
      return dateB - dateA;
    });
  });
};

  return (
    <div className="chat-layout">

      {/* Middle Column: Chat History */}
        <div className="chat-history-column">
            <button onClick={startNewChat} style={{marginBottom: '10px'}}>
                ➕ Start New Chat
            </button>

            <h3>Chat History</h3>
            <div className="chat-history-list">
                {sessions.map((id, index) => (
                    <div
                        key={index}
                        className={`chat-history-item ${id === sessionId ? "active" : ""}`}
                        onClick={() => {
                            sessionStorage.setItem("chatSessionId", id);
                            setSessionId(id);
                        }}
                    >
                        🗂️ {id}
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
