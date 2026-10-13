import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How far in advance should I book your decoration?",
    answer: "We recommend booking at least 3-7 days in advance to ensure availability and a smooth experience. However, for urgent requests, you can contact us, and we'll try our best to accommodate your needs.",
  },
  {
    question: "Can I customize the decoration according to my preference?",
    answer: "Yes, we specialize in personalized balloon decorations tailored to your event's theme, color preferences, and specific requirements.",
  },
  {
    question: "What do you mean by time slots?",
    answer: "Time slots are specific times when you can book our services. If you choose the time slot of 2-4 pm, then our decorators will arrive at your location by 2 pm, and the decoration will be ready by 4 pm.",
  },
  {
    question: "Do you offer same-day decoration service?",
    answer: "Yes, we offer same-day decoration service. Please contact us to check slot availability.",
  },
];
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" w-full mx-auto ">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <button
              className="w-full flex justify-between items-center md:text-lg font-medium"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
