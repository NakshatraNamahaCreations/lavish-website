import { useState } from "react";
import axios from "axios";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { getAuthAxios } from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = "/auth/login";
    const payload = { email, password };

    try {
      const response = await getAuthAxios().post(endpoint, payload, {
        withCredentials: true,
      });

      // Handling response status and setting access token
      if (response.status === 200) {
        const { accessToken, user } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        dispatch(setCredentials({ user, accessToken }));
        console.log("Logged in User :", response.data);
        navigate("/");
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-36 p-4 flex justify-center items-center mx-auto">
      <div className="bg-white py-4 px-6 rounded-lg shadow-lg w-[400px] mx-auto relative max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white p-2 rounded-lg hover:bg-pink-600"
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate("/login-with-otp")}
          className="w-full mt-3 bg-gray-100 text-primary border border-primary p-2 rounded-lg hover:bg-primary hover:text-white transition"
        >
          Login with OTP
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* <div className="text-white flex justify-between gap-2">
                    <button className="flex gap-2 items-center bg-[#3B5998] p-4 py-2 flex-1 rounded-md text-white text-center">
                        <FaFacebookSquare /> Facebook Login
                    </button>
                    <button className="flex gap-2 items-center bg-[#DB4437] p-4 py-2 flex-1 rounded-md text-white text-center">
                        <FaGoogle /> Google Login
                    </button>
                </div> */}

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

        <p className="text-center text-sm mt-1">
          Don't have an account?
          <Link to="/signup" className="text-blue-600 hover:underline px-1">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
