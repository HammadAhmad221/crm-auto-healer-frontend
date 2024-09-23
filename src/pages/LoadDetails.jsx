import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';

const LoadDetails = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [load, setLoad] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoad = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/loads/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setLoad(response.data);
      } catch (error) {
        console.error('Error fetching load:', error);
        setError('Failed to fetch load details');
      }
    };

    fetchLoad();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!load) {
    return <p>Loading...</p>;
  }

  return (
<>
<HomeButton/>
<BackButton/>

<div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Load Details</h2>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Vehicle:</h3>
        <p className='detailsTruncate'>{load.vehicleId.make}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Driver:</h3>
        <p className='detailsTruncate'>{load.driverId.name}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Pickup Location:</h3>
        <p className='detailsTruncate'>{load.pickupLocation}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Delivery Location:</h3>
        <p className='detailsTruncate'>{load.deliveryLocation}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Load Details:</h3>
        <p className='detailsTruncate'>{load.loadDetails}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Status:</h3>
        <p className='detailsTruncate'>{load.status}</p>
      </div>
      <div className="flex justify-end mt-8">
        <Link 
          to={`/loads/${load._id}/edit`} 
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 mr-4"
        >
          Edit Load
        </Link>
        <button onClick={async () => {
          if (window.confirm('Are you sure you want to delete this load?')) {
            try {
              await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/loads/${id}`, {
                headers: {
                  'Authorization': localStorage.getItem('token'),
                },
              });
              // Optionally redirect or update state
              // navigate('/loads')
              window.alert('Load deleted successfully');
            } catch (error) {
              console.error('Error deleting load:', error);
            }
          }
        }} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
</>
  );
};

export default LoadDetails;
