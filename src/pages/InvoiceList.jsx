import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/invoices`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        const modifiedInvoices = response.data.map(invoice => ({
          ...invoice,
          customerId: invoice.customerId._id,
          loadId: invoice.loadId._id,
        }));
        setInvoices(modifiedInvoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Invoices</h2>
      <Link 
        to="/invoices/new" 
        className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
      >
        Add New Invoice
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Load ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <Link to={`/invoices/${invoice._id}`} className="text-blue-600 hover:underline">
                    {invoice._id}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {invoice.customerId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {invoice.loadId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  ${invoice.amount.toFixed(2)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap border-b border-gray-200 ${invoice.status === 'Paid' ? 'text-green-600' : invoice.status === 'Unpaid' ? 'text-red-600' : 'text-yellow-600'}`}>
                  {invoice.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {new Date(invoice.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <Link to={`/invoices/${invoice._id}/edit`} className="text-blue-600 hover:underline mr-4">
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

export default InvoiceList;
