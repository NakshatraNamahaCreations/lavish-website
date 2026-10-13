import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Do you provide birthday planners at home in Bangalore?",
    answer: "Yes! We specialize in transforming your home, terrace, or apartment space into a party-ready venue with complete decor, entertainment, and setup.",
  },
  {
    question: "Can I customize the birthday theme and decorations?",
    answer: "Absolutely. We offer a wide range of trending themes and also create custom themes based on your ideas, colors, and preferences.",
  },
  {
    question: "What does your birthday event package include?",
    answer: "Our packages are customizable and can include theme decor, balloon setups, stage and backdrop, food stalls, emcee, return gifts, photo booths, and much more.",
  },
  {
    question: "Do you arrange cakes and return gifts?",
    answer: "Yes, we work with premium bakeries and vendors across Bangalore to offer designer cakes and curated return gift options for all age groups.",
  },
    {
    question: "Do you offer birthday party packages for adults or milestone celebrations?",
    answer: "Yes, we plan adult birthdays too! Whether it’s a 30th birthday bash, a surprise 50th, or a retro-themed party for seniors, we design celebrations that suit every age group and vibe.",
  },
    {
    question: "Can you organize themed entertainment like magicians, puppet shows, or live cartoon characters?",
    answer: "Absolutely! We provide kid-friendly entertainers including magicians, tattoo artists, caricaturists, puppet shows, clowns, mascots, and more depending on the age group and party theme.",
  },
];
export default function FAQ2() {
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
