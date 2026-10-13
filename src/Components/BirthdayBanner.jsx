import React, { useState } from "react";
import { getAuthAxios, getAxios } from "../utils/api";
import { Link, useNavigate } from 'react-router-dom';
export default function BirthdayBanner() {
    const navigate = useNavigate()
    const authAxios = getAuthAxios();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
    });

    const [status, setStatus] = useState({ success: null, message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^\d{10}$/;
        if (!formData.name || !formData.phone || !phoneRegex.test(formData.phone)) {
            setStatus({
                success: false,
                message: "Please enter a valid name and 10-digit phone number.",
            });
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await authAxios.post("/enquiries/create", formData);
            if (response.status === 201) {
                setStatus({
                    success: true,
                    message: "Form submitted successfully!",
                });
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    service: "",
                    message: "",
                });
                navigate("/")
                
            } else {
                setStatus({
                    success: false,
                    message: "Something went wrong. Please try again.",
                });
            }
        } catch (error) {
            setStatus({
                success: false,
                message: "Submission failed. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="contact-form"
            className="relative bg-black text-white min-h-screen flex items-center justify-center px-6 slider-wrapper"
            style={{
                paddingTop: "40px",
                minHeight: "90vh",
                backgroundImage: `url('/images/BirthdayBanner.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay for blur and dark effect */}
            <div
                className="absolute inset-0"
                style={{
                    backdropFilter: "blur(8px)",         // Blur the background
                    backgroundColor: "rgba(0, 0, 0, 0.6)", // Darken the background
                    zIndex: 1,
                }}
            ></div>
            <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-8 items-center">
                {/* LEFT CONTENT */}
                <div className="space-y-6">
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                        Birthday Event Planners in Bangalore
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                        Looking for the best birthday party planner in Bangalore to turn your special day into an unforgettable celebration, At Lavish Eventzz, we specialize in crafting picture-perfect birthday parties with stunning themes, flawless execution, and memories that last a lifetime.
                    </p>

                    <div className="flex gap-4">

                        <link rel="stylesheet" href="" />
                        <Link
                            to="tel:+91 9620558000"
                            className="bg-white text-black px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition"
                        >        Call Now 📞
                        </Link>
                        <Link
                            to="/contact"
                            className="bg-pink-600 px-6 py-2 text-white rounded-full hover:bg-indigo-700 transition"
                        >    Contact Us
                        </Link>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex justify-center px-4 sm:px-6 md:px-8 py-8">
                    <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-xl shadow-lg">
                        <h3 className="text-xl sm:text-2xl font-semibold mb-5 text-gray-800 text-center">Let’s Connect</h3>

                        <form onSubmit={handleSubmit} className="space-y-4 text-gray-500">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                            <input
                                type="text"
                                name="service"
                                placeholder="Services you want"
                                value={formData.service}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                required
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us more about your event..."
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-pink-500 text-white py-3 rounded-md text-sm font-semibold hover:bg-pink-600 transition disabled:opacity-50"
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>

                            {status.message && (
                                <p className={`text-sm mt-2 text-center ${status.success ? "text-green-600" : "text-red-500"}`}>
                                    {status.message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
