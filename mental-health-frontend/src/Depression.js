import React from 'react';

const Depression = ({ setView }) => {
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
      <h1 className="text-3xl font-bold mb-4">Understanding Depression</h1>
      <p className="mb-4">
        Depression is more than just feeling unhappy or fed up for a few days. It's a serious mental health condition
        that affects your mood, thoughts, and physical health. If you're feeling persistently sad or hopeless, it's
        important to seek support.
      </p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">Overview of Depression</h2>
          <p className="mb-2">
            Learn about the signs, symptoms, causes, and when to seek help for depression.
          </p>
          <a
            href="https://www.nhs.uk/mental-health/conditions/depression-in-adults/overview/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            NHS Depression Overview
          </a>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Coping with Depression</h2>
          <p className="mb-2">
            Explore strategies and tips for managing depression in daily life, including self-help and treatment options.
          </p>
          <a
            href="https://www.nhs.uk/mental-health/conditions/depression/coping-with-depression/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Coping with Depression - NHS
          </a>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Improving Low Mood</h2>
          <p className="mb-2">
            Get practical advice on boosting your mood, finding motivation, and creating a healthier mental environment.
          </p>
          <a
            href="https://www.nhs.uk/mental-health/conditions/depression/improving-low-mood/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Improving Low Mood - NHS
          </a>
        </section>
      </div>
    </div>
  );
};

export default Depression;
