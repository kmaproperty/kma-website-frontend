import React from "react";

export default function ChannelPartnerSupport({navigate}) {
  const supportTimeline = [
    {
      num: "01",
      title: "Listing Assistance",
      desc: "Complete support for uploading and managing verified property listings in Gurgaon. Your properties presented professionally for maximum buyer trust.",
    },
    {
      num: "02",
      title: "Property Verification",
      desc: "Ensure high-quality, trusted, and verified property listings that convert better. Buyers choose verified listings — so we make sure yours qualify.",
    },
    {
      num: "03",
      title: "Marketing Resources",
      desc: "Professional creatives, brochures, and promotional materials for better lead generation — updated regularly and provided at zero cost to you.",
    },
    {
      num: "04",
      title: "Visibility Enhancement",
      desc: "Tools and strategies to improve your property reach and online exposure. Get seen by the right buyers at the right time across KMA's platform.",
    },
    {
      num: "05",
      title: "Partner Support Team",
      desc: "Dedicated assistance for account management, listings, and platform queries. A real team behind you whenever you need help.",
    },
    {
      num: "06",
      title: "Field Team & Backend Support",
      desc: "On-ground field support and backend coordination for smooth site visits and deal execution — so every client experience reflects your best work.",
    },
  ];

  const portalResources = [
    { icon: "📄", title: "Project Brochures & Floor Plans", action: "DOWNLOAD →" },
    { icon: "🛡️", title: "Property Verification Checklist", action: "ACCESS →" },
    { icon: "🎨", title: "Marketing Creative Kit", action: "DOWNLOAD →" },
    { icon: "📅", title: "Site Visit Scheduler", action: "BOOK →" },
    { icon: "💬", title: "WhatsApp Campaign Kit", action: "DOWNLOAD →" },
    { icon: "📈", title: "Visibility Enhancement Tools", action: "OPEN →" },
  ];

  return (
    <section className="relative w-full bg-white text-[#010048] py-20 px-6 md:px-12 overflow-hidden border-t border-gray-100">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-50/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-20 relative z-10">
        
        <div className="flex flex-col space-y-12">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1px] bg-blue" />
              <p className="text-[11px] font-bold tracking-[0.25em] text-blue uppercase">SUPPORT & RESOURCES</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-[#010048]">
              Close deals faster with <br />
              <span className="font-serif font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-blue to-blue">
                complete backing
              </span>
            </h2>
          </div>

          <div className="flex flex-col w-full">
            {supportTimeline.map((item, idx) => (
              <div
                key={idx}
                className="relative w-full pt-8 pb-8 pl-4 md:pl-6 border-b border-gray-100 flex gap-6 md:gap-8 items-start group cursor-pointer
                           before:absolute before:left-0 before:top-8 before:bottom-8 before:w-[2px] 
                           before:bg-gradient-to-b before:from-blue before:to-blue-500 
                           before:rounded-full before:scale-y-0 before:origin-top 
                           before:transition-transform before:duration-300 before:ease-out 
                           hover:before:scale-y-100"
              >
                <div className="text-4xl font-black text-gray-200/60 group-hover:text-blue-600/10 first:text-blue transition-colors duration-300 shrink-0 select-none">
                  {item.num}
                </div>

                <div className="space-y-2 text-left">
                  <h3 className="text-base font-extrabold tracking-wide text-[#010048]/40 group-hover:text-[#010048] first:text-[#010048] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed max-w-xl group-hover:text-gray-700 first:text-gray-700 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-xl bg-gray-50/60 border border-gray-200/60 rounded-[24px] p-6 md:p-8 backdrop-blur-md flex flex-col space-y-6 shadow-[0_15px_40px_rgba(1,0,72,0.04)]">
            
            <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
              <h4 className="text-sm font-bold tracking-wide text-[#010048]">CP Resource Portal</h4>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full absolute" />
                <p className="text-[10px] font-black tracking-widest text-green-600 uppercase pl-1">LIVE NOW</p>
              </div>
            </div>

            <div className="flex flex-col space-y-2.5">
              {portalResources.map((resource, i) => (
                <div
                  key={i}
                  className="w-full p-4 rounded-xl bg-white border border-gray-100 flex items-center justify-between gap-4 transition-all duration-300 cursor-pointer group hover:bg-gray-50 hover:border-gray-300/80 shadow-sm"
                >
                  <div className="flex items-center gap-4 text-left">
                    {/* Micro Icon Wrapping Box */}
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-sm shrink-0 group-hover:bg-[#010048] group-hover:text-white transition-all duration-300">
                      {resource.icon}
                    </div>
                    <p className="text-xs md:text-sm font-bold text-gray-700 group-hover:text-[#010048] transition-colors">
                      {resource.title}
                    </p>
                  </div>

                  <span className="text-[10px] md:text-xs font-black tracking-wider text-blue-600 group-hover:text-blue-700 transition-colors shrink-0">
                    {resource.action}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button onClick={navigate} className="w-full md:w-auto px-6 py-4 bg-gradient-to-r from-[#010048] to-blue-900 hover:from-blue-900 hover:to-[#010048] text-white font-bold text-xs tracking-widest text-center uppercase rounded-full shadow-[0_4px_25px_rgba(1,0,72,0.15)] transition-all duration-300 transform active:scale-[0.99] cursor-pointer">
                REGISTER AS CP TO ACCESS →
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}