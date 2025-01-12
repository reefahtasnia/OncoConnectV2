import React from "react";
import "./CSS/AI3.css"; // Updated the CSS file name

// Import the image
import mainImage from "./assets/MRI.png"; // Replace with your image path

const AI = () => {
  return (
    <div className="ai3-container">
      {/* Header Section */}
      
      {/* Main Content */}
      <main className="ai3-container-main-content">
        {/* Ultrasound Section */}
        <section className="ai3-container-ultrasound-section">
          <h2 className="ai3-container-section-title">Detect Cancer Models</h2>
          <div className="ai3-container-image-container">
            <img
              src={mainImage}
              alt="Ultrasound"
              className="ai3-container-main-image"
            />
          </div>
        </section>

        {/* Patient Details Section */}
        <section className="ai3-container-patient-details">
          <h2>Patient Details</h2>
          <p>
            MRI Scans are a critical task in medical image analysis, aiding in
            diagnosis and treatment planning. However, manual segmentation is
            time-consuming and prone to inter-observer variability.
          </p>
          <table className="ai3-container-details-table">
            <thead>
              <tr>
                <th>Cases examined</th>
                <th>Negative benign</th>
                <th>Suspicious-positive</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Physical examination</td>
                <td>150</td>
                <td>1</td>
                <td>149</td>
              </tr>
              <tr>
                <td>Mammography</td>
                <td>54</td>
                <td>2</td>
                <td>52</td>
              </tr>
              <tr>
                <td>Aspiration cytology</td>
                <td>15</td>
                <td>--</td>
                <td>15</td>
              </tr>
              <tr>
                <td>Sonography</td>
                <td>13</td>
                <td>1</td>
                <td>12</td>
              </tr>
            </tbody>
          </table>
          <div className="ai3-container-buttons">
            <button className="ai3-container-report-button">
              Report Download
            </button>
            <button className="ai3-container-report-button">
              Report Email to your Doctor
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AI;
