// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { getAuthAxios } from "../utils/api";
// import Breadcrumb from "./Breadcrumb";
// import ExpandableContent from "./ExpandableContent";
// import DynamicFaqs from "./DynamicFaqs";

// const ShimmerCard = () => {
//   return (
//     <div className="animate-pulse bg-white rounded-lg shadow p-2 flex flex-col items-center">
//       {/* Circle avatar */}
//       <div className="w-40 h-40 bg-gray-200 rounded-full mb-4"></div>

//       {/* Title line */}
//       <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>

//       {/* Subtitle line */}
//       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//     </div>
//   );
// };

// const Themes = () => {
//   const [themes, setThemes] = useState([]);
//   const [subSubCategoryData, setSubSubCategoryData] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const { subSubCategoryId } = useParams();
//   const navigate = useNavigate();

//   const location = useLocation();
//   const {
//     metaTitle,
//     metaDescription,
//     keywords,
//     caption,
//     faqs,
//     subSubCategory,
//     createdAt,
//     updatedAt,
//     redirectUrl,
//     modifiedSubcatTitle,
//     // themeredirectUrl,
//   } = location.state || {};

//   useEffect(() => {
//     const fetchSubSubCategory = async () => {
//       try {
//         const res = await getAuthAxios().get(
//           `subsubcategories/${subSubCategoryId}`
//         );
//         if (res.data.data) {
//           setSubSubCategoryData(res.data.data);
//           console.log("subSubCategory from API", res.data.data);
//         } else {
//           setError("Failed to load category details");
//         }
//       } catch (err) {
//         setError("Failed to load category details");
//       }
//     };

//     const fetchThemes = async () => {
//       try {
//         const res = await getAuthAxios().get(
//           `themes/subsubcategory/${subSubCategoryId}`
//         );

//         if (res.data.data && res.data.data.length > 0) {
//           setThemes(res.data.data);
//           console.log("themes", res.data.data);
//         }
//       } catch (err) {
//         setError("Failed to load themes");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubSubCategory();
//     fetchThemes();
//   }, [subSubCategoryId]);

//   console.log("themes", themes);

//   const handleThemeClick = (item) => {
//     console.log("item:", item);
//     navigate(
//       // `/service/${item.subSubCategory.subCategory.subCategory.replace(
//       //   /\s+/g,
//       //   "-"
//       // )}/${item._id}`
//       `/service/${item.subSubCategory.subCategory.subCategory
//         .split(" ")
//         .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
//         .join("-")}/${item._id}`,
//       {
//         state: {
//           metaTitle: item.metaTitle,
//           metaDescription: item.metaDescription,
//           keywords: item.keywords,
//           caption: item.caption,
//           faqs: item.faqs,
//           subSubCategory: item.subSubCategory.subSubCategory, // ✅ use the name, not the object
//           createdAt: item.createdAt,
//           updatedAt: item.updatedAt,
//           modifiedSubcatTitle: "Kids Birthday Decor",
//           theme: item.theme,

//           subCatredirectUrl: `/themes/${subSubCategoryId}`,
//           redirectUrl: "/kidsbirthdaydecor/681b1136ddb6b3f4663e78f4",
//         },
//       }
//     );
//   };

//   const getCategoryName = () => {
//     if (
//       themes.length > 0 &&
//       themes[0].subSubCategory &&
//       themes[0].subSubCategory.subSubCategory
//     ) {
//       return themes[0].subSubCategory.subSubCategory;
//     }
//     if (subSubCategory && subSubCategory.subSubCategory) {
//       return subSubCategory.subSubCategory;
//     }
//     return "Category";
//   };

//   // ✅ Deduplicate breadcrumb names
//   const breadcrumbPaths = [
//     { name: "Home", link: "/" },
//     {
//       name: modifiedSubcatTitle,
//       link: `/kidsbirthdaydecor/681b1136ddb6b3f4663e78f4`,
//     },

//     {
//       name: subSubCategory,
//       link: redirectUrl,
//     },
//   ];
//   if (loading) {
//     return (
//       <div className="mt-32 px-20 ">
//         <div className="h-6 bg-gray-200 rounded w-[300px] mb-10  animate-pulse"></div>
//         <div className="grid grid-cols-4 gap-3 ">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <ShimmerCard key={i} />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-32 md:pt-20 lg:py-24">
//       <Breadcrumb paths={breadcrumbPaths} />
//       <div className="  px-4 sm:px-6 md:px-10 lg:px-20">
//         <h1 className="text-2xl sm:text-3xl text-primary font-bold my-5 text-center md:text-left">
//           {getCategoryName()} Themes
//         </h1>

//         {error && themes.length === 0 && (
//           <div className="text-red-500 text-center mb-4">{error}</div>
//         )}

//         {themes.length === 0 && !error && (
//           <div className="text-center text-gray-600 mb-4">
//             No themes available for this category.
//           </div>
//         )}

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16 mt-10">
//           {themes.map((theme) => (
//             <div
//               key={theme._id}
//               onClick={() => handleThemeClick(theme)}
//               className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
//             >
//               <img
//                 src={theme.image}
//                 alt={theme.theme}
//                 className="w-full h-48 sm:h-52 md:h-60 lg:h-64 object-cover rounded-2xl"
//               />
//               <p className="text-black pt-3 text-center text-lg sm:text-xl md:text-2xl font-bold">
//                 {theme.theme}
//               </p>
//             </div>
//           ))}
//         </div>

//         {caption && (
//           <div className="mt-5 p-5">
//             <ExpandableContent htmlContent={caption} />
//           </div>
//         )}

//         {faqs?.length > 0 && (
//           <div className="max-w-3xl p-4 mx-auto">
//             <p className="text-center font-bold poppins text-2xl">FAQs</p>
//             <p className="text-center font-bold poppins text-sm pb-5">
//               Need help? Contact us for any queries related to us
//             </p>
//             <DynamicFaqs faqs={faqs} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Themes;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthAxios } from "../utils/api";
import Breadcrumb from "./Breadcrumb";
import ExpandableContent from "./ExpandableContent";
import DynamicFaqs from "./DynamicFaqs";
import { Helmet } from "react-helmet-async";

// Skeleton loader
const ShimmerCard = () => (
  <div className="animate-pulse bg-white rounded-lg shadow p-2 flex flex-col items-center">
    <div className="w-40 h-40 bg-gray-200 rounded-full mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

// ✅ Predefined SubCategory URLs
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

const Themes = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { subSubCategoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const res = await getAuthAxios().get(
          `themes/subsubcategory/${subSubCategoryId}`
        );
        if (res.data.data?.length > 0) {
          setThemes(res.data.data);
        }
      } catch (err) {
        setError("Failed to load themes");
      } finally {
        setLoading(false);
      }
    };
    fetchThemes();
  }, [subSubCategoryId]);

  // ✅ Use first theme’s subSubCategory SEO/meta data
  const seoData = themes[0]?.subSubCategory || null;

  // ✅ Build breadcrumb dynamically
  let breadcrumbPaths = [{ name: "Home", link: "/" }];
  if (seoData) {
    const subCat = seoData.subCategory;
    if (subCat) {
      breadcrumbPaths.push({
        name: subCat.subCategory,
        link: subCategoryUrlMap[subCat._id] || `/service/${subCat._id}`,
      });
    }
    breadcrumbPaths.push({
      name: seoData.subSubCategory,
      link: `/themes/${seoData._id}`,
    });
  }

  const handleThemeClick = (item) => {
    // navigate(
    //   `/service/${item.subSubCategory.subCategory.subCategory.replace(
    //     /\s+/g,
    //     "-"
    //   )}/${item._id}`
    // );
    navigate(
      `/service/${item.subSubCategory.subCategory.subCategory
        .split(" ")
        .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
        .join("-")}/${item._id}`
    );
  };

  // ✅ Structured Schema with FAQ
  const schemaData = seoData && {
    "@context": "https://schema.org",
    "@type": "Service",
    name: seoData.metaTitle || seoData.subSubCategory,
    description: seoData.metaDescription || "",
    keywords: seoData.keywords || "",
    dateCreated: seoData.createdAt
      ? new Date(seoData.createdAt).toISOString()
      : undefined,
    provider: {
      "@type": "Organization",
      name: "Lavish Eventzz",
      url: "https://www.lavisheventzz.com",
    },
    mainEntityOfPage: {
      "@type": "FAQPage",
      mainEntity: seoData.faqs?.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  };

  return (
    <div className="pt-32 md:pt-20 lg:py-24">
      {/* ✅ Helmet SEO tags */}
      {seoData && (
        <Helmet>
          <title>{seoData.metaTitle}</title>
          <meta name="description" content={seoData.metaDescription} />
          <meta name="keywords" content={seoData.keywords} />
          <link
            rel="canonical"
            href={`https://www.lavisheventzz.com/themes/${seoData._id}`}
          />
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
        </Helmet>
      )}

      <Breadcrumb paths={breadcrumbPaths} />

      <div className="px-4 sm:px-6 md:px-10 lg:px-20">
        <h1 className="text-2xl sm:text-3xl text-primary font-bold my-5 text-center md:text-left">
          {seoData?.subSubCategory || "Category"} Themes
        </h1>

        {loading && (
          <div className="grid grid-cols-4 gap-3 mt-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <ShimmerCard key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        {!loading && themes.length === 0 && !error && (
          <div className="text-center text-gray-600 mb-4">
            No themes available for this category.
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16 mt-10">
          {themes.map((theme) => (
            <div
              key={theme._id}
              onClick={() => handleThemeClick(theme)}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={theme.image}
                alt={theme.theme}
                className="w-full h-48 sm:h-52 md:h-52  object-cover rounded-2xl"
              />
              <p className="text-black pt-3 text-center text-lg sm:text-xl md:text-2xl font-bold">
                {theme.theme}
              </p>
            </div>
          ))}
        </div>

        {/* Caption from subSubCategory SEO */}
        {seoData?.caption && (
          <div className="mt-5 p-5 pt-20">
            <ExpandableContent htmlContent={seoData.caption} />
          </div>
        )}

        {/* FAQs from subSubCategory SEO */}
        {seoData?.faqs?.length > 0 && (
          <div className="max-w-3xl p-4 mx-auto pt-10">
            <h4 className="text-center font-bold poppins text-2xl">FAQs</h4>
            <p className="text-center font-bold poppins text-sm pb-5">
              Need help? Contact us for any queries related to us
            </p>
            <DynamicFaqs faqs={seoData.faqs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Themes;
