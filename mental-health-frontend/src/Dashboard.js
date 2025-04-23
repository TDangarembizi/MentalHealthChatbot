import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const Dashboard = ({ moodUpdated, setMoodUpdated }) => {
    const [assessments, setAssessments] = useState([]);
    const user_id = localStorage.getItem("uid");
    const userEmail = localStorage.getItem("userEmail");


    useEffect(() => {
        const fetchAssessments = async () => {
            const res = await fetch(`http://localhost:5000/assessment/results?user_id=${user_id}`);
            const data = await res.json();
            setAssessments(data);
        };

        fetchAssessments();
    }, [user_id]);

    const latest = assessments[assessments.length - 1];

    const interpretPHQ9 = (score) => {
        if (score <= 4) return "Minimal";
        if (score <= 9) return "Mild";
        if (score <= 14) return "Moderate";
        if (score <= 19) return "Moderately Severe";
        return "Severe";
    };

    const interpretGAD7 = (score) => {
        if (score <= 4) return "Minimal";
        if (score <= 9) return "Mild";
        if (score <= 14) return "Moderate";
        return "Severe";
    };

    const [lastEntry, setLastEntry] = useState(null);

    useEffect(() => {
  fetch(`http://localhost:5000/journal?user_id=${user_id}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) setLastEntry(data[0].text);
    });
}, [user_id]);

    useEffect(() => {
  if (!moodUpdated) return;

  if (!user_id) return;

  fetch(`http://localhost:5000/mood?user_id=${user_id}`)
    .then(res => res.json())
    .then(data => {
      const sorted = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setMoodData(sorted);
      detectTrend(sorted);

      // Reset flag to avoid repeat fetches
      setMoodUpdated(false);
    });
}, [moodUpdated]);


    const moodScale = {
  happy: 5,
  okay: 4,
  sad: 3,
  stressed: 2,
  exhausted: 1
};

    const [trendTip, setTrendTip] = useState("");
    const [moodData, setMoodData] = useState([]);

    useEffect(() => {

  if (!user_id) return;

  fetch(`http://localhost:5000/mood?user_id=${user_id}`)
    .then(res => res.json())
    .then(data => {
      const sorted = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setMoodData(sorted);
      detectTrend(sorted);
    });
}, []);

const detectTrend = (data) => {
  const values = data.map(entry => moodScale[entry.mood] || 2);
  const avgDiff = values.slice(1).map((v, i) => v - values[i]);
  const trendScore = avgDiff.reduce((a, b) => a + b, 0);

  //Store score for other components if needed
  localStorage.setItem("trendScore", trendScore);

  //Decide tip based on score
  if (trendScore > 1) {
    setTrendTip("📈 Mood is improving. Keep doing what’s working! Try to identify which habits, people, or routines have helped you feel better and make them part of your regular day. Celebrate small wins.");
  } else if (trendScore < -1) {
    setTrendTip("📉 Mood is declining. That’s okay — everyone has tough days. Try grounding exercises, journaling, or talking to someone you trust. Reaching out is a strength, not a weakness.");
  } else {
    setTrendTip("➡️ Mood is stable. Stability is progress too! Maintain your current self-care routines. Consider checking in with yourself daily to spot subtle shifts and take action early.");
  }
};

  return (
      <div className="dashboard-container">
          <h1>Welcome back, {userEmail?.split('@')[0]}</h1>

          <div className="dashboard-grid">
              <div className="dashboard-card">
                  <h3>Tip of the day</h3>
                  <p>{trendTip}</p>
              </div>

                  <div className="dashboard-card">
                      <h3>📈 Latest Assessment</h3>
                      {latest ? (
                          <div>
                              <p>PHQ-9 Score: {latest.phq9} ({interpretPHQ9(latest.phq9)})</p>
                              <p>GAD-7 Score: {latest.gad7} ({interpretGAD7(latest.gad7)})</p>
                              <p>Date: {new Date(latest.timestamp).toLocaleDateString()}</p>
                          </div>
                      ) : (
                          <p>No assessments found</p>
                      )}
                  </div>

                  <div className="dashboard-card">
                      <h3>📊 Assessment Trends</h3>
                      <div className="dashboard-card">
                          {assessments.length > 0 ? (
                              <Line
                                  data={{
                                      labels: assessments.map(a =>
                                          new Date(a.timestamp).toLocaleDateString()
                                      ),
                                      datasets: [
                                          {
                                              label: "PHQ-9",
                                              data: assessments.map(a => a.phq9),
                                              borderColor: "blue",
                                              fill: false,
                                          },
                                          {
                                              label: "GAD-7",
                                              data: assessments.map(a => a.gad7),
                                              borderColor: "green",
                                              fill: false,
                                          }
                                      ],
                                  }}
                                  options={{
                                      responsive: true,
                                      plugins: {
                                          legend: {
                                              position: 'top'
                                          }
                                      }
                                  }}
                              />
                          ) : (
                              <p>No data to show</p>
                          )}
                      </div>
                  </div>

                  <div className="dashboard-card">
                      <h3>📝 Last Journal Entry</h3>
                      <p>{lastEntry || "No entries yet."}</p>
                  </div>

              </div>
          </div>
          );
          };

          export default Dashboard;
