"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ContactFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How can I contact KMA Global Properties?",
      a: "You can call us at +91-9056580022, email us at info@kmaglobalproperty.com, or use the contact form on our website.",
    },
    {
      q: "Where is KMA Global Properties located?",
      a: "Our office is located at Plot No. 3A, Sector 106, Dwarka Expressway, Gurugram, Haryana, India – 122006.",
    },
    {
      q: "What services can I contact you for?",
      a: "You can contact us for buying or selling property, investment options, site visits, rental queries, and career opportunities in real estate.",
    },
    {
      q: "Do you provide real estate consultation?",
      a: "Yes, we provide guidance on property selection, pricing, investment opportunities, and location benefits, usually at no cost.",
    },
    {
      q: "What is your response time?",
      a: "We usually respond within working hours on the same day. In case of delays, we ensure every query is answered.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-10 space-y-6 max-w-6xl mx-auto">
      <div className="text-center md:text-left">
        <h2 className="text-xl md:text-2xl font-bold text-[#010048] tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3.5 pt-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/40 transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)} // 👈 Single handle control loop call
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 font-semibold text-sm md:text-base text-[#010048] hover:bg-gray-50 transition-all outline-none cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="shrink-0 p-1 rounded-full bg-white text-[#010048] shadow-sm border border-gray-100/50">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  )}
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen
                    ? "max-h-[500px] opacity-100 border-t border-gray-50 bg-white"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <p className="p-5 text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}