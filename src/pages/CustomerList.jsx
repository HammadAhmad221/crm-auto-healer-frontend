// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import HomeButton from '../components/HomeButton';
// import BackButton from '../components/BackButton';
// import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';


// const CustomerList = () => {
//   const [customers, setCustomers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/customers`, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         setCustomers(response.data);
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   return (
// <>
// <HomeButton/>
// <BackButton/>

// <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-6">Customers</h2>
//       <Link 
//         to="/customers/new" 
//         className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
//       >
//         Add New Customer
//       </Link>
//       <div className="scrollbar-custom overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Phone Number
//               </th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {customers.map((customer) => (
//               <tr key={customer._id}>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                   {/* <Link to={`/customers/${customer._id}`} className="hover:bg-green-200 hover:border-green-400 bg-green-50 px-4 py-1 rounded-lg border border-green-200"> */}
//                     {customer.name}
//                   {/* </Link> */}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                   {customer.email}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                   {customer.phone}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-1">
//                 <button 
//                     onClick={()=>navigate(`/customers/${customer._id}`)} 
//                     className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
//                   >
//                     <FaInfoCircle/>
//                   </button>
//                   <button 
//                     onClick={()=>navigate(`/customers/${customer._id}/edit`)} 
//                     className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
//                   >
//                     <FaEdit/>
//                   </button>
//                   <button
//           onClick={async () => {
//             if (window.confirm('Are you sure you want to delete this customer?')) {
//               try {
//                 await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/customers/${customer._id}`, {
//                   headers: {
//                     Authorization: localStorage.getItem('token'),
//                   },
//                 });
//                 // navigate('/invoices');
//               } catch (error) {
//                 console.error('Error deleting customer:', error);
//               }
//             }
//           }}
//           className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
//         >
//           <FaTrash/>
//         </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
// </>
//   );
// };

// export default CustomerList;


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';
import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

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
    <>
      <HomeButton />
      <BackButton />

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Customers</h2>
        <Link 
          to="/customers/new" 
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
        >
          Add New Customer
        </Link>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                {['Name', 'Email', 'Phone Number', 'Actions'].map((header) => (
                  <th key={header} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <span className="truncate max-w-xs hover:bg-gray-100" title={customer.name}>
                      {customer.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <span className="truncate max-w-xs hover:whitespace-normal hover:bg-gray-100" title={customer.email}>
                      {customer.email}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <span className="truncate max-w-xs hover:whitespace-normal hover:bg-gray-100" title={customer.phone}>
                      {customer.phone}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-1">
                    <button 
                      onClick={() => navigate(`/customers/${customer._id}`)} 
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                    >
                      <FaInfoCircle />
                    </button>
                    <button 
                      onClick={() => navigate(`/customers/${customer._id}/edit`)} 
                      className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this customer?')) {
                          try {
                            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/customers/${customer._id}`, {
                              headers: {
                                Authorization: localStorage.getItem('token'),
                              },
                            });
                            // Refresh customer list here if needed
                            setCustomers((prevCustomers) =>
                              prevCustomers.filter((c) => c._id !== customer._id)
                            );
                          } catch (error) {
                            console.error('Error deleting customer:', error);
                          }
                        }
                      }}
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomerList;
