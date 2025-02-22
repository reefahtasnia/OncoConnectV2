"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import BottomNav from "./components/bottom-nav";
import UserDropdown from "./components/user-dropdown";
import NotificationsButton from "./components/notifications";
import "./dashboard.css";
import doctorImage from "./user.png";

export default function MyDoctorsPage() {
  const [activeSection, setActiveSection] = useState("doctors");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReportUpload, setShowReportUpload] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const doctors = [
    {
      id: "doc123",
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      profilePic: doctorImage,
      visits: 5,
      lastVisit: "15/03/23 - Online",
      upcoming: "25/04/23 - In-person",
      status: "ongoing",
      bgColor: "#E3F2FD",
      details: {
        email: "sarah.johnson@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Medical Center Dr, Cityville, State 12345",
        education: [
          {
            degree: "MD in Cardiology",
            institution: "Harvard Medical School",
            year: 2010,
          },
          {
            degree: "Fellowship in Interventional Cardiology",
            institution: "Johns Hopkins Hospital",
            year: 2012,
          },
          {
            degree: "Board Certification in Cardiovascular Disease",
            institution: "American Board of Internal Medicine",
            year: 2013,
          },
        ],
        experience: "15 years",
      },
      appointments: [
        { date: "15/03/23", type: "Online", notes: "Regular checkup" },
        { date: "25/04/23", type: "In-person", notes: "Follow-up appointment" },
      ],
    },
    {
      id: "doc456",
      name: "Dr. Michael Chen",
      specialization: "Neurologist",
      profilePic: doctorImage,
      visits: 2,
      lastVisit: "02/04/23 - In-person",
      upcoming: "-",
      status: "completed",
      bgColor: "#E8F5E9",
      details: {
        email: "michael.chen@example.com",
        phone: "+1 (555) 987-6543",
        address: "456 Neurology Ave, Braintown, State 67890",
        education: [
          {
            degree: "MD in Neurology",
            institution: "Stanford Medical School",
            year: 2012,
          },
          {
            degree: "Fellowship in Neurosurgery",
            institution: "Mayo Clinic",
            year: 2014,
          },
        ],
        experience: "10 years",
      },
      appointments: [
        { date: "02/04/23", type: "In-person", notes: "Initial consultation" },
      ],
    },
  ];

  const handleDoctorDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setIsSidebarOpen(true);
  };

  const handleCloseDetails = () => {
    setIsSidebarOpen(false);
    setTimeout(() => {
      setSelectedDoctor(null);
      setShowReviewForm(false);
      setShowReportUpload(false);
    }, 300); // Match transition duration
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement review submission logic
    console.log("Review submitted");
    setShowReviewForm(false);
  };

  const handleReportUpload = (event) => {
    event.preventDefault();
    // TODO: Implement report upload logic
    console.log("Report uploaded");
    setShowReportUpload(false);
  };

  return (
    <div className="user-dashboard">
      <Sidebar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>My Doctors</h1>
          <div className="header-actions">
            <UserDropdown
              username="John Doe"
              avatar={doctorImage}
              onLogout={() => {}}
            />
            <NotificationsButton notifications={[]} />
          </div>
        </header>

        <div className="dashboard-content">
          <div className="doctors-container">
            <div className="section-header">
              <h2>Consulted Doctors</h2>
              <button
                className="add-new-doctors-button"
                onClick={(e) => {
                  window.location.href = "/docfind";
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add New Doctor
              </button>
            </div>

            <div className="doctors-grid">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-header">
                    <div
                      className="doctor-avatar"
                      style={{ backgroundColor: doctor.bgColor }}
                    >
                      <img
                        src={doctor.profilePic || "/placeholder.svg"}
                        alt={doctor.name}
                      />
                    </div>
                    <div className="doctor-info">
                      <h3>{doctor.name}</h3>
                      <p className="specialization">{doctor.specialization}</p>
                      <span className={`status-badge ${doctor.status}`}>
                        {doctor.status === "ongoing"
                          ? "Active Treatment"
                          : "Completed Treatment"}
                      </span>
                    </div>
                  </div>

                  <div className="doctor-stats">
                    <div className="stat-item">
                      <span className="stat-label">Visits</span>
                      <span className="stat-value">{doctor.visits}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Last Visit</span>
                      <span className="stat-value">{doctor.lastVisit}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Upcoming</span>
                      <span className="stat-value">{doctor.upcoming}</span>
                    </div>
                  </div>

                  <div className="doctor-actions">
                    <button
                      className="doctor-details-button"
                      onClick={() => handleDoctorDetails(doctor)}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Details
                    </button>
                    <button
                      className="send-report-button"
                      onClick={() => setShowReportUpload(true)}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                      </svg>
                      Send Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedDoctor && (
            <div className="doctor-details-sidebar">
              <button className="details-close-button" onClick={handleCloseDetails}>
                ×
              </button>
              <h2>{selectedDoctor.name}</h2>
              <p>{selectedDoctor.specialization}</p>
              <div className="doctor-details">
                <h3>Contact Information</h3>
                <p>Email: {selectedDoctor.details.email}</p>
                <p>Phone: {selectedDoctor.details.phone}</p>
                <p>Address: {selectedDoctor.details.address}</p>
                <h3>Professional Information</h3>
                <div className="education-list">
                  <h4>Education:</h4>
                  <ul>
                    {selectedDoctor.details.education.map((edu, index) => (
                      <li key={index} className="education-item">
                        <span className="degree">{edu.degree}</span>
                        <span className="institution">{edu.institution}</span>
                        <span className="year">{edu.year}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="experience-info">Experience: {selectedDoctor.details.experience}</p>
              </div>
              <div className="appointment-details">
                <h3>Appointment History</h3>
                {selectedDoctor.appointments.map((appointment, index) => (
                  <div key={index} className="appointment-item">
                    <p>Date: {appointment.date}</p>
                    <p>Type: {appointment.type}</p>
                    <p>Notes: {appointment.notes}</p>
                  </div>
                ))}
              </div>
              <button
                className="doctor-details-button"
                onClick={() => setShowReviewForm(true)}
              >
                Rate and Review
              </button>
            </div>
          )}

          {showReviewForm && (
            <div className="review-form-overlay">
              <div className="review-form">
                <h3>Rate and Review Dr. {selectedDoctor.name}</h3>
                <form onSubmit={handleReviewSubmit}>
                  <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <select id="rating" name="rating" required>
                      <option value="">Select a rating</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="review">Review:</label>
                    <textarea id="review" name="review" required></textarea>
                  </div>
                  <button type="submit" className="submit-review-button">
                    Submit Review
                  </button>
                  <button
                    type="button"
                    className="cancel-review-button"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}

          {showReportUpload && (
            <div className="report-upload-overlay">
              <div className="report-upload-form">
                <h3>Upload Report</h3>
                <form onSubmit={handleReportUpload}>
                  <div className="form-group">
                    <label htmlFor="report-file">
                      Select File (PDF, JPG, PNG):
                    </label>
                    <input
                      type="file"
                      id="report-file"
                      name="report-file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="report-description">Description:</label>
                    <textarea
                      id="report-description"
                      name="report-description"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-review-button">
                    Upload Report
                  </button>
                  <button
                    type="button"
                    className="cancel-review-button"
                    onClick={() => setShowReportUpload(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        <BottomNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </main>
    </div>
  );
}
