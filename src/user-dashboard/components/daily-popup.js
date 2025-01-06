export default function DailyPopup({ date, onClose }) {
    const sections = [
      {
        title: 'My Appointments',
        items: ['Dr. Mehta at 7 pm in Tata Hospital.']
      },
      {
        title: 'My Tests',
        items: ['Colon cancer screening test']
      },
      {
        title: 'My Symptoms',
        items: ['Felt dizzy at 12 pm.']
      }
    ]
  
    return (
      <div className="popup-overlay">
        <div className="daily-popup">
          <div className="popup-header">
            <button className="back-button" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2>How are you feeling today?</h2>
          </div>
  
          <div className="popup-content">
            {sections.map((section, index) => (
              <div key={index} className="popup-section">
                <div className="section-header">
                  <h3>{section.title}</h3>
                  <button className="add-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add
                  </button>
                </div>
                <ul className="section-items">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  