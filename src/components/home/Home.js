import axios from 'axios';
import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import './Home.css';

function Home() {
  const { auth, name } = useOutletContext();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>{auth ? `Welcome back, ${name}!` : "Welcome to MySite"}</h1>
        <p>{auth ? "Glad to have you here." : "Please log in or register to explore more."}</p>
        {auth && (
          <Link to="/garden">
            <button className="go-to-garden-button">
              Go to Garden
            </button>
          </Link>
        )}
      </div>

      <div className="content-section">
        <h2>About This Website</h2>
        <p>
          This is a sample web application built with React, Express, and modern CSS. Users can register,
          log in, and access protected content once authenticated. The design is mobile-friendly and provides
          an intuitive user experience.
        </p>
        <p>
          When a user is authenticated, a personalized message appears along with an option to log out.
          Unauthenticated users are prompted to sign in or create an account. The layout features a
          responsive navigation bar and scrollable content area for long explanations.
        </p>
        <p>
          Feel free to explore and test the login and registration functionality. Everything you need is just
          a click away in the menu bar.
        </p>
      </div>
    </div>
  );
}

export default Home;
