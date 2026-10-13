import React, { useEffect, useState } from "react";

import sash from "../assets/bday/add_ons/sash.png";
import welcomeboard from "../assets/bday/add_ons/welcomeboard.png";
import flwrbouqt from "../assets/bday/add_ons/flwrbouqt.png";
import photography from "../assets/bday/add_ons/photography.png";
import cakes from "../assets/bday/add_ons/cakes.png";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getAuthAxios, getAxios } from "../utils/api";
import CardCarousel from "./CardCarousel";
import { MdArrowRightAlt } from "react-icons/md";
import { navigateToSubcategory } from "../utils/navigationsUtils";
import Breadcrumb from "./Breadcrumb";
import DynamicFaqs from "./DynamicFaqs";
import ExpandableContent from "./ExpandableContent";

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
  // {
  //   src: cakes,
  //   title: "Cakes",
  // },
];

const reviewData = [
  {
    name: "Nisha Sharma",
 review:
      "The service was exceptional! The team was professional, attentive, and delivered beyond our expectations. Highly recommended!",
    serviceName: "Welcome Baby Decorations In Bangalore",
    rating: "4.5",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-08%20at%209.58.15%20PM.jpeg",
  },
  {
    name: "Riya Sharma",
    review:
      "I had an amazing experience! The team was friendly, and the service was prompt and efficient. Will definitely use them again!",
 serviceName: "Welcome Baby Boy Royal Entrance Deco",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/WhatsApp%20Image%202025-09-22%20at%203.17.19%20PM.webp",
  },

  {
    name: "Neha Verma",
    review:
      "The quality of work was outstanding! The team was responsive, patient, and delivered exactly what I needed.",
 
    serviceName: "Welcome Baby Royal Entrance Arch",
    rating: "4.7",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/Congrats%20Decor%20Add%20onn/WhatsApp%20Image%202025-08-25%20at%204.10.13%20PM.jpeg",
  },
  {
    name: "Pooja Singh",
    review:
      "Truly impressed! The entire process was smooth, and they ensured every detail was taken care of.",
  
    serviceName: "Twines Baby Elegant Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/Congrats%20Decor%20Add%20onn/WhatsApp%20Image%202025-08-27%20at%2011.30.08%20PM.jpeg",
  },
  {
    name: "Sanjay Rao",
    review:
      "Great experience! The team was highly professional and completed the work before the deadline. Will recommend to everyone!",
  serviceName: "Welcome Baby Cute Arch Deco",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/Mundan%20Ceremony/WhatsApp%20Image%202025-07-15%20at%2010.13.06%20PM%20(1).jpeg",
  },
  {
    name: "Meera Kapoor",
    review:
      "Exceptional service! They were quick to respond and delivered exactly what was promised. Will definitely hire again.",
  serviceName: "Welcome Baby Pastel Setup Deco",
    rating: "4.5",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/Mundan%20Ceremony/WhatsApp%20Image%202025-07-16%20at%203.55.57%20PM.jpeg",
  },
  {
    name: "Rohan Desai",
    review:
      "Reliable and professional! The team went above and beyond to ensure customer satisfaction. Highly recommended!",
  serviceName: "Welcome Baby Rainbow Theme",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/newp/new%20edi%20pics/WhatsApp%20Image%202025-08-04%20at%2010.36.49%20PM.jpeg",
  },
  {
    name: "Vikram Patel",
    review:
      "Absolutely fantastic service! They were thorough, detail-oriented, and made the whole process seamless. Five stars!",
 
    serviceName: "Welcome Girl Baby Neon Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/newp/WhatsApp%20Image%202025-07-27%20at%202.37.53%20PM.jpeg",
  },

];

const WelcomeBaby = () => {
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [recentPurchase, setRecentPurchase] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [subCategory, setSubCategory] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { subcat_id } = useParams();
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const res = await getAxios().get(
          `/subcategories/by-name/${encodeURIComponent(
            "Welcome Baby Decoration"
          )}`
        );
        setSubCategory(res.data.data); 
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchSubCategory();
  }, []);

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

  const message = "Hello, I want to know more about Welcome Baby's Cakes.";
  const encodedMessage = encodeURIComponent(message);
  const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;

  const fetchSubSubcategoriesBySubCategory = async () => {
    if (!subcat_id) return;
    try {
      const res = await getAxios().get(
        `/subsubcategories/subcategory/${subcat_id}`
      );
      setSubSubCategories(res.data.data);
      console.log("subSubCategories", res.data.data);
    } catch (err) {
      console.error("error", err);
      setError("Failed to load subcategories");
    }
  };

  const fetchServices = async () => {
    try {
      const response = await getAxios().get(`/services/filter/${subcat_id}`);

      const data = response.data;

      if (response.status === 404 || !data.success) {
        console.warn("No services found for this subcategory.");
        setAllServices([]);
        return;
      }

      console.log("data", data.data);
      setAllServices(data.data);
    } catch (error) {
      if (error.response?.status === 404) {
        console.warn("No services found for this subcategory (404).");
      } else {
        console.error("Error fetching services:", error.message || error);
      }
      setAllServices([]);
    }
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

  useEffect(() => {
    fetchSubSubcategoriesBySubCategory();
    fetchServices();
  }, [subcat_id]);

  useEffect(() => {
    const serviceDetails = recentPurchase?.map((item) => item.serviceDetails);
    setServiceDetails(serviceDetails);
  }, [recentPurchase]);

  useEffect(() => {
    fetchRecentPurchase();
  }, [customerId]);

  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    {
      name: "Welcome Baby Decoration",
      link: "/welcomebabydecor/681b1240ddb6b3f4663e794c",
    },
  ];

  return (
    <div className="lg:py-24  pt-32  p-3  mx-auto">
      <Helmet>
        {/* Meta Tags */}
        <title>
          Welcome Baby Decoration in Bangalore | Adorable Newborn Setup
        </title>
        <meta
          name="description"
          content="Celebrate your baby’s arrival with welcome baby decoration in Bangalore. Lavish Eventzz offers cute themes, balloon arches, cradles, and naming backdrop setups."
        />
        <link
          rel="canonical"
          href="https://www.lavisheventzz.com/welcomebabydecor/681b1240ddb6b3f4663e794c"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Welcome Baby Decoration in Bangalore | Adorable Newborn Setup"
        />
        <meta
          property="og:description"
          content="Celebrate your baby’s arrival with welcome baby decoration in Bangalore. Lavish Eventzz offers cute themes, balloon arches, cradles, and naming backdrop setups."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.lavisheventzz.com/welcomebabydecor/681b1240ddb6b3f4663e794c"
        />
        <meta
          property="og:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/welcomeBabybanner1.png"
        />
        <meta property="og:site_name" content="Lavish Eventzz" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Welcome Baby Decoration in Bangalore | Adorable Newborn Setup"
        />
        <meta
          name="twitter:description"
          content="Celebrate your baby’s arrival with welcome baby decoration in Bangalore. Lavish Eventzz offers cute themes, balloon arches, cradles, and naming backdrop setups."
        />
        <meta
          name="twitter:url"
          content="https://www.lavisheventzz.com/welcomebabydecor/681b1240ddb6b3f4663e794c"
        />
        <meta
          name="twitter:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/welcomeBabybanner1.png"
        />
        <meta name="twitter:site" content="@LavishEvents25" />

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Lavish Eventzz",
            url: "https://www.lavisheventzz.com",
            logo: "https://www.lavisheventzz.com/assets/logo-sUNpuNY_.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-9620558000",
              contactType: "Customer Service",
              areaServed: "IN",
              availableLanguage: "English",
            },
            sameAs: [
              "https://www.facebook.com/people/Lavish-Eventzz/61577120475321/",
              "https://x.com/LavishEvents25",
              "https://www.youtube.com/@LavishEventzz-2025",
              "https://www.linkedin.com/in/lavish-eventzz-917b43366/",
              "https://www.instagram.com/lavisheventzz.com_/",
              "https://www.instagram.com/lavisheventzz",
            ],
          })}
        </script>

        {/* Breadcrumbs Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.lavisheventzz.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Welcome Baby Decoration",
                item: "https://www.lavisheventzz.com/welcomebabydecor/681b1240ddb6b3f4663e794c",
              },
            ],
          })}
        </script>

  
      </Helmet>
      <Breadcrumb paths={breadcrumbPaths} />

      <div>
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/welcomeBabybanner1.png"
          className="mx-auto w-[1600px]"
        />
      </div>

      <h1 className="mt-10 font-bold text-center text-primary playfair-display lg:text-5xl text-2xl">
        Welcome Baby Decoration
      </h1>

      <div className="grid grid-cols-2 md:gap-10 gap-3   lg:mt-20 mt-10">
        {subSubCategories.map((item, idx) => (
          <div className="relative" key={item._id}>
            <Link
              to={`/service/${item.subCategory.subCategory
                .split(" ")
                .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
                .join("-")}/${item._id}`}
              className="linkColorPink"
            >
              <img
                loading="lazy"
                decoding="async"
                src={`${item.image}`}
                alt={item.subSubCategory}
                className="rounded-3xl mx-auto md:w-[400px] w-auto"
              />
            </Link>
            <h4 className="pt-4 md:text-3xl  text-primary text-center font-medium carter">
              {item.subSubCategory}
            </h4>
          </div>
        ))}
        {/* <Link
          to={WhatsAppLink}
          target="_blank"
          className="linkColorPink"
          rel="noopener noreferrer"
        >
          <div className="relative">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/welcomebabyCake.png"
              alt="Welcome baby cake"
              className="rounded-3xl mx-auto md:w-[400px] w-auto "
              key="Welcome baby cake"
            />
            <h4 className="pt-4 md:text-3xl  text-primary text-center font-medium carter">
              Welcome Baby Cake
            </h4>
          </div>
        </Link> */}
      </div>
      {/* Simple Decoration Section */}
      <div className="mt-5 px-10 py-10">
        <div className="flex justify-between">
          <h5 className="lg:text-2xl text-primary font-bold playfair-display">
            All Decoration Service
          </h5>
          <div
            className="linkColorPink text-purple-600 underline text-sm font-semibold hover:text-blue-800 cursor-pointer"
            // onClick={() => handleNavigation("Kids Birthday", "/service/")}
              onClick={() => navigate("/all-services/681b1240ddb6b3f4663e794c")}
          >
            View All
          </div>
        </div>

        {allServices.length > 0 ? (
          <CardCarousel centercardData={allServices} />
        ) : (
          <p className="text-gray-500 text-center mt-4">
            Simple Decoration Service Not Found
          </p>
        )}
      </div>
      {/* Add ons */}
      <div className="relative inset-0 flex flex-col items-center justify-center text-center gap-5 my-10">
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/adultbanner4.png"
          alt="adultBanner4"
          className="w-[2000px] mx-auto "
        />
        <h2 className="absolute top-5 md:top-10 lg:text-4xl md:text-2xl text-xs font-bold text-[#761337] playfair-display md:w-[50%]">
          Make It Unforgettable with Our Exclusive Add-Ons!
        </h2>

        <div className="absolute top-16 lg:top-48 md:top-32 grid grid-cols-4  lg:gap-5  gap-0 place-items-center px-3">
          {addOns.map((item, idx) => (
            <img
              loading="lazy"
              decoding="async"
              key={idx}
              src={item.src}
              alt={item.title}
              className="cursor-pointer object-cover md:px-3 px-1"
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto text-center lg:mt-10">
        <h2 className="md:py-8 py-4 font-bold poppins md:text-2xl">
          #WelcomeBabyDecorationBestMovements
        </h2>
        <div className="flex justify-center items-center gap-1">
          <div className="place-items-end lg:space-y-2  space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/baby1.png"
              className=" lg:h-40 md:h-28 h-10"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/baby2.png"
              className=" lg:h-64  "
            />
            {/* <div className=' bg-gray-600 relative overflow-hidden rounded md:h-20 md:w-36 lg:w-auto lg:h-auto h-8 w-16'>
                            <img src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery3.png" className='rounded' />
                            <video
                                className='absolute top-0 left-0 w-full h-full object-cover opacity-80'
                                src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/video.mp4"
                                autoPlay
                                loop
                                muted
                            />
                        </div> */}
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/image.jpg"
              className=" lg:h-40 md:h-28 h-10 rounded-xl"
            />
          </div>
          <div>
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/baby4.png"
            />
          </div>
          <div className="lg:space-y-2 space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/baby5.png"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/baby6.png"
            />
          </div>
          <div>
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/baby7.png"
            />
          </div>
        </div>
        <p className="lg:absolute bottom-10 right-2 [text-shadow:_-4px_4px_3px_#7D7C7C] playfair-display md:text-7xl text-4xl font-bold text-[#FFD1D1]">
          Magical Moments
        </p>
      </div>

      <div
        className="md:pt-20 py-5"
        onClick={() => handleNavigation("photography", "/photography-service")}
      >
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/photoshootbaby.png"
          className="mx-auto w-[2000px]"
        />
      </div>

      {customerId && (
        <div className="md:pt-10 pt-7">
          <h6 className="font-bold poppins md:text-2xl">Recently Purchased</h6>
          <CardCarousel centercardData={serviceDetails} />
        </div>
      )}
      <div className="">
        <h6 className="font-bold poppins md:py-6 pb-4 md:text-2xl">
          Why Celebrate With Lavisheventzz
        </h6>
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/trustedBanner.png"
          className="mx-auto w-[1600px]"
        />
      </div>
      <div className="my-4">
        <p className="text-center font-bold poppins text-2xl">FAQs</p>

        <p className="text-center font-bold poppins text-sm">
          Need help? Contact us for any queries related to us
        </p>
        <div className="lg:w-[70%]  md:w-[80%] mx-auto my-6">
          <p className="font-bold poppins py-8 ">
            Pick a query related to your issue
          </p>
          <FAQ />
          {/* <FAQServices/> */}
        </div>
      </div>
      <div>
        <h2 className="font-bold poppins md:text-2xl">Recent Customer Reviews</h2>
        <Testimonials reviewData={reviewData}/>
        {/* <ReviewSlider /> */}
      </div>
      
      {subCategory?.caption && (
        <div className="mt-5 p-5 md:px-10 px-4">
          <ExpandableContent htmlContent={subCategory.caption} />
        </div>
      )}
      {subCategory?.faqs?.length > 0 && (
        <div className="max-w-3xl p-4 mx-auto">
          <h4 className="text-center font-bold poppins text-2xl">FAQs</h4>
          <p className="text-center font-bold poppins text-sm pb-5">
            Need help? Contact us for any queries related to us
          </p>
          <DynamicFaqs faqs={subCategory?.faqs} />
        </div>
      )}
    </div>
  );
};

export default WelcomeBaby;
