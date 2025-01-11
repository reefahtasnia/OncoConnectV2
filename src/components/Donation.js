import React from 'react';
import "./CSS/donation.css"; // Updated to match the CSS filename
import cancer5 from './assets/cancer5.jpg';
import cancer4 from './assets/cancer4.jpg';
import cancerr from './assets/cancerr.jpg';
import cancer6 from './assets/cancer6.jpg';
import Navbar from "./Nav";

const DonationPage = () => {
  return (
    <div>
      

      {/* Secondary Hero */}
      <section className="don-secondary-hero">
        <div className="don-hero-content">
          <h2>Specialized Care<br />With Compassion and Community</h2>
          <p>Join us in making a difference in the lives of those affected by cancer.</p>
          <button className="don-btn-primary">Donate Now</button>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="don-latest-updates">
        <h3>Latest Updates</h3>
        <h2>Transparent Guidance, See How You<br />Make a Difference</h2>

        <div className="don-updates-grid">
          <div className="don-update-card">
            <img src={cancer5} alt="Patient care" />
            <div className="don-card-contents">
              <h4>Supporting Through Treatment</h4>
              <p>Providing comfort and care during the treatment journey.</p>
              <button className="don-btn-secondary">Donate Now</button>
            </div>
          </div>

          <div className="don-update-card">
            <img src={cancer4} alt="Patient support" />
            <div className="don-card-contents">
              <h4>Community Support Network</h4>
              <p>Building connections that make a difference.</p>
              <button className="don-btn-secondary">Donate Now</button>
            </div>
          </div>

          <div className="don-update-card">
            <img src={cancerr} alt="Patient care" />
            <div className="don-card-contents">
              <h4>Family-Centered Care</h4>
              <p>Supporting families throughout their journey.</p>
              <button className="don-btn-secondary">Donate Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="don-faq-section">
        <div className="don-faq-container">
          <div className="don-faq-questions">
            <h3>Frequently Asked Questions</h3>
            <h2>Have any question for us?</h2>

            <div className="don-question">
              <h4>How can I apply for financial aid for treatment?</h4>
              <span className="don-plus">+</span>
            </div>
            <div className="don-question">
              <h4>What support services are available for families?</h4>
              <span className="don-plus">+</span>
            </div>
            <div className="don-question">
              <h4>How can I volunteer or contribute?</h4>
              <span className="don-plus">+</span>
            </div>
          </div>

          <div className="don-faq-image">
            <img src={cancer6} alt="Pink awareness ribbon" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonationPage;
