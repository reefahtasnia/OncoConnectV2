"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import BottomNav from "./components/bottom-nav";
import userImage from "./user.png";
import UserDropdown from "./components/user-dropdown";
import NotificationsButton from "./components/notifications";
import "./forum.css";

export default function ForumPage() {
  const [activeSection, setActiveSection] = useState("community");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Sample forum activities data
  const forumActivities = [
    {
      id: 1,
      title: "Managing Fatigue During Chemotherapy – Tips and Advice?",
      type: "reply",
      user: {
        name: "Maureline Adams",
        avatar: "/user.png",
      },
      content:
        "Hi there! I completely understand how draining chemo can be – you're not alone in this. What worked for me was pacing myself throughout the day. Short naps (no longer than 30 minutes) helped me recharge without disrupting my sleep schedule. Gentle exercises like stretching or short walks also boosted my energy levels. And don't forget to prioritize hydration and balanced meals – I noticed a big difference when I added more whole grains and fresh veggies to my diet. Hang in there, and remember to listen to your body – rest when it tells you to.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title:
        "How to Talk to My Family About My Diagnosis Without Overwhelming Them?",
      type: "like",
      user: {
        name: "Ava Mitchell",
        avatar: "/user.png",
      },
      content: "liked your comment on this post",
      timestamp: "4 hours ago",
    },
  ];

  // Sample notifications data
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
          <h1>My Forum Activities</h1>
          <div className="header-actions">
            <button
              className="community-forum-btn"
              onClick={() => window.location.href = "/forum"}
            >
              Community Forum
            </button>
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

        <div className="forum-content">
          {forumActivities.map((activity) => (
            <div key={activity.id} className="forum-activity-card">
              <div className="activity-header">
                <h2>{activity.title}</h2>
                <button className="go-to-post-btn">Go to Post →</button>
              </div>
              <div className="activity-content">
                <div className="activity-icon">
                  {activity.type === "reply" ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                  )}
                </div>
                <div className="activity-details">
                  <p className="activity-meta">
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="user-avatar-small"
                    />
                    <strong>{activity.user.name}</strong>{" "}
                    {activity.type === "reply"
                      ? "replied to your community post"
                      : "liked your comment on this post"}
                  </p>
                  {activity.type === "reply" && (
                    <p className="activity-text">{activity.content}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <BottomNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </main>
    </div>
  );
}
