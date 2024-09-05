import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    history: [
      {
        interactionDate: '',
        notes: '',
        serviceProvided: '',
      },
    ],
    leads: [
      {
        leadSource: '',
        status: 'new',
        followUpDate: '',
      },
    ],
  });

  const leadStatusOptions = ['new', 'contacted', 'qualified', 'converted', 'unqualified'];

  useEffect(() => {
    if (isEdit) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}api/customers/${id}`,{
                  headers:{
                    'Authorization':localStorage.getItem('token'),
                    }
                  })
        .then(response => {
          // Format dates to yyyy-MM-dd before setting state
          const customerData = response.data;
          customerData.history = customerData.history.map(entry => ({
            ...entry,
            interactionDate: formatToDate(entry.interactionDate),
          }));
          customerData.leads = customerData.leads.map(lead => ({
            ...lead,
            followUpDate: formatToDate(lead.followUpDate),
          }));
          setCustomer(customerData);
        })
        .catch(error => console.error('Error fetching customer:', error));
    }
  }, [isEdit, id]);

  // Convert Date object to yyyy-MM-dd format
  const formatToDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setCustomer(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setCustomer(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleHistoryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHistory = [...customer.history];
    updatedHistory[index][name] = value;
    setCustomer(prev => ({ ...prev, history: updatedHistory }));
  };

  const handleLeadsChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLeads = [...customer.leads];
    updatedLeads[index][name] = value;
    setCustomer(prev => ({ ...prev, leads: updatedLeads }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `${import.meta.env.VITE_BACKEND_URL}api/customers/${id}` : `${import.meta.env.VITE_BACKEND_URL}api/customers`;

    axios({
      method,
      url,
      headers: { 'Authorization': localStorage.getItem('token') },
      data: customer,
    })
      .then(() => navigate('/customers'))
      .catch(error => console.error('Error saving customer:', error));
  };

  return (
 <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{isEdit ? 'Edit Customer' : 'Add New Customer'}</h2>
     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Phone:
          <input
            type="text"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
      </div>
      <fieldset className="mb-6">
        <legend className="text-lg font-bold mb-2">Address</legend>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Street:
              <input
                type="text"
                name="address.street"
                value={customer.address.street}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City:
              <input
                type="text"
                name="address.city"
                value={customer.address.city}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              State:
              <input
                type="text"
                name="address.state"
                value={customer.address.state}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Zip Code:
              <input
                type="text"
                name="address.zipCode"
                value={customer.address.zipCode}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country:
              <input
                type="text"
                name="address.country"
                value={customer.address.country}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset className="mb-6">
        <legend className="text-lg font-bold mb-2">History</legend>
        {customer.history.map((entry, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Interaction Date:
              <input
                type="date"
                name="interactionDate"
                value={formatToDate(entry.interactionDate)}
                onChange={(e) => handleHistoryChange(index, e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Notes:
              <textarea
                name="notes"
                value={entry.notes}
                onChange={(e) => handleHistoryChange(index, e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Service Provided:
              <input
                type="text"
                name="serviceProvided"
                value={entry.serviceProvided}
                onChange={(e) => handleHistoryChange(index, e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>
        ))}
      </fieldset>
      <fieldset className="mb-6">
        <legend className="text-lg font-bold mb-2">Leads</legend>
        {customer.leads.map((lead, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Lead Source:
              <input
                type="text"
                name="leadSource"
                value={lead.leadSource}
                onChange={(e) => handleLeadsChange(index, e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status:
              <select
                name="status"
                value={lead.status}
                onChange={(e) => handleLeadsChange(index, e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {leadStatusOptions.map(option => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Follow-Up Date:
              <input
                type="date"
                name="followUpDate"
                value={formatToDate(lead.followUpDate)}
                onChange={(e) => handleLeadsChange(index, e)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </label>
          </div>
        ))}
      </fieldset>
      <div className="flex justify-end mt-8">
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-600"
        >
        {isEdit ? 'Update Customer' : 'Create Customer'}
      </button>
        </div>
    </form>
 </div>
  );
};

export default CustomerForm;
