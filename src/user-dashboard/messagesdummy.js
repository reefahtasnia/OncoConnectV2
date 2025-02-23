"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import BottomNav from "./components/bottom-nav";
import UserDropdown from "./components/user-dropdown";
import NotificationsButton from "./components/notifications";
import "./messages.css";
import userImage from "./user.png";

export default function MessagesPage() {
  const [activeSection, setActiveSection] = useState("messages");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState("");
  const [newMessage, setNewMessage] = useState(""); // For real-time message input
  const [messages, setMessages] = useState([]); // Store all messages
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
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    fetchUserData();
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const chats = [
    {
      id: 1,
      name: "Dr, John Doe",
      status: "Read",
      time: "00:31:00",
      unread: 0,
      messages: [
        {
          id: 1,
          text: "Hello Dr. Johnson, I have a question about my prescription.",
          time: "8:00 PM",
          sender: "admin",
        },
        {
          id: 2,
          text: "Of course, John. What would you like to know?",
          time: "8:05 PM",
          sender: "user",
        },
      ],
    },
    {
      id: 2,
      name: "Dr. Lauren Martinez",
      status: "Unread",
      time: "00:31:00",
      unread: 1,
      messages: [
        {
          id: 1,
          text: "Hello. Did you cancel our upcoming appointment?",
          time: "7:30 PM",
          sender: "admin",
        },
      ],
    },
  ];

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

  const handleChatSelect = (chat) => {
    setActiveChat(chat);
    // Add body class to prevent scrolling when chat is open on mobile
    if (isMobile) {
      document.body.style.overflow = "hidden";
    }
  };

  const handleBackToChats = () => {
    setActiveChat(null);
    // Remove body class when closing chat on mobile
    if (isMobile) {
      document.body.style.overflow = "";
    }
  };

  // Send message functionality (temporarily display messages on frontend)
  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        sender: "admin",
        text: newMessage,
        time: "Just now",
      };

      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      setNewMessage(""); // Clear the input after sending the message
    }
  };

  return (
    <div className="user-dashboard">
      <Sidebar isOpen={sidebarOpen} />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>My Messages</h1>
          <div className="header-actions">
            <UserDropdown
              username={userData.username}
              avatar={userData.profilePicture}
              onLogout={() => {
                handleLogout();
              }}
            />
            <NotificationsButton notifications={notifications} />
          </div>
        </header>

        <div className="messages-content">
          <div className="messages-container">
            <div className="chats-list">
              <div className="chats-header">
                <h2>Messages</h2>
                <div className="search-box">
                  <input type="text" placeholder="Search chat" />
                  <button className="chat-new">
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
                    CHAT
                  </button>
                </div>
              </div>
              <div className="chats-scroll">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    className={`chat-item ${
                      activeChat?.id === chat.id ? "active" : ""
                    }`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="chat-avatar">
                      {/* <img src={chat.avatar || userImage} alt={chat.name} /> */}
                      <span className="status-indicator"></span>
                    </div>
                    <div className="chat-info">
                      <div className="chat-header">
                        <h3>{chat.name}</h3>
                        <span className="chat-time">{chat.time}</span>
                      </div>
                      <div className="chat-preview">
                        <span className="chat-status">{chat.status}</span>
                        {chat.unread > 0 && (
                          <span className="unread-badge">{chat.unread}</span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className={`chat-window ${activeChat ? "active" : ""}`}>
              {activeChat ? (
                <>
                  <div className="chat-header">
                    <button
                      className="back-to-chats"
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
                    <div className="chat-contact">
                      {/* <img
                        src={activeChat.avatar}
                        alt={activeChat.name}
                        className="contact-avatar"
                      /> */}
                      <div className="contact-info">
                        <h3>{activeChat.name}</h3>
                        <span className="contact-id">Oncologist</span>
                      </div>
                    </div>
                    <div className="chat-actions">
                      <button className="action-btn">
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
                      <button className="action-btn">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M23 7l-7 5 7 5V7z" />
                          <rect
                            x="1"
                            y="5"
                            width="15"
                            height="14"
                            rx="2"
                            ry="2"
                          />
                        </svg>
                      </button>
                      <button className="action-btn">
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
                  <div className="chat-messages">
                    {activeChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`message ${
                          message.sender === "admin" ? "sent" : "received"
                        }`}
                      >
                        <div className="message-content">
                          <p>{message.text}</p>
                          <span className="message-time">{message.time}</span>
                        </div>
                      </div>
                    ))}
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`message ${
                          message.sender === "admin" ? "sent" : "received"
                        }`}
                      >
                        <div className="message-content">
                          <p>{message.text}</p>
                          <span className="message-time">{message.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="chat-input">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                    />
                    <button className="send-btn" onClick={sendMessage}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <div className="no-chat-selected">
                  <p>Select a chat to start messaging</p>
                </div>
              )}
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
