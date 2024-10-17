import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

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

  if (!customer) return <Loading/>;

  return (
<>
<HomeButton/>
<BackButton backto='/customers'/>

<div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-lg font-medium mb-2 detailsTruncate"><strong>Name:</strong> {customer.name}</p><br/>
          <p className="text-lg font-medium mb-2 detailsTruncate"><strong>Email:</strong> {customer.email}</p><br/>
          <p className="text-lg font-medium mb-2 detailsTruncate"><strong>Phone:</strong> {customer.phone}</p><br/>
        </div>
        {/* <div>
          <p className="text-lg font-medium mb-2 detailsTruncate"><strong>Street:</strong> {customer.address?.street}</p><br/>
          <p className="text-lg font-medium mb-2 detailsTruncate"><strong>City:</strong> {customer.address?.city}</p><br/>
          <p className="text-lg font-medium mb-2 detailsTruncate"><strong>State:</strong> {customer.address?.state}</p><br/>
          <p className="text-lg font-medium mb-2 detailsTruncate"><strong>Zip Code:</strong> {customer.address?.zipCode}</p><br/>
          <p className="text-lg font-medium mb-2 detailsTruncate"><strong>Country:</strong> {customer.address?.country}</p><br/>
        </div> */}
      </div>
      {/* <fieldset className="mb-6">
        <legend className="text-xl font-semibold mb-2">History</legend>
        {customer.history && customer.history.length > 0 ? (
          <ul className="list-disc list-inside pl-4">
            {customer.history.map((entry, index) => (
              <li key={index} className="mb-4">
                <p className='detailsTruncate'><strong>Interaction Date:</strong> {new Date(entry.interactionDate).toLocaleDateString()}</p><br/>
                <p className='detailsTruncate'><strong>Notes:</strong> {entry.notes}</p><br/>
                <p className='detailsTruncate'><strong>Service Provided:</strong> {entry.serviceProvided}</p><br/>
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
                <p className='detailsTruncate'><strong>Lead Source:</strong> {lead.leadSource}</p><br/>
                <p className='detailsTruncate'><strong>Status:</strong> {lead.status}</p><br/>
                <p className='detailsTruncate'><strong>Follow-Up Date:</strong> {new Date(lead.followUpDate).toLocaleDateString()}</p><br/>
              </li>
            ))}
          </ul>
        ) : (
          <p>No leads available.</p>
        )}
      </fieldset> */}
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
              navigate('/customers');
              // toast.success('Customer deleted successfully');
            } catch (error) {
              console.error('Error deleting customer:', error);
            }
          }
        }} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
</>
  );
};

export default CustomerDetails;
