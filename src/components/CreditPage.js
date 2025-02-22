import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CSS/CreditPage.css";
import cancer5 from './assets/cancer5.jpg';
import Footer from "./Footer";

function CreditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const donation = location.state?.donation || {}; // Get passed donation details

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = async (event, donation) => {
    event.preventDefault();
    
    if (!email || !amount || isNaN(amount) || amount <= 0) {
      alert("Invalid email or amount.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donation_id: donation._id,
          donor_email: email,
          amount
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        // navigate("/donation"); // Redirect after successful donation
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error processing donation:", error);
      alert("Donation failed, please try again.");
    }
  };

  return (
    <div className="credit-container">
      <div className="credit-warning">
        <p>
          <strong>WARNING TO DONORS:</strong> While supporting cancer-related initiatives is vital, please ensure the organization you donate to is a registered and reputable charity.
        </p>
      </div>

      <div className="credit-donation-box">
        <div className="credit-content">
          {/* Left Side: Image */}
          <div className="credit-project-info">
            <img src={donation.image_url} alt="Project" />
            <h2>Donate to {donation.username}</h2>
            <p>Needed: ${donation.amount - donation.amount_raised}</p>
          </div>

          {/* Right Side: Payment Form */}
          <form className="credit-donation-form" onSubmit={(e) => handlePayment(e, donation)}>
            <div className="credit-donation-header">
              <h3>Donate with Credit/Debit Card</h3>
              <button type="button" className="credit-paypal-link" onClick={() => navigate("/paypal")}>
                Go to PayPal
              </button>
            </div>
            <input
              type="text"
              placeholder="Full Name"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Card Number"
              required
            />
            <input
              type="text"
              placeholder="MM/YY"
              required
            />
            <input
              type="text"
              placeholder="CVC"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            
            <button type="submit">Donate Now</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreditPage;
