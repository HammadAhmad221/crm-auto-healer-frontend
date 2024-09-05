import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuoteForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState({
    customerId: '',
    vehicleId: '',
    price: 0,
    statu: 'Pending',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const fetchQuote = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/quotes/${id}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
          setQuote(response.data);
        } catch (error) {
          console.error('Error fetching quote:', error);
        }
      };

      fetchQuote();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setQuote({ ...quote, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/quotes/${id}`, quote, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/quotes`, quote, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
      }
      navigate('/quotes');
    } catch (error) {
      console.error('Error saving quote:', error);
      setError('Failed to save quote');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">{isEdit ? 'Edit quote' : 'Add New quote'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 border border-gray-200">
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Customer ID</label>
          <input
            type="text"
            name="customerId"
            value={quote.customerId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Vehicle ID</label>
          <input
            type="text"
            name="vehicleId"
            value={quote.vehicleId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={quote.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="statu"
            value={quote.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Assigned">Panding</option>
            <option value="In Progress">Approved</option>
            <option value="Delivered">Rejected</option>
          </select>
        </div>
        <div className="flex justify-end mt-8">

        <button
          type="submit"
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800"
          >
          {isEdit ? 'Update quote' : 'Create quote'}
        </button>
          </div>
      </form>
    </div>
  );
};

export default QuoteForm;
