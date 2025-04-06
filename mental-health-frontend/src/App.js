import React, { useState } from 'react';
import './App.css';
import ThemeToggle from './ThemeToggle';
import LoginSignup from './LoginSignup';
import ChatPage from './ChatPage';
import Assessment from './Assessment';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('chat'); // 'chat' or 'assessment'

  return (
    <div>
      <ThemeToggle />

      {isLoggedIn ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={() => setView('chat')}>Chat</button>
            <button onClick={() => setView('assessment')}>Assessment</button>
          </div>
          {view === 'chat' ? <ChatPage /> : <Assessment />}
        </>
      ) : (
        <LoginSignup onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
