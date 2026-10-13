import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Thankyou = () => {
  const location = useLocation();
  const navigate = useNavigate();
//   const paymentData = location.state || {}; // Get payment data passed via the location state

  const handleGoHome = () => {
    navigate('/');
  };

  const handleViewOrder = () => {
    navigate('/profile'); // Navigate to the profile or orders page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md w-full">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Contacting us!</h1>
        <p className="text-gray-600 mb-4">Our Team will get in touch with you soon!</p>
    

        {/* Buttons to go home or view order */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleGoHome}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;

