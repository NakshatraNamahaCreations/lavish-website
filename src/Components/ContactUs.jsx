import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { getAuthAxios, getAxios } from "../utils/api";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "./Breadcrumb"; // adjust path if needed

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState({ success: null, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict 'name' to letters only (allowing spaces)
    if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    // Restrict 'phone' to digits only, max 10 digits
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: null, message: "" });

    try {
      const res = await getAuthAxios().post("/enquiries/create", formData);
      if (res.data.success) {
        setStatus({
          success: true,
          message: "Inquiry submitted successfully!",
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          message: "",
        });
      }
      alert("Inquiry submitted successfully!");
    } catch (err) {
      setStatus({
        success: false,
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };
  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    { name: "Contact Us", link: "/contact" },
  ];

  return (
    <>
      <div className="lg:pt-24 pt-28 mx-auto">
        <Breadcrumb paths={breadcrumbPaths} />
      </div>
      <div className="container md:pt-24 pt-32 px-2 mx-auto">
        {/* Primary Meta Tags */}
        <Helmet>
          <title>
            Contact Lavish Eventzz | Event Management Contact Bangalore
          </title>
          <meta
            name="description"
            content="Get in touch with Lavish Eventzz, your trusted event management partner in Bangalore. Reach out for weddings, parties, decor, and custom event needs."
          />
          <link rel="canonical" href="https://www.lavisheventzz.com/contact" />
          <meta
            name="keywords"
            content="Event Management Contact Bangalore, Bangalore Event Inquiry, Contact Event Organizers Bangalore, Book Event Services Bangalore, Schedule Event Planning Call, Event Booking Form Bangalore"
          />
          {/* Open Graph Tags */}
          <meta
            property="og:title"
            content="Contact Lavish Eventzz | Event Management Contact Bangalore"
          />
          <meta
            property="og:description"
            content="Get in touch with Lavish Eventzz, your trusted event management partner in Bangalore. Reach out for weddings, parties, decor, and custom event needs."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://www.lavisheventzz.com/contact"
          />
          <meta
            property="og:image"
            content="https://lavisheventzz-bangalore.b-cdn.net/contact.avif"
          />
          <meta property="og:site_name" content="Lavish Eventzz" />
          <meta property="og:locale" content="en_US" />

          {/* Twitter Card Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Contact Lavish Eventzz | Event Management Contact Bangalore"
          />
          <meta
            name="twitter:description"
            content="Get in touch with Lavish Eventzz, your trusted event management partner in Bangalore. Reach out for weddings, parties, decor, and custom event needs."
          />
          <meta
            name="twitter:url"
            content="https://www.lavisheventzz.com/contact"
          />
          <meta
            name="twitter:image"
            content="https://lavisheventzz-bangalore.b-cdn.net/contact.avif"
          />
          <meta name="twitter:site" content="@LavishEvents25" />

          {/* Organization Schema */}
          <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Lavish Eventzz",
            "url": "https://www.lavisheventzz.com",
            "logo": "https://www.lavisheventzz.com/assets/logo-sUNpuNY_.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-9620558000",
              "contactType": "Customer Service",
              "areaServed": "IN",
              "availableLanguage": "English"
            },
            "sameAs": [
              "https://www.facebook.com/people/Lavish-Eventzz/61577120475321/",
              "https://x.com/LavishEvents25",
              "https://www.youtube.com/@LavishEventzz-2025",
              "https://www.linkedin.com/in/lavish-eventzz-917b43366/",
              "https://www.instagram.com/lavisheventzz.com_/",
              "https://www.instagram.com/lavisheventzz"
            ]
          }
        `}</script>

          {/* Local Business Schema */}
          <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Lavish Eventzz",
            "url": "https://www.lavisheventzz.com",
            "logo": "https://www.lavisheventzz.com/assets/logo-sUNpuNY_.png",
            "description": "Get in touch with Lavish Eventzz, your trusted event management partner in Bangalore. Reach out for weddings, parties, decor, and custom event needs.",
            "telephone": "+91-9620558000",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "55, 17th Main Rd, RIEHS Layout, JC Nagar, Kurubarahalli, Basaweshwara Nagar",
              "addressLocality": "Bengaluru",
              "addressRegion": "Karnataka",
              "postalCode": "560086",
              "addressCountry": "IN"
            },
            "sameAs": [
              "https://www.facebook.com/people/Lavish-Eventzz/61577120475321/",
              "https://x.com/LavishEvents25",
              "https://www.youtube.com/@LavishEventzz-2025",
              "https://www.linkedin.com/in/lavish-eventzz-917b43366/",
              "https://www.instagram.com/lavisheventzz.com_/",
              "https://www.instagram.com/lavisheventzz"
            ],
            "openingHours": "Mo-Su 00:00-23:59",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "12.9155",
              "longitude": "77.5739"
            }
          }
        `}</script>
        </Helmet>

        <div className="lg:grid grid-cols-2 gap-20">
          <div className="lg:mt-28">
            <h1 className="md:text-8xl text-4xl font-bold">Contact</h1>
            <hr className="w-52 h-2 bg-primary my-2" />
            <p className="lg:text-2xl md:text-4xl text-2xl pb-3">
              Looking for top-tier and highly experienced décor professionals in
              Bangalore? Feel free to reach out!
            </p>
          </div>
          <div className="place-items-center p-4 md:p-10 lg:p-0">
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/contact.avif"
              className="shadow-[15px_20px_2px_black] md:w-[80%] md:h-[500px] object-cover"
              alt="Contact"
            />
          </div>
        </div>

        <div className="lg:grid grid-cols-2 gap-20 mt-20">
          <div className="mt-10">
            <h2 className="md:text-7xl text-6xl font-bold">Contact Info</h2>
            <div className="my-16 space-y-10">
              <div className="flex gap-10 md:px-10">
                <div className="border border-double border-primary p-1 rounded-full">
                  <FaPhoneAlt
                    size={60}
                    className="border border-primary text-primary rounded-full p-2"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Phone</h2>
                  <p className="text-xl pb-4">9620558000</p>
                </div>
              </div>
              <div className="flex gap-10 md:px-10">
                <div className="border border-double border-primary p-1 rounded-full">
                  <IoIosMail
                    size={60}
                    className="border border-primary text-primary rounded-full p-2"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Email</h2>
                  <p className="text-xl py-4">support@lavisheventzz.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-7xl font-medium poppins">
              We are here to Help You
            </h2>
            <form className="flex gap-4 flex-col mt-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name*"
                required
                value={formData.name}
                onChange={handleChange}
                className="outline-none p-4 text-xl border-b-2 border-black"
              />
              <input
                type="number"
                name="phone"
                placeholder="Phone*"
                required
                value={formData.phone}
                onChange={handleChange}
                className="outline-none p-4 text-xl border-b-2 border-black"
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                required
                value={formData.email}
                onChange={handleChange}
                className="outline-none p-4 text-xl border-b-2 border-black"
              />
              <input
                type="text"
                name="service"
                placeholder="Services you want"
                value={formData.service}
                onChange={handleChange}
                className="outline-none p-4 text-xl border-b-2 border-black"
              />
              <input
                type="text"
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="outline-none p-4 text-xl border-b-2 border-black"
              />
              <input
                type="submit"
                value="Submit"
                className="bg-primary text-white p-3 text-2xl poppins cursor-pointer"
              />

              {status.message && (
                <p
                  className={`mt-2 ${
                    status.success ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className=" mx-auto my-20 max-w-5xl gap-10 grid grid-cols-2 ">
        <a href="https://maps.app.goo.gl/aEWVGE9MdVBYx63UA" className="text-2xl flex items-center" target="__blank">
          55, 17th Main Rd, RIEHS Layout, JC Nagar, Kurubarahalli, Basaweshwara
          Nagar, Bengaluru, Karnataka 560086
        </a>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.50552127037!2d77.52737977381084!3d13.00344771418182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d106cba62bb%3A0xd63393e34f0b240a!2sLavish%20Eventzz!5e0!3m2!1sen!2sin!4v1756721773830!5m2!1sen!2sin"
          width="600"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        />

      </div>
    </>
  );
};

export default ContactUs;
