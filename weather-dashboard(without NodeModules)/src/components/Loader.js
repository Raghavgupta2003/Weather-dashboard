import React from "react";
import "./Loader.css"; // Make sure this CSS file is created

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Fetching Weather Data...</p>
    </div>
  );
};

export default Loader;
