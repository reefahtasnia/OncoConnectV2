"use client";
import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import "./CSS/style.css";

export const NavBar = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      try {
        const decoded = jwtDecode(token.split('=')[1]); // Correct usage of jwtDecode
        if (decoded) {
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Invalid token", e);
      }
    }
  }, []);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-part1">Onco</span>
        <span className="logo-part2">Connect</span>
      </div>

      <button
        className="mobile-menu-button"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <li>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
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
              scrollToSection("aboutUs");
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
              scrollToSection("services");
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
        <li className="mobile-only">
          {isLoggedIn ? (
            <button
              className="navbar-button"
              onClick={() => navigate("/user-dashboard")}
            >
              My Dashboard
            </button>
          ) : (
            <button
              className="navbar-button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </li>
      </ul>

      <button
        className="navbar-button desktop-only"
        onClick={() => navigate("/login")}
      >
        {isLoggedIn ? "My Dashboard" : "Login"}
      </button>
    </nav>
  );
};

export default NavBar;