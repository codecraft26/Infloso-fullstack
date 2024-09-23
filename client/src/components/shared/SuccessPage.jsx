import React from 'react';
import { useLocation } from 'react-router-dom';
import './SuccessPage.css'; // Create a CSS file for styling

const SuccessPage = () => {
  const location = useLocation();
  const { message } = location.state || { message: "No message provided." }; // Retrieve message from state

  return (
    <div className="success-page">
      <h1>Success</h1>
      <p>{message}</p>
      <a href="/login" className="btn-primary">Go to Login</a>
    </div>
  );
};

export default SuccessPage;
