import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists in localStorage

  if (!token) {
    // If no token, redirect to the login page
    return <Navigate to="/" />;
  }

  // If token exists, render the protected content
  return children;
};

export default ProtectedRoute;
