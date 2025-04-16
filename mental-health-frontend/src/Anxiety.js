// Anxiety.js
import React from 'react';

const Anxiety = ({ setView }) => {
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
      <h1 className="text-3xl font-bold mb-4">Understanding Anxiety</h1>
      <p className="mb-4">
        Anxiety is a natural response to stress or danger, but when it becomes persistent and difficult to control, it may
        be a sign of an anxiety disorder. Generalised Anxiety Disorder (GAD) is a long-term condition that causes you to
        feel anxious about a wide range of situations and issues, rather than one specific thing.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Symptoms of GAD</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Feeling restless or worried</li>
          <li>Trouble concentrating</li>
          <li>Sleep difficulties</li>
          <li>Palpitations or muscle tension</li>
          <li>Constant feelings of dread or fear</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Getting Help</h2>
        <p className="mb-2">
          If anxiety is affecting your daily life, it's important to seek support. Treatment may include talking therapies,
          lifestyle changes, and medication in some cases.
        </p>
        <a
          href="https://www.nhs.uk/mental-health/conditions/generalised-anxiety-disorder-gad/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Read more on the NHS website
        </a>
      </section>
    </div>
  );
};

export default Anxiety;
