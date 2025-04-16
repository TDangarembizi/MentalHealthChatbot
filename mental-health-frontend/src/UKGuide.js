import React from 'react';
import './Advice.css';

const UKGuide =  ({ setView }) => {
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

      <h1>Living in the UK: A Guide for International Students</h1>

      <section>
        <h2>Healthcare in the UK</h2>
        <ul>
          <li className="advice-card">
            <strong>Register with a GP:</strong> Upon arrival, register with a local General Practitioner (GP) to access healthcare services. Your university can provide information on nearby GP practices.
          </li>
          <li className="advice-card">
            <strong>Understand NHS Services:</strong> The National Health Service (NHS) offers various services, including Accident & Emergency (A&E), GP consultations, and hospital appointments. Some services may require payment, such as prescriptions, dental, and optical care.
          </li>
          <li className="advice-card">
            <strong>Health Insurance:</strong> Ensure you have appropriate health insurance coverage during your stay. Some students may be eligible for free treatment under the NHS, while others might need private insurance.
          </li>
        </ul>
        <p>
          For more detailed information, visit the UKCISA Healthcare guide: <a href="https://www.ukcisa.org.uk/student-advice/life-in-the-uk/healthcare/" target="_blank" rel="noopener noreferrer">Healthcare for International Students</a>.
        </p>
      </section>

      <section>
        <h2>Travel and Transport in the UK</h2>
        <ul>
          <li className="advice-card">
            <strong>Public Transport:</strong> The UK has an extensive public transport network, including buses, trains, trams, and the London Underground. Research local transport options and consider purchasing travel cards or passes for discounts.
          </li>
          <li className="advice-card">
            <strong>Cycling and Walking:</strong> Many cities are bike-friendly, with dedicated lanes and bike-sharing schemes. Walking is also a convenient way to explore urban areas.
          </li>
          <li className="advice-card">
            <strong>Driving:</strong> If you plan to drive, ensure your driving license is valid in the UK and familiarize yourself with local driving laws and insurance requirements.
          </li>
        </ul>
        <p>
          For comprehensive details, refer to the UKCISA Transport guide: <a href="https://www.ukcisa.org.uk/student-advice/life-in-the-uk/travel-and-transport-in-the-uk/" target="_blank" rel="noopener noreferrer">Travel and Transport in the UK</a>.
        </p>
      </section>

      <section>
        <h2>Facing Culture Shock</h2>
        <ul>
          <li className="advice-card">
            <strong>Recognize the Symptoms:</strong> Feelings of homesickness, frustration, or confusion are common when adjusting to a new culture. Acknowledge these feelings as a normal part of the adaptation process.
          </li>
          <li className="advice-card">
            <strong>Stay Connected:</strong> Maintain communication with family and friends back home while also making efforts to build new relationships in the UK.
          </li>
          <li className="advice-card">
            <strong>Engage with the Community:</strong> Participate in university events, join clubs or societies, and explore local attractions to immerse yourself in the culture.
          </li>
          <li className="advice-card">
            <strong>Seek Support:</strong> If you're struggling, don't hesitate to reach out to university support services or counseling centers.
          </li>
        </ul>
        <p>
          For more insights, read the UKCISA article on culture shock: <a href="https://www.ukcisa.org.uk/student-advice/life-in-the-uk/facing-culture-shock/" target="_blank" rel="noopener noreferrer">Facing Culture Shock</a>.
        </p>
      </section>
    </div>
  );
};

export default UKGuide;
