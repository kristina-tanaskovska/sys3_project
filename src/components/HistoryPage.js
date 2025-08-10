import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './HistoryPage.css';
import DataInsertionToggle from './DataInsertionToggle';




function HistoryPage() {
  const { id: cardId } = useParams(); 
  const [data, setData] = useState([]);
  const [range, setRange] = useState('today');

  useEffect(() => {
    axios.get(`http://88.200.63.148:6868/history/${cardId}?range=${range}`, {
  withCredentials: true
})
.then(res => {
      setData(res.data);
    }).catch(err => {
      console.error('Failed to fetch history data:', err);
    });
  }, [cardId, range]);

   console.log(cardId);
  return (
    <div className="history-dashboard">
      <DataInsertionToggle />
      <h2>Plant History (Card ID: {cardId})</h2>

      <div className="range-select">
        <label>Select Time Range: </label>
        <select value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="charts-grid">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="recorded_at"
              tickFormatter={(tick) => new Date(tick).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />

            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="recorded_at"
              tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
            />

            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="humidity" stroke="#387908" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="recorded_at"
              tickFormatter={(tick) => new Date(tick).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            />

            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="moisture" stroke="#0074d9" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HistoryPage;
