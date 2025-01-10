import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from './images/logo.png';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={logo} alt="QuantumKeep Logo" />
        </Link>

        <button className="mobile-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/Dashboard" className="nav-link" onClick={closeMenu}>
            Dashboard
          </Link>
          <Link to="/HowItWorks" className="nav-link" onClick={closeMenu}>
            How It Works
          </Link>
          <Link to="/About" className="nav-link" onClick={closeMenu}>
            About
          </Link>
          <Link to="/Contact" className="nav-link" onClick={closeMenu}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
