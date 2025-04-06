import React, { useState } from 'react';
import './Assessment.css';

const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep, or sleeping too much?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
  "Trouble concentrating on things, such as reading the newspaper or watching television?",
  "Moving or speaking so slowly that other people could have noticed? Or so fidgety or restless that you have been moving a lot more than usual?",
  "Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?"
];

const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen"
];

const OPTIONS = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 }
];

const Assessment = () => {
  const [phq9, setPhq9] = useState({});
  const [gad7, setGad7] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (setFunc, state, id, value) => {
    setFunc({ ...state, [id]: parseInt(value) });
  };

  const safeSum = (obj) => Object.values(obj).reduce((a, b) => a + (isNaN(b) ? 0 : b), 0);

  const handleSubmit = async () => {
    const phq9Score = safeSum(phq9);
    const gad7Score = safeSum(gad7);

    const payload = {
      user_id: (localStorage.getItem("userEmail") || "anonymous").replace(/\./g, "_"),
      responses: { phq9, gad7 },
      score: { phq9: phq9Score, gad7: gad7Score },
      timestamp: new Date().toISOString()
    };

    try {
      const res = await fetch('http://localhost:5000/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      setMessage(`Submitted! PHQ-9: ${phq9Score}, GAD-7: ${gad7Score}`);
    } catch (error) {
      console.error("Assessment submission failed:", error.message);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="assessment-container">
      <h2>PHQ-9 Depression Assessment</h2>
      {PHQ9_QUESTIONS.map((q, idx) => (
        <div key={`phq9-${idx}`} className="assessment-question">
          <p>{q}</p>
          <select onChange={(e) => handleChange(setPhq9, phq9, `q${idx + 1}`, e.target.value)}>
            <option value="">Select</option>
            {OPTIONS.map(opt => (
              <option key={opt.label} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      ))}

      <h2 style={{ marginTop: "2rem" }}>GAD-7 Anxiety Assessment</h2>
      {GAD7_QUESTIONS.map((q, idx) => (
        <div key={`gad7-${idx}`} className="assessment-question">
          <p>{q}</p>
          <select onChange={(e) => handleChange(setGad7, gad7, `q${idx + 1}`, e.target.value)}>
            <option value="">Select</option>
            {OPTIONS.map(opt => (
              <option key={opt.label} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      ))}

      <button className="assessment-submit-btn" onClick={handleSubmit}>Submit Assessments</button>
      {message && <p className="assessment-message">{message}</p>}
    </div>
  );
};

export default Assessment;
