import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/CreditPage.css";
import cancer5 from './assets/cancer5.jpg';
import Footer from "./Footer";

function CreditPage() {
  const navigate = useNavigate();

  return (
    <div className="credit-container">
      <div className="credit-warning">
        <p>
          <strong>WARNING TO DONORS:</strong> While supporting cancer-related initiatives is vital, please ensure the organization you donate to is a registered and reputable charity. Be cautious of scams that falsely claim to represent cancer patients or research efforts. Always verify the legitimacy of the charity through official channels or charity watchdogs. Your generosity can save lives—make sure it reaches the right hands.
        </p>
      </div>

      <div className="credit-donation-box">
        <div className="credit-content">
          {/* Left Side: Image */}
          <div className="credit-project-info">
            <img src={cancer5} alt="Project" />
            <h2>STEP FORWARD FOR A BIGGER CHANGE</h2>
            
            <select>
              <option value="4.50">15% ($4.50)</option>
              <option value="3.00">10% ($3.00)</option>
              <option value="1.50">5% ($1.50)</option>
              <option value="0">No additional donation</option>
            </select>
            <p>Total: <strong>$34.50</strong></p>
          </div>

          {/* Right Side: Form */}
          <form className="credit-donation-form">
            <div className="credit-donation-header">
              <h3>Donate with Credit/Debit Card</h3>
              <button
                type="button"
                className="credit-paypal-link"
                onClick={() => navigate("/paypal")}
              >
                Go to PayPal
              </button>
            </div>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Card Number" required />
            <input type="text" placeholder="MM/YY" required />
            <input type="text" placeholder="CVC" required />
            <label>
              <input type="checkbox" />
              Donate anonymously
            </label>
            <button type="submit">Donate Now</button>
          </form>

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreditPage;
