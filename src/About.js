import React from 'react';
import './About.css';
import cblogo from './images/dot-triangle.png';

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
          <h2>Software that puts your needs first</h2>
          <p>At Creationbase, we build software differently. Starting with you—the user—we create solutions that make a real difference in your daily life.</p>
        </div>

        <div className="focus-areas">
          <div className="focus-cards-container">
            <div className="focus-cards">
              <div className="focus-card">
                <h3>Built For You</h3>
                <p>Every feature starts with understanding your needs. We create software that makes your life easier, more productive, and more enjoyable.</p>
              </div>
              <div className="focus-card">
                <h3>Shaped By You</h3>
                <p>Your feedback shapes our direction. We build tools we want to use ourselves, enhancing how you work, create, and connect.</p>
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
