import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import Dashboard from './pages/Dashboard';
import Contact from './Contact';
import About from './About';
import './pages/Dashboard.css';
import './Header.css';
import './HeroSection.css';
import './HowItWorks.css';
import './Contact.css';
import './About.css';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <main>
              <HeroSection />
              
            </main>
          } />
          <Route path="/HowItWorks" element={<HowItWorks />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
