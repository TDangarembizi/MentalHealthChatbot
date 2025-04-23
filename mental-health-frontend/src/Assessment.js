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

const interpretPHQ9 = (score) => {
  if (score <= 4) return { label: "Minimal Depression", severity: "low" };
  if (score <= 9) return { label: "Mild Depression", severity: "low" };
  if (score <= 14) return { label: "Moderate Depression", severity: "moderate" };
  if (score <= 19) return { label: "Moderately Severe Depression", severity: "high" };
  return { label: "Severe Depression", severity: "critical" };
};

const interpretGAD7 = (score) => {
  if (score <= 4) return { label: "Minimal Anxiety", severity: "low" };
  if (score <= 9) return { label: "Mild Anxiety", severity: "low" };
  if (score <= 14) return { label: "Moderate Anxiety", severity: "moderate" };
  return { label: "Severe Anxiety", severity: "critical" };
};

const Assessment = () => {
  const [phq9, setPhq9] = useState({});
  const [gad7, setGad7] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (setFunc, state, id, value) => {
    setFunc({ ...state, [id]: parseInt(value) });
  };

  const safeSum = (obj) => Object.values(obj).reduce((a, b) => a + (isNaN(b) ? 0 : b), 0);

  const handleSubmit = async () => {
    const user_id=localStorage.getItem("uid");
    const phq9Score = safeSum(phq9);
    const gad7Score = safeSum(gad7);

    const payload = {
      user_id: user_id,
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

setResult({
  phq9: phq9Score,
  gad7: gad7Score,
  phq9Result: interpretPHQ9(phq9Score),
  gad7Result: interpretGAD7(gad7Score)
});
    } catch (error) {
      console.error("Assessment submission failed:", error.message);
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
{result && (
  <div className="assessment-message">
    <h3>🧾 Assessment Results</h3>
    <p>
      <strong>PHQ-9:</strong> {result.phq9} –
      <span className={`severity ${result.phq9Result.severity}`}>
        {result.phq9Result.label}
      </span>
    </p>
    <p>
      <strong>GAD-7:</strong> {result.gad7} –
      <span className={`severity ${result.gad7Result.severity}`}>
        {result.gad7Result.label}
      </span>
    </p>

    {(result.phq9Result.severity === "high" || result.phq9Result.severity === "critical" ||
      result.gad7Result.severity === "high" || result.gad7Result.severity === "critical") && (
      <div className="support-section">
        <h4>📌 Support Resources</h4>
        <p>If you're experiencing moderate to severe symptoms, consider reaching out:</p>
        <ul>
          <li><a href="https://www.mind.org.uk" target="_blank" rel="noreferrer">Mind UK</a></li>
          <li><a href="https://www.samaritans.org" target="_blank" rel="noreferrer">Samaritans</a></li>
          <li><a href="https://www.nhs.uk/mental-health/" target="_blank" rel="noreferrer">NHS Mental Health</a></li>
        </ul>
      </div>
    )}
  </div>
)}
    </div>
  );
};

export default Assessment;
