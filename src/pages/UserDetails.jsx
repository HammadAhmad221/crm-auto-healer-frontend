// src/pages/UserDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/users/${id}`, {
          headers: {
            "Authorization": localStorage.getItem('token'),
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">User Details</h2>
      <div className="bg-white p-4 border border-gray-200">
      <div className="mb-6">
        <strong className="block text-lg font-medium">Name:</strong>
        <p>{user.name}</p>
      </div>
      <div className="mb-6">
        <strong className="block text-lg font-medium">Email:</strong>
        <p>{user.email}</p>
      </div>
      <div className="mb-6">
        <strong className="block text-lg font-medium">Role:</strong>
        <p>{user.role}</p>
      </div>
      <div className="mb-6">
        <strong className="block text-lg font-medium">Joined:</strong>
        <p>{new Date(user.date).toLocaleDateString()}</p>
      </div>
        {/* <p><strong>Joined:</strong> {new Date(user.date).toLocaleDateString()}</p> */}
        <div className="flex justify-end mt-8">
        <Link 
          to={`/users/${user._id}/edit`} 
          className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 mr-4"
        >
          Edit User
        </Link>
        <button onClick={async () => {
          if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
              await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/users/${id}`, {
                headers: {
                  'Authorization': localStorage.getItem('token'),
                },
              });
              // Optionally redirect or update state
              navigate('/users')

            } catch (error) {
              console.error('Error deleting customer:', error);
            }
          }
        }} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
      </div>
    </div>
  );
};

export default UserDetails;
