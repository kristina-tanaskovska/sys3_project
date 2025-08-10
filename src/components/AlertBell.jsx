import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";
import "./AlertBell.css";

export default function AlertsBell() {
  const [alerts, setAlerts] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchAlerts = () =>
    axios
      .get("http://88.200.63.148:6868/alerts", { withCredentials: true })
      .then(({ data }) => setAlerts(data))
      .catch(() => {});

  useEffect(() => {
    fetchAlerts();                 // initial
    const id = setInterval(fetchAlerts, 30000); // 30 s check
    return () => clearInterval(id);
  }, []);

  /*local dismiss */
  const dismiss = (idx) =>
    setAlerts((prev) => prev.filter((_, i) => i !== idx));

  return (
    <div className="alert-wrapper">
      <FaBell onClick={() => setOpen(!open)} style={{ cursor: "pointer" }} />
      {alerts.length > 0 && <span className="alert-count">{alerts.length}</span>}

      {open && (
        <div className="alert-dropdown">
          {alerts.length === 0 ? (
            <p>No new alerts</p>
          ) : (
            alerts.map((a, i) => (
              <div key={i} className="alert-item">
                <strong>{a.cardTitle}</strong><br />
                {a.metric} {a.dir} limit ({a.value} vs {a.limit})
                <button onClick={() => dismiss(i)}>Dismiss</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
