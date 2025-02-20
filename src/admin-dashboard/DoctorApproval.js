import React, { useState } from "react";
import Sidebar from "./components/sidebar.js";
import "./DoctorApprovals.css";

function DoctorApprovals() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [emailContent, setEmailContent] = useState("");
  const [aboutContent, setAboutConent] = useState("");
  // Sample doctors data array matching the schema
  const doctors = [
    {
      id: 1,
      fullName: "Dr. John Doe",
      gender: "Male",
      email: "john.doe@example.com",
      password: "hashed_password",
      BMDC: "B18SJD78",
      phoneNumber: "+1234567890",
      specialization: "Cardiologist",
      preferredPracticeArea: "Dhaka North",
      practiceSchedule: [
        {
          hospitalName: "City Hospital",
          address: "123 Medical Lane",
          area: "Gulshan",
          city: "Dhaka",
          startTime: "09:00",
          endTime: "17:00",
          daysAvailable: ["Monday", "Wednesday", "Friday"],
        },
      ],
      preferredPatientNo: 20,
      dateOfBirth: "1980-05-15",
      experience: 15,
      certifications: [
        { name: "Cardiology Specialist", year: 2010 },
        { name: "Advanced Cardiac Life Support", year: 2015 },
      ],
      isVerified: false,
      preferredCounseling: "Physical",
      counsellingtypes: ["Mental Health Counseling", "Group Therapy"],
      consultationFees: 2000,
      imagePath: "/placeholder.svg?height=150&width=150",
      ratings: 4.5,
      reviews: [
        {
          patientName: "Jane Smith",
          comment: "Excellent doctor",
          rating: 5,
        },
      ],
      aboutDr:
        "Dr. John Doe is a practicing Cardiologist with over 15 years of experience",
      createdAt: "2024-02-20",
      updatedAt: "2024-02-20",
    },
    {
      id: 2,
      fullName: "Dr. Jane Plain",
      specialization: "Dermatologist",
      email: "jane.plain@example.com",
      BMDC: "B18SJD78",
      phoneNumber: "+1234567890",
      // ... other fields similar to above
    },
    {
      id: 3,
      fullName: "Dr. Whitney",
      specialization: "Haematologist",
      email: "whitney@example.com",
      BMDC: "B18SJD78",
      phoneNumber: "+1234567890",
      // ... other fields similar to above
    },
  ];

  const handleView = (doctor) => {
    setSelectedDoctor(doctor);
    setEmailContent(
      `Dear Dr ${
        doctor.fullName.split(" ")[1]
      },\nYour account has been approved.`
    );
  };

  const handleVerify = () => {
    console.log(
      "Verifying doctor:",
      selectedDoctor.id,
      "with email:",
      emailContent
    );
    // Add verification logic here
    setSelectedDoctor(null);
  };

  const handleReject = () => {
    console.log(
      "Rejecting doctor:",
      selectedDoctor.id,
      "with email:",
      emailContent
    );
    // Add rejection logic here
    setSelectedDoctor(null);
  };

  return (
    <div className="admin-doctor-container">
      <Sidebar />
      <main className="admin-doctor-main">
        <h1 className="admin-doctor-title">Doctor Approvals</h1>

        <div className="admin-doctor-section">
          <h2 className="admin-doctor-subtitle">New Doctor Registrations</h2>

          <div className="admin-doctor-table">
            <div className="admin-doctor-table-header">
              <div>Full Name</div>
              <div>Email</div>
              <div>BMDC Number</div>
              <div>Phone</div>
              <div>Specialization</div>
              <div>Actions</div>
            </div>

            {doctors.map((doctor) => (
              <div key={doctor.id} className="admin-doctor-table-row">
                <div>{doctor.fullName}</div>
                <div>{doctor.email}</div>
                <div>{doctor.BMDC}</div>
                <div>{doctor.phoneNumber}</div>
                <div>{doctor.specialization}</div>
                <div>
                  <button
                    className="admin-doctor-view-button"
                    onClick={() => handleView(doctor)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedDoctor && (
          <div className="admin-doctor-details">
            <h2 className="admin-doctor-subtitle">
              Doctor Details: {selectedDoctor.fullName}
            </h2>

            <div className="admin-doctor-info-grid">
              <div className="admin-doctor-info-column">
                <div className="admin-doctor-info-row">
                  <label>Email:</label>
                  <span>{selectedDoctor.email}</span>
                </div>
                <div className="admin-doctor-info-row">
                  <label>Phone:</label>
                  <span>{selectedDoctor.phoneNumber}</span>
                </div>
                <div className="admin-doctor-info-row">
                  <label>Gender:</label>
                  <span>{selectedDoctor.gender}</span>
                </div>
                <div className="admin-doctor-info-row">
                  <label>Certifications:</label>
                  <span>
                    {selectedDoctor.certifications
                      ?.map((cert) => `${cert.name} (${cert.year})`)
                      .join(", ")}
                  </span>
                </div>
              </div>

              <div className="admin-doctor-info-column">
                <div className="admin-doctor-info-row">
                  <label>BMDC Number:</label>
                  <span>{selectedDoctor.BMDC}</span>
                </div>
                <div className="admin-doctor-info-row">
                  <label>Specialization:</label>
                  <span>{selectedDoctor.specialization}</span>
                </div>
                <div className="admin-doctor-info-row">
                  <label>Date of Birth:</label>
                  <span>{selectedDoctor.dateOfBirth}</span>
                </div>
                <div className="admin-doctor-info-row">
                  <label>Consultation fee:</label>
                  <span>৳{selectedDoctor.consultationFees}</span>
                </div>
              </div>

              <div className="admin-doctor-schedule-section">
                <label>Practice Schedule:</label>
                <div className="admin-doctor-schedule">
                  {selectedDoctor.practiceSchedule?.map((schedule, index) => (
                    <div key={index} className="admin-doctor-schedule-item">
                      <strong>{schedule.hospitalName}</strong>
                      <p>
                        {schedule.address}, {schedule.area}, {schedule.city}
                      </p>
                      <p>
                        {schedule.startTime} - {schedule.endTime}
                      </p>
                      <p>{schedule.daysAvailable.join(", ")}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="admin-doctor-content-section">
              <div className="admin-doctor-about">
                <h3>About this doctor:</h3>
                <textarea
                  value={selectedDoctor.aboutDr}
                  className="admin-doctor-textarea"
                  onChange={(e) => setAboutConent(e.target.value)}
                />
              </div>

              <div className="admin-doctor-email">
                <h3>Email Content:</h3>
                <textarea
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className="admin-doctor-textarea"
                />
              </div>
            </div>

            <div className="admin-doctor-actions">
              <button
                className="admin-doctor-verify-button"
                onClick={handleVerify}
              >
                Submit Description and Verify
              </button>
              <button
                className="admin-doctor-reject-button"
                onClick={handleReject}
              >
                Don't Verify and Send Email
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DoctorApprovals;
