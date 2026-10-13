import React, { useEffect, useState } from "react";
import sash from "../assets/services/sash.png";
import cakes from "../assets/services/cakes.png";
import chairs from "../assets/services/chairs.png";
import envites from "../assets/services/envites.png";
import photography from "../assets/services/photography.png";
import welcomeboard from "../assets/services/welcomeboard.png";
import flwrbouqt from "../assets/services/flwrbouqt.png";
import activity from "../assets/services/activity.png";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb"; // adjust path if needed
import { getAxios } from "../utils/api";
import CardCarousel from "./CardCarousel";
import axios from "axios";
import { navigateToSubcategory } from "../utils/navigationsUtils";
import { Helmet } from "react-helmet-async";
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
  {
    src: activity,
    title: "Activity",
  },
  {
    src: chairs,
    title: "Chairs",
  },
  {
    src: envites,
    title: "Envites",
  },
];

const reviewData = [
  {
    name: "Nisha Sharma",
   review:
      "The service was exceptional! The team was professional, attentive, and delivered beyond our expectations. Highly recommended!",
    serviceName: "Gorgeous Groom To Be Decoration",
    rating: "4.5",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%202/WhatsApp%20Image%202025-11-13%20at%203.29.31%20PM.jpeg",
  },
  {
    name: "Riya Sharma",
    review:
      "I had an amazing experience! The team was friendly, and the service was prompt and efficient. Will definitely use them again!",
   serviceName: "Groom To Be Wall Pop Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/dakshak/WhatsApp%20Image%202025-08-08%20at%2010.10.33%20PM.jpeg",
  },

  {
    name: "Neha Verma",
    review:
      "The quality of work was outstanding! The team was responsive, patient, and delivered exactly what I needed.",
  
    serviceName: "Stylish Groom To Be Arch Decoration",
    rating: "4.7",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%202/WhatsApp%20Image%202025-11-12%20at%203.18.24%20PM%20(1).jpeg",
  },
  {
    name: "Pooja Singh",
    review:
      "Truly impressed! The entire process was smooth, and they ensured every detail was taken care of.",
   
    serviceName: "Groom To Be Ring Classy Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/Mundan%20Ceremony/Mundan%20Ceremony%20Addons/WhatsApp%20Image%202025-07-20%20at%2012.39.41%20AM.jpeg",
  },
  {
    name: "Sanjay Rao",
    review:
      "Great experience! The team was highly professional and completed the work before the deadline. Will recommend to everyone!",
  serviceName: "Groom To Be Silver Panel Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/groom%20to%20be%20main%20images/Groom%20To%20Be%20Silver%20Panel%20Decor.jpeg",
  },
  {
    name: "Meera Kapoor",
    review:
      "Exceptional service! They were quick to respond and delivered exactly what was promised. Will definitely hire again.",
 serviceName: "Groom To Be Elegant Decor",
    rating: "4.5",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/newp/WhatsApp%20Image%202025-07-29%20at%209.27.51%20AM.jpeg",
  },
  {
    name: "Rohan Desai",
    review:
      "Reliable and professional! The team went above and beyond to ensure customer satisfaction. Highly recommended!",
   serviceName: "Groom To Be Budget Friendly Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/groom%20to%20be%20main%20images/Groom%20To%20Be%20Budget%20Friendly%20Decor.jpeg",
  },
  {
    name: "Vikram Patel",
    review:
      "Absolutely fantastic service! They were thorough, detail-oriented, and made the whole process seamless. Five stars!",
   
    serviceName: "Groom To Be Full Arch Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/Mundan%20Ceremony/Mundan%20Ceremony%20Addons/WhatsApp%20Image%202025-07-19%20at%2011.40.23%20PM.jpeg",
  },
  
];

const GroomtoBe = () => {
  const [premiumData, setPremiumdata] = useState([]);
  const [simpleData, setSimpledata] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [recentPurchase, setRecentPurchase] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [subCategory, setSubCategory] = useState(null);
  const { subcat_id } = useParams();
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;

  const navigate = useNavigate();

  useEffect(() => {
    const serviceDetails = recentPurchase?.map((item) => item.serviceDetails);
    setServiceDetails(serviceDetails);
  }, [recentPurchase]);

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

  const fetchSubSubcategoriesBySubCategory = async () => {
    if (!subcat_id) return;
    try {
      const res = await getAxios().get(
        `subsubcategories/subcategory/${subcat_id}`
      );
      setSubSubCategories(res.data.data);
      console.log("subSubCategories", res.data.data);
    } catch (err) {
      console.error("error", err);
      setError("Failed to load subcategories");
    }
  };

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const res = await getAxios().get(
          `/subcategories/by-name/${encodeURIComponent("Groom To Be")}`
        );
        setSubCategory(res.data.data);
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchSubCategory();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getAxios().get(`/services/filter/${subcat_id}`);

      const data = response.data;

      if (!data.success) {
        console.warn("API returned success: false");
        setSimpledata([]);
        setPremiumdata([]);
        return;
      }

      console.log("data", data.data);

      const simpleData = data.data.filter(
        (item) =>
          item.subSubCategoryId?.subSubCategory?.toLowerCase() ===
          "simple decoration"
      );

      const premiumData = data.data.filter(
        (item) =>
          item.subSubCategoryId?.subSubCategory?.toLowerCase() ===
          "premium decoration"
      );

      setSimpledata(simpleData);
      setPremiumdata(premiumData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          console.warn("No services found for this subcategory.");
          setSimpledata([]);
          setPremiumdata([]);
          return;
        }
        console.error("Axios error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }

      setSimpledata([]);
      setPremiumdata([]);
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
    fetchRecentPurchase();
  }, [customerId]);
  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    {
      name: "Groom to be Decor",
      link: "/groomtobedecor/681b10abddb6b3f4663e78d1",
    },
  ];

  return (
    <div className="lg:py-24 md:pt-20 pt-32  p-3  mx-auto">
      <Helmet>
        {/* Meta Tags */}
        <title>Groom to be Decoration in Bangalore | Bachelor Bash Decor</title>
        <meta
          name="description"
          content="Celebrate the groom in style with Groom to be decoration in Bangalore. Lavish Eventzz creates bold, fun themes for bachelor parties, sangeet, and pre-wedding."
        />
        <link
          rel="canonical"
          href="https://www.lavisheventzz.com/groomtobedecor/681b10abddb6b3f4663e78d1"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Groom to be Decoration in Bangalore | Bachelor Bash Decor"
        />
        <meta
          property="og:description"
          content="Celebrate the groom in style with Groom to be decoration in Bangalore. Lavish Eventzz creates bold, fun themes for bachelor parties, sangeet, and pre-wedding."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.lavisheventzz.com/groomtobedecor/681b10abddb6b3f4663e78d1"
        />
        <meta
          property="og:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/groomBanner.jpg"
        />
        <meta property="og:site_name" content="Lavish Eventzz" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Groom to be Decoration in Bangalore | Bachelor Bash Decor"
        />
        <meta
          name="twitter:description"
          content="Celebrate the groom in style with Groom to be decoration in Bangalore. Lavish Eventzz creates bold, fun themes for bachelor parties, sangeet, and pre-wedding."
        />
        <meta
          name="twitter:url"
          content="https://www.lavisheventzz.com/groomtobedecor/681b10abddb6b3f4663e78d1"
        />
        <meta
          name="twitter:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/groomBanner.jpg"
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
                name: "Groom to be Decor",
                item: "https://www.lavisheventzz.com/groomtobedecor/681b10abddb6b3f4663e78d1",
              },
            ],
          })}
        </script>

      
      </Helmet>
      <Breadcrumb paths={breadcrumbPaths} />

      <div>
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/groomBanner.jpg"
          className="mx-auto w-[1600px] "
        />
      </div>

<h1 className="mt-10 font-bold text-center text-primary playfair-display lg:text-5xl text-2xl">
       Groom To Be Decoration
      </h1>

      <div className="grid grid-cols-2 md:gap-10 gap-3   md:my-16 mt-4 md:mx-10">
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
                className="rounded-tl-[100px] rounded-br-[100px] w-[500px] h-[340px] mx-auto"
              />
            </Link>
            <h4 className="text-primary pt-4 md:text-3xl text-xl text-center font-medium carter">
              {item.subSubCategory}
            </h4>
          </div>
        ))}
      </div>

      <div className="px-10">
        {/* Simple Decoration Section */}
        <div className="mt-5">
          <div className="flex justify-between">
            <h5 className="lg:text-2xl text-primary font-bold playfair-display">
              Simple Decoration Service
            </h5>
            {(() => {
              const simpleSub = subSubCategories.find((item) =>
                item.subSubCategory.toLowerCase().includes("simple")
              );
              return simpleSub ? (
                <Link
                  to={`/service/${simpleSub.subCategory.subCategory
                    .split(" ")
                    .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
                    .join("-")}/${simpleSub._id}`}
                  className="linkColorPink text-purple-600 underline text-sm font-semibold hover:text-blue-800"
                >
                  View All
                </Link>
              ) : null;
            })()}
          </div>

          {simpleData.length > 0 ? (
            <CardCarousel centercardData={simpleData} />
          ) : (
            <p className="text-gray-500 text-center mt-4">
              Simple Decoration Service Not Found
            </p>
          )}
        </div>

        {/* Premium Decoration Section */}
        <div className="mt-10">
          <div className="flex justify-between">
            <h5 className="lg:text-2xl text-primary font-bold playfair-display">
              Premium Decoration Service
            </h5>
            {(() => {
              const primumSub = subSubCategories.find((item) =>
                item.subSubCategory.toLowerCase().includes("premium")
              );
              return primumSub ? (
                <Link
                  to={`/service/${primumSub.subCategory.subCategory
                    .split(" ")
                    .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
                    .join("-")}/${primumSub._id}`}
                  className="linkColorPink text-purple-600 underline text-sm font-semibold hover:text-blue-800"
                >
                  View All
                </Link>
              ) : null;
            })()}
          </div>

          {premiumData.length > 0 ? (
            <CardCarousel centercardData={premiumData} />
          ) : (
            <p className="text-gray-500 text-center mt-4">
              Premium Decoration Service Not Found
            </p>
          )}
        </div>
      </div>

      {/* Add ons */}
      <div className="relative inset-0 flex flex-col items-center justify-center text-center gap-5 md:my-10 my-4">
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/addonsbanner.png"
          alt="adultBanner4"
          className="w-[2000px] mx-auto max-h-[650px]"
        />
        <h2 className="absolute top-4 md:text-4xl  text-sm font-bold text-[#1C256C] playfair-display lg:w-[50%]">
          Make It Unforgettable with Our Exclusive Add-Ons!
        </h2>
        <div className="absolute top-14  md:top-36 grid grid-cols-4  lg:gap-10  gap-2 place-items-center ">
          {addOns.map((item, idx) => (
            <img
              key={idx}
              src={item.src}
              className="cursor-pointer object-cover lg:px-10 md:px-4 px-1"
            />
          ))}
        </div>
      </div>

      {/* gallery */}
      <div className="relative mx-auto text-center lg:mt-10">
        <h2 className="md:py-8 py-4 font-bold poppins md:text-2xl">
          #GroomtobeDecorationBestMovements
        </h2>
        <div className="flex justify-center items-center gap-1">
          <div className="place-items-end lg:space-y-2  space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/groomtobe1.png"
              className=" lg:h-40 md:h-28 h-10"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/groomtobe2.png"
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
              src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/groomtobe4.png"
            />
          </div>
          <div className="lg:space-y-2 space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/groomtobe5.png"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/groomtobe6.png"
            />
          </div>
          <div>
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/groomtobe7.png"
            />
          </div>
        </div>
        <p className="lg:absolute bottom-10 right-2 [text-shadow:_-4px_4px_3px_#7D7C7C] playfair-display md:text-7xl text-4xl font-bold text-[#FFD1D1]">
          Wonderful Moments
        </p>
      </div>

      <div
        className="md:pt-20 py-5"
        onClick={() => handleNavigation("photography", "/photography-service")}
      >
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/photoshootgroom.png"
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
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/trustedBanner.png"
          className="mx-auto w-[1600px]"
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
        <h2 className="font-bold poppins md:text-2xl">Recent Customer Reviews</h2>
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

export default GroomtoBe;
