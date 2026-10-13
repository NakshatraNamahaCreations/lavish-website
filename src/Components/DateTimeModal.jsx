import React, { useState } from "react";
import { SlCalender } from "react-icons/sl";
import { LuClock3 } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { setEventDate, setSelectedTimeSlot } from "../features/orderdetails/orderSlice";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

const DateTimeModal = ({ setShowModal, timeSlots }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderState = useSelector((state) => state.order);

    // Extract data from the new Redux structure
    const {
        currentOrder,
        selectedTimeSlot,
        isPincodeValid,
        deliveryMessage
    } = orderState;

    const { pincode, eventDate, balloonsColor } = currentOrder;

    // Convert ISO string back to Date object for display
    const selectedDate = eventDate ? new Date(eventDate) : null;

    const [isDateOpen, setIsDateOpen] = useState(false);
    const [isTimeOpen, setIsTimeOpen] = useState(false);

    // Format date for display
    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleDateChange = (date) => {
        if (date) {
            dispatch(setEventDate(date.toISOString()));
            // setIsDateOpen(false);
        }
    };

    const handleTimeSlotSelect = (time) => {
        dispatch(setSelectedTimeSlot(time));
        setIsTimeOpen(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[350px] p-6 py-2 mt-14 rounded-xl shadow-lg">
                <p className="text-primary text-center font-medium mb-1 text-lg">
                    Pick preferred date and time
                </p>
                <div
                    className="border rounded-md p-3 cursor-pointer"
                    onClick={() => {
                        setIsDateOpen(!isDateOpen);
                        setIsTimeOpen(false);
                    }}
                >
                    <div className="flex justify-between items-center">
                        <p className="font-semibold flex items-center gap-2">
                            <SlCalender /> {selectedDate ? formatDate(selectedDate) : "Select a date"}
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
                                onClick={(e) => e.stopPropagation()} // ✅ This line prevents closing
                            >
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    placeholderText='Select Date & Time'
                                    minDate={(() => {
                                      const today = new Date();
                                      today.setHours(0,0,0,0);
                                      if (selectedDate) {
                                        const selected = new Date(selectedDate);
                                        selected.setHours(0,0,0,0);
                                        if (selected.getTime() === today.getTime()) {
                                          return today; // allow today
                                        }
                                      }
                                      const tomorrow = new Date();
                                      tomorrow.setDate(today.getDate() + 1);
                                      tomorrow.setHours(0,0,0,0);
                                      return tomorrow;
                                    })()}
                                    className='w-full outline-none'
                                    dateFormat="dd-MM-yyyy"
                                    inline
                                    shouldCloseOnSelect={false} // ✅ Prevents auto-close on select
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* Time Slot Selection */}
                <div className="border rounded-md p-3 cursor-pointer mt-3" onClick={() => {
                    setIsTimeOpen(!isTimeOpen);
                    setIsDateOpen(false);
                }}>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold flex items-center gap-2">
                            <LuClock3 /> {selectedTimeSlot || "Select a time slot"}
                        </p>
                        <span className="text-gray-500">{isTimeOpen ? <GoChevronUp /> : <GoChevronDown />}</span>
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
                                            onClick={() => handleTimeSlotSelect(slot)}
                                            className={`p-2 rounded-md cursor-pointer ${selectedTimeSlot === slot
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

                {/* Confirm Button */}
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={() => setShowModal(false)}
                        disabled={!selectedDate || !selectedTimeSlot}
                        className={`p-2 rounded-md text-sm ${selectedDate && selectedTimeSlot
                                ? "bg-primary text-white"
                                : "bg-gray-400 text-gray-200 cursor-not-allowed"
                            }`}
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => setShowModal(false)}
                        className="p-2 text-sm rounded-md bg-gray-300 text-black cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DateTimeModal;
