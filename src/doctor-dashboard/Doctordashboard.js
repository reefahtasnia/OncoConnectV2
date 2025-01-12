import { useState } from 'react';
import DoctorSidebar from './components/doctor-sidebar';
import PatientList from './components/patient-list';
import MedicalConsultation from './components/medical-consultation';
import DoctorCalendar from './components/doctor-calendar';
import DoctorBottomNav from './components/doctor-bottom-nav';
import UserDropdown from "../user-dashboard/components/user-dropdown";
import NotificationsButton from "../user-dashboard/components/notifications";
import userImage from "../user-dashboard/user.png";
import './DoctorDashboard.css';

function DoctorDashboardPage() {
  const [date, setDate] = useState(new Date())
  const [selectedPatient, setSelectedPatient] = useState('Denzel White')
  const [activeSection, setActiveSection] = useState('patients')
  const [isSidebarOpen, setSidebarOpen] = useState(false)
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
  
  return (
    <div className="doctor-dashboard-container">
      <DoctorSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="doctor-dashboard-main">
      <header className="doctor-dashboard-header">
          <div className="doctor-header-content">
            <h1>Patient Messages</h1>
            <div className="doctor-header-actions">
              <UserDropdown
                username="Dr. Johnson"
                avatar={userImage}
                onLogout={() => {}}
              />
              <NotificationsButton notifications={notifications} />
            </div>
          </div>
        </header>

        <div className="doctor-dashboard-content">
          <div className="doctor-patients-section">
            <div className="patient-management-panel">
              <PatientList onPatientSelect={setSelectedPatient} />
            </div>
            
            <div className="medical-consultation-panel">
              <MedicalConsultation patientName={selectedPatient} />
            </div>
          </div>

          <div className="doctor-schedule-section">
            <div className="doctor-calendar-panel">
              <DoctorCalendar selectedDate={date} onChange={setDate} />
            </div>

            <div className="doctor-upcoming-panel">
              <div className="upcoming-appointments-card">
                <div className="appointment-card-header">
                  <h3>Upcoming Appointments</h3>
                  <button className="view-all-appointments">View All</button>
                </div>
                <div className="upcoming-appointment-event">
                  <div className="appointment-event-avatar">M</div>
                  <div className="appointment-event-details">
                    <h4>Monthly doctor's meet</h4>
                    <p>8 April, 2021 | 04:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="doctor-appointments-panel">
              <div className="daily-appointments-card">
                <h3>Today's Patient Count</h3>
                <div className="daily-appointments-count">24</div>
              </div>
            </div>
          </div>
        </div>

        <DoctorBottomNav activeSection={activeSection} onSectionChange={setActiveSection} />
      </main>
    </div>
  )
};

export default DoctorDashboardPage;

