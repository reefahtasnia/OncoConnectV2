'use client'

import { useState } from 'react'
import Sidebar from './components/sidebar'
import PatientList from './components/patient-list'
import Consultation from './components/consultation'
import Calendar from './components/calender'
import BottomNav from './components/bottom-nav'
import './components/CSS/dashboard.css'

export default function DashboardPage() {
  const [date, setDate] = useState(new Date())
  const [selectedPatient, setSelectedPatient] = useState('Denzel White')
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome Dr. Username</h1>
          <div className="header-actions">
            <button className="icon-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="user-menu">
              <button className="user-button">
                <img src="/placeholder.svg" alt="User" className="avatar" />
                <span>Username</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className={`dashboard-content ${activeSection}`}>
          <div className="main-section">
            <PatientList onPatientSelect={setSelectedPatient} />
            <Consultation patientName={selectedPatient} />
          </div>

          <div className="side-section">
            <Calendar selectedDate={date} onChange={setDate} />

            <div className="upcoming-card">
              <div className="card-header">
                <h3>Upcoming</h3>
                <button className="view-all">View All</button>
              </div>
              <div className="upcoming-event">
                <div className="event-avatar">M</div>
                <div className="event-details">
                  <h4>Monthly doctor's meet</h4>
                  <p>8 April, 2021 | 04:00 PM</p>
                </div>
              </div>
            </div>

            <div className="appointments-card">
              <h3>Appointments scheduled for Today</h3>
              <div className="appointments-count">24</div>
            </div>
          </div>
        </div>

        <BottomNav activeSection={activeSection} onSectionChange={setActiveSection} />
      </main>
    </div>
  )
}

