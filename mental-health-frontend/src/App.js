import React, { useState, useEffect } from 'react';
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
import Study from "./Study";
import Sleep from "./Sleep";
import Presentations from "./Presentations";
import Homesickness from "./Homesickness";
import Budgeting from "./Budgeting";
import Social from "./Social";
import UKGuide from "./UKGuide";
import Depression from "./Depression";
import Anxiety from "./Anxiety";
import Wellbeing from "./Wellbeing";
import About from "./About";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });

  const [view, setView] = useState(() => {
    return sessionStorage.getItem('view') || 'dashboard';
  });

  const [showMood, setShowMood] = useState(false);
  const [moodUpdated, setMoodUpdated] = useState(false);

  // Persist login state
  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  // Persist view state
  useEffect(() => {
    sessionStorage.setItem('view', view);
  }, [view]);

  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    <div className="app-container">
      <ThemeToggle />
      {isLoggedIn ? (
        <>
          <Sidebar
            setView={setView}
            currentView={view}
            setIsLoggedIn={setIsLoggedIn}
          />
          {showMood && <MoodPopup onClose={() => setShowMood(false)} setMoodUpdated={setMoodUpdated} />}

          <div className="main-content">
            {view === 'dashboard' && <Dashboard moodUpdated={moodUpdated} setMoodUpdated={setMoodUpdated} />}
            {view === 'chat' && <ChatPage sessionId={sessionId} setSessionId={setSessionId} messages={messages} setMessages={setMessages}/>}
            {view === 'assessment' && <Assessment />}
            {view === 'resources' && <Resources setView={setView} />}
            {view === 'emergency' && <Emergency />}
            {view === 'coping' && <Coping />}
            {view === 'progress' && <Progress />}
            {view === 'study' && <Study setView={setView} />}
            {view === 'presentations' && <Presentations setView={setView} />}
            {view === 'homesickness' && <Homesickness setView={setView} />}
            {view === 'budgeting' && <Budgeting setView={setView} />}
            {view === 'sleep' && <Sleep setView={setView} />}
            {view === 'social' && <Social setView={setView} />}
            {view === 'ukguide' && <UKGuide setView={setView} />}
            {view === 'depression' && <Depression setView={setView} />}
            {view === 'anxiety' && <Anxiety setView={setView} />}
            {view === 'wellbeing' && <Wellbeing setView={setView} />}
            {view === 'about' && <About setView={setView} />}
          </div>
        </>
      ) : (
        <LoginSignup
          onLogin={() => {
            setIsLoggedIn(true);
            setView('dashboard');
            setShowMood(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
