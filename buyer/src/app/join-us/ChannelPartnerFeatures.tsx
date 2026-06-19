import React from "react";

export default function ChannelPartnerFeatures({navigate}) {
  const featuresList = [
    {
      num: "01",
      tag: "PROJECTS",
      title: "Premium Project Access in Gurgaon",
      desc: "Get access to high-demand residential, commercial, SCO, luxury, and investment real estate opportunities across Gurugram's top sectors — all in one trusted platform.",
    },
    {
      num: "02",
      tag: "MARKETPLACE",
      title: "Verified Property Marketplace",
      desc: "List and promote verified properties in Gurgaon with trust and credibility that buyers and investors demand. Stand out from brokers offering unverified deals.",
    },
    {
      num: "03",
      tag: "MARKETING",
      title: "Marketing & Visibility Support",
      desc: "Increase your reach through featured property listings, digital marketing campaigns, and platform-wide visibility tools designed to bring serious buyers to you.",
    },
    {
      num: "04",
      tag: "GROWTH",
      title: "Broker Growth Opportunities",
      desc: "Grow from Silver Partner to Diamond Partner and unlock higher visibility, premium leads, and business expansion opportunities as your performance scales up.",
    },
    {
      num: "05",
      tag: "SUPPORT",
      title: "Dedicated Channel Partner Support",
      desc: "Get full assistance for property listings, approvals, visibility improvements, and platform support whenever you need it — a team that's fully invested in your success.",
    },
  ];

  return (
    <section className="relative w-full bg-white text-[#010048] py-20 px-6 md:px-12 overflow-hidden border-t border-gray-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-12 relative z-10">
        
        {/* LEFT STICKY COLUMN */}
        <div className="flex flex-col items-start space-y-6 lg:sticky lg:top-28 lg:self-start max-w-md">
          <div className="flex items-center gap-3">
            <div className="w-6 h-[1px] bg-[#010048]/30" />
            <p className="text-[11px] font-bold tracking-[0.25em] text-[#010048]/60 uppercase">WHY KMA</p>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-[#010048]">
            Built for your <br />
            <span className="font-serif font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-blue to-blue">
              real estate
            </span>{" "}
            <br />
            <span className="font-serif font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-blue to-blue">
              success
            </span>{" "}
            in Gurgaon
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            Everything at KMA is designed to make you more visible, more credible,
            and more profitable in Gurugram&apos;s competitive property market.
          </p>

          <button onClick={navigate} className="mt-4 px-8 py-3 bg-gradient-to-r from-[#010048] to-blue-900 hover:from-blue-900 hover:to-[#010048] text-white rounded-full font-semibold text-xs tracking-wider shadow-[0_4px_20px_rgba(1,0,72,0.15)] transition-all duration-300 active:scale-95 flex items-center gap-2 group cursor-pointer">
            JOIN THE NETWORK
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* RIGHT COLUMN: Feature Rows Layout */}
        <div className="flex flex-col w-full">
          {featuresList.map((feature, idx) => (
            <div key={idx}
              className="relative w-full pt-8 pb-10 pl-4 md:pl-6 border-b border-gray-100 flex gap-6 md:gap-12 items-start group
                         before:absolute before:left-0 before:top-8 before:bottom-10 before:w-[3px] 
                         before:bg-gradient-to-b before:from-blue before:to-blue-500 
                         before:rounded-full before:scale-y-0 before:origin-bottom 
                         before:transition-transform before:duration-300 before:ease-out 
                         hover:before:scale-y-100"
            >
              <div className="text-4xl md:text-6xl font-black text-blue select-none tracking-tighter shrink-0 transition-colors duration-300 group-hover:text-blue-600/10">
                {feature.num}
              </div>

              {/* Core Content Segment */}
              <div className="flex-1 space-y-3 text-left">
                <div className="inline-block px-3 py-0.5 rounded bg-gray-50 border border-gray-200/60 text-[9px] font-black tracking-widest text-blue uppercase">
                  {feature.tag}
                </div>

                <h3 className="text-lg md:text-xl font-extrabold tracking-wide text-[#010048] group-hover:text-blue-600 transition-colors duration-300 leading-[120%]">
                  {feature.title}
                </h3>

                <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed max-w-2xl">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}