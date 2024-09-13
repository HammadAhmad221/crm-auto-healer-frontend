import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

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
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Customers</h2>
      <Link 
        to="/customers/new" 
        className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
      >
        Add New Customer
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
                Phone Number
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <Link to={`/customers/${customer._id}`} className="hover:bg-green-200 hover:border-green-400 bg-green-50 px-4 py-1 rounded-lg border border-green-200">
                    {customer.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {customer.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <Link 
                    to={`/customers/${customer._id}/edit`} 
                    className="hover:bg-yellow-200 hover:border-yellow-400 bg-yellow-50 px-4 py-1 rounded-lg border border-yellow-200"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
