import React, { useState } from "react";
import Navbar from "./Nav";
const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    roadNumber: "",
    houseNumber: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    phone: "",
    phoneCode: "+1",
    genderType: "",
    genderRange: "",
    currentStatus: "",
    emergencyName: "",
    emergencyEmail: "",
    emergencyPhone: "",
    emergencyPhoneCode: "+1",
    aboutMe: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const styles = {
    pageBackground: {
      backgroundColor: "#E4CBFF", 
    },
    container: {
      maxWidth: "800px",
      marginTop: "30px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    header: {
      marginBottom: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    imageUpload: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
      cursor: "pointer",
      border: "2px dashed #ccc",
      position: "relative",
      overflow: "hidden",
    },
    imagePreview: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    imageInput: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0,
      cursor: "pointer",
    },
    section: {
      marginBottom: "30px",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontSize: "14px",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      transition: "border-color 0.3s ease",
    },
    select: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      backgroundColor: "#fff",
    },
    phoneInput: {
      display: "flex",
      gap: "10px",
    },
    phoneCode: {
      width: "80px",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
    },
    dateContainer: {
      display: "flex",
      gap: "10px",
    },
    dateSelect: {
      flex: 1,
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
    },
    textarea: {
      width: "100%",
      minHeight: "200px",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      resize: "vertical",
      fontSize: "14px",
    },
    richEditor: {
      border: "1px solid #ddd",
      borderRadius: "4px",
      overflow: "hidden",
    },
    editorToolbar: {
      display: "flex",
      gap: "5px",
      padding: "10px",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#f8f9fa",
    },
    toolbarButton: {
      padding: "5px 10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      backgroundColor: "#fff",
      cursor: "pointer",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      marginTop: "20px",
    },
    button: {
      padding: "12px 24px",
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.3s ease",
    },
    cancelButton: {
      backgroundColor: "#f0f0f0",
      color: "#333",
      "&:hover": {
        backgroundColor: "#e0e0e0",
      },
    },
    saveButton: {
      backgroundColor: "#8B5CF6",
      color: "white",
      "&:hover": {
        backgroundColor: "#7C3AED",
      },
    },
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );
  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "India",
    "Japan",
    "Other",
  ];

  return (
    <div style={styles.pageBackground}>   
    <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.imageUpload}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                style={styles.imagePreview}
              />
            ) : (
              <span>Upload Image</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.imageInput}
            />
          </div>
          <h2>User Name</h2>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="username">
              Username
            </label>
            <input
              style={styles.input}
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
            />
            <a
              href="#"
              style={{
                color: "#8B5CF6",
                textDecoration: "none",
                fontSize: "14px",
                marginTop: "5px",
                display: "inline-block",
              }}
            >
              Change username...
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Personal Information</h3>

            <div style={styles.formGroup}>
              <label style={styles.label}>First Name</label>
              <input
                style={styles.input}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name</label>
              <input
                style={styles.input}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Your last name"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="default_email@example.com"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Location</label>
              <select
                style={styles.select}
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <select
                style={styles.select}
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select State/Region</option>
                {/* Add states based on selected country */}
              </select>
            </div>

            <div style={styles.formGroup}>
              <input
                style={styles.input}
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>

            <div style={styles.formGroup}>
              <input
                style={styles.input}
                type="text"
                name="roadNumber"
                value={formData.roadNumber}
                onChange={handleChange}
                placeholder="Road Number"
              />
            </div>

            <div style={styles.formGroup}>
              <input
                style={styles.input}
                type="text"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                placeholder="House Number"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Birthday</label>
              <div style={styles.dateContainer}>
                <select
                  style={styles.dateSelect}
                  name="birthMonth"
                  value={formData.birthMonth}
                  onChange={handleChange}
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  style={styles.dateSelect}
                  name="birthDay"
                  value={formData.birthDay}
                  onChange={handleChange}
                >
                  <option value="">Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  style={styles.dateSelect}
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleChange}
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone number</label>
              <div style={styles.phoneInput}>
                <select
                  style={styles.phoneCode}
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleChange}
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+91">+91</option>
                  {/* Add more country codes */}
                </select>
                <input
                  style={{ ...styles.input, flex: 1 }}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Gender type</label>
              <input
                style={styles.input}
                type="text"
                name="genderType"
                value={formData.genderType}
                onChange={handleChange}
                placeholder="Gender suggestions"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Gender range</label>
              <select
                style={styles.select}
                name="genderRange"
                value={formData.genderRange}
                onChange={handleChange}
              >
                <option value="">Select gender range</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Current Treatment Status</label>
              <select
                style={styles.select}
                name="currentStatus"
                value={formData.currentStatus}
                onChange={handleChange}
              >
                <option value="">Select current status</option>
                <option value="diagnosed">Diagnosed/Ongoing/Completed</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Emergency Contact Information</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                style={styles.input}
                type="text"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleChange}
                placeholder="Emergency contact's full name"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                type="email"
                name="emergencyEmail"
                value={formData.emergencyEmail}
                onChange={handleChange}
                placeholder="Emergency contact's email"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone number</label>
              <div style={styles.phoneInput}>
                <select
                  style={styles.phoneCode}
                  name="emergencyPhoneCode"
                  value={formData.emergencyPhoneCode}
                  onChange={handleChange}
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+91">+91</option>
                  {/* Add more country codes */}
                </select>
                <input
                  style={{ ...styles.input, flex: 1 }}
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  placeholder="Emergency contact's phone number"
                />
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>About me</h3>
            <div style={styles.richEditor}>
              <div style={styles.editorToolbar}>
                <button type="button" style={styles.toolbarButton}>
                  B
                </button>
                <button type="button" style={styles.toolbarButton}>
                  I
                </button>
                <button type="button" style={styles.toolbarButton}>
                  U
                </button>
                <button type="button" style={styles.toolbarButton}>
                  A
                </button>
                <button type="button" style={styles.toolbarButton}>
                  ⌘
                </button>
                <button type="button" style={styles.toolbarButton}>
                  ≡
                </button>
                <button type="button" style={styles.toolbarButton}>
                  ⚫
                </button>
              </div>
              <textarea
                style={styles.textarea}
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleChange}
                placeholder="Write something about yourself..."
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <button
                type="button"
                style={{
                  ...styles.button,
                  padding: "5px 10px",
                  fontSize: "12px",
                }}
              >
                Help
              </button>
              <button
                type="button"
                style={{
                  ...styles.button,
                  padding: "5px 10px",
                  fontSize: "12px",
                }}
              >
                Preview
              </button>
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <button
              type="button"
              style={{ ...styles.button, ...styles.cancelButton }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ ...styles.button, ...styles.saveButton }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
