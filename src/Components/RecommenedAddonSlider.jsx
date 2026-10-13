import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Slider from "react-slick";
import { addAddonItem, updateAddonQuantity, removeAddonItem } from "../features/orderdetails/orderSlice";

// Arrow buttons for slider
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="z-10 absolute -left-3 top-1/2 transform -translate-y-1/2 bg-primary text-white md:p-2 p-1 rounded-full shadow-md hover:bg-gray-900"
  >
    <AiOutlineArrowLeft size={15} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="z-10 absolute -right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white md:p-2 p-1 rounded-full shadow-md hover:bg-gray-900"
  >
    <AiOutlineArrowRight size={15} />
  </button>
);

// Main component
const RecommenedAddonSlider = ({ subCat, addons }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState({});

  // Redux addons (added by user)
  const reduxAddons = useSelector((state) =>
    state.order.currentOrder.items.filter((item) => item.categoryType === "addon")
  );

  // Get eventDate from Redux
  const eventDate = useSelector((state) => state.order.currentOrder.eventDate);

  // Check if eventDate is today
  let isSameDay = false;
  if (eventDate) {
    const parsedEventDate = new Date(eventDate);
    if (!isNaN(parsedEventDate.getTime())) {
      const today = new Date().toLocaleDateString();
      const eventDay = parsedEventDate.toLocaleDateString();
      isSameDay = today === eventDay;
    }
  }

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAdd = (addon) => {
    dispatch(
      addAddonItem({
        serviceName: addon.addonsName,
        price: addon.price,
        originalPrice: addon.originalPrice || addon.price,
        image: addon.image || "",
        quantity: 1,
        id: addon._id,
        customizedInputs: addon.customizedInputs,
      
      })
    );
  };

  const increment = (addon) => {
    const reduxAddon = reduxAddons.find((item) => item.serviceName === addon.addonsName);
    if (reduxAddon) {
      dispatch(updateAddonQuantity({ serviceName: addon.addonsName, quantity: reduxAddon.quantity + 1 }));
    }
  };

  const decrement = (addon) => {
    const reduxAddon = reduxAddons.find((item) => item.serviceName === addon.addonsName);
    if (!reduxAddon) return;

    if (reduxAddon.quantity <= 1) {
      dispatch(removeAddonItem({ serviceName: addon.addonsName }));
    } else {
      dispatch(updateAddonQuantity({ serviceName: addon.addonsName, quantity: reduxAddon.quantity - 1 }));
    }
  };

  
  // Filter out addons where samedaydelivery is "Not Possible" if event date is today
  const filteredAddons = isSameDay
    ? addons.filter((addon) => addon.samedaydelivery !== "Not Possible")
    : addons;


  const settings = {
    infinite: filteredAddons.length > 4,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    arrows: true,
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (!addons || addons.length === 0) {
    return null;
  }

  return (
    <div className="md:my-10 my-3">
      <Slider {...settings}>
        {filteredAddons.map((addon) => {
          const isExpanded = expanded[addon._id];
          const reduxAddon = reduxAddons.find((item) => item.serviceName === addon.addonsName);
          const isSelected = !!reduxAddon;

          return (
            <div key={addon._id} className="rounded-md">
              <div className="relative p-2 border rounded-md bg-gray-200 md:mx-3 mx-1 pb-10 flex flex-col justify-between">
                <img
                   loading="lazy"
          decoding="async"
                  src={`${addon?.image}`}
                  alt={addon.addonsName}
                  className="mx-auto h-56 object-contain"
                />

                <div className="text-center">
                  <p className="font-semibold">{addon.addonsName}</p>

                  <div
                    className="md:text-sm text-xs text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: isExpanded
                        ? addon.addonsDescription
                        : `${addon.addonsDescription.substring(0, 60)}...`,
                    }}
                  />

                  {addon.addonsDescription.length > 60 && (
                    <button className="text-blue-500 text-xs underline" onClick={() => toggleExpand(addon._id)}>
                      {isExpanded ? "Show Less" : "Show More"}
                    </button>
                  )}

                  <div className="flex justify-between items-center mt-4">
                    <p className="font-bold">Rs. {addon.price}</p>

                    {!isSelected ? (
                      <button onClick={() => handleAdd(addon)} className="bg-primary text-white px-2 py-1 rounded text-sm">
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button onClick={() => decrement(addon)} className="bg-gray-300 px-2 rounded">
                          -
                        </button>
                        <span>{reduxAddon.quantity}</span>
                        <button onClick={() => increment(addon)} className="bg-primary text-white px-2 rounded">
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default RecommenedAddonSlider;
