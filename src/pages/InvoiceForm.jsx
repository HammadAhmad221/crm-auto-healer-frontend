// with both dropdowns working code

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import HomeButton from '../components/HomeButton';
// import BackButton from '../components/BackButton';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

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
//   const [loads, setLoads] = useState([]); // To store load data

//   // Fetch customer data for dropdown
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/customers`, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         // setCustomers(response.data);
//         const sortedCustomers = response.data.sort((a, b) => a.name.localeCompare(b.name));
//         setCustomers(sortedCustomers);
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   // Fetch load data for dropdown
//   useEffect(() => {
//     const fetchLoads = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/loads`, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         setLoads(response.data);
//       } catch (error) {
//         console.error('Error fetching loads:', error);
//       }
//     };

//     fetchLoads();
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

// // Truncate text to a specific length and add ellipses if it's too long
// const truncateText = (text, maxLength) => {
//   if (text.length > maxLength) {
//     return text.substring(0, maxLength) + '...';
//   }
//   return text;
// };

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
//         // toast.success('Invoice updated successfully!');
//         navigate('/invoices')
//       } else {
//         await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/invoices`, invoice, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         // toast.success('Invoice added successfully!');
//         navigate('/invoices')
//       }
//     } catch (error) {
//       console.error('Error saving invoice:', error);
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <>
//       <HomeButton />
//     <BackButton backto="/invoices"/>

//       <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-semibold mb-6">
//           {isEdit ? 'Edit Invoice' : 'Add New Invoice'}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           {/* Customer Dropdown */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Customer</label>
//             <select
//               name="customerId"
//               value={invoice.customerId}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               {/* <option value="">Select Customer</option> */}
//               {isEdit ? (
//                 <option value={invoice.customerId._id}>{invoice.customerId?.name}</option>
//               ) : (
//                 <option value="">Select a Customer</option>
//               )}
//               {customers.map((customer) => (
//                 <option key={customer._id} value={customer._id}>
//                   {customer?.name}, {customer?.email}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Load Dropdown */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Load</label>
//             <select
//               name="loadId"
//               value={invoice.loadId._id}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               {/* <option value="">Select Load</option> */}
//               {isEdit ? (
//                 <option value={invoice.loadId._id}>{invoice.loadId?.loadId} from "${invoice.loadId?.pickupLocation}" to "${invoice.loadId?.deliveryLocation}"</option>
//               ) : (
//                 <option value="">Select a Load</option>
//               )}
//               {loads.map((load) => (
//                 <option key={load._id} value={load._id}>
//                   {/* {load.loadId} from {load.pickupLocation} to {load.deliveryLocation} */}
//                 LoadId: {truncateText(load?.loadId, 1)} from "{truncateText(load?.pickupLocation, 30)}" to "{load?.deliveryLocation}"
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Amount</label>
//             <input
//               type="number"
//               name="amount"
//               value={invoice?.amount}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div> */}

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Status</label>
//             <select
//               name="status"
//               value={invoice?.status}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="Unpaid">Unpaid</option>
//               <option value="Paid">Paid</option>
//               <option value="Pending">Pending</option>
//             </select>
//           </div>

//           <div className="flex justify-end mt-8">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
//             >
//               {isEdit ? 'Update Invoice' : 'Save Invoice'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default InvoiceForm;

// first working code end here

//working code with both searches
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import HomeButton from '../components/HomeButton';
// import BackButton from '../components/BackButton';
// import { toast } from 'react-toastify';

// const InvoiceForm = ({ isEdit }) => {
//   const { id } = useParams();

//   const [invoice, setInvoice] = useState({
//     customerId: '',
//     loadId: '',
//     amount: '',
//     status: 'Unpaid',
//   });

//   const [customers, setCustomers] = useState([]); // To store customer data
//   const [loads, setLoads] = useState([]); // To store load data
//   const [searchTerm, setSearchTerm] = useState(''); // Search term for customer search
//   const [filteredCustomers, setFilteredCustomers] = useState([]); // Filtered customer data
//   const [showCustomerDropdown, setShowCustomerDropdown] = useState(false); // Show/hide customer dropdown
//   const [loadSearchTerm, setLoadSearchTerm] = useState(''); // Search term for load search
//   const [filteredLoads, setFilteredLoads] = useState([]); // Filtered load data
//   const [showLoadDropdown, setShowLoadDropdown] = useState(false); // Show/hide load dropdown

//   // Fetch load data for dropdown
//   useEffect(() => {
//     const fetchLoads = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/loads`, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         setLoads(response.data);
//       } catch (error) {
//         console.error('Error fetching loads:', error);
//       }
//     };

//     fetchLoads();
//   }, []);

//   // Fetch the customers once when the component mounts
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/customers`, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         setCustomers(response.data); // Store all customers
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       }
//     };

//     fetchCustomers();
//   }, []);

  
//     useEffect(() => {
//     if (isEdit && id) {
//       const fetchInvoice = async () => {
//         try {
//           const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${id}`, {
//             headers: {
//               Authorization: localStorage.getItem('token'),
//             },
//           });
//           setInvoice(response.data);
//           console.log(response.data);
//         } catch (error) {
//           console.error('Error fetching invoice:', error);
//         }
//       };

//       fetchInvoice();
//     }
//   }, [isEdit, id]);

//   // Handle customer search input
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     if (value) {
//       const filtered = customers.filter((customer) =>
//         customer.name.toLowerCase().includes(value.toLowerCase()) // Filter customers by name
//       );
//       setFilteredCustomers(filtered); // Update filtered customers
//       setShowCustomerDropdown(filtered.length > 0); // Show dropdown if there are filtered results
//     } else {
//       setShowCustomerDropdown(false); // Hide dropdown if input is empty
//     }
//   };

//   const handleCustomerSelect = (customer) => {
//     setInvoice((prevInvoice) => ({
//       ...prevInvoice,
//       customerId: customer._id,
//     }));
//     setSearchTerm(customer.name);
//     setShowCustomerDropdown(false); 
//   };

// const handleLoadSearchChange = (e) => {
//   const value = e.target.value;
//   setLoadSearchTerm(value);

//   if (value) {
//     const filtered = loads.filter((load) => {
//       const loadIdString = load.loadId.toString();
//       return loadIdString.includes(value);
//     });
//     setFilteredLoads(filtered);
//     setShowLoadDropdown(filtered.length > 0);
//   } else {
//     setShowLoadDropdown(false);
//   }
// };

//   const handleLoadSelect = (load) => {
//     setInvoice((prevInvoice) => ({
//       ...prevInvoice,
//       loadId: load._id,
//     }));
//     setLoadSearchTerm(load.loadId);
//     setShowLoadDropdown(false);
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
//         toast.success('Invoice updated successfully!');
//       } else {
//         await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/invoices`, invoice, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         toast.success('Invoice added successfully!');
//       }
//     } catch (error) {
//       console.error('Error saving invoice:', error);
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <>
//       <HomeButton />
//       <BackButton />

//       <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-semibold mb-6">
//           {isEdit ? 'Edit Invoice' : 'Add New Invoice'}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           {/* Customer Search Field */}
//           <div className="mb-4 relative">
//             <label className="block text-sm font-medium text-gray-700">Customer</label>
//             <input
//               type="text"
//               name="customerSearch"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               placeholder="Search customer by name"
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//             {/* Dropdown for filtered customer suggestions */}
//             {showCustomerDropdown && filteredCustomers.length > 0 && (
//               <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                 {filteredCustomers.map((customer) => (
//                   <li
//                     key={customer._id}
//                     className="px-4 py-2 cursor-pointer hover:bg-gray-200"
//                     onClick={() => handleCustomerSelect(customer)}
//                   >
//                     {customer.name}, {customer.email}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Load Search Field */}
//           <div className="mb-4 relative">
//             <label className="block text-sm font-medium text-gray-700">Load</label>
//             <input
//               type="text"
//               name="loadSearch"
//               value={loadSearchTerm}
//               onChange={handleLoadSearchChange} // Handle input change
//               placeholder="Search load by load ID"
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//             {/* Dropdown for filtered load suggestions */}
//             {showLoadDropdown && filteredLoads.length > 0 && (
//               <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//                 {filteredLoads.map((load) => (
//                   <li
//                     key={load._id}
//                     className="px-4 py-2 cursor-pointer hover:bg-gray-200"
//                     onClick={() => handleLoadSelect(load)}
//                   >
//                     {`${load.loadId} from "${load.pickupLocation}" to "${load.deliveryLocation}"`}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Amount</label>
//             <input
//               type="number"
//               name="amount"
//               value={invoice.amount}
//               onChange={(e) => setInvoice({ ...invoice, amount: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Status</label>
//             <select
//               name="status"
//               value={invoice.status}
//               onChange={(e) => setInvoice({ ...invoice, status: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="Unpaid">Unpaid</option>
//               <option value="Paid">Paid</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
//           >
//             {isEdit ? 'Update Invoice' : 'Add Invoice'}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default InvoiceForm;

// latest working code with search

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import HomeButton from '../components/HomeButton';
// import BackButton from '../components/BackButton';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

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
//   const [loads, setLoads] = useState([]); // To store load data

//   const [customerInput, setCustomerInput] = useState(''); // To handle customer input for search
//   const [loadInput, setLoadInput] = useState(''); // To handle load input for search

//   const [filteredCustomers, setFilteredCustomers] = useState([]); // For filtered customers
//   const [filteredLoads, setFilteredLoads] = useState([]); // For filtered loads

//   const [showCustomerDropdown, setShowCustomerDropdown] = useState(false); // For toggling customer dropdown
//   const [showLoadDropdown, setShowLoadDropdown] = useState(false); // For toggling load dropdown

//   // Fetch customer data for dropdown
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/customers`, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         const sortedCustomers = response.data.sort((a, b) => a.name.localeCompare(b.name));
//         setCustomers(sortedCustomers);
//         setFilteredCustomers(sortedCustomers); // Initially set filtered customers
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   // Fetch load data for dropdown
//   useEffect(() => {
//     const fetchLoads = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/loads`, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         setLoads(response.data);
//         setFilteredLoads(response.data); // Initially set filtered loads
//       } catch (error) {
//         console.error('Error fetching loads:', error);
//       }
//     };

//     fetchLoads();
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

//   // Handle changes for the invoice form fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInvoice((prevInvoice) => ({
//       ...prevInvoice,
//       [name]: value,
//     }));
//   };

//   // Handle customer search input
//   const handleCustomerInput = (e) => {
//     const value = e.target.value;
//     setCustomerInput(value);
//     setFilteredCustomers(
//       customers.filter((customer) =>
//         customer.name.toLowerCase().includes(value.toLowerCase())
//       )
//     );
//     setShowCustomerDropdown(true);
//   };

//   // Handle load search input
//   const handleLoadInput = (e) => {
//     const value = e.target.value;
//     setLoadInput(value);
//     setFilteredLoads(
//       loads.filter((load) =>
//         load.loadId.toString().toLowerCase().includes(value.toLowerCase())
//       )
//     );
//     setShowLoadDropdown(true);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEdit) {
//         await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${id}`, invoice, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         navigate('/invoices');
//       } else {
//         await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/invoices`, invoice, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         navigate('/invoices');
//       }
//     } catch (error) {
//       console.error('Error saving invoice:', error);
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <>
//       <HomeButton />
//       <BackButton backto="/invoices" />

//       <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-semibold mb-6">
//           {isEdit ? 'Edit Invoice' : 'Add New Invoice'}
//         </h2>
//         <form onSubmit={handleSubmit}>
//           {/* Customer Search Input */}
//           <div className="mb-4 relative">
//             <label className="block text-sm font-medium text-gray-700">Customer</label>
//             <input
//               type="text"
//               name="customerId"
//               value={customerInput}
//               onChange={handleCustomerInput}
//               onFocus={() => setShowCustomerDropdown(true)}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Search Customer"
//               required
//             />
//             {showCustomerDropdown && (
//               <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-48 overflow-y-auto">
//                 {filteredCustomers.map((customer) => (
//                   <div
//                     key={customer._id}
//                     onClick={() => {
//                       setInvoice((prevInvoice) => ({ ...prevInvoice, customerId: customer._id }));
//                       setCustomerInput(customer.name);
//                       setShowCustomerDropdown(false);
//                     }}
//                     className="cursor-pointer p-2 hover:bg-gray-100"
//                   >
//                     {customer.name} ({customer.email})
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Load Search Input */}
//           <div className="mb-4 relative">
//             <label className="block text-sm font-medium text-gray-700">Load</label>
//             <input
//               type="text"
//               name="loadId"
//               value={loadInput}
//               onChange={handleLoadInput}
//               onFocus={() => setShowLoadDropdown(true)}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Search Load"
//               required
//             />
//             {showLoadDropdown && (
//               <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-48 overflow-y-auto">
//                 {filteredLoads.map((load) => (
//                   <div
//                     key={load._id}
//                     onClick={() => {
//                       setInvoice((prevInvoice) => ({ ...prevInvoice, loadId: load._id }));
//                       setLoadInput(load.loadId);
//                       setShowLoadDropdown(false);
//                     }}
//                     className="cursor-pointer p-2 hover:bg-gray-100"
//                   >
//                     {load.loadId} from "{load.pickupLocation}" to "{load.deliveryLocation}"
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Status</label>
//             <select
//               name="status"
//               value={invoice?.status}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               required
//             >
//               <option value="Unpaid">Unpaid</option>
//               <option value="Paid">Paid</option>
//               <option value="Pending">Pending</option>
//             </select>
//           </div>

//           <div className="flex justify-end mt-8">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
//             >
//               {isEdit ? 'Update Invoice' : 'Save Invoice'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default InvoiceForm;


// latest working code with search end

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';
import { toast } from 'react-toastify';

const InvoiceForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState({
    customerId: '',
    loadId: '',
    amount: '',
    status: 'Unpaid',
  });

  const [customers, setCustomers] = useState([]);
  const [loads, setLoads] = useState([]);

  const [customerInput, setCustomerInput] = useState('');
  const [loadInput, setLoadInput] = useState('');

  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filteredLoads, setFilteredLoads] = useState([]);

  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showLoadDropdown, setShowLoadDropdown] = useState(false);

  // Fetch customer data
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/customers`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        const sortedCustomers = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setCustomers(sortedCustomers);
        setFilteredCustomers(sortedCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  // Fetch load data
  useEffect(() => {
    const fetchLoads = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/loads`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setLoads(response.data);
        const sortedLoads = response.data.sort((a, b) => b.loadId - a.loadId);
        setFilteredLoads(sortedLoads);
        console.log(sortedLoads);
      } catch (error) {
        console.error('Error fetching loads:', error);
      }
    };

    fetchLoads();
  }, []);

  // Fetch the invoice data if in edit mode
  // useEffect(() => {
  //   const fetchInvoice = async () => {
  //     if (isEdit && id) {
  //       try {
  //         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${id}`, {
  //           headers: {
  //             Authorization: localStorage.getItem('token'),
  //           },
  //         });
  //         const fetchedInvoice = response.data;
  //         setInvoice(fetchedInvoice);

  //         const customer = customers.find(c => c._id === fetchedInvoice.customerId);
  //         const load = loads.find(l => l._id === fetchedInvoice.loadId);
          
  //         if (customer) {
  //           setCustomerInput(customer.name); // Update input field with customer name
  //         }

  //         if (load) {
  //           setLoadInput(load.loadId); // Update input field with load ID
  //         }
  //       } catch (error) {
  //         console.error('Error fetching invoice:', error);
  //       }
  //     }
  //   };

  //   fetchInvoice();
  // }, [isEdit, id, customers, loads]);
  // Fetch the invoice data if in edit mode
useEffect(() => {
  const fetchInvoice = async () => {
    if (isEdit && id) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        const fetchedInvoice = response.data;
        console.log("feched invoice",fetchedInvoice);

        // Update the invoice state directly
        setInvoice({
          customerId: fetchedInvoice.customerId,
          loadId: fetchedInvoice.loadId,
          amount: fetchedInvoice.amount,
          status: fetchedInvoice.status,
        });
        setCustomerInput(fetchedInvoice.customerId.name);
        setLoadInput(fetchedInvoice.loadId.loadId);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    }
  };

  fetchInvoice();
}, [isEdit, id]);


  // Handle input changes for invoice fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
    }));
  };

  // Handle customer search input
  const handleCustomerInput = (e) => {
    const value = e.target.value;
    setCustomerInput(value);
    setFilteredCustomers(
      customers.filter((customer) =>
        customer.name.toLowerCase().includes(value.toLowerCase())
      )
    );
    setShowCustomerDropdown(true);
  };

  // Handle load search input
  const handleLoadInput = (e) => {
    const value = e.target.value;
    setLoadInput(value);
    setFilteredLoads(
      loads.filter((load) =>
        load.loadId.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setShowLoadDropdown(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/invoices/${id}`, invoice, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        navigate('/invoices');
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/invoices`, invoice, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        navigate('/invoices');
      }
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <HomeButton />
      <BackButton backto="/invoices" />

      <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">
          {isEdit ? 'Edit Invoice' : 'Add New Invoice'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Customer Search Input */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Customer</label>
            <input
              type="text"
              name="customerId"
              value={customerInput}
              onChange={handleCustomerInput}
              onFocus={() => setShowCustomerDropdown(true)}
              onBlur={()=>{setTimeout(()=>setShowCustomerDropdown(false),200)}}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Customer"
              required
            />
            {showCustomerDropdown && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-48 overflow-y-auto">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer._id}
                    onClick={() => {
                      setInvoice((prevInvoice) => ({ ...prevInvoice, customerId: customer._id }));
                      setCustomerInput(customer.name);
                      setShowCustomerDropdown(false);
                    }}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    {customer.name}, {customer.email}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Load Search Input */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Load</label>
            <input
              type="text"
              name="loadId"
              value={loadInput}
              onChange={handleLoadInput}
              onFocus={() => setShowLoadDropdown(true)}
              onBlur={()=>{setTimeout(()=>setShowLoadDropdown(false),200)}}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Load"
              required
            />
            {showLoadDropdown && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-48 overflow-y-auto">
                {filteredLoads.map((load) => (
                  <div
                    key={load._id}
                    onClick={() => {
                      setInvoice((prevInvoice) => ({ ...prevInvoice, loadId: load._id }));
                      setLoadInput(load.loadId);
                      setShowLoadDropdown(false);
                    }}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    {load.loadId} from "{load.pickupLocation}" to "{load.deliveryLocation}"
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={invoice.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={invoice.amount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Amount"
              required
            />
          </div> */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isEdit ? 'Update Invoice' : 'Create Invoice'}
          </button>
        </form>
      </div>
    </>
  );
};

export default InvoiceForm;
