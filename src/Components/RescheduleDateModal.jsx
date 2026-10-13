import React, { useState, useEffect } from "react";
import { SlCalender } from "react-icons/sl";
import { LuClock3 } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const RescheduleDateModal = ({
  setShowModal,
  selectedOrder,
  newDate,
  setNewDate,
  newTime,
  setNewTime,
  onContinue,
  timeSlots,
}) => {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  useEffect(() => {
    // Prepopulate date and time from selectedOrder
    if (selectedOrder?.eventDate) {
      const date = new Date(selectedOrder.eventDate);
      const formatted = formatDate(date);
      setNewDate(formatted);
    }
    if (selectedOrder?.eventTime) {
      setNewTime(selectedOrder.eventTime);
    }
  }, [selectedOrder, setNewDate, setNewTime]);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }); // Example: May 22, 2025
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center text-primary">
          Reschedule Booking
        </h2>

        {/* Date Picker */}
        <div
          className="border rounded-md p-3 cursor-pointer"
          onClick={() => {
            setIsDateOpen(!isDateOpen);
            setIsTimeOpen(false);
          }}
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold flex items-center gap-2">
              <SlCalender />
              {newDate || "Select a date"}
            </p>
            <span className="text-gray-500">
              {isDateOpen ? <GoChevronUp /> : <GoChevronDown />}
            </span>
          </div>

          <AnimatePresence>
            {isDateOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 flex justify-center"
                // 👇 This will stop click from bubbling and accidentally closing the calendar
                onClick={(e) => e.stopPropagation()}
              >
                <DatePicker
                  selected={newDate ? new Date(newDate) : null}
                  onChange={(date) => {
                    if (date) {
                      const formatted = formatDate(date);
                      setNewDate(formatted);
                      // don't close calendar
                    }
                  }}
                  minDate={new Date()}
                  className="w-full outline-none"
                  dateFormat="dd-MM-yyyy"
                  inline
                  shouldCloseOnSelect={false}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>


        {/* Time Slot */}
        <div
          className="border rounded-md p-3 cursor-pointer mt-3"
          onClick={() => {
            setIsTimeOpen(!isTimeOpen);
            setIsDateOpen(false);
          }}
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold flex items-center gap-2">
              <LuClock3 /> {newTime || "Select a time slot"}
            </p>
            <span className="text-gray-500">
              {isTimeOpen ? <GoChevronUp /> : <GoChevronDown />}
            </span>
          </div>

          <AnimatePresence>
            {isTimeOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2"
              >
                <div className="grid grid-cols-1 gap-2">
                  {timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setNewTime(slot);
                        setIsTimeOpen(false);
                      }}
                      className={`p-2 rounded-md cursor-pointer ${newTime === slot
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                        }`}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded text-white ${newDate && newTime
                ? "bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
              }`}
            onClick={onContinue}
            disabled={!newDate || !newTime}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleDateModal;
