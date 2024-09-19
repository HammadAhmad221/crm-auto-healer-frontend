import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../components/HomeButton';

const CommunicationLogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [log, setLog] = useState(null);

  useEffect(() => {
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
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/communicationLogs/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      navigate('/communicationLogs');
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  };

  if (!log) return <p>Loading...</p>;

  return (
    <>
    <HomeButton/>
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Communication Log Details</h2>
      <div className="mb-4">
        <strong>Customer:</strong> {log.customerId.name}
      </div>
      <div className="mb-4">
        <strong>Communication Type:</strong> {log.communicationType}
      </div>
      <div className="mb-4">
        <strong>Message:</strong> {log.message}
      </div>
      <div className="mb-4">
        <strong>Date:</strong> {new Date(log.date).toLocaleDateString()}
      </div>
      <div className="flex space-x-4 justify-end">
        <Link 
          to={`/communicationLogs/${log._id}/edit`} 
          className="bg-yellow-700 text-white font-bold py-2 px-4 rounded hover:bg-yellow-800"
          >
          Edit
        </Link>
        <button 
          onClick={handleDelete} 
          className="bg-red-700 text-white font-bold py-2 px-4 rounded hover:bg-red-800"
          >
          Delete
        </button>
      </div>
    </div>
          </>
  );
};

export default CommunicationLogDetails;
