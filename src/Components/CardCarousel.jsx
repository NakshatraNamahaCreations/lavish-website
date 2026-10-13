
import React from "react";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// ✅ Skeleton Loader Card
const SkeletonCard = () => (
  <div className="mx-auto h-[420px] bg-white w-[300px] shadow-xl rounded-lg mt-5 z-10 animate-pulse">
    <div className="md:px-4 md:pt-4 p-2 border-2 rounded-lg h-full flex flex-col">
      {/* Image placeholder */}
      <div className="bg-gray-300 rounded-lg mb-2 w-full h-[70%]" />
      <div className="flex-1 flex flex-col justify-between">
        {/* Title placeholder */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto my-2"></div>
        {/* Stars placeholder */}
        <div className="flex justify-center gap-1 my-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-300 rounded-full"></div>
          ))}
        </div>
        {/* Price + Button placeholder */}
        <div className="flex justify-between items-center px-4 mt-2">
          <div className="h-4 bg-gray-300 rounded w-16"></div>
          <div className="h-8 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  </div>
);

// ✅ CenterCarousalCard Component
const CenterCarousalCard = ({ item }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (item._id) {
      navigate(
        `/service/details/${item.serviceName
          .toLowerCase()
          .replace(/\s+/g, "-")}/${item._id}`
      );
    }
  };

  return (
    <div className="mx-auto h-[420px] bg-white max-w-xs shadow-xl rounded-lg mt-5 z-10">
      <div className="md:px-4 md:pt-4 p-2 border-2 rounded-lg h-full">
        <img
          loading="lazy"
          decoding="async"
          src={item?.images?.[0]}
          alt={item?.serviceName}
          className="rounded-lg mb-2 w-full h-[70%] object-cover"
        />
        <div className="poppins text-center">
          <p className="text-sm md:text-base">{item?.serviceName}</p>
          <div className="flex gap-1 md:justify-start justify-center items-center py-2 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <IoIosStar key={i} size={16} />
            ))}
          </div>
          <div className="lg:flex gap-2 justify-between items-center">
            <p className="font-bold text-sm md:text-xl">
              Rs. {item?.offerPrice}
            </p>
            <button
              className="bg-primary rounded-md lg:px-4 px-2 py-1 md:px-6 md:py-2 font-semibold text-white text-sm"
              onClick={handleBookNow}
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Custom Arrows
const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute md:left-[-20px] left-[-10px] top-1/2 transform -translate-y-1/2 z-20 bg-primary text-white p-1 rounded-full hover:bg-gray-600"
    >
      <AiOutlineArrowLeft size={20} />
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute md:right-[-20px] right-[-10px] top-1/2 transform -translate-y-1/2 z-20 bg-primary text-white p-1 rounded-full hover:bg-gray-600"
    >
      <AiOutlineArrowRight size={20} />
    </button>
  );
};

// ✅ CardCarousel Component
function CardCarousel({ centercardData = [], loading = false }) {
  const itemCount = centercardData?.length || 0;

  // Show skeleton while loading
  if (loading) {
    return (
      <div className="flex gap-6 justify-center py-10 flex-wrap">
        {[1, 2, 3].map((idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  // Show fallback message if no data
  if (itemCount === 0) {
    return (
      <p className="text-center text-gray-500 py-10">No services available</p>
    );
  }

  const settings = {
    infinite: itemCount > 3,
    slidesToShow: itemCount >= 3 ? 3 : itemCount || 1,
    slidesToScroll: itemCount >= 3 ? 3 : itemCount || 1,
    speed: 500,
    autoplay: itemCount > 1,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: itemCount > 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: itemCount >= 3 ? 3 : itemCount || 1,
          slidesToScroll: 1,
          infinite: itemCount > 3,
          dots: itemCount > 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: itemCount >= 2 ? 2 : itemCount || 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // force at least 1
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="relative lg:my-10 md:px-4">
      <Slider {...settings}>
        {centercardData.map((item, idx) => (
          <CenterCarousalCard item={item} key={idx} />
        ))}
      </Slider>
    </div>
  );
}

export default CardCarousel;
