import React from 'react';
import './About.css';
import cblogo from './images/cblogo.png';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <img src={cblogo} alt="Creationbase Logo" className="company-logo" />
        <h1>Creationbase</h1>
        <p className="creator-text">Creator of QuantumKeep</p>
      </div>
      
      <div className="about-content">
        <div className="mission-statement">
          <h2>Our Mission</h2>
          <p>At Creationbase, we are driven by a singular purpose: helping humanity through technology. 
             QuantumKeep represents our commitment to revolutionizing secure data management.</p>
        </div>

        <div className="focus-areas">
          <h2>Our Focus Areas</h2>
          <div className="focus-cards-container">
            <div className="focus-cards">
              <div className="focus-card">
                <h3>Environmental</h3>
                <p>Developing sustainable solutions for a better tomorrow</p>
              </div>
              <div className="focus-card">
                <h3>Public Safety</h3>
                <p>Creating technology that protects and serves communities</p>
              </div>
              <div className="focus-card">
                <h3>Information Security</h3>
                <p>Safeguarding digital assets and protecting privacy</p>
              </div>
            </div>
          </div>
        </div>

        <div className="visit-section">
          <a 
            href="https://creationbase.io" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="primary-button visit-button"
          >
            Visit Creationbase.io
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
