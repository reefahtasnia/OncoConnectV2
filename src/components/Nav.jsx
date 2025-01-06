"use client"

import React, { useState } from "react";
import { Menu } from 'lucide-react';
import "./CSS/style.css";

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                <li><a href="/" >Home</a></li>
                <li><a href="#about-us">About Us</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="/forum">Community</a></li>
                <li className="mobile-only"><button className="navbar-button">Login</button></li>
            </ul>

            <button className="navbar-button desktop-only">Login</button>
        </nav>
    );
};

export default NavBar;

