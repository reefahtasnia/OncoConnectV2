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
            <img src={doctor.imagePath} alt={doctor.fullName} className="doctor-image" />
            <h2>{doctor.fullName}</h2>
            <p className="credentials">{doctor.specialization}</p>
            <p className="hospital">{doctor.preferredPracticeArea}</p>
            
            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <span key={index} className={`star ${index < doctor.ratings ? 'filled' : ''}`}>
                  ★
                </span>
              ))}
              <span className="review-count">({doctor.reviews.length} reviews)</span>
            </div>
            
            <h3>About</h3>
            <p>{doctor.aboutDr}</p>
            
            <h3>Practice Schedule</h3>
            {doctor.practiceSchedule.map((schedule, index) => (
              <div key={index} className="practice-schedule">
                <h4>{schedule.hospitalName}</h4>
                <p>{schedule.address}, {schedule.city}</p>
                <p>Available: {schedule.daysAvailable.join(', ')}</p>
                <p>Timing: {schedule.startTime} - {schedule.endTime}</p>
              </div>
            ))}
            
            <h3>Certifications</h3>
            <ul>
              {doctor.certifications.map((cert, index) => (
                <li key={index}>{cert.name} ({cert.year})</li>
              ))}
            </ul>

            <button className="book-now-btn" onClick={handleBooking}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {showAppointmentForm && (
        <AppointmentForm 
          onClose={handleCloseAppointment}
          doctorName={doctor.fullName}
        />
      )}
    </>
  );
};

export default DoctorDetailsPopup;
