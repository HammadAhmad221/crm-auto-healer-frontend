import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/vehicles`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  return (
<>
<HomeButton/>
<BackButton/>
<div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Vehicles</h2>
      <Link 
        to="/vehicles/new" 
        className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
      >
        Add New Vehicle
      </Link>
      <div className="scrollbar-custom overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Make
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                VIN
              </th>
              {/* <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th> */}
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle._id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {/* {vehicle.make} */}
                  {/* <Link 
                    to={`/vehicles/${vehicle._id}`} 
                    className="hover:bg-green-200 hover:border-green-400 bg-green-50 px-4 py-1 rounded-lg border border-green-200"
                  > */}
                    {vehicle.make}
                  {/* </Link> */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {vehicle.model}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {vehicle.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {vehicle.vin}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {vehicle.status}
                </td> */}
                {/* <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <Link 
                    to={`/vehicles/${vehicle._id}/edit`} 
                    className="hover:bg-yellow-200 hover:border-yellow-400 bg-yellow-50 px-4 py-1 rounded-lg border border-yellow-200"
                  >
                    Edit
                  </Link>
                </td> */}
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-1">
                <button 
                    onClick={()=>navigate(`/vehicles/${vehicle._id}`)} 
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                  >
                    <FaInfoCircle/>
                  </button>
                  <button 
                    onClick={()=>navigate(`/vehicles/${vehicle._id}/edit`)} 
                    className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
                  >
                    <FaEdit/>
                  </button>
                  <button
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this vehicle?')) {
              try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/vehicles/${vehicle._id}`, {
                  headers: {
                    Authorization: localStorage.getItem('token'),
                  },
                });
                // navigate('/invoices');
              } catch (error) {
                console.error('Error deleting vehicle:', error);
              }
            }
          }}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
        >
          <FaTrash/>
        </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
</>
  );
};

export default VehicleList;
