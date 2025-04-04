import React, { useState } from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input.trim();

    // Show user message
    addMessage({ text: userText, sender: 'user' });
    setInput('');

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, sender: 'user123' })
      });

      const botReplies = await response.json();

      if (Array.isArray(botReplies)) {
        botReplies.forEach(botMsg => {
          if (botMsg.text) {
            addMessage({ text: botMsg.text, sender: 'bot' });
          }
        });
      } else {
        addMessage({ text: 'Unexpected response from bot.', sender: 'bot' });
      }

    } catch (error) {
      console.error("Chat error:", error);
      addMessage({ text: 'Bot is currently unavailable. Try again later.', sender: 'bot' });
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chatbot</div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <ChatMessage key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
