import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import LogoutButton from '../components/Logout';
import ProfileDropdown from '../components/ProfileDropdown';

const AdminDashboard = () => {
  const [counts, setCounts] = useState();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // if (!localStorage.getItem('recordCounts')) { 
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/counts`);
          setCounts(response.data.result);
          localStorage.setItem('recordCounts', JSON.stringify(response.data.result));
        // } else {
          // setCounts(JSON.parse(localStorage.getItem('recordCounts')));
        // }
      } catch (error) {
        console.error('Failed to fetch record counts');
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-4">
      <h1 className="pl-4 text-3xl font-bold mb-6">Admin Dashboard</h1>
      {/* <LogoutButton/> */}
      <ProfileDropdown/>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Records</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {/* Customers */}
          <Link to="/customers" className="bg-blue-700 p-4 rounded-lg shadow-md hover:bg-blue-800">
            <div className='flex justify-between'>
              <h3 className="text-xl mb-2 font-bold text-white">Customers</h3>
              <h3 className='text-xl font-bold text-white'>{counts?.customer}</h3>
            </div>
            <ul>
              <li><Link to="/customers/new" className="text-white font-bold hover:underline">Add New</Link></li>
            </ul>
          </Link>
          
          {/* Drivers */}
          <Link to="/drivers" className="bg-green-700 p-4 rounded-lg shadow-md hover:bg-green-800">
            <div className='flex justify-between'>
              <h3 className="text-xl mb-2 font-bold text-white">Drivers</h3>
              <h3 className='text-xl font-bold text-white'>{counts?.driver}</h3>
            </div>
            <ul>
              <li><Link to="/drivers/new" className="text-white font-bold hover:underline">Add New</Link></li>
            </ul>
          </Link>

          {/* Users */}
          <Link to="/users" className="bg-yellow-700 p-4 rounded-lg shadow-md hover:bg-yellow-800">
            <div className='flex justify-between'>
              <h3 className="text-xl mb-2 font-bold text-white">Users</h3>
              <h3 className='text-xl font-bold text-white'>{counts?.user}</h3>
            </div>
            <ul>
              <li><Link to="/users/new" className="text-white font-bold hover:underline">Add New</Link></li>
            </ul>
          </Link>

          {/* Loads */}
          <Link to="/loads" className="bg-red-700 p-4 rounded-lg shadow-md hover:bg-red-800">
            <div className='flex justify-between'>
              <h3 className="text-xl mb-2 font-bold text-white">Loads</h3>
              <h3 className='text-xl font-bold text-white'>{counts?.load}</h3>
            </div>
            <ul>
              <li><Link to="/loads/new" className="text-white font-bold hover:underline">Add New</Link></li>
            </ul>
          </Link>

          {/* Quotes */}
          {/* <Link to="/quotes" className="bg-purple-700 p-4 rounded-lg shadow-md hover:bg-purple-800">
            <div className='flex justify-between'>
              <h3 className="text-xl mb-2 font-bold text-white">Quotes</h3>
              <h3 className='text-xl font-bold text-white'>{counts?.quote}</h3>
            </div>
            <ul>
              <li><Link to="/quotes/new" className="text-white font-bold hover:underline">Add New</Link></li>
            </ul>
          </Link> */}

          {/* Invoices */}
          <Link to="/invoices" className="bg-teal-700 p-4 rounded-lg shadow-md hover:bg-teal-800">
            <div className='flex justify-between'>
              <h3 className="text-xl mb-2 font-bold text-white">Invoices</h3>
              <h3 className='text-xl font-bold text-white'>{counts?.invoice}</h3>
            </div>
            <ul>
              <li><Link to="/invoices/new" className="text-white font-bold hover:underline">Add New</Link></li>
            </ul>
            {/* <ul>
              <li><Link to="/invoices/stats" className="text-white font-bold hover:underline">Statistics</Link></li>
            </ul> */}
          </Link>
          {/* Statistics */}
          <Link to="/invoices/stats" className="bg-orange-700 p-4 rounded-lg shadow-md hover:bg-orange-800">
              <h3 className="text-xl mb-2 font-bold text-white">Stats</h3>

          </Link>

          {/* Vehicles */}
          <Link to="/vehicles" className="bg-orange-700 p-4 rounded-lg shadow-md hover:bg-orange-800">
            <div className='flex justify-between'>
              <h3 className="text-xl mb-2 font-bold text-white">Vehicles</h3>
              <h3 className='text-xl font-bold text-white'>{counts?.vehicle}</h3>
            </div>
            <ul>
              <li><Link to="/vehicles/new" className="text-white font-bold hover:underline">Add New</Link></li>
            </ul>
          </Link>

          {/* Communication Logs */}
          <Link to="/communicationlogs" className="bg-pink-700 p-4 rounded-lg shadow-md hover:bg-pink-800">
            <div className='flex justify-between'>
              <h3 className="text-xl mb-2 font-bold text-white">Communication Logs</h3>
              <h3 className='text-xl font-bold text-white'>{counts?.communicationlog}</h3>
            </div>
            <ul>
              <li><Link to="/communicationlogs/new" className="text-white font-bold hover:underline">Add New</Link></li>
            </ul>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
