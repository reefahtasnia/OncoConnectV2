import React from 'react';
import '../Dashboard.css';

export default function DoctorBottomNav({ activePage }) {
  const navItems = [
    { icon: "home", label: "Home", href: "/doctor" },
    { icon: "message-circle", label: "Messages", href: "/doctor/messages" },
    { icon: "users", label: "Patients", href: "/doctor/patients" },
  ];

  return (
    <nav className="doctor-bottom-nav">
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`doctor-nav-item ${activePage === item.href ? "active" : ""}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: activePage === item.href ? '#6b4eff' : '#666',
              textDecoration: 'none',
              fontSize: '12px'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {item.icon === "home" && <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />}
              {item.icon === "message-circle" && (
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              )}
              {item.icon === "users" && (
                <>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </>
              )}
            </svg>
            <span style={{ marginTop: '4px' }}>{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}