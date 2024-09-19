import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoadForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [load, setLoad] = useState({
    vehicleId: '',
    driverId: '',
    pickupLocation: '',
    deliveryLocation: '',
    loadDetails: '',
    status: 'Assigned',
  });
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch vehicles and drivers for the dropdowns
    const fetchVehiclesAndDrivers = async () => {
      try {
        const [vehiclesResponse, driversResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}api/vehicles`, {
            headers: { Authorization: localStorage.getItem('token') },
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}api/drivers`, {
            headers: { Authorization: localStorage.getItem('token') },
          }),
        ]);
        setVehicles(vehiclesResponse.data);
        setDrivers(driversResponse.data);
      } catch (error) {
        console.error('Error fetching vehicles or drivers:', error);
      }
    };

    fetchVehiclesAndDrivers();

    if (isEdit) {
      const fetchLoad = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/loads/${id}`, {
            headers: { Authorization: localStorage.getItem('token') },
          });
          setLoad(response.data);
        } catch (error) {
          console.error('Error fetching load:', error);
        }
      };
      fetchLoad();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setLoad({ ...load, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/loads/${id}`, load, {
          headers: { Authorization: localStorage.getItem('token') },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/loads`, load, {
          headers: { Authorization: localStorage.getItem('token') },
        });
      }
      navigate('/loads');
    } catch (error) {
      console.error('Error saving load:', error);
      setError('Failed to save load');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">{isEdit ? 'Edit Load' : 'Add New Load'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 border border-gray-200">
        {error && <p className="text-red-500">{error}</p>}
        {/* Vehicle Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Vehicle</label>
          <select
            name="vehicleId"
            value={load.vehicleId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a Vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle._id}>
                {vehicle.make}
              </option>
            ))}
          </select>
        </div>

        {/* Driver Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Driver</label>
          <select
            name="driverId"
            value={load.driverId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a Driver</option>
            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>

        {/* Other form fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
          <input
            type="text"
            name="pickupLocation"
            value={load.pickupLocation}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Delivery Location</label>
          <input
            type="text"
            name="deliveryLocation"
            value={load.deliveryLocation}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Load Details</label>
          <textarea
            name="loadDetails"
            value={load.loadDetails}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={load.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800"
          >
            {isEdit ? 'Update Load' : 'Create Load'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoadForm;
