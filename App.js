import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Pricing from './Pricing';
import Dashboard from './pages/Dashboard';
import Contact from './Contact';
import About from './About';
import './pages/Dashboard.css';
import './auth/Auth.css';
import './Header.css';
import './HeroSection.css';
import './HowItWorks.css';
import './Pricing.css';
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
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
