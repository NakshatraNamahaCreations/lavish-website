import React from "react";
import Slider from "react-slick";
import barbieTheme from "../assets/barbie_theme.png";
import junlgletheme from "../assets/jungle_theme.png";
import mermaidTheme from "../assets/Mermaid_theme.png";
import butterflyTheme from "../assets/butterfly_theme.png";
import traditionalTheme from "../assets/traditional_theme.png";
import pastelTheme from "../assets/pastel_theme.png";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const images = [
  {
    id: 1,
    src: barbieTheme,
    alt: "barbie theme",
    title: "Pink roses bouquets",
    price: "649",
  },
  {
    id: 2,
    src: junlgletheme,
    alt: "junlgle theme",
    title: "Pink roses bouquets",
    price: "649",
  },
  {
    id: 3,
    src: mermaidTheme,
    alt: "mermaid theme",
    title: "Pink roses bouquets",
    price: "649",
  },
  {
    id: 4,
    src: butterflyTheme,
    alt: "butterfly theme",
    title: "Pink roses bouquets",
    price: "649",
  },
  {
    id: 5,
    src: traditionalTheme,
    alt: "traditional theme",
    title: "Pink roses bouquets",
    price: "649",
  },
  {
    id: 6,
    src: pastelTheme,
    alt: "pastel theme",
    title: "Pink roses bouquets",
    price: "649",
  },
];

// Custom Prev Arrow (Top/Left Arrow)
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`z-10 absolute -left-3 top-1/2 transform -translate-y-1/2
      bg-primary text-white md:p-2 p-1 rounded-full shadow-md hover:bg-gray-900`}
  >
    <AiOutlineArrowLeft size={15} />
  </button>
);

// Custom Next Arrow (Bottom/Right Arrow)
const NextArrow = ({ onClick, isMobile }) => (
  <button
    onClick={onClick}
    className={`z-10 absolute -right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white md:p-2 p-1 rounded-full shadow-md hover:bg-gray-900`}
  >
    <AiOutlineArrowRight size={15} />
  </button>
);

function ServicedetailsSlider() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="slider-container py-1 my-10">
      <Slider {...settings}>
        {images.map((item, idx) => (
          <div
            className="text-center flex  justify-center items-center"
            key={idx}
          >
            <img
              loading="lazy"
              decoding="async"
              src={barbieTheme}
              alt="barbie theme"
              className="w-[70%] mx-auto  rounded-lg object-cover"
            />
            <p className="md:text-lg text-2xl md:py-1 py-2">
              Pink roses bouquets
            </p>
            <div className="w-[60%] mx-auto text-xl flex items-center justify-between  ">
              <p>Rs. 649</p>
              <button className="bg-[#AA6300] text-white  px-3 rounded">
                ADD
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ServicedetailsSlider;
