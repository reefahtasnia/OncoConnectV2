import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ Correct
 
import "./CSS/AppointmentForm.css";
const API_BASE_URL = "http://localhost:5000"; 

const AppointmentForm = ({ onClose, doctor }) => {
  const [formData, setFormData] = useState({
    user_id: "",  // To be filled after decoding JWT
    user_name: "", 
    doctor_id: doctor._id,
    bmdc_id: "",  // To be fetched from backend
    date: "",
    medium: "Online",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Decode JWT token to get user_id
  useEffect(() => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
    if (token) {
      const decoded = jwtDecode(token);
      setFormData(prev => ({
        ...prev,
        user_id: decoded.userId,  // Extract user ID from JWT
      }));
    }
  }, []);

  // Fetch BMDC ID from backend
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/doctor/${doctor._id}`);
        setFormData(prev => ({ ...prev, bmdc_id: response.data.bmdc_id }));
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctorDetails();
  }, [doctor._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.date) {
      setErrorMessage("Please select an appointment date.");
      return;
    }

    // Get the token from cookies
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];

    try {
      console.log("Sending token:", token);
      // Pass the token in the headers
      await axios.post(`${API_BASE_URL}/api/submit-appointment`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token here
        }
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
            <input type="text" value={doctor.fullName} disabled />
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
