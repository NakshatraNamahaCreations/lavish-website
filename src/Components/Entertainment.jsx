import React, { useEffect, useState } from "react";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import { useNavigate } from "react-router-dom";
import CardCarousel from "./CardCarousel";
import { getAxios } from "../utils/api";
import { navigateToSubcategory } from "../utils/navigationsUtils";
import Breadcrumb from "./Breadcrumb";
import { Helmet } from "react-helmet-async";

const imagelist = [
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Entertainment/Caricature.png",
    title: "Caricature",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Entertainment/chocolatefountain.png",
    title: "Chocolate Fountain",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Entertainment/cottonCandy.png",
    title: "Cotton Candy",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Entertainment/Keychain%20Making.png",
    title: "Keychain Making",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Entertainment/pottery.png",
    title: "Pottery",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Entertainment/tattoo.png",
    title: "Tattoo",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Entertainment/birthdayPool.png",
    title: "Birthday Party Ball Pool",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Entertainment/popcorn.png",
    title: "Popcorn Counter",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Entertainment/BalloonShooting.png",
    title: "Balloon Shooting",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Entertainment/Magician.png",
    title: "Magician",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Entertainment/coordinator.png",
    title: "Game Coordinator",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Entertainment/NailArtist.png",
    title: "Nail Artist",
  },
  // {
  //     src: M,
  //     title: "Hoopla Game",

  // },
  // {
  //     src: M,
  //     title: "Balloon Modelling",

  // },
];

const handleWhatsappRedirect = (activity) => {
  const message = encodeURIComponent(
    `Hi, I'm interested in the ${activity} entertainment activity. Please provide more details.`
  );
  window.open(`https://wa.me/919620558000?text=${message}`, "_blank");
};

const reviewData = [
  {
    name: "Nisha Sharma",
    review:
      "The service was exceptional! The team was professional, attentive, and delivered beyond our expectations. Highly recommended!",
    serviceName: "Bride To Be Bachelorette Party Decoration",
    rating: "4.5",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%202/WhatsApp%20Image%202025-11-13%20at%203.28.37%20PM.jpeg",
  },
  {
    name: "Riya Sharma",
    review:
      "I had an amazing experience! The team was friendly, and the service was prompt and efficient. Will definitely use them again!",
    serviceName: "Bride To Simple Room Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/WhatsApp%20Image%202025-09-21%20at%2010.51.02%20PM.jpeg",
  },

  {
    name: "Neha Verma",
    review:
      "The quality of work was outstanding! The team was responsive, patient, and delivered exactly what I needed.",
   
    serviceName: "Bride To Be Cute Setup",
    rating: "4.7",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/dakshak%202/WhatsApp%20Image%202025-08-23%20at%2010.37.54%20PM.jpeg",
  },
  {
    name: "Pooja Singh",
    review:
      "Truly impressed! The entire process was smooth, and they ensured every detail was taken care of.",

    serviceName: "Bride To Be Terrace Setup",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/Congrats%20Decor%20Add%20onn/WhatsApp%20Image%202025-08-27%20at%2011.30.08%20PM.jpeg",
  },
  {
    name: "Sanjay Rao",
    review:
      "Great experience! The team was highly professional and completed the work before the deadline. Will recommend to everyone!",
    serviceName: "Bride To Be Boho Terrece Setup",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/shop%20open%20decor/WhatsApp%20Image%202025-11-02%20at%205.08.19%20AM.jpeg",
  },
  {
    name: "Meera Kapoor",
    review:
      "Exceptional service! They were quick to respond and delivered exactly what was promised. Will definitely hire again.",
    serviceName: "Bride To Be Gold Panel Deco",
    rating: "4.5",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/newp/new%20edi%20pics/WhatsApp%20Image%202025-08-04%20at%202.41.56%20PM.jpeg",
  },
  {
    name: "Rohan Desai",
    review:
      "Reliable and professional! The team went above and beyond to ensure customer satisfaction. Highly recommended!",
    serviceName: "Bride To Be Pastel Wall Decoration",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/Baby%20Shower%20Decor%20Main%20Images/Kids%20Birthday%20Main%20Images/WhatsApp%20Image%202025-06-15%20at%2010.16.49%20AM.jpeg",
  },
  {
    name: "Vikram Patel",
    review:
      "Absolutely fantastic service! They were thorough, detail-oriented, and made the whole process seamless. Five stars!",
 
    serviceName: "Bride To Be Basi Decor",
    rating: "5.0",
    servicethemeImg:
      "https://lavisheventzz-bangalore.b-cdn.net/Mundan%20Ceremony/WhatsApp%20Image%202025-07-18%20at%2010.08.21%20PM.jpeg",
  },
  
];

const Entertainment = () => {
  const [recentPurchase, setRecentPurchase] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [subCategory, setSubCategory] = useState(null);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;

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
    const serviceDetails = recentPurchase?.map((item) => item.serviceDetails);
    setServiceDetails(serviceDetails);
  }, [recentPurchase]);

  useEffect(() => {
    fetchRecentPurchase();
  }, [customerId]);

  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    {
      name: "Entertainment Decoration",
      link: "/entertainmentdecor/681b1238ddb6b3f4663e7947",
    },
  ];

  return (
    <div className="lg:py-24 md:pt-20 pt-32  p-3  mx-auto">
      <Helmet>
        {/* Meta Tags */}
        <title>
          Entertainment Decoration in Bangalore | Stage & Show Setup
        </title>
        <meta
          name="description"
          content="Light up your events with entertainment decoration in Bangalore by Lavish Eventzz. Stage decor, live show setups, LED walls, DJ zones, and vibrant ambiance."
        />
        <link
          rel="canonical"
          href="https://www.lavisheventzz.com/entertainmentdecor/681b1238ddb6b3f4663e7947"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Entertainment Decoration in Bangalore | Stage & Show Setup"
        />
        <meta
          property="og:description"
          content="Light up your events with entertainment decoration in Bangalore by Lavish Eventzz. Stage decor, live show setups, LED walls, DJ zones, and vibrant ambiance."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.lavisheventzz.com/entertainmentdecor/681b1238ddb6b3f4663e7947"
        />
        <meta
          property="og:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/entertainmentBanner.png"
        />
        <meta property="og:site_name" content="Lavish Eventzz" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Entertainment Decoration in Bangalore | Stage & Show Setup"
        />
        <meta
          name="twitter:description"
          content="Light up your events with entertainment decoration in Bangalore by Lavish Eventzz. Stage decor, live show setups, LED walls, DJ zones, and vibrant ambiance."
        />
        <meta
          name="twitter:url"
          content="https://www.lavisheventzz.com/entertainmentdecor/681b1238ddb6b3f4663e7947"
        />
        <meta
          name="twitter:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/entertainmentBanner.png"
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
                name: "Entertainment Decoration",
                item: "https://www.lavisheventzz.com/entertainmentdecor/681b1238ddb6b3f4663e7947",
              },
            ],
          })}
        </script>

        {/* Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Entertainment Decoration",
            url: "https://www.lavisheventzz.com/entertainmentdecor/681b1238ddb6b3f4663e7947",
            description:
              "Light up your events with entertainment decoration in Bangalore by Lavish Eventzz. Stage decor, live show setups, LED walls, DJ zones, and vibrant ambiance.",
          })}
        </script>
      </Helmet>
      <Breadcrumb paths={breadcrumbPaths} />

      <div>
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/entertainmentBanner.png"
          className="mx-auto w-[1600px]"
        />
      </div>

      <h1 className="mt-10 font-bold text-center text-primary playfair-display lg:text-5xl text-2xl">
       Entertainment Decoration
      </h1>

      <div className="grid grid-cols-2 gap-x-2 md:gap-y-14 gap-y-5 md:place-items-center lg:mt-20 mt-10">
        {imagelist.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              imagelist.length % 2 !== 0 && index === imagelist.length - 1
                ? "col-span-2"
                : ""
            }`}
            onClick={() => handleWhatsappRedirect(item.title)}
          >
            <img
              loading="lazy"
              decoding="async"
              src={item.src}
              alt={item.title}
              className="rounded-3xl md:w-[500px] md:h-auto w-48 h-40"
            />
            <h4 className="text-purple-800  md:text-3xl  text-center font-medium carter">
              {item.title}
            </h4>
          </div>
        ))}
      </div>

      {/* gallery */}
      <div className="relative mx-auto text-center md:mt-10">
        <h2 className="py-8 font-bold poppins md:text-2xl">
          #Entertainment&ActivitiesBestMovements
        </h2>
        <div className="flex justify-center items-center gap-1">
          <div className="place-items-end lg:space-y-2  space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/Entertainment/activity1.png"
              className=" lg:h-40 md:h-28 h-10"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/Entertainment/activity2.png"
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
              src="https://lavisheventzz-bangalore.b-cdn.net/Entertainment/activity4.png"
            />
          </div>
          <div className="lg:space-y-2 space-y-1">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/Entertainment/activity5.png"
            />
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/Entertainment/activity6.png"
            />
          </div>
          <div>
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/Entertainment/activity7.png"
            />
          </div>
        </div>
        <p className="lg:absolute bottom-10 right-2 [text-shadow:_-4px_4px_3px_#7D7C7C] playfair-display md:text-7xl text-4xl font-bold text-[#FFD1D1]">
          Wonderful Moments
        </p>
      </div>

      <div
        className="md:pt-20 pt-10"
        onClick={() => handleNavigation("photography", "/photography-service")}
      >
        <img
          loading="lazy"
          decoding="async"
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/photoshootactivity.png"
          className="mx-auto w-[2000px]"
        />
      </div>

      <div className="md:pt-20 pt-10">
        <h6 className="font-bold poppins md:py-6 pb-4 md:text-2xl">
          Why Celebrate With Lavisheventzz
        </h6>
        <img
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

export default Entertainment;
