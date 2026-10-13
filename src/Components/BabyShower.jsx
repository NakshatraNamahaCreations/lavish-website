import React, { useEffect, useState } from "react";

import sash from "../assets/services/sash.png";
import cakes from "../assets/services/cakes.png";
import chairs from "../assets/services/chairs.png";
import envites from "../assets/services/envites.png";
import photography from "../assets/services/photography.png";
import welcomeboard from "../assets/services/welcomeboard.png";
import flwrbouqt from "../assets/services/flwrbouqt.png";
import activity from "../assets/services/activity.png";
import Breadcrumb from "./Breadcrumb"; // adjust path if needed
import DynamicFaqs from "./DynamicFaqs";
import { Helmet } from "react-helmet-async";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuthAxios, getAxios } from "../utils/api";
import CardCarousel from "./CardCarousel";
import { navigateToSubcategory } from "../utils/navigationsUtils";
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
    serviceName: "Traditional Flower Decorations In Bangalore",
    rating: "4.5",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-09%20at%2010.59.00%20PM.jpeg",
  },
  {
    name: "Riya Sharma",
    review:
      "I had an amazing experience! The team was friendly, and the service was prompt and efficient. Will definitely use them again!",
    serviceName: "Baby Shower Wall Organic Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/WhatsApp%20Image%202025-09-27%20at%207.01.22%20PM.jpeg",
  },

  {
    name: "Neha Verma",
    review:
      "The quality of work was outstanding! The team was responsive, patient, and delivered exactly what I needed.",
 
    serviceName: "Banana Leaves And Flower Decoration",
    rating: "4.7",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/dakshak%202/WhatsApp%20Image%202025-08-22%20at%202.16.08%20PM.jpeg",
  },
  {
    name: "Pooja Singh",
    review:
      "Truly impressed! The entire process was smooth, and they ensured every detail was taken care of.",
  
    serviceName: "Blissful Baby Shower Flower Decoration",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-06%20at%2010.28.23%20PM.jpeg",
  },
  {
    name: "Sanjay Rao",
    review:
      "Great experience! The team was highly professional and completed the work before the deadline. Will recommend to everyone!",
    serviceName: "Baby Shower Flower Decoration",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/WhatsApp%20Image%202025-09-05%20at%202.26.42%20PM.jpeg",
  },
  {
    name: "Meera Kapoor",
    review:
      "Exceptional service! They were quick to respond and delivered exactly what was promised. Will definitely hire again.",
    serviceName: "New Trend Banana Leaf Decor",
    rating: "4.5",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/Baby%20Shower%20Decor%20Main%20Images/WhatsApp%20Image%202025-06-15%20at%208.26.16%20AM.jpeg",
  },
  {
    name: "Rohan Desai",
    review:
      "Reliable and professional! The team went above and beyond to ensure customer satisfaction. Highly recommended!",
    serviceName: "Baby Shower Purple Regal Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/newp/WhatsApp%20Image%202025-07-27%20at%202.13.54%20PM.jpeg",
  },
  {
    name: "Vikram Patel",
    review:
      "Absolutely fantastic service! They were thorough, detail-oriented, and made the whole process seamless. Five stars!",
  
    serviceName: "Baby Shower Wonderland Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/newp/WhatsApp%20Image%202025-07-27%20at%202.15.40%20PM.jpeg",
  },

];

const BabyShower = () => {
  const [premiumData, setPremiumdata] = useState([]);
  const [simpleData, setSimpledata] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
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
          `/subcategories/by-name/${encodeURIComponent("Baby Shower")}`
        );
        setSubCategory(res.data.data); // ✅ note .data.data
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

  const message = "Hello, I want to know more about Baby Shower Cakes.";
  const encodedMessage = encodeURIComponent(message);
  const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;

  const fetchSubSubcategoriesBySubCategory = async () => {
    if (!subcat_id) return;
    try {
      const res = await getAuthAxios().get(
        `subsubcategories/subcategory/${subcat_id}`
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

      // Axios throws on non-2xx status, so manual .ok check is not needed.
      if (!data.success) {
        console.warn("API returned success: false");
        setSimpledata([]);
        setPremiumdata([]);
        return;
      }

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
        if (error.response && error.response.status === 404) {
          console.warn("No services found for this subcategory.");
          setSimpledata([]);
          setPremiumdata([]);
          return;
        }

        console.error("Failed to fetch services:", error.message);
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
    const serviceDetails = recentPurchase?.map((item) => item.serviceDetails);
    setServiceDetails(serviceDetails);
  }, [recentPurchase]);

  useEffect(() => {
    fetchRecentPurchase();
  }, [customerId]);

  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    {
      name: "Baby Shower Decor",
      link: "/babyshowerdecor/681b1146ddb6b3f4663e78fe",
    },
  ];

  return (
    <div className="lg:py-24  pt-32  p-3  mx-auto">
      <Helmet>
        {/* Meta Tags */}
        <title>Baby Shower Decoration in Bangalore | Elegant Theme Setup</title>
        <meta
          name="description"
          content="Lavish Eventzz creates beautiful baby shower decorations in Bangalore with pastel themes, floral decor, photo corners, and joyful setups to welcome the little one."
        />
        <link
          rel="canonical"
          href="https://www.lavisheventzz.com/babyshowerdecor/681b1146ddb6b3f4663e78fe"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Baby Shower Decoration in Bangalore | Elegant Theme Setup"
        />
        <meta
          property="og:description"
          content="Lavish Eventzz creates beautiful baby shower decorations in Bangalore with pastel themes, floral decor, photo corners, and joyful setups to welcome the little one."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.lavisheventzz.com/babyshowerdecor/681b1146ddb6b3f4663e78fe"
        />
        <meta
          property="og:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/babyshowerbanner.png"
        />
        <meta property="og:site_name" content="Lavish Eventzz" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Baby Shower Decoration in Bangalore | Elegant Theme Setup"
        />
        <meta
          name="twitter:description"
          content="Lavish Eventzz creates beautiful baby shower decorations in Bangalore with pastel themes, floral decor, photo corners, and joyful setups to welcome the little one."
        />
        <meta
          name="twitter:url"
          content="https://www.lavisheventzz.com/babyshowerdecor/681b1146ddb6b3f4663e78fe"
        />
        <meta
          name="twitter:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/babyshowerbanner.png"
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
                name: "Baby Shower Decor",
                item: "https://www.lavisheventzz.com/babyshowerdecor/681b1146ddb6b3f4663e78fe",
              },
            ],
          })}
        </script>

      </Helmet>
      <Breadcrumb paths={breadcrumbPaths} />

      <div>
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/babyshowerbanner.png"
          className="mx-auto w-[1600px]"
        />
      </div>

      <h1 className="mt-10 font-bold text-center text-primary playfair-display lg:text-5xl text-2xl">
       Baby Shower Decoration
      </h1>
      <div className="grid grid-cols-2 gap-x-2 md:gap-y-14 gap-y-5 md:place-items-center mt-10">
        {subSubCategories.map((item, idx) => {
          return (
            <div className="relative" key={item._id}>
              {/* <Link to={subSubAvailable ? `/service/${item.sub_SubId}` : `/service/${item.subId}`}> */}
              <Link
                to={`/service/${item.subCategory.subCategory
                  .split(" ")
                  .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
                  .join("-")}/${item._id}`}
                state={{
                  metaTitle: item.metaTitle,
                  metaDescription: item.metaDescription,
                  keywords: item.keywords,
                  caption: item.caption,
                  faqs: item.faqs,
                  subSubCategory: item.subSubCategory,
                  createdAt: item.createdAt,
                  updatedAt: item.updatedAt,
                  redirectUrl: "/babyshowerdecor/681b1146ddb6b3f4663e78fe",
                }}
                className="linkColorPink"
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={`${item?.image}`}
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
      {/* <Link
        to={WhatsAppLink}
        className="linkColorPink"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="md:my-10 my-4">
          <img
            loading="lazy"
            decoding="async"
            src="https://lavisheventzz-bangalore.b-cdn.net/Babyshower/babyshowerdecor3.png"
            alt="Kid's Birthday Cakes"
            className="rounded-3xl  md:w-auto md:h-auto w-48 h-40 mx-auto"
          />
          <h4 className="text-primary pt-4 md:text-3xl text-center font-medium carter">
            Baby Shower Cakes
          </h4>
        </div>
      </Link> */}

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
          #BabyShowerDecorationBestMovements
        </h2>
        <div className="flex justify-center items-center gap-1">
          <div className="place-items-end lg:space-y-2  space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/Babyshower/babyshower1.png"
              className=" lg:h-40 md:h-28 h-10"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/Babyshower/babyshower2.png"
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
              src="https://lavisheventzz-bangalore.b-cdn.net/Babyshower/gallery4.png"
            />
          </div>
          <div className="lg:space-y-2 space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/Babyshower/babyshower5.png"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/Babyshower/babyshower6.png"
            />
          </div>
          <div>
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/Babyshower/gallery7.png"
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
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/photoshootshower.png"
          className="mx-auto w-[2000px]"
        />
      </div>

      {customerId && (
        <div className="md:pt-10 pt-7">
          <h6 className="font-bold poppins md:text-2xl">Recently Purchased</h6>
          <CardCarousel centercardData={serviceDetails} />
        </div>
      )}
      <div className=" ">
        <h6 className="font-bold poppins md:py-6 pb-4 md:text-2xl">
          Why Celebrate With Lavisheventzz
        </h6>
        <img
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

export default BabyShower;
