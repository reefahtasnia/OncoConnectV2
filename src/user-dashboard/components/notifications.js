import React, { useState } from 'react';
import "./shared.css";
export default function NotificationsButton({ notifications = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const toggleNotifications = () => {
      setIsOpen(!isOpen);
    };
    return (
      <div className="user-notifications-container">
        <button 
        className="user-notifications-trigger"
        onClick={toggleNotifications}
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {unreadCount > 0 && <span className="user-notifications-badge"></span>}
        </button>
        {isOpen && (
        <>
          <div className={`notifications-overlay ${isOpen ? 'active' : ''}`} onClick={toggleNotifications}></div>
          <div className="user-notifications-popup" role="dialog" aria-label="Notifications">
          <div className="user-notifications-header">
              <h3>Notifications</h3>
              <button className="user-notifications-mark-read">Mark all as read</button>
            </div>
            <div className="user-notifications-list">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`user-notifications-item ${!notification.isRead ? 'unread' : ''}`}
                >
                  <div className="user-notifications-icon">
                    {notification.type === 'reply' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                      </svg>
                    )}
                    {notification.type === 'like' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                      </svg>
                    )}
                    {notification.type === 'mention' && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="4"/>
                        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>
                      </svg>
                    )}
                  </div>
                  <div className="user-notifications-content">
                    <p><strong>{notification.user}</strong> {notification.content}</p>
                    <span className="user-notifications-time">{notification.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      </div>
    );
  }
  
  