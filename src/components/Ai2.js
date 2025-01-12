import React from "react";
import "./CSS/AI2.css"; // Import the CSS file

// Import the image
import mainImage from "./assets/ultrasound.png"; // Replace with your image path

const AI = () => {
  return (
    <div className="ai2-container">
      {/* Header Section */}
      
      {/* Main Content */}
      <main className="ai2-container-main-content">
        {/* Ultrasound Section */}
        <section className="ai2-container-ultrasound-section">
          <h2 className="ai2-container-section-title">Detect Cancer Models</h2>
          <div className="ai2-container-image-container">
            <img
              src={mainImage}
              alt="Ultrasound"
              className="ai2-container-main-image"
            />
            
          </div>
        </section>

        {/* Patient Details Section */}
        <section className="ai2-container-patient-details">
          <h2>Patient Details</h2>
          <p>
             Ultrasound are a critical task in medical image analysis, aiding in
            diagnosis and treatment planning. However, manual segmentation is
            time-consuming and prone to inter-observer variability.
          </p>
          <table className="ai2-container-details-table">
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
          <div className="ai2-container-buttons">
            <button className="ai2-container-report-button">
              Report Download
            </button>
            <button className="ai2-container-report-button">
              Report Email to your Doctor
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AI;
