import React from 'react';
import "./CSS/donation.css";
import cancer5 from './assets/cancer5.jpg';
import cancer4 from './assets/cancer4.jpg';
import cancerr from './assets/cancerr.jpg';
import cancer6 from './assets/cancer6.jpg';
import Navbar from "./Nav";


const DonationPage = () => {
  return (
     
    <div>
        
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Share The Love,<br />Lend A Hand</h1>
          <p>Supporting and empowering those affected by cancer through compassionate care and community.</p>
          <button className="btn-primary">Learn More</button>
        </div>
      </section>

      {/* Secondary Hero */}
      <section className="secondary-hero">
        <div className="hero-content">
          <h2>Specialized Care<br />With Compassion and Community</h2>
          <p>Join us in making a difference in the lives of those affected by cancer.</p>
          <button className="btn-primary">Get Involved</button>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="latest-updates">
        <h3>LATEST UPDATES</h3>
        <h2>Transparent Guidance, See How You<br />Make a Difference</h2>

        <div className="updates-grid">
          <div className="update-card">
            <img src={cancer5} alt="Patient care" />
            <div className="card-content">
              <h4>Supporting Through Treatment</h4>
              <p>Providing comfort and care during the treatment journey.</p>
              <button className="btn-secondary">Donate Now</button>
            </div>
          </div>

          <div className="update-card">
            <img src={cancer4} alt="Patient support" />
            <div className="card-content">
              <h4>Community Support Network</h4>
              <p>Building connections that make a difference.</p>
              <button className="btn-secondary">Donate Now</button>
            </div>
          </div>

          <div className="update-card">
            <img src={cancerr} alt="Patient care" />
            <div className="card-content">
              <h4>Family-Centered Care</h4>
              <p>Supporting families throughout their journey.</p>
              <button className="btn-secondary">Donate Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-questions">
            <h3>FREQUENTLY ASKED QUESTIONS</h3>
            <h2>Have any question for us?</h2>

            <div className="question">
              <h4>How can I apply for financial aid for treatment?</h4>
              <span className="plus">+</span>
            </div>
            <div className="question">
              <h4>What support services are available for families?</h4>
              <span className="plus">+</span>
            </div>
            <div className="question">
              <h4>How can I volunteer or contribute?</h4>
              <span className="plus">+</span>
            </div>
          </div>

          <div className="faq-image">
            <img src={cancer6} alt="Pink awareness ribbon" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonationPage;
