import { useState } from 'react';

// Modal Component with Tailwind CSS
const CustomerDetailsModal = ({ isOpen, onClose, customer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold mb-4">Customer Details</h2>
        <div>
          <p><strong>Name:</strong> {customer?.name}</p>
          <p><strong>Email:</strong> {customer?.email}</p>
          <p><strong>Phone:</strong> {customer?.phone}</p>
        </div>
        <button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
