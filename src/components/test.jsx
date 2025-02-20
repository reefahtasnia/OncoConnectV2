import React, { useState } from "react";

function AdminDoctorManagement() {
  // Dummy data for new doctor registrations
  const dummyDoctors = [
    {
      _id: "1",
      fullName: "Dr. John Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1234567890",
      specialization: "Cardiologist",
      practiceSchedule: [
        { hospitalName: "City Hospital", city: "New York", daysAvailable: ["Monday", "Wednesday"] },
      ],
      certifications: [{ name: "Board Certified", year: 2015 }],
    },
    {
      _id: "2",
      fullName: "Dr. Jane Smith",
      email: "jane.smith@example.com",
      phoneNumber: "+9876543210",
      specialization: "Dermatologist",
      practiceSchedule: [
        { hospitalName: "SkinCare Clinic", city: "Los Angeles", daysAvailable: ["Tuesday", "Thursday"] },
      ],
      certifications: [{ name: "Dermatology Expert", year: 2018 }],
    },
  ];

  const [newDoctors, setNewDoctors] = useState(dummyDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorDescription, setDoctorDescription] = useState("");
  const [emailContent, setEmailContent] = useState("");

  const verifyDoctor = (doctorId) => {
    setNewDoctors(newDoctors.filter((doctor) => doctor._id !== doctorId));
    alert("Doctor verified and email sent!");
  };

  const dontVerifyDoctor = (doctorId) => {
    setNewDoctors(newDoctors.filter((doctor) => doctor._id !== doctorId));
    alert("Doctor not verified and email sent!");
  };

  return (
    <div className="admin-dashboard">
      <h2>New Doctor Registrations</h2>
      <div className="doctor-registration-section">
        <div className="doctor-list">
          <h3>Doctors Pending Verification</h3>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Specialization</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newDoctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>{doctor.fullName}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phoneNumber}</td>
                  <td>{doctor.specialization}</td>
                  <td>
                    <button onClick={() => setSelectedDoctor(doctor)}>View</button>
                    <button onClick={() => verifyDoctor(doctor._id)}>Verify & Send Email</button>
                    <button onClick={() => dontVerifyDoctor(doctor._id)}>Don't Verify & Send Email</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDoctor && (
        <div className="doctor-details-section">
          <h3>Doctor Details: {selectedDoctor.fullName}</h3>
          <p><strong>Email:</strong> {selectedDoctor.email}</p>
          <p><strong>Phone:</strong> {selectedDoctor.phoneNumber}</p>
          <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
          <p><strong>Practice Schedule:</strong> {selectedDoctor.practiceSchedule.map((schedule, index) => (
            <span key={index}>{schedule.hospitalName} - {schedule.city} ({schedule.daysAvailable.join(", ")})</span>
          ))}</p>
          <p><strong>Certifications:</strong> {selectedDoctor.certifications.map((cert, index) => (
            <span key={index}>{cert.name} ({cert.year})</span>
          ))}</p>
          
          <h4>About This Doctor</h4>
          <textarea
            placeholder="Write a description about the doctor..."
            value={doctorDescription}
            onChange={(e) => setDoctorDescription(e.target.value)}
            rows="4"
            cols="50"
          ></textarea>
          
          <h4>Email Content</h4>
          <textarea
            placeholder="Write the email content to send to the doctor..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            rows="4"
            cols="50"
          ></textarea>
          
          <button onClick={() => verifyDoctor(selectedDoctor._id)}>Submit Description & Verify</button>
          <button onClick={() => dontVerifyDoctor(selectedDoctor._id)}>Don't Verify & Send Email</button>
        </div>
      )}
    </div>
  );
}

export default AdminDoctorManagement;
