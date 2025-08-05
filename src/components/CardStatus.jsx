import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CardStatus.css'; 

function CardStatus() {
  const { id } = useParams();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = () => {
    axios.get(`http://88.200.63.148:6868/get-card-stats/${id}`, {
      withCredentials: true,
    })
    .then(res => setStats(res.data))
    .catch(err => console.error('Failed to fetch stats:', err));
  };

  fetchStats();
  const interval = setInterval(fetchStats, 60000); // 60000ms = 1min
  return () => clearInterval(interval); 
  }, [id]);


  if (!stats) return <div className="status-loading">Loading...</div>;

  return (
    <div className="card-status-container">
      <h2>Card Statistics (ID: {id})</h2>
      <div className="stats-grid">
        <div className="stat-box temperature">
          <h3>Temperature</h3>
          <p>{stats.temperature}°C</p>
        </div>
        <div className="stat-box humidity">
          <h3>Humidity</h3>
          <p>{stats.humidity}%</p>
        </div>
        <div className="stat-box moisture">
          <h3>Soil Moisture</h3>
          <p>{stats.moisture}</p>
        </div>
      </div>
    </div>
  );
}

export default CardStatus;
