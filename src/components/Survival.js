import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CSS/survival.css';

// Fetch articles with pagination support (initial fetch with 150 characters)
const fetchArticles = async (page = 1) => {
  try {
    const response = await fetch(`http://localhost:5000/api/survival/stories?page=${page}`);
    console.log('API Response:', response);
    const data = await response.json();
    console.log('Parsed JSON:', data);
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { stories: [], totalPages: 1, currentPage: 1 };
  }
};

// Fetch full article by ID
const fetchFullArticle = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/survival/story/${id}`);
    if (response.ok) {
      const fullArticle = await response.json();
      return fullArticle;
    } else {
      console.error('Failed to fetch full article');
      return null;
    }
  } catch (error) {
    console.error('Error fetching full article:', error);
    return null;
  }
};

// Article Card component displaying the partial content
const ArticleCard = ({ title, content, imageUrl, authorName, id, onReadMore }) => (
  <div className="survival-article">
    <div className="article-image">
      <img src={imageUrl} alt={title} />
    </div>
    <h2>{title}</h2>
    <p className="author-name">By: {authorName}</p>
    <p className="article-content" dangerouslySetInnerHTML={{ __html: content }}></p>
    <button onClick={() => onReadMore(id)} className="read-more">
      Read More <span>›</span>
    </button>
  </div>
);

// Pagination component for navigating between pages
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;

  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);

  const pageNumbers = Array.from(
    { length: endPage - adjustedStartPage + 1 },
    (_, index) => adjustedStartPage + index
  );

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>‹ Prev</button>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={currentPage === page ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next ›</button>
      )}
    </div>
  );
};

const BlogGrid = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storyContent, setStoryContent] = useState('');
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArticles(currentPage);
      setArticles(data.stories);
      setTotalPages(data.totalPages);
    };

    fetchData();
  }, [currentPage]);

  // Fetch full article when "Read More" is clicked
  const handleReadMore = async (id) => {
    const fullArticle = await fetchFullArticle(id);
    if (fullArticle) {
      setSelectedArticle(fullArticle); // Set full article in state
    }
  };

  // Handle file changes for image upload
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle editor content change for the story
  const handleEditorChange = (value) => {
    setStoryContent(value);
  };

  // Handle form submission for uploading story
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', storyContent);
    formData.append('authorName', authorName);
    formData.append('email', email);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/survival/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsModalOpen(false);
        alert('Story submitted successfully!');
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
    <div className="blog-container">
      {/* Hero Content Section */}
      <div className="sur-hero-content">
        <h1>Empowering Cancer Survivors</h1>
        <p>Discover inspiring stories, resources, and guidance to help you thrive after cancer.</p>
        <button className="hero-button">Start Your Journey</button>
      </div>

      {/* Blog Grid Section */}
      <div className="mode-toggle">
        <Link to="/kid" className="slide-button">Switch to Kid Mode</Link>
      </div>
      <div className="blog-grid">
        {articles.map((article) => (
          <ArticleCard
            key={article._id}
            title={article.title}
            content={article.content.slice(0, 150)} // Only partial content (150 chars)
            imageUrl={article.imageUrl}
            authorName={article.authorName}
            id={article._id}  // Pass article ID
            onReadMore={handleReadMore}  // Pass handleReadMore function
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
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <div className="modal-buttons">
              <button className="cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="submit" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Full Article */}
      {selectedArticle && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>{selectedArticle.title}</h2>
            <p className="author-name">By: {selectedArticle.authorName}</p>
            <div
              className="full-article-content"
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            ></div>
            <button onClick={() => setSelectedArticle(null)} className="close-modal">
              Close
            </button>
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
