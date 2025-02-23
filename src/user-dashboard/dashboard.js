"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import Calendar from "./components/calender";
import DayDetails from "./components/day-details";
import SlidingSidebar from "./components/sliding-sidebar";
import BottomNav from "./components/bottom-nav";
import UserDropdown from "./components/user-dropdown";
import NotificationsButton from "./components/notifications";
import "./dashboard.css";
import userImage from "./user.png";
import axios from "axios";

export default function UserDashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDayPopup, setShowDayPopup] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetchUserData();
  }, []);
  // const fetchUserData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5001/api/user', {
  //       withCredentials: true,
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     setUserData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error.message);
  //     window.alert("Failed to fetch your data, logging out...");
  //     await handleLogout();
  //   }
  // };
  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      console.log(data.message);
      setUserData(data);
    } catch (error) {
      console.error(error.message);
      window.alert("Failed to fetch your data, logging out...");
      await handleLogout();
    }
  };
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowDayPopup(true);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUserData(null);
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
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
            {userData && (
              <UserDropdown
                username={userData.username}
                avatar={userData.profilePicture}
                onLogout={handleLogout}
              />
            )}
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
        {/* Support Cards Row */}
        <div className="support-cards-row">
          <div className="support-card">
            <h3 className="support-title"> Keep an eye on your health with our daily symptom tracker!</h3>
            <p className="support-description">
            Track your symptoms daily
            </p>
            <button className="support-button" onClick={() => window.location.href = '/symptom'}>Track Now!</button>
          </div>

          <div className="support-card">
            <h3 className="support-title">Keep an eye on what you consume</h3>
            <p className="support-description">
              Use our nutrition and calorie tracker 
            </p>
            <button className="support-button" onClick={() => window.location.href = '/calorie'}>Go there!</button>
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
  );
}
