import React from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "./Breadcrumb";

const PrivacyPolicy = () => {
  const breadcrumbPaths = [
  { name: "Home", link: "/" },
  { name: "Privacy Policy", link: "/privacy-policy" },
];

  return (
         <>
       <div className='lg:pt-24 pt-28 mx-auto'>
           <Breadcrumb paths={breadcrumbPaths} />
       </div>
    <div className="max-w-6xl mx-auto px-6  bg-white text-gray-800 md:mt-16 mt-24">
          <Helmet>
      {/* ✅ Meta Title & Description */}
      <title>Event Privacy Policy | Lavish Eventzz Data Protection Notice</title>
      <meta
        name="description"
        content="Read the privacy policy of Lavish Eventzz. Learn how we collect, use, and protect your personal data across event bookings, inquiries, and website interactions."
      />
      <meta
        name="keywords"
        content="Event Privacy Policy, Event Data Collection Policy, Customer Information Security, Website Privacy Notice, Event Booking Data Protection, User Data Usage Terms"
      />
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
              "name": "Privacy Policy",
              "item": "https://www.lavisheventzz.com/privacy-policy"
            }
          ]
        })}
      </script>
        </Helmet>

      {/* ✅ Canonical URL */}
      <link rel="canonical" href="https://www.lavisheventzz.com/privacy-policy" />
      <h1 className="text-3xl font-bold mb-6 text-purple-800">Privacy Policy</h1>
      <p className="mb-4 italic text-sm text-gray-600">Effective Date: 26/05/2025</p>

      <p className="mb-6">
        Welcome to Lavish Events ("we," "our," or "us"). Your privacy is very important to us. This Privacy Policy
        explains how we collect, use, disclose, and safeguard your information when you visit our website
        <a href="http://Lavisheventzz.com" className="text-blue-600 underline ml-1" target="_blank" rel="noopener noreferrer">
          www.lavisheventzz.com
        </a> and use our event planning services.
        Please read this Privacy Policy carefully. By using our website and services, you agree to the terms outlined here.
      </p>

      {/* Section 1: Information We Collect */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-purple-700">1. Information We Collect</h2>
        <h3 className="font-semibold mt-4">a. Personal Information</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Event details (e.g., date, type, location)</li>
          <li>Payment information (processed securely through trusted payment gateways)</li>
          <li>Mailing address (if applicable)</li>
        </ul>
        <h3 className="font-semibold mt-4">b. Non-Personal Information</h3>
        <ul className="list-disc list-inside">
          <li>Browser type</li>
          <li>IP address</li>
          <li>Device information</li>
          <li>Usage data and analytics</li>
          <li>Cookies and tracking technologies (see Cookies section below)</li>
        </ul>
      </section>

      {/* Section 2: How We Use Your Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-purple-700">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside">
          <li>Provide and manage your event planning services</li>
          <li>Communicate with you regarding your events and inquiries</li>
          <li>Process payments securely</li>
          <li>Improve our website and services</li>
          <li>Send promotional materials, newsletters, or updates (only if you opt-in)</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      {/* Section 3: Sharing Your Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-purple-700">3. Sharing Your Information</h2>
        <p className="mb-2">
          We do not sell, trade, or rent your personal information to third parties. However, we may share your
          information with trusted third parties who assist us in operating our website, conducting our business,
          or servicing you, such as:
        </p>
        <ul className="list-disc list-inside">
          <li>Event vendors and partners involved in your event</li>
          <li>Payment processors</li>
          <li>Marketing and analytics providers</li>
        </ul>
        <p className="mt-2">
          All such third parties are required to keep your information confidential and use it only for the purposes we specify.
        </p>
      </section>

      {/* Section 4: Cookies and Tracking */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-purple-700">4. Cookies and Tracking Technologies</h2>
        <p className="mb-2">
          Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies help us:
        </p>
        <ul className="list-disc list-inside mb-2">
          <li>Remember your preferences</li>
          <li>Understand website usage</li>
          <li>Deliver targeted advertisements (with your consent)</li>
        </ul>
        <p>
          You can control or disable cookies through your browser settings. Note that disabling cookies may affect some website functionality.
        </p>
      </section>

      {/* Section 5: Data Security */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-purple-700">5. Data Security</h2>
        <p>
          We implement reasonable administrative, technical, and physical safeguards to protect your personal
          information from unauthorized access, disclosure, alteration, or destruction. However, no method of
          transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
        </p>
      </section>

      {/* Section 6: Your Rights */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-purple-700">6. Your Rights and Choices</h2>
        <p className="mb-2">Depending on your location, you may have the right to:</p>
        <ul className="list-disc list-inside">
          <li>Access, correct, or delete your personal information</li>
          <li>Opt-out of marketing communications</li>
          <li>Restrict or object to certain data processing activities</li>
          <li>Request data portability</li>
        </ul>
        <p className="mt-2">
          To exercise these rights, please contact us at
          <a href="mailto:support@lavisheventzz.com" className="text-blue-600 underline ml-1">support@lavisheventzz.com</a>.
        </p>
      </section>

      {/* Section 7: Children's Privacy */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-purple-700">7. Children's Privacy</h2>
        <p>
          Our services are not directed to individuals under the age of 13. We do not knowingly collect personal
          information from children under 13. If we become aware that a child under 13 has provided us with personal
          information, we will take steps to delete such information promptly.
        </p>
      </section>

      {/* Section 8: Changes to Privacy Policy */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-purple-700">8. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal
          requirements. We encourage you to review this page periodically. Your continued use of the website after
          changes constitutes acceptance of the updated policy.
        </p>
      </section>

      {/* Section 9: Contact Info */}
      <section>
        <h2 className="text-2xl font-semibold mb-2 text-purple-700">9. Contact Us</h2>
        <p className="mb-2">If you have questions or concerns about this Privacy Policy or your personal data, please contact us:</p>
        <ul className="list-disc list-inside">
          <li><strong>Lavish Eventzz</strong></li>
          <li>Email: <a href="mailto:support@lavisheventzz.com" className="text-blue-600 underline">support@lavisheventzz.com</a></li>
          <li>Phone: [+91 9620558000]</li>
          <li>Address:  #55 17th main road JC Nagar Kurubharahalli bangalore 560086</li>
        </ul>
      </section>
    </div>
    </>
  );
};

export default PrivacyPolicy;
