// SearchableDropdown.js
import React, { useState } from 'react';

const SearchableDropdown = ({ label, options, value, onChange, required }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option) => {
    onChange(option._id); // Assuming each option has an _id property
    setSearchTerm(option.name); // Set the displayed value to the selected option
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <input
          type="text"
          value={searchTerm}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required={required}
        />
        {isOpen && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto w-full">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <li
                  key={option._id}
                  onClick={() => handleOptionClick(option)}
                  className="cursor-pointer py-2 px-3 hover:bg-blue-500 hover:text-white"
                >
                  {option.name}
                </li>
              ))
            ) : (
              <li className="py-2 px-3 text-gray-500">No options found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchableDropdown;
