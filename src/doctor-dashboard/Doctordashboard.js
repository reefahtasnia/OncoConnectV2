import React, { useState } from "react";
import DoctorSidebar from "./components/doctor-sidebar.jsx";
import DoctorBottomNav from "./components/doctor-bottom-nav.jsx";
import UserDropdown from "../user-dashboard/components/user-dropdown.js";
import NotificationsButton from "../user-dashboard/components/notifications.js";
import "./Dashboard.css";

export default function DoctorDashboard() {
  const [activePage] = useState("/doctor");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const currentUser = {
    username: "Dr. Username",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Doctor%20Dashboard%206-4Ihz51hyxs75TPG6Ull26QOWjWDdgk.png",
  };

  const patients = [
    {
      id: 1,
      initials: "DW",
      name: "Denzel White",
      type: "Report",
      time: "9:00 AM",
      age: "28 Years 3 Months",
      gender: "Male",
      symptoms: ["Fever", "Cough", "Heart Burn"],
      lastChecked: {
        doctor: "Dr Everly",
        date: "21 April 2021",
        prescription: "#2J983KT0",
      },
      observation: "High fever and cough at normal hemoglobin levels.",
      prescription: [
        "Paracetmol - 2 times a day",
        "Dizapam - Day and Night before meal",
        "Wilxonyl",
      ],
    },
    {
      id: 2,
      initials: "SM",
      name: "Stacy Mitchell",
      type: "Weekly Visit",
      time: "9:15 AM",
    },
    {
      id: 3,
      initials: "AD",
      name: "Amy Dunham",
      type: "Routine Checkup",
      time: "9:30 AM",
    },
    {
      id: 4,
      initials: "DJ",
      name: "Demi Joan",
      type: "Report",
      time: "9:50 AM",
    },
    {
      id: 5,
      initials: "SM",
      name: "Susan Myers",
      type: "Weekly Visit",
      time: "10:15 AM",
    },
  ];

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
  };

  // Calendar data
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentYear,
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const notifications = [
    {
      id: 1,
      type: "reply",
      user: "John Doe",
      content: "replied to your comment.",
      timestamp: "2 hours ago",
      isRead: false,
    },
    {
      id: 2,
      type: "like",
      user: "Jane Smith",
      content: "liked your post.",
      timestamp: "1 day ago",
      isRead: true,
    },
    {
      id: 3,
      type: "mention",
      user: "Alice Johnson",
      content: "mentioned you in a comment.",
      timestamp: "3 days ago",
      isRead: false,
    },
  ];

  return (
    <div className="doctor-dashboard">
      <DoctorSidebar activePage={activePage} />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <UserDropdown
            username={currentUser.username}
            avatar={currentUser.avatar}
            onLogout={handleLogout}
          />
          <NotificationsButton notifications={notifications} />
        </header>

        <section className="welcome-section">
          <h1>Welcome {currentUser.username}</h1>
        </section>

        <div className="dashboard-content">
          <div className="patient-list">
            <div className="patient-list-header">
              <h2>Patient List</h2>
              <div className="date-selector">
                Today
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            {patients.map((patient) => (
              <div
                key={patient.id}
                className={`patient-item ${
                  selectedPatient?.id === patient.id ? "selected" : ""
                }`}
                onClick={() => handlePatientClick(patient)}
              >
                <div
                  className="patient-avatar"
                  style={{
                    background:
                      patient.initials === "DW"
                        ? "#e8f5f3"
                        : patient.initials === "SM"
                        ? "#ffe8ec"
                        : patient.initials === "AD"
                        ? "#e8e5ff"
                        : patient.initials === "DJ"
                        ? "#e8f5f3"
                        : "#ffe8ec",
                    color:
                      patient.initials === "DW"
                        ? "#0fa3b1"
                        : patient.initials === "SM"
                        ? "#ff6b6b"
                        : patient.initials === "AD"
                        ? "#6b4eff"
                        : patient.initials === "DJ"
                        ? "#0fa3b1"
                        : "#ff6b6b",
                  }}
                >
                  {patient.initials}
                </div>
                <div className="patient-info">
                  <div className="patient-name">{patient.name}</div>
                  <div className="patient-visit-type">{patient.type}</div>
                </div>
                <div className="patient-time">{patient.time}</div>
              </div>
            ))}
          </div>

          <div className="consultation-section">
            <h2>Consultation</h2>
            {selectedPatient ? (
              <div className="consultation-details">
                <div className="consultation-header">
                  <div className="patient-basic-info">
                    <div
                      className="patient-avatar large"
                      style={{
                        background:
                          selectedPatient.initials === "DW"
                            ? "#e8f5f3"
                            : "#ffe8ec",
                        color:
                          selectedPatient.initials === "DW"
                            ? "#0fa3b1"
                            : "#ff6b6b",
                      }}
                    >
                      {selectedPatient.initials}
                    </div>
                    <div>
                      <h3>{selectedPatient.name}</h3>
                      <p>
                        {selectedPatient.gender} - {selectedPatient.age}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedPatient.symptoms && (
                  <div className="symptoms-section">
                    <div className="symptoms-grid">
                      {selectedPatient.symptoms.map((symptom, index) => (
                        <div key={index} className="symptom-item">
                          <div className="symptom-icon"></div>
                          <span>{symptom}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPatient.lastChecked && (
                  <div className="last-checked-section">
                    <h4>Last Checked</h4>
                    <p>
                      {selectedPatient.lastChecked.doctor} on{" "}
                      {selectedPatient.lastChecked.date} Prescription #
                      {selectedPatient.lastChecked.prescription}
                    </p>
                  </div>
                )}

                {selectedPatient.observation && (
                  <div className="observation-section">
                    <h4>Observation</h4>
                    <p>{selectedPatient.observation}</p>
                  </div>
                )}

                {selectedPatient.prescription && (
                  <div className="prescription-section">
                    <h4>Prescription</h4>
                    <ul>
                      {selectedPatient.prescription.map((med, index) => (
                        <li key={index}>{med}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-patient-selected">
                Select a patient to view consultation details
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-widgets">
          <div className="calendar-widget widget">
            <div className="calendar-header">
              <h3>Calendar</h3>
              <div className="calendar-navigation">
                <button className="nav-btn">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <span>
                  {currentMonth} {currentYear}
                </span>
                <button className="nav-btn">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="calendar-body">
              <div className="weekdays">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
              </div>
              <div className="dates">
                <div className="week">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                </div>
                {/* More weeks */}
                <div className="week">
                  <div>4</div>
                  <div>5</div>
                  <div>6</div>
                  <div>7</div>
                  <div>8</div>
                  <div>9</div>
                  <div>10</div>
                </div>
                <div className="week">
                  <div>11</div>
                  <div>12</div>
                  <div>13</div>
                  <div>14</div>
                  <div>15</div>
                  <div>16</div>
                  <div>17</div>
                </div>
                <div className="week">
                  <div>18</div>
                  <div>19</div>
                  <div>20</div>
                  <div>21</div>
                  <div className="current">22</div>
                  <div>23</div>
                  <div>24</div>
                </div>
                <div className="week">
                  <div>25</div>
                  <div>26</div>
                  <div>27</div>
                  <div>28</div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="appointments-widget widget">
            <div className="widget-header">
              <h3>Upcoming Appointments</h3>
              <a href="#" className="view-all">
                View All
              </a>
            </div>
            <div className="upcoming-appointment">
              <div className="appointment-avatar">M</div>
              <div className="appointment-info">
                <h4>Monthly doctor's meet</h4>
                <p>8 April, 2021 | 04:00 PM</p>
              </div>
            </div>
          </div>

          <div className="patient-count-widget widget">
            <div className="widget-header">
              <h3>Today's Patient Count</h3>
            </div>
            <div className="count">24</div>
          </div>
        </div>
      </main>
      <DoctorBottomNav activePage={activePage} />
    </div>
  );
}
