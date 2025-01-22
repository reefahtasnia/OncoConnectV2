import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CSS/survival.css';

// Fetch articles with pagination support
const fetchArticles = async (page = 1) => {
  try {
    const response = await fetch(`http://localhost:5000/api/survival/stories?page=${page}`);
    console.log('API Response:', response); // Check if the response is valid
    const data = await response.json();
    console.log('Parsed JSON:', data); // Check if JSON parsing works
    return data; // Expecting { stories: [], totalPages: number, currentPage: number }
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { stories: [], totalPages: 1, currentPage: 1 };
  }
};

const ArticleCard = ({ title, content, imageUrl, authorName, link }) => (
  <div className="survival-article">
    <div className="article-image">
      <img src={imageUrl} alt={title} />
    </div>
    <h2>{title}</h2>
    <p className="author-name">By: {authorName}</p>
    <p className="article-content">{content.slice(0, 150)}...</p> {/* Display first 150 characters */}
    <a href={link} className="read-more">
      Read More <span>›</span>
    </a>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxVisiblePages = 5; // Number of page buttons to show at once
  
    // Calculate start and end page numbers for the visible range
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
    // Adjust the start page if we're near the end
    const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);
  
    const pageNumbers = Array.from(
      { length: endPage - adjustedStartPage + 1 },
      (_, index) => adjustedStartPage + index
    );
  
    return (
      <div className="pagination">
        {/* Jump to First Page */}
        {currentPage > 1 && (
          <>
            
            <button onClick={() => onPageChange(currentPage - 1)}>‹ Prev</button>
          </>
        )}
  
        {/* Page Numbers */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={currentPage === page ? 'active' : ''}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
  
        {/* Jump to Last Page */}
        {currentPage < totalPages && (
          <>
            <button onClick={() => onPageChange(currentPage + 1)}>Next ›</button>
            
          </>
        )}
      </div>
    );
  };
  
const BlogGrid = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storyContent, setStoryContent] = useState('');
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch articles when the component mounts or page changes
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArticles(currentPage);
      setArticles(data.stories);
      setTotalPages(data.totalPages);
    };

    fetchData();
  }, [currentPage]);

  const handleEditorChange = (value) => {
    setStoryContent(value);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', storyContent);
    formData.append('authorName', authorName);
    formData.append('email', email);
    formData.append('image', image);

    try {
      const response = await fetch('/api/survival/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setIsModalOpen(false);
        alert('Story submitted successfully!');
        // Optionally, fetch the latest stories again to update the grid
        const updatedArticles = await fetchArticles(currentPage);
        setArticles(updatedArticles.stories);
      } else {
        alert('Error submitting story');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting story');
    }
  };

  return (
    <div className={`blog-container ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Hero Content Section */}
      <div className="sur-hero-content">
        <h1>Empowering Cancer Survivors</h1>
        <p>Discover inspiring stories, resources, and guidance to help you thrive after cancer.</p>
        <button className="hero-button">Start Your Journey</button>
      </div>

      {/* Blog Section */}
      <div className="mode-toggle">
        <Link to="/kid" className="slide-button">Switch to Kid Mode</Link>
      </div>
      <div className="blog-grid">
        {articles.map((article) => (
          <ArticleCard
            key={article._id} // Use unique identifier like MongoDB ID
            title={article.title}
            content={article.content}
            imageUrl={article.imageUrl} // Backend provides URL for images
            authorName={article.authorName} // Author's name from backend
            link={`/article/${article._id}`} // Assuming you have a dynamic route for article details
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

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
            <input
              type="text"
              placeholder="Story Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ReactQuill
              value={storyContent}
              onChange={handleEditorChange}
              modules={BlogGrid.modules}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
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
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ color: [] }, { background: [] }],
    ['link'],
  ],
};

export default BlogGrid;
