import React, { useState } from 'react';
import Footer from "./Footer";
import Navbar from "./Nav";
import './CSS/Upload.css';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [simplifiedText, setSimplifiedText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:5002/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setSimplifiedText(data.simplifiedText);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="upload-container">
      
      <main className="upload-main">
        <h1>Upload Your Medical Report</h1>
        <p>Get a simplified explanation of your medical report</p>
        <div className="upload-area">
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept="image/*"
            id="file-input"
            className="file-input"
          />
          <label htmlFor="file-input" className="file-label">
            {file ? file.name : 'Choose an image'}
          </label>
          <button onClick={handleUpload} disabled={!file} className="upload-button">
            Upload and Simplify
          </button>
        </div>
        <div className="result-container">
          <div className="image-preview">
            {imagePreview && <img src={imagePreview || "/placeholder.svg"} alt="Uploaded medical report" />}
          </div>
          <div className="simplified-text">
            {simplifiedText ? (
              <>
                <h2>Simplified Explanation:</h2>
                <p>{simplifiedText}</p>
              </>
            ) : (
              <p className="placeholder-text">Your simplified explanation will appear here after uploading an image.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Upload;