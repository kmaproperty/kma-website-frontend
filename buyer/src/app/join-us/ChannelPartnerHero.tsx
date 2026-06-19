import React from "react";

export default function ChannelPartnerHero({navigate}) {
  return (
    <section className="relative w-full min-h-screen rounded-b-[40px] md:rounded-b-[64px] bg-[#010048] text-white flex items-center overflow-hidden px-4 py-20 md:py-30">
      {/* Dynamic Background Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(114,92,255,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,198,251,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Main Typography & CTA */}
        <div className="flex flex-col space-y-6 md:space-y-8 text-center md:text-left max-w-xl">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              BECOME A <br />
              <span className="font-serif font-normal italic tracking-wide block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-white/90">
                KMA Channel
              </span>
              <span className="font-serif font-normal italic tracking-wide block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-white/90">Partner</span>
            </h1>
          </div>

          <p className="text-sm md:text-base text-white/70 leading-relaxed font-medium">
            Join Gurugram&apos;s fastest–growing real estate channel partner
            network. Get access to verified listings, premium projects, marketing
            support, and a powerful platform built to grow your real estate
            business in Delhi NCR.
          </p>

          {/* Action CTAs Buttons */}
          <div className="flex flex-col md:flex-row flex-wrap items-center gap-4 pt-2">
            <button onClick={navigate} className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full font-semibold text-sm shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all duration-300 active:scale-95 flex items-center gap-2 group cursor-pointer">
              APPLY AS CP
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
            
            <button onClick={() => {
    const element = document.getElementById("channelPartnerBenefits");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }} className="px-8 py-3.5 border border-white/20 hover:border-white/40 hover:bg-white/5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer">
              EXPLORE BENEFITS
              <span className="text-xs">↓</span>
            </button>
          </div>

          {/* Bottom Statistics Panel Grid Layout */}
          <div className="grid grid-cols-3 gap-4 pt-10 md:pt-14 border-t border-white/10">
            <div>
              <p className="text-2xl md:text-3xl font-extrabold tracking-tight">350+</p>
              <p className="text-xs text-white/50 font-medium mt-1 uppercase tracking-wider">Active Societies</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold tracking-tight">100+</p>
              <p className="text-xs text-white/50 font-medium mt-1 uppercase tracking-wider">Ready to move</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold tracking-tight">20+</p>
              <p className="text-xs text-white/50 font-medium mt-1 uppercase tracking-wider">Premium Projects</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Badges & Features Cards */}
        <div className="w-full flex flex-col items-center lg:items-end space-y-4">
          
          {/* #1 CP Network Floating Seal */}
          <div className="w-full max-w-[360px] flex justify-center lg:justify-center mb-4 pr-0 lg:pr-8">
            <div className="relative w-35 h-35 flex flex-col items-center justify-center rounded-full border border-white bg-[#010048]/40 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              <p className="text-2xl font-black tracking-tighter text-blue-400">#1</p>
              <p className="text-[9px] font-bold text-white/40 tracking-widest text-center mt-0.5 uppercase">
                CP Network<br/>Gurgaon 2025
              </p>
            </div>
          </div>

          {/* Feature List Glassmorphism Stack Cards */}
          <div className="w-full max-w-sm flex flex-col space-y-3.5">
            {[
              {
                title: "Residential & Commercial",
                desc: "SCO, Luxury & Investment",
                icon: "🏢",
              },
              {
                title: "Verified Property Listings",
                desc: "Trust & credibility guaranteed",
                icon: "✓",
              },
              {
                title: "Silver to Diamond Growth",
                desc: "Unlock higher tiers & leads",
                icon: "📈",
              },
              {
                title: "Dedicated CP Support",
                desc: "Listings, approvals & visibility",
                icon: "🎯",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] shadow-sm hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
              >
                {/* Custom Styled Icon Box wrapper matching template design */}
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm shrink-0 shadow-inner">
                  {feature.icon}
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-sm font-bold tracking-wide text-white">{feature.title}</h4>
                  <p className="text-xs text-white/40 font-medium mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={navigate} className="px-6 py-3.5 bg-gradient-to-r from-blue to-blue font-bold text-xs tracking-wider text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2">
          JOIN AS CP →
        </button>
      </div>
    </section>
  );
}