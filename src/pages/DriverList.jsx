import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/drivers`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Drivers</h2>
      <Link 
        to="/drivers/new" 
        className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
      >
        Add New Driver
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                License Number
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver._id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <Link to={`/drivers/${driver._id}`} className="text-blue-600 hover:underline">
                    {driver.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {driver.licenseNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {driver.contactDetails.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <Link 
                    to={`/drivers/${driver._id}/edit`} 
                    className="text-blue-600 hover:underline"
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

export default DriverList;