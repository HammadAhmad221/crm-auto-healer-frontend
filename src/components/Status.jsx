import React, { useState } from 'react';

const Status = ({ initialStatus, onStatusChange }) => {
    const [status, setStatus] = useState(initialStatus);

    const handleChange = async (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
        try {
            await onStatusChange(newStatus); // Notify parent component about the status change
        } catch (error) {
            console.error('Error updating status:', error);
            // Optionally handle error (e.g., show an success or revert status)
        }
    };

    return (
        <select 
            value={status} 
            onChange={handleChange} 
            className="px-4 py-2 border rounded"
        >
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Pending">Pending</option>
        </select>
    );
};

export default Status;
