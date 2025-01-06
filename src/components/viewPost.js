import React, { useState } from 'react';
import './CSS/forum.css';

export default function PostView() {
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [newSuggestion, setNewSuggestion] = useState('');

  const post = {
    author: '@Golanginya',
    avatar: '/placeholder.svg?height=40&width=40',
    time: '12 November 2020 19:35',
    title: 'Top 5 Tips for Managing Chemotherapy Side Effects',
    content: [
      'Mi magna sed nec nisl mattis. Magna cursus tincidunt rhoncus imperdiet fermentum pretium, pharetra nisl. Euismod.',
      'Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.'
    ]
  };

  const comments = [
    {
      id: 1,
      author: '@unkind',
      avatar: '/placeholder.svg?height=40&width=40',
      time: '12 November 2020 19:35',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna. Placerat ut adipisicing nulla lectus vulputate massa, scelerisque. Netus nisl nulla placerat dignissim ipsum arcu.',
      likes: 12,
      dislikes: 3,
      replies: [
        {
          id: 2,
          author: '@lazyReplyer',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer nibh urna.'
        },
        {
          id: 3,
          author: '@unkind',
          content: 'Thanks!'
        }
      ]
    }
  ];

  return (
    <div className="forum-container">
      {/* Left Sidebar - Same as forum.js */}
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
            <button className="forum-nav-item active">
              <span className="forum-nav-icon">📑</span>
              Questions
            </button>
            <button className="forum-nav-item">
              <span className="forum-nav-icon">🏷️</span>
              Tags
            </button>
            <button className="forum-nav-item">
              <span className="forum-nav-icon">📊</span>
              Ranking
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

      {/* Main Content */}
      <main className="forum-main-content">
        <article className="forum-post-detail">
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

          <h1 className="forum-post-title">{post.title}</h1>
          {post.content.map((paragraph, index) => (
            <p key={index} className="forum-post-content">{paragraph}</p>
          ))}

          <button className="forum-vote-button">
            Vote
          </button>
        </article>

        <div className="forum-suggestions">
          <h2 className="forum-suggestions-title">Suggestions</h2>
          <div className="forum-suggestions-form">
            <input
              type="text"
              className="forum-suggestions-input"
              placeholder="Type here your wise suggestion"
              value={newSuggestion}
              onChange={(e) => setNewSuggestion(e.target.value)}
            />
            <button className="forum-button-primary">Suggest</button>
          </div>
        </div>

        <div className="forum-comments">
          {comments.map(comment => (
            <div key={comment.id} className="forum-comment">
              <div className="forum-comment-header">
                <div className="forum-user-info">
                  <img src={comment.avatar} alt={comment.author} className="forum-avatar" />
                  <div className="forum-user-meta">
                    <span className="forum-username">{comment.author}</span>
                    <span className="forum-post-time">{comment.time}</span>
                  </div>
                </div>
                <button className="forum-more-options">⋮</button>
              </div>

              <p className="forum-comment-content">{comment.content}</p>

              <div className="forum-comment-actions">
                <div className="forum-comment-votes">
                  <button className="forum-vote-button-small">
                    {comment.likes} 👍
                  </button>
                  <button className="forum-vote-button-small">
                    {comment.dislikes} 👎
                  </button>
                </div>
                <button className="forum-reply-button">Reply</button>
              </div>

              {comment.replies && (
                <div className="forum-replies">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="forum-reply">
                      <div className="forum-reply-content">
                        <span className="forum-reply-author">{reply.author},</span>
                        <span className="forum-reply-text">{reply.content}</span>
                      </div>
                      <div className="forum-reply-meta">
                        by {reply.author}
                        <button className="forum-reply-button">Reply</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="forum-right-sidebar">
        <div className="forum-profile-card">
          <img
            src="/placeholder.svg?height=120&width=120"
            alt="Profile"
            className="forum-profile-avatar"
          />
          <h2 className="forum-profile-name">@Golanginya</h2>
          <div className="forum-profile-badge">
            125 [8]
          </div>
          <div className="forum-profile-actions">
            <button className="forum-profile-action-button">💬</button>
            <button className="forum-profile-action-button">📷</button>
            <button className="forum-profile-action-button">📱</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

