// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import HomeButton from '../components/HomeButton';
// import BackButton from '../components/BackButton';

// const CommunicationLogList = () => {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
    
//     const fetchLogs = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/communicationLogs`, {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         setLogs(response.data);
//       } catch (error) {
//         console.error('Error fetching logs:', error);
//       }
//     };

//     fetchLogs();
//   }, []);

//   return (
// <>
// <HomeButton/>
// <BackButton/>

// <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-6">Communication Logs</h2>
//       <Link 
//         to="/communicationLogs/new" 
//         className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-800 mb-4 inline-block"
//       >
//         Add New Log
//       </Link>
//       <div className="scrollbar-custom overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Customer
//               </th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Communication Type
//               </th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Message
//               </th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {logs.map((log) => (
//               <tr key={log._id}>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                   <Link to={`/communicationLogs/${log._id}`} className="hover:bg-green-200 hover:border-green-400 bg-green-50 px-4 py-1 rounded-lg border border-green-200">
//                     {log.customerId?.name || "unknown"}
//                   </Link>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                   {log.communicationType}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                   {log.message}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                   {new Date(log.date).toLocaleDateString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                   <Link 
//                     to={`/communicationLogs/${log._id}/edit`} 
//                     className="hover:bg-yellow-200 hover:border-yellow-400 bg-yellow-50 px-4 py-1 rounded-lg border border-yellow-200"
//                   >
//                     Edit
//                   </Link>
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

// export default CommunicationLogList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const EmailInbox = () => {
//   const [emails, setEmails] = useState([]);

//   const fetchEmails = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/emails`, {
//         headers: {
//           Authorization: localStorage.getItem('token'),
//         },
//       });
//       setEmails(response.data);
//     } catch (error) {
//       console.error('Error fetching emails:', error);
//     }
//   };

//   useEffect(() => {
//     fetchEmails(); // Fetch emails on component mount
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-6">Inbox</h2>
//       {emails.length > 0 ? (
//         <ul className="list-disc">
//           {emails.map((email, index) => (
//             <li key={index} className="mb-4">
//               <h3 className="font-bold">{email.subject}</h3>
//               <p>{email.from}</p>
//               <p>{email.date}</p>
//               <p>{email.snippet}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No emails found.</p>
//       )}
//     </div>
//   );
// };

// export default EmailInbox;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const EmailList = () => {
//   const [emails, setEmails] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEmails = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/emails');
//         setEmails(response.data);
//       } catch (error) {
//         console.error('Error fetching emails:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmails();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-6">
//       <h2 className="text-2xl font-bold mb-6">Inbox</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {emails.length > 0 ? (
//           emails.map((email, index) => (
//             <div key={index} className="bg-white shadow-md rounded-lg p-4">
//               <h3 className="font-semibold text-lg">{email.subject}</h3>
//               <p className="text-gray-600">{email.from}</p>
//               <p className="text-gray-800">{email.date}</p>
//               <p className="text-gray-700 mt-2">{email.bodySnippet}</p>
//               <a href={`mailto:${email.from}`} className="text-blue-500 hover:underline mt-4 block">
//                 Reply
//               </a>
//             </div>
//           ))
//         ) : (
//           <div className="text-center col-span-full">
//             <p>No emails found.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmailList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/emails`);
        setEmails(response.data);
      } catch (error) {
        console.error('Error fetching emails:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Inbox</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {emails.length > 0 ? (
            emails.map((email, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{email.subject}</h3>
                  <p className="text-gray-600">{email.from}</p>
                  <p className="text-sm text-gray-500">{email.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-700">{email.bodySnippet}</p>
                  {/* <a
                    href={`mailto:${email.from}`}
                    className="text-blue-500 hover:underline mt-2 inline-block"
                  >
                    Reply
                  </a> */}
                  <a
  href={`mailto:${email.from}`}
  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out inline-block"
>
  Reply
</a>

                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <p>No emails found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailList;
