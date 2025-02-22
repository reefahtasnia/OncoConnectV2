import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/DonationForm.css";

const DonationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    reason: "",
    bankStatement: null,
    donationImage: null, // New state for donation image
  });

  const API_BASE_URL = "http://localhost:5000";
  const [userId, setUserId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const fetchUserId = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/get-userid`, {
        withCredentials: true,
      });
      setUserId(response.data.user_id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      await fetchUserId();
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("user_id", userId);
    formDataToSubmit.append("username", formData.name);
    formDataToSubmit.append("amount", formData.amount);
    formDataToSubmit.append("reason", formData.reason);
    formDataToSubmit.append("bank_statement", formData.bankStatement);
    formDataToSubmit.append("donation_image", formData.donationImage); // Include image in form data

    try {
      const response = await axios.post(`${API_BASE_URL}/api/donation`, formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Donation request submitted:", response.data);
      alert("Donation request submitted successfully!");
    } catch (error) {
      console.error("Error submitting donation request:", error.response?.data || error);
      alert("Error occurred! Check console.");
    }
  };

  return (
    <div className="dform-container">
      <div className="dform-box">
        <h2 className="dform-title">Donation Request Form</h2>
        <form onSubmit={handleSubmit} className="dform-form">
          <div className="dform-group">
            <label className="dform-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="dform-input"
              placeholder="Enter your name"
            />
          </div>

          <div className="dform-group">
            <label className="dform-label">Amount Needed</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="dform-input"
              placeholder="Enter required amount"
            />
          </div>

          <div className="dform-group">
            <label className="dform-label">Reason for Asking Donation</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              className="dform-textarea"
              placeholder="Explain why you need this donation"
            ></textarea>
          </div>

          <div className="dform-group">
            <label className="dform-label">Upload Bank Statement (PDF)</label>
            <input
              type="file"
              name="bankStatement"
              onChange={handleFileChange}
              accept=".pdf"
              required
              className="dform-input"
            />
          </div>

          <div className="dform-group">
            <label className="dform-label">Upload  Image </label>
            <input
              type="file"
              name="donationImage"
              onChange={handleFileChange}
              accept="image/*"
              required
              className="dform-input"
            />
          </div>

          <button type="submit" className="dform-button">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
