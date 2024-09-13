import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoadList = () => {
  const [loads, setLoads] = useState([]);

  useEffect(() => {
    const fetchLoads = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/loads`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        console.log(response.data);
        setLoads(response.data);
      } catch (error) {
        console.error('Error fetching loads:', error);
      }
    };

    fetchLoads();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Loads</h2>
      <Link 
        to="/loads/new" 
        className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
      >
        Add New Load
      </Link>
      <div className="scrollbar-custom overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pickup Location
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery Location
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loads.map((load) => (
              <tr key={load._id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <Link to={`/loads/${load._id}`} className="hover:bg-green-200 hover:border-green-400 bg-green-50 px-4 py-1 rounded-lg border border-green-200">
                    {load.vehicleId}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {load.driverId.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {load.pickupLocation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {load.deliveryLocation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {load.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <Link 
                    to={`/loads/${load._id}/edit`} 
                    className="hover:bg-yellow-200 hover:border-yellow-400 bg-yellow-50 px-4 py-1 rounded-lg border border-yellow-200"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoadList;
