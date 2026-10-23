import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQ_DATA } from "@/lib/faq-data";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = FAQ_DATA;

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#DCEEF5]/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 reveal-fade-up">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1B2A4A]">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#5A6578] font-normal max-w-2xl mx-auto">
            Everything you need to know about joining Vibe Connect Virtual as a
            remote agent, our payout structure, and equipment requirements.
          </p>
        </div>

        {/* Accordion List - Matching Design orange-colored headers */}
        <div className="space-y-3 max-w-3xl mx-auto reveal-fade-up stagger-1">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="border border-[#e67320]/30 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className={`w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none min-h-[48px] transition-colors ${
                    isOpen
                      ? "bg-[#f08428] text-white"
                      : "bg-[#f38c32] hover:bg-[#e67b25] text-white"
                  }`}
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-sm sm:text-base text-white flex items-center gap-2">
                    <span className="text-xs">▶</span>
                    {faq.question}
                  </span>

                  <div
                    className={`w-6 h-6 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#2B2B2B]/80 font-normal leading-relaxed border-t border-gray-100 mt-1">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
