import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';
import ThemeToggle from './ThemeToggle';
import LoginSignup from './LoginSignup';
import ChatPage from './ChatPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <ThemeToggle />



      {isLoggedIn ? (
        <ChatPage />
      ) : (
        <LoginSignup onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
