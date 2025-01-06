import React from "react";
import "./CSS/formpage.css"; // Import the CSS file
import backgroundImage from "./assets/forest.png"; // Import the background image

const FormPage = () => {
  return (
    <div
      className="form-page-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="form-content">
        <h1 className="form-title">My Magical Animal Friend 🐾</h1>
        <form className="form">
          <label>
            What's your favorite animal?  
            <input type="text" placeholder="E.g., Bunny, Lion, Dolphin" />
          </label>
          <label>
            Give a name to your animal friend:  
            <input type="text" placeholder="E.g., Fluffy, Braveheart" />
          </label>
          <label>
            If your animal friend got sick, how would you help them?  
            <textarea placeholder="E.g., Give them soup, take them to the vet..." />
          </label>
          <label>
            Whom do you think will also help you take care of your friend?  
            <textarea placeholder="E.g., My parents, teacher, another animal..." />
          </label>
          <label>
            How would you motivate your friend not to get sad?  
            <textarea placeholder="E.g., Tell jokes, play games, give hugs..." />
          </label>
          <div className="button-container">
            <button type="button" className="upload-button">
              Upload Your Story
            </button>
            <button type="button" className="upload-button">
              Upload Picture of Your Friend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
