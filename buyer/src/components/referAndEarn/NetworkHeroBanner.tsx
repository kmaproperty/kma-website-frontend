import * as React from "react";
import { ArrowRight, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NetworkHeroBanner({handleReferNow}) {
    const router = useRouter()
  return (
    <div className="w-full bg-[#010048] relative overflow-hidden py-20 px-10 md:px-0 text-center flex flex-col items-center justify-center antialiased">
      
      <div className="absolute -left-20 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-20 bottom-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10 flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-inner animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <p className="text-[10px] md:text-xs font-black tracking-widest uppercase text-white/90">
            500+ Active Referral Partners Live Now
          </p>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1] max-w-3xl">
          Your Network Is <br className="hidden sm:inline" />
          <span className="italic text-[#FFD166] block sm:inline sm:ml-2">
            Your Net Worth
          </span>
        </h1>

        <p className="text-sm md:text-base text-white/70 font-semibold max-w-xl mx-auto leading-relaxed">
          Join India's most rewarding property referral program. No investment, no experience required — just your network and a link.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
          
          <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-[#00d2ff] hover:from-blue-700 hover:to-cyan-400 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-95" onClick={handleReferNow}>
            Join the Program Today
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button onClick={()=>router.push("/")} className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-sm px-8 py-4 rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-95">
            <Globe className="w-4 h-4 text-white/70 transition-transform duration-500 group-hover:rotate-12" />
            Visit KMA Website
          </button>

        </div>

      </div>
    </div>
  );
}