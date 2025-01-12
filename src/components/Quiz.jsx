import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Quiz.css";
import Footer from './Footer';
import breast from "./assets/pinkribbon.png";
import lung from "./assets/whiteribbon.png";
import cervical from "./assets/greenribbon.png";
import reviewImage1 from "./assets/quizreveiw1.png";
import reviewImage2 from "./assets/quizreveiw2.png";
import reviewImage3 from "./assets/quizreveiw3.png";

const Quiz = () => {
  const navigate = useNavigate();

  const reviews = [
    { id: 1, name: "John D.", text: "This quiz helped me understand my risk factors better. Highly recommended!", rating: 5, image: reviewImage1 },
    { id: 2, name: "Sarah M.", text: "I learned so much about prevention. Thank you for this valuable resource!", rating: 4, image: reviewImage2 },
    { id: 3, name: "Michael R.", text: "Easy to use and very informative. Everyone should take this quiz.", rating: 5, image: reviewImage3 },
  ];

  const handleQuizStart = () => {
    navigate(`/quiz2/`);
  };

  return (
    <div className="quiz-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>
          <spanh>Understand Your Risk</spanh>
        </h1>
        <h2>Take the Cancer Assessment Quiz Today</h2>
      </section>

      {/* Main Content */}
      <section className="main-content">
        <h2 className="section-title">Choose a Cancer Type to Get Started</h2>
        
        <div className="content-wrapper">
          <div className="cancer-cards">
            {/* Breast Cancer Card */}
            <div className="card">
              <div className="card-content">
                <div className="ribbon-container">
                  <img src={breast} alt="Breast Cancer Ribbon" className="ribbon-image" />
                </div>
                <div className="card-text">
                  <h3>Breast Cancer</h3>
                  <p>In 2018, breast cancer was the most frequently diagnosed cancer in Ontario women. But did you know that there are many things you can do to help decrease your risk?</p>
                </div>
              </div>
              <div className="button-container">
                <button className="quiz-btn" onClick={handleQuizStart}>Take the quiz now</button>
              </div>
            </div>

            {/* Lung Cancer Card */}
            <div className="card">
              <div className="card-content">
                <div className="ribbon-container">
                  <img src={lung} alt="Lung Cancer Ribbon" className="ribbon-image" />
                </div>
                <div className="card-text">
                  <h3>Lung Cancer</h3>
                  <p>Overall, lung cancer is the second most commonly diagnosed cancer in Ontario and the most common cause of cancer-related death. The good news? There's a lot you can do to help prevent it.</p>
                </div>
              </div>
              <div className="button-container">
                <button className="quiz-btn" onClick={() => handleQuizStart('lung')}>Take the quiz now</button>
              </div>
            </div>

            {/* Cervical Cancer Card */}
            <div className="card">
              <div className="card-content">
                <div className="ribbon-container">
                  <img src={cervical} alt="Cervical Cancer Ribbon" className="ribbon-image" />
                </div>
                <div className="card-text">
                  <h3>Cervical Cancer</h3>
                  <p>Cervical cancer is the third most commonly diagnosed cancer for Ontario women ages 20 to 44 — but it's also one of the most preventable.</p>
                </div>
              </div>
              <div className="button-container">
                <button className="quiz-btn" onClick={() => handleQuizStart('cervical')}>Take the quiz now</button>
              </div>
            </div>
          </div>

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