"use client"

import React, { useState } from "react";
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./CSS/style.css";

export const NavBar = ({ scrollToSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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

            <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                <li><a href="/" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>Home</a></li>
                <li><a href="#about-us" onClick={(e) => { e.preventDefault(); scrollToSection("aboutUs"); }}>About Us</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection("services"); }}>Services</a></li>
                <li><a href="/forum" onClick={(e) => { e.preventDefault(); navigate("/forum"); }}>Community</a></li>
                <li className="mobile-only">
                    <button className="navbar-button" onClick={() => navigate("/login")}>Login</button>
                </li>
            </ul>

            <button className="navbar-button desktop-only" onClick={() => navigate("/login")}>Login</button>
        </nav>
    );
};

export default NavBar;

