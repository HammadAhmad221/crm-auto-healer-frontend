import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';

const CommunicationLogForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [log, setLog] = useState({
    customerId: '',
    communicationType: 'Email',
    message: '',
  });
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/customers`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();

    if (isEdit) {
      const fetchLog = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/communicationLogs/${id}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
          setLog(response.data);
        } catch (error) {
          console.error('Error fetching log:', error);
        }
      };

      fetchLog();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/communicationLogs/${id}`, log, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/communicationLogs`, log, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
      }
      navigate('/communicationLogs');
    } catch (error) {
      console.error('Error saving log:', error);
      setError('Failed to save log');
    }
  };

  return (
<>
<HomeButton/>
<BackButton/>

<div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">{isEdit ? 'Edit Communication Log' : 'Add New Communication Log'}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 border border-gray-200">
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Customer</label>
          <select
            name="customerId"
            value={log.customerId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Customer</option>
            {customers.map(customer => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Communication Type</label>
          <select
            name="communicationType"
            value={log.communicationType}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
            <option value="SMS">SMS</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            value={log.message}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800"
          >
          {isEdit ? 'Update Log' : 'Add Log'}
        </button>
          </div>
      </form>
    </div>
</>
  );
};

export default CommunicationLogForm;
