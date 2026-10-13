import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { IoMailSharp, IoCallSharp } from "react-icons/io5";
import facebook from "../assets/icons/Facebook.png";
import instagram from "../assets/icons/Instagram.png";
import linkedin from "../assets/icons/LinkedIn.png";
import pintrest from "../assets/icons/Pinterest.png";
import x from "../assets/icons/twitter.png";
import youtube from "../assets/icons/YouTube.png";
import { Link, useNavigate } from "react-router-dom";
import CancellationPolicy from "./CancellationPolicy";
import { API_BASE_URL, getAxios } from "../utils/api";

const iconsArray = [
  { name: "Facebook", icon: facebook, link: "https://www.facebook.com" },
  {
    name: "Instagram",
    icon: instagram,
    link: "https://www.instagram.com/lavisheventzz.com_/?igsh=Z2I5cGhtcG15dWRr#",
  },
  {
    name: "Linkedin",
    icon: linkedin,
    link: "https://www.linkedin.com/in/lavish-events-917b43366/",
  },
  {
    name: "Pintrest",
    icon: pintrest,
    link: "https://www.pinterest.com/lavishevents450/",
  },
  { name: "X", icon: x, link: "https://x.com/LavishEvents25" },
  {
    name: "Youtube",
    icon: youtube,
    link: "https://www.youtube.com/channel/UCvMX-R5xbMD4H8to1P4nbcQ",
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    setSubmitting(true); // Set submitting to true when the form is submitted

    try {
      const response = await fetch(`${API_BASE_URL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false); // Set submitting to false once done
    }
  };

  return (
    <div className="bg-gray-200 relative font-medium pb-6">
      {/* Hero section */}
      <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1200px] rounded-xl">
        <div className="relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1681488068521-8912e7d5d5fd?q=80&w=1483&auto=format&fit=crop"
            className="h-[200px] w-full object-cover rounded-xl"
            alt="Decor"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <p className="text-lg sm:text-xl py-2 font-semibold">
              Want creative and beautiful decorations for your events?
            </p>
            <p className="text-md">Contact us today!</p>
            <button
              className="bg-primary px-4 py-2 mt-2 rounded-md text-sm sm:text-base"
              onClick={() => handleNavigation("/contact")}
            >
              Message
            </button>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="mt-[250px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-36 px-6 sm:px-10">
        <div>
          <img src={Logo} className="w-32" alt="Lavish Eventzz Logo" />
          <p className="pt-4 font-bold text-primary  playfair-display text-lg sm:text-xl">
            Lavish Eventzz
          </p>
          <p className="max-w-72 montserrat text-sm sm:text-base text-gray-600">
            Trust us to bring your dreams to life with our creative expertise
            and seamless execution. We create memories!
          </p>
        </div>

        <div>
          <p className="font-bold text-black montserrat text-lg sm:text-xl">
            Quick links
          </p>
          <div className="flex gap-6 flex-wrap sm:flex-nowrap text-gray-600">
            <ul className="flex flex-col gap-3 py-3 text-sm sm:text-base cursor-pointer">
              <li onClick={() => handleNavigation("/")}>Home</li>
              <li onClick={() => handleNavigation("/about")}>About Us</li>
              <li onClick={() => handleNavigation("/contactus")}>Contact Us</li>
              <li onClick={() => handleNavigation("/profile")}>Profile</li>
              {/* <li onClick={toggleModal}>Terms & Conditions</li> */}
              <li onClick={() => handleNavigation("/terms-conditions")}>
                Terms & Conditions
              </li>
              <li onClick={() => handleNavigation("/privacy-policy")}>
                Privacy Policy
              </li>
              <li onClick={() => handleNavigation("/return-refund")}>
                Return & Refund Policy
              </li>
              <li onClick={() => handleNavigation("/shipping-delivery")}>
                Shipping & delivery Policy
              </li>
            </ul>

            <CancellationPolicy isOpen={isOpen} toggleModal={toggleModal} />
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <p className="font-bold text-black montserrat pb-3 text-lg sm:text-xl">
            Contact with us!
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="mailto:support@lavisheventzz.com?subject=Enquiry%20about%20Services&body=Hi%20Lavish%20Eventzz%2C%0A%0AI'm%20interested%20in%20your%20event%20decor%20services.%20Please%20get%20back%20to%20me.%0A%0AThanks!"
              className="flex gap-2 items-center text-sm sm:text-base text-black hover:text-blue-600"
            >
              <IoMailSharp /> support@lavisheventzz.com
            </a>

            <a
              href="tel:+919620558000"
              className="flex gap-2 items-center text-sm sm:text-base text-black hover:text-blue-600"
            >
              <IoCallSharp /> +91 9620558000
            </a>
            {/* <a href="" className=' mb-8 flex gap-2 items-center text-sm sm:text-base text-black hover:text-blue-600'>
                            <FaLocationDot /> #55 17th main road JC Nagar Kurubharahalli Bangalore 560086
                        </a> */}
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="text-lg sm:text-xl">
              We want to host the event of your life!
            </p>
            <p className="pb-2 satisfy text-sm sm:text-base">
              Contact us today
            </p>
            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 sm:p-3 outline-none border-none rounded-lg w-full sm:w-auto"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-1 rounded-lg"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
            {submitted && (
              <p className="text-green-600 text-sm mt-2">
                Thank you! We'll contact you soon.
              </p>
            )}
          </div>
        </div>
      </div>

      <hr className="h-1 my-10 bg-white opacity-50" />

      <div className="pb-10 flex justify-center flex-col items-center text-xl sm:text-2xl gap-5">
        <p className="text-black">Spread the smile</p>
        <div className="flex gap-4 sm:gap-5 text-black">
          {iconsArray.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={item.icon} alt={item.name} className="w-10 md:w-12" />
            </a>
          ))}
        </div>
      </div>
      <Link to="https://www.nakshatranamahacreations.com/" target="__blank" ><p className="text-center pb-6">© Nakshatra Namaha Creations. 2025. All rights reserved. </p></Link>
    </div>
  );
};

export default Footer;
