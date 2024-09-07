// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// // import axios from 'axios';

// const DriverDashboard = () => {
//   const [id,setId] = useState();
// useEffect(()=>{
//   setId(localStorage.getItem("driverId"));
// },[])

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 pt-1">
//       <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Manage Records</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//           {/* Profile */}
//           <Link to="/profile" className="bg-blue-700 p-4 rounded-lg shadow-md hover:bg-blue-800">
//             <div className='flex justify-between'>
//               <h3 className="text-xl mb-2 font-bold text-white">Profile</h3>
//             </div>
//           </Link>

//           {/* Assigned Loads */}
//           <Link to="/assigned-loads" className="bg-green-700 p-4 rounded-lg shadow-md hover:bg-green-800">
//             <div className='flex justify-between'>
//               <h3 className="text-xl mb-2 font-bold text-white">Assigned Loads</h3>
//               {/* <h3 className='text-xl font-bold text-white'>{counts?.loads}</h3> */}
//             </div>
//           </Link>

//           {/* Communication Logs */}
//           <Link to="/communicationlogs" className="bg-yellow-700 p-4 rounded-lg shadow-md hover:bg-yellow-800">
//             <div className='flex justify-between'>
//               <h3 className="text-xl mb-2 font-bold text-white">Communication Logs</h3>
//               {/* <h3 className='text-xl font-bold text-white'>{counts?.communicationlogs}</h3> */}
//             </div>
//           </Link>

//           {/* Vehicle Status */}
//           <Link to="/vehicles" className="bg-teal-700 p-4 rounded-lg shadow-md hover:bg-teal-800">
//             <div className='flex justify-between'>
//               <h3 className="text-xl mb-2 font-bold text-white">Vehicle Status</h3>
//               {/* <h3 className='text-xl font-bold text-white'>{counts?.vehicles}</h3> */}
//             </div>
//           </Link>

//           {/* Payments */}
//           <Link to="/payments" className="bg-purple-700 p-4 rounded-lg shadow-md hover:bg-purple-800">
//             <div className='flex justify-between'>
//               <h3 className="text-xl mb-2 font-bold text-white">Payments</h3>
//               {/* <h3 className='text-xl font-bold text-white'>{counts?.payments}</h3> */}
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DriverDashboard;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const DriverDashboard = () => {
//   const [id, setId] = useState();

//   useEffect(() => {
//     setId(localStorage.getItem("driverId"));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 pt-1">
//       <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Manage Your Tasks</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
//           {/* Profile Management */}
//           <Link to="/profile" className="bg-blue-700 p-4 rounded-lg shadow-md hover:bg-blue-800">
//             <h3 className="text-xl mb-2 font-bold text-white">Profile Management</h3>
//             <p className="text-white">Update your contact details, license information, and view your performance metrics.</p>
//           </Link>

//           {/* Assigned Loads */}
//           <Link to="/assigned-loads" className="bg-green-700 p-4 rounded-lg shadow-md hover:bg-green-800">
//             <h3 className="text-xl mb-2 font-bold text-white">View Assigned Loads</h3>
//             <p className="text-white">Check your current loads and update the status (e.g., picked up, in transit, delivered).</p>
//           </Link>

//           {/* Load Status Update */}
//           <Link to="/load-status" className="bg-orange-600 p-4 rounded-lg shadow-md hover:bg-orange-700">
//             <h3 className="text-xl mb-2 font-bold text-white">Update Load Status</h3>
//             <p className="text-white">Mark loads as picked up, in transit, or delivered and report any issues or delays.</p>
//           </Link>

//           {/* Schedule Access */}
//           <Link to="/schedule" className="bg-indigo-600 p-4 rounded-lg shadow-md hover:bg-indigo-700">
//             <h3 className="text-xl mb-2 font-bold text-white">Access Personal Schedule</h3>
//             <p className="text-white">View your daily, weekly, and monthly assignments. Request schedule changes if needed.</p>
//           </Link>

//           {/* Condition Reports */}
//           <Link to="/condition-reports" className="bg-teal-700 p-4 rounded-lg shadow-md hover:bg-teal-800">
//             <h3 className="text-xl mb-2 font-bold text-white">Submit Condition Reports</h3>
//             <p className="text-white">Upload photos and documents of vehicle conditions at pickup and delivery.</p>
//           </Link>

//           {/* Communication Logs */}
//           <Link to="/communicationlogs" className="bg-yellow-700 p-4 rounded-lg shadow-md hover:bg-yellow-800">
//             <h3 className="text-xl mb-2 font-bold text-white">Communication Logs</h3>
//             <p className="text-white">View communication history with the admin team.</p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DriverDashboard;

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DriverDashboard = () => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [id, setId] = useState(null);
  const [error, setError] = useState('');

  const handleLicenseSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/drivers/id-by-license/${licenseNumber}`);
      const driverId = response.data.driverId;
      localStorage.setItem("driverId", driverId);
      setId(driverId);
      setError('');
    } catch (error) {
      setError('Driver not found or an error occurred');
      console.error('Error fetching driver ID:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-1">
      <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>

      {!id && !localStorage.getItem('driverId') ? (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Enter License Number</h2>
          <form onSubmit={handleLicenseSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="licenseNumber">
                License Number
              </label>
              <input
                type="text"
                id="licenseNumber"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Manage Your Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {/* Profile Management */}
            <Link to="/profile" className="bg-blue-700 p-4 rounded-lg shadow-md hover:bg-blue-800">
              <h3 className="text-xl mb-2 font-bold text-white">Profile Management</h3>
              <p className="text-white">Update your contact details, license information, and view your performance metrics.</p>
            </Link>

            {/* Assigned Loads */}
            <Link to="/assigned-loads" className="bg-green-700 p-4 rounded-lg shadow-md hover:bg-green-800">
              <h3 className="text-xl mb-2 font-bold text-white">View Assigned Loads</h3>
              <p className="text-white">Check your current loads and update the status (e.g., picked up, in transit, delivered).</p>
            </Link>

            {/* Schedule Access */}
            <Link to="/schedule" className="bg-indigo-600 p-4 rounded-lg shadow-md hover:bg-indigo-700">
              <h3 className="text-xl mb-2 font-bold text-white">Access Personal Schedule</h3>
              <p className="text-white">View your daily, weekly, and monthly assignments. Request schedule changes if needed.</p>
            </Link>

            {/* Condition Reports */}
            <Link to="/condition-reports" className="bg-teal-700 p-4 rounded-lg shadow-md hover:bg-teal-800">
              <h3 className="text-xl mb-2 font-bold text-white">Submit Condition Reports</h3>
              <p className="text-white">Upload photos and documents of vehicle conditions at pickup and delivery.</p>
            </Link>

            {/* Communication Logs */}
            <Link to="/communicationlogs" className="bg-yellow-700 p-4 rounded-lg shadow-md hover:bg-yellow-800">
              <h3 className="text-xl mb-2 font-bold text-white">Communication Logs</h3>
              <p className="text-white">View communication history with the admin team.</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
