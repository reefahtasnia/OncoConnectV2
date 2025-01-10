import React, { useState } from 'react';
import './CSS/AppointmentForm.css';

const AppointmentForm = ({ onClose, doctorName }) => {
  const [formData, setFormData] = useState({
    name: '',
    medium: 'Online',
    date: '',
    time: '',
    period: 'AM',
    cancerType: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="appointment-overlay">
      <div className="appointment-content">
        <div className="appointment-header">
          <h2>Add Appointment</h2>
          <button className="close-btn" onClick={onClose}>
            <span>Close</span>
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Write your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="medium">Medium</label>
              <select
                id="medium"
                name="medium"
                value={formData.medium}
                onChange={handleChange}
                required
              >
                <option value="Online">Online</option>
                <option value="In-Person">In-Person</option>
                <option value="Phone">Phone</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group time-group">
              <label htmlFor="time">Time</label>
              <div className="time-input-group">
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
                <select
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="cancerType">Cancer Type</label>
            <select
              id="cancerType"
              name="cancerType"
              value={formData.cancerType}
              onChange={handleChange}
              required
            >
              <option value="">eg. breast, lung</option>
              <option value="breast">Breast Cancer</option>
              <option value="lung">Lung Cancer</option>
              <option value="blood">Blood Cancer</option>
              <option value="skin">Skin Cancer</option>
              <option value="colorectal">Colorectal Cancer</option>
              <option value="prostate">Prostate Cancer</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="confirm-btn">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;

