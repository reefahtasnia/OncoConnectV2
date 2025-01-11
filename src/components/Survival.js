import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill'; // Import react-quill
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
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
  { id: 1, title: "Quieting the Noise: Finding Peace Amid Cancer's Challenges", imageUrl: pic1, link: "#" },
  { id: 2, title: "Harnessing the Power of Hope and Insight in Cancer Recovery", imageUrl: pic2, link: "#" },
  { id: 3, title: "How My Caregivers Supported Me Through Cancer Treatment", imageUrl: pic3, link: "#" },
  { id: 4, title: "My Journey to Acceptance and Healing After a Cancer Diagnosis", imageUrl: pic4, link: "#" },
  { id: 5, title: "Quieting the Noise: Finding Peace Amid Cancer's Challenges", imageUrl: pic5, link: "#" },
  { id: 6, title: "Celebrating Life After Beating Cancer: A Family's Journey", imageUrl: pic6, link: "#" },
  { id: 7, title: "Rediscovering Myself After Cancer: A Story of Resilience", imageUrl: pic7, link: "#" },
  { id: 8, title: "A Cultural Perspective on Thriving Beyond Cancer", imageUrl: pic8, link: "#" }
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
  const [isDarkMode, setIsDarkMode] = useState(false); // State to track the mode
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [storyContent, setStoryContent] = useState(''); // State to store the story content

  const handleEditorChange = (value) => {
    setStoryContent(value); // Update the story content with the editor's value
  };

  const handleSubmit = () => {
    // Handle story submission logic here
    console.log(storyContent);
    // Close the modal after submission
    setIsModalOpen(false);
  };

  return (
    <div className={`blog-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="mode-toggle">
        <Link to="/kid" className="slide-button">Switch to Kid Mode</Link> {/* Slide button */}
      </div>
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
      
      <div className="upload-button-container">
        <button className="unique-upload-button" onClick={() => setIsModalOpen(true)}>
          Upload Your Own Story
        </button>
      </div>

      {/* Modal for Writing Story */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Write Your Own Story</h2>
            <ReactQuill 
              value={storyContent} 
              onChange={handleEditorChange} 
              modules={BlogGrid.modules} // Optional: Add specific modules for customization
            />
            <div className="modal-buttons">
              <button className="cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="submit" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

BlogGrid.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'color': [] }, { 'background': [] }],
    ['link'],
  ],
};

export default BlogGrid;
