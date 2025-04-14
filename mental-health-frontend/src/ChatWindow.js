import React, { useState, useRef } from 'react';
import ChatMessage from './ChatMessage';
import './ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const recognitionRef = useRef(null);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
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
        botReplies.forEach((botMsg) => {
          if (botMsg.text) {
            addMessage({ text: botMsg.text, sender: 'bot' });
            speak(botMsg.text);
          }
        });
      } else {
        addMessage({ text: 'Unexpected response from bot.', sender: 'bot' });
        speak('Unexpected response from bot.');
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessage({ text: 'Bot is currently unavailable. Try again later.', sender: 'bot' });
      speak('Bot is currently unavailable. Try again later.');
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-GB';
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current.onerror = (e) => {
        console.error('Speech recognition error:', e.error);
      };
    }

    recognitionRef.current.start();
  };

  return (
    <div className="chat-window-container">
      <div className="chat-box">
        {messages.map((msg, i) => (
          <ChatMessage key={i} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <div className="chat-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or speak..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={startListening}>🎤</button>
      </div>
    </div>
  );
};

export default ChatWindow;
