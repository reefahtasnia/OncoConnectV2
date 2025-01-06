"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import BottomNav from "./components/bottom-nav";
import pillImage from "./pill.png";
import userImage from "./user.png";
import "./medicine.css";

export default function MedicinesPage() {
  const [activeSection, setActiveSection] = useState("medicines");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dailyReview = [
    {
      name: "Oxycodone",
      time: "10:00 AM",
      status: "Completed",
    },
    {
      name: "Naloxone",
      time: "04:00 PM",
      status: "Skipped",
    },
    {
      name: "Oxycodone",
      time: "10:00 AM",
      status: "Before Eating",
    },
  ];

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
          <h1>My Medicines</h1>
          <div className="header-actions">
            <button className="edit-profile-btn">Edit Profile</button>
            <div className="user-profile">
              <img src={userImage} alt="User" className="user-avatar" />
              <span>Username</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M6 9l6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <button className="notification-btn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21a2 2 0 0 1-3.46 0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="notification-badge"></span>
            </button>
          </div>
        </header>

        <div className="medicines-content">
          <div className="medicines-grid">
            {/* Daily Review Section */}
            <div className="daily-review-section">
              <h2>Daily Review</h2>
              <div className="medicine-list">
                {dailyReview.map((medicine, index) => (
                  <div key={index} className="medicine-item">
                    <div className="medicine-icon">
                      <img
                        src={pillImage}
                        alt="Medicine"
                        width="24"
                        height="24"
                      />
                    </div>
                    <div className="medicine-details">
                      <h3>{medicine.name}</h3>
                      <div className="medicine-meta">
                        <span>{medicine.time}</span>
                        <span className="dot">•</span>
                        <span
                          className={`status ${medicine.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {medicine.status}
                        </span>
                      </div>
                    </div>
                    <button className="medicine-action">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Plan Section */}
            <div className="add-plan-section">
              <h2>Add Plan</h2>
              <form className="add-plan-form">
                <div className="form-group">
                  <label>Pills name</label>
                  <div className="pills-input">
                    <img
                      src={pillImage}
                      alt="Medicine"
                      width="20"
                      height="20"
                    />
                    <input type="text" placeholder="Oxycodone" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Amount & How long?</label>
                  <div className="amount-duration">
                    <div className="pills-amount">
                      <input type="number" defaultValue="2" min="1" />
                      <span>pills</span>
                    </div>
                    <div className="duration">
                      <input type="number" defaultValue="30" min="1" />
                      <span>days</span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Food & Pills</label>
                  <div className="timing-options">
                    {["Before", "After", "Any"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="timing-option"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M3 13h18M3 7h18M3 19h18" />
                        </svg>
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Notification</label>
                  <div className="notification-time">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <select defaultValue="10:00 AM" className="time-select">
                      {Array.from({ length: 24 * 4 }).map((_, i) => {
                        const hour = Math.floor(i / 4);
                        const minute = (i % 4) * 15;
                        const ampm = hour >= 12 ? "PM" : "AM";
                        const hour12 =
                          hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                        const timeString = `${hour12}:${minute
                          .toString()
                          .padStart(2, "0")} ${ampm}`;
                        return (
                          <option key={i} value={timeString}>
                            {timeString}
                          </option>
                        );
                      })}
                    </select>
                    <button type="button" className="add-time">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>

                <button type="submit" className="submit-btn">
                  Done
                </button>
              </form>
            </div>
          </div>
        </div>

        <BottomNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </main>
    </div>
  );
}
