import React, { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ name, value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value) {
      const selected = options.find(option => option.value === value);
      setSelectedOption(selected ? selected.label : '');
    }
  }, [value, options]);

  const handleSelect = (optionValue, optionLabel) => {
    onChange({ target: { name, value: optionValue } });
    setSelectedOption(optionLabel);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || placeholder}
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              className="cursor-pointer py-2 px-3 hover:bg-blue-500 hover:text-white"
              onClick={() => handleSelect(option.value, option.label)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
