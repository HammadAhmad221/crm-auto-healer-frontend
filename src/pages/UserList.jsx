// src/pages/UserList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/users`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
<>
<HomeButton/>
<BackButton/>

<div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Users</h2>
      <Link 
        to="/users/new" 
        className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
      >
        Add New User
      </Link>
      <div className="scrollbar-custom overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {/* <Link to={`/users/${user._id}`} className="hover:bg-green-200 hover:border-green-400 bg-green-50 px-4 py-1 rounded-lg border border-green-200"> */}
                    {user.name}
                  {/* </Link> */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {user.role}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <Link 
                    to={`/users/${user._id}/edit`} 
                    className="hover:bg-yellow-200 hover:border-yellow-400 bg-yellow-50 px-4 py-1 rounded-lg border border-yellow-200"
                  >
                    Edit
                  </Link>
                </td> */}
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-1">
                <button 
                    onClick={()=>navigate(`/users/${user._id}`)} 
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                  >
                    <FaInfoCircle/>
                  </button>
                  <button 
                    onClick={()=>navigate(`/users/${user._id}/edit`)} 
                    className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
                  >
                    <FaEdit/>
                  </button>
                  <button
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this user?')) {
              try {
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/users/${user._id}`, {
                  headers: {
                    Authorization: localStorage.getItem('token'),
                  },
                });
                // navigate('/invoices');
              } catch (error) {
                console.error('Error deleting user:', error);
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

export default UserList;
