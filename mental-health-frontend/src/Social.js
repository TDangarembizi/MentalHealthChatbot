import React from 'react';
import './Advice.css';

const Social = ({ setView }) => {
   return (
    <div className="advice-container">
      <button
        onClick={() => setView('resources')}
        style={{
          backgroundColor: 'transparent',
            border: '1px solid var(--text-color)',
            color: 'var(--text-color)',
            padding: '0.4rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '1.5rem',
            display: 'inline-block',
        }}
        aria-label="Back to Resources"
      >Back
      </button>
      <h1>Building Connections and Overcoming Social Anxiety</h1>

      <section>
        <h2>Building a Social Network at University</h2>
        <ul>
          <li className="advice-card">
            <strong>Identify Opportunities to Meet People:</strong> Explore various settings such as lectures, clubs, societies, and online forums where you can connect with others.
          </li>
          <li className="advice-card">
            <strong>Develop Strategies to Initiate Interactions:</strong> If approaching new people feels daunting, plan simple conversation starters or questions to ease into discussions.
          </li>
          <li className="advice-card">
            <strong>Continue Conversations Beyond Initial Meetings:</strong> Follow up with acquaintances by suggesting coffee meet-ups, study sessions, or group activities to strengthen connections.
          </li>
          <li className="advice-card">
            <strong>Align Social Activities with Personal Interests:</strong> Join clubs or groups that resonate with your hobbies to meet like-minded individuals.
          </li>
          <li className="advice-card">
            <strong>Segment Your Social Circles:</strong> Consider building different groups for various aspects of university life, such as study partners, sports teams, or career-focused networks.
          </li>
          <li className="advice-card">
            <strong>Document and Act on Your Social Plans:</strong> Writing down your goals can increase commitment and help identify areas to focus on.
          </li>
          <li className="advice-card">
            <strong>Take Immediate Steps:</strong> Implement one or two ideas from your plan promptly to build momentum and confidence.
          </li>
        </ul>
        <p>
          For more detailed guidance, visit the Student Space article: <a href="https://studentspace.org.uk/wellbeing/building-a-network-at-university" target="_blank" rel="noopener noreferrer">Building a Network at University</a>.
        </p>
      </section>

      <section>
        <h2>Overcoming Social Anxiety</h2>
        <ul>
          <li className="advice-card">
            <strong>Understand Your Anxiety Triggers:</strong> Reflect on situations that cause anxiety, noting thoughts, physical sensations, and reactions to better manage them.
          </li>
          <li className="advice-card">
            <strong>Evaluate Coping Mechanisms:</strong> Identify behaviors that provide short-term relief but may hinder long-term progress, such as avoidance or excessive preparation.
          </li>
          <li className="advice-card">
            <strong>Take Gradual Steps:</strong> Set achievable goals, like attending a social event for a short period, and gradually increase exposure to challenging situations.
          </li>
          <li className="advice-card">
            <strong>Practice Relaxation Techniques:</strong> Incorporate breathing exercises and muscle relaxation to alleviate physical symptoms of anxiety.
          </li>
          <li className="advice-card">
            <strong>Communicate with Trusted Individuals:</strong> Share your experiences with friends, family, or counselors to gain support and perspective.
          </li>
          <li className="advice-card">
            <strong>Celebrate Progress:</strong> Acknowledge and reward yourself for facing fears and making strides, no matter how small.
          </li>
          <li className="advice-card">
            <strong>Seek Professional Support:</strong> If social anxiety significantly impacts your life, consider reaching out to university support services or mental health professionals.
          </li>
        </ul>
        <p>
          For more comprehensive tips, refer to the Student Space article: <a href="https://studentspace.org.uk/wellbeing/8-tips-for-overcoming-social-anxiety" target="_blank" rel="noopener noreferrer">8 Tips for Overcoming Social Anxiety</a>.
        </p>
      </section>
    </div>
  );
};

export default Social;
