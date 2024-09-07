import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/vehicles/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setVehicle(response.data);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/vehicles/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      navigate('/vehicles');
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  if (!vehicle) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Vehicle Details</h2>
      <div className="bg-white p-4 border border-gray-200">
      <div className="mb-6">
        <strong className="block text-lg font-medium">Make:</strong>
        <p>{vehicle.make}</p>
      </div>
        {/* <p><strong>Make:</strong> {vehicle.make}</p> */}
        <div className="mb-6">
        <strong className="block text-lg font-medium">Model:</strong>
        <p>{vehicle.model}</p>
      </div> 
        {/* <p><strong>Model:</strong> {vehicle.model}</p> */}
        <div className="mb-6">
        <strong className="block text-lg font-medium">Year:</strong>
        <p>{vehicle.year}</p>
      </div>
        {/* <p><strong>Year:</strong> {vehicle.year}</p> */}
        <div className="mb-6">
        <strong className="block text-lg font-medium">VIN:</strong>
        <p>{vehicle.vin}</p>
      </div>
        {/* <p><strong>VIN:</strong> {vehicle.vin}</p> */}
        <div className="mb-6">
        <strong className="block text-lg font-medium">Special Instructions:</strong>
        <p>{vehicle.specialInstructions}</p>
      </div>
        {/* <p><strong>Special Instructions:</strong> {vehicle.specialInstructions}</p> */}
        <div className="mb-6">
        <strong className="block text-lg font-medium">Status:</strong>
        <p>{vehicle.status}</p>
      </div>
        {/* <p><strong>Status:</strong> {vehicle.status}</p> */}
      </div>
      <div className="flex justify-end mt-6">
      <Link 
          to={`/vehicles/${vehicle._id}/edit`} 
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 mr-4"
        >
          Edit Vehicle
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-700 text-white font-bold py-2 px-4 rounded hover:bg-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default VehicleDetails;