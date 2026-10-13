// src/pages/PaymentFailure.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentData = location.state || {}; 

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="text-center p-6 rounded-lg shadow-xl bg-white">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Failed!
        </h1>
        <p className="text-lg text-gray-700">
          Your payment was not successful. Please try again.
        </p>
        <div className="mt-6">
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
