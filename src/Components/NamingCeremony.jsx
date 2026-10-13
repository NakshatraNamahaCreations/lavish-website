import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";

import sash from "../assets/services/sash.png";
import cakes from "../assets/services/cakes.png";
import chairs from "../assets/services/chairs.png";
import envites from "../assets/services/envites.png";
import photography from "../assets/services/photography.png";
import welcomeboard from "../assets/services/welcomeboard.png";
import flwrbouqt from "../assets/services/flwrbouqt.png";
import activity from "../assets/services/activity.png";
import Breadcrumb from "./Breadcrumb";
import DynamicFaqs from "./DynamicFaqs";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import CardCarousel from "./CardCarousel";

import { getAxios } from "../utils/api";
import { navigateToSubcategory } from "../utils/navigationsUtils";
import { Helmet } from "react-helmet-async";
import ExpandableContent from "./ExpandableContent";

const addOns = [
  { src: sash, title: "Sash" },
  { src: welcomeboard, title: "Welcome Board" },
  { src: flwrbouqt, title: "Flower Bouquet" },
  { src: photography, title: "Photography" },
  // { src: cakes, title: "Cakes" },
  { src: activity, title: "Activity" },
  { src: chairs, title: "Chairs" },
  { src: envites, title: "Envites" },
];

const reviewData = [
  {
    name: "Nisha Sharma",
 review:
      "The service was exceptional! The team was professional, attentive, and delivered beyond our expectations. Highly recommended!",
    serviceName: "Naming Ceremony Celebration Decor",
    rating: "4.5",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%202/WhatsApp%20Image%202025-11-14%20at%204.02.43%20PM.jpeg",
  },
  {
    name: "Riya Sharma",
    review:
      "I had an amazing experience! The team was friendly, and the service was prompt and efficient. Will definitely use them again!",
 serviceName: "Elegant Naming Ceremony Ring Decor In Bangalore",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-09%20at%202.36.45%20PM.jpeg",
  },

  {
    name: "Neha Verma",
    review:
      "The quality of work was outstanding! The team was responsive, patient, and delivered exactly what I needed.",
 
    serviceName: "Naming Ceremony Traditional Setup",
    rating: "4.7",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-02%20at%205.41.11%20AM.jpeg",
  },
  {
    name: "Pooja Singh",
    review:
      "Truly impressed! The entire process was smooth, and they ensured every detail was taken care of.",
   
    serviceName: "Naming Ceremony Flower Decortion",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/Naming%20Ceremony%20Decoration/Naming%20Ceremony%20Ring%20With%20Flower%20Deco.jpeg",
  },
  {
    name: "Sanjay Rao",
    review:
      "Great experience! The team was highly professional and completed the work before the deadline. Will recommend to everyone!",
 serviceName: "Naming Ceremony Golden Bell Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/WhatsApp%20Image%202025-09-21%20at%2011.36.26%20PM.webp",
  },
  {
    name: "Meera Kapoor",
    review:
      "Exceptional service! They were quick to respond and delivered exactly what was promised. Will definitely hire again.",
 serviceName: "Baby Boy Revelation Celebration Decor",
    rating: "4.5",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/Naming%20Ceremony%20Decoration/Naming%20Ceremony%20Boy%20Baby%20Wall%20Flecx%20Decor.jpeg",
  },
  {
    name: "Rohan Desai",
    review:
      "Reliable and professional! The team went above and beyond to ensure customer satisfaction. Highly recommended!",
serviceName: "Naming Ceremony Girl Baby Garland Arch",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/newp/WhatsApp%20Image%202025-07-28%20at%209.36.43%20AM.jpeg",
  },
  {
    name: "Vikram Patel",
    review:
      "Absolutely fantastic service! They were thorough, detail-oriented, and made the whole process seamless. Five stars!",
   
    serviceName: "Naming Ceremony Name Reveal Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/Naming%20Ceremony%20Decoration/Naming%20Ceremony%20Sparkling%20Decor.jpeg",
  },

];

const NamingCeremony = () => {
  const [premiumData, setPremiumData] = useState([]);
  const [simpleData, setSimpleData] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [subCategory, setSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { subcat_id } = useParams();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const res = await getAxios().get(
          `/subcategories/by-name/${encodeURIComponent("Naming Ceremony")}`
        );
        setSubCategory(res.data.data);
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchSubCategory();
  }, []);

  const fetchSubSubcategories = async () => {
    if (!subcat_id) return;
    try {
      const res = await getAxios().get(
        `subsubcategories/subcategory/${subcat_id}`
      );
      setSubSubCategories(res.data.data);
    } catch (err) {
      console.error("Error fetching sub-subcategories", err);
      setError("Failed to load subcategories");
    }
  };

  const fetchServices = async () => {
    try {
      const res = await getAxios().get(`/services/filter/${subcat_id}`);
      const data = res.data;

      if (!data.success) throw new Error("Failed to fetch services");

      const simple = data.data.filter(
        (d) =>
          d.subSubCategoryId?.subSubCategory?.toLowerCase() ===
          "simple decoration"
      );
      const premium = data.data.filter(
        (d) =>
          d.subSubCategoryId?.subSubCategory?.toLowerCase() ===
          "premium decoration"
      );

      setSimpleData(simple);
      setPremiumData(premium);
    } catch (err) {
      console.error("Error fetching services", err);
      setSimpleData([]);
      setPremiumData([]);
    }
  };

  const fetchRecentPurchase = async () => {
    try {
      const res = await getAxios().get(`/orders/recent-orders/${customerId}`);
      const purchases = res.data.services || [];
      setServiceDetails(purchases.map((item) => item.serviceDetails));
    } catch (err) {
      console.error("Error fetching recent purchases", err);
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
    fetchSubSubcategories();
    fetchServices();
  }, [subcat_id]);

  useEffect(() => {
    if (customerId) fetchRecentPurchase();
  }, [customerId]);

  const message = "Hello, I want to know more about Naming Ceremony Cakes.";
  const encodedMessage = encodeURIComponent(message);
  const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;
  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    {
      name: "Naming Ceremony Decoration",
      link: "/namingceremonydecor/681b124bddb6b3f4663e7951",
    },
  ];

  return (
    <div className="lg:py-24 md:pt-20 pt-32 p-3 mx-auto">
      <Helmet>
        {/* Meta Tags */}
        <title>Naming Ceremony Decoration in Bangalore | Baby Name Setup</title>
        <meta
          name="description"
          content="Make your child’s special day memorable with naming ceremony decoration in Bangalore. Lavish Eventzz offers themes, balloon decor, and custom name backdrops."
        />
        <link
          rel="canonical"
          href="https://www.lavisheventzz.com/namingceremonydecor/681b124bddb6b3f4663e7951"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Naming Ceremony Decoration in Bangalore | Baby Name Setup"
        />
        <meta
          property="og:description"
          content="Make your child’s special day memorable with naming ceremony decoration in Bangalore. Lavish Eventzz offers themes, balloon decor, and custom name backdrops."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.lavisheventzz.com/namingceremonydecor/681b124bddb6b3f4663e7951"
        />
        <meta
          property="og:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/namingcermonyBanner.png"
        />
        <meta property="og:site_name" content="Lavish Eventzz" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Naming Ceremony Decoration in Bangalore | Baby Name Setup"
        />
        <meta
          name="twitter:description"
          content="Make your child’s special day memorable with naming ceremony decoration in Bangalore. Lavish Eventzz offers themes, balloon decor, and custom name backdrops."
        />
        <meta
          name="twitter:url"
          content="https://www.lavisheventzz.com/namingceremonydecor/681b124bddb6b3f4663e7951"
        />
        <meta
          name="twitter:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/namingcermonyBanner.png"
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
                name: "Naming Ceremony",
                item: "https://www.lavisheventzz.com/namingceremonydecor/681b124bddb6b3f4663e7951",
              },
            ],
          })}
        </script>

   
      </Helmet>
      <Breadcrumb paths={breadcrumbPaths} />

      <img
        src="https://lavisheventzz-bangalore.b-cdn.net/banner/namingcermonyBanner.png"
        className="mx-auto w-[1600px]"
        alt="Naming Ceremony Banner"
      />

      <h1 className="mt-10 font-bold text-center text-primary playfair-display lg:text-5xl text-2xl">
        Naming Ceremony Decoration
      </h1>

      <div className="grid grid-cols-2 gap-x-8 md:gap-y-14 gap-y-5 md:place-items-center lg:mt-20 mt-10">
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
                src={`${item.image}`}
                alt={item.subSubCategory}
                className="rounded-3xl w-[500px]"
              />
            </Link>
            <h4 className="text-primary pt-4 md:text-3xl text-xl text-center font-medium carter">
              {item.subSubCategory}
            </h4>
          </div>
        ))}
      </div>

      {/* <Link
        to={WhatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className="linkColorPink"
      >
        <div className="md:my-10 my-5 text-center">
          <img
            loading="lazy"
            decoding="async"
            src="https://lavisheventzz-bangalore.b-cdn.net/NamingCeremony/namingceremonycake.png"
            className="rounded-3xl md:w-[500px] h-auto w-44 mx-auto"
            alt="Naming Ceremony Cake"
          />
          <h4 className="text-primary md:pt-4 md:text-3xl text-center font-medium carter">
            Naming ceremony cake
          </h4>
        </div>
      </Link> */}

      <div className="px-10">
        {/* Simple Decoration */}
        <div className="mt-5">
          <div className="flex justify-between items-center">
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
                  className="text-purple-600 underline text-sm font-semibold hover:text-blue-800 linkColorPink"
                >
                  View All
                </Link>
              ) : null;
            })()}
          </div>
          {simpleData.length ? (
            <CardCarousel centercardData={simpleData} />
          ) : (
            <p className="text-gray-500 text-center mt-4">
              Simple Decoration Service Not Found
            </p>
          )}
        </div>

        {/* Premium Decoration */}
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
                  className="text-purple-600 underline text-sm font-semibold hover:text-blue-800 linkColorPink"
                >
                  View All
                </Link>
              ) : null;
            })()}
          </div>
          {premiumData.length ? (
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

      {/* Gallery */}
      <div className="relative mx-auto text-center md:mt-10">
        <h2 className="py-8 font-bold poppins md:text-2xl">
          #NamingCeremonyDecorationBestMovements
        </h2>
        <div className="flex justify-center items-center gap-1">
          <div className="lg:space-y-2 space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/NamingCeremony/namingcer1.png"
              className="lg:h-40 md:h-28 h-10"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/NamingCeremony/namingcer2.png"
              className="lg:h-64"
            />

            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/image.jpg"
              className=" lg:h-40 md:h-28 h-10 rounded-xl"
            />
          </div>
          <img
            loading="lazy"
            decoding="async"
            src="https://lavisheventzz-bangalore.b-cdn.net/NamingCeremony/namingcer4.png"
          />
          <div className="lg:space-y-2 space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/NamingCeremony/namingcer5.png"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/NamingCeremony/namingcer6.png"
            />
          </div>
          <img
            loading="lazy"
            decoding="async"
            src="https://lavisheventzz-bangalore.b-cdn.net/NamingCeremony/namingcer7.png"
          />
        </div>
        <p className="lg:absolute bottom-10 right-2 [text-shadow:_-4px_4px_3px_#7D7C7C] playfair-display md:text-7xl text-4xl font-bold text-[#FFD1D1]">
          Wonderful Moments
        </p>
      </div>

      {/* Redirect to photography */}
      <div
        className="md:pt-20 py-5"
        onClick={() => handleNavigation("photography", "/photography-service")}
      >
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/photoshootnaming.png"
          className="mx-auto w-[2000px]"
          alt="Photography Banner"
        />
      </div>

      {/* Recently Purchased */}
      {customerId && (
        <div className="md:pt-10 pt-7">
          <h6 className="font-bold poppins md:text-2xl">Recently Purchased</h6>
          <CardCarousel centercardData={serviceDetails} />
        </div>
      )}

      {/* Why Celebrate */}
      <div>
        <h6 className="font-bold poppins md:py-6 pb-4 md:text-2xl">
          Why Celebrate With Lavisheventzz
        </h6>
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/trustedBanner.png"
          className="mx-auto w-[1600px]"
          alt="Why Celebrate"
        />
      </div>

      {/* FAQs & Cancellation Policy */}
      <div className="my-4">
        <p className="text-center font-bold poppins text-2xl">FAQs</p>

        <div className="lg:w-[70%] md:w-[80%] mx-auto my-6">
          <p className="font-bold poppins py-8">
            Pick a query related to your issue
          </p>
          <FAQ />
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <h2 className="font-bold poppins md:text-2xl">Recent Customer Reviews</h2>
        <Testimonials reviewData={reviewData}/>
      </div>

      {/* Final CTA */}
     
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

export default NamingCeremony;
