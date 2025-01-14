import React from "react";
import "./CSS/elephant.css";
import { useNavigate } from 'react-router-dom';
import backgroundImage from "./assets/kid3.png";
import Footer from "./Footer";

const Elephant = () => {
    const navigate = useNavigate(); // Initialize navigate function

  const handleExploreClick = (e) => {
    e.preventDefault(); // Prevent default button behavior
    console.log('button clicked');
    navigate('/fox'); // Use navigate to go to the Bunny component
  };
  return (
    <div className="elephant-container">
      <h1 className="story-title">Ella's Tricky Trunk</h1>
      <div className="elephant-content">
        <div className="elephant-text-section">
          <p className="story-paragraph">
            One warm afternoon, Ella the elephant was trying to pick mangoes with her trunk. Suddenly, she twisted her trunk trying to grab a mango that was too high. "Oh no!" she trumpeted, feeling a sharp pain.
          </p>
        </div>
        <div className="elephant-image-section">
          <img
            src={backgroundImage}
            alt="Ella the Elephant"
            className="elephant-background"
          />
        </div>
        <div className="elephant-text-section">
          <p className="story-paragraph">
            Ella's best friend, Milo the monkey, noticed her struggle and quickly swung down to help. Milo wrapped a cool banana leaf around Ella's trunk and brought her water to drink. With rest and care from her jungle friends, Ella's trunk healed, and soon she was back to reaching for mangoes—this time with a little more care!
          </p>
          <button className="elephant-cta-button" onClick={handleExploreClick}>
            Visit Your Friend Fox
          </button>
        </div>
      </div>
    </div>
  );
};

export default Elephant;
