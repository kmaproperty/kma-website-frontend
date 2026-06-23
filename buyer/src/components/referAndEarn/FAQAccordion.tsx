import * as React from "react";
import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "When do I get paid after a referral converts?",
      answer:
        "Commissions are processed within 7 business days of deal closure at Bronze tier, 5 days at Silver, 3 days at Gold, and 1 day for Platinum partners. Payouts go directly to your registered bank account via NEFT/IMPS.",
    },
    {
      question: "Who can become a KMA referral partner?",
      answer:
        "Anyone can join — professionals, influencers, homemakers, students, or anyone with a network. No prior real estate experience or investment is required. If you can share a link, you can earn.",
    },
    {
      question: "What happens with GST and TDS on sale referrals?",
      answer:
        "For sale referrals, applicable GST and TDS are deducted as per prevailing Government regulations before payout. The exact percentage depends on the deal value and your tax filing status. KMA's team will provide a clear breakdown before settlement.",
    },
    {
      question: "What qualifies as a successful referral?",
      answer:
        "A referral is successful when your contact completes a property transaction through KMA Global Property. Site visits and inquiries are tracked, but commission is paid on completed deals only. Remember — you must submit the referral before the deal closes.",
    },
    {
      question: "Is there a cap on how much I can earn?",
      answer:
        "Zero cap. The more referrals you convert, the more you earn — and your tier bonus multiplies your income. Our top Platinum partners consistently earn over ₹5 lakhs per quarter.",
    },
    {
      question: "Can I refer someone who already knows KMA?",
      answer:
        "Yes — as long as they haven't been previously registered in our system. If they sign up through your unique link and close a deal, you earn the commission regardless of prior brand awareness.",
    },
  ];

  return (
    <div className="w-full py-10 md:py-5 antialiased text-[#010048]">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center space-y-3 mb-16">
            <p className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-[#010048]/60 flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#010048]/30" />
            FAQ
            <span className="w-6 h-[1px] bg-[#010048]/30" />
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none">
            Everything You <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue via-blue-800 to-blue-400 font-serif">Need to Know</span>
          </h2>
        </div>

        <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="py-5 md:py-6 transition-colors duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left gap-6 group cursor-pointer focus:outline-none"
                >
                  <span className="text-base md:text-md font-black tracking-tight text-[#010048] group-hover:text-[#010048]/80 transition-colors">
                    {faq.question}
                  </span>
                  
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300
                      ${isOpen 
                        ? "bg-blue border-[#ffffff] text-white shadow-md rotate-90" 
                        : "bg-white border-[#010048]/20 text-[#010048] group-hover:border-[#010048]"
                      }`}
                  >
                    {isOpen ? (
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    )}
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out text-sm md:text-base text-gray-500 font-medium leading-relaxed
                    ${isOpen 
                      ? "grid-rows-[1fr] opacity-100 mt-4" 
                      : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="pr-10 text-slate-500  text-sm md:text-md">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}