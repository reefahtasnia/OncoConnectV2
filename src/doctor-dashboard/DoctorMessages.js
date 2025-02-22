import { useState, useEffect } from "react";
import DoctorSidebar from "./components/doctor-sidebar";
import DoctorBottomNav from "./components/doctor-bottom-nav";
import UserDropdown from "../user-dashboard/components/user-dropdown";
import NotificationsButton from "../user-dashboard/components/notifications";
import "./DoctorMessages.css";
import userImage from "./patient.jpg";
import React from "react";

export default function DoctorMessagesPage() {
  const [activeSection, setActiveSection] = useState("messages");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const currentUser = {
    username: "Dr. Username",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Doctor%20Dashboard%206-4Ihz51hyxs75TPG6Ull26QOWjWDdgk.png",
  };
  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
  };
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const chats = [
    {
      id: 1,
      name: "Patient John Doe",
      avatar: {userImage},
      status: "Read",
      time: "00:31:00",
      unread: 0,
      messages: [
        {
          id: 1,
          text: "Hello Dr. Johnson, I have a question about my prescription.",
          time: "8:00 PM",
          sender: "patient",
        },
        {
          id: 2,
          text: "Of course, John. What would you like to know?",
          time: "8:05 PM",
          sender: "doctor",
        },
      ],
    },
    {
      id: 2,
      name: "Patient Jane Smith",
      avatar: './patient.jpg',
      status: "Unread",
      time: "00:31:00",
      unread: 1,
      messages: [
        {
          id: 1,
          text: "Dr. Johnson, I'm experiencing some side effects from the new medication.",
          time: "7:30 PM",
          sender: "patient",
        },
      ],
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "appointment",
      patient: "John Doe",
      content: "has an upcoming appointment",
      timestamp: "Tomorrow at 10:00 AM",
      isRead: false,
    },
    {
      id: 2,
      type: "lab_result",
      patient: "Jane Smith",
      content: "Lab results are ready for review",
      timestamp: "1 hour ago",
      isRead: false,
    },
    {
      id: 3,
      type: "message",
      patient: "Mike Johnson",
      content: "sent you a new message",
      timestamp: "2 hours ago",
      isRead: true,
    },
  ];

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
    if (isMobile) {
      document.body.style.overflow = "hidden";
    }
  };

  const handleBackToChats = () => {
    setActiveChat(null);
    if (isMobile) {
      document.body.style.overflow = "";
    }
  };

  return (
    <div className="doctor-dashboard">
      <DoctorSidebar isOpen={sidebarOpen} />

      <main className="doctor-dashboard-main">
          <header className="dashboard-header">
            <UserDropdown
              username={currentUser.username}
              avatar={currentUser.avatar}
              onLogout={handleLogout}
            />
            <NotificationsButton notifications={notifications} />
          </header>
          <h1>Patient Messages</h1>
        <div className="doctor-messages-content">
          <div className="doctor-messages-container">
            <div className="doctor-chats-list">
              <div className="doctor-chats-header">
                <h2>Messages</h2>
                <div className="doctor-search-box">
                  <input type="text" placeholder="Search patient" />
                  <button className="doctor-chat-new">
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
                    NEW
                  </button>
                </div>
              </div>
              <div className="doctor-chats-scroll">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    className={`doctor-chat-item ${
                      activeChat?.id === chat.id ? "active" : ""
                    }`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="doctor-chat-avatar">
                      <img src={chat.avatar || userImage} alt={chat.name} />
                      <span className="doctor-status-indicator"></span>
                    </div>
                    <div className="doctor-chat-info">
                      <div className="doctor-chat-header">
                        <h3>{chat.name}</h3>
                        <span className="doctor-chat-time">{chat.time}</span>
                      </div>
                      <div className="doctor-chat-preview">
                        <span className="doctor-chat-status">
                          {chat.status}
                        </span>
                        {chat.unread > 0 && (
                          <span className="doctor-unread-badge">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className={`doctor-chat-window ${activeChat ? "active" : ""}`}>
              {activeChat ? (
                <>
                  <div className="doctor-chat-header">
                    <button
                      className="doctor-back-to-chats"
                      onClick={handleBackToChats}
                      aria-label="Back to chat list"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="doctor-chat-contact">
                      <img
                        src={activeChat.avatar}
                        alt={activeChat.name}
                        className="doctor-contact-avatar"
                      />
                      <div className="doctor-contact-info">
                        <h3>{activeChat.name}</h3>
                        <span className="doctor-contact-id">#PAT123456</span>
                      </div>
                    </div>
                    <div className="doctor-chat-actions">
                      <button className="doctor-action-btn">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </button>
                      <button className="doctor-action-btn">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                      </button>
                      <button className="doctor-action-btn">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="16" x2="12" y2="12" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="doctor-chat-messages">
                    {activeChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`doctor-message ${
                          message.sender === "doctor" ? "sent" : "received"
                        }`}
                      >
                        {message.sender === "patient" && (
                          <div className="doctor-message-avatar">
                            <span>P</span>
                          </div>
                        )}
                        <div className="doctor-message-content">
                          <p>{message.text}</p>
                          <span className="doctor-message-time">
                            {message.time}
                          </span>
                        </div>
                        {message.sender === "doctor" && (
                          <img
                            src={userImage}
                            alt=""
                            className="doctor-user-message-avatar"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="doctor-chat-input">
                    <input type="text" placeholder="Type your message..." />
                    <button className="doctor-attach-btn">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                      </svg>
                    </button>
                    <button className="doctor-send-btn">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <div className="doctor-no-chat-selected">
                  <p>Select a patient chat to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <DoctorBottomNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </main>
    </div>
  );
}
