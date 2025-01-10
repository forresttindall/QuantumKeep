import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const blastConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55
    });

    fire(0.2, {
      spread: 60
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.sendForm('service_9z4q1rg', 'template_l2zhyqf', form.current, 'ZpTIIyS2dofg5_9Ux')
      .then((result) => {
        setStatus('success');
        form.current.reset();
        blastConfetti();
      }, (error) => {
        setStatus('error');
      });
  };

  return (
    <section className="contact-section">
      <div className="gradient-overlay"></div>
      <motion.div 
        className="contact-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>
          <span className="gradient-text">Get in Touch</span>
        </h1>
        <p className="hero-subtitle">
          Have questions about quantum encryption? We're here to help.
        </p>

        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="form-group">
            <label htmlFor="from_name">Name</label>
            <input type="text" id="from_name" name="from_name" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="user_email">Email</label>
            <input type="email" id="user_email" name="user_email" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required />
          </div>

          <button type="submit" className="primary-button" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Message sent successfully!
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Failed to send message. Please try again.
            </motion.div>
          )}
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
