import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import './Header.css';
import { auth } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user] = useAuthState(auth);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header>
      <nav className={`nav ${isNavOpen ? 'openNav' : ''}`}>
        <i 
          className="uil uil-bars navOpenBtn" 
          style={{ height: '35px' }}
          onClick={toggleNav}
        />
        <div className="logocontainer">
          <Link to="/" className="logo" aria-label="Go to QuantumKeep homepage">
            <img 
              src={logo} 
              alt="QuantumKeep Logo" 
              style={{ 
                height: '35px',
                width: 'auto'
              }} 
            />
          </Link>
        </div>
        <ul className="nav-links">
          <i 
            className="uil uil-times navCloseBtn" 
            style={{ height: '35px' }}
            onClick={toggleNav}
          />
          <li>
            <Link to="/Pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/HowItWorks">How It Works</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="auth-buttons">
          {user ? (
            <div className="account-menu">
              <Link to="/dashboard" className="account-icon">
                <i className="uil uil-user-circle"></i>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login" className="login-btn">Log In</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;