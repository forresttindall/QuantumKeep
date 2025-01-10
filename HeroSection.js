import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaRandom, FaGlobe, FaBolt } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="hero" style={{ position: 'relative', zIndex: 1 }}>
      <div className="gradient-overlay"></div>
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <h1>
            <span className="gradient-text">Quantum-Secured</span>
            <br />
            File Encryption
          </h1>
          <p className="hero-subtitle">
            Free, open source quantum randomness encryption for your local files and storage
          </p>
          <div className="hero-buttons">
            <Link to="/Dashboard" className="primary-button">Get Started</Link>
            <Link to="/HowItWorks" className="secondary-button">Technical Overview</Link>
          </div>
          
          <div className="trust-badges">
            <span>Achieve the highest security compliance with</span>
            <div className="badge-icons">
              <div className="security-badge">SOC2</div>
              <div className="security-badge">ISO 27001</div>
              <div className="security-badge">GDPR</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-visual"
        >
          <div className="quantum-sphere">
            <div className="sphere-core"></div>
            <div className="sphere-ring ring-1"></div>
            <div className="sphere-ring ring-2"></div>
            <div className="sphere-ring ring-3"></div>
            <div className="sphere-ring ring-4"></div>
            <div className="sphere-ring ring-5"></div>
            <div className="sphere-ring ring-6"></div>
            <div className="data-streams"></div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="hero-features"
      >
        <div className="feature-card">
          <FaShieldAlt className="feature-icon" />
          <h3>Local Encryption</h3>
          <p>Secure files on your devices with strong encryption. Your data never leaves your device.</p>
        </div>
        <div className="feature-card">
          <FaRandom className="feature-icon" />
          <h3>Quantum Randomness</h3>
          <p>Continuously evolving stream of true randomness from zero-point energy.</p>
        </div>
        <div className="feature-card">
          <FaGlobe className="feature-icon" />
          <h3>Multi-Platform</h3>
          <p>Encrypt and decrypt your files seamlessly across all your devices.</p>
        </div>
        <div className="feature-card">
          <FaBolt className="feature-icon" />
          <h3>Open Source</h3>
          <p>Free to use, transparent, and community-driven security.</p>
        </div>
      </motion.div>

      <div className="mobile-cta">
        <Link to="/Dashboard" className="primary-button">Get Started</Link>
      </div>
    </section>
  );
};

export default HeroSection;
