import React from "react";

export default function ChannelPartnerBenefits() {
  const benefitsList = [
    {
      icon: "✓",
      title: "Verified Property Listings",
      desc: "Showcase your properties to genuine buyers searching for real estate in Gurgaon and NCR. Every listing verified for trust and credibility.",
    },
    {
      icon: "⭐",
      title: "Featured Visibility",
      desc: "Get premium exposure through featured listings and higher ranking placement. Your properties seen first by the most serious buyers.",
    },
    {
      icon: "🎯",
      title: "Quality Lead Opportunities",
      desc: "Connect with serious property buyers, investors, and end-users actively searching in Gurgaon — not random inquiries but intent-driven leads.",
    },
    {
      icon: "💎",
      title: "Premium Branding",
      desc: "Build your professional identity as a trusted real estate channel partner in Gurgaon. Credibility that clients recognise and respect.",
    },
    {
      icon: "📊",
      title: "Business Expansion",
      desc: "Expand your reach across multiple Gurgaon sectors, projects, and property categories. Grow your business beyond where you are today.",
    },
  ];

  return (
    <section id="channelPartnerBenefits" className="relative w-full bg-[#010048] text-white py-20 px-6 md:px-12 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 items-end">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1px] bg-cyan-400" />
              <p className="text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase">PARTNER BENEFITS</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15]">
              More Visibility. More Leads. <br />
              <span className="font-serif font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                More Real Estate Growth.
              </span>
            </h2>
          </div>
          
          <div className="text-left">
            <p className="text-sm text-white/50 font-medium leading-relaxed max-w-sm lg:ml-auto">
              Five core advantages that set KMA channel partners apart from every other broker in Gurgaon and NCR.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 bg-white/[0.02] border border-white/[0.06] rounded-[24px] overflow-hidden backdrop-blur-sm">
          {benefitsList.map((benefit, idx) => (
            <div
              key={idx}
              className="relative p-8 flex flex-col items-start text-left space-y-6 transition-all duration-300 ease-in-out cursor-pointer group
                         bg-transparent border-r border-white/[0.06] last:border-r-0 border-b md:border-b-0
                         hover:bg-[#050454] hover:border-b-2 hover:border-b-cyan-400"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg shrink-0 shadow-inner group-hover:bg-blue-600/20 group-hover:text-cyan-300 transition-colors">
                {benefit.icon}
              </div>

              <div className="space-y-3 flex-1">
                <h3 className="text-base font-extrabold tracking-wide text-white/90 group-hover:text-white transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-xs text-white/50 group-hover:text-white/70 font-medium leading-relaxed transition-colors">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}