import React, { useEffect, useState } from 'react';
import ChatWindow from './ChatWindow';
import logo from './logo.svg';
import './ChatPage.css';

const ChatPage = () => {
  const [user_id, setUserId] = useState(() => localStorage.getItem("uid"));
  const [sessionId, setSessionId] = useState(() => sessionStorage.getItem("chatSessionId") || null);
  const [messages, setMessages] = useState([]);
    const [sessions, setSessions] = useState([]);  // ← renamed from messages

    useEffect(() => {
  const storedUid = localStorage.getItem("uid");
  if (storedUid && storedUid !== user_id) {
    setUserId(storedUid);
  }
}, [user_id]);

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
  const loadChatSessions = async () => {
    if (user_id) {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`/chat-sessions?user_id=${user_id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();

        const sorted = (data.sessions || []).sort((a, b) => {
          // Convert strings like "21-04 19:22" to Date objects for sorting
          const dateA = new Date(`2025-${a.slice(3, 5)}-${a.slice(0, 2)}T${a.slice(6)}:00`);
          const dateB = new Date(`2025-${b.slice(3, 5)}-${b.slice(0, 2)}T${b.slice(6)}:00`);
          return dateB - dateA; // Most recent session first
        });

        setSessions(sorted);
      } catch (err) {
        console.error("Failed to fetch chat sessions:", err);
      }
    }
  };

  loadChatSessions();
}, [user_id]);


useEffect(() => {
  const loadChatHistory = async () => {
    if (user_id && sessionId) {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`/chat-history?user_id=${user_id}&session_id=${sessionId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();

        const normalised = (data.messages || []).flatMap((entry) => {
          const parts = [{ text: entry.user_message, sender: "user" }];
          if (Array.isArray(entry.bot_response)) {
            parts.push(
              ...entry.bot_response.map((res) => ({
                text: res.text,
                sender: "bot",
              }))
            );
          }
          return parts;
        });

        setMessages(normalised);
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    }
  };

  loadChatHistory();
}, [user_id, sessionId]);

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

 useEffect(() => {
  if (!sessionId && sessions.length > 0) {
    const latest = sessions[0];
    sessionStorage.setItem("chatSessionId", latest);
    setSessionId(latest);
  }
}, [sessions, sessionId]);

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