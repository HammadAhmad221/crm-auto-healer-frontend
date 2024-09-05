import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/customers/${id}`, {
          headers: {
            'Authorization': localStorage.getItem('token'),
          },
        });
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    fetchCustomer();
  }, [id]);

  if (!customer) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-lg font-medium mb-2"><strong>Name:</strong> {customer.name}</p>
          <p className="text-lg font-medium mb-2"><strong>Email:</strong> {customer.email}</p>
          <p className="text-lg font-medium mb-2"><strong>Phone:</strong> {customer.phone}</p>
        </div>
        <div>
          <p className="text-lg font-medium mb-2"><strong>Street:</strong> {customer.address?.street}</p>
          <p className="text-lg font-medium mb-2"><strong>City:</strong> {customer.address?.city}</p>
          <p className="text-lg font-medium mb-2"><strong>State:</strong> {customer.address?.state}</p>
          <p className="text-lg font-medium mb-2"><strong>Zip Code:</strong> {customer.address?.zipCode}</p>
          <p className="text-lg font-medium mb-2"><strong>Country:</strong> {customer.address?.country}</p>
        </div>
      </div>
      <fieldset className="mb-6">
        <legend className="text-xl font-semibold mb-2">History</legend>
        {customer.history && customer.history.length > 0 ? (
          <ul className="list-disc list-inside pl-4">
            {customer.history.map((entry, index) => (
              <li key={index} className="mb-4">
                <p><strong>Interaction Date:</strong> {new Date(entry.interactionDate).toLocaleDateString()}</p>
                <p><strong>Notes:</strong> {entry.notes}</p>
                <p><strong>Service Provided:</strong> {entry.serviceProvided}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No history available.</p>
        )}
      </fieldset>
      <fieldset className="mb-6">
        <legend className="text-xl font-semibold mb-2">Leads</legend>
        {customer.leads && customer.leads.length > 0 ? (
          <ul className="list-disc list-inside pl-4">
            {customer.leads.map((lead, index) => (
              <li key={index} className="mb-4">
                <p><strong>Lead Source:</strong> {lead.leadSource}</p>
                <p><strong>Status:</strong> {lead.status}</p>
                <p><strong>Follow-Up Date:</strong> {new Date(lead.followUpDate).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No leads available.</p>
        )}
      </fieldset>
      <div className="flex justify-end gap-4 mt-8">
        <Link to={`/customers/${id}/edit`} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600">
          Edit Customer
        </Link>
        <button onClick={async () => {
          if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
              await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/customers/${id}`, {
                headers: {
                  'Authorization': localStorage.getItem('token'),
                },
              });
              // Optionally redirect or update state
              navigate('/customers');
            } catch (error) {
              console.error('Error deleting customer:', error);
            }
          }
        }} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default CustomerDetails;
