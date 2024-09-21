import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StatusDropdown from '../components/StatusDropdown';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';

const LoadList = () => {
  const [loads, setLoads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoads = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/loads`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        // console.log(response.data);
        setLoads(response.data);
      } catch (error) {
        console.error('Error fetching loads:', error);
      }
    };

    fetchLoads();
  }, [loads]);

  const statusOptions=['Delivered','In Transit','In Progress'];

  const handleUpdateStatus = async (loadId, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/loads/${loadId}`, 
      { status: newStatus }, 
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      
      setLoads((prevLoads) =>
        prevLoads.map((load) =>
          load._id === loadId ? { ...load, status: newStatus } : load
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
<>
<HomeButton/>
<BackButton/>

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
                Load Id
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
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
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex items-center">
                  {load.loadId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {/* <Link to={`/loads/${load._id}`} className="hover:bg-green-200 hover:border-green-400 bg-green-50 px-4 py-1 rounded-lg border border-green-200"> */}
                    {load.vehicleId.make}
                  {/* </Link> */}
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
                  {/* {load.status} */}
                  <StatusDropdown
                    currentStatus={load.status}
                    onChangeStatus={(newStatus) => handleUpdateStatus(load._id, newStatus)}
                    options={statusOptions}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-gray-200 flex gap-1">
                <button 
                    onClick={()=>navigate(`/loads/${load._id}`)} 
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                  >
                    <FaInfoCircle/>
                  </button>
                  <button 
                    onClick={()=>navigate(`/loads/${load._id}/edit`)} 
                    className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
                  >
                    <FaEdit/>
                  </button>
                  <button
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this load?')) {
              try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/loads/${load._id}`, {
                  headers: {
                    Authorization: localStorage.getItem('token'),
                  },
                });
                // navigate('/invoices');
              } catch (error) {
                console.error('Error deleting load:', error);
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

export default LoadList;
