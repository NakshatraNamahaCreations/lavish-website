import React from "react";
import Slider from "react-slick";
import { FaCircleCheck } from "react-icons/fa6";
import user from "../assets/icons/user.png";
import { IoMdHeart } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";

const reviewData = [
  {
    name: "Sneha R",
    profileimg:
      "https://images.unsplash.com/photo-1601268588577-319223ba7cb3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    review:
      "Lavish Eventzz made my daughter’s birthday magical! The unicorn theme was done so tastefully and the setup was ready before time. Everyone kept asking me who the decorator was. Highly recommended!",
    serviceName: "Mermaid theme Decoration",
    rating: "4.5",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/Mermaid%20Theme%20shimmery%20stylish%20Silver%20Decor.jpg",
  },
  {
    name: "Ajay M",
    review:
      "Right from the first call to the final clean-up, everything was handled so smoothly. The balloon decoration and photo booth were a huge hit. Thank you Lavish Eventzz for making our home look like a dream!",
    profileimg:
      "https://images.unsplash.com/photo-1681717166573-f71589207785?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    serviceName: "Better Together Decoration",
    rating: "5.0",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/Better%20Together%20Theme%20Terrece%20Decor.jpeg",
  },

  {
    name: "Divya K",
    review:
      "I was surprised by how affordable the package was, and yet the decor looked premium. I loved the personalized name board and color coordination. Will definitely book again for our next celebration.",
    profileimg:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    serviceName: "Retirerment decoration",
    rating: "4.7",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/Retirement%20Theme%20Vibrant%20Decor.jpeg",
  },
  {
    name: "Ravi T",
    review:
      "The lavish team listened to every detail I wanted and made it even better than I imagined. My son loved his jungle-themed party! The entire experience was smooth, and the team was very polite and professional.",
    profileimg: "",
    serviceName: "Wednesday Theme Decoration",
    rating: "5.0",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/Wednesday%20Theme%20Cute%20Ring%20Decor.jpg",
  },
  {
    name: "Aarti P",
    review:
      "Lavish Eventzz completely changed the look of our terrace into a magical birthday zone. The fairy lights, balloon arches, and backdrop were picture-perfect. Guests couldn’t stop complimenting the décor!",
    profileimg:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    serviceName: "Annaprashan Ceremony Decoration",
    rating: "5.0",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/Rice%20Ceremony%20Theme%20Charming%20Decor.jpeg",
  },
  {
    name: "Harshita N",
    review:
      "I was on a tight budget, but they still delivered a high-quality setup that looked amazing. No hidden charges, and very honest communication throughout. I would highly recommend it for any birthday decor",
    profileimg:
      "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    serviceName: "Naming Ceremony Decoration",
    rating: "4.5",
    servicethemeImg: "https://lavisheventzz-bangalore.b-cdn.net/Naming.png",
  }

];

const TestimonialsCard = ({ item }) => {
  const { name, review, profileimg, serviceName, rating, servicethemeImg } =
    item;

  const words = review.split(" ");
  const displayedText =
    words.length > 20 ? words.slice(0, 25).join(" ") + "..." : review;
  return (
    <div className="py-2 bg-white shadow-[4px_5px_#D3D3D3] max-w-72 mx-auto  rounded-md  lg:mb-6 ">
      <div className="mx-auto text-center">
        <img
          src={profileimg ? profileimg : user}
          className="rounded-full w-16 h-16 mx-auto object-cover "
          alt="userprofile"
        />
        <p className="font-bold">{name}</p>
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

const Testimonials2 = () => {
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
export default Testimonials2;
