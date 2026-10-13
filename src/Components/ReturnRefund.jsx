import React from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "./Breadcrumb";

const ReturnRefund = () => {
  const breadcrumbPaths = [
  { name: "Home", link: "/" },
  { name: "Return and Refund Policy", link: "/return-refund" },
];

  return (
     <>
       <div className='lg:pt-24 pt-28 mx-auto'>
           <Breadcrumb paths={breadcrumbPaths} />
       </div>
    <div className="max-w-6xl mx-auto px-6 bg-white text-gray-800 md:mt-16 mt-24">
         <Helmet>
      {/* ✅ Meta Title & Description */}
      <title>Our Return and Refund Policy | Lavish Eventzz</title>
      <meta
        name="description"
        content="Explore Lavish Eventzz’s Return & Refund policy for all services and bookings. Explore how we handle cancellations, refunds and service-related concerns."
      />
      <meta
        name="keywords"
        content="Return and Refund Policy, Lavish Eventzz, Event Refund Terms, Event Cancellation Rules, Service Booking Refunds, Event Service Policy"
      />
         {/* ✅ Canonical URL */}
      <link rel="canonical" href="https://www.lavisheventzz.com/return-refund" />

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
              "name": "Return and Refund Policy",
              "item": "https://www.lavisheventzz.com/return-refund"
            }
          ]
        })}
      </script>
        </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-purple-800">Refund Policy</h1>

      <p className="mb-6">
        We will notify you once we’ve received and inspected your return, and
        let you know if the refund was approved or not. If approved, the refund
        will be credited to original payment method within 7-10 business days.
        Please remember it can take some time for your bank or credit card
        company to process and post the refund too. If more than 15 business
        days have passed since we’ve approved your return, please contact us.
      </p>
      <h1 className="text-3xl font-bold mb-6 text-purple-800">Return Policy</h1>

      <p className="mb-6">
        We have a 2 day return/exchange policy, which means you have 2 days
        after receiving your item to request a return/exchange. Once the
        return/exchange is approved it will be delivered in 7-10 business days.
        To be eligible for a return, your item must be in the same condition
        that you received it, unworn or unused, with tags, and in its original
        packaging. You’ll also need the receipt or proof of purchase.
      </p>
    </div>
    </>
  );
};

export default ReturnRefund;
