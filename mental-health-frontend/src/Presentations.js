import React from 'react';
import './Advice.css';

const Presentations = ({ setView }) => {
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
        <h1>Effective Presentation Tips</h1>
        <iframe width="634" height="351" src="https://www.youtube.com/embed/q1kQEujKRds" title="Public Speaking Tips"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <section>
          <h2>Preparation</h2>
          <ul>
            <li className="advice-card">
              <strong>Know Your Audience:</strong>
              Understand who you're presenting to and tailor your content accordingly.
            </li>
            <li className="advice-card">
              <strong>Structure Your Content:</strong>
              Organize your presentation with a clear introduction, body, and conclusion.
            </li>
            <li className="advice-card">
              <strong>Practice Thoroughly:</strong>
              Rehearse your presentation multiple times to build confidence and ensure smooth delivery.
            </li>
          </ul>
        </section>

        <section>
          <h2>Delivery</h2>
          <ul>
            <li className="advice-card">
              <strong>Maintain Eye Contact:</strong>
              Engage with your audience by looking at them, not just at your slides.
            </li>
            <li className="advice-card">
              <strong>Use Appropriate Body Language:</strong>
              Stand confidently, use gestures naturally, and avoid distracting movements.
            </li>
            <li className="advice-card">
              <strong>Speak Clearly and Audibly:</strong>
              Project your voice to reach the entire audience and articulate your words.
            </li>
          </ul>
        </section>

        <section>
          <h2>Visual Aids</h2>
          <ul>
            <li className="advice-card">
              <strong>Keep Slides Concise:</strong>
              Use bullet points and avoid overcrowding slides with text.
            </li>
            <li className="advice-card">
              <strong>Use High-Quality Visuals:</strong>
              Incorporate relevant images, charts, and graphs to support your message.
            </li>
            <li className="advice-card">
              <strong>Ensure Readability:</strong>
              Choose clear fonts and maintain sufficient contrast between text and background.
            </li>
          </ul>
        </section>

        <section>
          <h2>Engagement</h2>
          <ul>
            <li className="advice-card">
              <strong>Start with a Hook:</strong>
              Begin with an interesting fact, question, or story to capture attention.
            </li>
            <li className="advice-card">
              <strong>Encourage Interaction:</strong>
              Ask questions or include activities to involve your audience.
            </li>
            <li className="advice-card">
              <strong>Handle Questions Gracefully:</strong>
              Listen carefully, respond thoughtfully, and admit if you don't know an answer.
            </li>
          </ul>
        </section>

        <section>
          <h2>Common Pitfalls to Avoid</h2>
          <ul>
            <li className="advice-card">
              <strong>Don't Read Directly from Slides:</strong>
              Use slides as prompts, not scripts.
            </li>
            <li className="advice-card">
              <strong>Avoid Filler Words:</strong>
              Minimize the use of "um," "uh," and similar fillers.
            </li>
            <li className="advice-card">
              <strong>Don't Overload with Information:</strong>
              Focus on key points to prevent overwhelming your audience.
            </li>
          </ul>
        </section>
      </div>
  );
};

export default Presentations;
