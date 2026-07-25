"use client";

import { useState } from "react";
import { newLaunchPageData } from "./newLaunchData";
import NewLaunchSectionHeading from "./NewLaunchSectionHeading";
import Link from "next/link";

export default function NewLaunchCTA() {
  const { cta } = newLaunchPageData;

  return (
    <section
      id={cta.sectionId}
      className="relative w-full bg-[#010048] text-white py-20 px-6 md:px-12 overflow-hidden border-t border-white/5"
    >
      <div
        className="absolute inset-0 opacity-[0.07] bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url('${cta.backgroundImage}')` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(114,92,255,0.12),transparent_50%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="bg-white/[0.04] border border-cyan-400/20 rounded-[22px] p-8 md:p-12 text-center backdrop-blur-[20px] shadow-[0_20px_80px_rgba(0,212,255,0.2)]">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-cyan-400" />
            <p className="text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase">{cta.section.kicker}</p>
            <div className="w-6 h-[1px] bg-cyan-400" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] mb-4 text-white">
            {cta.section.title}{" "}
            <span className="font-serif font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#00F5C8]">
              {cta.section.titleAccent}
            </span>
          </h2>

          <p className="text-sm text-white/60 font-medium leading-relaxed max-w-lg mx-auto mb-8">{cta.section.description}</p>

          <Link
            href={"/contact-us"}
            className="new-launch-btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300 active:scale-95 mb-8 text-center justify-center"
          >
            {cta.form.submitLabel}
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {cta.trustItems.map((item) => (
              <span key={item} className="text-[10px] tracking-wider uppercase text-white/40 font-bold flex items-center gap-1">
                <span className="text-[#00F5C8]">✓</span> {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
