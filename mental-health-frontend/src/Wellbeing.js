// Wellbeing.js
import React from 'react';

const Wellbeing = ({ setView }) => {
   return (
    <div className="p-4 max-w-3xl mx-auto">
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
      <h1 className="text-3xl font-bold mb-4">Five Steps to Mental Wellbeing</h1>
      <p className="mb-4">
        Evidence suggests there are five simple steps you can take to help improve your mental health and wellbeing.
        Trying these things could help you feel more positive and able to get the most out of life.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold">1. Connect with Other People</h2>
          <p>
            Good relationships are important for your mental wellbeing. Try to spend time with family, friends or
            colleagues. Even brief chats with neighbours or strangers can boost mood and reduce isolation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Be Physically Active</h2>
          <p>
            Being active isn't just great for your physical health — it can also improve your mental wellbeing by raising
            self-esteem and causing chemical changes in your brain which positively impact mood.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Learn New Skills</h2>
          <p>
            Learning boosts confidence and provides a sense of purpose. This could be anything from cooking a new recipe
            to picking up a hobby or professional skill.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Give to Others</h2>
          <p>
            Small acts of kindness — like helping a friend, volunteering, or simply saying thank you — can create
            positive feelings and build a sense of reward and connection.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Pay Attention to the Present Moment (Mindfulness)</h2>
          <p>
            Being mindful means being more aware of your thoughts, feelings, and surroundings. It can positively change
            the way you feel about life and how you approach challenges.
          </p>
        </section>

        <section className="mt-6">
          <a
            href="https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Read more on the NHS website
          </a>
        </section>
      </div>
    </div>
  );
};

export default Wellbeing;
