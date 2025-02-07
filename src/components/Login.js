import React, { useState } from 'react';
import './CSS/login.css';
import background from "./assets/loginbg.png";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: ''
  });
  const [isSliding, setIsSliding] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (data.redirect) {
          window.location.href = data.redirect;
        } else {
          alert("Login successful!");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  const handleSignUpClick = (e) => {
    e.preventDefault();
    setIsSliding(true);
    // Add a slight delay before navigation to allow animation to complete
    setTimeout(() => {
      window.location.href = '/signup';
    }, 600);
  };

  return (
    <div className="auth-container">
      <div className={`form-panel ${isSliding ? 'slide-left' : ''}`}>
        <div className={`form-container ${isSliding ? 'fade-out' : ''}`}>
        <button onClick={() => window.location.href = '/'} className="back-button">
            <span className="arrow-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.54 19.54L9 13h13v-2H9l6.54-6.54L14 3l-9 9l9 9z"/>
              </svg>
            </span>
          </button>
          <h1 className="form-title">Log In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-icon">
                ✉️
              </span>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <span className="input-icon">
                🔑
              </span>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <select
                name="userType"
                className="form-select"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">User Type</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            <button type="submit" className="auth-button">
              Log In
            </button>
          </form>

          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <button className="google-button">
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%234285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/%3E%3Cpath fill='%2334A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/%3E%3Cpath fill='%23FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/%3E%3Cpath fill='%23EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/%3E%3C/svg%3E"
              alt="Google Logo"
              width="24"
              height="24"
            />
            Google
          </button>
          
          <div className="auth-link">
            Don't have an account? <a href="/signup" onClick={handleSignUpClick}>Sign Up</a>
          </div>
        </div>
      </div>
      <div className={`image-panel ${isSliding ? 'slide-left' : ''}`}>
        <img 
          src={background} 
          alt="Purple awareness ribbon in hands"
        />
      </div>
    </div>
  );
}

