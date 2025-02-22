import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CSS/elephant.css"; // Using existing styles

const KidStory = () => {
    const [story, setStory] = useState(null);
    const API_BASE_URL = "http://localhost:5000";
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/kid-story/latest`);
                setStory(response.data);
            } catch (error) {
                console.error("Error fetching story:", error);
            }
        };
        fetchStory();
    }, []);

    if (!story) {
        return <div className="story-container">Loading...</div>;
    }

    // Generate the dynamic story
    const generatedStory = `
        One day, ${story.name} the ${story.favourite_animal} woke up feeling unwell. 
        ${story.name}'s best friend quickly came to help, offering warm ${story.story_1}. 
        To lift ${story.name}'s spirits, they shared some jokes and poems, making ${story.name} laugh. 
        Seeing the love and care from friends, ${story.story_2} also stepped in, ensuring ${story.name} felt safe and happy. 
        After all the warmth, care, and laughter, ${story.name} regained their energy, ready for a new adventure!
    `;

    return (
        <div className="elephant-container">
            <h1 className="story-title">{story.name}'s Magical Journey</h1>
            <div className="elephant-content">
                <div className="elephant-text-section">
                    <p className="story-paragraph">{generatedStory}</p>
                </div>
                <div className="elephant-image-section">
                    <img 
                        src={`${API_BASE_URL}/${story.image_url}`} 
                        alt={story.name} 
                        className="elephant-background" 
                    />
                </div>
            </div>
            <button className="elephant-cta-button" onClick={() => navigate("/next-story")}>
                Discover Another Story
            </button>
        </div>
    );
};

export default KidStory;
