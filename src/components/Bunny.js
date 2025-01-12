import React from "react";
import "./CSS/bunny.css";
import { useNavigate } from 'react-router-dom';
import backgroundImage from "./assets/kid2.png";
import Footer from "./Footer";

const Bunny = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleExploreClick = (e) => {
    e.preventDefault(); // Prevent default button behavior
    console.log('button clicked');
    navigate('/elephant'); // Use navigate to go to the Bunny component
  };
  const handleNavigateForm = (e) => {
    e.preventDefault(); // Prevent default button behavior
    console.log('button clicked');
    navigate('/formpage'); // Use navigate to go to the Bunny component
  };
  return (
    <div className="bunny-container">
      <h1 className="story-title">Benny's Boo-Boo</h1>
      <div className="bunny-content">
        <div className="bunny-text-section">
          <p className="story-paragraph">
          One sunny day, Benny the bunny was hopping near a rocky stream. He slipped on a mossy rock and scraped his paw. "Ouch!" he cried, limping to a soft patch of grass.

Olive the owl saw Benny and flew down. "Let me help," she said, placing a honey-covered leaf on his paw. "This will heal it quickly!"
          </p>
        </div>
        <div className="bunny-image-section">
          <img
            src={backgroundImage}
            alt="Artistic Acorns"
            className="bunny-background"
          />
        </div>
        <div className="bunny-text-section">
          <p classname="story-paragraph">
          Benny rested while his friends brought him berries and cheered him up. In just a few days, Benny was hopping happily again, more careful than before.

            Moral: Friends make healing easier! ❤️
          </p>
          <button className="bunny-cta-button" onClick={handleExploreClick}>
            Visit Your Friend Elephant
          </button>
          <button className="bunny-cta-button2" onClick={handleNavigateForm}>
            Upload Your Own Storyl
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bunny;
