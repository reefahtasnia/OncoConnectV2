import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar.js';
import './ReportedPosts.css';

function ReportedPosts() {
  // Sample posts data array
  const reportedPosts = [
    {
      id: 1,
      author: "Golanginya",
      avatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "9 min ago",
      title: "Top 5 Tips for Managing Chemotherapy Side Effects",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla",
      views: 125,
      likes: 15,
      shares: 155
    },
    {
      id: 2,
      author: "Linuxoid",
      avatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "25 min ago",
      title: "Understanding the Emotional Impact of a Cancer Diagnosis",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum vitae etiam lectus amet enim.",
      views: 125,
      likes: 15,
      shares: 155
    }
  ];

  const handleCheckReport = (postId) => {
    console.log('Checking report for post:', postId);
    // Add report checking logic here
  };

  return (
    <div className="admin-reported-container">
      <Sidebar />
      <main className="admin-reported-main">
        <h1 className="admin-reported-title">Reported Posts</h1>
        
        <div className="admin-reported-posts">
          {reportedPosts.map(post => (
            <div key={post.id} className="admin-reported-post-card">
              <div className="admin-reported-post-header">
                <div className="admin-reported-post-author">
                  <img 
                    src={post.avatar || "/placeholder.svg"} 
                    alt={post.author} 
                    className="admin-reported-author-avatar"
                  />
                  <div className="admin-reported-author-info">
                    <span className="admin-reported-author-name">{post.author}</span>
                    <span className="admin-reported-post-time">{post.timeAgo}</span>
                  </div>
                </div>
              </div>
              
              <div className="admin-reported-post-content">
                <h2 className="admin-reported-post-title">{post.title}</h2>
                <p className="admin-reported-post-text">{post.content}</p>
              </div>
              
              <div className="admin-reported-post-footer">
                <div className="admin-reported-post-stats">
                  <span className="admin-reported-stat">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {post.views}
                  </span>
                  <span className="admin-reported-stat">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {post.likes}
                  </span>
                  <span className="admin-reported-stat">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none">
                      <path d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                    {post.shares}
                  </span>
                </div>
                <button 
                  className="admin-reported-check-button"
                  onClick={() => handleCheckReport(post.id)}
                >
                  Check Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ReportedPosts;