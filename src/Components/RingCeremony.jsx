import React, { useEffect, useState } from "react";
import sash from "../assets/services/sash.png";
import cakes from "../assets/services/cakes.png";
import chairs from "../assets/services/chairs.png";
import envites from "../assets/services/envites.png";
import photography from "../assets/services/photography.png";
import welcomeboard from "../assets/services/welcomeboard.png";
import flwrbouqt from "../assets/services/flwrbouqt.png";
import activity from "../assets/services/activity.png";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import { getAxios } from "../utils/api";
import CardCarousel from "./CardCarousel";
import { navigateToSubcategory } from "../utils/navigationsUtils";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "./Breadcrumb"; // adjust path if needed
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
    profileimg:
      "https://images.unsplash.com/photo-1601268588577-319223ba7cb3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review:
      "The service was exceptional! The team was professional, attentive, and delivered beyond our expectations. Highly recommended!",
    serviceName: "Engagement Flowers Decoration In Bangalore",
    rating: "4.5",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-10%20at%209.47.27%20PM.jpeg",
  },
  {
    name: "Riya Sharma",
    review:
      "I had an amazing experience! The team was friendly, and the service was prompt and efficient. Will definitely use them again!",
    profileimg:
      "https://images.unsplash.com/photo-1681717166573-f71589207785?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    serviceName: "Ring Ceremony Beautiful Flower Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-05%20at%203.50.24%20PM%20(1).jpeg",
  },

  {
    name: "Neha Verma",
    review:
      "The quality of work was outstanding! The team was responsive, patient, and delivered exactly what I needed.",

    serviceName: "Engagement Ceremony Decoration",
    rating: "4.7",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-05%20at%2011.33.37%20AM.jpeg",
  },
  {
    name: "Pooja Singh",
    review:
      "Truly impressed! The entire process was smooth, and they ensured every detail was taken care of.",
 
    serviceName: "Vibrant Engagement Ceremony Setup",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-05%20at%2011.34.03%20AM.jpeg",
  },
  {
    name: "Sanjay Rao",
    review:
      "Great experience! The team was highly professional and completed the work before the deadline. Will recommend to everyone!",
 serviceName: "Ring Ceremony Flower Decoration In Bengaluru",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-04%20at%2011.09.07%20PM.jpeg",
  },
  {
    name: "Meera Kapoor",
    review:
      "Exceptional service! They were quick to respond and delivered exactly what was promised. Will definitely hire again.",
serviceName: "Ring Ceremony Charming Decor",
    rating: "4.5",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/dakshak%202/WhatsApp%20Image%202025-08-16%20at%203.28.29%20PM.jpeg",
  },
  {
    name: "Rohan Desai",
    review:
      "Reliable and professional! The team went above and beyond to ensure customer satisfaction. Highly recommended!",
 serviceName: "Ring Ceremony Wall Decor",
    rating: "5.0",
    servicethemeImg:
     "https://lavisheventzz-bangalore.b-cdn.net/newp/new%20edi%20pics/WhatsApp%20Image%202025-08-01%20at%205.05.10%20PM.jpeg",
  },
 
];

const RingCermony = () => {
  const [premiumData, setPremiumdata] = useState([]);
  const [simpleData, setSimpledata] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
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
          `/subcategories/by-name/${encodeURIComponent("Ring Ceremony")}`
        );
        setSubCategory(res.data.data); // ✅ note .data.data
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

      if (data.success) {
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
      } else {
        console.warn("API returned success: false");
        setSimpledata([]);
        setPremiumdata([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("No services found for this subcategory.");
      } else {
        console.error("Error fetching services:", error.message);
      }

      setSimpledata([]);
      setPremiumdata([]);
    }
  };

  const fetchSubSubcategoriesBySubCategory = async () => {
    if (!subcat_id) return;
    try {
      const res = await getAxios().get(
        `/subsubcategories/subcategory/${subcat_id}`
      );
      setSubSubCategories(res.data.data);
    } catch (err) {
      console.error("error", err);
      setError("Failed to load subcategories");
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
      name: "Ring Ceremony Decor",
      link: "/ringceremonydecor/681b1095ddb6b3f4663e78c2",
    },
  ];

  return (
    <div className="lg:py-24 md:pt-20 pt-32  p-3  mx-auto">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Ring Ceremony Decoration in Bangalore | Lavish Eventzz</title>
        <meta
          name="description"
          content="Book elegant ring ceremony decoration in Bangalore with Lavish Eventzz. Floral setups, lights, and themes to make your engagement celebration picture-perfect."
        />
        <link
          rel="canonical"
          href="https://www.lavisheventzz.com/ringceremonydecor/681b1095ddb6b3f4663e78c2"
        />
        <meta
          name="keywords"
          content="Ring Ceremony Decoration in Bangalore, Engagement Stage Decoration Bangalore, Ring Exchange Event Decor, Floral Backdrop for Engagement, Ring Ceremony Event Planners, Stylish Engagement Themes Bangalore"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Ring Ceremony Decoration in Bangalore | Lavish Eventzz"
        />
        <meta
          property="og:description"
          content="Book elegant ring ceremony decoration in Bangalore with Lavish Eventzz. Floral setups, lights, and themes to make your engagement celebration picture-perfect."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.lavisheventzz.com/ringceremonydecor/681b1095ddb6b3f4663e78c2"
        />
        <meta
          property="og:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/ringceremonyBanner.png"
        />
        <meta property="og:site_name" content="Lavish Eventzz" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Ring Ceremony Decoration in Bangalore | Lavish Eventzz"
        />
        <meta
          name="twitter:description"
          content="Book elegant ring ceremony decoration in Bangalore with Lavish Eventzz. Floral setups, lights, and themes to make your engagement celebration picture-perfect."
        />
        <meta
          name="twitter:url"
          content="https://www.lavisheventzz.com/ringceremonydecor/681b1095ddb6b3f4663e78c2"
        />
        <meta
          name="twitter:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/ringceremonyBanner.png"
        />
        <meta name="twitter:site" content="@LavishEvents25" />

        {/* Schema.org - Organization */}
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

        {/* Schema.org - BreadcrumbList */}
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
                name: "Ring Ceremony Decor",
                item: "https://www.lavisheventzz.com/ringceremonydecor/681b1095ddb6b3f4663e78c2",
              },
            ],
          })}
        </script>

  
      </Helmet>
      <Breadcrumb paths={breadcrumbPaths} />

      <div>
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/ringceremonyBanner.png"
          className="mx-auto w-[1600px]"
        />
      </div>

      <h1 className="mt-10 font-bold text-center text-primary playfair-display lg:text-5xl text-2xl">
        Ring Ceremony Decoration
      </h1>

      <div className="grid grid-cols-2 md:gap-10 gap-3  place-items-center md:my-16 mt-4 md:mx-10">
        {subSubCategories.map((item, idx) => {
          return (
            <div className="relative" key={item._id}>
              {/* <Link to={subSubAvailable ? `/service/${item.sub_SubId}` : `/service/${item.subId}`}> */}
              {console.log("subSubCategories", item)}
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
                  className="rounded-3xl w-[500px] "
                />
                <h4 className="text-primary pt-4 md:text-3xl text-xl text-center font-medium carter">
                  {item.subSubCategory}
                </h4>
              </Link>
            </div>
          );
        })}
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
              loading="lazy"
              decoding="async"
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
          #RingCeremonyDecorationBestMovements
        </h2>
        <div className="flex justify-center items-center gap-1">
          <div className="place-items-end lg:space-y-2  space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/RingCeremony/ringcer1.png"
              className=" lg:h-40 md:h-28 h-10"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/RingCeremony/ringcer2.png"
              className=" lg:h-64  "
            />
            <div className=" bg-gray-600 relative overflow-hidden rounded md:h-20 md:w-36 lg:w-auto lg:h-auto h-8 w-16">
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/gallery3.png"
                className="rounded"
              />
              <video
                loading="lazy"
                decoding="async"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
                src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/video.mp4"
                autoPlay
                loop
                muted
              />
            </div>
          </div>
          <div>
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/RingCeremony/ringcer4.png"
            />
          </div>
          <div className="lg:space-y-2 space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/RingCeremony/ringcer5.png"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/RingCeremony/ringcer6.png"
            />
          </div>
          <div>
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/RingCeremony/ringcer7.png"
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
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/photoshootring.png"
          className="mx-auto w-[2000px]"
        />
      </div>

      {customerId && serviceDetails.length > 0 && (
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

export default RingCermony;
