import axios from 'axios';
import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import './Home.css';

function Home() {
  const { auth, name } = useOutletContext();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>{auth ? `Welcome back, ${name}!` : "Welcome to your Garden"}</h1>
        <p>{auth ? "Glad to have you here." : "Please log in or register to manage your plants."}</p>
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
            Welcome to our smart Garden Management Application — designed to help you monitor and control your garden’s
             environment remotely with ease. Our platform enables you to track key parameters such as temperature, humidity,
              and soil moisture in real-time, ensuring your plants thrive no matter where you are.
        </p>
        <p>
            Beyond monitoring, you can customize minimum and maximum thresholds for each parameter and receive instant alerts if 
            any values fall outside your specified limits. This proactive approach helps you take timely action to protect your garden.
        </p>
        <p>
            Additionally, the app allows you to remotely operate devices like air conditioners, humidifiers, and watering systems, 
            giving you full control over your garden’s conditions at your fingertips. Whether you’re at home or away, managing your garden
             has never been more convenient or effective.
        </p>
        <p>
            Explore the intuitive dashboard, configure your preferences, and stay connected to your garden 24/7. 
            Your plants deserve the best care, and we’re here to make that simple and accessible.
        </p>

      </div>
    </div>
  );
}

export default Home;
