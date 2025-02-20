"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/forum.css";

export default function Forum() {
  const [activeTab, setActiveTab] = useState("new");
  const [activePage, setActivePage] = useState("questions");
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [reportData, setReportData] = useState({
    postId: '', 
    username: '',
    reason: ''
  });
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const mustReadPosts = [
    "Please read rules before you start working on a platform",
    "Vision & Strategy of Alemhelp",
  ];
  const featuredLinks = [
    "Alemhelp source-code on GitHub",
    "Golang best-practices",
    "Alem.School dashboard",
  ];
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/posts");
        const data = await response.json();
        setPosts(data.posts); // Access the posts array from the response
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);
  // Handle report submission
  const handleReportSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/api/posts/${selectedPost}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
        credentials: "include",
      });

      if (response.ok) {
        setShowReportModal(false); // Close the modal after successful report submission
        setReportData({ username: "", reason: "" }); // Reset the form data

        // Refresh the posts to reflect any changes or updates
        const updatedPosts = await fetch("http://localhost:5001/api/posts").then((res) =>
          res.json()
        );
        setPosts(updatedPosts); // Update the state with new posts
      } else {
        alert("Error reporting the post");
      }
    } catch (error) {
      console.error("Error reporting post:", error);
      alert("Error reporting post: " + error.message);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  // Add flag SVG component
  const FlagIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.66665 9.33335L3.33331 2.66669H13.3333L12 9.33335H2.66665Z"
        stroke="#6B7280"
        strokeWidth="1.5"
      />
      <path d="M2.66665 9.33331V14.6666" stroke="#6B7280" strokeWidth="1.5" />
    </svg>
  );
  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handlePostClick = (postId) => {
    navigate(`/viewpost/${postId}`);
  };

  // Filter posts based on selected category
  const filteredPosts = posts.filter((post) =>
    selectedCategory === "all" ? true : post.category === selectedCategory
  );
  return (
    <div className="forum-container">
      {/* Left Sidebar */}
      <aside className="forum-sidebar">
        <div className="forum-search-container">
          <input
            type="text"
            placeholder="Search"
            className="forum-search-input"
          />
          <svg
            className="forum-search-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5 17.5L13.875 13.875"
              stroke="#6B7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="forum-menu-section">
          <div className="forum-menu-label">MENU</div>
          <nav className="forum-nav-menu">
            <button
              className={`forum-nav-item ${
                activePage === "questions" ? "active" : ""
              }`}
              onClick={() => setActivePage("questions")}
            >
              <span className="forum-nav-icon">📑</span>
              Main Feed
            </button>
            <button
              className="forum-nav-item"
              onClick={() => navigate("/newquestion")}
            >
              <span className="forum-nav-icon">➕</span>
              New Question
            </button>
          </nav>
        </div>

        <div className="forum-menu-section">
          <div className="forum-menu-label">PERSONAL NAVIGATOR</div>
          <nav className="forum-nav-menu">
            <button
              className="forum-nav-item "
              onClick={() => navigate("/newquestion")}
            >
              <span className="forum-nav-icon">❓</span>
              Your questions
            </button>
            <button className="forum-nav-item">
              <span className="forum-nav-icon">💬</span>
              Your answers
            </button>
          </nav>
        </div>
      </aside>
      <main className="forum-main-content">
        <div className="forum-category-filter">
          <select
            className="forum-category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            <option value="side-effects">Side Effects Management</option>
            <option value="emotional">Emotional Support</option>
            <option value="treatment">Treatment Information</option>
            <option value="nutrition">Nutrition & Diet</option>
          </select>
        </div>
        <div className="forum-post-list">
          {filteredPosts.length === 0 ? (
            <div className="no-posts-message">
              No posts found in this category
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article key={post._id} className="forum-post-card" onClick={() => handlePostClick(post._id)}>
                <div className="forum-post-header">
                  <div className="forum-user-info">
                    <div className="forum-user-meta">
                      <span className="forum-username">{post.user_id.username}</span>
                      <span className="forum-post-time">
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="forum-report-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPost(post._id);
                      setShowReportModal(true);
                    }}
                  >
                    <FlagIcon />
                  </button>
                </div>
                <h2 className="forum-post-title">{post.title}</h2>
                <p className="forum-post-preview">{post.content}</p>
                {/*Image preview */}
                {post.attachment && (
                  <div className="forum-post-image-container">
                    <img
                      src={post.attachment}
                      alt={`Attachment for ${post.title}`}
                      className="forum-post-image"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="forum-post-metrics">
                  <span className="forum-metric">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.99998 2.66669C4.77998 2.66669 2.16665 5.28002 2.16665 8.50002C2.16665 11.72 4.77998 14.3334 7.99998 14.3334C11.22 14.3334 13.8333 11.72 13.8333 8.50002C13.8333 5.28002 11.22 2.66669 7.99998 2.66669Z"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 5.5V8.5"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.99634 11.5H8.00233"
                        stroke="#6B7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {post.views}
                  </span>
                  <span className="forum-metric">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.66669 12.3334H5.33335C3.33335 12.3334 2.33335 11.3334 2.33335 9.33335V5.33335C2.33335 3.33335 3.33335 2.33335 5.33335 2.33335H10.6667C12.6667 2.33335 13.6667 3.33335 13.6667 5.33335V9.33335C13.6667 11.3334 12.6667 12.3334 10.6667 12.3334H10.3334C10.13 12.3334 9.93335 12.4334 9.80002 12.6L8.80002 14C8.36002 14.6667 7.64002 14.6667 7.20002 14L6.20002 12.6C6.08669 12.4334 5.85335 12.3334 5.66669 12.3334Z"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.6644 7.33335H10.6704"
                        stroke="#6B7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.99709 7.33335H8.00308"
                        stroke="#6B7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.32972 7.33335H5.33571"
                        stroke="#6B7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {post.comments}
                  </span>
                  <span className="forum-metric">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.66669 7.33335L8.00002 3.33335L11.3334 7.33335"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 12.6667L8 3.33335"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {post.votes}
                  </span>
                </div>
              </article>
            ))
          )}
        </div>
        {/* Report Modal */}
        {showReportModal && (
          <div className="report-modal-overlay">
            <div className="report-modal-content">
              <h3>Why are you reporting this post?</h3>
              <form onSubmit={handleReportSubmit}>
                <div className="form-group">
                  <label>Your Username:</label>
                  <input
                    type="text"
                    required
                    value={reportData.username}
                    onChange={(e) =>
                      setReportData({ ...reportData, username: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Reason for Reporting:</label>
                  <textarea
                    required
                    value={reportData.reason}
                    onChange={(e) =>
                      setReportData({ ...reportData, reason: e.target.value })
                    }
                  />
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit">Submit Report</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Right Sidebar */}
      <aside className="forum-right-sidebar">
        <section className="forum-sidebar-section">
          <h3 className="forum-section-title">
            <span>⭐</span>
            Must-read posts
          </h3>
          <ul className="forum-link-list">
            {mustReadPosts.map((post, index) => (
              <li key={index} className="forum-link-item">
                <a href="#">{post}</a>
              </li>
            ))}
          </ul>
        </section>

        <section className="forum-sidebar-section">
          <h3 className="forum-section-title">
            <span>🕒</span>
            Frequently visited
          </h3>
          <ul className="forum-link-list">
            <li className="forum-link-item">
              <a href="#">How to prepare for your first chemotherapy session</a>
            </li>
            <li className="forum-link-item">
              <a href="#">Cancer nutrition guidelines and tips</a>
            </li>
            <li className="forum-link-item">
              <a href="#">Managing anxiety during treatment</a>
            </li>
            <li className="forum-link-item">
              <a href="#">Exercise recommendations during recovery</a>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  );
}