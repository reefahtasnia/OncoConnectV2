import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import './CSS/Caregiverpage.css';
import caregiverbg from "./assets/caregiver-bg.png";
import caregivingVideo from "./assets/carevideo1.mp4";
import caregivingVideo2 from "./assets/carevideo2.mp4";
import videoPoster from "./assets/videothumbcare1.jpg";
import videoPoster2 from "./assets/videothumbcare2.jpeg";
import { Link } from 'react-router-dom';
import axios from "axios";

const CaregiverPage = () => {
  const [articles, setArticles] = useState([]);

  // Fetch caregiver articles from API
useEffect(() => {
  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/caregiver_articles");

      setArticles(response.data);
      
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };

  fetchArticles();
}, []);


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
          {articles.map((article, index) => (
            <div className="article-card" key={index}>
              <div className="article-image">
                <img src={article.image} alt={article.title} />
              </div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={`http://localhost:5000/api/download-pdf/${article.pdf.split('/').pop()}`} className="read-more" target="_blank" rel="noopener noreferrer">
  Read more <span className="arrow">→</span>
</a>
            </div>
          ))}
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

export default CaregiverPage;

