import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { getAuthAxios } from "../utils/api";

const LoginwithNumber = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' or 'error'

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showMessage = (msg, type = "error") => {
    setStatusMessage(msg);
    setStatusType(type);
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setLoading(true);
    try {
      const response = await getAuthAxios().post("/auth/send-otp", { mobile });
      showMessage(response.data.message, "success");
      setIsNewUser(false);
      setStep(3);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send OTP";
      if (
        msg.toLowerCase().includes("new") ||
        msg.toLowerCase().includes("not registered") ||
        msg.toLowerCase().includes("account is new")
      ) {
        setIsNewUser(true);
        setStep(2);
      } else {
        showMessage(msg, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Send OTP with email for new user
  const handleSendOtpWithEmail = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setLoading(true);
    
    try {
      const response = await getAuthAxios().post("/auth/send-otp", { mobile, email });
      showMessage(response.data.message, "success");
      setStep(3);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send OTP";
      showMessage(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setLoading(true);
    try {
      const payload = isNewUser ? { mobile, email, otp } : { mobile, otp };
      const response = await getAuthAxios().post("/auth/verify-otp", payload);
      showMessage("Login successful", "success");

      const { accessToken, user } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setCredentials({ user, accessToken }));
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid OTP";
      showMessage(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white py-4 px-6 rounded-lg shadow-lg w-[400px] mx-auto relative max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        {statusMessage && (
          <p
            className={`text-sm text-center mb-2 ${
              statusType === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {statusMessage}
          </p>
        )}

        {step === 1 && (
          <form className="mt-4 space-y-4" onSubmit={handleSendOtp}>
            <input
              type="tel"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/, ""))}
              className="w-full p-2 border rounded-md"
              maxLength={10}
              pattern="[0-9]{10}"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white p-2 rounded-lg hover:bg-pink-600"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="mt-4 space-y-4" onSubmit={handleSendOtpWithEmail}>
            <input
              type="tel"
              value={mobile}
              disabled
              className="w-full p-2 border rounded-md bg-gray-100"
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white p-2 rounded-lg hover:bg-pink-600"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
            <button
              type="button"
              className="w-full text-blue-600 underline text-sm mt-2"
              onClick={() => {
                setStep(1);
                setIsNewUser(false);
                setEmail("");
              }}
            >
              Change Number
            </button>
          </form>
        )}

        {step === 3 && (
          <form className="mt-4 space-y-4" onSubmit={handleVerifyOtp}>
            <input
              type="tel"
              value={mobile}
              disabled
              className="w-full p-2 border rounded-md bg-gray-100"
            />
            {isNewUser && (
              <input
                type="email"
                value={email}
                disabled
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            )}
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
              className="w-full p-2 border rounded-md"
              maxLength={6}
              pattern="[0-9]{6}"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white p-2 rounded-lg hover:bg-pink-600"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              className="w-full text-blue-600 underline text-sm mt-2"
              onClick={() => {
                setStep(isNewUser ? 2 : 1);
                setOtp("");
              }}
            >
              {isNewUser ? "Change Email" : "Change Number"}
            </button>
          </form>
        )}

        <p className="text-center text-sm mt-4">
          By logging in, you agree to our
          <a
            href="/terms-conditions"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            {" "}
            Terms and Conditions
          </a>{" "}
          and
          <a
            href="/privacy-policy"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            {" "}
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginwithNumber;


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../features/auth/authSlice";
// import { getAuthAxios } from "../utils/api";

// const LoginwithNumber = () => {
//   const [step, setStep] = useState(1);
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isNewUser, setIsNewUser] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Step 1: Send OTP
//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const response = await getAuthAxios().post("/auth/send-otp", { mobile });
//       console.log("response otp", response.data.message);
//       setIsNewUser(false);
//       setStep(3); // Go to OTP step
//     } catch (err) {
//       // Check if error is due to new user
//       const msg = err.response?.data?.message || "";
//       if (
//         msg.toLowerCase().includes("new") ||
//         msg.toLowerCase().includes("not registered") ||
//         msg.toLowerCase().includes("account is new")
//       ) {
//         setIsNewUser(true);
//         setStep(2); // Ask for email
//       } else {
//         setError(msg || "Failed to send OTP");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Send OTP with email for new user
//   const handleSendOtpWithEmail = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       await getAuthAxios().post("/auth/send-otp", { mobile, email });
//       setStep(3); // Go to OTP step
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 3: Verify OTP
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const payload = isNewUser ? { mobile, email, otp } : { mobile, otp };
//       const response = await getAuthAxios().post("/auth/verify-otp", payload);
//       const { accessToken, user } = response.data;
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("user", JSON.stringify(user));
//       dispatch(setCredentials({ user, accessToken }));
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center p-4">
//       <div className="bg-white py-4 px-6 rounded-lg shadow-lg w-[400px] mx-auto relative max-h-screen overflow-y-auto">
//         <h2 className="text-2xl font-semibold text-center">Login</h2>
//         {statusMessage && (
//           <p
//             className={`text-sm text-center mb-2 ${
//               statusType === "success" ? "text-green-600" : "text-red-500"
//             }`}
//           >
//             {statusMessage}
//           </p>
//         )}

//         {step === 1 && (
//           <form className="mt-4 space-y-4" onSubmit={handleSendOtp}>
//             <input
//               type="tel"
//               placeholder="Enter Mobile Number"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value.replace(/\D/, ""))}
//               className="w-full p-2 border rounded-md"
//               maxLength={10}
//               pattern="[0-9]{10}"
//               required
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-primary text-white p-2 rounded-lg hover:bg-pink-600"
//             >
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//           </form>
//         )}

//         {step === 2 && (
//           <form className="mt-4 space-y-4" onSubmit={handleSendOtpWithEmail}>
//             <input
//               type="tel"
//               value={mobile}
//               disabled
//               className="w-full p-2 border rounded-md bg-gray-100"
//             />
//             <input
//               type="email"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-primary text-white p-2 rounded-lg hover:bg-pink-600"
//             >
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//             <button
//               type="button"
//               className="w-full text-blue-600 underline text-sm mt-2"
//               onClick={() => {
//                 setStep(1);
//                 setIsNewUser(false);
//                 setEmail("");
//               }}
//             >
//               Change Number
//             </button>
//           </form>
//         )}

//         {step === 3 && (
//           <form className="mt-4 space-y-4" onSubmit={handleVerifyOtp}>
//             <input
//               type="tel"
//               value={mobile}
//               disabled
//               className="w-full p-2 border rounded-md bg-gray-100"
//             />
//             {isNewUser && (
//               <input
//                 type="email"
//                 value={email}
//                 disabled
//                 className="w-full p-2 border rounded-md bg-gray-100"
//               />
//             )}
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
//               className="w-full p-2 border rounded-md"
//               maxLength={6}
//               pattern="[0-9]{6}"
//               required
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-primary text-white p-2 rounded-lg hover:bg-pink-600"
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//             <button
//               type="button"
//               className="w-full text-blue-600 underline text-sm mt-2"
//               onClick={() => {
//                 setStep(isNewUser ? 2 : 1);
//                 setOtp("");
//               }}
//             >
//               {isNewUser ? "Change Email" : "Change Number"}
//             </button>
//           </form>
//         )}

//         <p className="text-center text-sm mt-4">
//           By logging in, you agree to our
//           <a
//             href="/terms-conditions"
//             target="_blank"
//             className="text-blue-600 hover:underline"
//           >
//             {" "}
//             Terms and Conditions
//           </a>{" "}
//           and
//           <a
//             href="/privacy-policy"
//             target="_blank"
//             className="text-blue-600 hover:underline"
//           >
//             {" "}
//             Privacy Policy
//           </a>
//           .
//         </p>
//             </div>
//     </div>
//   );
// };

// export default LoginwithNumber;
