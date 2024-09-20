import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';

const InvoiceStats = () => {
  const [stats, setStats] = useState([]);
  const [invoices, setInvoices] = useState([]); // To store full list of invoices
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState('');

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/invoices/stats`, {
        params: {
          startDate: startDate ? startDate.toISOString() : undefined,
          endDate: endDate ? endDate.toISOString() : undefined,
          status: status || undefined,
        },
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      
      setStats(response.data.invoiceStats); // Set the stats data
      setInvoices(response.data.invoices);  // Set the full invoices data
    } catch (error) {
      console.error('Error fetching invoice stats:', error);
    }
  };

  useEffect(() => {
    fetchStats(); // Fetch stats on component mount
  }, []);

  const handleDateFilter = () => {
    fetchStats(); // Fetch stats with date range and status filter
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value); // Update status on selection
  };

  return (
<>
    <HomeButton/>
    <BackButton/>
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Invoice Statistics</h2>
      
      <div className="flex gap-4 items-center">
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={handleStatusChange}
            className="border p-2 rounded"
          >
            <option value="">All</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className='mt-2'>
        <button
          onClick={handleDateFilter}
          className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
        >
          Filter
        </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-6">
  <h3 className="text-xl font-semibold mb-4">Invoice Statistics</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {stats.length > 0 ? (
      stats.map((stat) => (
        <div
          key={stat._id}
          className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between"
        >
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-700">{stat._id}</span>
            <span className="text-gray-500">Status</span>
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {stat.count}
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-full text-center text-gray-500">No data available</div>
    )}
  </div>
</div>


      {/* Full Invoice List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Invoices</h3>
        <table className="min-w-full bg-white border border-gray-200 mt-4">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Load pickup Location
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
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <tr key={invoice._id}>
                  <td className="px-6 py-4 border-b border-gray-200">{invoice.customerId.name}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{invoice.loadId.pickupLocation}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{invoice.amount}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{invoice.status}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{new Date(invoice.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No invoices available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
</>
  );
};

export default InvoiceStats;
