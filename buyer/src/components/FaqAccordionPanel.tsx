"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { FAQCategory } from "@/lib/faqData";

interface FaqAccordionPanelProps {
  categories: FAQCategory[];
  showCategoryHeaders?: boolean;
  variant?: "light" | "dark";
}

export default function FaqAccordionPanel({
  categories,
  showCategoryHeaders = true,
  variant = "light",
}: FaqAccordionPanelProps) {
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});

  const toggleFaq = (faqId: string) => {
    setOpenFaqs((prev) => ({ ...prev, [faqId]: !prev[faqId] }));
  };

  const isDark = variant === "dark";

  return (
    <div className="flex flex-col gap-12">
      {categories.map((category) => (
        <section key={category.id} id={category.id}>
          {showCategoryHeaders && (
            <div className="mb-8">
              <h2 className={`font-serif text-2xl md:text-3xl font-medium tracking-wide ${isDark ? "text-white" : "text-[#010048]"}`}>
                {category.title}
              </h2>
              {category.subtitle && (
                <p className={`text-xs mt-1 font-light ${isDark ? "text-white/50" : "text-slate-400"}`}>
                  {category.subtitle}
                </p>
              )}
            </div>
          )}

          <div className={`flex flex-col divide-y ${isDark ? "divide-white/10" : "divide-slate-100"}`}>
            {category.faqs.map((faq) => {
              const isOpen = !!openFaqs[faq.id];
              return (
                <div key={faq.id} className="py-2 first:pt-0 last:pb-0 group">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left outline-none transition-colors duration-200 cursor-pointer"
                  >
                    <span
                      className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                        isOpen
                          ? isDark
                            ? "text-white font-semibold"
                            : "text-[#010048] font-semibold"
                          : isDark
                            ? "text-white/80 group-hover:text-white"
                            : "text-slate-700 group-hover:text-[#010048]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ml-4 ${
                        isOpen
                          ? isDark
                            ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                            : "border-[#010048] bg-blue-50 text-[#010048]"
                          : isDark
                            ? "border-white/20 text-white/50 group-hover:border-cyan-400/50 group-hover:text-cyan-300"
                            : "border-slate-200 text-slate-400 group-hover:border-slate-400 group-hover:text-slate-600"
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out text-sm font-light leading-relaxed overflow-hidden ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-2 pb-2" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div
                      className={`overflow-hidden rounded-xl px-4 py-3 border text-sm leading-relaxed ${
                        isDark
                          ? "bg-white/[0.04] border-white/10 text-white/60"
                          : "bg-slate-50/70 border-slate-100 text-slate-600"
                      }`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
