import React from 'react';
import './HowItWorks.css';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaRandom, FaLock, FaServer } from 'react-icons/fa';

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <div className="how-it-works-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="section-title">Security That Evolves With Threats</h1>
          <p className="section-subtitle">
            In a world where data breaches cost companies millions, QuantumKeep enhances encryption security through quantum random key generation, going beyond traditional predictable methods.
          </p>
        </motion.div>

  
        <motion.div 
          className="process-steps"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="step">
            <div className="step-icon">
              <FaRandom />
            </div>
            <div className="step-content">
              <h2 className="step-title">True Random Encryption</h2>
              <p className="step-description">
                Unlike traditional systems that rely on predictable computer-generated numbers, we use genuine quantum random key generation to create encryption keys that are truly unpredictable, providing significantly stronger security than conventional methods.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-icon">
              <FaLock />
            </div>
            <div className="step-content">
              <h2 className="step-title">Local-Only Encryption</h2>
              <p className="step-description">
                Your data never leaves your device. Files are encrypted locally using AES-256 and quantum-generated keys, and all processing happens directly in your browser. We never see, store, or transmit your data.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-icon">
              <FaServer />
            </div>
            <div className="step-content">
              <h2 className="step-title">Zero Server Storage</h2>
              <p className="step-description">
                Unlike traditional cloud services, we maintain zero server storage of your files or encryption keys. Everything happens locally in your browser, ensuring complete privacy and eliminating the risk of server-side breaches.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="security-note"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="security-icon">
            <FaShieldAlt />
          </div>
          <h3>Your Data, Your Control</h3>
          <p>
            In an era where data breaches and privacy violations are commonplace, QuantumKeep ensures your sensitive information remains solely in your hands. With purely local encryption and zero server storage, your data never leaves your device. No backdoors, no data collection, no compromises.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;

