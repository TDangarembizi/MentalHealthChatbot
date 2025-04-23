import React, { useEffect, useState } from 'react';
import MoodChart from './MoodChart';
import './Progress.css';

const Progress = () => {
  const [assessments, setAssessments] = useState([]);
  const [journalCount, setJournalCount] = useState(0);
  const [moodCount, setMoodCount] = useState(0);

  const user_id = localStorage.getItem("uid");

  useEffect(() => {
    if (!user_id) return;

    // Fetch assessments
    fetch(`http://localhost:5000/assessment/results?user_id=${user_id}`)
      .then(res => res.json())
      .then(setAssessments);

    // Fetch journal entries
    fetch(`http://localhost:5000/journal?user_id=${user_id}`)
      .then(res => res.json())
      .then(data => setJournalCount(data.length));

    // Fetch moods
    fetch(`http://localhost:5000/mood?user_id=${user_id}`)
      .then(res => res.json())
      .then(data => setMoodCount(data.length));
  }, [user_id]);

  return (
    <div className="progress-container">
      <h2>Your Progress</h2>

      <section className="progress-section">
        <MoodChart />
      </section>

      <section className="progress-section">
        <h3>🧠 Assessment History</h3>
        {assessments.length === 0 ? (
          <p>No assessments submitted yet.</p>
        ) : (
          <table className="progress-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>PHQ-9</th>
                <th>GAD-7</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((a, i) => (
                <tr key={i}>
                  <td>{new Date(a.timestamp).toLocaleDateString()}</td>
                  <td>{a.phq9}</td>
                  <td>{a.gad7}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="progress-summary">
        <h3>📝 Journal Summary</h3>
        <p>You’ve written <strong>{journalCount}</strong> journal entries.</p>

        <h3>📅 Mood Check-ins</h3>
        <p>You’ve recorded your mood <strong>{moodCount}</strong> times.</p>
      </section>
    </div>
  );
};

export default Progress;
