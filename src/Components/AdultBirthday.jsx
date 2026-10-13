import React, { useEffect, useState } from "react";
import sash from "../assets/bday/add_ons/sash.png";
import welcomeboard from "../assets/bday/add_ons/welcomeboard.png";
import flwrbouqt from "../assets/bday/add_ons/flwrbouqt.png";
import photography from "../assets/bday/add_ons/photography.png";
import cakes from "../assets/bday/add_ons/cakes.png";
import FAQ from "./FAQ";
import { Helmet } from "react-helmet-async";
import Testimonials from "./Testimonials";
import {
  Link,
  useNavigate,
  useParams,
  useLocation,
  redirect,
} from "react-router-dom";
import { getAuthAxios, getAxios } from "../utils/api";
import CardCarousel from "./CardCarousel";
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
    serviceName: "Romantic Love Canopy Decoration",
    rating: "4.5",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%202/WhatsApp%20Image%202025-11-12%20at%203.18.25%20PM.jpeg",
  },
  {
    name: "Riya Sharma",
    review:
      "I had an amazing experience! The team was friendly, and the service was prompt and efficient. Will definitely use them again!",
   
    serviceName: "Terrace Lantern Decoration",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-03%20at%2010.57.25%20PM.jpeg",
  },

  {
    name: "Neha Verma",
    review:
      "The quality of work was outstanding! The team was responsive, patient, and delivered exactly what I needed.",

    serviceName: "Multicolour Balloon Ring Setup",
    rating: "4.7",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/WhatsApp%20Image%202025-09-21%20at%2011.12.15%20PM.webp",
  },
  {
    name: "Pooja Singh",
    review:
      "Truly impressed! The entire process was smooth, and they ensured every detail was taken care of.",
   
    serviceName: "Canopy Love Setup Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/Lets%20Party%20Decor%20Add%20O%20n/WhatsApp%20Image%202025-07-06%20at%204.47.42%20PM.jpeg",
  },
  {
    name: "Sanjay Rao",
    review:
      "Great experience! The team was highly professional and completed the work before the deadline. Will recommend to everyone!",
    serviceName: "Terrace Elegance Heart's Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/newp/new%20edi%20pics/ter/WhatsApp%20Image%202025-08-05%20at%2012.15.19%20AM.jpeg",
  },
  {
    name: "Meera Kapoor",
    review:
      "Exceptional service! They were quick to respond and delivered exactly what was promised. Will definitely hire again.",
    serviceName: "Sweet Wall Surprise's Decor",
    rating: "4.5",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/dakshak/WhatsApp%20Image%202025-08-12%20at%2010.21.49%20PM.jpeg",
  },
  {
    name: "Rohan Desai",
    review:
      "Reliable and professional! The team went above and beyond to ensure customer satisfaction. Highly recommended!",
    serviceName: "Surprise Decoration In Bangalore	",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-01%20at%2010.08.48%20PM.jpeg",
  },
  {
    name: "Vikram Patel",
    review:
      "Absolutely fantastic service! They were thorough, detail-oriented, and made the whole process seamless. Five stars!",
    serviceName: "Hbd Celebration Setup",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/dakshak/WhatsApp%20Image%202025-08-12%20at%2010.04.05%20PM.jpeg",
  },
  
];

const AdultBirthday = () => {
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [recentPurchase, setRecentPurchase] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [subCategory, setSubCategory] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { subcat_id } = useParams();
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;
  const location = useLocation();

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

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const res = await getAxios().get(
          `/subcategories/by-name/${encodeURIComponent("Adult Birthday")}`
        );
        setSubCategory(res.data.data); // ✅ note .data.data
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchSubCategory();
  }, []);

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

      if (response.status === 404) {
        console.warn("No services found for this subcategory.");
        setAllServices([]);
        return;
      }

      if (data.success) {
        console.log("data", data.data);
        setAllServices(data.data);
      } else {
        console.warn("API returned success: false");
        setAllServices([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("No services found (404).");
        setAllServices([]);
      } else {
        console.error("Error fetching services:", error.message);
      }
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
      name: "Birthday Decoration",
      link: "/birthdaydecoration/681b113eddb6b3f4663e78f9",
    },
  ];

  return (
    <div className="lg:py-24 md:pt-20 pt-32  p-3  mx-auto">
      <Helmet>
        {/* Meta Tags */}
        <title>
          Birthday Decoration in Bangalore | Home & Balloon Birthday Decor
        </title>
        <meta
          name="description"
          content="Book stunning birthday decoration in Bangalore today. From balloon decoration for birthday at home to premium terrace parties, we offer birthday decoration starting at ₹1999."
        />
        <link
          rel="canonical"
          href="https://www.lavisheventzz.com/birthdaydecoration/681b113eddb6b3f4663e78f9"
        />

        <meta
          name="keywords"
          content="Birthday Decoration in Bangalore,
Birthday Decoration at Home in Bangalore,
Balloon Decoration for Birthday Bangalore
"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Birthday Decoration in Bangalore | Stylish Party Setup"
        />
        <meta
          property="og:description"
          content="Celebrate in style with birthday decoration in Bangalore by Lavish Eventzz. Choose from elegant, bold, or themed setups for a fun, unforgettable night."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.lavisheventzz.com/birthdaydecoration/681b113eddb6b3f4663e78f9"
        />
        <meta
          property="og:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/adultBanner1.png"
        />
        <meta property="og:site_name" content="Lavish Eventzz" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Birthday Decoration in Bangalore | Stylish Party Setup"
        />
        <meta
          name="twitter:description"
          content="Celebrate in style with adult birthday decoration in Bangalore by Lavish Eventzz. Choose from elegant, bold, or themed setups for a fun, unforgettable night."
        />
        <meta
          name="twitter:url"
          content="https://www.lavisheventzz.com/birthdaydecoration/681b113eddb6b3f4663e78f9"
        />
        <meta
          name="twitter:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/adultBanner1.png"
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
                name: "Birthday Decor",
                item: "https://www.lavisheventzz.com/birthdaydecoration/681b113eddb6b3f4663e78f9",
              },
            ],
          })}
        </script>
      </Helmet>
      <Breadcrumb paths={breadcrumbPaths} />

      <div>
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/adultBanner1.png"
          alt="Banner"
          className="mx-auto w-[1600px]"
          decoding="async"
          fetchpriority="high"
        />
      </div>
      <h1 className="mt-10 font-bold text-center text-primary playfair-display lg:text-5xl text-2xl">
        Birthday Decoration
      </h1>

      <div className="grid grid-cols-2 md:gap-10 gap-3 place-items-center lg:my-10 my-5 ">
        {subSubCategories.map((item) => (
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
                src={item.image}
                alt={item.subSubCategory}
                className="rounded-3xl"
              />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-5 px-10">
        <div className="flex justify-between">
          <h5 className="lg:text-2xl text-primary font-bold playfair-display">
            All Decoration Service
          </h5>
          <div
            className="linkColorPink text-purple-600 underline text-sm font-semibold hover:text-blue-800 cursor-pointer"
            onClick={() => handleNavigation("Adult birthday", "/service/")}
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
          alt="Banner4"
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

      {/* gallery */}
      <div className="relative mx-auto text-center lg:mt-10">
        <h2 className="md:py-8 py-4 font-bold poppins md:text-2xl">
          #BirthdayDecorationBestMovements
        </h2>
        <div className="flex justify-center items-center gap-1">
          <div className="place-items-end lg:space-y-2  space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/gallery1.png"
              alt="gallery1"
              className=" lg:h-40 md:h-28 h-10"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/gallery2.png"
              alt="gallery2"
              className=" lg:h-64  "
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/image.jpg"
              alt="image"
              className=" lg:h-40 md:h-28 h-10 rounded-xl"
            />
          </div>
          <div>
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/gallery4.png"
              alt="gallery4"
            />
          </div>
          <div className="lg:space-y-2 space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/gallery5.png"
              alt="gallery5"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/gallery6.png"
              alt="gallery6"
            />
          </div>
          <div>
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/AdultsBirthday/gallery7.png"
              alt="gallery7"
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
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/photoshootBday.png"
          className="mx-auto w-[2000px]"
          alt="photoshootBday"
        />
      </div>

      <div className="">
        <h6 className="font-bold poppins md:py-6 pb-4 md:text-2xl">
          Why Celebrate With Lavisheventzz
        </h6>
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/trustedBanner.png"
          className="mx-auto w-[1600px]"
          alt="trustedBanner"
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
        </div>
      </div>

      <div>
        <h2 className="font-bold poppins md:text-2xl">
          Recent Customer Reviews
        </h2>
        <Testimonials reviewData={reviewData}/>
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

export default AdultBirthday;
