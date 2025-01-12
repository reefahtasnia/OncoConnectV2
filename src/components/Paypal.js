import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/PaypalPage.css";
import paypalImage from './assets/cancer5.jpg'; // Replace with your actual image path

function PaypalPage() {
  const navigate = useNavigate();

  return (
    <div className="paypal-container">
      <div className="paypal-warning">
        <p>
          <strong>WARNING TO DONORS:</strong> Please ensure the PayPal account you are using for donations is secure. Only donate to reputable organizations. Beware of phishing scams. Always verify the charity's PayPal account before proceeding.
        </p>
      </div>

      <div className="paypal-donation-box">
        <div className="paypal-content">
          {/* Left Side: Image */}
          <div className="paypal-project-info">
            <img src={paypalImage} alt="Project" />
            <h2>Support Cancer Research Initiatives</h2>

            <select>
              <option value="4.50">15% ($4.50)</option>
              <option value="3.00">10% ($3.00)</option>
              <option value="1.50">5% ($1.50)</option>
              <option value="0">No additional donation</option>
            </select>
            <p>Total: <strong>$34.50</strong></p>
          </div>

          {/* Right Side: Form */}
          <form className="paypal-donation-form">
            <div className="paypal-donation-header">
              <h3>Donate with PayPal</h3>
              <button
                type="button"
                className="paypal-link"
                onClick={() => navigate("/credit")}
              >
                Go to Credit/Debit Card
              </button>
            </div>
            <input type="email" placeholder="PayPal Email" required />
            <input type="text" placeholder="Billing Address" required />
            <input type="text" placeholder="Postal Code" required />
            <label>
              <input type="checkbox" />
              Donate anonymously
            </label>
            <button type="submit">Donate Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaypalPage;
