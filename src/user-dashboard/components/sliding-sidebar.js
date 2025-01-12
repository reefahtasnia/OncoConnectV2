"use client";

import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

export default function SlidingSidebar({ date, isOpen, onClose }) {
  const navigate = useNavigate()
  const sections = [
    {
      title: "My Appointments",
      items: ["Dr. Mehta at 7 pm in Tata Hospital."],
      route: "/docfind",
    },
    {
      title: "My Tests",
      items: ["Colon cancer screening test"],
      route: "/cancerscreen",
    },
    {
      title: "My Symptoms",
      items: ["Felt dizzy at 12 pm."],
      route: "/symptoms",
    },
    {
      title: "My Calorie Intake",
      items: ["Carbohydrates: 200g", "Proteins: 50g", "Fats: 30g"],
      route: "/calorie",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="sliding-sidebar-container open">
      <div className="sidebar-overlay" onClick={onClose}></div>
      <div className="sliding-sidebar">
        <div className="sidebar-header">
          <button className="back-button" onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M12 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2>How are you feeling today?</h2>
        </div>

        <div className="sidebar-content">
          {sections.map((section) => (
            <div key={section.title} className="section">
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button className="add-button" onClick={() => navigate(section.route)}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line
                    x1="12"
                    y1="5"
                    x2="12"
                    y2="19"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
