"use client"

import React from "react";
import Link from "next/link";
import { PhoneCall, Check } from "lucide-react";

export default function ContactExpertCta() {
  const checkmarks = [
    "ZERO BROKERAGE FOR BUYERS",
    "RERA VERIFIED ANSWERS",
    "24 HR RESPONSE",
    "SITE VISIT ARRANGED",
  ];

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8 select-none">
      <div className="max-w-5xl mx-auto">
        <div className="w-full bg-[#010048] text-white rounded-3xl p-8 md:p-14 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
          
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex items-center gap-3 mb-6">
            <span className="w-4 h-[1px] bg-cyan-400" />
            <p className="text-xs font-bold tracking-[0.25em] text-cyan-400 uppercase">
              STILL HAVE QUESTIONS?
            </p>
            <span className="w-4 h-[1px] bg-cyan-400" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight max-w-3xl">
            Talk To A <span className="italic font-serif font-normal tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Property Expert</span>, Not A Call Centre
          </h2>

          <p className="mt-6 text-sm md:text-base text-slate-300/90 font-light leading-relaxed max-w-2xl">
            Didn't find your answer above? Share your question and our Gurgaon real estate 
            advisors will get back to you within 24 hours — zero pressure, zero brokerage for buyers.
          </p>

          <div className="mt-10 mb-12">
            <Link 
              href="/contact-us"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full shadow-[0_4px_20px_rgba(6,182,212,0.35)] hover:shadow-[0_6px_25px_rgba(6,182,212,0.5)] active:scale-[0.98] transition-all duration-300 uppercase group"
            >
              <PhoneCall className="w-4 h-4 group-hover:animate-bounce shrink-0" />
              <span>Ask Our Experts</span>
            </Link>
          </div>

          <div className="w-full border-t border-slate-700/60 pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2">
            {checkmarks.map((text, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center gap-2 group"
              >
                <Check className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-125 transition-transform" />
                <span className="text-[10px] tracking-wider text-slate-300 font-bold text-nowrap">
                  {text}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}