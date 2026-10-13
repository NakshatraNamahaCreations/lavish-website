import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import { getAxios } from "../utils/api";
import { Helmet } from "react-helmet-async";
import ExpandableContent from "./ExpandableContent";
import DynamicFaqs from "./DynamicFaqs";
import Breadcrumb from "./Breadcrumb";
import Pagination from "./Pagination";

// Only show banner for these exact subcategories
const banners = {
  "Candlelight Decoration":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/candlelight.png",
  "Balloon Bouquet":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/bouquetBanner.png",
  "House Warming Decoration":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/housewarming.png",
  "Surprise Gifts":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/giftbanner.png",
  "Proposal Decoration":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/proposalbanner.png",
  "Mundan Ceremony":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/mundan.jpg",
  "Haldi Decor": "https://lavisheventzz-bangalore.b-cdn.net/banner/haldi.jpg",
  "Mehendi Decor":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/mendhi.jpg",
  "Annaprashan Ceremony Decoration":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/riceceremony.jpg",
  "Retirement Decoration":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/retirment.jpg",
};

const ShimmerCard = () => (
  <div className="animate-pulse bg-white rounded-lg shadow p-4">
    <div className="w-full h-32 bg-gray-200 rounded mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

const Service = () => {
  const { subcatgory, id } = useParams();
  const [services, setServices] = useState([]);
  const [bannerImg, setBannerImg] = useState(null);
  const [sortOption, setSortOption] = useState("latest");

  // SEO/meta states
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [caption, setCaption] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [createdAt, setCreatedAt] = useState("");

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(18); // services per page

  const location = useLocation();

  const modifiedSubcatTitle = subcatgory
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await getAxios().get(
          `/services/filter/${id}?page=${currentPage}&limit=${limit}`
        );
        const data = response.data;
        console.log("service Data", data);

        if (data.success && Array.isArray(data.data)) {
          setServices(data.data);
          setTotalPages(data.totalPages || 1); // ✅ set total pages

          const firstService = data.data[0];
          const subCategoryName = firstService?.subCategoryId?.subCategory;

          // ✅ SEO/meta setup...
          let matchedMeta = null;
          if (firstService.subCategoryId?._id === id) {
            matchedMeta = firstService.subCategoryId;
          } else if (firstService.subSubCategoryId?._id === id) {
            matchedMeta = firstService.subSubCategoryId;
          } else if (firstService.themeId?._id === id) {
            matchedMeta = firstService.themeId;
          }

          if (matchedMeta) {
            setMetaTitle(matchedMeta.metaTitle || "");
            setMetaDescription(matchedMeta.metaDescription || "");
            setKeywords(matchedMeta.keywords || "");
            setCaption(matchedMeta.caption || "");
            setFaqs(matchedMeta.faqs || []);
            setCreatedAt(matchedMeta.createdAt || "");
          }

          if (subCategoryName && banners[subCategoryName]) {
            setBannerImg(banners[subCategoryName]);
          } else {
            setBannerImg(null);
          }
        } else {
          setServices([]);
          setBannerImg(null);
        }
      } catch (error) {
        console.error("Error fetching services:", error.message);
        setServices([]);
        setBannerImg(null);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [id, subcatgory, currentPage, limit]);
  // ✅ Scroll to top on page load or page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, currentPage]);

  console.log("services", services[0]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedServices = () => {
    const sorted = [...services];
    if (sortOption === "latest") {
      return sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    if (sortOption === "high to low") {
      return sorted.sort((a, b) => (b.offerPrice || 0) - (a.offerPrice || 0));
    }
    if (sortOption === "low to high") {
      return sorted.sort((a, b) => (a.offerPrice || 0) - (b.offerPrice || 0));
    }
    return sorted;
  };

  // 🔗 Map of subCategoryId._id -> custom URL
  const subCategoryUrlMap = {
    "681b10abddb6b3f4663e78d1": "/groomtobedecor/681b10abddb6b3f4663e78d1",
    "681b10a5ddb6b3f4663e78cc": "/bridetobedecor/681b10a5ddb6b3f4663e78cc",
    "681b1095ddb6b3f4663e78c2": "/ringceremonydecor/681b1095ddb6b3f4663e78c2",
    "681b1109ddb6b3f4663e78e5": "/anniversarydecor/681b1109ddb6b3f4663e78e5",
    "681b1136ddb6b3f4663e78f4": "/kidsbirthdaydecor/681b1136ddb6b3f4663e78f4",
    "681b113eddb6b3f4663e78f9": "/birthdaydecoration/681b113eddb6b3f4663e78f9",
    "681b1146ddb6b3f4663e78fe": "/babyshowerdecor/681b1146ddb6b3f4663e78fe",
    "681b1240ddb6b3f4663e794c": "/welcomebabydecor/681b1240ddb6b3f4663e794c",
    "681b1255ddb6b3f4663e7956": "/photography-service/681b1255ddb6b3f4663e7956",
    "681b124bddb6b3f4663e7951": "/namingceremonydecor/681b124bddb6b3f4663e7951",
    "681b1238ddb6b3f4663e7947": "/entertainmentdecor/681b1238ddb6b3f4663e7947",
  };

  const breadcrumbPaths = [{ name: "Home", link: "/" }];

  if (services[0]?.subCategoryId) {
    const subCatId = services[0].subCategoryId._id;
    breadcrumbPaths.push({
      name: services[0].subCategoryId.subCategory,
      link: subCategoryUrlMap[subCatId] || `/service/${subCatId}`,
    });
  }

  if (services[0]?.subSubCategoryId) {
    breadcrumbPaths.push({
      name: services[0].subSubCategoryId.subSubCategory,
      link: `/themes/${services[0].subSubCategoryId._id}`,
    });
  }

  if (services[0]?.themeId) {
    breadcrumbPaths.push({
      name: services[0].themeId.theme,
      link: `/service/${services[0].themeId._id}`,
    });
  }

  const generateBreadcrumbSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbPaths.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `https://www.lavisheventzz.com${crumb.link}`,
      })),
    };
  };

  const generateServiceListSchema = () => {
    if (!services || services.length === 0) return null;

    return {
      "@context": "https://schema.org/",
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: service.serviceName,
          image: service.images?.[0] || "",
          brand: { "@type": "Organization", name: "Lavish Eventzz" },
          offers: {
            "@type": "Offer",
            url: `https://www.lavisheventzz.com/service/details/${service.serviceName
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}/${service._id}`,
            priceCurrency: "INR",
            price: service.offerPrice || service.originalPrice || "NA",
            availability: "https://schema.org/InStock",
          },
        },
      })),
    };
  };

  const pageTitle =
    breadcrumbPaths.length > 0
      ? breadcrumbPaths[breadcrumbPaths.length - 1].name
      : modifiedSubcatTitle;

  return (
    <>
      {metaTitle && (
        <Helmet>
          {/* Basic Meta Tags */}
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
          <meta name="keywords" content={keywords} />

          {/* Canonical URL */}
          <link
            rel="canonical"
            href={`https://www.lavisheventzz.com/service/${subcatgory}/${id}`}
          />

          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Lavish Eventzz",
              url: "Current URL",
              logo: "https://www.lavisheventzz.com/assets/logo.png",
              description: metaDescription,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "96205 58000",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi", "Kannada"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "55, 17th Main Rd, RIEHS Layout, JC Nagar, Kurubarahalli, Basaweshwara Nagar,",
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
                "https://www.linkedin.com/company/lavisheventzz",
                "https://www.instagram.com/lavisheventzz",
              ],
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

          {/* Breadcrumb Schema */}
          <script type="application/ld+json">
            {JSON.stringify(generateBreadcrumbSchema())}
          </script>

          {/* ItemList/Product Schema */}
          {services.length > 0 && (
            <script type="application/ld+json">
              {JSON.stringify(generateServiceListSchema())}
            </script>
          )}
        </Helmet>
      )}

      <div className="relative md:pt-28 pt-36 md:px-2 ">
        <Breadcrumb paths={breadcrumbPaths} />

        {bannerImg && (
          <img
            src={bannerImg}
            alt={`${modifiedSubcatTitle} Banner`}
            className="w-full object-cover rounded-lg mb-5"
          />
        )}

        <div className="flex justify-between items-center mb-5 md:px-10 pl-2">
          <div>
            <h1 className="text-2xl font-bold">{pageTitle}</h1>
          </div>

          {services.length > 0 && (
            <select
              name="filter"
              className="border-b p-2 rounded-2xl max-w-[200px] outline-none"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="latest">Latest</option>
              <option value="high to low">High to Low</option>
              <option value="low to high">Low to High</option>
            </select>
          )}
        </div>

        {/* Services List */}
        <div className="grid grid-cols-2 md:grid-cols-3  md:gap-6 gap-4 mt-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <ShimmerCard key={i} />)
          ) : services.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No services found for this category.
            </div>
          ) : (
            sortedServices().map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                title={modifiedSubcatTitle}
              />
            ))
          )}
        </div>

        {!loading && services.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        )}

        {/* Caption */}
        {caption && (
          <div className="my-10">
            <ExpandableContent htmlContent={caption} />
          </div>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <div className="max-w-3xl p-4 mx-auto">
            <h4 className="text-center font-bold poppins text-2xl">FAQs</h4>
            <p className="text-center font-bold poppins text-sm pb-5">
              Need help? Contact us for any queries related to us
            </p>
            <DynamicFaqs faqs={faqs} />
          </div>
        )}

        {/* ✅ Show Pagination for both all services and subcategory services */}
      </div>
    </>
  );
};

export default Service;
