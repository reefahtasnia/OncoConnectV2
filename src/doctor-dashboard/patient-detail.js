import DoctorSidebar from "./components/doctor-sidebar";
import DoctorBottomNav from "./components/doctor-bottom-nav";
import "./patient-detail.css";
import patientImage from "./patient.jpg";

export default function PatientDetailPage() {
  const patientData = {
    name: "Denzel White",
    gender: "Male",
    age: "32",
    id: "8745635422",
    email: "denzelwhite@gmail.com",
    lastVisited: "11/03/23, Thursday, 9:30 am",
    allergies: ["Peanut Allergy", "Lactose Intolerant", "Lactose Intolerant"],
    vitals: {
      bloodGlucose: {
        before: "120mg/dt",
        after: "120mg/dt",
        date: "11/03/23",
      },
      temperature: "98.1 °F",
      bloodPressure: "120/80 mm hg",
      height: "160 cm",
      weight: "55 Kg",
    },
  };
  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
  };
  const currentUser = {
    username: "Dr. Username",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Doctor%20Dashboard%206-4Ihz51hyxs75TPG6Ull26QOWjWDdgk.png",
  };
  return (
    <div className="doctor-dashboard">
      <DoctorSidebar />

      <main className="doctor-dashboard-main">
        <header className="doctor-dashboard-header">
          <div className="doctor-header-content">
            <div className="doctor-header-title">
              <a href="/doctor/patients" className="doctor-back-button">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </a>
              <h1>My Patients</h1>
            </div>
            <div className="doctor-header-actions">
              <button className="doctor-edit-button">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit
              </button>
            </div>
          </div>
        </header>

        <div className="doctor-patient-detail">
          <div className="doctor-patient-profile">
            <img
              src={patientImage}
              alt={patientData.name}
              className="doctor-patient-photo"
            />
            <div className="doctor-patient-basic-info">
              <h2>{patientData.name}</h2>
              <div className="doctor-patient-metadata">
                <span>{patientData.gender}</span>
                <span>Age {patientData.age}</span>
              </div>
              <div className="doctor-patient-contact">
                <div>{patientData.id}</div>
                <div>{patientData.email}</div>
              </div>
              <div className="doctor-last-visited">
                Last Visited: {patientData.lastVisited}
              </div>
              <div className="doctor-allergies">
                <h3>Known Allergies</h3>
                <div className="doctor-allergy-tags">
                  {patientData.allergies.map((allergy, index) => (
                    <span key={index} className="doctor-allergy-tag">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <section className="doctor-vitals-section">
            <h3>Latest Vitals</h3>
            <div className="doctor-vitals-grid">
              <div className="doctor-vital-card">
                <div className="doctor-vital-value">
                  {patientData.vitals.bloodGlucose.before}
                </div>
                <div className="doctor-vital-label">Blood Glucose Level</div>
                <div className="doctor-vital-sublabel">
                  Before meal - {patientData.vitals.bloodGlucose.date}
                </div>
              </div>
              <div className="doctor-vital-card">
                <div className="doctor-vital-value">
                  {patientData.vitals.temperature}
                </div>
                <div className="doctor-vital-label">Temperature</div>
                <div className="doctor-vital-sublabel">Today</div>
              </div>
              <div className="doctor-vital-card">
                <div className="doctor-vital-value">
                  {patientData.vitals.bloodPressure}
                </div>
                <div className="doctor-vital-label">Blood Pressure</div>
                <div className="doctor-vital-sublabel">Today</div>
              </div>
              <div className="doctor-vital-card">
                <div className="doctor-vital-value">
                  {patientData.vitals.height}
                </div>
                <div className="doctor-vital-label">Height</div>
                <div className="doctor-vital-sublabel">20/03/23</div>
              </div>
              <div className="doctor-vital-card">
                <div className="doctor-vital-value">
                  {patientData.vitals.weight}
                </div>
                <div className="doctor-vital-label">Weight</div>
                <div className="doctor-vital-sublabel">20/03/23</div>
              </div>
            </div>
          </section>

          <section className="doctor-medical-section">
            <h3>Past Records</h3>
            <div className="doctor-section-content">
              <div className="doctor-records-tabs">
                <button className="doctor-tab active">Medical History</button>
                <button className="doctor-tab">Previous Consultations</button>
                <button className="doctor-tab">Test Reports</button>
              </div>

              <div className="doctor-records-list">
                {/* Medical History */}
                <div className="doctor-record-item">
                  <div className="doctor-record-header">
                    <div className="doctor-record-title">
                      <h4>Type 2 Diabetes</h4>
                      <span className="doctor-record-date">
                        Diagnosed: Jan 2020
                      </span>
                    </div>
                    <span className="doctor-record-status">Ongoing</span>
                  </div>
                  <p>
                    Patient has been managing with medication and lifestyle
                    changes.
                  </p>
                </div>

                {/* Previous Consultations */}
                <div className="doctor-record-group">
                  <h4>Recent Consultations</h4>
                  <div className="doctor-consultation-history">
                    <div className="doctor-consultation-record">
                      <div className="doctor-consultation-date">
                        <strong>11 Mar 2023</strong>
                        <span>09:30 AM</span>
                      </div>
                      <div className="doctor-consultation-details">
                        <h5>Regular Checkup</h5>
                        <p>
                          <strong>Symptoms:</strong> Heartburn, Fever
                        </p>
                        <p>
                          <strong>Diagnosis:</strong> Acid Reflux
                        </p>
                        <p>
                          <strong>Prescribed:</strong> Pepcid AC
                        </p>
                        <p>
                          <strong>Doctor:</strong> Dr. Sarah Wilson
                        </p>
                      </div>
                    </div>

                    <div className="doctor-consultation-record">
                      <div className="doctor-consultation-date">
                        <strong>20 Feb 2023</strong>
                        <span>02:15 PM</span>
                      </div>
                      <div className="doctor-consultation-details">
                        <h5>Follow-up Visit</h5>
                        <p>
                          <strong>Symptoms:</strong> High Blood Sugar
                        </p>
                        <p>
                          <strong>Diagnosis:</strong> Diabetes Management
                        </p>
                        <p>
                          <strong>Prescribed:</strong> Metformin 500mg
                        </p>
                        <p>
                          <strong>Doctor:</strong> Dr. James Chen
                        </p>
                      </div>
                    </div>

                    <div className="doctor-consultation-record">
                      <div className="doctor-consultation-date">
                        <strong>15 Jan 2023</strong>
                        <span>11:00 AM</span>
                      </div>
                      <div className="doctor-consultation-details">
                        <h5>Urgent Care</h5>
                        <p>
                          <strong>Symptoms:</strong> Severe Headache, Nausea
                        </p>
                        <p>
                          <strong>Diagnosis:</strong> Migraine
                        </p>
                        <p>
                          <strong>Prescribed:</strong> Sumatriptan
                        </p>
                        <p>
                          <strong>Doctor:</strong> Dr. Emily Brooks
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Test Reports */}
                <div className="doctor-record-group">
                  <h4>Recent Test Reports</h4>
                  <div className="doctor-test-reports">
                    <div className="doctor-test-record">
                      <div className="doctor-test-info">
                        <h5>Blood Sugar Test</h5>
                        <span>11 Mar 2023</span>
                      </div>
                      <div className="doctor-test-results">
                        <p>
                          <strong>Fasting:</strong> 120 mg/dL
                        </p>
                        <p>
                          <strong>Post Meal:</strong> 140 mg/dL
                        </p>
                        <p>
                          <strong>HbA1c:</strong> 6.2%
                        </p>
                      </div>
                      <button className="doctor-view-report">
                        View Report
                      </button>
                    </div>

                    <div className="doctor-test-record">
                      <div className="doctor-test-info">
                        <h5>Complete Blood Count</h5>
                        <span>20 Feb 2023</span>
                      </div>
                      <div className="doctor-test-results">
                        <p>
                          <strong>Hemoglobin:</strong> 13.5 g/dL
                        </p>
                        <p>
                          <strong>WBC:</strong> 7,500/mcL
                        </p>
                        <p>
                          <strong>Platelets:</strong> 250,000/mcL
                        </p>
                      </div>
                      <button className="doctor-view-report">
                        View Report
                      </button>
                    </div>

                    <div className="doctor-test-record">
                      <div className="doctor-test-info">
                        <h5>Lipid Profile</h5>
                        <span>15 Jan 2023</span>
                      </div>
                      <div className="doctor-test-results">
                        <p>
                          <strong>Total Cholesterol:</strong> 180 mg/dL
                        </p>
                        <p>
                          <strong>HDL:</strong> 45 mg/dL
                        </p>
                        <p>
                          <strong>LDL:</strong> 100 mg/dL
                        </p>
                      </div>
                      <button className="doctor-view-report">
                        View Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="doctor-medical-section">
            <h3>Reasons for Consultation</h3>
            <div className="doctor-section-content">
              <div className="doctor-consultation-item">
                <span>1. Heart Burn</span>
                <select className="doctor-select">
                  <option>Diagnosis Type</option>
                </select>
                <input
                  type="text"
                  placeholder="Details (Max 100 words)"
                  className="doctor-input"
                />
              </div>
              <div className="doctor-consultation-item">
                <span>2. Fever</span>
                <select className="doctor-select">
                  <option>Diagnosis Type</option>
                </select>
                <input
                  type="text"
                  placeholder="Details (Max 100 words)"
                  className="doctor-input"
                />
              </div>
            </div>
          </section>

          <section className="doctor-medical-section">
            <h3>Medication</h3>
            <div className="doctor-section-content">
              <div className="doctor-medication-item">
                <span>1. Pepcid AC</span>
                <div className="doctor-medication-details">
                  <select className="doctor-select">
                    <option>Frequency</option>
                  </select>
                  <input
                    type="number"
                    placeholder="0"
                    className="doctor-input"
                  />
                  <span>ml</span>
                  <select className="doctor-select">
                    <option>Duration</option>
                  </select>
                  <select className="doctor-select">
                    <option>Instruction</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="doctor-medical-section">
            <h3>Follow Up</h3>
            <div className="doctor-section-content">
              <input type="date" className="doctor-input" />
            </div>
          </section>

          <div className="doctor-action-buttons">
            <button className="doctor-review-button">Review</button>
          </div>
        </div>

        <DoctorBottomNav />
      </main>
    </div>
  );
}
