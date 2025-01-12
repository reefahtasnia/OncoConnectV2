import React, { useState } from "react";
import "./shared.css";
export default function UserDropdown({ username, avatar, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const navigateToEditProfile = () => {
    window.location.href = "/editProfile";
  };

  return (
    <div className="user-dropdown-container">
      <button
        className="user-dropdown-trigger"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
      >
        <img src={avatar} alt={username} className="user-dropdown-avatar" />
        <span className="user-dropdown-name">{username}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {isOpen && (
        <>
          <div className={`dropdown-overlay ${isOpen ? 'active' : ''}`} onClick={toggleDropdown}></div>
          <div className="user-dropdown-menu">
          <button className="user-dropdown-item" onClick={navigateToEditProfile}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Edit Profile
          </button>
          <button className="user-dropdown-item" onClick={onLogout}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
          </div>
        </>
      )}
    </div>
  );
}
