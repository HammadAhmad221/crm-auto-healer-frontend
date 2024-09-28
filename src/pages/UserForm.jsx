import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';
import { toast } from 'react-toastify';

const UserForm = ({ isEdit }) => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Admin',
  });
  // const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/users/${id}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };

      fetchUser();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/users/${id}`, user, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        toast.success('User updated successfully!');
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/users`, user, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        toast.success('User added successfully!');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('User with this "Email" already exists');
      // setError('Failed to save user');
    }
  };

  return (
<>
<HomeButton/>
<BackButton/>

<div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">{isEdit ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 border border-gray-200">
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        {!isEdit && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        )}
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Admin">Admin</option>
            <option value="Driver">Driver</option>
            <option value="Customer">Customer</option>
          </select>
        </div> */}
        <div className="flex justify-end mt-8">

        <button
          type="submit"
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800"
          >
          {isEdit ? 'Update User' : 'Add User'}
        </button>
          </div>
      </form>
    </div>
</>
  );
};

export default UserForm;
