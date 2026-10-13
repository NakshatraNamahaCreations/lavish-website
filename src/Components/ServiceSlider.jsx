import React from "react";
import Slider from "react-slick";
import ServiceCard from "./ServiceCard";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";




const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`z-10 absolute -left-3 top-1/2 transform -translate-y-1/2
      bg-primary text-white md:p-2 p-1 rounded-full shadow-md hover:bg-gray-900`}
  >
  <AiOutlineArrowLeft size={15} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`z-10 absolute -right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white md:p-2 p-1 rounded-full shadow-md hover:bg-gray-900`}
  >
   <AiOutlineArrowRight size={15} /> 
  </button>
);


function ServiceSlider({ data }) {
    const settings = {
      
        infinite: true,
        slidesToShow: 3,
        speed: 500,
        arrows: true,
        pauseOnHover: true,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };

    return (
        <div className="md:my-10 my-3 md:px-4">
            <Slider {...settings}>
                {data.map((item, index) => (
                <ServiceCard item={item} key={index}/>
                ))}
            </Slider>
        </div>
    );
}

export default ServiceSlider;
