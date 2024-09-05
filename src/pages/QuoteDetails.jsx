import React, { useEffect, useState } from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoad = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/quotes/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setQuote(response.data);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setError('Failed to fetch quote details');
      }
    };

    fetchLoad();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!quote) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Quote Details</h2>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Customer ID:</h3>
        <p>{quote.customerId}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Vehicle ID:</h3>
        <p>{quote.vehicleId}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Price:</h3>
        <p>{quote.price}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Status:</h3>
        <p>{quote.status}</p>
      </div>
      <div className="flex justify-end mt-8">
        <Link 
          to={`/quotes/${quote._id}/edit`} 
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 mr-4"
        >
          Edit Quote
        </Link>
        <button onClick={async () => {
          if (window.confirm('Are you sure you want to delete this quote?')) {
            try {
              await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/quotes/${id}`, {
                headers: {
                  'Authorization': localStorage.getItem('token'),
                },
              });
              navigate('/quotes')

            } catch (error) {
              console.error('Error deleting quote:', error);
            }
          }
        }} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuoteDetails;
