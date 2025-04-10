import React, { useState } from 'react';
import './App.css';
import ThemeToggle from './ThemeToggle';
import LoginSignup from './LoginSignup';
import ChatPage from './ChatPage';
import Assessment from './Assessment';
import Dashboard from './Dashboard';
import Sidebar from "./Sidebar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('dashboard');

  return (
  <div className="app-container">
    <ThemeToggle />
    {isLoggedIn ? (
      <>
        <Sidebar setView={setView} currentView={view} />

        <div className="main-content">
          {view === 'dashboard' && <Dashboard />}
          {view === 'chat' && <ChatPage />}
          {view === 'assessment' && <Assessment />}
        </div>
      </>
    ) : (
      <LoginSignup onLogin={() => {
        setIsLoggedIn(true);
        setView('dashboard');
      }} />
    )}
  </div>
);

}

export default App;
