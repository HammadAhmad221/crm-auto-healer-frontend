// import React, { useState } from 'react';

// const StatusDropdown = ({ currentStatus, onChangeStatus }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleStatusChange = (newStatus) => {
//     onChangeStatus(newStatus);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative">
//       <div
//         className={`cursor-pointer px-6 py-4 whitespace-nowrap select-none text-center border-b border-gray-200 ${currentStatus === 'Paid' ? 'text-green-600' : currentStatus === 'Unpaid' ? 'text-red-600' : 'text-yellow-600'}`}
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {currentStatus}<span className='pl-2'> ▽ </span>
//       </div>
//       {isOpen && (
//         <ul className="fixed z-10 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
//           <li
//             className="cursor-pointer py-2 px-3 hover:bg-blue-500 hover:text-white"
//             onClick={() => handleStatusChange('Paid')}
//           >
//             Paid
//           </li>
//           <li
//             className="cursor-pointer py-2 px-3 hover:bg-blue-500 hover:text-white"
//             onClick={() => handleStatusChange('Unpaid')}
//           >
//             Unpaid
//           </li>
//           <li
//             className="cursor-pointer py-2 px-3 hover:bg-blue-500 hover:text-white"
//             onClick={() => handleStatusChange('Pending')}
//           >
//             Pending
//           </li>
//         </ul>
//       )}
//     </div>
//   );
// };

// export default StatusDropdown;

import React, { useState } from 'react';

const StatusDropdown = ({ currentStatus, onChangeStatus, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusChange = (newStatus) => {
    onChangeStatus(newStatus); // This will update the parent's status
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative">
      <div
        className={`cursor-pointer px-6 py-4 whitespace-nowrap select-none text-center border-b border-gray-200 ${currentStatus === options[0] ? 'text-green-600' : currentStatus === options[1] ? 'text-red-600' : 'text-yellow-600'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentStatus}
        <span className='pl-2'> ▽ </span>
      </div>
      {isOpen && (
        <ul className="fixed z-10 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              className="cursor-pointer py-2 px-3 hover:bg-blue-500 hover:text-white"
              onClick={() => handleStatusChange(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusDropdown;
