// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../utils/api";
// import Breadcrumb from "./Breadcrumb";

// const ShimmerCard = () => {
//   return (
//     <div className="animate-pulse bg-white rounded-lg shadow p-4">
//       <div className="w-full h-32 bg-gray-200 rounded mb-4"></div>
//       <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//     </div>
//   );
// };

// function kebabToTitle(str) {
//   if (!str) return ""; // Ensure that we handle undefined or null values
//   return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
// }

// const Blog = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       if (loading) return;
//       try {
//         setLoading(true);
//         const res = await axios.get(`${API_BASE_URL}/blog`);
//         setBlogs(res.data.data);
//       } catch (err) {
//         console.error("Error fetching blogs:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const breadcrumbPaths = [
//     { name: "Home", link: "/" },
//     {
//       name: "Blog",
//       link: "/blogs",
//     },
//   ];

//   return (
//     <div className="mx-auto px-4 lg:py-24 py-36">
//       <Breadcrumb paths={breadcrumbPaths} />
//       <div className="max-w-7xl mt-4 mx-auto">
//         <h1 className="text-4xl font-bold mb-8 text-[#FF4286] text-center">
//           Our Blogs
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((blog) => {
//             const slug = blog.title
//               .toLowerCase()
//               .replace(/[^a-z0-9]+/g, "-")
//               .replace(/^-+|-+$/g, "");
//             const alterTitle = kebabToTitle(blog?.title);
//             return (
//               <div
//                 key={blog._id}
//                 className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer group"
//                 onClick={() => navigate(`/blogs/${slug}`)}
//               >
//                 <img
//                   loading="lazy"
//                   decoding="async"
//                   src={blog.bannerImage}
//                   alt={blog.title}
//                   className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="p-5">
//                   <h3 className="text-2xl font-semibold text-purple-700 group-hover:text-[#FF4286] transition-colors duration-300">
//                     {alterTitle}
//                   </h3>
//                   <p className="text-gray-600 text-sm mt-2">
//                     {blog.metaDescription?.slice(0, 100)}...
//                   </p>
//                   <div className="flex justify-between items-center mt-4">
//                     <button className="mt-4 inline-block text-[#FF4286] hover:text-purple-700 font-medium transition">
//                       Read More →
//                     </button>
//                     <p>
//                       {blog?.createdAt
//                         ? new Date(blog.createdAt).toLocaleDateString("en-GB")
//                         : ""}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {loading &&
//             Array.from({ length: 6 }).map((_, i) => <ShimmerCard key={i} />)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blog;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";
import Breadcrumb from "./Breadcrumb";
import Pagination from "./Pagination";

const ShimmerCard = () => (
  <div className="animate-pulse bg-white rounded-lg shadow p-4">
    <div className="w-full h-32 bg-gray-200 rounded mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

function kebabToTitle(str) {
  if (!str) return "";
  return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const blogsPerPage = 9;
  const navigate = useNavigate();

  // ✅ Fetch Blogs with Pagination
  const fetchBlogs = async (page = 1) => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/blog`, {
        params: { page, limit: blogsPerPage },
      });

      // handle paginated or non-paginated responses
      if (res.data?.data) {
        setBlogs(res.data.data);
        setTotalPages(res.data.totalPages || 1);
        setTotalCount(res.data.totalCount || res.data.count || 0);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/blogs" },
  ];

  return (
    <div className="mx-auto px-4 lg:py-24 py-36">
      <Breadcrumb paths={breadcrumbPaths} />

      <div className="max-w-7xl mt-4 mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-[#FF4286] text-center">
          Our Blogs
        </h1>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loading && blogs.length === 0 && (
            <p className="text-center col-span-full text-gray-600">
              No blogs found.
            </p>
          )}

          {blogs.map((blog) => {
            const slug = blog.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "");
            const alterTitle = kebabToTitle(blog?.title);
            return (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/blogs/${slug}`)}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={blog.bannerImage}
                  alt={blog.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-purple-700 group-hover:text-[#FF4286] transition-colors duration-300">
                    {alterTitle}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {blog.metaDescription?.slice(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <button className="mt-4 inline-block text-[#FF4286] hover:text-purple-700 font-medium transition">
                      Read More →
                    </button>
                    <p>
                      {blog?.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString("en-GB")
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {loading &&
            Array.from({ length: 6 }).map((_, i) => <ShimmerCard key={i} />)}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* Blog Count Info */}
        {!loading && totalCount > 0 && (
          <p className="text-center text-gray-500 mt-4">
            Showing {blogs.length} of {totalCount} blogs
          </p>
        )}
      </div>
    </div>
  );
};

export default Blog;
