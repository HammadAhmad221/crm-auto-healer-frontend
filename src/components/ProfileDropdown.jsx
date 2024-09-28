// ProfileDropdown.jsx
import React, { useState } from 'react';
import LogoutButton from './Logout';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const username =localStorage.getItem('userEmail');

//   const trimmedUsername = username.substring(0, 6).toUpperCase();

  // Get the first letter of the username for the avatar
  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="absolute top-4 right-4">
      {/* Profile Icon */}
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
          {initial}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-46 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="px-4 py-2">
            <span className=" text-gray-900 font-semibold">{username}</span>
          </div>
          <div className="border-t"></div>
          <div className="py-2 flex items-center justify-center">
            <LogoutButton/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
