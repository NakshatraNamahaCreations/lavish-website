import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { getAuthAxios } from "../utils/api";
import Logo from "../assets/logo.png";

export default function AuthModal({ setIsModalOpen, onLoginSuccess }) {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await getAuthAxios().post("/auth/send-otp", { mobile });
      setIsNewUser(false);
      setStep(3); // Go to OTP step
    } catch (err) {
      const msg = err.response?.data?.message || "";
      if (
        msg.toLowerCase().includes("new") ||
        msg.toLowerCase().includes("not registered") ||
        msg.toLowerCase().includes("account is new")
      ) {
        setIsNewUser(true);
        setStep(2); // Ask for email
      } else {
        setError(msg || "Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Send OTP with email for new user
  const handleSendOtpWithEmail = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await getAuthAxios().post("/auth/send-otp", { mobile, email });
      setStep(3); // Go to OTP step
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = isNewUser ? { mobile, email, otp } : { mobile, otp };
      const response = await getAuthAxios().post("/auth/verify-otp", payload);
      const { accessToken, user } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setCredentials({ user, accessToken }));
      setIsModalOpen(false);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-20">
      <div className="bg-white py-6 px-6 rounded-lg shadow-lg w-full max-w-[400px] relative max-h-[90vh] overflow-y-auto">
        {/* <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-3 text-gray-500 text-lg"
        >
          ✖
        </button> */}
        <img src={Logo} alt="Logo" className="w-20 mx-auto mb-2" />
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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

        <p className="text-center text-sm mt-4 mb-2">
          By logging in you agree to our
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
}

// import { useState } from "react";
// import axios from "axios";
// import Logo from "../assets/logo.png";
// import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../features/auth/authSlice";
// import { getAuthAxios } from "../utils/api";

// export default function AuthModal({ setIsModalOpen, onLoginSuccess }) {
//   const [isSignup, setIsSignup] = useState(false);
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate()
//   const dispatch = useDispatch();
//   const toggleAuth = () => setIsSignup(!isSignup);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     const endpoint = isSignup
//       ? "/auth/register"  // Registration endpoint
//       : "/auth/login";    // Login endpoint

//     const payload = isSignup ? { email, mobile, password } : { email, password };

//     try {
//       const response = await getAuthAxios().post(endpoint, payload, { withCredentials: true });

//       if (isSignup) {
//         setIsSignup(false);
//       } else {
        // const { accessToken, user } = response.data;
        // localStorage.setItem("accessToken", accessToken);
        // localStorage.setItem("user", JSON.stringify(user));
        // dispatch(setCredentials({ user, accessToken }));
        // setIsModalOpen(false);

        // // Call onLoginSuccess callback if provided
        // if (onLoginSuccess) {
        //   onLoginSuccess();
        // }
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-20">
//       <div className="bg-white py-4 px-6 rounded-lg shadow-lg w-[400px] relative mt-10 max-h-screen overflow-y-auto">
//         <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-3 text-gray-500 text-lg">
//           ✖
//         </button>
//         <img src={Logo} alt="Logo" className="w-20 mx-auto" />
//         <h2 className="text-lg font-semibold text-center">{isSignup ? "Sign Up" : "Login"}</h2>

//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//         <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
//           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded-md" required />

//           {isSignup && (
//             <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)}
//               className="w-full p-2 border rounded-md" required />
//           )}

//           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded-md" required />

//           <button type="submit" disabled={loading} className="w-full bg-primary text-white p-2 rounded-lg hover:bg-purple-800">
//             {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
//           </button>
//         </form>

//         <div className="flex items-center my-4">
//           <hr className="flex-grow border-gray-300" />
//           <span className="px-2 text-gray-500">or</span>
//           <hr className="flex-grow border-gray-300" />
//         </div>



//         <p className="text-center text-sm mt-4">
//           By {isSignup ? "Signing up " : "Logging in"} you agree to our
//           <a href="/terms-conditions" target="_blank" className="text-blue-600 hover:underline"> Terms and Conditions</a> and
//           <a href="/privacy-policy" target="_blank" className="text-blue-600 hover:underline"> Privacy Policy</a>.
//         </p>


//         <p className="text-center text-sm mt-1">
//           {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
//           <button onClick={toggleAuth} className="text-blue-600 hover:underline">
//             {isSignup ? "Login" : "Sign Up"}
//           </button>
//         </p>
//       </div>

//     </div>
//   );
// }
