// // // src/components/AssignedLoads.js
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const AssignedLoads = ({ driverId }) => {
// //     const [loads, setLoads] = useState([]);

// //     useEffect(() => {
// //         const id = localStorage.getItem('driverId');
// //         const fetchLoads = async () => {
// //             try {
// //                 const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/driver-loads/driver/${id}`);
// //                 setLoads(response.data);
// //             } catch (error) {
// //                 console.error('Error fetching loads:', error);
// //             }
// //         };

// //         fetchLoads();
// //     }, [driverId]);

// //     return (
// //         <div className="assigned-loads">
// //             <h2>Assigned Loads</h2>
// //             <ul>
// //                 {loads.map(load => (
// //                     <li key={load._id}>
// //                         <p><strong>Pickup Location:</strong> {load.pickupLocation}</p>
// //                         <p><strong>Delivery Location:</strong> {load.deliveryLocation}</p>
// //                         <p><strong>Load Details:</strong> {load.loadDetails}</p>
// //                         <p><strong>Status:</strong> {load.status}</p>
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // };

// // export default AssignedLoads;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const AssignedLoads = () => {
//   const [loads, setLoads] = useState([]);
//   const [statusUpdate, setStatusUpdate] = useState({});

//   useEffect(() => {
//     const id = localStorage.getItem('driverId');
//     const fetchLoads = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/driver-loads/driver/${id}`);
//         setLoads(response.data);
//       } catch (error) {
//         console.error('Error fetching loads:', error);
//       }
//     };

//     fetchLoads();
//   }, []);

//   const handleStatusChange = (loadId, newStatus) => {
//     setStatusUpdate({ ...statusUpdate, [loadId]: newStatus });
//   };

//   const updateStatus = async (loadId) => {
//     try {
//       const updatedLoad = { status: statusUpdate[loadId] };
//       await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/driver-loads/driver/${loadId}`, updatedLoad, {
//         headers: {
//           Authorization: localStorage.getItem('token'),
//         },
//       });
//       alert('Load status updated successfully!');
//       // Optionally, refetch loads or update the state directly
//     } catch (error) {
//       console.error('Error updating load status:', error);
//       alert('Failed to update load status. Please try again.');
//     }
//   };

//   return (
//     <div className="assigned-loads p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-4">Assigned Loads</h2>
//       <ul className="space-y-4">
//         {loads.map((load) => (
//           <li key={load._id} className="bg-white p-4 rounded-lg shadow-md">
//             <p><strong>Pickup Location:</strong> {load.pickupLocation}</p>
//             <p><strong>Delivery Location:</strong> {load.deliveryLocation}</p>
//             <p><strong>Load Details:</strong> {load.loadDetails}</p>
//             <p><strong>Status:</strong> {load.status}</p>
//             <div className="mt-4">
//               <label htmlFor={`status-${load._id}`} className="mr-2 font-semibold">Change Status:</label>
//               <select
//                 id={`status-${load._id}`}
//                 value={statusUpdate[load._id] || load.status}
//                 onChange={(e) => handleStatusChange(load._id, e.target.value)}
//                 className="border rounded-lg p-2"
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Picked Up">Picked Up</option>
//                 <option value="In Transit">In Transit</option>
//                 <option value="Delivered">Delivered</option>
//               </select>
//               <button
//                 onClick={() => updateStatus(load._id)}
//                 className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//               >
//                 Update Status
//               </button>
//               <Link
//                 to={`/condition-reports/${load._id}`}
//                 className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//               >
//                 Condition Reports
//               </Link>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AssignedLoads;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AssignedLoads = () => {
  const [loads, setLoads] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState({});

  useEffect(() => {
    const id = localStorage.getItem('driverId');
    const fetchLoads = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/driver-loads/driver/${id}`);
        setLoads(response.data);
      } catch (error) {
        console.error('Error fetching loads:', error);
      }
    };

    fetchLoads();
  }, []);

  const handleStatusChange = (loadId, newStatus) => {
    setStatusUpdate({ ...statusUpdate, [loadId]: newStatus });
  };

  const updateStatus = async (loadId) => {
    try {
      const updatedLoad = { status: statusUpdate[loadId] };
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}api/driver-loads/driver/${loadId}`, updatedLoad, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      alert('Load status updated successfully!');
      // Remove the delivered load from the UI by filtering it out
      setLoads((prevLoads) => prevLoads.filter((load) => load._id !== loadId || updatedLoad.status !== 'Delivered'));
    } catch (error) {
      console.error('Error updating load status:', error);
      alert('Failed to update load status. Please try again.');
    }
  };

  return (
    <div className="assigned-loads p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Assigned Loads</h2>
      <ul className="space-y-4">
        {loads
          .filter((load) => load.status !== 'Delivered') // Filter out delivered loads
          .map((load) => (
            <li key={load._id} className="bg-white p-4 rounded-lg shadow-md">
              <p><strong>Pickup Location:</strong> {load.pickupLocation}</p>
              <p><strong>Delivery Location:</strong> {load.deliveryLocation}</p>
              <p><strong>Load Details:</strong> {load.loadDetails}</p>
              <p><strong>Status:</strong> {load.status}</p>
              <div className="mt-4">
                <label htmlFor={`status-${load._id}`} className="mr-2 font-semibold">Change Status:</label>
                <select
                  id={`status-${load._id}`}
                  value={statusUpdate[load._id] || load.status}
                  onChange={(e) => handleStatusChange(load._id, e.target.value)}
                  className="border rounded-lg p-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="Picked Up">Picked Up</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <button
                  onClick={() => updateStatus(load._id)}
                  className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Update Status
                </button>
                <Link
                  to={`/condition-reports/${load._id}`}
                  className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Condition Reports
                </Link>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AssignedLoads;
