import React, { useState } from "react";
import { FaCloudUploadAlt, FaDownload } from "react-icons/fa";
import "./App.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [downloadReady, setDownloadReady] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    setMessage("Processing...");
    setDownloadReady(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://testcase-reduction-2-production.up.railway.app/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.download_url) {
        setMessage("File processed successfully! Click below to download.");
        setDownloadReady(true);
      } else {
        setMessage("Error processing file.");
      }
    } catch (error) {
      console.error("Upload failed", error);
      setMessage("Upload failed. Try again.");
    }
  };

  return (
    <div className="container">
      <h1>Test Case Selection Using ML</h1>
      <form onSubmit={handleSubmit}>
        <div className="upload-container">
          <label className="file-label">
            <FaCloudUploadAlt size={50} color="#007bff" />
            <input type="file" onChange={handleFileChange} className="file-input" />
            <span>Select a CSV file</span>
          </label>
          <button type="submit" className="upload-btn">Upload</button>
          <p className="message">{message}</p>
        </div>
      </form>
      
      {downloadReady && (
        <a
          href="https://testcase-reduction-2-production.up.railway.app/download"
          className="download-btn"
        >
          <FaDownload size={20} /> Download Selected Test Cases
        </a>
      )}
    </div>
  );
};

export default App;
