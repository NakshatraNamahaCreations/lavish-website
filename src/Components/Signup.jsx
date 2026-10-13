import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { getAuthAxios } from "../utils/api";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
     const authAxios = getAuthAxios()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // const endpoint = "http://localhost:5000/api/auth/register";
        const payload = { email, mobile, password };

        try {
            const response = await authAxios.post("/auth/register", payload, { withCredentials: true });
            const { accessToken, user } = response.data;

            if (response.status === 201) {
                localStorage.setItem("accessToken", accessToken);
                dispatch(setCredentials({ user, accessToken }));
                console.log("Signed up User :", response.data);
                navigate("/profile");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container mt-36 md:mt-0 p-4 flex justify-center items-center md:h-screen mx-auto'>
            <div className="bg-white py-4 px-6 rounded-lg shadow-lg w-[400px] mx-auto relative max-h-screen overflow-y-auto">
                <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

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
                        type="text" 
                        placeholder="Mobile Number" 
                        value={mobile} 
                        onChange={(e) => setMobile(e.target.value)}
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
                        className="w-full bg-primary text-white p-2 rounded-lg hover:bg-pink-600">
                        {loading ? "Processing..." : "Sign Up"}
                    </button>
                </form>

                <div className="flex items-center my-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

      

                <p className="text-center text-sm mt-4">
                    By signing up, you agree to our
                    <a href="/terms-conditions" target="_blank" className="text-blue-600 hover:underline"> Terms and Conditions</a> and
                    <a href="/privacy-policy" target="_blank" className="text-blue-600 hover:underline"> Privacy Policy</a>.
                </p>

                <p className="text-center text-sm mt-1">
                    Already have an account?
                    <Link to="/login" className="px-2 text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
