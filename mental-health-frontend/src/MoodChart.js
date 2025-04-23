import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const moodScale = {
  happy: 5,
  okay: 4,
  sad: 3,
  stressed: 2,
  exhausted: 1
};

const MoodChart = () => {
  const [moodData, setMoodData] = useState([]);
  const [trend, setTrend] = useState("");

  useEffect(() => {
    const user_id = localStorage.getItem("uid");
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
    if (trendScore > 1) setTrend("📈 Mood is improving");
    else if (trendScore < -1) setTrend("📉 Mood is declining");
    else setTrend("➡️ Mood is stable");
  };

  const chartData = {
    labels: moodData.map(entry => new Date(entry.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: "Mood Level",
        data: moodData.map(entry => moodScale[entry.mood] || 2),
        fill: false,
        borderColor: "#2196f3",
        tension: 0.3
      }
    ]
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📊 Mood Over Time</h2>
      {trend && <p><strong>{trend}</strong></p>}
      <Line data={chartData} />
    </div>
  );
};

export default MoodChart;
