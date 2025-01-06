import React, { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import './CSS/resetPassword.css';
import background from "./assets/loginbg.png";

export default function PasswordReset() {
  const [step, setStep] = useState(1);
  const [isSliding, setIsSliding] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = (e) => {
    e.preventDefault();
    setIsSliding(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsSliding(false);
    }, 600);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsSliding(true);
    setTimeout(() => {
      window.location.href = '/login';
    }, 600);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className={`form-container ${isSliding ? 'slide-left' : ''}`}>
            <button onClick={() => window.location.href = '/'} className="back-button">
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </button>
            <h1 className="form-title">Forgot Password</h1>
            <form onSubmit={nextStep}>
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
              <button type="submit" className="submit-button">
                Send OTP
              </button>
            </form>
            <div className="auth-link">
              Already have an account? <a href="/login">Log In</a>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className={`form-container ${isSliding ? 'slide-left' : ''}`}>
            <button onClick={() => setStep(1)} className="back-button">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <h1 className="form-title">OTP Verification</h1>
            <form onSubmit={nextStep}>
              <div className="input-group">
                <span className="input-icon">
                  🔑
                </span>
                <input
                  type="text"
                  name="otp"
                  className="form-input"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Verify
              </button>
            </form>
            <div className="resend-link">
              Didn't get OTP? <a href="#" onClick={(e) => e.preventDefault()}>Resend OTP</a>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className={`form-container ${isSliding ? 'slide-left' : ''}`}>
            <button onClick={() => setStep(2)} className="back-button">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <h1 className="form-title">Reset your Password</h1>
            <form onSubmit={nextStep}>
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
                <span className="input-icon">
                  🔑
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Reset Password
              </button>
            </form>
          </div>
        );
      
      case 4:
        return (
          <div className={`form-container ${isSliding ? 'slide-left' : ''}`}>
            <div className="success-container">
              <CheckCircle className="success-icon" size={48} color="#22c55e" />
              <h1 className="form-title">
                Your password has been successfully changed!
              </h1>
              <p className="success-message">
                Sign in to your account with your new password
              </p>
              <button onClick={handleLoginClick} className="submit-button">
                Sign In
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="image-section">
        <img 
          src={background} 
          alt="Purple awareness ribbon in hands"
        />
      </div>
      <div className="form-section">
        {renderStep()}
      </div>
    </div>
  );
}

