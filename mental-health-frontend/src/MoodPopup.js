import React, { useState } from 'react';
import './MoodPopup.css';

const moods = [
  { label: "😊 Happy", value: "happy" },
  { label: "😐 Okay", value: "okay" },
  { label: "😔 Sad", value: "sad" },
  { label: "😖 Stressed", value: "stressed" },
  { label: "😫 Exhausted", value: "exhausted" }
];

const MoodPopup = ({ onClose,setMoodUpdated }) => {
  const [selected, setSelected] = useState(null);

  const handleSubmit = async () => {
    const user_id = localStorage.getItem("uid");

    if (!selected || !user_id) return;

    const payload = {
      mood: selected,
      timestamp: new Date().toISOString()
    };

    await fetch(`http://localhost:5000/mood`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user_id, ...payload })
    });
    setMoodUpdated(true);

    onClose();
  };

  return (
    <div className="mood-modal">
      <div className="mood-content">
        <h3>How are you feeling today?</h3>
        <div className="mood-options">
          {moods.map(m => (
            <button
              key={m.value}
              className={selected === m.value ? 'selected' : ''}
              onClick={() => setSelected(m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
        <button onClick={handleSubmit} disabled={!selected}>Submit Mood</button>
      </div>
    </div>
  );
};

export default MoodPopup;
