import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
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
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">Your payment has been successfully processed.</p>
        
        {/* Display payment details */}
        {/* <div className="mb-4"> */}
          {/* <p className="text-md text-gray-800 font-semibold">Transaction ID: {paymentData.transactionId}</p>
          <p className="text-md text-gray-800 font-semibold">Amount: ₹{paymentData.amount}</p> */}
          {/* <p className="text-md text-gray-800 font-semibold">Transaction ID: 345353454354</p>
          <p className="text-md text-gray-800 font-semibold">Amount: ₹20000</p>
        </div> */}

        {/* Buttons to go home or view order */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleGoHome}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
          >
            Back to Home
          </button>
          <button
            onClick={handleViewOrder}
            className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaCheckCircle } from "react-icons/fa";

// const Thankyou = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
//             <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md w-full">
//                 <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
//                 <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank you for your order!</h1>
//                 <p className="text-gray-600 mb-4">Your booking has been successfully placed.</p>


//                 <div className="flex justify-center gap-4 mt-6">
//                     <button
//                         onClick={() => navigate("/")}
//                         className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
//                     >
//                         Back to Home
//                     </button>
//                     <button
//                         onClick={() => navigate("/profile")}
//                         className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition"
//                     >
//                         View My Orders
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Thankyou;
