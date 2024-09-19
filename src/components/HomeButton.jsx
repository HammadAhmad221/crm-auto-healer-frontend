import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';

const HomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/admin');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <IoHome className="inline-block mr-2" />
      Go Home
    </button>
  );
};

export default HomeButton;
