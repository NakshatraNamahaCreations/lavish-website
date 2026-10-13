// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { AiOutlineClose } from "react-icons/ai";

// import { getAxios } from "../utils/api";

// const timeSince = (dateStr) => {
//   const now = new Date();
//   const createdAt = new Date(dateStr);
//   const seconds = Math.floor((now - createdAt) / 1000);
//   if (seconds < 60) return `${seconds} seconds ago`;
//   const minutes = Math.floor(seconds / 60);
//   if (minutes < 60) return `${minutes} minutes ago`;
//   const hours = Math.floor(minutes / 60);
//   return `${hours} hours ago`;
// };

// const PurchasePopup = () => {
//   const [visibleIndex, setVisibleIndex] = useState(0);
//   const [isVisible, setIsVisible] = useState(true);
//   const [recentPurchases, setRecentPurchases] = useState([]);

//   useEffect(() => {
//     const fetchRecentOrders = async () => {
//       try {
//         const response = await getAxios().get("/orders/recent-orders");
//         const { orders } = response.data;
//         console.log("orders popup:", orders)
//         //First filter the items to only include those with categoryType "Service"
//         const formatted = orders.flatMap((order) =>
//           order.items
//             .filter(
//               (item) =>
//                 item.categoryType &&
//                 item.categoryType.toLowerCase() === "service"
//             )
//             .map((item) => ({
//               customer: order.customerName,
//               product: item.serviceName,
//               time: timeSince(order.createdAt),
//               src: item.image, // use the image from the service order item
//               price: item.price,
//               originalPrice: item.originalPrice,
//               quantity: item.quantity,
//             }))
//         );
//         setRecentPurchases(formatted);
//       } catch (error) {
//         console.error("Error fetching recent orders:", error);
//       }
//     };

//     fetchRecentOrders();
//   }, []);

//   useEffect(() => {
//     if (recentPurchases.length === 0) return;
//     const interval = setInterval(() => {
//       setIsVisible(false);
//       setTimeout(() => {
//         setVisibleIndex((prev) => (prev + 1) % recentPurchases.length);
//         setIsVisible(true);
//       }, 1000);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [recentPurchases]);

//   if (recentPurchases.length === 0) return null;

//   const current = recentPurchases[visibleIndex];

//   return (
//     <div className="fixed md:bottom-5 bottom-12 md:left-5 left-2 flex flex-col space-y-3 z-30 max-w-sm">
//       <AnimatePresence>
//         {isVisible && (
//           <motion.div
//             key={visibleIndex}
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 50 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white shadow-lg rounded-lg p-2 flex items-start space-x-3 border border-gray-200"
//           >
//             <div>
//               <img
//                 src={current.src}
//                 className="h-20 w-20 object-cover rounded"
//                 alt="Decor"
//               />
//             </div>
//             <div className="flex flex-col">
//               <h3 className="text- font-semibold text-gray-900">
//                 {current.customer} purchased
//               </h3>
//               <p className="text-sm text-gray-700">{current.product}</p>
//               <small className="text-gray-500">{current.time}</small>
//             </div>
//             <button
//               onClick={() => setIsVisible(false)}
//               className="text-black hover:text-gray-600"
//             >
//               <AiOutlineClose />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default PurchasePopup;

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { getAxios } from "../utils/api";

const timeSince = (dateStr) => {
  const now = new Date();
  const createdAt = new Date(dateStr);
  const seconds = Math.floor((now - createdAt) / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours} hours ago`;
};

const PurchasePopup = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [recentPurchases, setRecentPurchases] = useState([]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await getAxios().get("/orders/recent-orders");
        const { orders } = response.data;
        console.log("orders popup:", orders);

        const formatted = orders.flatMap((order) =>
          order.items
            .filter(
              (item) =>
                item.categoryType &&
                item.categoryType.toLowerCase() === "service"
            )
            .map((item) => ({
              customer: order.customerName,
              product: item.serviceName,
              time: timeSince(order.createdAt),
              src: item.image,
              price: item.price,
              originalPrice: item.originalPrice,
              quantity: item.quantity,
            }))
        );
        setRecentPurchases(formatted);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    };

    fetchRecentOrders();
  }, []);

  useEffect(() => {
    if (recentPurchases.length === 0) return;
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setVisibleIndex((prev) => (prev + 1) % recentPurchases.length);
        setIsVisible(true);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, [recentPurchases]);

  if (recentPurchases.length === 0) return null;

  const current = recentPurchases[visibleIndex];

  return (
    <div className="fixed md:bottom-5 bottom-1 md:left-5 left-2 flex flex-col space-y-3 z-30 md:max-w-sm">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={visibleIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg 
                       p-2 md:p-2 flex items-start space-x-2 md:space-x-3 
                       border border-gray-200 w-[60vw] sm:w-auto"
          >
            {/* Image */}
            <div>
              <img
                src={current.src}
                className="h-12 w-12 md:h-20 md:w-20 object-cover rounded"
                alt="Decor"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900">
                {current.customer} purchased
              </h3>
              <p className="text-xs md:text-sm text-gray-700">
                {current.product}
              </p>
              <small className="text-[10px] md:text-xs text-gray-500">
                {current.time}
              </small>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="text-black hover:text-gray-600 text-xs md:text-base"
            >
              <AiOutlineClose />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchasePopup;
