export default function PatientList({ onPatientSelect }) {
    const patients = [
      {
        initials: 'DW',
        name: 'Denzel White',
        type: 'Report',
        time: '9:00 AM',
        color: 'cyan'
      },
      {
        initials: 'SM',
        name: 'Stacy Mitchell',
        type: 'Weekly Visit',
        time: '9:15 AM',
        color: 'pink'
      },
      {
        initials: 'AD',
        name: 'Amy Dunham',
        type: 'Routine Checkup',
        time: '9:30 AM',
        color: 'purple'
      },
      {
        initials: 'DJ',
        name: 'Demi Joan',
        type: 'Report',
        time: '9:50 AM',
        color: 'cyan'
      },
      {
        initials: 'SM',
        name: 'Susan Myers',
        type: 'Weekly Visit',
        time: '10:15 AM',
        color: 'pink'
      }
    ]
  
    return (
      <div className="patient-list">
        <div className="list-header">
          <h2>Patient List</h2>
          <div className="date-selector">
            <button>
              Today
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
  
        <div className="patients">
          {patients.map((patient, index) => (
            <button
              key={index}
              className="patient-item"
              onClick={() => onPatientSelect(patient.name)}
            >
              <div className={`patient-avatar ${patient.color}`}>
                {patient.initials}
              </div>
              <div className="patient-info">
                <div className="patient-name">{patient.name}</div>
                <div className="patient-type">{patient.type}</div>
              </div>
              <div className="patient-time">{patient.time}</div>
            </button>
          ))}
        </div>
      </div>
    )
  }
  
  