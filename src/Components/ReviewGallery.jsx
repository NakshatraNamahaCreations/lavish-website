import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Media query hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640); // Tailwind 'sm' breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="z-10 absolute left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-gray-900"
  >
    <AiOutlineArrowLeft size={16} sm={20} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="z-10 absolute right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-gray-900"
  >
    <AiOutlineArrowRight size={16} sm={20} />
  </button>
);

// Mobile Slider Component
const MobileSlider = ({ images, selectedIndex }) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    arrows: images.length > 1,
    pauseOnHover: true,
    autoplay: images.length > 1,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: "0px",
    swipe: true,
    touchThreshold: 10,
    initialSlide: selectedIndex,
  };

  return (
    <Slider {...settings} className="w-full mx-auto">
      {images.map((img, index) => (
        <div
          key={index}
          className="flex justify-center items-center min-h-[50vh] sm:min-h-[85vh]"
        >
          <img
            src={img}
            alt={`Review ${index}`}
            className="max-w-[90vw] max-h-[75vh] sm:max-h-[80vh] object-contain rounded-lg"
          />
        </div>
      ))}
    </Slider>
  );
};

// Desktop Slider Component
const DesktopSlider = ({ images, selectedIndex }) => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    arrows: images.length > 1,
    pauseOnHover: true,
    autoplay: images.length > 1,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: "0px",
    swipe: true,
    touchThreshold: 10,
    initialSlide: selectedIndex,
  };

  return (
    <Slider {...settings} className="w-full max-w-4xl mx-auto">
      {images.map((img, index) => (
        <div
          key={index}
          className="flex justify-center items-center h-[70vh] md:h-[80vh]"
        >
          <img
            loading="lazy"
            decoding="async"
            src={img}
            alt={`Review ${index}`}
            className="max-w-[80vw] md:max-w-[70vw] max-h-[70vh] md:max-h-[80vh] object-contain rounded-lg mx-auto"
          />
        </div>
      ))}
    </Slider>
  );
};

const ReviewGallery = ({ images = [] }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMobile = useIsMobile();

  const handleOpenModal = (index) => {
    setSelectedIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (images.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">No images to display.</p>
    );
  }

  return (
    <div className="p-2 sm:p-4 mt-6 md:mt-10">
      {/* Thumbnails */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2 sm:gap-4">
        {images.slice(0, 13).map((img, index) => (
          <img
            loading="lazy"
            decoding="async"
            key={index}
            src={img}
            alt={`Review ${index}`}
            className="w-20 h-20 sm:w-24 sm:h-24 object-cover cursor-pointer rounded-lg"
            onClick={() => handleOpenModal(index)}
          />
        ))}

        {images.length > 14 && (
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 cursor-pointer flex justify-center items-center rounded-lg"
            onClick={() => handleOpenModal(13)}
          >
            <img
              loading="lazy"
              decoding="async"
              src={images[13]}
              alt="Review 13"
              className="absolute top-0 left-0 w-full h-full object-cover opacity-50 rounded-lg"
            />
            <span className="text-white font-bold text-base sm:text-lg z-10">
              +{images.length - 14}
            </span>
          </div>
        )}
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center overflow-hidden p-4">
          {/* Close Button */}
          <button
            className="fixed top-4 right-4 bg-white text-black text-xl sm:text-2xl rounded-full z-50 p-1 sm:p-2"
            onClick={handleCloseModal}
          >
            <IoClose />
          </button>

          {/* Centered Content */}
          <div className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-3xl flex justify-center items-center">
            {isMobile ? (
              <MobileSlider images={images} selectedIndex={selectedIndex} />
            ) : (
              <DesktopSlider images={images} selectedIndex={selectedIndex} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewGallery;

// import React, { useState } from "react";
// import Slider from "react-slick";
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// import { IoClose } from "react-icons/io5";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const PrevArrow = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className="z-10 absolute -left-4 md:-left-10 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full shadow-md hover:bg-gray-900"
//   >
//     <AiOutlineArrowLeft size={20} />
//   </button>
// );

// const NextArrow = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className="z-10 absolute -right-4 md:-right-10 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full shadow-md hover:bg-gray-900"
//   >
//     <AiOutlineArrowRight size={20} />
//   </button>
// );

// const ReviewGallery = ({ images = [] }) => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const settings = {
//     infinite: true,
//     slidesToShow: 1,
//     speed: 500,
//     arrows: true,
//     pauseOnHover: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     centerMode: true,
//     centerPadding: "0px"
//   };

//   const handleOpenModal = (index) => {
//     setSelectedIndex(index);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   if (images.length === 0) {
//     return <p className="text-center text-gray-500 mt-4">No images to display.</p>;
//   }

//   return (
//     <div className="md:p-4 mt-10">
//       {/* Thumbnails */}
//       <div className="grid lg:grid-cols-10 md:grid-cols-6 grid-cols-3 gap-4">
//         {images.slice(0, 13).map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`Review ${index}`}
//             className="w-24 h-24 object-cover cursor-pointer rounded-lg"
//             onClick={() => handleOpenModal(index)}
//           />
//         ))}

//         {images.length > 14 && (
//           <div
//             className="relative w-24 h-24 bg-gray-300 cursor-pointer flex justify-center items-center rounded-lg"
//             onClick={() => handleOpenModal(13)}
//           >
//             <img
//               src={images[13]}
//               alt="Review 13"
//               className="absolute top-0 left-0 w-full h-full object-cover opacity-50 rounded-lg"
//             />
//             <span className="text-white font-bold text-lg z-10">
//               +{images.length - 14}
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {openModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 p-4">
//           <button
//             className="fixed top-4 right-4 bg-white text-black text-2xl rounded-full z-50"
//             onClick={handleCloseModal}
//           >
//             <IoClose />
//           </button>
//           <div className="flex justify-center items-center h-full">
//             <div className="relative w-full max-w-3xl mx-auto">
//               {images.length === 1 ? (
//                 <div className="flex justify-center">
//                   <img
//                     src={images[0]}
//                     alt="Single Review"
//                     className="w-full max-w-[300px] h-auto rounded-lg"
//                   />
//                 </div>
//               ) : (
//                 <Slider initialSlide={selectedIndex} {...settings}>
//                   {images.map((img, index) => (
//                     <div key={index} className="flex justify-center px-4">
//                       <img
//                         src={img}
//                         alt={`Review ${index}`}
//                         className="w-full max-w-[300px] h-auto rounded-lg"
//                       />
//                     </div>
//                   ))}
//                 </Slider>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewGallery;
