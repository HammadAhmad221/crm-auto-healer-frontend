import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

const SubmitConditionReport = () => {
  const {loadId} = useParams();
  const navigate = useNavigate();
    const [pickupPhotos, setPickupPhotos] = useState([]);
    const [deliveryPhotos, setDeliveryPhotos] = useState([]);

    const handleFileChange = (e, setPhotos) => {
        setPhotos(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pickupPhotos.length === 0 && deliveryPhotos.length === 0) {
          alert('Please select at least one photo for both pickup and delivery.');
          return;
      }
        const driverId = localStorage.getItem("driverId");

        const formData = new FormData();
        formData.append('driverId', driverId);
        formData.append('loadId', loadId);

        for (let i = 0; i < pickupPhotos.length; i++) {
            formData.append('pickupPhotos', pickupPhotos[i]);
        }

        for (let i = 0; i < deliveryPhotos.length; i++) {
            formData.append('deliveryPhotos', deliveryPhotos[i]);
        }

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/reports/submit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Condition report submitted successfully!');
            navigate('/assigned-loads')
        } catch (error) {
            console.error('Error submitting condition report:', error);
            alert('Failed to submit condition report. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Submit Condition Report</h2>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-lg" htmlFor="pickupPhotos">Pickup Condition Photo:</label>
                <input type="file" id="pickupPhotos" multiple onChange={(e) => handleFileChange(e, setPickupPhotos)} />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-lg" htmlFor="deliveryPhotos">Delivery Condition Photo:</label>
                <input type="file" id="deliveryPhotos" multiple onChange={(e) => handleFileChange(e, setDeliveryPhotos)} />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Report</button>
        </form>
    );
};

export default SubmitConditionReport;
