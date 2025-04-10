import React, { useState } from 'react';
import './Sidebar.css';
import userlogo from './userlogo.png';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className={star <= rating ? 'star filled' : 'star'}
        >
          {star <= rating ? '★' : '☆'}
        </button>
      ))}
    </div>
  );
};

const Sidebar = ({ setView, currentView }) => {
  const [showSettings, setShowSettings] = useState(false);


  const handleSettingsClick = () => {
    setShowSettings(!showSettings); // Toggle visibility
  };

  const handleLogout = () => {
  // Clear user data, tokens, session, etc.
  console.log("User logged out");

  // If you're using Firebase Auth:
  // import { getAuth, signOut } from "firebase/auth";
  // const auth = getAuth();
  // signOut(auth).then(() => {
  //   console.log("Signed out successfully");
  // });

  // Redirect to login screen if needed
  window.location.href = '/login';
};

  return (
      <div className="sidebar">
        <div className="sidebar-header">
          <img
              src={userlogo}
              alt="User Logo"
              className="user-logo"
              onClick={handleSettingsClick}
              style={{cursor: 'pointer'}}
          />
          <h3><strong>Menu</strong></h3>
        </div>

        {showSettings && (
            <div className="settings-panel">
              <h4>Settings</h4>
              <ul>
                <li>Profile</li>
                <li>Preferences</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
        )}

        <ul>
          <li className={currentView === 'dashboard' ? 'active' : ''} onClick={() => setView('dashboard')}>Home
            Dashboard
          </li>
          <li className={currentView === 'chat' ? 'active' : ''} onClick={() => setView('chat')}>Chat with Bot</li>
          <li className={currentView === 'assessment' ? 'active' : ''} onClick={() => setView('assessment')}> Self-Assessment
          </li>
          <li className={currentView === 'resources' ? 'active' : ''} onClick={() => setView('resources')}>Resources
          </li>
          <li className={currentView === 'coping' ? 'active' : ''} onClick={() => setView('coping')}>Coping Strategies
          </li>
          <li className={currentView === 'progress' ? 'active' : ''} onClick={() => setView('progress')}>Progress
            Tracker
          </li>
          <li className={currentView === 'emergency' ? 'active' : ''} onClick={() => setView('emergency')}>Emergency
            Contacts
          </li>
          <li className={currentView === 'about' ? 'active' : ''} onClick={() => setView('about')}>FAQs/About</li>
        </ul>


        <div className="rating">
          <p>Rate the app!</p>
          <StarRating/>
        </div>
      </div>
  );
};

export default Sidebar;
