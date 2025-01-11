export default function BottomNav({ activeSection, onSectionChange }) {
    return (
      <nav className="bottom-nav">
        <button 
          className={`bottom-nav-item ${activeSection === 'patients' ? 'active' : ''}`}
          onClick={() => onSectionChange('patients')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
          Patients
        </button>
        
        <button 
          className={`bottom-nav-item ${activeSection === 'calendar' ? 'active' : ''}`}
          onClick={() => onSectionChange('calendar')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Calendar
        </button>
        
        <button 
          className={`bottom-nav-item ${activeSection === 'upcoming' ? 'active' : ''}`}
          onClick={() => onSectionChange('upcoming')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Upcoming
        </button>
      </nav>
    )
  }
  
  