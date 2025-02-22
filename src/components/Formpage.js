import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/formpage.css";
import backgroundImage from "./assets/forest.png";
import Footer from "./Footer";

const KidFormPage = () => {
  const [formData, setFormData] = useState({
    favourite_animal: "",
    name: "",
    story_1: "",
    story_2: "",
    story_3: "",
    image_url: null, // Image file for upload
  });

  const API_BASE_URL = "http://localhost:5000";
  const [userId, setUserId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const fetchUserId = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/get-userid`, { withCredentials: true });
      setUserId(response.data.user_id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      await fetchUserId();
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("user_id", userId);
    formDataToSubmit.append("favourite_animal", formData.favourite_animal);
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("story_1", formData.story_1);
    formDataToSubmit.append("story_2", formData.story_2);
    formDataToSubmit.append("story_3", formData.story_3);
    formDataToSubmit.append("image_url", formData.image_url);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/kid-story`, formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Story submitted successfully:", response.data);
      alert("Your story has been uploaded!");
    } catch (error) {
      console.error("Error submitting story:", error.response?.data || error);
      alert("Error occurred! Check console.");
    }
  };

  return (
    <div className="kidform-page-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="kidform-content">
        <h1 className="kidform-title">My Magical Animal Friend 🐾</h1>
        <form className="kidform" onSubmit={handleSubmit}>
          <label>
            What's your favorite animal?  
            <input type="text" name="favourite_animal" value={formData.favourite_animal} onChange={handleChange} placeholder="E.g., Bunny, Lion, Dolphin" required />
          </label>
          <label>
            Give a name to your animal friend:  
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="E.g., Fluffy, Braveheart" required />
          </label>
          <label>
            If your animal friend got sick, how would you help them?  
            <textarea name="story_1" value={formData.story_1} onChange={handleChange} placeholder="E.g., Give them soup, take them to the vet..." required />
          </label>
          <label>
            Whom do you think will also help you take care of your friend?  
            <textarea name="story_2" value={formData.story_2} onChange={handleChange} placeholder="E.g., My parents, teacher, another animal..." required />
          </label>
          <label>
            How would you motivate your friend not to get sad?  
            <textarea name="story_3" value={formData.story_3} onChange={handleChange} placeholder="E.g., Tell jokes, play games, give hugs..." required />
          </label>
          <label>
            Upload a Picture of Your Friend  
            <input type="file" name="image_url" onChange={handleFileChange} accept="image/*" required />
          </label>
          <div className="kidform-button-container">
            <button type="submit" className="kidform-upload-button">Upload Your Story</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KidFormPage;
