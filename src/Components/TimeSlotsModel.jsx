import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedTimeSlot,
  setEventDate,
} from "../features/orderdetails/orderSlice";
import "react-calendar/dist/Calendar.css";

const TimeSlotsModel = ({
  setShowAddonsModal,
  setShowTimeSlots,
  hasAddons,
  timeSlots,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const dispatch = useDispatch();
  const selectedTimeSlot = useSelector((state) => state.order.selectedTimeSlot);
  const eventDate = useSelector((state) => state.order.currentOrder.eventDate);

  // Convert event date back to Date object for display
  const selectedDate = eventDate ? new Date(eventDate) : null;

  const handleSlotChange = (event) => {
    const selected = event.target.value;
    dispatch(setSelectedTimeSlot(selected));
  };

  // const handleDateChange = (date) => {
  //     if (date) {
  //         dispatch(setEventDate(date.toISOString()));
  //         setShowCalendar(false);
  //     }
  // };

  // Format date for display
  // const formatDate = (date) => {
  //     if (!date) return 'Select a date';
  //     return date.toLocaleDateString('en-US', {
  //         day: 'numeric',
  //         month: 'short',
  //         year: 'numeric'
  //     });
  // };

  return (
    <div className="p-4 md:w-[400px] w-[320px] border shadow-md bg-white max-h-[500px] overflow-y-auto">
      {/* Time Slot Selection */}
      <h2 className="text-lg font-semibold mb-2">Select a Time Slot</h2>
      <form>
        {timeSlots.map((slot, index) => (
          <label
            key={index}
            className={`flex items-center space-x-2 mb-2 border border-gray-200 rounded-md lg:p-2 p-2 ${
              selectedTimeSlot === slot
                ? "bg-primary text-white"
                : "bg-gray-200"
            }`}
          >
            <input
              type="radio"
              name="timeSlot"
              value={slot}
              checked={selectedTimeSlot === slot}
              onChange={handleSlotChange}
              className="form-radio text-blue-600"
            />
            <div>
              <span>{slot}</span>
            </div>
          </label>
        ))}
      </form>

      {selectedTimeSlot && (
        <p className="mt-4 text-green-600 font-medium">
          Selected Time Slot: {selectedTimeSlot}
        </p>
      )}
    </div>
  );
};

export default TimeSlotsModel;
