import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function DynamicFaqs({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" w-full mx-auto ">
      <div className="space-y-4">
        {faqs?.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <button
              className="w-full flex justify-between  md:text-lg font-medium"
              onClick={() => toggleFAQ(index)}
            >
              <h5>{faq.question}</h5>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
