import React from "react";
import Slider from "react-slick";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const PrevArrow = ({ className, onClick }) => (
  <div onClick={onClick} className={`${className}   lg:left-0 -left-2 `}>
    <AiOutlineArrowLeft className="text-white bg-primary rounded-full p-1 w-6 h-6 " />
  </div>
);

const NextArrow = ({ className, onClick }) => (
  <div onClick={onClick} className={`${className}  lg:right-0 -right-0 `}>
    <AiOutlineArrowRight className="text-white bg-primary rounded-full p-1 w-6 h-6 " />
  </div>
);

function PhotograpghySlider({ imagelist }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container lg:my-20 my-5">
      <Slider {...settings} className="px-5">
        {imagelist.map((item) => {
          return (
            <div key={item.alt} className="">
              <img
                loading="lazy"
                decoding="async"
                src={item.src}
                alt={item.alt}
                className=""
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default PhotograpghySlider;
