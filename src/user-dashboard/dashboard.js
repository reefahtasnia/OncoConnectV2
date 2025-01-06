'use client'

import { useState } from 'react'
import Sidebar from './components/sidebar'
import Calendar from './components/calender'
import DayDetails from './components/day-details'
import SlidingSidebar from './components/sliding-sidebar'
import BottomNav from './components/bottom-nav'
import './dashboard.css';
import userImage from './user.png'

export default function UserDashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDayPopup, setShowDayPopup] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleDateClick = (date) => {
    setSelectedDate(date)
    setShowDayPopup(true)
  }

  const handleSectionChange = (section) => {
    setActiveSection(section)
    setSidebarOpen(false)
  }

  return (
    <div className="user-dashboard">
      <Sidebar isOpen={sidebarOpen} />
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          {/* <button 
            className="menu-trigger md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button> */}
          <h1>My Dashboard</h1>
          <div className="header-actions">
            <button className="edit-profile-btn">Edit Profile</button>
            <div className="user-profile">
              <img src={userImage} alt="User" className="user-avatar" />
              <span>Username</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <button className="notification-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="notification-badge"></span>
            </button>
          </div>
        </header>

        <div className={`dashboard-content ${activeSection}`}>
          <div className="calendar-section">
            <Calendar 
              selectedDate={selectedDate} 
              onDateClick={handleDateClick}
            />
          </div>
          <div className="details-section">
            <DayDetails date={selectedDate} />
          </div>
        </div>

        <SlidingSidebar 
          date={selectedDate}
          isOpen={showDayPopup}
          onClose={() => setShowDayPopup(false)}
        />
        
        <BottomNav 
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
      </main>
    </div>
  )
}

