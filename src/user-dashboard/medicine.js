"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import BottomNav from "./components/bottom-nav";
import UserDropdown from "./components/user-dropdown";
import NotificationsButton from "./components/notifications";
import pillImage from "./pill.png";
import userImage from "./user.png";
import "./medicine.css";
import CheckPlanPopup from "./components/checkPlan";

export default function MedicinesPage() {
  const [activeSection, setActiveSection] = useState("medicines");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dailyReview, setDailyReview] = useState([]);
  const [userData, setUserData] = useState("");
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    amount: 2,
    daysPerWeek: 7,
    selectedDays: [],
    foodTiming: "Any",
    timesPerDay: 1,
    notificationTimes: [{ time: "10:00", enabled: true }],
  });

  // Update notification times when timesPerDay changes
  useEffect(() => {
    const newNotificationTimes = Array(parseInt(formData.timesPerDay) || 1)
      .fill(null)
      .map(
        (_, index) =>
          formData.notificationTimes[index] || { time: "10:00", enabled: true }
      );

    setFormData((prev) => ({
      ...prev,
      notificationTimes: newNotificationTimes,
    }));
  }, [formData.timesPerDay]);

  useEffect(() => {
    fetchTodaysMedicines();
    fetchUserData();
  }, []);
  useEffect(() => {
    const allDays = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    if (parseInt(formData.daysPerWeek) === 7) {
      setFormData((prev) => ({
        ...prev,
        selectedDays: allDays,
      }));
    } else if (formData.selectedDays.length > formData.daysPerWeek) {
      // If days are reduced, limit the selection
      setFormData((prev) => ({
        ...prev,
        selectedDays: prev.selectedDays.slice(0, formData.daysPerWeek),
      }));
    }
  }, [formData.daysPerWeek]);
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
  const fetchTodaysMedicines = async () => {
    try {
      const timezoneOffset = new Date().getTimezoneOffset();
      const response = await fetch("http://localhost:5001/api/medicines/today", {
        credentials: "include",
        "Timezone-Offset": timezoneOffset,
      });
      if (response.ok) {
        const data = await response.json();
        setDailyReview(
          data.medicines.map((med) => ({
            name: med.name,
            time: med.notificationTimes[0]?.time || "N/A",
            status: med.taken ? "Taken" : "Pending", // Use "Taken" or "Pending" based on the status
          }))
        );
      } else {
        console.log("No medicines for today");
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDaysChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    if (selectedOptions.length <= formData.daysPerWeek) {
      setFormData((prev) => ({
        ...prev,
        selectedDays: selectedOptions,
      }));
    }
  };
  const handleDaySelect = (day) => {
    const currentDays = formData.selectedDays;
    let newDays;

    if (currentDays.includes(day)) {
      // Remove day if already selected
      newDays = currentDays.filter((d) => d !== day);
    } else if (currentDays.length < formData.daysPerWeek) {
      // Add day if under the limit
      newDays = [...currentDays, day];
    } else {
      // At limit, don't add new day
      return;
    }

    setFormData((prev) => ({
      ...prev,
      selectedDays: newDays,
    }));
  };

  const handleFoodTimingSelect = (timing) => {
    setFormData((prev) => ({
      ...prev,
      foodTiming: timing,
    }));
  };

  const handleNotificationTimeChange = (index, time) => {
    setFormData((prev) => {
      const newTimes = [...prev.notificationTimes];
      newTimes[index] = { ...newTimes[index], time };
      return {
        ...prev,
        notificationTimes: newTimes,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure notificationTimes are in the correct format
      const notificationTimes = formData.notificationTimes.map((time) => ({
        time: time.time,
        enabled: time.enabled,
      }));
      const response = await fetch("http://localhost:5001/api/medicines/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          notificationTimes,
        }),
      });
  
      if (response.ok) {
        setFormData({
          name: "",
          amount: 2,
          daysPerWeek: 7,
          selectedDays: [],
          foodTiming: "Any",
          timesPerDay: 1,
          notificationTimes: [{ time: "10:00", enabled: true }],
        });
        // fetchTodaysMedicines();
      } else {
        const error = await response.json();
        console.error("Error adding medicine:", error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  const handleMedicineClick = async (medicine) => {
    try {
      const response = await fetch(`http://localhost:5001/api/medicines/${medicine._id}`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedMedicine(data.medicine);
        setIsPopupOpen(true);
      }
    } catch (error) {
      console.error("Error fetching medicine details:", error);
    }
  };

  const handleStatusUpdate = async (medicineId, status) => {
    try {
      const response = await fetch(`http://localhost:5001/api/medicines/status/${medicineId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchTodaysMedicines();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
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
  return (
    <div className="user-dashboard">
      <Sidebar isOpen={sidebarOpen} />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>My Medicines</h1>
          <div className="header-actions">
            <UserDropdown
              username={userData.username}
              avatar={userData.profilePicture}
              onLogout={() => handleLogout()}
            />
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
                        src={pillImage || "/placeholder.svg"}
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
                    <button
                      className="medicine-action"
                      onClick={() => handleMedicineClick(medicine)}
                    >
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
              <form className="add-plan-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Pills name</label>
                  <div className="pills-input">
                    <img
                      src={pillImage || "/placeholder.svg"}
                      alt="Medicine"
                      width="20"
                      height="20"
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter Medicine Name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Amount & How many days in a week?</label>
                  <div className="amount-duration">
                    <div className="pills-amount">
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        min="1"
                        required
                      />
                      <span>pills</span>
                    </div>
                    <div className="duration">
                      <input
                        type="number"
                        name="daysPerWeek"
                        value={formData.daysPerWeek}
                        onChange={handleInputChange}
                        min="1"
                        max="7"
                        required
                      />
                      <span>days</span>
                    </div>
                  </div>
                </div>

                <div className="form-group days-selection-group">
                  <label>Select Days</label>
                  <div className="days-selection">
                    {[
                      { value: "monday", label: "Monday" },
                      { value: "tuesday", label: "Tuesday" },
                      { value: "wednesday", label: "Wednesday" },
                      { value: "thursday", label: "Thursday" },
                      { value: "friday", label: "Friday" },
                      { value: "saturday", label: "Saturday" },
                      { value: "sunday", label: "Sunday" },
                    ].map((day) => (
                      <div key={day.value} className="day-option">
                        <label className="day-label">
                          <input
                            type="checkbox"
                            checked={formData.selectedDays.includes(day.value)}
                            onChange={() => handleDaySelect(day.value)}
                            disabled={
                              formData.daysPerWeek === 7 ||
                              (!formData.selectedDays.includes(day.value) &&
                                formData.selectedDays.length >=
                                  formData.daysPerWeek)
                            }
                          />
                          <span>{day.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <small className="days-helper">
                    {formData.daysPerWeek === 7
                      ? "All days selected"
                      : formData.selectedDays.length === formData.daysPerWeek
                      ? "Days selected"
                      : `Select ${
                          formData.daysPerWeek - formData.selectedDays.length
                        } days`}
                  </small>
                </div>

                <div className="form-group">
                  <label>Food & Pills</label>
                  <div className="timing-options">
                    {["Before", "After", "Any"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`timing-option ${
                          formData.foodTiming === option ? "selected" : ""
                        }`}
                        onClick={() => handleFoodTimingSelect(option)}
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
                  <label>
                    How many times a day do you need to take medicine?
                  </label>
                  <div className="frequency-input">
                    <input
                      type="number"
                      name="timesPerDay"
                      value={formData.timesPerDay}
                      onChange={handleInputChange}
                      min="1"
                      required
                    />
                    <span>times</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Notification Times</label>
                  {formData.notificationTimes.map((notification, index) => (
                    <div key={index} className="notification-time">
                      <input
                        type="time"
                        value={notification.time}
                        onChange={(e) =>
                          handleNotificationTimeChange(index, e.target.value)
                        }
                        required
                      />
                    </div>
                  ))}
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
        <CheckPlanPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          medicineData={selectedMedicine}
          onStatusUpdate={handleStatusUpdate}
        />
      </main>
    </div>
  );
}
