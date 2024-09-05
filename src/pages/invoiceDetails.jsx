import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
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
        setError('Failed to fetch invoice details');
      }
    };

    fetchInvoice();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!invoice) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Invoice Details</h2>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Customer ID:</h3>
        <p>{invoice.customerId._id}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Load ID:</h3>
        <p>{invoice.loadId._id}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Amount:</h3>
        <p>${invoice.amount.toFixed(2)}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Status:</h3>
        <p className={`${invoice.status === 'Paid' ? 'text-green-600' : invoice.status === 'Unpaid' ? 'text-red-600' : 'text-yellow-600'}`}>
          {invoice.status}
        </p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Date:</h3>
        <p>{new Date(invoice.date).toLocaleDateString()}</p>
      </div>
      <div className="flex justify-end mt-8">
        <Link 
          to={`/invoices/${invoice._id}/edit`} 
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 mr-4"
        >
          Edit Invoice
        </Link>
        <button onClick={async () => {
          if (window.confirm('Are you sure you want to delete this invoice?')) {
            try {
              await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${id}`, {
                headers: {
                  Authorization: localStorage.getItem('token'),
                },
              });
              navigate('/invoices');
            } catch (error) {
              console.error('Error deleting invoice:', error);
            }
          }
        }} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetails;
