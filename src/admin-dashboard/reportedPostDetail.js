import React, { useState } from 'react';
import Sidebar from './components/sidebar.js';
import './ReportedPostDetail.css';

function ReportedPostDetail() {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  // Sample post data - would come from backend
  const postData = {
    id: 1,
    author: {
      username: "@Golanginya",
      avatar: "/placeholder.svg?height=150&width=150",
      joinDate: "November 2023"
    },
    timestamp: "12 November 2020 19:35",
    title: "Top 5 Tips for Managing Chemotherapy Side Effects",
    content: `Mi magna sed nec nisl mattis. Magna cursus tincidunt rhoncus imperdiet fermentum pretium, pharetra nisl. Euismod.

Posuere arcu arcu consectetur turpis rhoncus tellus. Massa, consectetur massa sit fames nulla eu vehicula ullamcorper. Ante sit mauris elementum sollicitudin arcu sit suspendisse pretium. Nisl egestas fringilla justo bibendum.`,
    tags: ['java', 'javascript', 'wtf'],
    reportedBy: {
      username: "Username",
      avatar: "/placeholder.svg?height=40&width=40",
      reason: "Reported reason"
    }
  };

  const handleDeletePost = () => {
    // Add delete logic here
    console.log('Deleting post:', postData.id);
  };

  const handleWarningSubmit = (e) => {
    e.preventDefault();
    // Add warning submission logic here
    console.log('Sending warning:', {
      postId: postData.id,
      userId: postData.author.username,
      message: warningMessage
    });
    setWarningMessage('');
    setShowWarningModal(false);
  };

  return (
    <div className="admin-report-detail-container">
      <Sidebar />
      
      <main className="admin-report-detail-main">
        <h1 className="admin-report-detail-title">Reported Posts</h1>

        <div className="admin-report-detail-content">
          <div className="admin-report-detail-left">
            <div className="admin-report-post-card">
              <div className="admin-report-post-header">
                <img 
                  src={postData.author.avatar || "/placeholder.svg"} 
                  alt={postData.author.username}
                  className="admin-report-author-avatar"
                />
                <div className="admin-report-post-meta">
                  <span className="admin-report-author-name">{postData.author.username}</span>
                  <span className="admin-report-timestamp">{postData.timestamp}</span>
                </div>
              </div>

              <h2 className="admin-report-post-title">{postData.title}</h2>
              <div className="admin-report-post-content">
                {postData.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="admin-report-tags">
                {postData.tags.map(tag => (
                  <span key={tag} className="admin-report-tag">{tag}</span>
                ))}
              </div>

              <div className="admin-report-info">
                <h3>Reported by</h3>
                <div className="admin-report-user">
                  <img 
                    src={postData.reportedBy.avatar || "/placeholder.svg"} 
                    alt={postData.reportedBy.username}
                    className="admin-report-user-avatar"
                  />
                  <span className="admin-report-username">{postData.reportedBy.username}</span>
                </div>
                <p className="admin-report-reason">{postData.reportedBy.reason}</p>
              </div>

              <div className="admin-report-actions">
                <button 
                  className="admin-report-delete-button"
                  onClick={handleDeletePost}
                >
                  Delete Post
                </button>
                <button 
                  className="admin-report-warning-button"
                  onClick={() => setShowWarningModal(true)}
                >
                  Give Warning to User
                </button>
              </div>
            </div>
          </div>

          <div className="admin-report-detail-right">
            <div className="admin-report-profile-card">
              <img 
                src={postData.author.avatar || "/placeholder.svg"} 
                alt={postData.author.username}
                className="admin-report-profile-avatar"
              />
              <h3 className="admin-report-profile-name">{postData.author.username}</h3>
              <p className="admin-report-profile-joined">Joined {postData.author.joinDate}</p>
            </div>
          </div>
        </div>
      </main>

      {showWarningModal && (
        <div className="admin-report-modal-overlay">
          <div className="admin-report-modal">
            <div className="admin-report-modal-header">
              <h2>Message for owner of post</h2>
              <button 
                className="admin-report-modal-close"
                onClick={() => setShowWarningModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleWarningSubmit}>
              <textarea
                className="admin-report-modal-textarea"
                value={warningMessage}
                onChange={(e) => setWarningMessage(e.target.value)}
                placeholder="Enter your warning message..."
                rows="6"
              />
              <button 
                type="submit"
                className="admin-report-warning-button"
              >
                Give Warning to User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportedPostDetail;