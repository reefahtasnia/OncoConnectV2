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
  const [newMessage, setNewMessage] = useState(""); // For real-time message input
  const [messages, setMessages] = useState([]); // Store all messages
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
      name: "Patient Rose",
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
        {
          id: 3,
          text: "I'm experiencing some side effects from the new medication.",
          time: "8:10 PM",
          sender: "patient",
        }
      ],
    },
    {
      id: 2,
      name: "Patient Jane Smith",
      avatar: { userImage },
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
   // Send message functionality
  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      // Add doctor's message instantly
      const newMessageObj = {
        sender: "doctor",
        text: newMessage,
        time: "Just now",
      };

      setMessages((prevMessages) => [...prevMessages, newMessageObj]);
      setNewMessage(""); // Clear the input after sending the message
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
          <NotificationsButton notifications={[]} />
        </header>
        <h1>Patient Messages</h1>

        <div className="doctor-messages-content">
          <div className="doctor-messages-container">
            <div className="doctor-chats-list">
              <div className="doctor-chats-header">
                <h2>Messages</h2>
                <div className="doctor-search-box">
                  <input type="text" placeholder="Search patient" />
                  <button className="doctor-chat-new">NEW</button>
                </div>
              </div>

              <div className="doctor-chats-scroll">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    className={`doctor-chat-item ${activeChat?.id === chat.id ? "active" : ""}`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    {/* <div className="doctor-chat-avatar">
                      <img src={chat.avatar || userImage} alt={chat.name} />
                    </div> */}
                    <div className="doctor-chat-info">
                      <h3>{chat.name}</h3>
                      <div>{chat.messages[chat.messages.length - 1].text}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className={`doctor-chat-window ${activeChat ? "active" : ""}`}>
              {activeChat ? (
                <>
                  <div className="doctor-chat-header">
                    <button className="doctor-back-to-chats" onClick={handleBackToChats}>Back</button>
                    <div className="doctor-chat-contact">
                      {/* <img src={activeChat.avatar} alt={activeChat.name} className="doctor-contact-avatar" /> */}
                      <div className="doctor-contact-info">
                        <h3>{activeChat.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="doctor-chat-messages">
                    {activeChat.messages.map((message) => (
                      <div key={message.id} className={`doctor-message ${message.sender === "doctor" ? "sent" : "received"}`}>
                        <div className="doctor-message-content">
                          <p>{message.text}</p>
                          <span className="doctor-message-time">{message.time}</span>
                        </div>
                      </div>
                    ))}
                    {messages.map((message, index) => (
                      <div key={index} className={`doctor-message ${message.sender === "doctor" ? "sent" : "received"}`}>
                        <div className="doctor-message-content">
                          <p>{message.text}</p>
                          <span className="doctor-message-time">{message.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="doctor-chat-input">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                    />
                    <button className="doctor-send-btn" onClick={sendMessage}>
                      Send
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
      </main>
    </div>
  );
}
