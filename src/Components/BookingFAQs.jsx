import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const BookingFAQs = ({ isOpen, toggleModal }) => {

    const [activeIndex, setActiveIndex] = useState(null);
    const toggleAccordion = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const faqData = [
        {
            question: "What is a Time Slot?",
            answer: "If you need the decoration ready by 2PM, select the 12–2 PM slot. We recommend booking early, as slots fill up quickly."
        },
        {
            question: "What if my slot is unavailable? Can I book for the same day?",
            answer: "Yes, we accommodate urgent requests. WhatsApp us at +919620558000, and our team will do their best to arrange your decoration."
        },
        {
            question: "When will I get the decorator's number?",
            answer: "After booking confirmation, we will share the decorator's number. If it's a same-day booking, our decorator will contact you directly. Our customer support is available from Monday to Sunday, 10 AM to 7:30 PM."
        },
        {
            question: "When will decorators come and how much time is required for decoration?",
            answer: "Decorators will come at the selected time slots. For example, if you select a 4–6 PM slot, they will arrive by 4 or 4:30, and by 6 PM, it will be done. For simple decorations, 1–2 hours; for bigger decorations, 2–3 hours max."
        },
        {
            question: "How will I know if my order is confirmed?",
            answer: "Once your booking is complete, you will receive a confirmation email and WhatsApp message with your order details and time slot. If you don't receive confirmation within 30 minutes, contact us at +919620558000."
        },
        {
            question: "How many people will come?",
            answer: "Generally, 1 decorator comes with all materials. However, for bigger decorations, the number of people will increase based on the decorations."
        },
        {
            question: "Can I change my time slot after booking?",
            answer: "Yes, you can request a time slot change up to 6 hours before your scheduled slot. However, changes are subject to availability."
        },
        {
            question: "Do I need to arrange anything for decorators?",
            answer: "No, our team carries all the necessary materials. Only a small tool or chair may be required, and sometimes access to an electric socket may be needed."
        },
        {
            question: "Is Lavisheventzz a Trusted Brand?",
            answer: "Yes, we are Bangalore's No.1 balloon decoration service for the past 8 years. Search 'Balloon decoration' in the city, and you will find Lavisheventzz on top. We have served over 10k+ customers across Bangalore, and daily we do more than 500 decorations across the city."
        },
        {
            question: "How long will the decoration last?",
            answer: "The decoration will last for several hours, depending on the type and materials used. Generally, balloon decorations last around 8–12 hours. However, factors like air conditioning and humidity may affect this."
        },
        {
            question: "Do you offer Cash-on-Delivery (COD)?",
            answer: "We do not offer COD as decoration is a customized service for each user. However, you can confirm your booking with a 100% payment for decoration."
        },
        {
            question: "Can I customize my decorations?",
            answer: "Absolutely! You can customize balloon colors, themes, and more. After booking, WhatsApp us at +919620558000, and our team will assist you with personalization."
        },
        {
            question: "Can I keep all the materials with us after decoration?",
            answer: "Yes, all decoration materials remain with you. However, rental items like focus lights, metal stands, and vases will be collected the next day."
        },
        {
            question: "I am getting a lower price quote from another brand?",
            answer: "Yes, we ensure premium, safe materials for all decorations, unlike local decorators who may reuse or use low-quality items. Our pricing reflects quality and timely service, but you can WhatsApp us for the best quote."
        }
    ];


    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="bg-white rounded-lg w-96 md:w-[600px] p-6 max-h-[80vh] overflow-y-auto relative ">
                            <h2 className="text-xl font-bold mb-4">FAQ</h2>
                            <div className="space-y-4">
                                {faqData.map((item, index) => (
                                    <div key={index} className="border-b py-2">
                                        <div
                                            className="flex font-medium cursor-pointer text-lg"
                                            onClick={() => toggleAccordion(index)}
                                        >
                                            <p className="w-full">{item.question}</p>
                                            {/* Display Plus/Minus Icon */}
                                            <p>   {activeIndex === index ? <FaMinus size={14} /> : <FaPlus size={14} />}</p>
                                        </div>
                                        {/* Accordion answer with animation */}
                                        <div
                                            className={`transition-all duration-300 ease-in-out ${activeIndex === index ? "max-h-screen" : "max-h-0"
                                                } overflow-hidden mt-2`}
                                        >
                                            {activeIndex === index && <div className="text-gray-600">{item.answer}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center mt-4" onClick={toggleModal}>
                                <button className="mx-auto py-2 text-white font-bold rounded-md bg-primary px-5">
                                    Done
                                </button>
                            </div>
                            <button
                                className="absolute top-2 right-2 text-xl text-gray-500"
                                onClick={toggleModal}
                            >
                                <MdClose />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingFAQs;
