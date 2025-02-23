import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/sidebar";
import "./StoryAdmin.css";
const StoryAdmin = () => {
  const [stories, setStories] = useState([]);
  const API_BASE_URL = "http://localhost:5000";

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/pending-stories`);
      setStories(response.data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/api/update-story/${id}`, { status });
      setStories((prev) => prev.filter((Survival) => Survival._id !== id)); // Remove updated row
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-main">
      <h2 className="admin-content-title">Pending Stories</h2>
      <table className="story-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
            <th>Email</th>
            <th>Verified</th>
            <th>Rejected</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((Survival, index) => (
            <tr key={Survival._id}>
              <td>{index + 1}</td>
              <td>{Survival.title}</td>
              <td dangerouslySetInnerHTML={{ __html: Survival.content }}></td>
              <td>{Survival.authorName}</td>
              <td>{Survival.email}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleStatusChange(Survival._id, "approved")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleStatusChange(Survival._id, "rejected")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default StoryAdmin;
