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
          <button className="admin-dashboard-logout-button">
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
            <div className="admin-dashboard-metric-value">10</div>
            <div className="admin-dashboard-metric-change admin-dashboard-positive">
              <span className="admin-dashboard-arrow">↑</span> 8.5% Up from
              yesterday
            </div>
          </div>

          <div className="admin-dashboard-metric-card">
            <div className="admin-dashboard-metric-header">New Users</div>
            <div className="admin-dashboard-metric-value">2</div>
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
            <div className="admin-dashboard-metric-value">0</div>
            <div className="admin-dashboard-metric-change admin-dashboard-positive">
              <span className="admin-dashboard-arrow">↑</span> 0% Change from
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
            <svg viewBox="0 0 500 200" className="admin-line-chart">
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#8447e9" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <path d="M 40 20 L 40 180" className="chart-axis" />
              <path d="M 40 180 L 460 180" className="chart-axis" />

              {/* Data line */}
              <path
                d="M 60 160 C 100 80, 140 120, 180 100 C 220 80, 260 140, 300 120 C 340 100, 380 160, 420 140"
                className="chart-line"
                stroke="url(#lineGradient)"
              />

              {/* Data points */}
              <circle cx="60" cy="160" r="4" className="chart-point" />
              <circle cx="180" cy="100" r="4" className="chart-point" />
              <circle cx="300" cy="120" r="4" className="chart-point" />
              <circle cx="420" cy="140" r="4" className="chart-point" />

              {/* Labels */}
              <text x="40" y="190" className="chart-label">
                Mon
              </text>
              <text x="140" y="190" className="chart-label">
                Tue
              </text>
              <text x="240" y="190" className="chart-label">
                Wed
              </text>
              <text x="340" y="190" className="chart-label">
                Thu
              </text>
              <text x="440" y="190" className="chart-label">
                Fri
              </text>

              <text x="20" y="30" className="chart-label">
                80%
              </text>
              <text x="20" y="80" className="chart-label">
                60%
              </text>
              <text x="20" y="130" className="chart-label">
                40%
              </text>
              <text x="20" y="180" className="chart-label">
                20%
              </text>
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
