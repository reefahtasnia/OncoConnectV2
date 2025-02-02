import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CSS/doctorSignup.css";
import background from "./assets/loginbg.png";

export default function DoctorSignup() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  // Preserve email and password from previous page
  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    password: location.state?.password || "",
    fullName: "",
    gender: "",
    bmdcNumber: "",
    phoneNumber: "",
    hospitalName: "",
    hospitalAddress: "",
    hospitalArea: "",
    hospitalCity: "",
    startTime: "",
    endTime: "",
    daysAvailable: "",
    maxPatients: "",
    dateOfBirth: "",
    degrees: [{ name: "MBBS", year: "" }],
    yearsOfExperience: "",
    specialization: "",
    consultationType: "",
    consultationFee: "",
  });

  const [showSpecialFields, setShowSpecialFields] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "specialization") {
      const specialTypes = ["Psychiatrist", "Therapist", "Consultant"];
      setShowSpecialFields(specialTypes.includes(value));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDegreeChange = (index, field, value) => {
    const newDegrees = [...formData.degrees];
    newDegrees[index] = {
      ...newDegrees[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      degrees: newDegrees,
    }));
  };

  const addDegree = () => {
    if (formData.degrees.length < 10) {
      setFormData((prev) => ({
        ...prev,
        degrees: [...prev.degrees, { name: "", year: "" }],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/doctor-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Doctor signup successful! Please log in.");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleBackToStep1 = () => {
    if (window.confirm("Your data will be erased")) {
      setCurrentStep(1);
    }
  };

  const handleBackToSignup = () => {
    if (window.confirm("Your data will be erased")) {
      navigate("/signup");
    }
  };

  const renderStep1 = () => (
    <>
      <div className="doctor-form-group">
        <input
          type="text"
          name="fullName"
          className="doctor-input"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="doctor-form-group">
        <select
          name="gender"
          className="doctor-select"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="doctor-form-group">
        <input
          type="text"
          name="bmdcNumber"
          className="doctor-input"
          placeholder="BMDC Number"
          value={formData.bmdcNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="doctor-form-group">
        <input
          type="tel"
          name="phoneNumber"
          className="doctor-input"
          placeholder="Phone number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="doctor-subtitle">Currently Practicing In:</div>
      <div className="doctor-form-group">
        <input
          type="text"
          name="hospitalName"
          className="doctor-input"
          placeholder="Hospital Name"
          value={formData.hospitalName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="doctor-form-group">
        <input
          type="text"
          name="hospitalAddress"
          className="doctor-input"
          placeholder="Hospital Address"
          value={formData.hospitalAddress}
          onChange={handleChange}
          required
        />
      </div>
      <div className="doctor-form-group">
        <input
          type="text"
          name="hospitalArea"
          className="doctor-input"
          placeholder="Hospital Area"
          value={formData.hospitalArea}
          onChange={handleChange}
          required
        />
      </div>
      <div className="doctor-form-group">
        <input
          type="text"
          name="hospitalCity"
          className="doctor-input"
          placeholder="Hospital City"
          value={formData.hospitalCity}
          onChange={handleChange}
          required
        />
      </div>
      <div className="doctor-form-group">
        <input
          type="time"
          name="startTime"
          className="doctor-time-input"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
      </div>
      <div className="doctor-form-group">
        <input
          type="time"
          name="endTime"
          className="doctor-time-input"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
      </div>
      <div className="doctor-form-group">
        <select
          name="daysAvailable"
          className="doctor-select"
          value={formData.daysAvailable}
          onChange={handleChange}
          required
        >
          <option value="">Days Available</option>
          <option value="weekdays">Weekdays</option>
          <option value="weekend">Weekend</option>
          <option value="all">All Days</option>
        </select>
      </div>
      <div className="doctor-form-group">
        <input
          type="number"
          name="maxPatients"
          className="doctor-input"
          placeholder="Max number of patient visits in a day"
          value={formData.maxPatients}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="doctor-form-group">
        <label className="doctor-label">Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          className="doctor-input"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>
      <div className="doctor-subtitle">Certifications</div>
      {formData.degrees.map((degree, index) => (
        <div
          key={index}
          className="doctor-form-group"
          style={{ display: "flex", gap: "15px" }}
        >
          <input
            type="text"
            className="doctor-input"
            placeholder="Name of Degree"
            value={degree.name}
            onChange={(e) => handleDegreeChange(index, "name", e.target.value)}
            required
          />
          <input
            type="text"
            className="doctor-input"
            placeholder="Year"
            value={degree.year}
            onChange={(e) => handleDegreeChange(index, "year", e.target.value)}
            required
          />
        </div>
      ))}
      {formData.degrees.length < 10 && (
        <button type="button" onClick={addDegree} className="doctor-add-more">
          + Add more
        </button>
      )}
      <div className="doctor-form-group">
        <input
          type="text"
          name="yearsOfExperience"
          className="doctor-input"
          placeholder="Years of Experience"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          required
        />
      </div>
      <div className="doctor-form-group">
        <input
          type="text"
          name="specialization"
          className="doctor-input"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        />
      </div>
      {showSpecialFields && (
        <>
          <div className="doctor-form-group">
            <select
              name="consultationType"
              className="doctor-select"
              value={formData.consultationType}
              onChange={handleChange}
              required
            >
              <option value="">Consultation Type</option>
              <option value="Online">Online</option>
              <option value="Physical">In Person</option>
              <option value="Call">Over Phone</option>
            </select>
          </div>
          <div className="doctor-form-group">
            <input
              type="number"
              name="consultationFee"
              className="doctor-input"
              placeholder="Consultation Fee (Tk)"
              value={formData.consultationFee}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}
    </>
  );

  return (
    <div className="doctor-signup-container">
      <div className="doctor-image-section">
        <img
          src={background || "/placeholder.svg"}
          alt="Purple awareness ribbon in hands"
        />
      </div>
      <div className="doctor-form-section">
        <div className="doctor-form-container">
          <button
            onClick={currentStep === 1 ? handleBackToSignup : handleBackToStep1}
            className="doctor-back-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15.54 19.54L9 13h13v-2H9l6.54-6.54L14 3l-9 9l9 9z"
              />
            </svg>
          </button>
          <h1 className="doctor-title">Doctor Sign Up</h1>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 ? renderStep1() : renderStep2()}
            <button type="submit" className="doctor-button">
              {currentStep === 1 ? "Next" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
