'use client'

import { useState } from 'react'
import Sidebar from './components/sidebar'
import Calendar from './components/calender'
import DayDetails from './components/day-details'
import SlidingSidebar from './components/sliding-sidebar'
import BottomNav from './components/bottom-nav'
import UserDropdown from "./components/user-dropdown";
import NotificationsButton from "./components/notifications";
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
  const notifications = [
    {
      id: 1,
      type: "reply",
      user: "Sarah Johnson",
      content: "replied to your post about managing side effects",
      timestamp: "1 hour ago",
      isRead: false,
    },
    {
      id: 2,
      type: "like",
      user: "Michael Chen",
      content: "liked your comment about nutrition tips",
      timestamp: "2 hours ago",
      isRead: false,
    },
    {
      id: 3,
      type: "mention",
      user: "Emma Wilson",
      content: "mentioned you in a discussion",
      timestamp: "1 day ago",
      isRead: true,
    },
  ];
  return (
    <div className="user-dashboard">
      <Sidebar isOpen={sidebarOpen} />
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>My Dashboard</h1>
          <div className="header-actions">
          <UserDropdown
              username="Username"
              avatar={userImage}
              onLogout={() => {
                /* handle logout */
              }}
            />
            <NotificationsButton notifications={notifications} />
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

