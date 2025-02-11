import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./CSS/Quiz.css";
import Footer from './Footer';
import reviewImage1 from "./assets/quizreveiw1.png";
import reviewImage2 from "./assets/quizreveiw2.png";
import reviewImage3 from "./assets/quizreveiw3.png";



const Quiz = () => {
  
  const [cancerTypes, setCancerTypes] = useState([]);
  const navigate = useNavigate();

  const reviews = [
    { id: 1, name: "John D.", text: "This quiz helped me understand my risk factors better. Highly recommended!", rating: 5, image: reviewImage1 },
    { id: 2, name: "Sarah M.", text: "I learned so much about prevention. Thank you for this valuable resource!", rating: 4, image: reviewImage2 },
    { id: 3, name: "Michael R.", text: "Easy to use and very informative. Everyone should take this quiz.", rating: 5, image: reviewImage3 },
  ];

  

  useEffect(() => {
    // Fetch cancer types from the backend
    axios.get('http://localhost:5002/api/cancer-types')
      .then(response => {
        setCancerTypes(response.data); // Update state with the fetched cancer types
      })
      .catch(err => {
        console.error('Error fetching cancer types:', err);
      });
  }, []);

  const handleQuizStart = (cancerId) => {
    navigate(`/quiz2/${cancerId}`); // Send the cancer name to quiz2 page
  };

  return (
    <div className="quiz-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>
          <span>Understand Your Risk</span>
        </h1>
        <h2>Take the Cancer Assessment Quiz Today</h2>
      </section>

      {/* Main Content */}
      <section className="main-content">
        <h2 className="section-title">Choose a Cancer Type to Get Started</h2>
        
        <div className="content-wrapper">
          <div className="cancer-cards">
            {cancerTypes.map((cancerType) => (
              <div key={cancerType._id} className="card">
                <div className="card-content">
                  <div className="ribbon-container">
                    <img src={cancerType.image} alt={`${cancerType.name} Ribbon`} className="ribbon-image" />
                  </div>
                  <div className="card-text">
                    <h3>{cancerType.name}</h3>
                    <p>{cancerType.description}</p>
                  </div>
                </div>
                <div className="button-container">
                  <button className="quiz-btn" onClick={() => handleQuizStart(cancerType._id)}>Take the quiz now</button>
                </div>
              </div>
            ))}
          </div>

          {/* What Our Users Say Section */}
          <div className="reviews-section">
            <h3>
              <span>What Our Users Say</span>
            </h3>
            <div className="review-cards">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-image">
                    <img src={review.image} alt={`Review by ${review.name}`} />
                  </div>
                  <div className="review-content">
                    <h4>{review.name}</h4>
                    <p>{review.text}</p>
                    <div className="rating">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="star">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Pagination */}
      <div className="pagination">
        <button className="page-btn prev">←</button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <span>...</span>
        <button className="page-btn">8</button>
        <button className="page-btn next">→</button>
      </div>

      <Footer />
    </div>
  );
};

export default Quiz;
