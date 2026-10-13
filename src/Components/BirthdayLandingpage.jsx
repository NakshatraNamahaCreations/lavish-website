import React, { useEffect, useState } from "react";
import sash from "../assets/bday/add_ons/sash.png";
import welcomeboard from "../assets/bday/add_ons/welcomeboard.png";
import flwrbouqt from "../assets/bday/add_ons/flwrbouqt.png";
import photography from "../assets/bday/add_ons/photography.png";
import cakes from "../assets/bday/add_ons/cakes.png";
import FAQ from "./FAQ";
import { Helmet } from "react-helmet-async";
import Testimonials from "./Testimonials";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuthAxios, getAxios } from "../utils/api";
import CardCarousel from "./CardCarousel";
import { navigateToSubcategory } from "../utils/navigationsUtils";
import Breadcrumb from "./Breadcrumb"; // adjust path if needed
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ServiceSliderFrontend from "./BirthdaySliderFrontend";
import ReadMoreText from "./ReadMoreText";
import BirthdayBanner from "./BirthdayBanner";
import { FaArrowRight } from "react-icons/fa";
import Testimonials2 from "./Testimonials2";
import FAQ2 from "./FAQ2";
import WhatsappandCallFeature from "./WhatsappandCallFeature";
const addOns = [
  {
    src: sash,
    title: "Sash",
  },
  {
    src: welcomeboard,
    title: "Welcome Board",
  },
  {
    src: flwrbouqt,
    title: "Flower Bouquet",
  },
  {
    src: photography,
    title: "Photography",
  },
  {
    src: cakes,
    title: "Cakes",
  },
];

const staticSubSubCategories = [
  {
    _id: "1",
    image:
      "https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/Kids%20Birthday%20Banner/babyboyDecor.png",
    subSubCategory: "Baby Boy Decor",
  },
  {
    _id: "2",
    image:
      "https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/Kids%20Birthday%20Banner/babyGirlDeocr.png",
    subSubCategory: "Baby Girl Decor",
  },
  {
    _id: "3",
    image:
      "https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/Kids%20Birthday%20Banner/halfyrbabyDecor.png",
    subSubCategory: "Half Year Birthday Decor",
  },
  // {
  //   _id: "4",
  //   image: "/images/simpledecor.png",
  //   subSubCategory: "Simple Decoration",
  // },
];

const decorThemes = [
  {
    _id: "romantic-decor",
    image:
      "https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/ADULT%20BIRTHDAY%20THEME%20IMAGES/decor1.png",
    title: "Simple Decoration",
  },
  {
    _id: "baby-shower",
    image:
      "https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/ADULT%20BIRTHDAY%20THEME%20IMAGES/decor3.png",
    title: "Room Decoration",
  },
  {
    _id: "anniversary",
    image:
      "https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/ADULT%20BIRTHDAY%20THEME%20IMAGES/decor4.png",
    title: "Romantic Decoration",
  },
  {
    _id: "led-decor",
    image:
      "https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/ADULT%20BIRTHDAY%20THEME%20IMAGES/decor5.png",
    title: "Canopy Decoration",
  },
  {
    _id: "car-boot-surprise",
    image:
      "https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/ADULT%20BIRTHDAY%20THEME%20IMAGES/decor6.png",
    title: "Terrace Decoration",
  },
  {
    _id: "hotel-room-surprise",
    image:
      "https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/ADULT%20BIRTHDAY%20THEME%20IMAGES/decor7.png",
    title: "Mom Decoration",
  },
];

const reviewData = [
  {
    name: "Nisha Sharma",
    profileimg:
      "https://images.unsplash.com/photo-1601268588577-319223ba7cb3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review:
      "The service was exceptional! The team was professional, attentive, and delivered beyond our expectations. Highly recommended!",
    serviceName: "Barbie Theme Magical Decoration",
    rating: "4.5",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%202/WhatsApp%20Image%202025-11-14%20at%204.02.44%20PM.jpeg",
  },
  {
    name: "Riya Sharma",
    review:
      "I had an amazing experience! The team was friendly, and the service was prompt and efficient. Will definitely use them again!",
    profileimg:
      "https://images.unsplash.com/photo-1681717166573-f71589207785?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    serviceName: "Terrace Lantern Decoration",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-03%20at%2010.57.25%20PM.jpeg",
  },

  {
    name: "Neha Verma",
    review:
      "The quality of work was outstanding! The team was responsive, patient, and delivered exactly what I needed.",
    profileimg: "",
    serviceName: "Cocomelon Theme Decoration In Bangalore",
    rating: "4.7",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-10%20at%209.46.08%20PM.jpeg",
  },
  {
    name: "Pooja Singh",
    review:
      "Truly impressed! The entire process was smooth, and they ensured every detail was taken care of.",
    profileimg: "",
    serviceName: "Tom And Jerry Decoration In Bangalore",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-08%20at%2010.02.14%20PM.jpeg",
  },
  {
    name: "Sanjay Rao",
    review:
      "Great experience! The team was highly professional and completed the work before the deadline. Will recommend to everyone!",
    profileimg:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    serviceName: "Terrace Elegance Heart's Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/newp/new%20edi%20pics/ter/WhatsApp%20Image%202025-08-05%20at%2012.15.19%20AM.jpeg",
  },
  {
    name: "Meera Kapoor",
    review:
      "Exceptional service! They were quick to respond and delivered exactly what was promised. Will definitely hire again.",
    profileimg:
      "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    serviceName: "Kids Birthday Multi Colour Deco",
    rating: "4.5",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/WhatsApp%20Image%202025-09-21%20at%2011.12.15%20PM.webp",
  },
  {
    name: "Rohan Desai",
    review:
      "Reliable and professional! The team went above and beyond to ensure customer satisfaction. Highly recommended!",
    profileimg:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    serviceName: "Surprise Decoration In Bangalore	",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-01%20at%2010.08.48%20PM.jpeg",
  },
  {
    name: "Vikram Patel",
    review:
      "Absolutely fantastic service! They were thorough, detail-oriented, and made the whole process seamless. Five stars!",
    profileimg: "",
    serviceName: "Baby Shark Theme Elegant Deco	",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/WhatsApp%20Image%202025-09-21%20at%2010.35.02%20PM.webp",
  },
  // {
  //   name: "Priya Menon",
  //   review:
  //     "I am truly happy with the service provided! The attention to detail and quality were remarkable. Thank you!",
  //   profileimg:
  //     "https://images.unsplash.com/photo-1517265035603-faefa167335b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   serviceName: "Barbie Theme Decoration",
  //   rating: "4.5",
  //   servicethemeImg:
  //     "https://lavisheventzz-bangalore.b-cdn.net/Barbie%20Theme%20%20Charming%20Decor.jpg",
  // },
  // {
  //   name: "Ankit Joshi",
  //   review:
  //     "A wonderful experience! Everything was handled with professionalism and efficiency. Looking forward to working with them again.",
  //   profileimg:
  //     "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   serviceName: "Mehendi decoration",
  //   rating: "5.0",
  //   servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/Mehendi.png",
  // },
];

const BirthdayLandingpage = () => {
  const navigate = useNavigate();
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [recentPurchase, setRecentPurchase] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { subcat_id } = useParams();
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;
  const [services, setServices] = useState([]);

  console.log("subSubCategories", subSubCategories);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const images = [
    "https://lavisheventzz-bangalore.b-cdn.net/banner/adultBanner1.png",
    "https://lavisheventzz-bangalore.b-cdn.net/banner/kidsbdayBanner1.png",
  ];

  const fetchRecentPurchase = async () => {
    try {
      const response = await getAxios().get(
        `/orders/recent-orders/${customerId}`
      );
      const data = await response.data;
      setRecentPurchase(data.services);
    } catch (error) {
      console.error("Error fetching recent purchase:", error);
    }
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const handleImageClick = (item) => {
    setPopupData(item);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupData(null);
  };

  const handleNavigation = (text, baseRoute) => {
    navigateToSubcategory({
      text,
      baseRoute,
      navigate,
      setLoading,
      setError,
    });
  };

  useEffect(() => {}, [subcat_id]);

  useEffect(() => {
    const serviceDetails = recentPurchase?.map((item) => item.serviceDetails);
    setServiceDetails(serviceDetails);
  }, [recentPurchase]);

  useEffect(() => {
    fetchRecentPurchase();
  }, [customerId]);

  {
    /* Form */
  }
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

  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    { name: "Birthday Event ", link: "/birthday-event-planner-in-bangalore" },
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  const handleSubSubCategoryClick = (id) => {
    const clickedItem = subSubCategories.find((item) => item._id === id);
    setSelectedItem(clickedItem);
  };

  return (
    <>
      <Helmet>
        {/* Meta Tags */}
        <title>
          Birthday Event Planner in Bangalore | Custom Birthday Decorations
        </title>
        <meta
          name="description"
          content="Lavish Eventzz are your trusted birthday event planner in Bangalore, offering theme-based, balloon, color-themed and DIY home birthday decorations for all ages."
        />
        <link
          rel="canonical"
          href="https://www.lavisheventzz.com/birthday-event-planner-in-bangalore"
        />
        <meta
          name="keywords"
          content="Birthday Event Planner in Bangalore, Birthday Party Decoration Bangalore, Birthday Organizers in Bangalore, Birthday Event Management Bangalore, Kids Birthday Party Planners Bangalore, Baby birthday decoration services in Bangalore, Best birthday event planners for kids in Bangalore, Home birthday decoration services Bangalore, Themed birthday party organizers in Bangalore, Balloon decoration for birthday in Bangalore, Hire birthday planner near me Bangalore, Book birthday decoration services Bangalore"
        />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="Birthday Event Planner in Bangalore | Custom Birthday Decorations"
        />
        <meta
          property="og:description"
          content="Lavish Eventzz are your trusted birthday event planner in Bangalore, offering theme-based, balloon, color-themed and DIY home birthday decorations for all ages."
        />
        <meta
          property="og:url"
          content="https://www.lavisheventzz.com/birthday-event-planner-in-bangalore"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Lavish Eventzz" />
        <meta
          property="og:image"
          content="https://www.lavisheventzz.com/images/birthday-planner-banner.jpg"
        />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Birthday Event Planner in Bangalore | Custom Birthday Decorations"
        />
        <meta
          name="twitter:description"
          content="Lavish Eventzz are your trusted birthday event planner in Bangalore, offering theme-based, balloon, color-themed and DIY home birthday decorations for all ages."
        />
        <meta
          name="twitter:image"
          content="https://www.lavisheventzz.com/images/birthday-planner-banner.jpg"
        />
        <meta name="twitter:site" content="@LavishEvents25" />

        {/* JSON-LD: Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Lavish Eventzz",
            url: "https://www.lavisheventzz.com",
            logo: "https://www.lavisheventzz.com/assets/logo-CxQ2m41j.png",
            sameAs: [
              "https://www.facebook.com/people/Lavish-Eventzz/61577120475321/",
              "https://www.instagram.com/lavisheventzz.com_/",
              "https://x.com/LavishEvents25",
              "https://www.youtube.com/channel/UCvMX-R5xbMD4H8to1P4nbcQ",
            ],
            description:
              "Lavish Eventzz is a professional birthday event planner in Bangalore, offering theme-based, balloon, color-themed and DIY home birthday decorations.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91 9620558000",
              contactType: "Customer Service",
              areaServed: "IN",
            },
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Lavish Eventzz",
            image: "https://www.lavisheventzz.com/assets/logo-CxQ2m41j.png",
            url: "https://www.lavisheventzz.com",
            telephone: "+91 9620558000",
            priceRange: "₹₹",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "55, 17th Main Rd, RIEHS Layout, JC Nagar, Kurubarahalli",
              addressLocality: "Basaweshwara Nagar",
              addressRegion: "Bengaluru, Karnataka",
              postalCode: "560086",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 13.0034412361362,
              longitude: 77.5299534244018,
            },
            openingHours: "Mo-Su 00:00-23:59",
            description:
              "Lavish Eventzz is a birthday event planner in Bangalore providing custom decorations including theme-based, balloon, color-themed and home birthday setups.",
            sameAs: [
              "https://www.facebook.com/people/Lavish-Eventzz/61577120475321/",
              "https://www.instagram.com/lavisheventzz.com_/",
              "https://x.com/LavishEvents25",
              "https://www.youtube.com/channel/UCvMX-R5xbMD4H8to1P4nbcQ",
            ],
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Can I see samples or past work before booking?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Definitely! You can check our Instagram, website gallery, or request sample images based on your chosen theme.",
                },
              },
              {
                "@type": "Question",
                name: "Do you handle both setup and removal of the decorations?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, our team manages the full setup before the event and takes care of the dismantling afterward—completely hassle-free.",
                },
              },
              {
                "@type": "Question",
                name: "Is your decoration service available across all areas in Bangalore?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we provide birthday decoration services throughout Bangalore, covering homes, party halls, and outdoor venues.",
                },
              },
              {
                "@type": "Question",
                name: "Do you offer decoration for milestone birthdays like 1st or 18th?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we specialize in milestone birthday setups like 1st, 5th, 10th, 18th, and 50th with unique, personalized decor themes.",
                },
              },
              {
                "@type": "Question",
                name: "How early should I book your birthday decoration service?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We recommend booking at least 7–10 days in advance. However, we also accommodate last-minute requests based on availability.",
                },
              },
              {
                "@type": "Question",
                name: "Why should I choose Lavish Eventzz as my Birthday Event Planner in Bangalore?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We deliver creative, high-quality decorations with professional service and on-time setup—making us a top-rated birthday event planner in Bangalore.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide decoration services at home or only at venues?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We offer setup at both homes and venues. Be it a small living room or a large hall, we transform any space beautifully.",
                },
              },
              {
                "@type": "Question",
                name: "Can I customize the birthday theme as per my preference?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you can choose the theme, colors, props, and layout. We ensure the decor matches your exact vision and style.",
                },
              },
            ],
          })}
        </script>
      </Helmet>
      <div className=" fixed bottom-[100px] right-5 lg:flex flex-col gap-3 z-50">
        <WhatsappandCallFeature />
      </div>
      <div className="lg:py-24 md:pt-20 pt-32  p-3  mx-auto">
        <BirthdayBanner />
        <br />
        <br />
        <div className="bg-white p-6 md:p-10 rounded-xl  text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-4xl font-bold text-pink-700 mb-4">
            Top Birthday Event Planners in Bangalore
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            Picking the top birthday event planners in Bangalore makes your day
            stand out and stick in minds. These pros use new trends, your own
            style, and smooth plans for kids' bashes, big birthdays, and even
            surprise dos.
          </p>
        </div>

        {/* Kids grid image*/}
        <div className="bg-white p-6 md:p-10 rounded-xl  text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-4xl font-bold text-pink-700 mb-4">
            Kids Birthday
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 py-5">
          {staticSubSubCategories.map((item) => (
            <div className="text-center" key={item._id}>
              <div
                onClick={() => handleImageClick(item)}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.subSubCategory}
                  className="rounded-3xl border-4 border-primary w-80 h-80 mx-auto object-cover"
                />
                <p className="text-primary pt-4 text-xl font-semibold">
                  {item.subSubCategory}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Second Grid */}
        <div className="bg-white p-6 md:p-10 rounded-xl  text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-4xl font-bold text-pink-700 mb-4">
            Adults Birthday
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2 py-5">
          {decorThemes.map((item) => (
            <div className="relative" key={item._id}>
              <div
                onClick={() => handleImageClick(item)}
                className="cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-2xl w-100 h-80 mx-auto object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Popup Modal */}
        {isPopupOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl w-full max-w-md relative">
              <button
                onClick={closePopup}
                className="absolute top-5 right-5 text-gray-500 hover:text-black text-3xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-center text-primary">
                Contact Us
              </h2>
              <p className="text-center mb-4 font-medium">
                {popupData?.title || popupData?.subSubCategory}
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

        <div className="mt-16 px-16">
          <div className="flex items-center justify-center h-full">
            <p className="lg:text-4xl text-primary font-bold text-pink-700 mb-4">
              All Decoration Service
            </p>
          </div>
        </div>

        <ServiceSliderFrontend />

        {/* Add ons */}
        <div className="relative inset-0 flex flex-col items-center justify-center text-center gap-5 my-10">
          <img
            src="https://lavisheventzz-bangalore.b-cdn.net/banner/adultbanner4.png"
            alt="adultBanner4"
            className="w-[2000px] mx-auto "
          />
          <h2 className="absolute top-5 md:top-10 lg:text-4xl md:text-2xl text-xs font-bold text-[#761337] md:w-[50%]">
            Make It Unforgettable with Our Exclusive Add-Ons!
          </h2>

          <div className="absolute top-16 lg:top-48 md:top-32 grid grid-cols-5  lg:gap-5  gap-0 place-items-center px-3">
            {addOns.map((item, idx) => (
              <img
                key={idx}
                src={item.src}
                alt={item.title}
                className="cursor-pointer object-cover md:px-3 px-1"
              />
            ))}
          </div>
        </div>

        {/* gallery */}
        <div className="relative mx-auto text-center lg:mt-10">
          <p className="md:py-8 py-4 font-bold md:text-4xl">
            #LavishBirthdayVibes
          </p>
          <div className="flex justify-center items-center gap-1">
            <div className="place-items-end lg:space-y-2  space-y-1">
              <img
                src="https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/gallery1.png"
                className=" lg:h-40 md:h-28 h-10"
              />
              <img
                src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery2.png"
                className=" lg:h-64  "
              />
              <img
                src="https://lavisheventzz-bangalore.b-cdn.net/image.jpg"
                className=" lg:h-40 md:h-28 h-10 rounded-xl"
              />
            </div>
            <div>
              <img src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery4.png" />
            </div>
            <div className="lg:space-y-2 space-y-1">
              <img src="https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/gallery5.png" />
              <img src="https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/gallery6.png" />
            </div>
            <div>
              <img src="https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/gallery7.png" />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <p className="font-bold text-center pb-8 md:pb-12 md:text-4xl">
            Why Celebrate With Lavish Eventzz
          </p>
          <img
            src="https://lavisheventzz-bangalore.b-cdn.net/banner/trustedBanner.png"
            className="mx-auto w-[1600px]"
          />
        </div>

        <div>
          <p className="font-bold text-center py-12 pb-8 md:pb-12 md:text-4xl">
            Recent Customer Reviews
          </p>
          <Testimonials2 />
        </div>

        <div className="my-4 mt-10">
          <p className="text-center font-bold text-4xl">FAQs</p>
          <p className="text-center font-bold poppins text-sm">
            Need help? Contact us for any queries related to us
          </p>
          <div className="lg:w-[70%]  md:w-[80%] mx-auto my-6">
            <p className="font-bold poppins py-8 ">
              Pick a query related to your issue
            </p>
            <FAQ2 />
          </div>
        </div>
        <br />

        <br />
        <div className="mt-16" style={{ height: "400px" }}>
          <div className="bg-pink-700 text-white py-20 px-4 rounded-2xl max-w-6xl mx-auto text-center shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Plan an Unforgettable Birthday Party?
            </h2>
            <p className="text-white-600 text-xl mb-8">
              Let’s turn your celebration into a magical memory — from themed
              décor to flawless execution, we’ve got it all covered!
            </p>
            <a href="#contact-form">
              <button className="inline-flex items-center bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition duration-300">
                Book now
                <span className="ml-2 bg-pink-700 text-white p-2 rounded-full">
                  <FaArrowRight size={16} />
                </span>
              </button>
            </a>
          </div>
        </div>
        <br />
        <div className="bg-pink-50 text-center py-10 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            WHAT PEOPLE ARE SEARCHING FOR
          </h2>
          <p className="text-gray-800 leading-loose uppercase">
            birthday event planners in bangalore | birthday party planner in
            bangalore | birthday planners in bangalore | birthday party
            organisers bangalore | birthday organisers in bangalore | best
            birthday event planners in bangalore | best birthday event planners
            in bangalore | birthday event management in bangalore | event
            management companies in bangalore for birthday parties| birthday
            event organisers bangalore | best birthday party planners in
            bangalore | best birthday party organisers in bangalore | best
            birthday party organisers in bangalore | best birthday party
            organisers in bangalore | birthday party event organisers in
            bangalore | birthday planner at home bangalore | themed birthday
            party organisers bangalore
          </p>
        </div>

        <div className="p-12">
          <ReadMoreText title="Read More">
            <div className="mt-5 ms-lg-4 mx-3">
              <h2 className="text-pink-500 text-2xl font-semibold tracking-wide mb-2">
                Birthday Event Planners in Bangalore
              </h2>

              <p className="text-base  text-gray-700 leading-relaxed font-[Montserrat]">
                Looking for the best birthday party planner in Bangalore to turn
                your special day into an unforgettable celebration, At Lavish
                Eventzz, we specialize in crafting picture-perfect birthday
                parties with stunning themes, flawless execution, and memories
                that last a lifetime.
              </p>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                As one of the most trusted birthday planners in Bangalore, we
                bring creativity, professionalism, and joy to every
                event—whether it’s your baby’s first birthday or your
                grandparent’s 80th milestone.
              </p>
              <br />

              <h2 className="text-2xl font-bold text-gray-800 leading-snug mb-4 font-[Montserrat]">
                Why Choose Lavish Eventzz as Your Birthday Party Planner in
                Bangalore?
              </h2>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                Making a birthday bash is fun, but sorting out the place, look,
                guest list, fun, and food can soon be hard. That's when birthday
                event planners in Bangalore step in. They handle all from small
                home parties to big theme events with new and neat ways. They
                use their big contact list, top decor ideas, and years of
                know-how to make your dream come true with no fuss.
              </p>
              <h4 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-4 font-[Montserrat]">
                Top Birthday Event Planners in Bangalore
              </h4>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                Picking the top birthday event planners in Bangalore makes your
                day stand out and stick in minds. These pros use new trends,
                your own style, and smooth plans for kids' bashes, big
                birthdays, and even surprise dos.
              </p>
              <h4 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-4 font-[Montserrat]">
                Birthday Party Makers in Bangalore
              </h4>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                It doesn’t matter if you want simple balloons or luxury looks
                with fun and food. The birthday party makers in Bangalore have
                plans that fit all wallets. They help you get the best for what
                you can spend.
              </p>

              <br />

              <h2 className="text-2xl  font-bold text-gray-800 leading-snug mb-4 font-[Montserrat]">
                Our Work
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                <img
                  src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/WhatsApp%20Image%202025-06-21%20at%2011.39.23%20PM.jpeg"
                  alt="Image 1"
                  className="w-full h-80 object-cover rounded-md shadow"
                />
                <img
                  src="https://lavisheventzz-bangalore.b-cdn.net/House%20Warming%20Main%20Images/WhatsApp%20Image%202025-06-20%20at%2010.49.45%20AM.jpeg"
                  alt="Image 2"
                  className="w-full h-80 object-cover rounded-md shadow"
                />
                <img
                  src="https://lavisheventzz-bangalore.b-cdn.net/Kids%20Birthday%20Original%20Images/WhatsApp%20Image%202025-06-16%20at%206.37.54%20AM.jpeg"
                  alt="Image 3"
                  className="w-full h-80 object-cover rounded-md shadow"
                />
                <img
                  src="https://lavisheventzz-bangalore.b-cdn.net/Kids%20Birthday%20Original%20Images/WhatsApp%20Image%202025-06-17%20at%204.49.21%20PM.jpeg"
                  alt="Image 4"
                  className="w-full h-80 object-cover rounded-md shadow"
                />
              </div>
              <br />

              <h3 className="text-2xl mt-3  font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Themed Birthday Party Makers Bangalore
              </h3>
              <p className="text-base  text-gray-700 leading-relaxed font-[Montserrat]">
                If your kid wants a hero bash or you love a retro 90s party,
                themed birthday party makers in Bangalore are perfect. They set
                up all from start to theme with props, outfits, and cakes that
                go with the theme.
              </p>
              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Birthday Planner at Home Bangalore
              </h3>
              <p className="text-base  text-gray-700 leading-relaxed font-[Montserrat]">
                Fancy a snug do at home? A birthday planner at home in Bangalore
                can turn your living area or garden into a ready spot with cool
                decor, lights, and fun to match your place.
              </p>

              <h3 className="text-2xl mt-3  font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Event Handlers in Bangalore for Birthday
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                Top event teams in Bangalore for birthday dos give full help,
                from picking sites to gifts just for you. Their skill with plans
                and creative people makes sure all goes well.
              </p>

              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Great Birthday Party Makers in Bangalore for Kids & Adults
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                Be it a child's Peppa Pig bash or an adult's 50th party, the
                best birthday party makers in Bangalore plan right for the age
                with fun games, live acts, play spots, and host-led bits.
              </p>

              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Birthday Party Event Makers in Bangalore for Every Time
              </h3>
              <p className="text-base  text-gray-700 leading-relaxed font-[Montserrat]">
                From first to 25th years, birthday party event makers in
                Bangalore are pros at setting the right mood with decor, tunes,
                and cool moments, no matter the size or sort of the party.
              </p>
              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Our Birthday Event Planning Services in Bangalore
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                We set up birthdays in Bangalore, making sure every part fits
                your dream, plan, and style.
              </p>

              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Themed Birthday Party Setups in Bangalore
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                From jungle trips to Barbie scenes, our team is top at making
                themed birthday events in Bangalore that amaze kids and guests.
                Look for made-for-you back walls, balloon shapes, welcome
                boards, table looks, and cake setups that fit the style just
                right.
              </p>

              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Kids’ Birthday Party Setup in Bangalore
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                As a top pick for kid-party setup in Bangalore, we know what
                kids like! We bring in fun games, clowns, magic folk, mascots,
                cartoon folk, and fun play spots to keep the kids happy all
                through.
              </p>

              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Big & Adult Birthday Party Plans
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                Not just for kids—we plan grown-up birthday fun too, like
                surprise parties, fancy top-floor meals, 30th/40th/50th birthday
                styles, and family meets. If you're making a 25th birthday bash
                or a retro 60th, we'll make it look good and feel nice.
              </p>

              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Best Birthday Event Planners in Bangalore – Why We’re Trusted
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                When it comes to big life parties, Lavish Eventzz is known as a
                top-notch birthday planner in Bangalore. We do more than just
                set up - we tell stories, make memories, and solve problems.
                With lots of happy clients from many great events, many families
                in the city trust us.
              </p>

              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Top Rated Birthday Party Event Planners in Bangalore
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                People often rate us as a top planner. From Google reviews to
                friends telling friends, people know us for making big smiles
                and taking away planning stress.
              </p>
              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Creative Crew with Fun Ideas for All Ages
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                Every birthday is unique. From small kids' animal themes to cool
                teen setups, our creative team brings new ideas that fit your
                loved one’s style.
              </p>

              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Wide Network of Great Vendors in Bangalore
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                As leading birthday event organizers in Bangalore, we work with
                top entertainers, photographers, and more. This means top
                quality, good service, and fair prices for you.
              </p>

              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                On Time and On Point at Your Event
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                Good planning matters, but perfect action does too. Everything
                from setting the scene to the cake event happens right on
                schedule. Our team manages all, so you don’t need to worry.
              </p>

              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Indoor Places or Birthday Planner at Home Options
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                You like a fancy place or a sweet home party? We manage both.
                Knowing how to make even a small room look wonderful is our
                thing.
              </p>

              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                No Stress, Just Unforgettable Moments
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                At Lavish Eventzz, we aim for one simple thing: to cut your
                stress so you can enjoy the day with loved ones. That’s why we
                are known as amazing, creative, and always professional birthday
                event planners.
              </p>

              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Our 5-Step Process to Planning a Memorable Birthday Party
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                At Lavish Eventzz, we make parties easy with a plan that many
                families in the city trust. We are known as one of the top
                birthday party groups in Bangalore, and we take care of each
                part with fresh ideas and great effort.
              </p>

              {[
                "Idea & Talk",
                "Place & People Pick",
                "Theme Set & Decor",
                "Doing & Day Help",
                "Snapshots to Keep",
              ].map((title, i) => (
                <>
                  <h3 className="text-2xl mt-3  font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                    {i + 1}. {title}
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                    {
                      [
                        "We begin with a one-on-one talk. We listen to what you hope for, desired themes, the birthday person's age, and your money limit. Whether it's a small home party or a big one at a place, we plan it all at this time.",
                        "We help you find the best place and link you with top people for food, fun, thank-you gifts, and more. As a leading event team in Bangalore for birthdays, we work with trusted partners to make sure it all goes well.",
                        "From fun cartoons to lovely flowers, we make your theme real. Our decor folks design great back views, front gates, balloon sets, and your own photo spots—all made to fit your theme and impress your guests.",
                        "Leave the worry to us! On the day, our crew handles all—from setting up decor to greeting guests and working with vendors. We make sure each moment is on time, so you can have fun with your people.",
                        "Our pro photo and video folks catch every smile, dance, and candle blow. These memories will let you enjoy the fun for many years later.",
                      ][i]
                    }
                  </p>
                </>
              ))}
              <br />
              <h2 className="text-2xl font-bold text-gray-800 leading-snug mb-4 font-[Montserrat]">
                Popular Themes We Offer as Birthday Event Organisers in
                Bangalore
              </h2>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                As birthday party pros in Bangalore, we get that a good theme
                starts a great party. It could be for a small kid, teen, or
                grown-up, our team makes each idea real with cool décor, themed
                games, and fun set-ups.
              </p>
              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Jungle Safari
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                Turn your bash into a wild time with animal shapes, tree-like
                covers, and big drums. Great for little kids who love the wild.
              </p>
              <h3 className="text-2xl mt-3  font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Princess Castle
              </h3>
              <p className="text-base  text-gray-700 leading-relaxed font-[Montserrat]">
                A world of pink cloth, kingly backdrops, and a magic seat makes
                your little girl feel very special.
              </p>
              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Superhero Showdown
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                From Spider-Man to Batman, we make the best hero place with
                bright colors, comic art, and lots of action fun.
              </p>
              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Car & Racing Themes
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                Pump up the fun with track designs, race flags, and cool 3D car
                bits that keep young fast fans busy.
              </p>
              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Mermaid Fantasy
              </h3>
              <p className="text-base  text-gray-700 leading-relaxed font-[Montserrat]">
                Jump into the sea world with light colors, pearl bends, and sea
                creatures— perfect for those who love Ariel or sea magic.
              </p>
              <h3 className="text-2xl mt-3  font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Cocomelon
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                A hit for small ones, our Cocomelon set has bold colors, music
                bits, and known faces that make little ones smile.
              </p>
              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Gaming & Minecraft
              </h3>
              <p className="text-base  text-gray-700 leading-relaxed font-[Montserrat]">
                Big with tweens and teens, this theme has blocky styles, stick
                joysticks, and game-like set-ups that feel like the game life.
              </p>
              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Space Explorer
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                Fly off to a mix of stars, worlds, and rockets. This space theme
                makes you think and dream, great for kids who love science.
              </p>
              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Retro Bollywood
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                A fun old style with film rolls, old posters, and lights like
                Bollywood—nice for grown-ups or families that like the home
                vibe.
              </p>

              <br />
              <h2 className="text-2xl font-bold text-gray-800 leading-snug mb-4 font-[Montserrat]">
                Need Birthday Party Organisers in Bangalore at Home?
              </h2>
              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                No place to party? Don't worry! We take the fun right to your
                door.
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                At Lavish Eventzz, we're seen as the go-to for home birthday
                bash planning in Bangalore. Be it your living room, terrace, or
                garden in your flat—we can make any spot into a dreamy party
                place.
              </p>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                1. Cool balloon setups
              </p>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                2. Sweet cake display tables
              </p>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                3. Fancy entrance arches
              </p>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                4. Great photo spots
              </p>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                5. Cool gift setups
              </p>
              <h2 className="text-2xl font-bold text-gray-800 leading-snug mb-4 font-[Montserrat]">
                Best Birthday Party Organisers in Bangalore
              </h2>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                Top Places to Plan a Birthday in Bangalore – Plans for All Money
                Plans We think fun times should not have hidden costs. At Lavish
                Eventzz, we show clear prices, change plans as needed, and make
                each plan fit the people you invite and the kind of party you
                want. You can go for a low-key surprise at home or a big fancy
                event— we have choices for all.
              </p>
              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Small Group (10–30 Guests)
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                Good for small meet-ups at your house or a small spot. We pick
                warm decorations, simple but neat setups, and small fun acts
                like a magic show or puppet play. Best for little kid's
                birthdays and family-only parties.
              </p>
              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Mid-Size Party (50–100 Guests)
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                Works well for big room parties or high rooftop spots. Plans
                cover full space decoration, theme scenes, fun acts (clowns,
                games, tattoo makers), and a cake area set to match. You can ask
                for food spots and gifts to take home too.
              </p>
              <h3 className="text-2xl mt-3 font-bold text-gray-800 leading-snug mb-2 font-[Montserrat]">
                Large-Scale Event (100+ Guests)
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                Want a huge party? We handle it all—big stage often changes,
                light-up walls, hosts, spots for food, themed characters, and
                top-level decor. Great for very special birthdays and big group
                parties.
              </p>
              <p className="text-base text-gray-700 leading-relaxed font-[Montserrat]">
                <a href="https://www.lavisheventzz.com/contact">Contact us</a>{" "}
                today for a free consultation and discover why we're one of the
                best birthday event planners in Bangalore!
              </p>
            </div>
            <br />
            <p className="text-base text-gray-700 font-bold leading-relaxed font-[Montserrat] text-center">
              <a
                href="https://www.lavisheventzz.com/contact"
                className="text-blue-500"
              >
                Contact us today for a free consultation and discover why we're
                one of the best birthday event planners in Bangalore!
              </a>
            </p>
            <br />
          </ReadMoreText>
        </div>
      </div>
    </>
  );
};
export default BirthdayLandingpage;
