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
  const [userData, setUserData] = useState(null); // Initialize as null
  const [doctorData, setDoctorData] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);

  // Log activeChat whenever it changes
  useEffect(() => {
    console.log("Active Chat Updated:", activeChat);
  }, [activeChat]);

  // Fetch user data and doctor data on component mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const fetchData = async () => {
      const userData = await fetchUserData();
      if (userData) {
        setUserData(userData);
      }
      await fetchDoctorData();
      setLoading(false);
    };

    fetchData();
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.warn("User data fetch failed:", errorData.message);
        return null;
      }

      const data = await response.json();
      console.log("User Data:", data);
      return data;
    } catch (error) {
      console.error("Network error:", error);
      return null;
    }
  };

  // Fetch doctor data
  const fetchDoctorData = async () => {
    try {
      const userId = "67a74eeafbab99ac066fb667"; // Hardcoded user ID
      const response = await fetch(`http://localhost:5002/api/appointments/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch doctor data");
      }
      const data = await response.json();
      console.log("Doctor Data:", data);
      setDoctorData(data);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  // Fetch messages for a specific chat
  const fetchMessages = async (sender_id, receiver_id) => {
    try {
      const response = await fetch(
        `http://localhost:5002/api/messages?sender_id=${sender_id}&receiver_id=${receiver_id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const messages = await response.json();
      console.log("Fetched Messages:", messages);

      const formattedMessages = messages.map((msg) => ({
        id: msg.msg_id,
        text: msg.content,
        time: new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sender: msg.sender_id === sender_id ? "user" : "admin",
      }));

      // Update the active chat's messages
      setActiveChat((prevChat) => ({
        ...prevChat,
        messages: formattedMessages,
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Handle chat selection
  const handleChatSelect = async (chat) => {
    console.log("Selected Chat:", chat);

    if (!userData || !userData._id) {
      console.error("User data or user ID is missing");
      return;
    }

    if (!chat || !chat.doctor_id) {
      console.error("Invalid chat object or missing doctor_id");
      return;
    }

    setActiveChat(chat); // Set the active chat

    if (isMobile) {
      document.body.style.overflow = "hidden";
    }

    // Fetch messages for the selected chat
    await fetchMessages(userData._id, chat.doctor_id);
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (messageInput.trim() === "") return;

    if (!activeChat || !activeChat.doctor_id) {
      console.error("No active chat or doctor ID found");
      return;
    }

    const newMessage = {
      msg_id: `msg_${Date.now()}`,
      sender_id: userData._id,
      receiver_id: activeChat.doctor_id,
      content: messageInput,
      attachments: "",
    };

    try {
      const response = await fetch("http://localhost:5002/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      // Update the active chat's messages
      setActiveChat((prevChat) => ({
        ...prevChat,
        messages: [
          ...prevChat.messages,
          {
            id: newMessage.msg_id,
            text: newMessage.content,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            sender: "user",
          },
        ],
      }));

      setMessageInput(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Dynamically generate chats based on fetched doctor data
  const chats = doctorData.map((doctor, index) => ({
    id: index + 1,
    name: doctor.doctor_name,
    avatar: userImage,
    status: "Read",
    time: "00:31:00",
    unread: 0,
    doctor_id: doctor.doctor_id,
    messages: [],
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

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
            />
           
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
                    className={`chat-item ${activeChat?.id === chat.id ? "active" : ""}`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="chat-avatar">
                      <img src={chat.avatar || userImage} alt={chat.name} />
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
                      onClick={() => setActiveChat(null)}
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
                      <img
                        src={activeChat.avatar}
                        alt={activeChat.name}
                        className="contact-avatar"
                      />
                      <div className="contact-info">
                        <h3>{activeChat.name}</h3>
                        <span className="contact-id">#CUE798H</span>
                      </div>
                    </div>
                    
                  </div>
                  <div className="chat-messages">
                    {activeChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`message ${message.sender === "user" ? "sent" : "received"}`}
                      >
                        {message.sender === "admin" && (
                          <div className="message-avatar">
                            <span>OP</span>
                          </div>
                        )}
                        <div className="message-content">
                          <p>{message.text}</p>
                          <span className="message-time">{message.time}</span>
                        </div>
                        {message.sender === "user" && (
                          <img
                            src={userImage}
                            alt=""
                            className="user-message-avatar"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="chat-input">
                    <input
                      type="text"
                      placeholder="Digite a mensagem..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                      }}
                    />
                    <button className="attach-btn">
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
                    <button className="send-btn" onClick={handleSendMessage}>
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