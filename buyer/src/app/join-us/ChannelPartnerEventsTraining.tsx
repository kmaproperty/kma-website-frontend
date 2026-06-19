import React from "react";

export default function ChannelPartnerEventsTraining() {
  const eventsList = [
    {
      tag: "NETWORKING",
      tagColor: "text-blue-700 bg-blue-50 border-blue-100",
      icon: "🤝",
      title: "Broker Networking Events in Gurgaon",
      desc: "Connect with fellow real estate professionals, collaborate on deals, and explore new business opportunities in Gurugram's growing property market. Build a network that works for you.",
      action: "REGISTER FREE →",
      isActiveDefault: false,
    },
    {
      tag: "WORKSHOP",
      tagColor: "text-amber-700 bg-amber-50 border-amber-100",
      icon: "📢",
      title: "Real Estate Marketing Workshops",
      desc: "Learn practical strategies to promote properties, generate quality leads, and grow your real estate business effectively in Gurgaon's competitive market. Hands-on, results-focused sessions.",
      action: "RESERVE SEAT →",
      isActiveDefault: false,
    },
    {
      tag: "TRAINING",
      tagColor: "text-purple-700 bg-purple-50 border-purple-100",
      icon: "🎓",
      title: "Channel Partner Training Sessions",
      desc: "Structured learning to improve your sales skills, product knowledge, and closing techniques. Build the expertise that converts more inquiries into confirmed deals.",
      action: "ENROLL NOW →",
      isActiveDefault: false,
    },
    {
      tag: "MARKET INSIGHTS",
      tagColor: "text-teal-700 bg-teal-50 border-teal-100",
      icon: "📊",
      title: "Market Trend & Investment Discussions",
      desc: "Stay updated with the latest real estate trends, pricing insights, and smart investment opportunities in Gurgaon. Know the market better than your competition.",
      action: "JOIN SESSION →",
      isActiveDefault: false,
    },
    {
      tag: "PROJECT LAUNCH",
      tagColor: "text-cyan-700 bg-cyan-50 border-cyan-100",
      icon: "🏢",
      title: "New Project Launch Updates",
      desc: "Stay informed about the latest property launches, pricing, and investment opportunities in Gurgaon and Delhi NCR. Get exclusive CP access before public announcements.",
      action: "GET UPDATES →",
      isActiveDefault: false,
    },
    {
      tag: "GROWTH",
      tagColor: "text-rose-700 bg-rose-50 border-rose-100",
      icon: "🚀",
      title: "Growth Strategy Sessions for Brokers",
      desc: "Learn proven techniques to scale your real estate business, improve conversions, and increase overall sales performance in Gurgaon's dynamic property market.",
      action: "BOOK SLOT →",
      isActiveDefault: false,
    },
  ];

  return (
    <section className="relative w-full bg-white text-[#010048] py-20 px-6 md:px-12 overflow-hidden border-t border-gray-100">
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-50/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-end">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1px] bg-blue" />
              <p className="text-[11px] font-bold tracking-[0.25em] text-blue uppercase">EVENTS & TRAINING</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-[#010048]">
              Stay <span className="font-serif font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-blue to-blue">ahead</span> in Gurgaon&apos;s <br />
              real estate market
            </h2>
          </div>
          
          <div className="text-left">
            <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed max-w-sm lg:ml-auto">
              Exclusive CP events, training sessions, and market updates — free for all registered KMA partners in Gurugram.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsList.map((item, idx) => (
            <div
              key={idx}
              className={`relative p-8 rounded-[24px] bg-blue border transition-all duration-300 flex flex-col justify-between text-left group cursor-pointer overflow-hidden
                         ${item.isActiveDefault 
                           ? "border-blue-500/40 bg-white shadow-[0_15px_45px_rgba(1,0,72,0.06)]" 
                           : "border-gray-100 hover:border-blue-500/30 hover:bg-white hover:shadow-[0_15px_45px_rgba(1,0,72,0.06)]"
                         }`}
            >
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-50 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {item.isActiveDefault && <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-50 rounded-full blur-3xl pointer-events-none opacity-100" />}

              <div className="space-y-6 relative z-10">
                <div className={`inline-block px-3 py-1 rounded-full border text-[9px] font-black tracking-widest ${item.tagColor}`}>
                  {item.tag}
                </div>

                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-3xl shrink-0">
                  {item.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-base md:text-lg font-extrabold tracking-wide text-[#ffffff] transition-colors duration-300 group-hover:text-blue">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed tracking-wide">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <span className={`text-[10px] md:text-xs font-black tracking-widest transition-colors duration-300
                                 ${item.isActiveDefault 
                                   ? "text-blue" 
                                   : "text-white group-hover:text-blue-800"
                                 }`}>
                  {item.action}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}