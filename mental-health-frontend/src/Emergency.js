import React from 'react';
import './Emergency.css';

const emergencyContacts = [
  {
    name: "Emergency Services (UK)",
    number: "999",
    description: "Call for life-threatening emergencies, accidents, or when someone is at immediate risk of harm."
  },
  {
    name: "Samaritans",
    number: "116 123",
    description: "Free 24/7 support for anyone in emotional distress, suicidal crisis, or just needing someone to talk to."
  },
  {
    name: "University Mental Health Support",
    number: "Check your uni portal",
    description: "Most universities provide a 24-hour mental health or counselling helpline. Visit your student portal for details."
  },
  {
    name: "NHS 111",
    number: "111",
    description: "Non-emergency medical advice and support 24/7."
  }
];

const EmergencyContacts = () => {
  return (
    <div className="emergency-container">
      <h2>🚨 Emergency Contacts</h2>
      <p>If you or someone else is in danger or needs immediate support, use one of the services below.</p>
      <div className="contact-list">
        {emergencyContacts.map((contact, index) => (
          <div className="contact-card" key={index}>
            <h3>{contact.name}</h3>
            <p>{contact.description}</p>
            <p className="emergency-number">📞 {contact.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContacts;
