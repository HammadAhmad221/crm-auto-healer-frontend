import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';

const ProfileManagement = () => {
  const [update,setUpdate] = useState();
  const [driverData, setDriverData] = useState({
    name: '',
    licenseNumber: '',
    certifications: [],
    contactDetails: {
      phoneNumber: '',
      email: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem('driverId');
    if (id) {
      fetchDriverData(id);
    }
  }, []);

  const fetchDriverData = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/drivers/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setDriverData(response.data);
      setUpdate(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching driver data:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contactDetails.')) {
      const fieldName = name.split('.')[1];
      setDriverData({
        ...driverData,
        contactDetails: {
          ...driverData.contactDetails,
          [fieldName]: value
        }
      });
    } else {
      setDriverData({
        ...driverData,
        [name]: value
      });
    }
  };

  const handleSave = async () => {
    if(update!==driverData){ 
      const id = localStorage.getItem('driverId');
      try {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/drivers/${id}`, driverData ,{
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setEditing(false);
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    }
    setEditing(false);
    };

  return (
<>
<HomeButton/>
<BackButton/>

<div className="min-h-screen bg-gray-100 px-4 pt-6">
      <h1 className="text-3xl font-bold mb-6">Profile Management</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={driverData.name}
                onChange={handleChange}
                disabled={!editing}
                className="p-2 block w-full rounded-md border-blue-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={driverData.licenseNumber}
                onChange={handleChange}
                disabled={!editing}
                className="block p-2 w-full rounded-md border-blue-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="contactDetails.phoneNumber"
                value={driverData.contactDetails.phoneNumber}
                onChange={handleChange}
                disabled={!editing}
                className="p-2 block w-full rounded-md border-blue-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="contactDetails.email"
                value={driverData.contactDetails.email}
                onChange={handleChange}
                disabled={!editing}
                className="p-2 block w-full rounded-md border-blue-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {editing ? (
            <button
              onClick={handleSave}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      )}
    </div>
</>
  );
};

export default ProfileManagement;
