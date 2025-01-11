import DoctorSidebar from './components/doctor-sidebar';
import DoctorBottomNav from './components/doctor-bottom-nav';
import './patient-detail.css';
import patientImage from './patient.png';

export default function PatientDetailPage() {
  const patientData = {
    name: "Nithya Jayakumar",
    gender: "Female",
    age: "32",
    id: "8745635422",
    email: "Nithyajayakumar@gmail.com",
    lastVisited: "11/03/23, Thursday, 9:30 am",
    allergies: ["Peanut Allergy", "Lactose Intolerant", "Lactose Intolerant"],
    vitals: {
      bloodGlucose: {
        before: "120mg/dt",
        after: "120mg/dt",
        date: "11/03/23"
      },
      temperature: "98.1 °F",
      bloodPressure: "120/80 mm hg",
      height: "160 cm",
      weight: "55 Kg"
    }
  };

  return (
    <div className="doctor-dashboard">
      <DoctorSidebar />
      
      <main className="doctor-dashboard-main">
        <header className="doctor-dashboard-header">
          <div className="doctor-header-content">
            <div className="doctor-header-title">
              <a href="/doctor/patients" className="doctor-back-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </a>
              <h1>My Patients</h1>
            </div>
            <div className="doctor-header-actions">
              <button className="doctor-edit-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit
              </button>
            </div>
          </div>
        </header>

        <div className="doctor-patient-detail">
          <div className="doctor-patient-profile">
            <img src={patientImage} alt={patientData.name} className="doctor-patient-photo" />
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
                    <span key={index} className="doctor-allergy-tag">{allergy}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <section className="doctor-vitals-section">
            <h3>Latest Vitals</h3>
            <div className="doctor-vitals-grid">
              <div className="doctor-vital-card">
                <div className="doctor-vital-value">{patientData.vitals.bloodGlucose.before}</div>
                <div className="doctor-vital-label">Blood Glucose Level</div>
                <div className="doctor-vital-sublabel">Before meal - {patientData.vitals.bloodGlucose.date}</div>
              </div>
              <div className="doctor-vital-card">
                <div className="doctor-vital-value">{patientData.vitals.temperature}</div>
                <div className="doctor-vital-label">Temperature</div>
                <div className="doctor-vital-sublabel">Today</div>
              </div>
              <div className="doctor-vital-card">
                <div className="doctor-vital-value">{patientData.vitals.bloodPressure}</div>
                <div className="doctor-vital-label">Blood Pressure</div>
                <div className="doctor-vital-sublabel">Today</div>
              </div>
              <div className="doctor-vital-card">
                <div className="doctor-vital-value">{patientData.vitals.height}</div>
                <div className="doctor-vital-label">Height</div>
                <div className="doctor-vital-sublabel">20/03/23</div>
              </div>
              <div className="doctor-vital-card">
                <div className="doctor-vital-value">{patientData.vitals.weight}</div>
                <div className="doctor-vital-label">Weight</div>
                <div className="doctor-vital-sublabel">20/03/23</div>
              </div>
            </div>
          </section>

          <section className="doctor-medical-section">
            <h3>Past Records</h3>
            <div className="doctor-section-content">
              {/* Expandable section content */}
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
                <input type="text" placeholder="Details (Max 100 words)" className="doctor-input" />
              </div>
              <div className="doctor-consultation-item">
                <span>2. Fever</span>
                <select className="doctor-select">
                  <option>Diagnosis Type</option>
                </select>
                <input type="text" placeholder="Details (Max 100 words)" className="doctor-input" />
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
                  <input type="number" placeholder="0" className="doctor-input" />
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

