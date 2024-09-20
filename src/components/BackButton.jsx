import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { IoArrowBack } from 'react-icons/io';
import { IoArrowBack } from 'react-icons/io5';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBackClick}
      className="fixed top-4 right-4 bg-gray-600 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
    >
      <IoArrowBack className="inline-block mr-2" />
    </button>
  );
};

export default BackButton;
