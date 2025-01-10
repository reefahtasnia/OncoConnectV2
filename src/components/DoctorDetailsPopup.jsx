import React, { useState } from 'react';
import './CSS/DoctorDetailsPopup.css';
import AppointmentForm from './AppointmentForm';

const DoctorDetailsPopup = ({ doctor, onClose }) => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const handleBooking = () => {
    setShowAppointmentForm(true);
  };

  const handleCloseAppointment = () => {
    setShowAppointmentForm(false);
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
          <div className="doctor-details">
            <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            <h2>{doctor.name}</h2>
            <p className="credentials">{doctor.credentials}</p>
            <p className="hospital">{doctor.hospital}</p>
            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <span key={index} className={`star ${index < doctor.rating ? 'filled' : ''}`}>
                  ★
                </span>
              ))}
              <span className="review-count">({doctor.reviews} reviews)</span>
            </div>
            <h3>About</h3>
            <p>{doctor.about}</p>
            <h3>Working Hours</h3>
            <p>{doctor.workingHours}</p>
            <button className="book-now-btn" onClick={handleBooking}>
              Book Now
            </button>
          </div>
        </div>
      </div>
      {showAppointmentForm && (
        <AppointmentForm 
          onClose={handleCloseAppointment}
          doctorName={doctor.name}
        />
      )}
    </>
  );
};

export default DoctorDetailsPopup;

