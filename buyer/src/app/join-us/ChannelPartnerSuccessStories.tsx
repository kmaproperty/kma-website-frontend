import React from "react";

export default function ChannelPartnerSuccessStories({navigate}) {
  const stories = [
    {
      initials: "IT",
      name: "Inderlok Thakur",
      role: "RESIDENTIAL PROPERTY CONSULTANT · GURGAON",
      badges: [
        { icon: "✦", text: "VERIFIED CP" },
        { icon: "📍", text: "GURGAON NCR" },
        { icon: "🏠", text: "RESIDENTIAL" },
      ],
      testimonial:
        '"Starting with a small client base, joining KMA Global Property transformed my reach in Gurgaon real estate. With verified listings and increased visibility, I successfully connected with more buyers and investors than I ever could alone."',
      isActiveDefault: false,
    },
    {
      initials: "SC",
      name: "Sahil Chopra",
      role: "REAL ESTATE GROWTH PARTNER · DELHI NCR",
      badges: [
        { icon: "✦", text: "ACTIVE CP" },
        { icon: "📍", text: "DELHI NCR" },
        { icon: "🏢", text: "MULTI-SECTOR" },
      ],
      testimonial:
        '"I began my journey seeking better exposure in Gurgaon real estate. After becoming a KMA Channel Partner, I leveraged their marketing support and platform visibility to generate quality leads and grow my business consistently."',
      isActiveDefault: false,
    },
  ];

  return (
    <section className="relative w-full bg-[#010048] text-white py-20 px-6 md:px-12 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-end">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1px] bg-cyan-400" />
              <p className="text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase">SUCCESS STORIES</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15]">
              Meet our{" "}
              <span className="font-serif font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-white">
                successful partners
              </span>
            </h2>
          </div>
          <div className="text-left">
            <p className="text-xs md:text-sm text-white/50 font-medium leading-relaxed max-w-sm lg:ml-auto">
              Real brokers. Real results. Real careers built on the KMA platform in Gurgaon.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {stories.map((partner, idx) => (
            <div
              key={idx}
              className={`relative p-8 rounded-[24px] bg-white/[0.01] border transition-all duration-300 flex flex-col justify-between text-left group cursor-pointer
                         ${partner.isActiveDefault 
                           ? "border-cyan-500/40 shadow-[0_15px_40px_rgba(6,182,212,0.06)] bg-white/[0.02]" 
                           : "border-white/[0.06] hover:border-cyan-500/40 hover:shadow-[0_15px_40px_rgba(6,182,212,0.06)] hover:bg-white/[0.02]"
                         }`}
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-sm font-black tracking-wider text-white shadow-md">
                  {partner.initials}
                </div>

                <div className="mt-6 space-y-1">
                  <h3 className="text-md font-extrabold tracking-wide text-white">{partner.name}</h3>
                  <p className="text-[10px] font-semibold tracking-widest text-cyan-400/80 uppercase">{partner.role}</p>
                </div>

                <div className="grid grid-cols-3 bg-white/[0.02] border border-white/[0.04] rounded-xl p-3 my-6 text-center divide-x divide-white/[0.06]">
                  {partner.badges.map((b, bIdx) => (
                    <div key={bIdx} className="flex flex-col items-center justify-center px-1">
                      <span className="text-xs filter drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">{b.icon}</span>
                      <span className="text-[8px] font-black tracking-wider text-white/40 uppercase mt-1.5">{b.text}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-white/60 font-medium italic leading-relaxed tracking-wide">
                  {partner.testimonial}
                </p>
              </div>
            </div>
          ))}

          <div className="relative p-8 rounded-[24px] bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.06] flex flex-col justify-between text-left group hover:border-blue-500/30 transition-all duration-300">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 flex items-center justify-center text-lg font-black text-[#010048] shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                +
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold tracking-wide text-white">Your Story Starts Here</h3>
                <p className="text-[10px] font-semibold tracking-widest text-cyan-400/80 uppercase">FUTURE KMA CHANNEL PARTNER · GURGAON</p>
              </div>

              <p className="text-xs text-white/50 font-medium leading-relaxed">
                Join hundreds of real estate professionals who&apos;ve grown their business with KMA&apos;s verified listings, marketing support, and dedicated partner network in Gurgaon.
              </p>
            </div>

            <div className="pt-8">
              <button onClick={navigate} className="px-8 py-3.5 bg-blue-700/50 hover:bg-blue-600 rounded-full font-bold text-xs tracking-widest uppercase text-white shadow-[0_4px_15px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] border border-white/10 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center cursor-pointer">
                APPLY NOW 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}