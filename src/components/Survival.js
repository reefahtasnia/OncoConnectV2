import React from 'react';
import "./CSS/survival.css";
import pic1 from './assets/pic1.jpg';
import pic2 from './assets/pic2.jpg';
import pic3 from './assets/pic3.jpg';
import pic4 from './assets/pic4.jpg';
import pic5 from './assets/pic5.jpg';
import pic6 from './assets/pic6.jpg';
import pic7 from './assets/pic7.jpg';
import pic8 from './assets/pic8.jpg';

const articles = [
  {
    id: 1,
    title: "Quieting the Noise: Finding Peace Amid Cancer's Challenges",
    imageUrl: pic1,
    link: "#"
  },
  {
    id: 2,
    title: "Harnessing the Power of Hope and Insight in Cancer Recovery",
    imageUrl: pic2,
    link: "#"
  },
  {
    id: 3,
    title: "How My Caregivers Supported Me Through Cancer Treatment",
    imageUrl: pic3,
    link: "#"
  },
  {
    id: 4,
    title: "My Journey to Acceptance and Healing After a Cancer Diagnosis",
    imageUrl: pic4,
    link: "#"
  },
  {
    id: 5,
    title: "Quieting the Noise: Finding Peace Amid Cancer's Challenges",
    imageUrl: pic5,
    link: "#"
  },
  {
    id: 6,
    title: "Celebrating Life After Beating Cancer: A Family's Journey",
    imageUrl: pic6,
    link: "#"
  },
  {
    id: 7,
    title: "Rediscovering Myself After Cancer: A Story of Resilience",
    imageUrl: pic7,
    link: "#"
  },
  {
    id: 8,
    title: "A Cultural Perspective on Thriving Beyond Cancer",
    imageUrl: pic8,
    link: "#"
  }
];

const ArticleCard = ({ title, imageUrl, link }) => (
  <div className="article-card">
    <div className="article-image">
      <img src={imageUrl} alt={title} />
    </div>
    <h2>{title}</h2>
    <a href={link} className="read-more">
      Read More <span>›</span>
    </a>
  </div>
);

const Pagination = () => (
  <div className="pagination">
    <button className="active">1</button>
    <button>2</button>
    <button>3</button>
    <span className="ellipsis">...</span>
    <button>62</button>
    <button className="next">Next »</button>
  </div>
);

const BlogGrid = () => {
  return (
    <div className="blog-container">
      <div className="blog-grid">
        {articles.map((article) => (
          <ArticleCard 
            key={article.id}
            title={article.title}
            imageUrl={article.imageUrl}
            link={article.link}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default BlogGrid;

