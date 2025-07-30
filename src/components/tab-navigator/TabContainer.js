import React from 'react';
import { Link } from 'react-router-dom';
import './TabContainer.css';

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
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          )}
        </div>
      </nav>
      <main className="tab-content">{children}</main>
    </div>
  );
}

export default TabContainer;
