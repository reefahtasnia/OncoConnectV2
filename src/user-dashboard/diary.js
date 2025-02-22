"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/sidebar";
import BottomNav from "./components/bottom-nav";
import userImage from "./user.png";
import UserDropdown from "./components/user-dropdown";
import "./diary.css";

const API_BASE_URL = "http://localhost:5000"; // Update with your actual API base URL

export default function DiaryPage() {
  const [activeSection, setActiveSection] = useState("diary");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 7)); // Set initial date to Jan 7, 2025
  const [showEntryPopup, setShowEntryPopup] = useState(false);
  const [currentEntry, setCurrentEntry] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null); // Store the user ID
  const [userData, setUserData] = useState("");
  const [diaryEntries, setDiaryEntries] = useState({
    "2025-01-07": "It was a mix of ups and downs. The morning started slow, with fatigue weighing me down, but a warm cup of tea gave me some comfort. My treatment session in the afternoon left me feeling weak, but I reminded myself it's a step toward healing. A friend stopped by for a short visit, and their laughter brought light to my day. In the evening, I sat by the window and let the cool breeze calm my mind. It wasn't easy, but I'm grateful for making it through another day.",
  });
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

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    if (diaryEntries[formattedDate]) {
      setCurrentEntry(diaryEntries[formattedDate]);
      setShowEntryPopup(true);
    } else {
      setCurrentEntry("");
      setIsEditing(true);
      setShowEntryPopup(true);
    }
  };

  const handleSave = async () => {
    const formattedDate = formatDate(selectedDate);
    try {
      await axios.post(
        `${API_BASE_URL}/api/save-diary`,
        { user_id: userId ,date: formattedDate, entry: currentEntry },
        { withCredentials: true }
      );
      setDiaryEntries(prev => ({
        ...prev,
        [formattedDate]: currentEntry
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving diary entry:", error);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formatDisplayDate = (date) => {
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const changeMonth = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
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
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/get-userid`, {
          withCredentials: true, // Ensures cookies are sent with the request
        });
        setUserId(response.data.user_id); // Set the user ID
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserData();
    fetchUserId();
  }, []);// Fetch user data when the user ID changes

  return (
    <div className="user-dashboard">
      <Sidebar isOpen={sidebarOpen} />
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>My Diary</h1>
          <div className="header-actions">
            <UserDropdown
              username={userData.username}
              avatar={userData.profilePicture}
              onLogout={() => handleLogout()}
            />
          </div>
        </header>

        <div className="diary-content">
          <div className="diary-grid">
            {/* Entry Preview Section */}
            <div className="entry-preview-section">
              <h2>{formatDisplayDate(selectedDate)}</h2>
              <div className="entry-preview">
                {diaryEntries[formatDate(selectedDate)] ? (
                  <p onClick={() => setShowEntryPopup(true)}>
                    {diaryEntries[formatDate(selectedDate)]}
                  </p>
                ) : (
                  <button 
                    className="add-entry-btn"
                    onClick={() => {
                      setIsEditing(true);
                      setShowEntryPopup(true);
                    }}
                  >
                    Add A Journal Entry
                  </button>
                )}
              </div>
            </div>

            {/* Calendar Section */}
            <div className="diary-calendar-section">
              <div className="diary-calendar-header">
                <button onClick={() => changeMonth(-1)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <h2>{months[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h2>
                <button onClick={() => changeMonth(1)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="diary-calendar-grid">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
  <div key={`${day}-${index}`} className="diary-calendar-day-name">{day}</div>
))}
                {getDaysInMonth(selectedDate).map((day, index) => (
                  <button
                    key={index}
                    className={`diary-calendar-day ${day === selectedDate.getDate() ? 'selected' : ''} 
                              ${diaryEntries[formatDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))] ? 'has-entry' : ''}`}
                    onClick={() => day && handleDateClick(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                    disabled={!day}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Entry Popup */}
        {showEntryPopup && (
          <div className="diary-popup-container">
            <div className="diary-popup-overlay" onClick={() => setShowEntryPopup(false)}></div>
            <div className="diary-popup">
              <div className="popup-header">
                <h2>My Diary - {formatDisplayDate(selectedDate)}</h2>
                <div className="popup-actions">
                  {isEditing ? (
                    <button className="save-btn" onClick={handleSave}>
                      Save
                    </button>
                  ) : (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                      Edit
                    </button>
                  )}
                  <button className="back-btn" onClick={() => setShowEntryPopup(false)}>
                    Back
                  </button>
                </div>
              </div>

              {isEditing && (
                <div className="editor-toolbar">
                  <button title="Bold">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                    </svg>
                  </button>
                  <button title="Italic">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="19" y1="4" x2="10" y2="4"/>
                      <line x1="14" y1="20" x2="5" y2="20"/>
                      <line x1="15" y1="4" x2="9" y2="20"/>
                    </svg>
                  </button>
                  <button title="List">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="8" y1="6" x2="21" y2="6"/>
                      <line x1="8" y1="12" x2="21" y2="12"/>
                      <line x1="8" y1="18" x2="21" y2="18"/>
                      <line x1="3" y1="6" x2="3.01" y2="6"/>
                      <line x1="3" y1="12" x2="3.01" y2="12"/>
                      <line x1="3" y1="18" x2="3.01" y2="18"/>
                    </svg>
                  </button>
                </div>
              )}

              <div className="entry-content">
                {isEditing ? (
                  <textarea
                    value={currentEntry}
                    onChange={(e) => setCurrentEntry(e.target.value)}
                    placeholder="How are you feeling today?"
                  />
                ) : (
                  <p>{currentEntry}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <BottomNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </main>
    </div>
  );
}
