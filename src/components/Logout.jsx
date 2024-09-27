import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    // localStorage.removeItem('token'); // Replace 'token' with the key name of your token in localStorage
    localStorage.clear();

    // Redirect to the home page
    navigate('/');
  };

  return (
    <button 
      onClick={handleLogout}
      className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-700 text-semibold"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
