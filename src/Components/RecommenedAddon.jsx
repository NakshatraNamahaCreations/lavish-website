import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addAddonItem,
  updateAddonQuantity,
  removeAddonItem,
} from "../features/orderdetails/orderSlice";

const RecommenedAddon = ({ subCat, addons }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState({});

  // Get existing addon items from Redux
  const reduxAddons = useSelector((state) =>
    state.order.currentOrder.items.filter(
      (item) => item.categoryType === "addon"
    )
  );

  // ✅ Get eventDate from Redux (assuming stored in currentOrder)
  const eventDate = useSelector((state) => state.order.currentOrder.eventDate);

  // ✅ Format current date and event date safely
  let isSameDay = false;
  if (eventDate) {
    const parsedEventDate = new Date(eventDate);
    if (!isNaN(parsedEventDate.getTime())) {
      const today = new Date().toISOString().split("T")[0];
      const formattedEventDate = parsedEventDate.toISOString().split("T")[0];
      isSameDay = today === formattedEventDate;
    } else {
      console.warn("Invalid eventDate in Redux:", eventDate);
    }
  }

  const handleQuantityChange = (addon, change) => {
    const existingAddon = reduxAddons.find(
      (item) => item.serviceName === addon.addonsName
    );

    if (existingAddon) {
      const newQuantity = existingAddon.quantity + change;
      if (newQuantity <= 0) {
        dispatch(removeAddonItem({ serviceName: addon.addonsName }));
      } else {
        dispatch(
          updateAddonQuantity({
            serviceName: addon.addonsName,
            quantity: newQuantity,
          })
        );
      }
    } else if (change > 0) {
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
    }
  };

  return (
    <div className="md:p-4 p-2 md:w-[700px] w-[320px] border shadow-md bg-white max-h-[400px] overflow-y-auto flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Make It Extra Special</h2>

      {!addons || addons.length === 0 ? (
        <p className="text-center text-gray-500">No Addons Found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 md:gap-5">
          {addons.map((addon) => {
            const reduxAddon = reduxAddons.find(
              (item) => item.serviceName === addon.addonsName
            );
            const isSelected = !!reduxAddon;
            const isExpanded = expanded[addon._id];

            const notAvailableSameDay =
              isSameDay && addon.samedaydelivery === "Not Possible";

            return (
              <div
                key={addon._id}
                className="p-2 border rounded-md bg-gray-100 relative flex flex-col"
              >
                {/* ✅ Overlay for unavailable same-day delivery */}
                {notAvailableSameDay && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex justify-center items-center text-xs font-semibold z-10 rounded-md text-center px-2">
                    Same Day Delivery Not Available
                  </div>
                )}

                <img
                  loading="lazy"
                  decoding="async"
                  src={`${addon.image}`}
                  alt={addon.addonsName}
                  className="mx-auto w-44 h-48 object-contain"
                />

                <div className="text-center flex-1">
                  <p className="font-semibold">{addon.addonsName}</p>
                  <div
                    className="md:text-sm text-xs text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: isExpanded
                        ? addon.addonsDescription
                        : `${addon.addonsDescription?.substring(0, 60)}...`,
                    }}
                  />
                  {addon.addonsDescription?.length > 60 && (
                    <button
                      className="text-blue-500 text-xs underline pb-2"
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [addon._id]: !prev[addon._id],
                        }))
                      }
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <p className="font-bold md:text-base text-xs">
                    Rs. {addon.price}
                  </p>

                  <div className="flex gap-2 items-center">
                    {!isSelected ? (
                      <button
                        className="bg-primary text-white px-3 py-1 rounded disabled:opacity-50"
                        onClick={() => handleQuantityChange(addon, 1)}
                        disabled={notAvailableSameDay}
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center text-primary font-bold">
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => handleQuantityChange(addon, -1)}
                          disabled={notAvailableSameDay}
                        >
                          -
                        </button>
                        <span className="mx-2">{reduxAddon.quantity}</span>
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => handleQuantityChange(addon, 1)}
                          disabled={notAvailableSameDay}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecommenedAddon;
