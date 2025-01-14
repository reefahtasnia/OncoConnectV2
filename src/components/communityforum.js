import React, { useState } from 'react';
import './CSS/forum.css';

export default function Forum() {
  const [activeTab, setActiveTab] = useState('new');
  const [activePage, setActivePage] = useState('questions');

  const posts = [
    {
      id: 1,
      author: 'Golanginya',
      avatar: '/placeholder.svg?height=40&width=40',
      time: '5 min ago',
      title: 'Top 5 Tips for Managing Chemotherapy Side Effects',
      preview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla',
      views: 125,
      comments: 15,
      upvotes: 155
    },
    {
      id: 2,
      author: 'Linuxoid',
      avatar: '/placeholder.svg?height=40&width=40',
      time: '25 min ago',
      title: 'Understanding the Emotional Impact of a Cancer Diagnosis',
      preview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum vitae etiam lectus amet enim.',
      views: 125,
      comments: 15,
      upvotes: 155
    },
    {
      id: 3,
      author: 'AizhanMaratovna',
      avatar: '/placeholder.svg?height=40&width=40',
      time: '2 days ago',
      title: 'Benefits of Joining a Cancer Support Group',
      preview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla',
      views: 125,
      comments: 15,
      upvotes: 155
    }
  ];

  const mustReadPosts = [
    'Please read rules before you start working on a platform',
    'Vision & Strategy of Alemhelp'
  ];

  const featuredLinks = [
    'Alemhelp source-code on GitHub',
    'Golang best-practices',
    'Alem.School dashboard'
  ];

  return (
    <div className="forum-container">
      {/* Left Sidebar */}
      <aside className="forum-sidebar">
        <div className="forum-search-container">
          <input type="text" placeholder="Search" className="forum-search-input" />
          <svg className="forum-search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.5 17.5L13.875 13.875" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="forum-menu-section">
          <div className="forum-menu-label">MENU</div>
          <nav className="forum-nav-menu">
            <button 
              className={`forum-nav-item ${activePage === 'questions' ? 'active' : ''}`}
              onClick={() => setActivePage('questions')}
            >
              <span className="forum-nav-icon">📑</span>
              Questions
            </button>
            <button 
              className={`forum-nav-item ${activePage === 'tags' ? 'active' : ''}`}
              onClick={() => setActivePage('tags')}
            >
              <span className="forum-nav-icon">🏷️</span>
              Tags
            </button>
            <button 
              className={`forum-nav-item ${activePage === 'ranking' ? 'active' : ''}`}
              onClick={() => setActivePage('ranking')}
            >
              <span className="forum-nav-icon">📊</span>
              Ranking
            </button>
            <button 
              className="forum-nav-item"
              onClick={() => window.location.href = '/newquestion'}
            >
              <span className="forum-nav-icon">➕</span>
              New Question
            </button>
          </nav>
        </div>

        <div className="forum-menu-section">
          <div className="forum-menu-label">PERSONAL NAVIGATOR</div>
          <nav className="forum-nav-menu">
            <button className="forum-nav-item">
              <span className="forum-nav-icon">❓</span>
              Your questions
            </button>
            <button className="forum-nav-item">
              <span className="forum-nav-icon">💬</span>
              Your answers
            </button>
            <button className="forum-nav-item">
              <span className="forum-nav-icon">❤️</span>
              Your likes & votes
            </button>
          </nav>
        </div>
      </aside>
        <main className="forum-main-content">
          <div className="forum-filter-tabs">
            <button 
          className={`forum-tab ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => setActiveTab('new')}
            >
          <span className="forum-tab-icon">🔵</span>
          New
            </button>
            <button 
          className={`forum-tab ${activeTab === 'top' ? 'active' : ''}`}
          onClick={() => setActiveTab('top')}
            >
          <span className="forum-tab-icon">↗️</span>
          Top
            </button>
            <button 
          className={`forum-tab ${activeTab === 'hot' ? 'active' : ''}`}
          onClick={() => setActiveTab('hot')}
            >
          <span className="forum-tab-icon">🔥</span>
          Hot
            </button>
            <button 
          className={`forum-tab ${activeTab === 'closed' ? 'active' : ''}`}
          onClick={() => setActiveTab('closed')}
            >
          <span className="forum-tab-icon">✅</span>
          Closed
            </button>
          </div>

          <div className="forum-post-list">
            {posts.map(post => (
          <article 
            key={post.id} 
            className="forum-post-card"
            onClick={() => window.location.href = `/viewpost`}
          >
            <div className="forum-post-header">
              <div className="forum-user-info">
            <img src={post.avatar} alt={post.author} className="forum-avatar" />
            <div className="forum-user-meta">
              <span className="forum-username">{post.author}</span>
              <span className="forum-post-time">{post.time}</span>
            </div>
              </div>
              <button className="forum-more-options">⋮</button>
            </div>
            <h2 className="forum-post-title">{post.title}</h2>
            <p className="forum-post-preview">{post.preview}</p>
            <div className="forum-post-metrics">
              <span className="forum-metric">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.99998 2.66669C4.77998 2.66669 2.16665 5.28002 2.16665 8.50002C2.16665 11.72 4.77998 14.3334 7.99998 14.3334C11.22 14.3334 13.8333 11.72 13.8333 8.50002C13.8333 5.28002 11.22 2.66669 7.99998 2.66669Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 5.5V8.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.99634 11.5H8.00233" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {post.views}
              </span>
              <span className="forum-metric">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.66669 12.3334H5.33335C3.33335 12.3334 2.33335 11.3334 2.33335 9.33335V5.33335C2.33335 3.33335 3.33335 2.33335 5.33335 2.33335H10.6667C12.6667 2.33335 13.6667 3.33335 13.6667 5.33335V9.33335C13.6667 11.3334 12.6667 12.3334 10.6667 12.3334H10.3334C10.13 12.3334 9.93335 12.4334 9.80002 12.6L8.80002 14C8.36002 14.6667 7.64002 14.6667 7.20002 14L6.20002 12.6C6.08669 12.4334 5.85335 12.3334 5.66669 12.3334Z" stroke="#6B7280" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.6644 7.33335H10.6704" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.99709 7.33335H8.00308" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.32972 7.33335H5.33571" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {post.comments}
              </span>
              <span className="forum-metric">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.66669 7.33335L8.00002 3.33335L11.3334 7.33335" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12.6667L8 3.33335" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {post.upvotes}
              </span>
            </div>
          </article>
            ))}
          </div>
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
            <span>🔗</span>
            Featured links
          </h3>
          <ul className="forum-link-list">
            {featuredLinks.map((link, index) => (
              <li key={index} className="forum-link-item">
                <a href="#">{link}</a>
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

