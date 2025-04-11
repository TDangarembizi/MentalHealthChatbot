import React from 'react';
import './Resources.css';

const externalLinks = [
  {
    title: "Mind UK",
    url: "https://www.mind.org.uk",
    description: "Mental health charity offering information and support for people in England and Wales."
  },
  {
    title: "NHS Mental Health",
    url: "https://www.nhs.uk/mental-health/",
    description: "Official NHS advice and mental health services."
  },
  {
    title: "Samaritans",
    url: "https://www.samaritans.org",
    description: "Free 24/7 helpline for emotional support and crisis assistance."
  }
];

const tips = [
  {
    topic: "Sleep Hygiene",
    content: "Go to bed and wake up at consistent times. Avoid screens before bed, and keep your room cool and dark to improve sleep quality."
  },
  {
    topic: "Study Techniques",
    content: "Use the Pomodoro method: 25 minutes of focused work followed by 5-minute breaks. Plan your day the night before and avoid multitasking."
  },
  {
    topic: "Presentation Anxiety",
    content: "Practice aloud, visualise success, and breathe deeply before speaking. Reframe nerves as excitement to stay positive."
  },
  {
    topic: "Homesickness",
    content: "Keep in touch with family, personalise your space, and build new routines. Don’t isolate yourself — join clubs or talk to peers."
  },
  {
    topic: "Dealing with Feeling Overwhelmed",
    content: "Break tasks into small, achievable steps. Prioritise 1–3 key actions per day and allow time to rest without guilt."
  }
];

const Resources = () => {
  return (
    <div className="resources-container">
      <h2>📚 Mental Health & Wellbeing Resources</h2>

      <section className="resource-section">
        <h3>🌐 External Support Links</h3>
        <div className="resources-grid">
          {externalLinks.map((res, i) => (
            <div key={i} className="resource-card">
              <h4>{res.title}</h4>
              <p>{res.description}</p>
              <a href={res.url} target="_blank" rel="noreferrer">Visit Site →</a>
            </div>
          ))}
        </div>
      </section>

      <section className="resource-section">
        <h3>💡 Wellbeing Tips</h3>
        <div className="tips-grid">
          {tips.map((tip, i) => (
            <div key={i} className="tip-card">
              <h4>{tip.topic}</h4>
              <p>{tip.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Resources;
