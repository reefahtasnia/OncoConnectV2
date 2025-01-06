import React from 'react';
import './CSS/newsSection.css';
import newsImage1 from './assets/news1.png';
import newsImage2 from './assets/news2.png';
import newsImage3 from './assets/news3.png';

export default function NewsSection() {
  const articles = [
    {
      category: "Caregiving",
      date: "April 15, 2024",
      title: "Best Cancer Patient Care Techniques for Family Members and Caregivers",
      image: newsImage1,
      link: "/articles/caregiving"
    },
    {
      category: "Technology",
      date: "June 20, 2023",
      title: "How AI is Revolutionizing Cancer Diagnosis and Treatment",
      image: newsImage2,
      link: "/articles/ai-cancer"
    },
    {
      category: "Health",
      date: "May 10, 2022",
      title: "Top Nutrition Tips for Cancer Patients to Stay Healthy During Treatment",
      image: newsImage3,
      link: "/articles/nutrition"
    }
  ];

  return (
    <section className="news-section">
      <div className="news-container">
        <h2 className="news-heading">Cancer Care Articles & Insights</h2>
        
        <div className="news-grid">
          {articles.map((article, index) => (
            <article key={index} className="news-article">
              <div className="article-image-container">
                <img
                  src={article.image}
                  alt={article.title}
                  className="article-image"
                />
              </div>
              <div className="article-content">
                <div className="article-meta">
                  <span className="article-category">{article.category}</span>
                  <span className="article-date">{article.date}</span>
                </div>
                <h3 className="article-title">{article.title}</h3>
                <a href={article.link} className="article-link">
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="news-footer">
          <a href="/articles" className="article-button">
            Explore more articles
          </a>
        </div>
      </div>
    </section>
  );
}
