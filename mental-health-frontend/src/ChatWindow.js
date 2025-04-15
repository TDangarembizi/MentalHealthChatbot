import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import './ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  const recognitionRef = useRef(null);

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const messagesEndRef = useRef(null);

  const sendMessage = async (customInput = null) => {
  const rawInput = customInput ?? input;
  const messageToSend = typeof rawInput === 'string' ? rawInput.trim() : '';
  if (!messageToSend) return;

  const isVoice = !!customInput;  // Use local flag instead of state

  addMessage({ text: messageToSend, sender: 'user' });
  setInput('');

  try {
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: messageToSend, sender: 'user123' })
    });

    const botReplies = await response.json();
    if (Array.isArray(botReplies)) {
      botReplies.forEach((botMsg) => {
        if (botMsg.text) {
          addMessage({ text: botMsg.text, sender: 'bot' });
          if (isVoice) speak(botMsg.text); // ✅ use local flag
        }
      });
    } else {
      addMessage({ text: 'Unexpected response from bot.', sender: 'bot' });
    }
  } catch (err) {
    console.error('Chat error:', err);
    addMessage({ text: 'Bot is currently unavailable. Try again later.', sender: 'bot' });
  }
};

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-GB';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      setInput(transcript);
      setIsListening(false);
      sendMessage(transcript);
    };

    recognition.onerror = (e) => {
      console.error('Speech recognition error:', e.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;
    if (!isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="chat-window-container">
      <div className="chat-box">
        {messages.map((msg, i) => (
          <ChatMessage key={i} text={msg.text} sender={msg.sender} />
        ))}
        <div ref={messagesEndRef} />  {/* 👈 Scroll target */}
      </div>
      <div className="chat-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or speak..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={() => sendMessage()}>Send</button>
        {!isSafari && (
          <button onClick={handleMicClick}>
            {isListening ? "🎙️ Listening..." : "🎤"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
