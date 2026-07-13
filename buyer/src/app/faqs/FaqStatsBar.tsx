"use client"

import React from "react";

interface StatItem {
  value: string;
  label: string;
}

export default function FaqStatsBar() {
  const stats: StatItem[] = [
    { value: "500+", label: "BUYERS GUIDED" },
    { value: "0%", label: "BROKERAGE FOR BUYERS" },
    { value: "12+", label: "RERA VERIFIED PROJECTS" },
    { value: "24 Hr", label: "ADVISOR RESPONSE TIME" },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-[#01002d] via-[#02013b] to-[#010028] text-white py-12 px-4 border-t border-b border-slate-800/60 relative overflow-hidden select-none">
      
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 100%"
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-slate-800/60">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="flex flex-col items-center justify-center text-center p-4 group hover:bg-[#0c0957]/20 transition-all duration-300 rounded-xl lg:rounded-none"
          >
            <h3 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-[length:200%_auto] group-hover:bg-right transition-all duration-700">
              {stat.value}
            </h3>
            
            <p className="mt-3 text-[10px] tracking-[0.2em] text-slate-400 font-bold group-hover:text-cyan-400 transition-colors duration-300 uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}