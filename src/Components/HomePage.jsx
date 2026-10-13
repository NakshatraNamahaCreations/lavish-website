import React, { useEffect, useState } from "react";
import SingleCarousel from "./SingleCarousel";

import CardCarousel from "./CardCarousel";
import PhotoGrid from "./PhotoGrid";
import Testimonials from "./Testimonials";
import { MdArrowRightAlt } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PurchasePopup from "./PurchasePopup";
import { navigateToSubcategory } from "../utils/navigationsUtils";
import { getAxios } from "../utils/api";
import WhatsappandCallFeature from "./WhatsappandCallFeature";
import { useDispatch } from "react-redux";
import { resetCurrentOrder } from "../features/orderdetails/orderSlice";
import { persistor } from "../app/store";
import { Helmet } from "react-helmet-async";
import Loader from "./Loader";
import ExpandableContent from "./ExpandableContent";
import DynamicFaqs from "./DynamicFaqs";

const occasions = [
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/better_together.png",
    title: "Better together",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/ring.png",
    title: "Ring Ceremony",
    link: "/ringceremonydecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/party.png",
    title: "Let's Party Decor",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/car.png",
    title: "Car Boot Decoration",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/house_warming.png",
    title: "House warming",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/retirement.png",
    title: "Retirement Decor",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/mundan.png",
    title: "Mundan Ceremony",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/rice_cermony.png",
    title: "Annaprashan Ceremony Decoration",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/congratulations_Decor.png",
    title: "Congratulations Decor",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/half_Saree_Decoration.png",
    title: "Half Saree Decoration",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/baptism_Decoration.png",
    title: "Baptism Decoration",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/cardecorImg.png",
    title: "Car Decoration",
    link: "/service",
  },
];

const varities = [
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/kid_bday.png",
    text: "Kids Birthday",
    link: "/kidsbirthdaydecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/adult_bday.png",
    text: "Adult birthday Decoration",
    link: "/birthdaydecoration",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/wlcm_baby.png",
    text: "Welcome Baby Decoration",
    link: "/welcomebabydecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/baby_shower.png",
    text: "Baby Shower Decoration",
    link: "/babyshowerdecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Aniversary.png",
    text: "Anniversary Decoration",
    link: "/anniversarydecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Naming.png",
    text: "Naming Ceremony Decoration",
    link: "/namingceremonydecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/bday_party.png",
    text: "Entertainment",
    link: "/entertainmentdecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/photography.png",
    text: "Photography",
    link: "/photography-service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/proposal.png",
    text: "Proposal Decoration",
    link: "/service/",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/first_night.png",
    text: "First Night Decoration",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/ballon.png",
    text: "Balloon Bouquet",
    link: "/service/",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/surprise.png",
    text: "Surprise Gifts",
    link: "/service/",
  },
];

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

let content = `
<h1 class="text-2xl font-bold mb-4 text-gray-900">
  Lavish Eventzz - Balloon Decoration in Bangalore
</h1>

<p class="mb-4 leading-relaxed text-gray-700">
  When it comes to making your special moments unforgettable, Lavish Eventzz is one of the most trusted names for Balloon Decoration in Bangalore. Whether you are planning a birthday party, anniversary celebration, or a grand festival, we bring life to your occasions with colorful balloons, creative backdrops, and eye-catching arrangements. Alongside our expertise in balloons, we also offer <strong>Flower Decoration in Bangalore</strong> to add elegance and charm to your events. Our team combines creativity with professionalism to ensure your celebrations look stunning and leave lasting impressions.
</p>

<h2 class="text-2xl font-semibold mt-6 mb-3 text-gray-900">Why Choose Lavish Eventzz</h2>
<p class="mb-4 leading-relaxed text-gray-700">
  Choosing the right decorator is just as important as planning the event itself. At Lavish Eventzz, we specialize in <a href="https://www.lavisheventzz.com/birthday-event-planner-in-bangalore">Balloon Decoration in Bangalore</a> that suits all age groups and themes. From kids birthday parties to elegant anniversary setups, our team ensures every detail matches your vision. Customers trust us because:
</p>
<ul class="list-disc list-inside mb-4 text-gray-700">
  <li class="mb-2">We offer innovative balloon themes at affordable prices.</li>
  <li class="mb-2">We use high-quality balloons and flowers for safe and long-lasting decorations.</li>
  <li class="mb-2">Our dedicated staff delivers decorations on time and sets up hassle-free.</li>
  <li class="mb-2">We also provide Flower Decoration in Bangalore for traditional, elegant, and classy events.</li>
</ul>
<p class="mb-4 leading-relaxed text-gray-700">
  With years of experience, Lavish Eventzz has become the go-to choice for families and corporates alike.
</p>

<h2 class="text-2xl font-semibold mt-6 mb-3 text-gray-900">Our Service as Balloon Decoration in Bangalore</h2>
<p class="mb-4 leading-relaxed text-gray-700">
  At Lavish Eventzz, we understand that each occasion has its own mood and requirements. That’s why our Balloon Decoration in Bangalore service is versatile and adaptable for different events. Here’s how we add color and happiness to your celebrations:
</p>

<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900">Birthday Decoration</h3>
<p class="mb-4 leading-relaxed text-gray-700">
  Birthdays are incomplete without balloons. Our Balloon Decoration in Bangalore includes themed balloon arches, ceiling hangings, and stage setups that make birthdays memorable. For a touch of sophistication, we can blend balloons with Flower Decoration in Bangalore, creating a festive yet elegant vibe.
</p>

<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900">Anniversary Decoration</h3>
<p class="mb-4 leading-relaxed text-gray-700">
  Celebrate your love story with romantic Balloon Decoration in Bangalore. We design heart-shaped balloon backdrops, candlelight balloon setups, and couple seating areas that turn anniversaries into magical evenings. Adding Flower Decoration in Bangalore with roses and lilies makes the atmosphere even more special.
</p>

<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900">Baby Shower Decoration</h3>
<p class="mb-4 leading-relaxed text-gray-700">
  Welcoming a new member into the family is a joyous moment. Our Balloon Decoration in Bangalore for baby showers includes pastel shades, cloud themes, and cute character balloons. We also use fresh flowers to complement the balloon designs, making the decor soothing and graceful.
</p>

<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900">Welcome Baby Decoration</h3>
<p class="mb-4 leading-relaxed text-gray-700">
  Parents love to celebrate the arrival of their little one, and we make it extra special with vibrant Balloon Decoration in Bangalore. From balloon cradles to entrance arches, our designs create a warm welcome. Pairing it with Flower Decoration in Bangalore adds freshness to the celebration.
</p>

<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900">Naming Ceremony Decoration</h3>
<p class="mb-4 leading-relaxed text-gray-700">
  For traditional events like naming ceremonies, we provide elegant Balloon Decoration in Bangalore that blends modern themes with cultural touches. Flowers combined with balloons bring a spiritual and pure vibe to the event.
</p>

<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900">House Warming Decoration</h3>
<p class="mb-4 leading-relaxed text-gray-700">
  A new home is a milestone worth celebrating. Our Balloon Decoration in Bangalore for <a href="https://www.lavisheventzz.com/service/house-warming-decoration/681b11b6ddb6b3f4663e791f">house warming decoration</a> includes entrance decor, living room arrangements, and terrace party setups. With Flower Decoration in Bangalore, the event looks more graceful and welcoming for your guests.
</p>

<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900">Festival Decoration</h3>
<p class="mb-4 leading-relaxed text-gray-700">
  Festivals bring families and friends together. Whether it’s Diwali, Christmas, or New Year’s Eve, our Balloon Decoration in Bangalore brings vibrance to your celebrations. Balloons combined with lights and Flower Decoration in Bangalore create the perfect festive mood.
</p>

<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900">Ring Ceremony Decoration</h3>
<p class="mb-4 leading-relaxed text-gray-700">
  Ring ceremonies demand elegance and charm. Our Balloon Decoration in Bangalore uses subtle shades like gold, silver, and white to create romantic vibes. Blending flowers into the backdrop enhances the beauty of the moment.
</p>

<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900">Party Decoration</h3>
<p class="mb-4 leading-relaxed text-gray-700">
  No matter the theme, we provide the best Balloon Decoration in Bangalore for private and corporate parties. From neon balloon walls to glow-in-the-dark balloons, our creative ideas make your party stand out. For formal parties, our Flower Decoration in Bangalore adds sophistication.
</p>

<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900">Shop Opening Decoration</h3>
<p class="mb-4 leading-relaxed text-gray-700">
  Grand openings need attractive setups to catch attention. Our Balloon Decoration in Bangalore includes entrance arches, balloon pillars, and branding balloons. To add a professional touch, we often combine it with Flower Decoration in Bangalore for ribbon-cutting ceremonies.
</p>

<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900">Office Decoration</h3>
<p class="mb-4 leading-relaxed text-gray-700">
  Corporate events and office parties deserve a neat yet festive look. Our Balloon Decoration in Bangalore brings energy and enthusiasm to workplace events. For formal occasions like annual functions or product launches, our Flower Decoration in Bangalore balances tradition with elegance.
</p>

<h3 class="text-xl font-semibold mt-4 mb-2 text-gray-900">Car Boot Decoration</h3>
<p class="mb-4 leading-relaxed text-gray-700">
  Surprise your loved ones with our trendy Balloon Decoration in Bangalore for car boots. Perfect for proposals, anniversaries, or just a surprise date, this service creates an unforgettable memory. Balloons, fairy lights, and flowers together turn a simple <a href="https://www.lavisheventzz.com/service/car-boot-decoration/68385310e368dc934714e27a">car boot</a> into a magical spot.
</p>

<h2 class="text-2xl font-semibold mt-6 mb-3 text-gray-900">Our Service Areas for Balloon Decoration in Bangalore</h2>
<p class="mb-4 leading-relaxed text-gray-700">
  At Lavish Eventzz, we provide professional Balloon Decoration in Bangalore across all major locations, ensuring your celebrations look stunning no matter where you are. Our dedicated team delivers and sets up decorations right at your doorstep for a hassle-free experience.
</p>
<ul class="list-disc list-inside mb-4 text-gray-700">
  <li>Whitefield</li>
  <li>Bellandur</li>
  <li>Marathahalli</li>
  <li>Electronic City</li>
  <li>HSR Layout</li>
  <li>Koramangala</li>
  <li>JP Nagar</li>
  <li>Rajarajeshwari Nagar</li>
  <li>Hebbal</li>
  <li>KR Puram</li>
  <li>Yelahanka</li>
  <li>HBR Layout</li>
</ul>

<h2 class="text-2xl font-semibold mt-6 mb-3 text-gray-900">Why Customers Love Lavish Eventzz</h2>
<p class="mb-4 leading-relaxed text-gray-700">
  Customers choose Lavish Eventzz again and again because we make every celebration unique. Our expertise in Balloon Decoration in Bangalore ensures that no two events look the same. We listen to your ideas and bring them to life with creativity. We also understand the importance of tradition, which is why our Flower Decoration in Bangalore is a favorite among families.
</p>
<p class="mb-4 leading-relaxed text-gray-700">
  Our commitment to quality, timely delivery, and professional setup has earned us loyal customers across Bangalore. Whether it’s a small home event or a large corporate function, our team gives equal importance to every project.
</p>

<h2 class="text-2xl font-semibold mt-6 mb-3 text-gray-900">Book the Best Birthday Decorations for a Memorable Celebration</h2>
<p class="mb-4 leading-relaxed text-gray-700">
  If you are planning a birthday, anniversary, or any special event, Lavish Eventzz is your one-stop solution. Our Balloon Decoration in Bangalore services are designed to fit every budget and style. Alongside balloons, our Flower Decoration in Bangalore adds a classy and elegant touch, making your celebration even more memorable.
</p>
<p class="mb-4 leading-relaxed text-gray-700">
  <a href="https://www.lavisheventzz.com/contact">Booking with Lavish Eventzz</a> is simple. Just share your requirements, and our team will handle everything from design to execution. All you need to do is enjoy your special day while we create a magical atmosphere.
</p>
`;

const faqs = [
  {
    question:
      "Do you provide Balloon Decoration in Bangalore for all occasions?",
    answer:
      "Yes, we offer Balloon Decoration in Bangalore for birthdays, anniversaries, corporate events, and more.",
  },
  {
    question: "Can I combine balloon and flower decoration?",
    answer:
      "Absolutely. Many of our clients prefer Flower Decoration in Bangalore along with balloons for a balanced and elegant look.",
  },
  {
    question: "How early should I book your service?",
    answer:
      "We recommend booking our Balloon Decoration in Bangalore at least a week in advance, especially during festive seasons.",
  },
  {
    question: "Do you provide decoration services at home as well?",
    answer:
      "Yes, our Balloon Decoration in Bangalore covers homes, banquet halls, offices, and even outdoor locations.",
  },
  {
    question: "What is the cost of Flower Decoration in Bangalore?",
    answer:
      "The cost of Flower Decoration in Bangalore depends on the event size, flower types, and setup requirements.",
  },
  {
    question: "Do you provide car boot decoration?",
    answer:
      "Yes, we offer trendy Balloon Decoration in Bangalore for car boot surprises, perfect for romantic celebrations.",
  },
  {
    question: "How long will the decorations last?",
    answer:
      "Our Balloon Decoration in Bangalore usually lasts for hours, and with high-quality materials, some arrangements can stay intact for more than a day.",
  },
];

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [servicesbySubcategory, setServicesbySubcategory] = useState([]);
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const hanlderesetCurrentOrder = async () => {
      if (persistor && persistor.purge) {
        await persistor.purge();
      }
      dispatch(resetCurrentOrder());
    };
    hanlderesetCurrentOrder();
  }, [dispatch]);

  const upcomingBanner = banner.filter(
    (item) => item.bannerType === "upcoming banner"
  );

  const fetchServices = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await getAxios().get(
        `/services?page=${page}&limit=${limit}`
      );

      const { data, totalPages, page: currentPage } = response.data;

      setServices(data); // store services for this page
      console.log("trending Services", data);
    } catch (error) {
      console.error("Error fetching services:", error.message);
      setError("Failed to fetch services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchServicesBySubcategory = async (
    subcategory,
    page = 1,
    limit = 10
  ) => {
    setLoading(true);
    try {
      const response = await getAxios().get(
        `/services/by-subcategory/${subcategory}?page=${page}&limit=${limit}`
      );

      const {
        data,
        page: currentPage,
        totalPages,
        totalServices,
      } = response.data;

      setServicesbySubcategory(data); // store the actual services

      console.log("servicesBySubcategory:", data);
    } catch (error) {
      console.error("Error fetching services:", error.message);
      setError("Failed to fetch services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBanner = async () => {
    try {
      const response = await getAxios().get(`/banners/`);
      const { data } = response.data;
      setBanner(data);
      // console.log("banner", data)
    } catch (error) {
      console.error("Error fetching banner:", error.message);
      setError("Failed to fetch banner. Please try again later.");
    }
  };

  useEffect(() => {
    fetchServices(1, 10);
    fetchServicesBySubcategory("Kids Birthday");
    fetchBanner();
  }, []);

  const handleNavigation = (text, baseRoute) => {
    navigateToSubcategory({
      text,
      baseRoute,
      navigate,
      setLoading,
      setError,
    });
  };

  const handleWhatsappRedirect = (value) => {
    const message = `Hello, I want to know more about ${value} Decoration.`;
    const encodedMessage = encodeURIComponent(message);
    const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;
    window.open(WhatsAppLink, "_blank");
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>
          Balloon Decoration in Bangalore | Lavish Eventzz | Book Now
        </title>
        <meta
          name="description"
          content="Lavish Eventzz offers creative Balloon Decoration in Bangalore for birthdays, anniversaries, baby showers & more. Book now for vibrant & memorable celebrations."
        />
        <link rel="canonical" href="https://www.lavisheventzz.com" />
        <meta
          name="keywords"
          content="Balloon Decoration in Bangalore, Flower Decoration in Bangalore, Birthday Party Planners Bangalore, Corporate Event Solutions Bangalore, Event Decor Services Bangalore, Luxury Event Planners in Bangalore"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Balloon Decoration in Bangalore | Lavish Eventzz | Book Now"
        />
        <meta
          property="og:description"
          content="Lavish Eventzz offers creative Balloon Decoration in Bangalore for birthdays, anniversaries, baby showers & more. Book now for vibrant & memorable celebrations."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lavisheventzz.com" />
        <meta
          property="og:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/banner5.png"
        />
        <meta property="og:site_name" content="Lavish Eventzz" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Balloon Decoration in Bangalore | Lavish Eventzz | Book Now"
        />
        <meta
          name="twitter:description"
          content="Lavish Eventzz offers creative Balloon Decoration in Bangalore for birthdays, anniversaries, baby showers & more. Book now for vibrant & memorable celebrations."
        />
        <meta name="twitter:url" content="https://www.lavisheventzz.com/" />
        <meta
          name="twitter:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/banner5.png"
        />
        <meta name="twitter:site" content="@LavishEvents25" />

        {/* Schema.org JSON-LD - LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Lavish Eventzz",
            url: "https://www.lavisheventzz.com",
            logo: "https://www.lavisheventzz.com/assets/logo-sUNpuNY_.png",
            description:
              "Lavish Eventzz offers creative Balloon Decoration in Bangalore for birthdays, anniversaries, baby showers & more. Book now for vibrant & memorable celebrations.",
            telephone: "+91-9620558000",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "55, 17th Main Rd, RIEHS Layout, JC Nagar, Kurubarahalli, Basaweshwara Nagar",
              addressLocality: "Bengaluru",
              addressRegion: "Karnataka",
              postalCode: "560086",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.facebook.com/people/Lavish-Eventzz/61577120475321/",
              "https://x.com/LavishEvents25",
              "https://www.youtube.com/@LavishEventzz-2025",
              "https://www.linkedin.com/in/lavish-eventzz-917b43366/",
              "https://www.instagram.com/lavisheventzz.com_/",
              "https://www.instagram.com/lavisheventzz",
            ],
            openingHours: "Mo-Su 00:00-23:59",
            geo: {
              "@type": "GeoCoordinates",
              latitude: "12.9155",
              longitude: "77.5739",
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          })}
        </script>
      </Helmet>

      <div className="container md:pt-24 pt-32  mx-auto">
        {/* // Whatsapp and call Icons */}
        <div className=" fixed bottom-[100px] right-5 lg:flex flex-col gap-3 z-50">
          <WhatsappandCallFeature />
        </div>

        <PurchasePopup />

        <SingleCarousel banner={banner} />
        <section className="lg:py-20 p-2 ">
          <h2 className=" font-bold text-center text-primary playfair-display lg:text-5xl text-2xl">
            Upcoming Festivals
          </h2>
          <div
            className="relative flex justify-center md:py-10 py-4 cursor-pointer"
            onClick={() => handleNavigation("Festival Decoration", "/service/")}
          >
            {/* <img
              src={`${upcomingBanner[0]?.bannerImage}`}
              alt="Upcoming banner"
              className="w-full lg:h-[400px] md:h-[250px] h-[180px] object-cover rounded-2xl"
            /> */}
            <div className="w-full aspect-[16/6]">
              <img
                src={upcomingBanner[0]?.bannerImage}
                alt="Upcoming banner"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          <div className="flex justify-center items-center max-w-4xl mx-auto lg:gap-72 gap-20">
            <motion.div
              className="rounded-full text-center text-xl"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() =>
                handleNavigation("Kids Birthday", "/kidsbirthdaydecor")
              }
            >
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/decor1.png"
                alt="img"
                className=""
              />
              <h4 className="py-3 md:text-2xl text-sm font-bold carter">
                Kids Decorations
              </h4>
            </motion.div>

            <motion.div
              className="rounded-full text-center mx-auto text-xl"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() =>
                handleNavigation("Entertainment", "/entertainmentdecor")
              }
            >
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/decor2.png"
                alt="img"
                className=""
              />
              <h4 className="py-3 md:text-2xl text-sm font-bold carter ">
                Entertainment & Activities
              </h4>
            </motion.div>
          </div>
        </section>

        <section className="">
          <h3 className=" font-bold text-center text-primary poppins text-xl">
            Serving All over Bangalores
          </h3>
          <h6 className="lg:text-4xl text-3xl tracking-tighter font-bold text-center playfair-display text-primary">
            Make every Occasion Special
          </h6>
          <div className="grid grid-cols-2 lg:flex flex-wrap md:justify-between justify-center pt-10 lg:gap-14 gap-y-5 lg:w-[80%] mx-auto px-4 lg:px-0 ">
            {varities.map((item, index) => (
              <div
                key={index}
                className="lg:my-5 md:rounded-[80px] rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleNavigation(item.text, item.link)}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={item.src}
                  alt={item.text}
                  className="mx-auto lg:h-[400px] h-[170px] border-2 border-primary object-cover md:rounded-[80px] rounded-lg"
                />
                <h4 className="text-center md:text-2xl mx-2 px-2 text-black rounded-md py-3 carter my-3">
                  {item.text}
                </h4>
              </div>
            ))}
          </div>
          <div>
            {/* <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/WhatsApp%20Image%202025-09-25%20at%205.54.18%20PM.jpeg"
              alt="banner"
              className="lg:pb-5 py-4 md:py-0 w-screen"
            /> */}
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/WhatsApp%20Image%202025-09-25%20at%205.54.18%20PM.jpeg"
              alt="banner"
              width="1366"
              height="513"
              className="lg:pb-5 py-4 md:py-0 w-screen object-cover"
            />
          </div>
          <div className="flex flex-wrap lg:gap-x-40 lg:gap-y-20 md:gap-3 gap-1 justify-center lg:py-20 md:py-10 py-0 mx-auto lg:px-0 md:my-0 my-5">
            {occasions.map((item, idx) => (
              <div
                key={idx}
                className="lg:w-[260px] md:w-[230px] w-[120px] cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleNavigation(item.title, item.link)}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={item.src}
                  alt={item.title}
                  className=""
                />
                <h5 className="md:text-2xl text-center carter py-3 text-xs">
                  {item.title}
                </h5>
              </div>
            ))}
          </div>

          <div className="relative flex justify-center lg:py-10">
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/banner/banner6.png"
              alt="banner"
              width="1200"
              height="440"
              className="w-full"
            />

            <div
              className="absolute top-1/2 lg:left-44 md:left-24 left-12 transform -translate-y-1/2     "
              // onClick={() => handleWhatsappRedirect("Shop")}
              onClick={() =>
                handleNavigation("Shop Opening Decoration", "/service")
              }
            >
              <div className=" md:p-2 p-1  lg:w-[350px] md:w-[240px] w-[120px]  mx-auto">
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://lavisheventzz-bangalore.b-cdn.net/shop_decoration.png"
                  alt="Shop decoration"
                  className="w-full max-h-full object-contain  "
                />
              </div>

              <h4 className="carter lg:text-3xl md:text-2xl text-xs text-center text-black ">
                Shop Opening Decoration
              </h4>
            </div>

            <div
              className="absolute top-1/2 lg:right-44 md:right-24 right-12 transform -translate-y-1/2 "
              // onClick={() => handleWhatsappRedirect("Office")}
              onClick={() =>
                handleNavigation("Office Balloon Decoration", "/service")
              }
            >
              <div className=" md:p-2 p-1  lg:w-[350px] md:w-[240px] w-[120px]  mx-auto">
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://lavisheventzz-bangalore.b-cdn.net/office_decor.png"
                  alt="office decoration"
                  className="w-full max-h-full object-contain"
                />
              </div>
              <h4 className="carter lg:text-3xl md:text-2xl text-xs text-center text-black ">
                Office Decoration
              </h4>
            </div>
          </div>
        </section>

        <section className="md:pt-10 pt-5  px-4 lg:px-0">
          <div className="flex justify-between ">
            <h4 className="lg:text-2xl text-primary font-bold playfair-display">
              Kids Celebration
            </h4>
            <div
              className="text-secondary font-bold flex items-center text-sm md:text-base cursor-pointer  "
              // onClick={() => handleNavigation("Kids Birthday", "/service/")}
              onClick={() => navigate("/all-services/681b1136ddb6b3f4663e78f4")}
            >
              View All <MdArrowRightAlt className="md:text-2xl text-xl " />
            </div>
          </div>
          <CardCarousel
            centercardData={servicesbySubcategory}
            loading={loading}
          />

          <div className="relative md:flex hidden justify-center lg:py-10">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/banner/banner7.png"
              alt="banner"
              className="w-full"
            />
            <div
              className="absolute top-1/2 lg:left-44 md:left-24 left-12 transform -translate-y-1/2"
              onClick={() =>
                handleNavigation("Bride to be Decoration", "/bridetobedecor")
              }
              style={{ cursor: "pointer" }}
            >
              <div className=" lg:rounded-tr-[60px] lg:rounded-bl-[80px] rounded-tr-3xl rounded-bl-3xl lg:w-[420px] md:w-[240px] w-[120px]  mx-auto">
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://lavisheventzz-bangalore.b-cdn.net/bridetobe_decor.png"
                  alt="Bride To be decoration"
                  className="w-full max-h-full object-contain lg:rounded-tr-[60px] lg:rounded-bl-[80px] rounded-tr-3xl rounded-bl-3xl "
                />
              </div>
              <h4 className="carter lg:text-3xl md:text-xl text-xs text-center text-black lg:pt-4">
                Bride to be Decoration
              </h4>
            </div>
            <div
              className="absolute top-1/2 lg:right-44 md:right-24 right-12 transform -translate-y-1/2"
              onClick={() =>
                handleNavigation("Groom to be Decoration", "/groomtobedecor")
              }
              style={{ cursor: "pointer" }}
            >
              <div className="  lg:rounded-tl-[60px] lg:rounded-br-[80px] rounded-tl-3xl rounded-br-3xl lg:w-[420px] md:w-[240px] w-[120px]  mx-auto">
                <img
                  loading="lazy"
                  decoding="async"
                  src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe_decor.png"
                  alt="Groom to be decoration"
                  className="w-full max-h-full object-contain lg:rounded-tl-[60px] lg:rounded-br-[80px] rounded-tl-3xl rounded-br-3xl "
                />
              </div>
              <h4 className="carter lg:text-3xl md:text-xl text-xs text-center text-black lg:pt-4">
                Groom to be Decoration
              </h4>
            </div>
          </div>

          <div className="relative md:hidden ">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/banner/bannermobile7.png"
              alt="banner"
              className="w-full"
              width="398"
              height="953"
            />
            <div
              className="absolute top-44  left-1/2 transform -translate-x-1/2 w-[300px]"
              onClick={() =>
                handleNavigation("Bride to be Decoration", "/bridetobedecor")
              }
              style={{ cursor: "pointer" }}
            >
              <h4 className="carter  text-2xl pb-5 text-center text-black ">
                Bride to be Decoration
              </h4>
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/bridetobe_decor.png"
                alt="Bride To be decoration"
                className="w-full max-h-full object-contain "
              />
            </div>
            <div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[300px]"
              onClick={() =>
                handleNavigation("Groom to be Decoration", "/groomtobedecor")
              }
              style={{ cursor: "pointer" }}
            >
              <h4 className="carter text-2xl pb-5  text-center text-black ">
                Groom to be Decoration
              </h4>
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe_decor.png"
                alt="Groom to be decoration"
                className="w-full max-h-full object-contain  "
              />
            </div>
          </div>

          <div className="flex justify-between mt-5 ">
            <h4 className="lg:text-2xl text-primary font-bold playfair-display ">
              New Trendings Design
            </h4>
            <div
              className="text-secondary font-bold flex items-center text-sm md:text-base cursor-pointer"
              onClick={() => navigate("/all-services")}
            >
              View All <MdArrowRightAlt className="md:text-2xl text-xl" />
            </div>
          </div>
          <CardCarousel centercardData={services} loading={loading} />
          <div
            className="relative lg:mt-44 md:mt-32 mt-16 mb-5 flex flex-col items-center"
            onClick={() => handleNavigation("Candlelight", "/service")}
          >
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/banner/banner8.png"
              alt="banner"
              className="w-full h-auto"
              height="607"
              width="1318"
            />
            <div className="absolute lg:-top-24  md:-top-16 -top-8 lg:left-[9%] flex md:gap-4 gap-1 items-center  ">
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/candleImg1.png"
                alt="candleImg1"
                className="lg:w-64 lg:h-56 md:w-40 md:h-32 w-20 h-20 object-cover rounded-s-3xl"
              />
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/candleImg2.png"
                alt="candleImg2"
                className="lg:w-64 lg:h-56 md:w-40 md:h-32 w-20 h-20 object-cover"
              />
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/candleImg3.png"
                alt="candleImg3"
                className="lg:w-64 lg:h-56 md:w-40 md:h-32 w-20 h-20 object-cover"
              />
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/candleImg4.png"
                alt="candleImg4"
                className="lg:w-64 lg:h-56 md:w-40 md:h-32 w-20 h-20 object-cover rounded-e-3xl"
              />
            </div>

            <div className="absolute lg:bottom-24 bottom-4 left-1/2 transform -translate-x-1/2 text-center text-[#0a3f39] lg:space-y-6">
              <button className="lg:px-10 px-4 bg-[#0a3f39] text-white rounded-2xl lg:py-3 py-1 lg:text-xl font-semibold lg:mt-4">
                BOOK NOW
              </button>
            </div>
          </div>
        </section>

        <section className="pb-5">
          <h2 className="lg:text-4xl text-2xl font-bold text-center  text-primary playfair-display">
            Curating moments that shine{" "}
          </h2>
          <h6 className="text-sm font-bold text-center poppins text-primary">
            Love designs, flawless execution, unforgattable results.{" "}
          </h6>

          <PhotoGrid />
        </section>

        <div className="relative flex justify-center lg:py-10">
          <img
            loading="lazy"
            decoding="async"
            src="https://lavisheventzz-bangalore.b-cdn.net/banner/banner9.png"
            alt="banner9"
            className="w-full"
            width="1135"
            height="400"
          />
          {/* <Link to="/service/7"> */}
          <div
            className="absolute top-1/2 lg:left-44 md:left-24 left-12 transform -translate-y-1/2     "
            onClick={() => handleNavigation("Haldi", "/service")}
          >
            <div className="bg-[#FF9500] md:p-2 p-1 lg:rounded-tr-[60px] lg:rounded-bl-[80px] rounded-tr-3xl rounded-bl-3xl lg:w-[420px] md:w-[240px] w-[120px]  mx-auto">
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/haldi.png"
                alt="Haldi Decoration"
                className="w-full max-h-full object-contain lg:rounded-tr-[60px] lg:rounded-bl-[80px] rounded-tr-3xl rounded-bl-3xl "
              />
            </div>
            <h4 className="carter lg:text-3xl md:text-2xl text-xs text-center text-black lg:pt-4">
              Haldi Decoration
            </h4>
          </div>
          {/* </Link> */}

          <div
            className="absolute top-1/2 lg:right-44 md:right-24 right-12 transform -translate-y-1/2   "
            onClick={() => handleNavigation("Mehendi", "/service")}
          >
            <div className="bg-[#FF9500] md:p-2 p-1 lg:rounded-tl-[60px] lg:rounded-br-[80px] rounded-tl-3xl rounded-br-3xl lg:w-[420px] md:w-[240px] w-[120px]  mx-auto">
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/Mehendi.png"
                alt="Mehendi Decoration"
                className="w-full max-h-full object-contain lg:rounded-tl-[60px] lg:rounded-br-[80px] rounded-tl-3xl rounded-br-3xl "
              />
            </div>
            <h4 className="carter lg:text-3xl md:text-2xl text-xs text-center text-black lg:pt-4">
              Mehendi Decoration
            </h4>
          </div>
        </div>

        <section className="pt-10 text-primary lg:px-0 px-4">
          <h2 className="text-xl font-bold  text-pimary">Testimonials </h2>
          <h3 className="md:text-4xl text-2xl tracking-tighter font-bold lg:py-4  text-pimary">
            Hear from our{" "}
            <span className="md:text-5xl text-3xl italic">Lavish</span> Clients{" "}
          </h3>
          <h2 className="text-md tracking-tighter font-bold   text-pimary">
            Real experience from our happy Clients{" "}
          </h2>
          <Testimonials reviewData={reviewData}/>
        </section>

        <div className="mt-10">
          <ExpandableContent htmlContent={content} />
        </div>

        {faqs.length > 0 && (
          <div className="max-w-3xl p-4 mx-auto">
            <p className="text-center font-bold poppins text-2xl">FAQs</p>
            <p className="text-center font-bold poppins text-sm pb-5">
              Need help? Contact us for any queries related to us
            </p>
            <DynamicFaqs faqs={faqs} />
          </div>
        )}

        {/* Loading and Error States */}
        {loading && <Loader />}

        {error && (
          <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            {error}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
