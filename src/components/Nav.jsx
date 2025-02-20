"use client";
import React, { useState, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./CSS/style.css";

const NavBar = ({ scrollToSection = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [dropdownRefs] = useState({
    services: React.createRef(),
    resources: React.createRef()
  });
  
  // Add this useEffect for handling clicks outside dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (servicesDropdown && 
          dropdownRefs.services.current && 
          !dropdownRefs.services.current.contains(event.target)) {
        setServicesDropdown(false);
      }
      if (resourcesDropdown && 
          dropdownRefs.resources.current && 
          !dropdownRefs.resources.current.contains(event.target)) {
        setResourcesDropdown(false);
      }
    }
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesDropdown, resourcesDropdown]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/user", {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("User not authenticated");
        }

        const data = await response.json();
        if (data) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("User not logged in:", error);
      }
    };

    fetchToken();
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <span className="logo-part1">Onco</span>
        <span className="logo-part2">Connect</span>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Navigation Links */}
      <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (scrollToSection) {
                scrollToSection("home");
              } else {
                navigate("/"); // Navigate to Home
              }
            }}
          >
            Home
          </a>
        </li>
        {/* Services Dropdown */}
        <li className="navbar-dropdown">
          <button
            className="navbar-dropdown-button"
            onClick={() => setServicesDropdown(!servicesDropdown)}
          >
            Services <ChevronDown className="dropdown-icon" />
          </button>
          {servicesDropdown && (
            <ul className="navbar-dropdown-menu">
              <li>
                <a href="/docfind">Doctor Finder</a>
              </li>
              <li>
                <a href="/ai">AI Report Analyzer</a>
              </li>
              <li>
                <a href="/mental">Mental Health Counsellor</a>
              </li>
              <li>
                <a href="/donation">Donate to Patients</a>
              </li>
            </ul>
          )}
        </li>

        {/* Resources Dropdown */}
        <li className="navbar-dropdown">
          <button
            className="navbar-dropdown-button"
            onClick={() => setResourcesDropdown(!resourcesDropdown)}
          >
            Resources <ChevronDown className="dropdown-icon" />
          </button>
          {resourcesDropdown && (
            <ul className="navbar-dropdown-menu">
              <li>
                <a href="/survival">Cancer Survivor Stories</a>
              </li>
              <li>
                <a href="/kid">Kid's Survivor Stories</a>
              </li>
              <li>
                <a href="/care">Caregiver Support</a>
              </li>
              <li>
                <a href="/quiz">Cancer Risk Quiz</a>
              </li>
              <li>
                <a href="/cancerscreen">Cancer Screening Tests</a>
              </li>
            </ul>
          )}
        </li>

        <li>
          <a
            href="/forum"
            onClick={(e) => {
              e.preventDefault();
              navigate("/forum");
            }}
          >
            Community
          </a>
        </li>

        {/* Mobile-Only Button */}
        <li className="mobile-only">
          <button
            className="navbar-button"
            onClick={() => navigate(isLoggedIn ? "/user-dashboard" : "/login")}
          >
            {isLoggedIn ? "My Dashboard" : "Login"}
          </button>
        </li>
      </ul>

      {/* Desktop-Only Button */}
      <button
        className="navbar-button desktop-only"
        onClick={() => navigate(isLoggedIn ? "/user" : "/login")}
      >
        {isLoggedIn ? "My Dashboard" : "Login"}
      </button>
    </nav>
  );
};

export default NavBar;
