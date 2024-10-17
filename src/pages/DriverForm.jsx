// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import HomeButton from '../components/HomeButton';
// import BackButton from '../components/BackButton';

// const DriverForm = ({isEdit}) => {
//   const [driver, setDriver] = useState({
//     name: '',
//     licenseNumber: '',
//     certifications: [],
//     contactDetails: {
//       phoneNumber: '',
//       email: '',
//     },
//   });
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       // Fetch the driver data if editing
//       axios.get(`${import.meta.env.VITE_BACKEND_URL}api/drivers/${id}`, {
//         headers: {
//           Authorization: localStorage.getItem('token'),
//         },
//       })
//         .then(response => {
//           setDriver(response.data);
//         })
//         .catch(error => console.error('Error fetching driver:', error));
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDriver(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleContactChange = (e) => {
//     const { name, value } = e.target;
//     setDriver(prev => ({
//       ...prev,
//       contactDetails: {
//         ...prev.contactDetails,
//         [name]: value,
//       }
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isEdit) {
//       axios.put(`${import.meta.env.VITE_BACKEND_URL}api/drivers/${id}`, driver, {
//         headers: {
//           Authorization: localStorage.getItem('token'),
//         },
//       })
//         .then(() => {toast.success('Driver updated successfully!')})
//         .catch(error => console.error('Error updating driver:', error));
//     } else {
//       axios.post(`${import.meta.env.VITE_BACKEND_URL}api/drivers`, driver, {
//         headers: {
//           Authorization: localStorage.getItem('token'),
//         },
//       })
//         .then(() => { toast.success('Driver added successfully!')})
//         .catch(error => console.error('Error creating driver:', error));
//     }
//   };

//   return (
// <>
// <HomeButton/>
// <BackButton/>

// <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">{isEdit ? 'Edit Driver' : 'Add New Driver'}</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-6">
//           <label className="block mb-2 text-lg font-medium">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={driver.name}
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block mb-2 text-lg font-medium">License Number</label>
//           <input
//             type="text"
//             name="licenseNumber"
//             value={driver.licenseNumber}
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block mb-2 text-lg font-medium">Certifications</label>
//           <textarea
//             name="certifications"
//             value={driver.certifications.join(', ')}
//             onChange={(e) => setDriver(prev => ({
//               ...prev,
//               certifications: e.target.value.split(',').map(cert => cert.trim())
//             }))}
//             className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             rows="3"
//           />
//         </div>

//         <fieldset className="mb-6">
//           <legend className="text-xl font-semibold mb-2">Contact Details</legend>
//           <div className="mb-4">
//             <label className="block mb-2 text-lg font-medium">Phone Number</label>
//             <input
//               type="text"
//               name="phoneNumber"
//               value={driver.contactDetails.phoneNumber}
//               onChange={handleContactChange}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-2 text-lg font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={driver.contactDetails.email}
//               onChange={handleContactChange}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//         </fieldset>

//         <div className="flex justify-end mt-8">
//           <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
//             {isEdit ? 'Update Driver' : 'Add Driver'}
//           </button>
//         </div>
//       </form>
//     </div>
// </>
//   );
// };

// export default DriverForm;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import BackButton from '../components/BackButton';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DriverForm = ({ isEdit }) => {
  const [driver, setDriver] = useState({
    name: '',
    licenseNumber: '',
    certifications: [],
    contactDetails: {
      phoneNumber: '',
      email: '',
    },
  });
  const [phoneError, setPhoneError] = useState('');
  const [certificationInput, setCertificationInput] = useState(driver.certifications.join(', '));
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch the driver data if editing
      axios.get(`${import.meta.env.VITE_BACKEND_URL}api/drivers/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
        .then(response => {
          setDriver(response.data);
        })
        .catch(error => console.error('Error fetching driver:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setDriver(prev => ({
      ...prev,
      contactDetails: {
        ...prev.contactDetails,
        [name]: value,
      }
    }));
  };

  const handleCertificationsChange = (e) => {
    const inputValue = e.target.value;
    setCertificationInput(inputValue); // Store the raw input
    setDriver(prev => ({
      ...prev,
      certifications: inputValue.split(',').map(cert => cert.trim())
    }));
  };

  // Phone validation logic
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{11}$/; // Only allows exactly 10 digits
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate phone number before submission
    if (!validatePhoneNumber(driver.contactDetails.phoneNumber)) {
      setPhoneError('Phone number must be exactly 11 digits and only numbers are allowed, no alphabets please.');
      return; // Prevent form submission if the phone number is invalid
    }

    setPhoneError(''); // Clear error if valid

    if (isEdit) {
      axios.put(`${import.meta.env.VITE_BACKEND_URL}api/drivers/${id}`, driver, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
        .then(() => {
          //  toast.success('Driver updated successfully!') 
          navigate("/drivers")
          })
        .catch(error => console.error('Error updating driver:', error));
    } else {
      axios.post(`${import.meta.env.VITE_BACKEND_URL}api/drivers`, driver, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
        .then(() => { 
          navigate("/drivers")
          // toast.success('Driver added successfully!') 
        })
        .catch(error => {console.error('Error creating driver:', error)
          toast.error('"License Number" should be unique');
        });
    }
  };

  return (
    <>
      <HomeButton />
      <BackButton backto="/drivers"/>

      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">{isEdit ? 'Edit Driver' : 'Add New Driver'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={driver.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-lg font-medium">License Number</label>
            <input
              type="text"
              name="licenseNumber"
              value={driver.licenseNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            {/* <label className="block mb-2 text-lg font-medium">Certifications</label>
            <textarea
              name="certifications"
              value={driver.certifications.join(', ')}
              onChange={(e) => setDriver(prev => ({
                ...prev,
                certifications: e.target.value.split(',').map(cert => cert.trim())
              }))}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="3"
            /> */}
            <label className="block mb-2 text-lg font-medium">Certifications</label>
            <textarea
              name="certifications"
              value={driver.certifications} // Bind raw input state
              onChange={handleCertificationsChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="3"
            />
          </div>

          <fieldset className="mb-6">
            {/* <legend className="text-xl font-semibold mb-2">Contact Details</legend> */}
            <div className="mb-4">
              <label className="block mb-2 text-lg font-medium">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={driver.contactDetails.phoneNumber}
                onChange={handleContactChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {phoneError && <p className="text-red-500 mt-2">{phoneError}</p>}
            </div>

            <div>
              <label className="block mb-2 text-lg font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={driver.contactDetails.email}
                onChange={handleContactChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </fieldset>

          <div className="flex justify-end mt-8">
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
              {isEdit ? 'Update Driver' : 'Add Driver'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DriverForm;
