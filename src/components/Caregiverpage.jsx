import React from 'react';
import Footer from './Footer';
import './CSS/Caregiverpage.css';
import caregiverbg from "./assets/caregiver-bg.png";
import caregivingVideo from "./assets/carevideo1.mp4";
import caregivingVideo2 from "./assets/carevideo2.mp4";
// Import the poster image
import videoPoster from "./assets/videothumbcare1.jpg";
import videoPoster2 from "./assets/videothumbcare2.jpeg";

const CaregiverPage = () => {
  return (
    <div className="caregiver-container">
      {/* Hero Section */}
      <section className="hero-section">
        <img 
          src={caregiverbg}
          alt="Supporting cancer caregivers"
          className="hero-image"
        />
      </section>

      {/* Video Section */}
      <section className="video-section">
        <div className="video-card">
          <h2 className="video-title">Understanding Cancer Care</h2>
          <div className="video-container">
            <video controls poster={videoPoster}>
              <source src={caregivingVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="video-card">
          <h2 className="video-title">Caregiver Support Guide</h2>
          <div className="video-container">
            <video controls poster={videoPoster2}>
              <source src={caregivingVideo2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Caregiving 101 Section */}
      <div className='care101'>
        <h1 className="section-title">Caregiving 101</h1>
        </div>
      <section className="caregiving-section">
        
        <div className="article-grid-4">
          {/* Article Card 1 */}
          <div className="article-card">
            <div className="article-image">
              <img src="path-to-your-image-1" alt="Emotional Support" />
            </div>
            <h3>Emotional Support Strategies</h3>
            <p>Learn effective ways to provide emotional support to your loved one during their cancer journey.</p>
            <a href="#" className="read-more">
              Read more <span className="arrow">→</span>
            </a>
          </div>

          {/* Article Card 2 */}
          <div className="article-card">
            <div className="article-image">
              <img src="path-to-your-image-2" alt="Daily Care" />
            </div>
            <h3>Daily Care Routines</h3>
            <p>Essential tips for managing daily care responsibilities and maintaining a healthy routine.</p>
            <a href="#" className="read-more">
              Read more <span className="arrow">→</span>
            </a>
          </div>

          {/* Article Card 3 */}
          <div className="article-card">
            <div className="article-image">
              <img src="path-to-your-image-3" alt="Medication Management" />
            </div>
            <h3>Medication Management</h3>
            <p>Guidelines for helping manage medications and treatment schedules effectively.</p>
            <a href="#" className="read-more">
              Read more <span className="arrow">→</span>
            </a>
          </div>

          {/* Article Card 4 */}
          <div className="article-card">
            <div className="article-image">
              <img src="path-to-your-image-4" alt="Self Care" />
            </div>
            <h3>Caregiver Self-Care</h3>
            <p>Important self-care practices for maintaining your own well-being while caring for others.</p>
            <a href="#" className="read-more">
              Read more <span className="arrow">→</span>
            </a>
          </div>
           {/* Article Card 5 */}
           <div className="article-card">
            <div className="article-image">
              <img src="path-to-your-image-4" alt="Self Care" />
            </div>
            <h3>Caregiver Self-Care</h3>
            <p>Important self-care practices for maintaining your own well-being while caring for others.</p>
            <a href="#" className="read-more">
              Read more <span className="arrow">→</span>
            </a>
          </div>
           {/* Article Card 6 */}
           <div className="article-card">
            <div className="article-image">
              <img src="path-to-your-image-4" alt="Self Care" />
            </div>
            <h3>Caregiver Self-Care</h3>
            <p>Important self-care practices for maintaining your own well-being while caring for others.</p>
            <a href="#" className="read-more">
              Read more <span className="arrow">→</span>
            </a>
          </div>
           {/* Article Card 7 */}
           <div className="article-card">
            <div className="article-image">
              <img src="path-to-your-image-4" alt="Self Care" />
            </div>
            <h3>Caregiver Self-Care</h3>
            <p>Important self-care practices for maintaining your own well-being while caring for others.</p>
            <a href="#" className="read-more">
              Read more <span className="arrow">→</span>
            </a>
          </div>
           {/* Article Card 8 */}
           <div className="article-card">
            <div className="article-image">
              <img src="path-to-your-image-4" alt="Self Care" />
            </div>
            <h3>Caregiver Self-Care</h3>
            <p>Important self-care practices for maintaining your own well-being while caring for others.</p>
            <a href="#" className="read-more">
              Read more <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaregiverPage;

