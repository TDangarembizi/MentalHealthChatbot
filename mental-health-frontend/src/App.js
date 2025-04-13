import React, { useState } from 'react';
import './App.css';
import ThemeToggle from './ThemeToggle';
import LoginSignup from './LoginSignup';
import ChatPage from './ChatPage';
import Assessment from './Assessment';
import Dashboard from './Dashboard';
import Sidebar from "./Sidebar";
import MoodPopup from './MoodPopup';
import Resources from './Resources';
import Emergency from "./Emergency";
import Coping from "./Coping";
import Progress from './Progress';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState('dashboard');
  const [showMood, setShowMood] = useState(false);

  return (
  <div className="app-container">
    <ThemeToggle />
    {isLoggedIn ? (
      <>
        <Sidebar setView={setView} currentView={view} />
{showMood && <MoodPopup onClose={() => setShowMood(false)} />}

        <div className="main-content">
          {view === 'dashboard' && <Dashboard />}
          {view === 'chat' && <ChatPage />}
          {view === 'assessment' && <Assessment />}
          {view === 'resources' && <Resources setView={setView}/>}
          {view === 'emergency' && <Emergency />}
          {view === 'coping' && <Coping />}
          {view === 'progress' && <Progress />}

        </div>
      </>
    ) : (
      <LoginSignup onLogin={() => {
        setIsLoggedIn(true);
        setView('dashboard');
        setShowMood(true);
      }} />
    )}
  </div>
);

}

export default App;
