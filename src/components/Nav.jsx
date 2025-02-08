"use client";
import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./CSS/style.css";

const NavBar = ({ scrollToSection = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        const decoded = jwtDecode(token);
        if (decoded) setIsLoggedIn(true);
      }
    } catch (e) {
      console.error("Invalid token", e);
    }
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
        <li>
          <a
            href="#about-us"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection ? scrollToSection("aboutUs") : navigate("/about");
            }}
          >
            About Us
          </a>
        </li>
        <li>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection ? scrollToSection("services") : navigate("/services");
            }}
          >
            Services
          </a>
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
        onClick={() => navigate(isLoggedIn ? "/user-dashboard" : "/login")}
      >
        {isLoggedIn ? "My Dashboard" : "Login"}
      </button>
    </nav>
  );
};

export default NavBar;
