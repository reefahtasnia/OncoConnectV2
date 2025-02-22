import DoctorSidebar from "./components/doctor-sidebar";
import DoctorBottomNav from "./components/doctor-bottom-nav";
import UserDropdown from "../user-dashboard/components/user-dropdown";
import NotificationsButton from "../user-dashboard/components/notifications";
import "./patient.css";
import userImage from "../user-dashboard/user.png";

export default function PatientsPage() {
  const currentUser = {
    username: "Dr. Username",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Doctor%20Dashboard%206-4Ihz51hyxs75TPG6Ull26QOWjWDdgk.png",
  };
  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
  };
  const currentPatients = [
    {
      id: 1,
      name: "Nitya Jayakumar",
      initials: "NJ",
      status: "New Report added",
      time: "09:00 AM",
      bgColor: "#FFF5F5",
    },
    {
      id: 2,
      name: "Denzel White",
      initials: "DW",
      status: "Upcoming appointment",
      time: "10:00 AM",
      bgColor: "#EEE6FF",
    },
    {
      id: 3,
      name: "Stacy Mitchell",
      initials: "SM",
      status: "Routine checkup",
      time: "09:00 AM",
      bgColor: "#F0FFF4",
    },
    {
      id: 4,
      name: "Susan Meyers",
      initials: "SM",
      status: "Weekly Visit",
      time: "09:00 AM",
      bgColor: "#FFF5F5",
    },
  ];

  const upcomingPatients = [
    {
      id: 5,
      name: "Daisy Sanders",
      initials: "DS",
    },
    {
      id: 6,
      name: "Laila Mason",
      initials: "LM",
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

  return (
    <div className="doctor-dashboard">
      <DoctorSidebar />

      <main className="doctor-dashboard-main">
        <header className="dashboard-header">
          <UserDropdown
            username={currentUser.username}
            avatar={currentUser.avatar}
            onLogout={handleLogout}
          />
          <NotificationsButton notifications={notifications} />
        </header>
        <h1>My Patients</h1>

        <div className="doctor-patients-container">
          <div className="doctor-patients-section">
            <h2>My Current Patients</h2>
            <div className="doctor-patients-list">
              {currentPatients.map((patient) => (
                <a
                  href={`/doctor/patients/patient-${patient.id}`}
                  key={patient.id}
                  className="doctor-patient-item"
                >
                  <div
                    className="doctor-patient-initials"
                    style={{ background: patient.bgColor }}
                  >
                    {patient.initials}
                  </div>
                  <div className="doctor-patient-details">
                    <h3>{patient.name}</h3>
                    <span className="doctor-patient-status">
                      {patient.status}
                    </span>
                  </div>
                  <span className="doctor-patient-time">{patient.time}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="doctor-patients-section">
            <h2>Upcoming Patients</h2>
            <div className="doctor-patients-list">
              {upcomingPatients.map((patient) => (
                <div key={patient.id} className="doctor-patient-item upcoming">
                  <div
                    className="doctor-patient-initials"
                    style={{ background: patient.bgColor, color: "white" }}
                  >
                    {patient.initials}
                  </div>
                  <div className="doctor-patient-details">
                    <h3>{patient.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DoctorBottomNav />
      </main>
    </div>
  );
}
