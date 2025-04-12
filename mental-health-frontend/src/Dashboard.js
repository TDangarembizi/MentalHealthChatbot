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


const Dashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const userEmail = localStorage.getItem("userEmail")?.replace(/\./g, "_");

  useEffect(() => {
    const fetchAssessments = async () => {
      const res = await fetch(`http://localhost:5000/assessment/results?user_id=${userEmail}`);
      const data = await res.json();
      setAssessments(data);
    };

    fetchAssessments();
  }, [userEmail]);

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
  fetch(`http://localhost:5000/journal?user_id=${userEmail}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) setLastEntry(data[0].text);
    });
}, [userEmail]);

  return (
      <div className="dashboard-container">
          <h1>Welcome back, {userEmail?.split('@')[0]}</h1>

          <div className="dashboard-grid">
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
                      <h3>📊 Assessment Trends</h3>
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
                  <h3>💬 Recent Chats</h3>
                  <p>[Chat summary]</p>
              </div>

              <div className="dashboard-card">
                  <h3>📝 Last Journal Entry</h3>
                  <p>{lastEntry || "No entries yet."}</p>
              </div>

              <div className="dashboard-card">
                  <h3>👤 Profile</h3>
                  <p>Email: {userEmail?.replace(/_/g, '.')}</p>
                  <button onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                  }}>Sign Out
                  </button>
              </div>
          </div>
      </div>
  );
};

export default Dashboard;
