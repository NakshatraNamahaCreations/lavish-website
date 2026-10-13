
import React from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "./Breadcrumb";

const TermsConditions = () => {
    const breadcrumbPaths = [
        { name: "Home", link: "/" },
        { name: "Terms and Conditions", link: "/terms-conditions" },
    ];

    return (
             <>
       <div className='lg:pt-24 pt-28 mx-auto'>
           <Breadcrumb paths={breadcrumbPaths} />
       </div>
        <div className="max-w-6xl mx-auto px-6  bg-white text-gray-800 md:mt-16 mt-24">
            <Helmet>
                {/* Meta Tags */}
                <title>Event Terms and Conditions | Lavish Eventzz Guidelines</title>
                <meta
                    name="description"
                    content="Review the event terms and conditions of Lavish Eventzz. Understand our official policies on bookings, payments, cancellations, liability, and service agreement."
                />
                <meta
                    name="keywords"
                    content="Event Terms and Conditions, Event Booking Policies, Event Service Agreement, Lavish Eventzz Terms Guide, Event Contract Guidelines, Cancellation and Payment Rules"
                />
                <link rel="canonical" href="https://www.lavisheventzz.com/terms-conditions" />

                {/* Breadcrumb Schema */}
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
                                "name": "Terms and Conditions",
                                "item": "https://www.lavisheventzz.com/terms-conditions"
                            }
                        ]
                    })}
                </script>
            </Helmet>
       

            <h1 className="text-3xl font-bold mb-6 text-purple-800">Terms and Conditions</h1>
            <p className="mb-6 italic text-sm text-gray-600">Effective Date: 26/05/2025</p>

            <p className="mb-6">
                Welcome to LavishEventzz.com. These Terms and Conditions ("Terms") govern your use of our website and
                services. By accessing or using our website and services, you agree to comply with and be bound by these
                Terms. If you do not agree to these Terms, please do not use our website or services.
            </p>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">1. Use of Services</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>You must be at least 18 years old to use our website and services or have legal consent from a guardian.</li>
                    <li>You agree to provide accurate, current, and complete information when using our services.</li>
                    <li>You are responsible for maintaining the confidentiality of your account details and for any activities under your account.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">2. Event Planning Services</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>LavishEventzz offers event planning services, which may include venue selection, catering, entertainment, decoration, and coordination with vendors.</li>
                    <li>All event details, including costs and timelines, will be agreed upon in writing between you and LavishEventzz prior to the event.</li>
                    <li>While we strive to provide high-quality services, we do not guarantee specific results or outcomes beyond our reasonable control.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">3. Payment Terms</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>All fees and payment schedules will be detailed in the event agreement or booking confirmation.</li>
                    <li>Payments must be made in accordance with the agreed schedule to avoid delays or cancellation.</li>
                    <li>Any late payments may incur additional fees or penalties as outlined in your event agreement.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">4. Cancellation and Refunds</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Cancellation policies, including deadlines and any applicable fees, will be specified in the event agreement.</li>
                    <li>If the refund is approved, it will get credited in the respective payment source within 7-10 days.</li>
                    <li>Non-refundable deposits may apply, as stated in the event contract.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">5. Intellectual Property</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>All content on our website, including but not limited to logos, images, text, and designs, is the property of LavishEventzz or its partners and is protected by intellectual property laws.</li>
                    <li>You are prohibited from copying, distributing, or using any of our website's content without prior written permission.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">6. User Conduct</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Use our website or services for any unlawful purpose.</li>
                    <li>Disrupt or interfere with the proper functioning of our website.</li>
                    <li>Upload or transmit harmful, illegal, or infringing content.</li>
                    <li>Impersonate any individual or entity or misrepresent your affiliation with any party.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
                <p>
                    To the fullest extent permitted by law, LavishEventzz is not liable for any indirect, incidental, or
                    consequential damages arising from your use or inability to use our services. Our total liability for any
                    claim related to our services will not exceed the total amount you paid for those services.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">8. Indemnification</h2>
                <p>
                    You agree to indemnify and hold harmless LavishEventzz and its affiliates, officers, employees, and agents
                    from any claims, damages, or liabilities arising from your use of our services or violation of these Terms.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">9. Changes to Terms and Conditions</h2>
                <p>
                    LavishEventzz reserves the right to update or modify these Terms at any time. Any changes will be posted on
                    this page, and the updated Terms will be effective as of the new date.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">10. Governing Law</h2>
                <p>
                    These Terms will be governed by the laws of India. Any disputes arising from these Terms will
                    be resolved in the courts of India.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2 text-purple-700">9. Contact Us</h2>
                <p className="mb-2">If you have questions or concerns about this Privacy Policy or your personal data, please contact us:</p>
                <ul className="list-disc list-inside">
                    <li><strong>Lavish Eventzz</strong></li>
                    <li>Email: <a href="mailto:lavisheventzz@gmail.com" className="text-blue-600 underline">lavisheventzz@gmail.com</a></li>
                    <li>Phone: [+91 9620558000]</li>
                    <li>Address:  #55 17th main road JC Nagar Kurubharahalli bangalore 560086</li>
                </ul>
            </section>
            <p className="mt-10 text-purple-800 font-medium">Thank you for choosing Lavish Eventzz. We look forward to making your event a success!</p>
        </div>
        </>
    );
};

export default TermsConditions;
