// LoadingSpinner.jsx
import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-[100vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
    );
};

export default Loading;
