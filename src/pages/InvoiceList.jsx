import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StatusDropdown from '../components/StatusDropdown';

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
        console.log(response);
        const modifiedInvoices = response.data.map(invoice => ({
          ...invoice,
          customerId: invoice.customerId.name,
          loadId: invoice.loadId.pickupLocation,
        }));
        setInvoices(modifiedInvoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  const handleUpdateStatus = async (invoiceId, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${invoiceId}`, 
      { status: newStatus }, 
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice._id === invoiceId ? { ...invoice, status: newStatus } : invoice
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Invoices</h2>
      <Link 
        to="/invoices/new" 
        className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
      >
        Add New Invoice
      </Link>
      <div className="scrollbar-custom overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Load Location
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                  {/* <Link to={`/invoices/${invoice._id}`} className="hover:bg-green-200 hover:border-green-400 bg-green-50 px-4 py-1 rounded-lg border border-green-200">
                    {invoice._id}
                  </Link> */}
                  <Link
                     to={`/invoices/${invoice._id}`}
                     className="hover:bg-green-200 hover:border-green-400 bg-green-50 px-4 py-1 rounded-lg border border-green-200"
                    >
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
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <StatusDropdown
                    currentStatus={invoice.status}
                    onChangeStatus={(newStatus) => handleUpdateStatus(invoice._id, newStatus)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {new Date(invoice.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <Link to={`/invoices/${invoice._id}/edit`} className="hover:bg-yellow-200 hover:border-yellow-400 bg-yellow-50 px-4 py-1 rounded-lg border border-yellow-200">
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
