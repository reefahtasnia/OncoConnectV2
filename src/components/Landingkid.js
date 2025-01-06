import React from 'react';
import "./CSS/survivalkid.css";
import { useNavigate } from 'react-router-dom';
import backgroundImage from './assets/kid1.png';

const MagicZoo = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleExploreClick = (e) => {
    e.preventDefault(); // Prevent default button behavior
    console.log('Button clicked');
    navigate('/bunny'); // Navigate to the Bunny component
  };

  return (
    <div className="main">
      {/* Background Image */}
      <div
        className="magic-zoo-container"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Content */}
        <div className="content">
          <h1 className="title">
            <span style={{ fontFamily: 'Abril Fatface, cursive' }}>The</span>
            <span style={{ fontFamily: 'Abril Fatface, cursive' }}>Magic</span>
            <span style={{ fontFamily: 'Abril Fatface, cursive' }}>Zoo</span>
          </h1>
          <div className="illustration">
            {/* Add your illustration here */}
          </div>
        </div>
      </div>

      {/* Button (Placed Outside the Background to Ensure Accessibility) */}
      <button className="explore-button" onClick={handleExploreClick}>
        Explore
      </button>
    </div>
  );
};

export default MagicZoo;
