import React, { useState } from 'react';
import "./CSS/ai.css";
import robot from "./assets/robot.png";

const UploadReportPage = () => {
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState('mammogram');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Social Media Sidebar */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 p-4 flex flex-col gap-6">
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <i data-lucide="facebook"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <i data-lucide="twitter"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <i data-lucide="instagram"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <i data-lucide="youtube"></i>
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <i data-lucide="message-circle"></i>
        </a>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium text-purple-500 mb-8">Upload Report</h1>

        {/* Tabs */}
        <div className="tabs w-full max-w-md mx-auto mb-8">
          <div className="tabs-list grid w-full grid-cols-3">
            <button
              className={`tab-trigger ${activeTab === 'mammogram' ? 'active' : ''}`}
              onClick={() => handleTabClick('mammogram')}
            >
              Mammogram
            </button>
            <button
              className={`tab-trigger ${activeTab === 'mri' ? 'active' : ''}`}
              onClick={() => handleTabClick('mri')}
            >
              MRI
            </button>
            <button
              className={`tab-trigger ${activeTab === 'ultrasound' ? 'active' : ''}`}
              onClick={() => handleTabClick('ultrasound')}
            >
              Ultrasound
            </button>
          </div>
        </div>

        {/* Upload Section */}
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-4">
              <i data-lucide="upload" className="w-full h-full text-gray-300"></i>
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">Upload Data File</h2>
            <p className="text-sm text-gray-500 mb-4">or browse your file to upload</p>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Upload your cancer report to be analyzed by our AI. Our AI analyzer will help you better understand your condition and provide support during this challenging time.
            </p>
          </div>

          {/* File Preview */}
          {file && (
            <div id="file-preview" className="flex items-center justify-between border rounded p-3 mb-4 bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs">.xlsm</span>
                </div>
                <div className="text-left">
                  <p id="file-name" className="text-sm font-medium">{file.name}</p>
                  <p id="file-size" className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">Uploading... 75%</span>
            </div>
          )}

          {/* File Input */}
          <div className="relative">
            <input
              type="file"
              id="file-input"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-2 rounded">
              Upload File
            </button>
          </div>
        </div>
      </div>

      {/* Robot Illustration */}
      <div className="fixed right-0 bottom-0 w-96">
        <img
          src={robot}
          width="200"
          height="600"
          alt="Robot illustration"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default UploadReportPage;
