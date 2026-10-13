import React, { useEffect, useState } from "react";

import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAxios } from "../utils/api";
import CardCarousel from "./CardCarousel";
import { navigateToSubcategory } from "../utils/navigationsUtils";
import Breadcrumb from "./Breadcrumb";
import DynamicFaqs from "./DynamicFaqs";
import { Helmet } from "react-helmet-async";
import ExpandableContent from "./ExpandableContent";
import sash from "../assets/bday/add_ons/sash.png";
import welcomeboard from "../assets/bday/add_ons/welcomeboard.png";
import flwrbouqt from "../assets/bday/add_ons/flwrbouqt.png";
import photography from "../assets/bday/add_ons/photography.png";
import cakes from "../assets/bday/add_ons/cakes.png";

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
    serviceName: "Candyland Theme For Birthday Celebration",
    rating: "4.5",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%202/WhatsApp%20Image%202025-11-11%20at%203.48.05%20PM.jpeg",
  },
  {
    name: "Riya Sharma",
    review:
      "I had an amazing experience! The team was friendly, and the service was prompt and efficient. Will definitely use them again!",
 serviceName: "Rainbow Theme Decoration In Bangalore",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-10%20at%209.46.54%20PM.jpeg",
  },

  {
    name: "Neha Verma",
    review:
      "The quality of work was outstanding! The team was responsive, patient, and delivered exactly what I needed.",
   
    serviceName: "Mickey Mouse Birthday Decoration In Bangalore",
    rating: "4.7",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-09%20at%202.30.27%20PM.jpeg",
  },
  {
    name: "Pooja Singh",
    review:
      "Truly impressed! The entire process was smooth, and they ensured every detail was taken care of.",
   
    serviceName: "Car Theme Decoration In Bangalore",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-08%20at%2010.02.37%20PM.jpeg",
  },
  {
    name: "Sanjay Rao",
    review:
      "Great experience! The team was highly professional and completed the work before the deadline. Will recommend to everyone!",
 serviceName: "Peppa Pig Multi Colour Deco",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/WhatsApp%20Image%202025-09-22%20at%203.20.55%20PM.webp",
  },
  {
    name: "Meera Kapoor",
    review:
      "Exceptional service! They were quick to respond and delivered exactly what was promised. Will definitely hire again.",
 serviceName: "Baby Shark Theme Elegant Dec",
    rating: "4.5",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/WhatsApp%20Image%202025-09-21%20at%2010.35.02%20PM.webp",
  },
  {
    name: "Rohan Desai",
    review:
      "Reliable and professional! The team went above and beyond to ensure customer satisfaction. Highly recommended!",
  serviceName: "Jungle Theme Celebration",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/WhatsApp%20Image%202025-09-21%20at%204.26.59%20PM%20(1).webp",
  },
  {
    name: "Vikram Patel",
    review:
      "Absolutely fantastic service! They were thorough, detail-oriented, and made the whole process seamless. Five stars!",
   
    serviceName: "Dinosaur Theme Grand Decora",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/dakshak%202/WhatsApp%20Image%202025-08-20%20at%204.54.48%20PM.jpeg",
  },
 
];

const Kidsbirthday = () => {
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

  console.log("subSubCategories", subSubCategories);
  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const res = await getAxios().get(
          `/subcategories/by-name/${encodeURIComponent("Kids Birthday")}`
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

  const message = "Hello, I want to know more about kid's birthday Cakes.";
  const encodedMessage = encodeURIComponent(message);
  const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;

  const fetchSubSubcategoriesBySubCategory = async () => {
    if (!subcat_id) return;
    try {
      setLoading(true);
      const res = await getAxios().get(
        `/subsubcategories/subcategory/${subcat_id}`
      );
      setSubSubCategories(res.data.data);
      console.log("subSubCategories", res.data.data);
    } catch (err) {
      console.error("error", err);
      setError("Failed to load subcategories");
    } finally {
      setLoading(false);
    }
  };
  const fetchServices = async () => {
    try {
      const response = await getAxios().get(`/services/filter/${subcat_id}`);
      const data = response.data;

      if (data.success) {
        setAllServices(data.data); // <-- Set the array of services here
      } else {
        console.warn("API returned success: false");
        setAllServices([]); // Set to empty array if not successful
      }

      console.log("all data", data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          console.warn("No services found for this subcategory.");
          setAllServices([]); // Set to empty array on 404
          return;
        }
        console.error("Axios error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      setAllServices([]); // Set to empty array on error
    }
  };

  const checkForThemes = async (subSubCategoryId) => {
    try {
      const res = await getAxios().get(
        `/themes/subsubcategory/${subSubCategoryId}`
      );
      return res.data.data && res.data.data.length > 0;
    } catch (err) {
      console.error("Error checking themes:", err);
      return false;
    }
  };

  const handleSubSubCategoryClick = async (item) => {
    try {
      console.log("Checking themes for subSubCategoryId:", item._id);
      const hasThemes = await checkForThemes(item._id);
      console.log("Has themes:", hasThemes);

      if (hasThemes) {
        console.log("Navigating to themes page");
        // If themes exist, navigate to themes page
        navigate(`/themes/${item._id}`);
      } else {
        console.log("No themes found, navigating to services");

        const subCatSlug = item.subCategory.subCategory
          .toLowerCase()
          .replace(/\s+/g, "-");

        navigate(`/service/${subCatSlug}/${item._id}`);
      }
    } catch (err) {
      console.error("Error in navigation:", err);
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
      name: "Kids Birthday Decor",
      link: "/kidsbirthdaydecor/681b1136ddb6b3f4663e78f4",
    },
  ];

  return (
    <div className="lg:py-24 md:pt-20 pt-32  p-3  mx-auto">
      <Helmet>
        {/* Meta Tags */}
        <title>Kids Birthday Decoration in Bangalore | Fun Theme Setups</title>
        <meta
          name="description"
          content="Celebrate your child’s big day with exciting kids birthday decoration in Bangalore. Lavish Eventzz offers balloon arches, cartoon themes, games, and more."
        />
        <link
          rel="canonical"
          href="https://www.lavisheventzz.com/kidsbirthdaydecor/681b1136ddb6b3f4663e78f4"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Kids Birthday Decoration in Bangalore | Fun Theme Setups"
        />
        <meta
          property="og:description"
          content="Celebrate your child’s big day with exciting kids birthday decoration in Bangalore. Lavish Eventzz offers balloon arches, cartoon themes, games, and more."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.lavisheventzz.com/kidsbirthdaydecor/681b1136ddb6b3f4663e78f4"
        />
        <meta
          property="og:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/kidsbdayBanner1.png"
        />
        <meta property="og:site_name" content="Lavish Eventzz" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Kids Birthday Decoration in Bangalore | Fun Theme Setups"
        />
        <meta
          name="twitter:description"
          content="Celebrate your child’s big day with exciting kids birthday decoration in Bangalore. Lavish Eventzz offers balloon arches, cartoon themes, games, and more."
        />
        <meta
          name="twitter:url"
          content="https://www.lavisheventzz.com/kidsbirthdaydecor/681b1136ddb6b3f4663e78f4"
        />
        <meta
          name="twitter:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/kidsbdayBanner1.png"
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

        {/* Breadcrumb Schema */}
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
                name: "Kids Birthday Decor",
                item: "https://www.lavisheventzz.com/kidsbirthdaydecor/681b1136ddb6b3f4663e78f4",
              },
            ],
          })}
        </script>

        
      </Helmet>
      <Breadcrumb paths={breadcrumbPaths} />

      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl text-primary">Loading...</div>
        </div>
      )}

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div>
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/kidsbdayBanner1.png"
          className="mx-auto w-[1600px]"
        />
      </div>

      <h1 className="mt-10 font-bold text-center text-primary playfair-display lg:text-5xl text-2xl">
        Kids Birthday Decoration
      </h1>

      <div className="grid grid-cols-2 gap-x-12 md:gap-y-14 gap-y-5 md:place-items-center lg:mt-20 mt-10">
        {subSubCategories.map((item) => (
          <div className="relative" key={item._id}>
            <div
              onClick={() => handleSubSubCategoryClick(item)}
              className="cursor-pointer transition-shadow duration-300"
            >
              <img
                loading="lazy"
                decoding="async"
                src={`${item.image}`}
                alt={item.subSubCategory}
                className="rounded-3xl border-4 border-primary md:w-auto md:h-auto w-40 h-40"
              />
              <h4 className="text-primary pt-4 md:text-3xl text-xl text-center font-medium carter">
                {item.subSubCategory}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* <Link
        to={WhatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className="linkColorPink"
      >
        <div className="">
          <img
            loading="lazy"
            decoding="async"
            src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/kidscake.png"
            alt="Kid's Birthday Cakes"
            className="rounded-3xl border-4 border-primary md:w-auto md:h-auto w-40 h-40 mx-auto"
          />
          <h4 className=" text-primary pt-4 md:text-3xl  text-center font-medium carter">
            Kid's Birthday Cakes
          </h4>
        </div>
      </Link> */}

      <div className="mt-5 px-10">
        <div className="flex justify-between">
          <h5 className="linkColorPink lg:text-2xl text-primary font-bold playfair-display">
            All Decoration Service
          </h5>
          <div
            className="linkColorPink text-purple-600 underline text-sm font-semibold hover:text-blue-800 cursor-pointer"
           onClick={() => navigate("/all-services/681b1136ddb6b3f4663e78f4")}
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
          loading="lazy"
          decoding="async"
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
          #KidsBirthdayDecorationBestMovements
        </h2>
        <div className="flex justify-center items-center gap-1">
          <div className="place-items-end lg:space-y-2  space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery1.png"
              className=" lg:h-40 md:h-28 h-10"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery2.png"
              className=" lg:h-64  "
            />

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
              src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery4.png"
            />
          </div>
          <div className="lg:space-y-2 space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery5.png"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery6.png"
            />
          </div>
          <div>
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery7.png"
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
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/photoshootkidsBday.png"
          className="mx-auto w-[2000px]"
        />
      </div>

      <div className="">
        <h6 className="font-bold poppins md:py-6 pb-4 md:text-2xl">
          Why Celebrate With Lavisheventzz
        </h6>
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/kidsbdayBanner3.png"
          className="mx-auto w-[2000px]"
        />
      </div>
      {customerId && (
        <div className="md:pt-10 pt-7">
          <h6 className="font-bold poppins md:text-2xl">Recently Purchased</h6>
          <CardCarousel centercardData={serviceDetails} />
        </div>
      )}
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
        <h2 className="font-bold poppins md:text-2xl">
          Recent Customer Reviews
        </h2>
        <Testimonials reviewData={reviewData} />
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

export default Kidsbirthday;
