import React, { useState } from 'react';
import './Sidebar.css'

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

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3><strong>Menu</strong></h3>
      <ul>
        <li>Home Dashboard</li>
        <li>Chat with Bot</li>
        <li>Assess my mood</li>
        <li>Resources</li>
        <li>Coping Strategies</li>
        <li>Progress Tracker</li>
        <li>Emergency Contacts</li>
        <li>FAQs/About</li>
      </ul>
      <div className="rating">
        <p>Rate the app!</p>
        <StarRating />
      </div>
    </div>
  );
};

export default Sidebar;
