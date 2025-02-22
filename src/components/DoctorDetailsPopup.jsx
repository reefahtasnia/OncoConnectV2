import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/DoctorDetailsPopup.css';

const DoctorDetailsPopup = ({ doctor, onClose }) => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [formData, setFormData] = useState({
    user_id:"",
    user_name: '',
    doctor_id:doctor._id,
    
    date: "",
    medium: "Online"
  });
  const [userId, setUserId] = useState(null);

  // Fetch user ID when component mounts
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/get-userid`, {
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


  // Debugging: Log showAppointmentForm state and button click
  useEffect(() => {
    console.log("showAppointmentForm state updated:", showAppointmentForm);
  }, [showAppointmentForm]);

  const handleBooking = () => {
    console.log("Book Now clicked! Showing Appointment Form...");
    setShowAppointmentForm(true);
  };

  const handleCloseAppointment = () => {
    console.log("Closing Appointment Form...");
    setShowAppointmentForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted with data:", formData);

    // Call the API to book the appointment
    try {
      const response = await axios.post('http://localhost:5000/api/appointments', {
        user_id: userId,
        user_name: formData.user_name,
        doctor_id: doctor._id,
        
        date: formData.date,
        medium: formData.medium,
      });

      console.log('Appointment booked successfully:', response.data);
      alert("Appointment booked successfully!");
      setShowAppointmentForm(false); // Close the form after submission
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert("Appointment booked successfully");
    }
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-content">
          <button className="close-btn" onClick={onClose}>&times;</button>
          <div className="doctor-details">
            <img src={doctor?.imagePath || "/default-image.jpg"} alt={doctor?.fullName || "Doctor"} className="doctor-image" />
            <h2>{doctor?.fullName || "Doctor Name"}</h2>
            <p className="credentials">{doctor?.specialization || "Specialization"}</p>
            <p className="hospital">{doctor?.preferredPracticeArea || "Practice Area"}</p>

            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <span key={index} className={`star ${index < (doctor?.ratings || 0) ? 'filled' : ''}`}>
                  ★
                </span>
              ))}
              <span className="review-count">({doctor?.reviews?.length || 0} reviews)</span>
            </div>

            <h3>About</h3>
            <p>{doctor?.aboutDr || "No information available."}</p>

            <h3>Practice Schedule</h3>
            {doctor?.practiceSchedule?.length > 0 ? (
              doctor.practiceSchedule.map((schedule, index) => (
                <div key={index} className="practice-schedule">
                  <h4>{schedule.hospitalName}</h4>
                  <p>{schedule.address}, {schedule.city}</p>
                  <p>Available: {schedule.daysAvailable.join(', ')}</p>
                  <p>Timing: {schedule.startTime} - {schedule.endTime}</p>
                </div>
              ))
            ) : (
              <p>No schedule available.</p>
            )}

            <h3>Certifications</h3>
            <ul>
              {doctor?.certifications?.length > 0 ? (
                doctor.certifications.map((cert, index) => (
                  <li key={index}>{cert.name} ({cert.year})</li>
                ))
              ) : (
                <li>No certifications listed.</li>
              )}
            </ul>

            <button className="book-now-btn" onClick={handleBooking}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Appointment Form */}
      {showAppointmentForm && (
        <div className="popup-overlay appointment-popup">
          <div className="popup-content">
            <div className="appointment-header">
              <h2>Book Appointment</h2>
              <button className="close-btn" onClick={handleCloseAppointment}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="appointment-form">
              <div className="form-group">
                <label>Doctor</label>
                <input type="text" value={doctor?.fullName || "Doctor Name"} disabled />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Enter your name"
                  value={formData.user_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Medium</label>
                <select
                  name="medium"
                  value={formData.medium}
                  onChange={handleChange}
                  required
                >
                  <option value="Online">Online</option>
                  <option value="In-person">In-person</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseAppointment}>
                  Cancel
                </button>
                <button type="submit" className="confirm-btn">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorDetailsPopup;
