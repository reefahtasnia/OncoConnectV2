import React from 'react';
import "./CSS/survivalkid.css";
import { useNavigate } from 'react-router-dom';
import backgroundImage from './assets/kid1.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

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
        <div className="kidcontent">
          <h1 className="kidtitle">
            <span style={{ fontFamily: "Permanent Marker" }}>The</span>
            <span style={{ fontFamily: "Permanent Marker" }}>Magic</span>
            <span style={{ fontFamily: "Permanent Marker" }}>Zoo</span>
          </h1>
          <div className="illustration">
            {/* Add your illustration here */}
          </div>
        </div>
      </div>

      {/* Button Container for Horizontal Layout */}
      <div className="button-container">
        {/* Explore Button */}
        <button className="explore-button" onClick={handleExploreClick}>
          Explore
        </button>

        {/* Link Button to Adult Page */}
        <Link to="/survival" className="link-button">Go to Adult Page</Link>
      </div>
    </div>
  );
};

export default MagicZoo;
