import * as React from "react";
import { CheckCircle2, ArrowRight, Share2, ShieldCheck, Coins, AlertCircle } from "lucide-react";

export default function RewardTermsAndWorkflow({handleReferNow}) {
  return (
    <div className="w-full antialiased text-[#010048]">
        <div className="text-center space-y-3 mb-16">
            <p className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-[#010048]/60 flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#010048]/30" />
            PROGRAM DETAILS
            <span className="w-6 h-[1px] bg-[#010048]/30" />
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-relaxed">
            Everything You Need <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue via-blue-800 to-blue-400 italic font-serif"> to Get Started</span>
          </h2>
        </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-7 bg-blue border border-blue rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between min-h-[600px] transition-all duration-300 hover:shadow-md">
          <div>
            <div className="w-full bg-[#FFD166]/7 border border-[#FFD166]/10 rounded-xl p-4 flex items-center gap-3 mb-8">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFD166] animate-pulse shrink-0" />
              <p className="text-sm font-bold tracking-wide uppercase text-[#FFD166] ">
                Reward Rate: <span className="text-[#FFD166] font-black ml-1">1 coin = ₹1,000</span>
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6 relative inline-block text-white">
              Terms & Conditions
              {/* <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#ffffff] rounded-full" /> */}
            </h2>

            {/* Bullet List Points Container */}
            <ul className="space-y-4 md:space-y-5 text-sm md:text-sm text-[#ffffff]/80">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#ffffff] shrink-0 mt-0.5" />
                <span>Each successful referral gives you reward coins.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#ffffff] shrink-0 mt-0.5" />
                <span>1 coin = ₹1,000.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#ffffff] shrink-0 mt-0.5" />
                <span>
                  1 rent referral gives you{" "}
                  <span className=" text-[#FFD166] px-2 py-0.5 rounded-md font-bold mx-1 text-xs md:text-sm">
                    5 coins = ₹5,000 fixed
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#ffffff] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  1 Sale referral: deal successful gives you 50% — applicable GST and TDS will be deducted as per prevailing Government regulation before payout.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#ffffff] shrink-0 mt-0.5" />
                <span>Referral details must be genuine and reachable.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#ffffff] shrink-0 mt-0.5" />
                <span>KMA team verification is required before reward settlement.</span>
              </li>
            </ul>
          </div>

          {/* Premium Call to Action Button */}
          <button onClick={handleReferNow} className="mt-8 w-full sm:w-auto self-start bg-[#ffffff] hover:bg-blue-800 hover:text-white text-blue font-bold text-sm px-8 py-4 rounded-full shadow-lg shadow-[#010048]/10 hover:shadow-[#010048]/20 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.98]">
            Give a Referral
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="lg:col-span-5 bg-[#010048] text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between min-h-[600px]">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8 relative inline-block">
              How It Works
            </h2>

            <div className="space-y-6 relative border-l border-white/10 ml-3.5 pl-6">
              
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-[39px] top-0 w-7 h-7 bg-white text-[#010048] rounded-full flex items-center justify-center text-xs font-black shadow-md border-4 border-[#010048]">
                  1
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base flex items-center gap-2">
                     Share Referral
                  </h3>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                    Submit your details and the client you are referring. Share via WhatsApp, Instagram, LinkedIn, or anywhere your network lives.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-[39px] top-0 w-7 h-7 bg-white text-[#010048] rounded-full flex items-center justify-center text-xs font-black shadow-md border-4 border-[#010048]">
                  2
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base flex items-center gap-2">
                     KMA Verification
                  </h3>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                    Our team verifies the enquiry and intent. KMA's expert consultants handle everything from consultation to site tours.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-[39px] top-0 w-7 h-7 bg-white text-[#010048] rounded-full flex items-center justify-center text-xs font-black shadow-md border-4 border-[#010048]">
                  3
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base flex items-center gap-2">
                     Earn Coins
                  </h3>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                    Coins are credited when the deal is marked closed. Commission arrives within 7 business days — no delays, no paperwork.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Important Warning Note Section Footnote */}
          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-white/90 shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1">
              <p className="text-[11px] font-black uppercase tracking-wider text-white/90">
                Important Note
              </p>
              <p className="text-xs text-white/70 leading-normal font-semibold">
                Submit the referral <span className="text-blue-200 font-bold">before the deal closes</span>. Claims made after the deal will not be accepted.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}