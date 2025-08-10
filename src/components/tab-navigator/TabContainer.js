import React from 'react';
import { Link } from 'react-router-dom';
import './TabContainer.css';
import AlertBell from "../AlertBell.jsx"; 

function TabContainer({ children, auth, handleLogout }) {
  return (
    <div className="tab-navigator">
      <nav className="navbar">
        <div className="nav-logo">MySite</div>
        <div className="nav-links">
          <Link to="/">Home</Link>

          {!auth ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link to="/garden">Garden</Link>
              <AlertBell/>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          )}
        </div>
      </nav>

      <main className="tab-content">{children}</main>
    </div>
  );
}

export default TabContainer;
