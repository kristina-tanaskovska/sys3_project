import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://88.200.63.148:6868';

export default function DataInsertionToggle() {
  const [running, setRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardId, setCardId] = useState(''); 

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await axios.get(`${BACKEND_URL}/insertion-status`, { withCredentials: true });
        setRunning(res.data.running);
      } catch (err) {
        console.error('Failed to fetch insertion status', err);
      }
    }
    fetchStatus();
  }, []);

  async function toggleInsertion() {
    if (!running && !cardId) {
      alert('Please enter a valid card ID before starting.');
      return;
    }
    setLoading(true);
    try {
      const url = running ? `${BACKEND_URL}/stop-insertion` : `${BACKEND_URL}/start-insertion`;
      const res = await axios.post(
        url,
        running ? null : { card_id: cardId },
        { withCredentials: true }
      );

      if ((running && res.data.status === 'stopped') || (!running && res.data.status === 'started')) {
        setRunning(!running);
      }
    } catch (err) {
      console.error('Failed to toggle insertion', err);
    }
    setLoading(false);
  }

  return (
    <div>
      {!running && (
        <input
          type="number"
          placeholder="Enter card ID"
          value={cardId}
          onChange={e => setCardId(e.target.value)}
          disabled={loading}
          style={{ marginBottom: 10 }}
        />
      )}
      <br />
      <button onClick={toggleInsertion} disabled={loading} style={{ marginBottom: 20 }}>
        {loading ? 'Processing...' : running ? 'Stop Insertion' : 'Start Insertion'}
      </button>
    </div>
  );
}
