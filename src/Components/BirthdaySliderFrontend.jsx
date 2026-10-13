import React, { useState } from "react";
import Slider from "react-slick";
import { IoIosStar, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAuthAxios, getAxios } from "../utils/api";
import { useNavigate } from "react-router-dom";

const BirthdaySliderFrontend = () => {
  const mockItems = [
    {
      id: 1,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/canopy%20decoration%20image/Romantic%20Special%20Decor.jpeg",
      ],
      serviceName: "Romantic Special Decor",
      offerPrice: 3199,
    },
    {
      id: 2,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/Premium%20decor%20image/Pastel%20Paradise%20Birthday%20Decor.jpeg",
      ],
      serviceName: "Pastel Paradise's Birthday Decor",
      offerPrice: 7399,
    },
    {
      id: 3,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/Premium%20decor%20image/Luxe%20Party%20Decor.jpeg",
      ],
      serviceName: "Luxe's Gold Party Decor",
      offerPrice: 7399,
    },
    {
      id: 4,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/Premium%20decor%20image/Party%20Sequence%20Decoration.jpeg",
      ],
      serviceName: "Party Sequence Decoration",
      offerPrice: 7699,
    },
    {
      id: 5,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/Simple%20decor%20image/Dazzling%20Hbd%20Wall%20Decor.jpeg",
      ],
      serviceName: "Dazzling Hbd Wall Decor",
      offerPrice: 1779,
    },
    {
      id: 6,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/canopy%20decoration%20image/Canopy%20Tent%20Decoration.jpeg",
      ],
      serviceName: "Canopy Tent Decoration",
      offerPrice: 4244,
    },
    {
      id: 7,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/Lets%20Party%20Decor%20Add%20O%20n/WhatsApp%20Image%202025-07-07%20at%2011.01.54%20AM%20(1).jpeg",
      ],
      serviceName: "Wall Decor For Birthday",
      offerPrice: 1999,
    },
    {
      id: 8,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/Mundan%20Ceremony/Mundan%20Ceremony%20Addons/WhatsApp%20Image%202025-07-18%20at%2011.55.03%20PM.jpeg",
      ],
      serviceName: "Hbd Metalic Balloon Decor",
      offerPrice: 2499,
    },
    {
      id: 9,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/First%20Night/First%20Night%20Addoons/WhatsApp%20Image%202025-07-05%20at%209.43.00%20AM.jpeg",
      ],
      serviceName: "Sweet Surprise Decor",
      offerPrice: 1599,
    },
    {
      id: 10,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/First%20Night/First%20Night%20Addoons/WhatsApp%20Image%202025-07-05%20at%207.40.43%20AM.jpeg",
      ],
      serviceName: "Room Surprise Lite Decor",
      offerPrice: 1599,
    },
    {
      id: 11,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/Premium%20decor%20image/Birthday%20Home%20Decoration%20-%20Copy.jpeg",
      ],
      serviceName: "Birthday Home Decoration",
      offerPrice: 4499,
    },
    {
      id: 12,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/Kids%20Birthday%20Original%20Images/WhatsApp%20Image%202025-06-16%20at%205.35.37%20PM.jpeg",
      ],
      serviceName: "Aeroplane Theme Magical Decor",
      offerPrice: 2799,
    },
    {
      id: 13,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/Kids%20Birthday%20Original%20Images/WhatsApp%20Image%202025-06-16%20at%205.35.38%20PM.jpeg",
      ],
      serviceName: "Hot Air Theme Budget Friendly Deco",
      offerPrice: 3199,
    },
    {
      id: 14,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/new%20pics/WhatsApp%20Image%202025-07-23%20at%2011.53.38%20PM.jpeg",
      ],
      serviceName: "Sweet Candy Land Decor",
      offerPrice: 3199,
    },
    {
      id: 15,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/Kids%20Birthday%20Original%20Images/WhatsApp%20Image%202025-06-16%20at%2012.40.33%20PM.jpeg",
      ],
      serviceName: "Honey Bee Theme Elegant Decor",
      offerPrice: 5299,
    },
    {
      id: 16,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/Ring%20Ceremony%20Main%20Images/WhatsApp%20Image%202025-06-30%20at%2012.02.48%20AM.jpeg",
      ],
      serviceName: "Simple Kids Theme",
      offerPrice: 2399,
    },
    {
      id: 17,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/Kids%20Birthday%20Original%20Images/WhatsApp%20Image%202025-06-16%20at%2010.04.02%20AM.jpeg",
      ],
      serviceName: "Flower Theme Luxury Decor",
      offerPrice: 10999,
    },
    {
      id: 18,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/Kids%20Birthday%20Original%20Images/WhatsApp%20Image%202025-06-16%20at%207.05.52%20AM.jpeg",
      ],
      serviceName: "Flaming Theme Budget Friendly Deco",
      offerPrice: 6999,
    },
    {
      id: 19,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/Kids%20Birthday%20Original%20Images/WhatsApp%20Image%202025-06-16%20at%207.20.09%20AM.jpeg",
      ],
      serviceName: "Tropical Flamingo Birthday Party",
      offerPrice: 5499,
    },
    {
      id: 20,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/Kids%20Birthday%20Original%20Images/WhatsApp%20Image%202025-06-16%20at%206.46.15%20AM.jpeg",
      ],
      serviceName: "Candy Land Beautiful Ring Decor",
      offerPrice: 8499,
    },
    {
      id: 21,
      images: [
        "https://lavisheventzz-bangalore.b-cdn.net/Kids%20Birthday%20Original%20Images/WhatsApp%20Image%202025-06-16%20at%206.58.39%20AM.jpeg",
      ],
      serviceName: "Flamingo Theme Magical Decor",
      offerPrice: 6499,
    },
  ];

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute z-20 top-1/2 right-[-10px] transform -translate-y-1/2 cursor-pointer text-primary"
      onClick={onClick}
    >
      <IoIosArrowForward size={32} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute z-20 top-1/2 left-[-10px] transform -translate-y-1/2 cursor-pointer text-primary"
      onClick={onClick}
    >
      <IoIosArrowBack size={32} />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleBookNow = (item) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  {
    /*FORM*/
  }

  const authAxios = getAuthAxios();
  const navigate = useNavigate();
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
    <div className="relative py-10 px-5">
      <Slider {...settings}>
        {mockItems.map((item) => (
          <div key={item.id} className="px-3">
            <div className="mx-auto h-[420px] bg-white max-w-xs shadow-xl rounded-lg mt-5 z-10">
              <div className="md:px-4 md:pt-4 p-2 border-2 rounded-lg h-full">
                <img
                  src={item.images[0]}
                  alt={item.serviceName}
                  className="rounded-lg mb-2 w-full h-[70%] object-cover"
                />
                <div className="text-center">
                  <p className="text-sm md:text-base">{item.serviceName}</p>
                  <div className="flex gap-1 justify-center items-center py-2 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <IoIosStar size={16} key={i} />
                    ))}
                  </div>
                  <div className="flex gap-2 justify-between items-center px-4">
                    <p className="font-bold text-sm md:text-xl">
                      Rs. {item.offerPrice}
                    </p>
                    <button
                      className="bg-primary rounded-md px-3 py-1 md:px-5 md:py-2 font-semibold text-white text-sm"
                      onClick={() => handleBookNow(item)} // fixed: pass item
                    >
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md relative">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-5 right-5 text-gray-500 hover:text-black text-3xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4 text-center text-primary">
              Contact Us
            </h2>

            <p className="text-center mb-4 font-medium">
              Theme:{" "}
              <span className="font-semibold text-gray-700">
                {selectedItem?.serviceName}
              </span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="service"
                placeholder="Services you want"
                className="w-full p-2 border rounded"
                value={formData.service}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your event..."
                rows="3"
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink-500 text-white py-3 rounded-md font-semibold hover:bg-pink-600 transition disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              {/* Feedback Message */}
              {status.message && (
                <p
                  className={`text-sm mt-2 ${
                    status.success ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthdaySliderFrontend;
