import React, { useEffect, useState } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [lightMode, setLightMode] = useState(() => {
    return localStorage.getItem('theme') === 'light';
  });

  useEffect(() => {
    if (lightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  }, [lightMode]);

  return (
    <div className="toggle-wrapper">
      light
      <label className="switch">
        <input
          type="checkbox"
          checked={!lightMode}
          onChange={() => setLightMode(!lightMode)}
        />
        <span className="slider round"></span>
      </label>
      dark
    </div>
  );
};

export default ThemeToggle;
