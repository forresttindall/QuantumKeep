import React from 'react';
import { Link } from 'react-router-dom';
import './Pricing.css';

const Pricing = () => {
  return (
    <div className="pricing">
      <div className="pricing-container">
        <div className="pricing-header">
          <h1 className="pricing-title">Simple, Transparent Pricing</h1>
          <p className="pricing-subtitle">
            Choose the perfect plan for your security needs. All plans include quantum-resistant encryption.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Basic Plan */}
          <div className="pricing-card">
            <h2 className="plan-name">Basic</h2>
            <div className="plan-price">$6<span>/month</span></div>
            <p className="plan-description">
              Perfect for individual users looking for essential security features.
            </p>
            <ul className="plan-features">
              <li>Quantum-Resistant Encryption</li>
              <li>5 Secure File Shares per Month</li>
              <li>24/7 Email Support</li>
              <li>Mobile Access</li>
            </ul>
            <Link to="/signup?plan=basic" className="plan-button secondary-button">
              Get Started
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="pricing-card popular">
            <div className="popular-badge">MOST POPULAR</div>
            <h2 className="plan-name">Pro</h2>
            <div className="plan-price">$14<span>/month</span></div>
            <p className="plan-description">
              Enhanced security features for professionals and small teams.
            </p>
            <ul className="plan-features">
              <li>Quantum-Resistant Encryption</li>
              <li>Unlimited Secure File Sharing</li>
              <li>24/7 Priority Support</li>
              <li>Mobile Access</li>
              <li>Advanced File Recovery</li>
              <li>Collaboration Tools</li>
            </ul>
            <Link to="/signup?plan=pro" className="plan-button primary-button">
              Get Started
            </Link>
          </div>

          {/* Lifetime Plan */}
          <div className="pricing-card">
            <h2 className="plan-name">Lifetime</h2>
            <div className="plan-price">$49<span>/lifetime</span></div>
            <p className="plan-description">
              One-time payment for lifetime access to all Pro features.
            </p>
            <ul className="plan-features">
              <li>Quantum-Resistant Encryption</li>
              <li>Unlimited Secure File Sharing</li>
              <li>24/7 Dedicated Support</li>
              <li>Mobile Access</li>
              <li>Advanced File Recovery</li>
              <li>Team Collaboration Tools</li>
              <li>Admin Console</li>
              <li>Custom Integration</li>
            </ul>
            <Link to="/signup?plan=lifetime" className="plan-button secondary-button">
              Get Lifetime Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
