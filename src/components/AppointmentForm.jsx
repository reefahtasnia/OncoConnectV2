import { useState, useEffect } from "react";
import axios from "axios";

import "./CSS/AppointmentForm.css";
const API_BASE_URL = "http://localhost:5000"; 

const AppointmentForm = ({ onClose, Doctor }) => {
  const [formData, setFormData] = useState({
    user_id: "",  // To be fetched from backend
    user_name: "", 
    doctors_id: Doctor ? Doctor._id : "",  // Set to empty string if Doctor is not yet available
    date: "",
    medium: "Online",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Fetch user_id from backend using token
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/get-userid`, {
          withCredentials: true, // Ensures cookies are sent with the request
        });
        setFormData(prev => {
          const updatedData = { ...prev, user_id: response.data.user_id };
          return updatedData;
        });
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
  
    fetchUserId();
  }, []);

  if (!Doctor) {
    return <div>Loading...</div>; // Loading state for when Doctor is not yet available
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
  
    if (!formData.date) {
      setErrorMessage("Please select an appointment date.");
      return;
    }
  
    // Make sure the keys match the backend schema
    const requestBody = {
      user_id: formData.user_id,
      user_name: formData.user_name,
      doctor_id: formData.doctors_id,  // Changed doctors_id to doctor_id
      date: formData.date,
      medium: formData.medium,
    };
  
    try {
      await axios.post(`${API_BASE_URL}/api/appointments`, requestBody, {
        withCredentials: true, // Ensures token cookies are included
      });
      alert("Appointment booked successfully!");
      onClose();
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Something went wrong.");
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="appointment-overlay">
      <div className="appointment-content">
        <div className="appointment-header">
          <h2>Add Appointment</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-group">
            <label>Doctor</label>
            <input type="text" value={Doctor.fullName} disabled />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="user_name" placeholder="Enter your name" value={formData.user_name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Medium</label>
            <select name="medium" value={formData.medium} onChange={handleChange} required>
              <option value="Online">Online</option>
              <option value="In-person">In-person</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="confirm-btn">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
