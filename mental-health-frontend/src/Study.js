import React from 'react';
import './Advice.css';

const Study = ({ setView }) => {
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
      <h1>Tips on Preparing for Exams (from the NHS)</h1>

      <section>
        <h2>Revision Advice</h2>
        <ul>
          <li className="advice-card">
            <strong>Make a realistic revision schedule:</strong>
            Break down subjects and plan short, consistent sessions with breaks.
          </li>
          <li className="advice-card">
            <strong>Use your preferred learning style:</strong>
            Visual, auditory, or hands-on – choose what helps you remember best.
          </li>
          <li className="advice-card">
            <strong>Summarise and simplify:</strong>
            Turn notes into bullet points, flashcards, or diagrams.
          </li>
          <li className="advice-card">
            <strong>Test yourself:</strong>
            Use past papers, quizzes, or peer questions to reinforce knowledge.
          </li>
          <li className="advice-card">
            <strong>Take proper breaks:</strong>
            Short breaks improve concentration – avoid burnout.
          </li>
          <li className="advice-card">
            <strong>Reward your progress:</strong>
            Motivate yourself with small rewards after study goals.
          </li>
          <li className="advice-card">
            <strong>Stay active:</strong>
            Exercise reduces stress and improves brain function.
          </li>
          <li className="advice-card">
            <strong>Ask for help:</strong>
            Reach out to friends, tutors, or family if you're stuck.
          </li>
        </ul>
      </section>

      <section>
        <h2>On Exam Day</h2>
        <ul>
          <li className="advice-card">
            <strong>Get prepared early:</strong>
            Pack your supplies and get a good night's sleep.
          </li>
          <li className="advice-card">
            <strong>Eat a healthy breakfast:</strong>
            Avoid sugary snacks – go for slow-releasing energy foods.
          </li>
          <li className="advice-card">
            <strong>Arrive with time to spare:</strong>
            Avoid last-minute panic and settle in calmly.
          </li>
          <li className="advice-card">
            <strong>Read the instructions carefully:</strong>
            Don't rush – understand what’s being asked.
          </li>
          <li className="advice-card">
            <strong>Manage your time:</strong>
            Keep an eye on the clock and allocate time for each section.
          </li>
          <li className="advice-card">
            <strong>Stay calm:</strong>
            Use breathing techniques or grounding methods if anxious.
          </li>
          <li className="advice-card">
            <strong>Don't dwell on one question:</strong>
            Move on and come back to it later if needed.
          </li>
          <li className="advice-card">
            <strong>Forget the exam afterward:</strong>
            Focus on the next one – what’s done is done.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Study;
