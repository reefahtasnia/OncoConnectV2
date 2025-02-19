import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CSS/forum.css";

export default function PostView() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState({
    username: '',
    reason: ''
  });
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
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/posts/${postId}`
        );
        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/posts/${postId}/comments`
        );
        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>; // Show loading state until post is fetched
  }

  // Safely accessing user_id and other properties after checking if post exists
  const userId = post.user_id || "Unknown"; // Fallback if user_id is missing

  const submitComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content: newComment }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComments([...comments, data.data]);
        setNewComment("");
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const submitReply = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/comments/${commentId}/reply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ content: newReply }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? { ...comment, replies: [...comment.replies, data.data] }
              : comment
          )
        );
        setNewReply("");
        setSelectedComment(null);
      } else {
        console.error("Failed to submit reply");
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };
  const handleReportSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/api/posts/${postId}/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        setShowReportModal(false); // Close the modal after successful report submission
        setReportData({ username: "", reason: "" }); // Reset the form data
        alert("Report submitted successfully");
      } else {
        alert("Error reporting the post");
      }
    } catch (error) {
      console.error("Error reporting post:", error);
      alert("Error reporting post: " + error.message);
    }
  };
  return (
    <div className="forum-container">
      {/* Left Sidebar*/}
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
            <button className="forum-nav-item active">
              <span className="forum-nav-icon">📑</span>
              Main Feed
            </button>
            <button
              className="forum-nav-item"
              onClick={() => (window.location.href = "/newquestion")}
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
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="forum-main-content">
        <article className="forum-post-detail">
          <h1 className="forum-post-title">{post.title}</h1>
          <p>{post.content}</p>
          <div className="forum-post-image-container">
            <img
              className="forum-post-image"
              src={post.attachment}
              alt="Post"
            />
          </div>
          {/* Report Button */}
          <button
            className="forum-report-button"
            onClick={() => setShowReportModal(true)}
          >
            <FlagIcon />
            Report Post
          </button>
          <button className="forum-vote-button">Vote</button>
        </article>

        {/* Submit Comment */}
        <div className="forum-comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment"
          />
          <button className="forum-vote-button" onClick={submitComment}>
            Post Comment
          </button>
        </div>

        {/* Comments */}
        <div className="forum-comments">
          {comments.map((comment) => (
            <div key={comment._id} className="forum-comment">
              <div className="comment-header">
                <span className="comment-author">
                  {comment.user_id?.username || "Unknown"}
                </span>
                <span className="comment-time">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              <p>{comment.content}</p>

              {/* Reply Button */}
              <button className="forum-reply-button" onClick={() => setSelectedComment(comment._id)}>
                Reply
              </button>

              {/* Reply Input */}
              {selectedComment === comment._id && (
                <div>
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Write a reply"
                  />
                  <button className="forum-reply-button" onClick={() => submitReply(comment._id)}>
                    Post Reply
                  </button>
                </div>
              )}

              {/* Replies */}
              <div className="forum-replies">
                {comment.replies?.map((reply) => (
                  <div key={reply._id} className="forum-reply">
                    <div className="reply-header">
                      <span className="reply-author">
                        {reply.user_id?.username || "Unknown"}
                      </span>
                      <span className="reply-time">
                        {new Date(reply.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p>{reply.content}</p>
                  </div>
                ))}
              </div>
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
          <h2 className="forum-profile-name">{post.user_id.username}</h2>
          <div className="forum-profile-actions">
            <button className="forum-profile-action-button">💬</button>
            <button className="forum-profile-action-button">📷</button>
            <button className="forum-profile-action-button">📱</button>
          </div>
        </div>
      </aside>
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
                  onChange={(e) => setReportData({ ...reportData, username: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Reason for Reporting:</label>
                <textarea
                  required
                  value={reportData.reason}
                  onChange={(e) => setReportData({ ...reportData, reason: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowReportModal(false)}>
                  Cancel
                </button>
                <button type="submit">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
