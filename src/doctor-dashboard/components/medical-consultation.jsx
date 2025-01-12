
export default function Consultation({ patientName }) {
    return (
      <div className="consultation">
        <div className="consultation-header">
          <h2>Consultation</h2>
          <button className="more-options">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
              <path d="M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
              <path d="M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </div>
  
        <div className="patient-header">
          <div className="patient-avatar">DW</div>
          <div className="patient-details">
            <h3>{patientName}</h3>
            <p>Male - 28 Years 3 Months</p>
          </div>
        </div>
  
        <div className="symptoms">
          <div className="symptom">
            <span>😷</span>
            <span>Fever</span>
          </div>
          <div className="symptom">
            <span>🤧</span>
            <span>Cough</span>
          </div>
          <div className="symptom">
            <span>💗</span>
            <span>Heart Burn</span>
          </div>
        </div>
  
        <div className="medical-info">
          <div className="info-section">
            <h4>Last Checked</h4>
            <p>
              Dr Everly on 21 April 2021
              <button className="prescription-link">
                Prescription #2J863K10
              </button>
            </p>
          </div>
  
          <div className="info-section">
            <h4>Observation</h4>
            <p>High fever and cough at normal hemoglobin levels.</p>
          </div>
  
          <div className="info-section">
            <h4>Prescription</h4>
            <ul>
              <li>Paracetmol - 2 times a day</li>
              <li>Dizopam - Day and Night before meal</li>
              <li>Wikoryl</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
  
  