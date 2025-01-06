import React from "react";
import { Facebook } from "./Facebook";
import { Instagram } from "./Instagram";
import { Twitter } from "./Twitter";
import "./CSS/style.css";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-background">
                <div className="footer-content">
                    <div className="footer-header">
                        <h2 className="footer-logo">OncoConnect</h2>
                        <nav className="footer-nav">
                            <a href="#home">Home</a>
                            <a href="#about-us">About us</a>
                            <a href="#features">Features</a>
                            <a href="#community">Community</a>
                        </nav>
                    </div>
                    <div className="footer-social">
                        <Facebook />
                        <Twitter />
                        <Instagram />
                    </div>
                    <div className="footer-divider"></div>
                    <div className="footer-bottom">
                        <p>Privacy Policy | Terms of Use</p>
                        <p>© 2024 OncoConnect. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
