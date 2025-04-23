import React, { useState } from 'react';
import './Sidebar.css';
import userlogo from './userlogo.png';
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore, doc, deleteDoc, collection, getDocs } from "firebase/firestore";

const StarRating =({ userId }) => {
  const [rating, setRating] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const reset = () => {
    setRating(0);
    setComment('');
    setShowCommentBox(false);
    setSubmitted(false);
  };

  const handleStarClick = (star) => {
    setRating(star);
    setShowCommentBox(true);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    const user_id = userId;
    fetch('http://localhost:5000/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id,
        rating,
        comment,
        timestamp: new Date().toISOString()
      })
    })
      .then(res => res.json())
      .then(() => {
        setSubmitted(true);
        setTimeout(reset, 2000);
      });
  };

  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleStarClick(star)}
          className={star <= rating ? 'star filled' : 'star'}
        >
          {star <= rating ? '★' : '☆'}
        </button>
      ))}

      {showCommentBox && (
        <div className="comment-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <small>Leave a comment</small>
            <button
              onClick={reset}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.2rem',
                cursor: 'pointer',
                color: 'var(--text-color)',
              }}
              aria-label="Close feedback form"
            >
              ×
            </button>
          </div>

          <textarea
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {submitted && <p className="thank-you">Thanks for your feedback! 💙</p>}
    </div>
  );
};

const Sidebar = ({ setView, currentView, setIsLoggedIn }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [userId, setUserId] = useState(() => localStorage.getItem("uid"));
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail"));

React.useEffect(() => {
  const uid = localStorage.getItem("uid");
  const email = localStorage.getItem("userEmail");
  if (uid) setUserId(uid);
  if (email) setUserEmail(email);
}, []);

const handleThemeChange = (selectedTheme) => {
  setTheme(selectedTheme);
  document.body.classList.toggle('dark', selectedTheme === 'dark');
};

const savePreferences = () => {
  const user_id = userId;

  localStorage.setItem("theme", theme);

  document.body.classList.remove("light-mode");
  if (theme === "light") {
    document.body.classList.add("light-mode");
  }
  fetch("http://localhost:5000/save-preferences", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id,
      preferences: { theme }
    })
  })
    .then(res => res.json())
    .then((data) => {
      alert("Preferences saved to Firebase!");
    })
    .catch(() => {
      alert("Saved locally, but failed to sync with server.");
    });
};

React.useEffect(() => {
  const user_id = localStorage.getItem("uid");

  fetch(`http://localhost:5000/get-preferences?user_id=${user_id}`)
    .then(res => res.json())
    .then(data => {
      const savedTheme = data.preferences?.theme || "dark";
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.body.classList.add("light-mode");
      } else {
        document.body.classList.remove("light-mode");
      }
    });
}, []);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const handleLogout = () => {
     sessionStorage.removeItem('isLoggedIn');
     sessionStorage.removeItem('view');
     sessionStorage.removeItem('sessionId');
     sessionStorage.removeItem("chatSessionId");
     sessionStorage.clear();
     localStorage.clear();
      setIsLoggedIn(false);
  };

const deleteAcc = async () => {
  const user_id = localStorage.getItem("uid");
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  if (!user || !user_id) {
    alert("No authenticated user found.");
    return;
  }

  const subcollections = ["assessments", "journal", "messages", "mood"];

  try {
    for (const sub of subcollections) {
      const colRef = collection(db, "users", user_id, sub);
      const snapshot = await getDocs(colRef);
      for (const docSnap of snapshot.docs) {
        await deleteDoc(docSnap.ref);
      }
    }

    await deleteDoc(doc(db, "users", user_id));
    await deleteUser(user);

    alert("Account deleted successfully.");
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);

  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      alert("Please log in again before deleting your account.");
    } else {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting your account.");
    }
  }
};

const handleDeleteAccount = () => {
const user_id = localStorage.getItem("uid");
const userEmail = localStorage.getItem("userEmail");

  if (user_id === "anonymous") {
    alert("No user is currently signed in.");
    return;
  }

  const confirmed = window.confirm(
    `Are you sure you want to delete the account for ${userEmail}? This action cannot be undone.`
  );

  if (confirmed) {
    deleteAcc();
  } else {
    console.log("Deletion cancelled by user.");
  }
};

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img
          src={userlogo}
          alt="User Logo"
          className="user-logo"
          onClick={handleSettingsClick}
          style={{ cursor: 'pointer' }}
        />
        <h3><strong>Menu</strong></h3>
      </div>

      {showSettings && (
          <div className="settings-panel">
            <h4>Settings</h4>
            <p>Account: {userEmail}</p>
            <label>
              Theme:
              <select value={theme} onChange={(e) => handleThemeChange(e.target.value)}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
            <button onClick={savePreferences}>Save</button>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleDeleteAccount}>Delete Account</button>
          </div>

      )}

      <ul>
        <li className={currentView === 'dashboard' ? 'active' : ''} onClick={() => setView('dashboard')}>
          Home Dashboard
        </li>
        <li className={currentView === 'chat' ? 'active' : ''} onClick={() => setView('chat')}>
          Chat with Bot
        </li>
        <li className={currentView === 'assessment' ? 'active' : ''} onClick={() => setView('assessment')}>
          Self-Assessment
        </li>
        <li className={currentView === 'resources' ? 'active' : ''} onClick={() => setView('resources')}>
          Resources
        </li>
        <li className={currentView === 'coping' ? 'active' : ''} onClick={() => setView('coping')}>
          Coping Strategies
        </li>
        <li className={currentView === 'progress' ? 'active' : ''} onClick={() => setView('progress')}>
          Progress Tracker
        </li>
        <li className={currentView === 'emergency' ? 'active' : ''} onClick={() => setView('emergency')}>
          Emergency Contacts
        </li>
        <li className={currentView === 'about' ? 'active' : ''} onClick={() => setView('about')}>
          About
        </li>
      </ul>

      <div className="rating">
        <p>Rate the app!</p>
        <StarRating userId={userId} />
      </div>
    </div>
  );
};

export default Sidebar;
