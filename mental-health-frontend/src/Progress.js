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

  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No auth token found.");
    return;
  }

  const headers = {
    "Authorization": `Bearer ${token}`
  };

  // Fetch assessments
  fetch(`http://localhost:5000/assessment/results?user_id=${user_id}`, { headers })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) setAssessments(data);
      else setAssessments([]);
    })
    .catch(err => {
      console.error("Error fetching assessments:", err);
      setAssessments([]);
    });

  // Fetch journal entries
  fetch(`http://localhost:5000/journal?user_id=${user_id}`, { headers })
    .then(res => res.json())
    .then(data => setJournalCount(Array.isArray(data) ? data.length : 0))
    .catch(err => {
      console.error("Error fetching journal entries:", err);
      setJournalCount(0);
    });

  // Fetch moods
  fetch(`http://localhost:5000/mood?user_id=${user_id}`, { headers })
    .then(res => res.json())
    .then(data => setMoodCount(Array.isArray(data) ? data.length : 0))
    .catch(err => {
      console.error("Error fetching mood data:", err);
      setMoodCount(0);
    });

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
              {Array.isArray(assessments) ? assessments.map((a, i) => (
  <tr key={i}>
    <td>{new Date(a.timestamp).toLocaleDateString()}</td>
    <td>{a.phq9}</td>
    <td>{a.gad7}</td>
  </tr>
)) : <tr><td colSpan="3">No assessment data</td></tr>}

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
