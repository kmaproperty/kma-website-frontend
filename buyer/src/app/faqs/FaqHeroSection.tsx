"use client"

import React, { useState } from "react";
import { Search } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
}

export default function FaqHeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const stats: StatItem[] = [
    { value: "65+", label: "QUESTIONS ANSWERED" },
    { value: "11", label: "CATEGORIES COVERED" },
    { value: "100%", label: "RERA-COMPLIANT GUIDANCE" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative w-full min-h-[650px] flex flex-col items-center justify-center bg-gradient-to-b from-[#01002d] via-[#02013b] to-[#010028] text-white px-4 py-16 overflow-hidden select-none rounded-b-[60px]">
      
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center pt-15">
        
        {/* Top Mini-Badge Tagline */}
        <div className="hidden md:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <p className="text-xs font-semibold tracking-[0.25em] text-cyan-400 uppercase">
            EVERYTHING YOU NEED TO KNOW BEFORE YOU BUY
          </p>
        </div>

        {/* Main Serif & Script Typography Heading */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tighter mt-5">
          Real Estate FAQs,
          <span className="block italic font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 leading-tight">
            Answered by Experts
          </span>
        </h1>

        {/* Subtitle Body Description */}
        <p className="mt-6 text-sm sm:text-base text-slate-400/90 font-light leading-tight max-w-2xl">
          From RERA verification and home loans to possession, registration, and NRI
          buying — every question Gurgaon property buyers ask us, answered clearly
          by the <span className="text-slate-200 font-medium">KMA Global Property</span> advisory team.
        </p>

        <form 
          onSubmit={handleSearchSubmit}
          className="mt-10 w-full max-w-2xl relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center bg-[#07063f]/60 backdrop-blur-md border border-slate-700/60 group-focus-within:border-cyan-500/60 rounded-full px-6 py-4 shadow-2xl transition-all duration-300">
            <Search className="w-5 h-5 text-slate-400 mr-3 group-focus-within:text-cyan-400 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search a question — e.g. "home loan", "RERA", "NRI", "possession"...'
              className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base outline-none font-light"
            />
          </div>
        </form>

        <div className="mt-14 w-full max-w-3xl bg-[#090747]/40 backdrop-blur-md border border-slate-800/60 rounded-2xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800/60 shadow-xl overflow-hidden">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center justify-center p-6 text-center group hover:bg-[#0c0957]/40 transition-colors duration-300"
            >
              <h3 className="font-serif text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-cyan-400 font-bold tracking-tight">
                {stat.value}
              </h3>
              <p className="mt-2 text-[10px] tracking-[0.15em] text-slate-500 group-hover:text-slate-400 font-bold transition-colors uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}