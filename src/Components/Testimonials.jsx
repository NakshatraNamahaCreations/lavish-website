import React from "react";
import Slider from "react-slick";
import { FaCircleCheck } from "react-icons/fa6";
import user from "../assets/icons/user.png";
import { IoMdHeart } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";

// const reviewData = [
//   {
//     name: "Nisha Sharma",
//     profileimg:
//       "https://images.unsplash.com/photo-1601268588577-319223ba7cb3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     review:
//       "The service was exceptional! The team was professional, attentive, and delivered beyond our expectations. Highly recommended!",
//     serviceName: "Mermaid theme Decoration",
//     rating: "4.5",
//     servicethemeImg:
//       "https://lavisheventzz-bangalore.b-cdn.net/Mermaid%20Theme%20shimmery%20stylish%20Silver%20Decor.jpg",
//   },
//   {
//     name: "Riya Sharma",
//     review:
//       "I had an amazing experience! The team was friendly, and the service was prompt and efficient. Will definitely use them again!",
//     profileimg:
//       "https://images.unsplash.com/photo-1681717166573-f71589207785?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     serviceName: "Better Together Decoration",
//     rating: "5.0",
//     servicethemeImg:
//       "https://lavisheventzz-bangalore.b-cdn.net/Better%20Together%20Theme%20Terrece%20Decor.jpeg",
//   },

//   {
//     name: "Neha Verma",
//     review:
//       "The quality of work was outstanding! The team was responsive, patient, and delivered exactly what I needed.",
//     profileimg: "",
//     serviceName: "Retirerment decoration",
//     rating: "4.7",
//     servicethemeImg:
//       "https://lavisheventzz-bangalore.b-cdn.net/Retirement%20Theme%20Vibrant%20Decor.jpeg",
//   },
//   {
//     name: "Pooja Singh",
//     review:
//       "Truly impressed! The entire process was smooth, and they ensured every detail was taken care of.",
//     profileimg: "",
//     serviceName: "Wednesday Theme Decoration",
//     rating: "5.0",
//     servicethemeImg:
//       "https://lavisheventzz-bangalore.b-cdn.net/Wednesday%20Theme%20Cute%20Ring%20Decor.jpg",
//   },
//   {
//     name: "Sanjay Rao",
//     review:
//       "Great experience! The team was highly professional and completed the work before the deadline. Will recommend to everyone!",
//     profileimg:
//       "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     serviceName: "Rice Ceremony Decoration",
//     rating: "5.0",
//     servicethemeImg:
//       "https://lavisheventzz-bangalore.b-cdn.net/Rice%20Ceremony%20Theme%20Charming%20Decor.jpeg",
//   },
//   {
//     name: "Meera Kapoor",
//     review:
//       "Exceptional service! They were quick to respond and delivered exactly what was promised. Will definitely hire again.",
//     profileimg:
//       "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     serviceName: "Naming Ceremony Decoration",
//     rating: "4.5",
//     servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/Naming.png",
//   },
//   {
//     name: "Rohan Desai",
//     review:
//       "Reliable and professional! The team went above and beyond to ensure customer satisfaction. Highly recommended!",
//     profileimg:
//       "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     serviceName: "Butterfly theme decoration",
//     rating: "5.0",
//     servicethemeImg:
//       "https://lavisheventzz-bangalore.b-cdn.net/Butterfly%20Theme%20shimmery%20stylish%20Silver%20pretty%20Decor.jpg",
//   },
//   {
//     name: "Vikram Patel",
//     review:
//       "Absolutely fantastic service! They were thorough, detail-oriented, and made the whole process seamless. Five stars!",
//     profileimg: "",
//     serviceName: "Let's Party Decoration ",
//     rating: "5.0",
//     servicethemeImg:
//       "https://lavisheventzz-bangalore.b-cdn.net/Lets%20Party%20Theme%20Gold%20Shimmery%20Sequine%20Decor.jpeg",
//   },
//   {
//     name: "Priya Menon",
//     review:
//       "I am truly happy with the service provided! The attention to detail and quality were remarkable. Thank you!",
//     profileimg:
//       "https://images.unsplash.com/photo-1517265035603-faefa167335b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     serviceName: "Barbie Theme Decoration",
//     rating: "4.5",
//     servicethemeImg:
//       "https://lavisheventzz-bangalore.b-cdn.net/Barbie%20Theme%20%20Charming%20Decor.jpg",
//   },
//   {
//     name: "Ankit Joshi",
//     review:
//       "A wonderful experience! Everything was handled with professionalism and efficiency. Looking forward to working with them again.",
//     profileimg:
//       "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     serviceName: "Mehendi decoration",
//     rating: "5.0",
//     servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/Mehendi.png",
//   },
// ];

const TestimonialsCard = ({ item }) => {
  const { name, review, profileimg, serviceName, rating, servicethemeImg } =
    item;

  const words = review.split(" ");
  const displayedText =
    words.length > 20 ? words.slice(0, 25).join(" ") + "..." : review;
  return (
    <div className="py-2 bg-white shadow-[4px_5px_#D3D3D3] max-w-72 mx-auto  rounded-md  lg:mb-6 ">
      <div className="mx-auto text-center">
        {/* <img
          src={profileimg ? profileimg : user}
          className="rounded-full w-16 h-16 mx-auto object-cover "
          alt="userprofile"
        /> */}
        <p className="font-bold " style={{fontSize:"18px", marginBottom:"6px"}}>{name}</p>
        <p className="flex gap-2 items-center justify-center text-green-700 text-sm">
          <FaCircleCheck />
          Verified Purcahse
        </p>
      </div>

      <p className="h-44 overflow-hidden py-3 text-black px-1">
        {displayedText}
      </p>

      {/* <div className="flex gap-2 items-center "> */}
      <div className=" ">
        <img
          loading="lazy"
          decoding="async"
          src={servicethemeImg}
          alt="service_theme"
          className="rounded-lg w-64 mx-auto h-32 object-contain "
        />
        <div className="px-4 py-2">
          <p className="leading-4 py-0 text-black/80 font-medium">
            {serviceName}
          </p>
          <div className="flex gap-2 justify-between ">
            <p className="flex  items-center py-1 text-black">
              <MdLocationOn className="text-primary" /> Bangalore
            </p>
            <p className="flex gap-1 items-center py-1 text-black">
              <IoMdHeart className="text-primary" /> {rating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = ({ reviewData }) => {
  const settings = {
    infinite: true,
    slidesToScroll: 3,
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
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
    <div className="slider-container lg:mt-10 mt-6">
      <Slider {...settings}>
        {reviewData.map((item, index) => (
          <TestimonialsCard key={index} item={item} />
        ))}
      </Slider>
    </div>
  );
};
export default Testimonials;
