import React from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "./Breadcrumb";

const ShippingDelivery = () => {
  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    { name: "Shipping and Delivery", link: "/shipping-delivery" },
  ];

  return (
    <>
      <div className="w-full sticky top-[90px] z-30 bg-white shadow-sm">
        <div className="max-w-8xl w-full mx-auto px-4">
          <Breadcrumb paths={breadcrumbPaths} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 bg-white text-gray-800 md:mt-16 mt-24">
        <Helmet>
          {/* ✅ Meta Title & Description */}
          <title>Shipping & Delivery | Lavish Eventzz - Reliable Event Service</title>
          <meta
            name="description"
            content="Discover Lavish Eventzz's shipping and delivery services for all your events. Get fast, secure and on-time support for weddings, parties and corporate events."
          />
          <meta
            name="keywords"
            content="Shipping & Delivery, Lavish Eventzz, Event Logistics, Event Delivery Services, Timely Event Setup, Wedding Event Shipping"
          />

          {/* ✅ Canonical URL */}
          <link rel="canonical" href="https://www.lavisheventzz.com/shipping-delivery" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.lavisheventzz.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Shipping and Delivery",
                  "item": "https://www.lavisheventzz.com/shipping-delivery"
                }
              ]
            })}
          </script>
        </Helmet>

        <h1 className="text-3xl font-bold mb-6 text-purple-800">
          Shipping & Delivery
        </h1>

        <p className="mb-6">
          We use reliable third-party courier services to deliver our products.
          While we strive to ensure timely delivery, we do not guarantee delivery
          times and are not responsible for delays caused by the shipping provider
          or unforeseen circumstances. You will be notified of the estimated
          delivery timeline at the time of purchase. All the orders will be
          dispatched in 3-4 business days and will be delivered in
          7-10 business days.
        </p>
      </div>
    </>
  );
};

export default ShippingDelivery;
