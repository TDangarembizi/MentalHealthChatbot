import React from 'react';
import './Advice.css';

const Sleep = ({ setView }) => {
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
        <h1>How to Fall Asleep Faster and Sleep Better</h1>
        <iframe width="634" height="351" src="https://www.youtube.com/embed/TOrazPJq_5U"
                title="Fall Asleep In 2 Minutes - 5 EASY Tips To Get INSTANT Sleep (animated)" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <section>
          <h2>1. Establish a Consistent Sleep Routine</h2>
          <ul>
            <li className="advice-card">
              <strong>Maintain regular sleep and wake times:</strong>
              Going to bed and waking up at the same time each day, including weekends, helps regulate your body's
              internal clock.
            </li>
            <li className="advice-card">
              <strong>Develop a pre-sleep routine:</strong>
              Engage in calming activities before bed, such as reading or taking a warm bath, to signal to your body
              that it's time to wind down.
            </li>
          </ul>
        </section>

        <section>
          <h2>2. Relax and Unwind Before Bed</h2>
          <ul>
            <li className="advice-card">
              <strong>Avoid electronic devices:</strong>
              Steer clear of screens at least an hour before bedtime, as the blue light emitted can interfere with your
              ability to fall asleep.
            </li>
            <li className="advice-card">
              <strong>Engage in relaxing activities:</strong>
              Consider listening to soft music, reading, or practicing meditation to help you relax.
            </li>
          </ul>
          <div className="advice-card">
            <strong>Guided Sleep Meditation:</strong>
            <p>
              You can listen to the NHS's <a
                href="https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/how-to-fall-asleep-faster-and-sleep-better/"
                target="_blank" rel="noopener noreferrer">Beditation</a> audio session – a calming guide to help you
              unwind and fall asleep.
            </p>
          </div>
        </section>

        <section>
          <h2>3. Practice Mindfulness</h2>
          <ul>
            <li className="advice-card">
              <strong>Manage worries:</strong>
              Set aside time before bed to write down any concerns or to-do lists, helping to clear your mind.
            </li>
            <li className="advice-card">
              <strong>Use mindfulness techniques:</strong>
              Techniques like reframing unhelpful thoughts can promote relaxation and improve sleep quality.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Create an Ideal Sleep Environment</h2>
          <ul>
            <li className="advice-card">
              <strong>Keep your bedroom quiet, dark, and cool:</strong>
              Use earplugs, blackout curtains, or white noise machines as needed to create a comfortable environment.
            </li>
            <li className="advice-card">
              <strong>Limit distractions:</strong>
              Remove or silence electronic devices and consider using ambient sounds to aid sleep.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Don't Force Sleep</h2>
          <ul>
            <li className="advice-card">
              <strong>If you can't sleep, get up:</strong>
              Engage in a quiet, relaxing activity until you feel sleepy, then return to bed.
            </li>
            <li className="advice-card">
              <strong>Focus on relaxation:</strong>
              Remember that resting quietly can be beneficial, even if you don't fall asleep immediately.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Consider Diet and Exercise</h2>
          <ul>
            <li className="advice-card">
              <strong>Avoid stimulants before bed:</strong>
              Refrain from consuming caffeine, alcohol, or nicotine in the hours leading up to bedtime.
            </li>
            <li className="advice-card">
              <strong>Engage in regular physical activity:</strong>
              Regular exercise can promote better sleep, but try to avoid vigorous activity close to bedtime.
            </li>
          </ul>
        </section>
      </div>
  );
};

export default Sleep;
