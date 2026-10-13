import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, getAuthAxios } from "../utils/api";
import Breadcrumb from "./Breadcrumb";
import { Helmet } from "react-helmet-async";
import DynamicFaqs from "./DynamicFaqs";

const BlogShimmer = () => {
  return (
    <div className="animate-pulse">
      {/* Title */}
      <div className="h-8 bg-gray-200 rounded w-2/3 mb-6"></div>

      {/* Banner Image */}
      <div className="w-full h-64 bg-gray-200 rounded-lg mb-6"></div>

      {/* Paragraphs */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-11/12"></div>
        <div className="h-4 bg-gray-200 rounded w-10/12"></div>
        <div className="h-4 bg-gray-200 rounded w-9/12"></div>
      </div>
    </div>
  );
};

function kebabToTitle(str) {
  if (!str) return ""; // Ensure that we handle undefined or null values
  return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

const BlogDetails = () => {
  const { title } = useParams();
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState({ success: null, message: "" });
  const footerRef = useRef(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/blog/title/${title}`);
        setBlog(res.data.data);

        console.log("blog data", res.data.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err.message);
      }
    };

    fetchBlog();
  }, [title]);

  const alterTitle = blog ? kebabToTitle(blog?.title) : "";
  const formattedDate = blog?.createdAt?.split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: null, message: "" });

    try {
      const res = await getAuthAxios().post("/enquiries/create", formData);
      if (res.data.success) {
        setStatus({
          success: true,
          message: "Inquiry submitted successfully!",
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          message: "",
        });
        alert("Inquiry submitted successfully!");
      }
    } catch (err) {
      setStatus({
        success: false,
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  console.log("alterTitle", alterTitle);
  console.log("meta", alterTitle);
  console.log("alterText", alterTitle);

  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/blogs" },
    {
      name: alterTitle,
      link: `/blogs/${title}`,
    },
  ];

  return (
    <div className="min-h-screen w-screen   lg:py-24 pt-36 ">
      <Helmet>
        <title>{blog?.metaTitle}</title>
        <meta name="description" content={blog?.metaDescription} />

        <link
          rel="canonical"
          href={`https://www.lavisheventzz.com/blogs/${title}`}
        />
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog?.metaTitle} />
        <meta property="og:description" content={blog?.metaDescription} />
        <meta property="og:image" content={blog?.bannerImage} />
        <meta
          property="og:url"
          content={`https://www.lavisheventzz.com/blogs/${title}`}
        />
        <meta property="og:site_name" content="Lavish Eventzz" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog?.metaTitle} />
        <meta name="twitter:description" content={blog?.metaDescription} />
        <meta name="twitter:image" content={blog?.bannerImage} />
        <meta name="twitter:site" content="@lavishevents25" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: blog?.metaTitle,
            image: blog?.bannerImage,
            author: {
              "@type": "Person",
              name: "Balakrishna",
            },
            publisher: {
              "@type": "Organization",
              name: "Lavish Eventzz",
              logo: {
                "@type": "ImageObject",
                url: "https://www.lavisheventzz.com/assets/logo-sUNpuNY_.png",
              },
            },
            datePublished: formattedDate,
            dateModified: formattedDate,
            description: blog?.metaDescription,
            mainEntityOfPage: `https://www.lavisheventzz.com/blogs/${title}`,
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: blog?.faqs?.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.lavisheventzz.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://www.lavisheventzz.com/blogs",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: blog?.metaTitle,
                item: `https://www.lavisheventzz.com/blogs/${title}`,
              },
            ],
          })}
        </script>
      </Helmet>
      <div className="md:grid grid-cols-7 gap-4 ">
        <div className="col-span-5">
          <Breadcrumb paths={breadcrumbPaths} />
          {/* Blog Content (Page scrolls normally) */}
          <div className="flex-1 md:px-10 px-4">
            {blog ? (
              <div>
                <h1 className="text-4xl font-bold text-[#FF4286] mb-4">
                  {alterTitle}
                </h1>
                <img
                  src={blog.bannerImage}
                  alt={blog.title}
                  className="w-full h-auto object-cover rounded-lg shadow mb-6"
                />
                <div
                  className="prose max-w-full text-gray-700"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                ></div>
              </div>
            ) : (
              <BlogShimmer />
            )}
          </div>

          {blog?.faqs.length > 0 && (
            <div className="max-w-3xl p-4 mx-auto">
              <p className="text-center font-bold poppins text-2xl">FAQs</p>
              <p className="text-center font-bold poppins text-sm pb-5">
                Need help? Contact us for any queries related to us
              </p>
              <DynamicFaqs faqs={blog.faqs} />
            </div>
          )}
        </div>

        {/* Sticky Contact Form */}
        <div className="col-span-2 md:block flex w-full p-4 md:w-[350px] ">
          <div className="md:fixed md:top-[100px] bg-white border border-gray-200 rounded-lg shadow-lg p-6 md:p-8 w-full md:w-[350px]">
            <h2 className="text-xl font-semibold text-[#6a1b9a] mb-4">
              Contact Us
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name*"
                className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone*"
                className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
                required
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="service"
                placeholder="Services you want"
                className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
                value={formData.service}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Message"
                className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
                rows={3}
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#FF4286] hover:bg-[#e91e63] text-white py-2 px-4 rounded"
              >
                Submit
              </button>

              {status.message && (
                <p
                  className={`text-sm ${
                    status.success ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <div ref={footerRef} className="footer" />
    </div>
  );
};

export default BlogDetails;
