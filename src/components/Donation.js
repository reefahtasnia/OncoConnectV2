import React from 'react';
import "./CSS/donation.css"; // Updated to match the CSS filename
import cancer5 from './assets/cancer5.jpg';
import cancer4 from './assets/cancer4.jpg';
import cancerr from './assets/cancerr.jpg';
import cancer6 from './assets/cancer6.jpg';
import Navbar from "./Nav";
import { useNavigate } from 'react-router-dom';

const DonationPage = () => {
  const navigate = useNavigate();
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
        <h3>Start Donations</h3>
        <h2>Transparent Donation, See How You<br />Make a Difference</h2>

        <div className="don-updates-grid">
          <div className="don-update-card">
            <img src={cancer5} alt="Patient care" />
            <div className="don-card-contents">
              
              <p>Martha, a young cancer fighter, urgently needs financial assistance to continue her treatment. Your support can help her embrace a healthier and brighter future.</p>
              <button className="don-btn-secondary"
               onClick={() => navigate('/credit')}
              >Donate Now</button>
            </div>
          </div>

          <div className="don-update-card">
            <img src={cancer4} alt="Patient support" />
            <div className="don-card-contents">
              
              <p>Baby Mary, a brave little fighter battling cancer, urgently needs your support to continue her treatment. Your contribution can give her a chance at life and hope for a brighter future.</p>
              <button className="don-btn-secondary">Donate Now</button>
            </div>
          </div>

          <div className="don-update-card">
            <img src={cancerr} alt="Patient care" />
            <div className="don-card-contents">
             
              <p>Camila, an elderly woman courageously facing cancer, is in urgent need of financial support for her treatment. Your kindness can bring comfort and hope to her challenging journey.</p>
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
