import React from 'react';
import './Advice.css'; // or your main styles

const About = ({ setView }) => {
  return (
    <div className="advice-container">
      <h1>About This App</h1>

      <section>
        <h2>What is This App?</h2>
        <p>
          This app is designed to support university students with their mental health and well-being.
          It offers a safe space to reflect, learn coping strategies, and seek guidance through a helpful chatbot assistant.
        </p>
      </section>

      <section>
        <h2>💡 Key Features</h2>
        <ul>
          <li><strong>🗣️ Chat with Bot:</strong> Get mental health support and suggestions through an AI-powered assistant.</li>
          <li><strong>📊 Self-Assessment:</strong> Reflect on your mood and track changes over time.</li>
          <li><strong>📚 Resources:</strong> Explore expert-backed advice from the NHS, WebMD, and StudentSpace.</li>
          <li><strong>📓 Journaling:</strong> Write your thoughts and feelings in a secure personal space.</li>
          <li><strong>📈 Progress Tracker:</strong> See visual patterns in your mental health journey.</li>
          <li><strong>⚙️ Preferences:</strong> Choose light or dark mode and tailor the experience to you.</li>
        </ul>
      </section>

      <section>
        <h2>🔐 Privacy & Data</h2>
        <p>
          Your data is stored securely in your personal account. Feedback and journal entries are private and only used to improve your experience. Nothing is shared or sold.
        </p>
      </section>

      <section>
        <h2>🤝 Support</h2>
        <p>
          If you are in crisis or need urgent help, please refer to our
            {' '}
    <span
      onClick={() => setView('emergency')}
      style={{
        color: 'var(--accent-color)',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
    >
      Emergency Contacts
    </span>{' '}
          section.
        </p>
      </section>
    </div>
  );
};

export default About;
