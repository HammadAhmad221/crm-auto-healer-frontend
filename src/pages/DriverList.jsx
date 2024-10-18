// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import HomeButton from '../components/HomeButton';
// import BackButton from '../components/BackButton';
// import { useNavigate } from 'react-router-dom';
// import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';


// const DriverList = () => {
//   const [drivers, setDrivers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDrivers = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/drivers`, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         setDrivers(response.data);
//       } catch (error) {
//         console.error('Error fetching drivers:', error);
//       }
//     };

//     fetchDrivers();
//   }, []);

//   return (
// <>
// <HomeButton/>
// <BackButton/>

// <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-6">Drivers</h2>
//       <Link 
//         to="/drivers/new" 
//         className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
//       >
//         Add New Driver
//       </Link>
//       <div className="scrollbar-custom overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 License Number
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
//             {drivers.map((driver) => (
//               <tr key={driver._id}>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                   {/* <Link to={`/drivers/${driver._id}`} className="hover:bg-green-200 hover:border-green-400 bg-green-50 px-4 py-1 rounded-lg border border-green-200"> */}
//                     {driver.name}
//                   {/* </Link> */}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                   {driver.licenseNumber}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                   {driver.contactDetails.phoneNumber}
//                 </td>
//                 {/* <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                   <Link 
//                     to={`/drivers/${driver._id}/edit`} 
//                     className="hover:bg-yellow-200 hover:border-yellow-400 bg-yellow-50 px-4 py-1 rounded-lg border border-yellow-200"
//                   >
//                     Edit
//                   </Link>
//                 </td> */}
//                                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-1">
//                 <button 
//                     onClick={()=>navigate(`/drivers/${driver._id}`)} 
//                     className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
//                   >
//                     <FaInfoCircle/>
//                   </button>
//                   <button 
//                     onClick={()=>navigate(`/drivers/${driver._id}/edit`)} 
//                     className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
//                   >
//                     <FaEdit/>
//                   </button>
//                   <button
//           onClick={async () => {
//             if (window.confirm('Are you sure you want to delete this driver?')) {
//               try {
//                 await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/drivers/${driver._id}`, {
//                   headers: {
//                     Authorization: localStorage.getItem('token'),
//                   },
//                 });
//                 // navigate('/invoices');
//               } catch (error) {
//                 console.error('Error deleting driver:', error);
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

// export default DriverList;


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';
import { FaTrash, FaEdit, FaInfoCircle } from 'react-icons/fa';
import Loading from '../components/Loading';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/drivers`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setDrivers(response.data.reverse());
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }finally{
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <>
      <HomeButton />
      <BackButton backto="/admin"/>

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Drivers</h2>
        <Link 
          to="/drivers/new" 
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
        >
          Add New Driver
        </Link>
{
  loading ? (<Loading/>):(
    <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          {['Name', 'License Number', 'Phone Number', 'Actions'].map((header) => (
            <th key={header} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver) => (
          <tr key={driver._id}>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              <span className="truncate max-w-xs hover:bg-gray-100" title={driver.name}>
                {driver.name}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              <span className="truncate max-w-xs hover:bg-gray-100" title={driver.licenseNumber}>
                {driver.licenseNumber}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              <span className="truncate max-w-xs hover:bg-gray-100" title={driver.contactDetails.phoneNumber}>
                {driver.contactDetails.phoneNumber}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-1">
              <button 
                onClick={() => navigate(`/drivers/${driver._id}`)} 
                className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
              >
                <FaInfoCircle />
              </button>
              <button 
                onClick={() => navigate(`/drivers/${driver._id}/edit`)} 
                className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
              >
                <FaEdit />
              </button>
              <button
                onClick={async () => {
                  if (window.confirm('Are you sure you want to delete this driver?')) {
                    try {
                      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/drivers/${driver._id}`, {
                        headers: {
                          Authorization: localStorage.getItem('token'),
                        },
                      });
                      // Refresh driver list here if needed
                      setDrivers((prevDrivers) =>
                        prevDrivers.filter((c) => c._id !== driver._id)
                      );
                    } catch (error) {
                      console.error('Error deleting driver:', error);
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
  )
}
      </div>
    </>
  );
};

export default DriverList;
