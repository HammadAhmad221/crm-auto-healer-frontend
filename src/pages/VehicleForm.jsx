import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';

const VehicleForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    specialInstructions: '',
    status: 'pending',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
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
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/vehicles/${id}`, vehicle, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/vehicles`, vehicle, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
      }
      navigate('/vehicles');
    } catch (error) {
      console.error('Error saving vehicle:', error);
      setError('Failed to save vehicle because VIN value should be unique');
    }
  };

  return (
<>
<HomeButton/>
<BackButton/>

<div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">{isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 border border-gray-200">
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Make</label>
          <input
            type="text"
            name="make"
            value={vehicle.make}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            value={vehicle.model}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={vehicle.year}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">VIN</label>
          <input
            type="text"
            name="vin"
            value={vehicle.vin}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
          <input
            type="text"
            name="specialInstructions"
            value={vehicle.specialInstructions}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={vehicle.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {/* ['pending', 'picked-up', 'in-transit', 'delivered'] */}
            <option value="pending">Pending</option>
            <option value="picked-up">Picked-up</option>
            <option value="in-transit">in-transit</option>
            <option value="delivered">Delivered</option>

          </select>
        </div>
        <div className="flex justify-end mt-8"> 

        <button
          type="submit"
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800"
          >
          {isEdit ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
          </div>
      </form>
    </div>
</>
  );
};

export default VehicleForm;
