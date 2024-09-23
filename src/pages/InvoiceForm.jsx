// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import HomeButton from '../components/HomeButton';

// const InvoiceForm = ({ isEdit }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [invoice, setInvoice] = useState({
//     customerId: '',
//     loadId: '',
//     amount: '',
//     status: 'Unpaid',
//   });

//   const [customers, setCustomers] = useState([]); // To store customer data

//   // Fetch customer data for dropdown
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/customers`, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         setCustomers(response.data); // Assuming response data contains customers
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   // Fetch the invoice data if in edit mode
//   useEffect(() => {
//     if (isEdit && id) {
//       const fetchInvoice = async () => {
//         try {
//           const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${id}`, {
//             headers: {
//               Authorization: localStorage.getItem('token'),
//             },
//           });
//           setInvoice(response.data);
//         } catch (error) {
//           console.error('Error fetching invoice:', error);
//         }
//       };

//       fetchInvoice();
//     }
//   }, [isEdit, id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInvoice((prevInvoice) => ({
//       ...prevInvoice,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEdit) {
//         await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${id}`, invoice, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//       } else {
//         await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/invoices`, invoice, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//       }
//       navigate('/invoices');
//     } catch (error) {
//       console.error('Error saving invoice:', error);
//     }
//   };

//   return (
// <>
// <HomeButton/>
// <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold mb-6">
//         {isEdit ? 'Edit Invoice' : 'Add New Invoice'}
//       </h2>
//       <form onSubmit={handleSubmit}>
//         {/* Customer Dropdown */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Customer</label>
//           <select
//             name="customerId"
//             value={invoice.customerId}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             required
//           >
//             <option value="">Select Customer</option>
//             {customers.map((customer) => (
//               <option key={customer._id} value={customer._id}>
//                 {customer.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Load ID</label>
//           <input
//             type="text"
//             name="loadId"
//             value={invoice.loadId}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//         </div>
        
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Amount</label>
//           <input
//             type="number"
//             name="amount"
//             value={invoice.amount}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Status</label>
//           <select
//             name="status"
//             value={invoice.status}
//             onChange={handleChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             required
//           >
//             <option value="Unpaid">Unpaid</option>
//             <option value="Paid">Paid</option>
//             <option value="Pending">Pending</option>
//           </select>
//         </div>

//         <div className="flex justify-end mt-8">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
//           >
//             {isEdit ? 'Update Invoice' : 'Save Invoice'}
//           </button>
//         </div>
//       </form>
//     </div>
// </>
//   );
// };

// export default InvoiceForm;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';

const InvoiceForm = ({ isEdit }) => {
  const { id } = useParams();
  // const navigate = useNavigate();

  const [invoice, setInvoice] = useState({
    customerId: '',
    loadId: '',
    amount: '',
    status: 'Unpaid',
  });

  const [customers, setCustomers] = useState([]); // To store customer data
  const [loads, setLoads] = useState([]); // To store load data

  // Fetch customer data for dropdown
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/customers`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setCustomers(response.data); // Assuming response data contains customers
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  // Fetch load data for dropdown
  useEffect(() => {
    const fetchLoads = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/loads`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setLoads(response.data); // Assuming response data contains loads
      } catch (error) {
        console.error('Error fetching loads:', error);
      }
    };

    fetchLoads();
  }, []);
  // Fetch the invoice data if in edit mode
  useEffect(() => {
    if (isEdit && id) {
      const fetchInvoice = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${id}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          });
          setInvoice(response.data);
        } catch (error) {
          console.error('Error fetching invoice:', error);
        }
      };

      fetchInvoice();
    }
  }, [isEdit, id]);

  // Truncate text to a specific length and add ellipses if it's too long
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${id}`, invoice, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        window.alert('Invoice updated successfully!');
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/invoices`, invoice, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        window.alert('Invoice added successfully!');
      }
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  return (
    <>
      <HomeButton />
    <BackButton/>

      <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">
          {isEdit ? 'Edit Invoice' : 'Add New Invoice'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Customer Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Customer</label>
            <select
              name="customerId"
              value={invoice.customerId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {/* <option value="">Select Customer</option> */}
              {isEdit ? (
                <option value="">{invoice.customerId.name}</option>
              ) : (
                <option value="">Select a Customer</option>
              )}
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Load Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Load</label>
            <select
              name="loadId"
              value={invoice.loadId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {/* <option value="">Select Load</option> */}
              {isEdit ? (
                <option value="">{truncateText(invoice.loadId.loadId,1)} from {truncateText(invoice.loadId.pickupLocation,30)} to {truncateText(invoice.loadId.deliveryLocation,30)}</option>
              ) : (
                <option value="">Select a Load</option>
              )}
              {loads.map((load) => (
                <option key={load._id} value={load._id}>
                  {/* {load.loadId} from {load.pickupLocation} to {load.deliveryLocation} */}
                  {truncateText(load.loadId, 1)} from {truncateText(load.pickupLocation, 30)} to {truncateText(load.deliveryLocation, 30)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={invoice.amount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={invoice.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              {isEdit ? 'Update Invoice' : 'Save Invoice'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InvoiceForm;

