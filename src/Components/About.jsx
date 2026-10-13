import React from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "./Breadcrumb";
const About = () => {
  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
  ];

  return (
    <div className="lg:pt-24 pt-28 mx-auto">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>About Lavish Eventzz | Event Planners in Bangalore</title>
        <meta
          name="description"
          content="Learn about Lavish Eventzz, a team of expert event planners in Bangalore delivering unforgettable experiences across weddings, birthdays, and corporate events."
        />
        <link rel="canonical" href="https://www.lavisheventzz.com/about" />
        <meta
          name="keywords"
          content="Professional Event Experts Bangalore
Event Coordination Team Bangalore,
Event Planning Specialists Bangalore,
Bangalore-Based Event Organizers,
Creative Event Designers Bangalore,
"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="About Lavish Eventzz | Event Planners in Bangalore"
        />
        <meta
          property="og:description"
          content="Learn about Lavish Eventzz, a team of expert event planners in Bangalore delivering unforgettable experiences across weddings, birthdays, and corporate events."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lavisheventzz.com/about" />
        <meta
          property="og:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/aboutBanner.png"
        />
        <meta property="og:site_name" content="Lavish Eventzz" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Lavish Eventzz | Event Planners in Bangalore"
        />
        <meta
          name="twitter:description"
          content="Learn about Lavish Eventzz, a team of expert event planners in Bangalore delivering unforgettable experiences across weddings, birthdays, and corporate events."
        />
        <meta
          name="twitter:url"
          content="https://www.lavisheventzz.com/about"
        />
        <meta
          name="twitter:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/aboutBanner.png"
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
        {/* Schema.org - LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Lavish Eventzz",
            url: "https://www.lavisheventzz.com",
            logo: "https://www.lavisheventzz.com/assets/logo-sUNpuNY_.png",
            description:
              "Learn about Lavish Eventzz, a team of expert event planners in Bangalore delivering unforgettable experiences across weddings, birthdays, and corporate events.",
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
      </Helmet>

      <Breadcrumb paths={breadcrumbPaths} />
      <div className="relative mx-auto w-full lg:h-[500px] ">
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/aboutBanner.png"
          className="w-full h-full object-cover"
          alt="ABout Banner"
        />
        <div className="w-56 md:w-auto absolute top-1/2 transform -translate-y-1/2 lg:right-48 right-0 text-center playfair-display  text-white md:space-y-6">
          <p className="md:text-7xl [text-shadow:_-4px_2px_2px_#AA6300] ">
            {" "}
            Lavish Eventzz{" "}
          </p>
          <p className="md:text-4xl italic">Spread the Smile </p>
          <p className="md:text-xl">
            {" "}
            Life’s Best Moments, Beautifully Planned
          </p>
        </div>
      </div>
      <div className="md:w-3/4 mx-auto md:py-20 py-10 px-6 md:px-0 ">
        <h1 className="text-center playfair-display md:text-5xl text-3xl font-semibold md:py-6 pb-4">
          About us
        </h1>
        <p className="md:text-2xl text-justify poly">
          Welcome to Lavish Eventzz, where we bring your dreams to life with
          stunning event decorations. Our passion for creating unforgettable
          experiences drives us to design and deliver exceptional decor for
          every occasion. Whether it's a grand wedding, a corporate gathering, a
          birthday party, or a private celebration, we specialize in crafting
          unique and personalized setups that reflect your vision. From elegant
          floral arrangements to thematic stage designs, we pay attention to
          every detail to ensure your event is nothing short of spectacular. At
          Lavish Eventzz, we blend creativity and precision to transform
          ordinary spaces into extraordinary venues. Our dedicated team works
          closely with you to understand your preferences, ensuring every
          element aligns with your expectations. With a commitment to excellence
          and innovation, we strive to create memories that last a lifetime.
          Trust Lavish Eventzz to elevate your special moments with
          sophistication, style, and charm. Let us help you turn your
          celebrations into timeless treasures!
        </p>
      </div>
    </div>
  );
};

export default About;
