import React, { useState, useEffect } from "react";
import "./CSS/donation.css"; 
import Navbar from "./Nav";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const API_BASE_URL = "http://localhost:5000"; // Define base API URL

const DonationPage = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]); // Store dynamic donations

  useEffect(() => {
    // Fetch only approved donations from the backend
    const fetchDonations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/approved-donations`); // Adjust the URL if needed
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Secondary Hero */}
      <section className="don-secondary-hero">
        <div className="don-hero-content">
          <h2>Specialized Care<br />With Compassion and Community</h2>
          <p>Join us in making a difference in the lives of those affected by cancer.</p>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="don-latest-updates">
        <h3>Start Donations</h3>
        <h2>Transparent Donation, See How You<br />Make a Difference</h2>

        <div className="don-updates-grid">
          {donations.length > 0 ? (
            donations.map((donation) => (
              <div key={donation._id} className="don-update-card">
                {/* Show image if available, otherwise show placeholder */}
                <div className="don-image-container">
                  {donation.image_url ? (
                    <img
                      src={`${API_BASE_URL}/${donation.image_url}`} // Ensure correct path
                      alt="Donation"
                      className="don-image"
                    />
                  ) : (
                    <div className="don-placeholder-image"></div> // Placeholder for missing images
                  )}
                </div>

                <div className="don-card-contents">
                  <p><strong>{donation.username}</strong> needs ${donation.amount} for treatment.</p>
                  <p>{donation.reason}</p>
                  <p><strong>Amount raised so far:</strong> ${donation.amount_raised}</p> {/* Display amount raised */}

                  <button
                    className="don-btn-secondary"
                    onClick={() => navigate('/credit', { state: { donation } })} // Pass donation details
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="don-no-donations">No approved donation requests available.</p>
          )}
        </div>
      </section>

      {/* Support Section */}
      <section className="don-faq-section">
        <div className="don-faq-container">
          <div className="don-faq-questions">
            <h3>We Are Here to Help</h3>
            <h2>Supporting Cancer Patients in Need</h2>
            <p>We are always present to help those in need of financial aid for their cancer treatment. Your generosity can change lives and bring hope.</p>
            <button className="don-btn-primary" onClick={() => navigate('/dform')}>
              Apply for Financial Aid
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DonationPage;
