"use client"

import React, { useState, useEffect, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { faqData } from "@/lib/faqData";

export default function FaqScroll() {
  const [activeCategory, setActiveCategory] = useState<string>(faqData[0].id);
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({});
  const isClickScrolling = useRef<boolean>(false);

  const toggleFaq = (faqId: string) => {
    setOpenFaqs((prev) => ({ ...prev, [faqId]: !prev[faqId] }));
  };

  const scrollToSection = (id: string) => {
    isClickScrolling.current = true;
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 110;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    // Release lock after scroll completion animation timing
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  // Intersection Observer to trace scrolling state transition updates
  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (isClickScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    });

    faqData.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-white text-[#010048] min-h-screen font-sans py-16 px-4 md:px-8 select-none relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 relative items-start">
        
        {/* LEFT SIDE PANEL — STICKY CONTAINER NODE */}
        <aside className="lg:col-span-1 sticky top-30 self-start hidden lg:flex flex-col">
          <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 mb-6 uppercase">
            JUMP TO
          </p>
          <div className="flex flex-col gap-2 border-l border-slate-200">
            {faqData.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => scrollToSection(category.id)}
                  className={`flex items-center justify-between text-left text-sm font-medium py-3 pl-4 border-l-2 -ml-[1.5px] transition-all duration-300 outline-none ${
                    isActive
                      ? "border-[#010048] bg-gradient-to-r from-blue-50 to-transparent text-[#010048] font-bold shadow-[inset_1px_0_0_0_rgba(1,0,72,0.1)]"
                      : "border-transparent text-slate-500 hover:text-[#010048]"
                  }`}
                >
                  <span>{category.title}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-2 ${
                    isActive ? "bg-[#010048] text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    {category.faqs.length}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* RIGHT SIDE PANEL — SCROLLABLE COMPONENT CONTEXT GRID */}
        <main className="lg:col-span-3 flex flex-col gap-16">
          {faqData.map((category) => (
            <section 
              key={category.id} 
              id={category.id} 
              className="scroll-mt-24 border-b border-slate-100 pb-12 last:border-none"
            >
              {/* Category Header Profile Frame */}
              <div className="flex items-start gap-4 mb-8">
                {/* <div className="w-10 h-10 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-center shadow-sm text-[#010048] shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#010048]" />
                </div> */}
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-wide text-[#010048]">
                    {category.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-light">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Accordion List mapping frame Container */}
              <div className="flex flex-col divide-y divide-slate-100">
                {category.faqs.map((faq) => {
                  const isOpen = !!openFaqs[faq.id];
                  return (
                    <div key={faq.id} className="py-2 first:pt-0 last:pb-0 group">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between text-left outline-none transition-colors duration-200"
                      >
                        <span className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                          isOpen ? "text-[#010048] font-semibold" : "text-slate-700 group-hover:text-[#010048]"
                        }`}>
                          {faq.question}
                        </span>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ml-4 ${
                          isOpen ? "border-[#010048] bg-blue-50 text-[#010048]" : "border-slate-200 text-slate-400 group-hover:border-slate-400 group-hover:text-slate-600"
                        }`}>
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </button>

                      {/* Smooth Collapsible Content Drawer Transition framework */}
                      <div className={`grid transition-all duration-300 ease-in-out text-sm font-light leading-relaxed text-slate-600 overflow-hidden ${
                        isOpen ? "grid-rows-[1fr] opacity-100 mt-2 pb-2" : "grid-rows-[0fr] opacity-0"
                      }`}>
                        <div className="overflow-hidden bg-slate-50/70 rounded-xl px-4 py-3 border border-slate-100 text-slate-600">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
        
      </div>
    </div>
  );
}