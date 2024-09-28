import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';
import { toast } from 'react-toastify';


const CustomerForm = ({ isEdit }) => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (isEdit) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}api/customers/${id}`,{
                  headers:{
                    'Authorization':localStorage.getItem('token'),
                    }
                  })
        .then(response => {
          setCustomer(response.data);
        })
        .catch(error => console.error('Error fetching customer:', error));
    }
  }, [isEdit, id]);


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
      .then(() => {
        if (isEdit) {
          toast.success('Customer updated successfully!');
        } else {
          toast.success('Customer added successfully!');
        }
      })
      .catch(error => {console.error('Error saving customer:', error)
        toast.error('Customer with this "Email" already exists');

      } );
  };

  return (
<>
<HomeButton/>
<BackButton/>

<div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">{isEdit ? 'Edit Customer' : 'Add New Customer'}</h2>
     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={customer?.name}
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
            value={customer?.email}
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
            value={customer?.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
      </div>
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
</>
  );
};

export default CustomerForm;
