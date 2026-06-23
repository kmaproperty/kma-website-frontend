import * as React from "react";
import { Star, Quote } from "lucide-react";

export default function SuccessStories() {
  const stories = [
    {
      name: "Rahul Kapoor",
      role: "Gold Partner",
      location: "Delhi NCR",
      initials: "RK",
      stars: 5,
      badgeText: "Earned ₹75,000 in 3 months",
      testimonial:
        "I referred 8 contacts looking for plots in Noida. Every deal closed smoothly and my commission arrived within 2 days. KMA's team handled everything — I just shared a link.",
    },
    {
      name: "Priya Sharma",
      role: "Platinum Partner",
      location: "Mumbai",
      initials: "PS",
      stars: 5,
      badgeText: "Earned ₹1.2L in 6 months",
      testimonial:
        "As a finance professional my clients constantly ask about investments. Referring them to KMA for commercial properties has been a perfect fit — and incredibly lucrative.",
    },
  ];

  return (
    <div className="w-full py-10 md:py-5 antialiased text-[#010048]">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center space-y-3 mb-16">
          <p className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-[#010048]/60 flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#010048]/30" />
            Success Stories
            <span className="w-6 h-[1px] bg-[#010048]/30" />
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tighter">
            Real People, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue via-blue-800 to-blue-400 italic font-serif">Real Earnings</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-[#010048] text-white rounded-3xl p-6 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[340px] border border-white/5 group transition-transform duration-300 hover:-translate-y-1"
            >
              <Quote className="absolute left-6 top-6 w-16 h-16 text-white/[0.03] transform -scale-x-100 pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-1">
                  {[...Array(story.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#FFD166] fill-[#FFD166]"
                    />
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-[#FFD166] animate-pulse" />
                  <p className="text-xs md:text-sm font-bold tracking-wide text-[#FFD166]">
                    {story.badgeText}
                  </p>
                </div>

                <p className="text-sm md:text-sm text-white/80 leading-relaxed italic">
                  "{story.testimonial}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-8 border-t border-white/10 mt-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#00d2ff] text-[#010048] font-black text-sm flex items-center justify-center shadow-inner tracking-wider">
                  {story.initials}
                </div>
                
                <div className="space-y-0.5">
                  <h4 className="font-bold text-base tracking-wide text-white">
                    {story.name}
                  </h4>
                  <p className="text-xs text-white/60 font-semibold">
                    {story.role} • <span className="text-white/40">{story.location}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}