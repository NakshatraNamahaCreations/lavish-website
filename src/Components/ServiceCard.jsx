import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { IoIosStar } from "react-icons/io";
import toast from "react-hot-toast";
import { getAuthAxios, getAxios } from "../utils/api";

const ServiceCard = ({ service, title }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;
  const authAxios = getAuthAxios();

  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!customerId || !service?._id) return;

      try {
        const response = await getAxios().get(`/wishlist/${customerId}`);
        const wishlistItems = response.data.wishlist || [];
        const isServiceInWishlist = wishlistItems.some(
          (item) => item.serviceId?._id === service._id
        );
        setIsInWishlist(isServiceInWishlist);
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error("Error checking wishlist status:", error);
        }
        setIsInWishlist(false);
      }
    };

    checkWishlistStatus();
  }, [customerId, service?._id]);

  const handleWishlist = async () => {
    if (!customerId) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading(
      isInWishlist ? "Removing from wishlist..." : "Adding to wishlist..."
    );

    try {
      if (isInWishlist) {
        await authAxios.delete(
          `/wishlist/remove-item/${customerId}/${service._id}`
        );
        setIsInWishlist(false);
        toast.success("Item removed from wishlist", { id: loadingToast });
      } else {
        await authAxios.post(`/wishlist/create/`, {
          serviceId: service._id,
          serviceName: service.serviceName,
          customerId,
          servicePrice: service.offerPrice || service.price || 0,
          serviceImages: service.images || [],
        });
        setIsInWishlist(true);
        toast.success("Item added to wishlist", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error(error.response?.data?.message || "Error updating wishlist", {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!service) {
    return (
      <div className="relative group mb-4 shadow-lg rounded-xl overflow-hidden transition-shadow duration-300 w-full h-[280px] md:max-w-xs border border-gray-300">
        <p className="text-center pt-20">Service data not available</p>
      </div>
    );
  }

  return (
    // FIX: Using w-full for fluid mobile width and max-w for large screen constraint.
    // Adjusted heights for better fit.
    <div className="relative mx-auto group mb-4 shadow-lg rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 break-inside-avoid w-full h-[300px] md:h-[320px] lg:h-[360px] md:max-w-[230px] lg:max-w-[300px] border border-gray-300">
      
      {/* Wishlist Icon - Adjusted position for small screens */}
      <div
        className="rounded-full bg-white p-2 absolute lg:top-6 lg:right-6 top-3 right-3 text-xl md:text-2xl cursor-pointer z-10"
        onClick={handleWishlist}
        style={{ pointerEvents: isLoading ? "none" : "auto" }}
      >
        {isInWishlist ? (
          <GoHeartFill className="text-red-600" />
        ) : (
          <GoHeart className="text-gray-600" />
        )}
      </div>

      <Link
        to={`/service/details/${service.serviceName
          .toLowerCase()
          .replace(/\s+/g, "-")}/${service._id}`}
        state={{ from: location.pathname + location.search, title: title }}
        className="linkColorBlack"
      >
        <div>
          <img
            loading="lazy"
            decoding="async"
            src={service?.images[0]}
            // FIX: Increased small-screen height to h-48 for better image visibility
            className="object-cover h-48 lg:h-56 w-full"
            alt={service.serviceName || "Service"}
          />
          <div className="px-3 flex flex-col justify-between pt-2">
            <div>
              <p className="text-xs md:text-sm text-gray-500">At your location</p>
              {/* Added truncate for long service names */}
              <p className="text-sm md:text-base font-semibold truncate">
                {service.serviceName || "Service Name"}
              </p>
            </div>

            <div className="flex justify-between items-center pt-1 pb-2">
              <p className="font-bold text-sm md:text-base text-gray-800">
                Rs. {service.offerPrice}
              </p>
              <p className="flex gap-1 text-primary items-center text-sm md:text-base">
                {service.rating && (
                  <>
                    <IoIosStar /> {service.rating}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { GoHeartFill, GoHeart } from "react-icons/go";
// import { IoIosStar } from "react-icons/io";
// import toast from "react-hot-toast";
// import { getAuthAxios, getAxios } from "../utils/api";

// const ServiceCard = ({ service, title }) => {
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const location = useLocation(); // ✅ Get current location
//   const storedUser = localStorage.getItem("user");
//   const userData = JSON.parse(storedUser);
//   const customerId = userData?.id;
//   const authAxios = getAuthAxios();

//   useEffect(() => {
//     const checkWishlistStatus = async () => {
//       if (!customerId || !service?._id) return;

//       try {
//         const response = await getAxios().get(`/wishlist/${customerId}`);
//         const wishlistItems = response.data.wishlist || []; // ✅ fallback to []
//         const isServiceInWishlist = wishlistItems.some(
//           (item) => item.serviceId?._id === service._id
//         );
//         setIsInWishlist(isServiceInWishlist);
//       } catch (error) {
//         // Only log real errors (not empty list)
//         if (error.response?.status !== 404) {
//           console.error("Error checking wishlist status:", error);
//         }
//         setIsInWishlist(false);
//       }
//     };

//     checkWishlistStatus();
//   }, [customerId, service?._id]);

//   const handleWishlist = async () => {
//     if (!customerId) {
//       toast.error("Please login to add items to wishlist");
//       return;
//     }

//     setIsLoading(true);
//     const loadingToast = toast.loading(
//       isInWishlist ? "Removing from wishlist..." : "Adding to wishlist..."
//     );

//     try {
//       if (isInWishlist) {
//         await authAxios.delete(
//           `/wishlist/remove-item/${customerId}/${service._id}`
//         );
//         setIsInWishlist(false);
//         toast.success("Item removed from wishlist", { id: loadingToast });
//       } else {
//         await authAxios.post(`/wishlist/create/`, {
//           serviceId: service._id,
//           serviceName: service.serviceName,
//           customerId,
//           servicePrice: service.offerPrice || service.price || 0,
//           serviceImages: service.images || [],
//         });
//         setIsInWishlist(true);
//         toast.success("Item added to wishlist", { id: loadingToast });
//       }
//     } catch (error) {
//       console.error("Error updating wishlist:", error);
//       toast.error(error.response?.data?.message || "Error updating wishlist", {
//         id: loadingToast,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!service) {
//     return (
//       <div className="relative mx-auto group mb-4 shadow-lg rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 break-inside-avoid md:px-3 md:pt-4 md:w-[300px] w-[180px] md:h-[360px] h-[280px] border border-gray-300">
//         <p className="text-center pt-20">Service data not available</p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative mx-auto group mb-4 shadow-lg rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 break-inside-avoid md:px-3 md:pt-4  w-[180px] md:h-[300px]  md:w-[230px] lg:w-[300px] lg:h-[360px] h-[300px] border border-gray-300">
//       {/* Wishlist Icon */}
//       <div
//         className="rounded-full bg-white p-2 absolute lg:top-6 lg:right-6 top-2 right-1 text-2xl cursor-pointer"
//         onClick={handleWishlist}
//         style={{ pointerEvents: isLoading ? "none" : "auto" }}
//       >
//         {isInWishlist ? (
//           <GoHeartFill className="text-red-600" />
//         ) : (
//           <GoHeart className="text-gray-600" />
//         )}
//       </div>

//       {/* ✅ Pass current URL as state */}
//       <Link
//         to={`/service/details/${service.serviceName
//           .toLowerCase()
//           .replace(/\s+/g, "-")}/${service._id}`}
//         state={{ from: location.pathname + location.search, title: title }}
//         className="linkColorBlack"
//       >
//         <div>
//           <img
//             loading="lazy"
//             decoding="async"
//             src={service?.images[0]}
//             className="object-cover h-40 lg:h-56 w-full"
//             alt={service.serviceName || "Service"}
//           />
//           <div className="px-1 flex flex-col justify-between">
//             <div>
//               <p className="pt-2">At your location</p>
//               <p className="text-md font-semibold">
//                 {service.serviceName || "Service Name"}
//               </p>
//             </div>

//             <div className="flex justify-between pt-3 pb-1 absolute bottom-0 left-0 w-full md:px-4 px-1">
//               <p className="font-medium text-gray-600">
//                 Rs. {service.offerPrice}
//               </p>
//               <p className="flex gap-1 text-primary items-center">
//                 {service.rating && (
//                   <>
//                     <IoIosStar /> {service.rating}
//                   </>
//                 )}
//               </p>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ServiceCard;
