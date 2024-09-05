import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InvoiceForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({
    customerId: '',
    loadId: '',
    amount: '',
    status: 'Unpaid',
  });

  useEffect(() => {
    if (isEdit && id) {
      const fetchInvoice = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${id}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
          setInvoice(response.data);
        } catch (error) {
          console.error('Error fetching invoice:', error);
        }
      };

      fetchInvoice();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${id}`, invoice, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/invoices`, invoice, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
      }
      navigate('/invoices');
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">
        {isEdit ? 'Edit Invoice' : 'Add New Invoice'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Customer ID</label>
          <input
            type="text"
            name="customerId"
            value={invoice.customerId?._id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Load ID</label>
          <input
            type="text"
            name="loadId"
            value={invoice.loadId?._id}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={invoice.amount}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={invoice.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            {isEdit ? 'Update Invoice' : 'Save Invoice'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
