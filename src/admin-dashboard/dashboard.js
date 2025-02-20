import React from "react";
import "./dashboard.css";
import Sidebar from "./components/sidebar.js";

function AdminDashboard() {
  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <main className="admin-dashboard-main-content">
        <div className="admin-dashboard-header">
          <h1 className="admin-dashboard-title">Admin Dashboard</h1>
          <button
            className="admin-dashboard-logout-button"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
        <div className="admin-dashboard-metrics-grid">
          <div className="admin-dashboard-metric-card">
            <div className="admin-dashboard-metric-header">Total User</div>
            <div className="admin-dashboard-metric-value">40,689</div>
            <div className="admin-dashboard-metric-change admin-dashboard-positive">
              <span className="admin-dashboard-arrow">↑</span> 8.5% Up from
              yesterday
            </div>
          </div>

          <div className="admin-dashboard-metric-card">
            <div className="admin-dashboard-metric-header">New Users</div>
            <div className="admin-dashboard-metric-value">10</div>
            <div className="admin-dashboard-metric-change admin-dashboard-positive">
              <span className="admin-dashboard-arrow">↑</span> 1.3% Up from past
              week
            </div>
          </div>

          <div className="admin-dashboard-metric-card">
            <div className="admin-dashboard-metric-header">Total Donation</div>
            <div className="admin-dashboard-metric-value">$189</div>
            <div className="admin-dashboard-metric-change admin-dashboard-negative">
              <span className="admin-dashboard-arrow">↓</span> 4.3% Down from
              yesterday
            </div>
          </div>

          <div className="admin-dashboard-metric-card">
            <div className="admin-dashboard-metric-header">Total Reports</div>
            <div className="admin-dashboard-metric-value">20</div>
            <div className="admin-dashboard-metric-change admin-dashboard-positive">
              <span className="admin-dashboard-arrow">↑</span> 1.8% Up from
              yesterday
            </div>
          </div>
        </div>

        <div className="admin-dashboard-chart-container">
          <div className="admin-dashboard-chart-header">
            <h2 className="admin-dashboard-chart-title">User Engagement</h2>
            <select className="admin-dashboard-month-selector">
              <option>October</option>
            </select>
          </div>
          <div className="admin-dashboard-chart">
            {/* Chart would be implemented with a charting library */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
