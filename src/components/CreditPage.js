import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/CreditPage.css";
import cancer5 from './assets/cancer5.jpg';

function CreditPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="warning">
        <p>
          <strong>WARNING TO DONORS:</strong> While supporting cancer-related initiatives is vital, please ensure the organization you donate to is a registered and reputable charity. Be cautious of scams that falsely claim to represent cancer patients or research efforts. Always verify the legitimacy of the charity through official channels or charity watchdogs. Your generosity can save lives—make sure it reaches the right hands.
        </p>
      </div>

      <div className="donation-box">
        <div className="content">
          {/* Left Side: Image */}
          <div className="project-info">
            <img src={cancer5} alt="Project" />
            <h2>Step Forward For A Change</h2>
            <p>
              Add an optional donation to GlobalGiving to amplify my impact:
            </p>
            
          </div>

          {/* Right Side: Form */}
          <form className="donation-form">
  <div className="donation-header">
    <h3>Donate with Credit/Debit Card</h3>
    <button
      type="button"
      className="paypal-link"
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

      
    </div>
  );
}

export default CreditPage;
