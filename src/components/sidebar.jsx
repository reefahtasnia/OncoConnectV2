export default function Sidebar({ isOpen, onClose }) {
    const menuItems = [
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        label: 'Home',
        active: true
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        label: 'Messages',
        active: false
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
        label: 'My Patients',
        active: false
      }
    ]
  
    return (
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* <div className="sidebar-header">
          <h1 className="logo">
            <span className="logo-accent">Onco</span>Connect
          </h1>
        </div> */}
        <div className="menu-label">MENU</div>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`nav-item ${item.active ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        {isOpen && (
          <div className="sidebar-overlay" onClick={onClose} />
        )}
      </aside>
    )
  }
  
  