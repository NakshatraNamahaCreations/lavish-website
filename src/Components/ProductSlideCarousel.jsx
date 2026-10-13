import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";

// Custom Prev Arrow (Top/Left Arrow)
const PrevArrow = ({ onClick, isMobile }) => (
  <button
    onClick={onClick}
    className={`absolute ${
      isMobile
        ? "-left-3 top-1/2 transform -translate-y-1/2"
        : "-top-7 left-[50%] transform -translate-x-1/2"
    } bg-primary text-white p-1 rounded-full shadow-md hover:bg-gray-900`}
  >
    {isMobile ? (
      <AiOutlineArrowLeft size={15} />
    ) : (
      <AiOutlineArrowUp size={15} />
    )}
  </button>
);

// Custom Next Arrow (Bottom/Right Arrow)
const NextArrow = ({ onClick, isMobile }) => (
  <button
    onClick={onClick}
    className={`absolute ${
      isMobile
        ? "-right-3 top-1/2 transform -translate-y-1/2"
        : "-bottom-9 left-[50%] transform -translate-x-1/2"
    } bg-primary text-white p-1 rounded-full shadow-md hover:bg-gray-900`}
  >
    {isMobile ? (
      <AiOutlineArrowRight size={15} />
    ) : (
      <AiOutlineArrowDown size={15} />
    )}
  </button>
);

const ProductImageSlider = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || "");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update selected image if images prop changes
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 3 : 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <NextArrow isMobile={isMobile} />,
    prevArrow: <PrevArrow isMobile={isMobile} />,
    vertical: !isMobile,
    verticalSwiping: !isMobile,
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full max-w-4xl mx-auto mt-4">
      {/* Main Image Display */}
      <div className="w-full md:w-3/4 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            src={`${selectedImage}`}
            alt="Selected Product"
            className="w-full max-h-[400px] md:max-h-[500px] object-cover rounded-2xl shadow-lg"
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Thumbnail Slider */}
      <div
        className={`w-full md:w-1/4 max-h-96 relative ${
          isMobile ? "mt-4" : ""
        }`}
      >
        <Slider
          {...settings}
          className={`h-full ${
            isMobile ? "flex items-center justify-center" : ""
          }`}
        >
          {images.map((image, index) => (
            <div key={index} className="p-1">
              <img
                loading="lazy"
                decoding="async"
                src={`${image}`}
                alt={`Thumbnail ${index + 1}`}
                className={`mx-auto w-24 h-24 object-cover border-2 cursor-pointer rounded-lg transition-all 
                  ${
                    selectedImage === image
                      ? "border-gray-600 scale-105"
                      : "border-gray-300"
                  }`}
                onClick={() => setSelectedImage(image)} // ✅ Fixed here
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductImageSlider;
