import * as React from "react";
import { useState } from "react";
import { ArrowRight, ChevronDown, Award } from "lucide-react";

export default function EarningsCalculator({handleReferNow}) {
  const [referrals, setReferrals] = useState<number>(1);
  const [referralType, setReferralType] = useState<string>("rent");
  const [partnerTier, setPartnerTier] = useState<string>("bronze");

  const BRONZE_RENT = 5000;
  const BRONZE_SALE = 15000;

  const tierMultipliers: Record<string, number> = {
    bronze: 1.0,
    silver: 1.1,  
    gold: 1.25,   
    platinum: 1.5,
  };

  const absoluteBaseAmount = referralType === "sale" ? BRONZE_SALE : BRONZE_RENT;
  const currentMultiplier = tierMultipliers[partnerTier] || 1.0;
  
  const perReferralAmount = absoluteBaseAmount * currentMultiplier;
  
  const monthlyEarnings = referrals * perReferralAmount;
  const annualPotential = monthlyEarnings * 12;
  const baseCommission = referrals * absoluteBaseAmount;
  const tierBonus = monthlyEarnings - baseCommission;

  return (
    <div className="w-full pt-10 py-0 md:py-20 antialiased text-[#010048]">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center space-y-3 mb-16">
            <p className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-[#010048]/60 flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#010048]/30" />
            EARNINGS CALCULATOR
            <span className="w-6 h-[1px] bg-[#010048]/30" />
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-relaxed">
            How Much Will <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue via-blue-800 to-blue-400 font-serif italic"> You Make?</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-400 font-semibold max-w-lg mx-auto leading-relaxed">
            Estimate your monthly earnings based on referral volume and tier level.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-5 bg-gray-50/60 border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between space-y-8">
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black tracking-wider uppercase text-[#010048]/70">
                  Referrals Per Month
                </label>
                <span className="text-2xl font-black text-[#010048]">
                  {referrals}
                </span>
              </div>
              <div className="relative pt-2">
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={referrals}
                  onChange={(e) => setReferrals(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer outline-none transition-all 
                    [&::-webkit-slider-thumb]:w-5 
                    [&::-webkit-slider-thumb]:h-5 
                    [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:bg-[#010048] 
                    [&::-webkit-slider-thumb]:border-4 
                    [&::-webkit-slider-thumb]:border-[#00d2ff] 
                    [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(0,210,255,0.8)] 
                    [&::-webkit-slider-thumb]:appearance-none"
                  style={{
                    background: `linear-gradient(to right, #010048 0%, #010048 ${((referrals - 1) / 19) * 100}%, #e5e7eb ${((referrals - 1) / 19) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black tracking-wider uppercase text-[#010048]/70">
                Referral Type
              </label>
              <div className="relative">
                <select 
                  value={referralType}
                  onChange={(e) => setReferralType(e.target.value)}
                  className="w-full bg-white border border-gray-200/80 rounded-2xl px-5 py-4 text-sm font-bold appearance-none cursor-pointer focus:outline-none focus:border-[#010048] transition-colors"
                >
                  <option value="rent">Rent Referrals (₹5,000 fixed)</option>
                  <option value="sale">Sale Referrals (50% Commission)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#010048] absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black tracking-wider uppercase text-[#010048]/70">
                Partner Tier
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none text-[#010048]">
                  <Award className="w-4 h-4" />
                </div>
                <select 
                  value={partnerTier}
                  onChange={(e) => setPartnerTier(e.target.value)}
                  className="w-full bg-white border border-gray-200/80 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold appearance-none cursor-pointer focus:outline-none focus:border-[#010048] transition-colors"
                >
                  <option value="bronze">Bronze — Base Rate</option>
                  <option value="silver">Silver — +10% Bonus</option>
                  <option value="gold">Gold — +25% Bonus</option>
                  <option value="platinum">Platinum — +50% Bonus</option>
                </select>
                <ChevronDown className="w-4 h-4 text-[#010048] absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>

          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            <div className="w-full bg-[#010048] text-white rounded-3xl p-8 text-center flex flex-col items-center justify-center space-y-6 shadow-xl relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-500" />
              
              <div className="space-y-1">
                <p className="text-[10px] md:text-xs font-black tracking-widest uppercase text-white/60">
                  Estimated Monthly Earnings
                </p>
                <h3 className="text-4xl md:text-6xl font-black tracking-tight text-[#FFD166] transition-all duration-300">
                  ₹{monthlyEarnings.toLocaleString("en-IN")}
                </h3>
                <p className="text-[11px] text-white/60 font-semibold pt-1">
                  Based on your selections
                </p>
              </div>

              <button className="bg-white hover:bg-gray-50 text-[#010048] font-bold text-xs md:text-sm px-8 py-3.5 rounded-full shadow-md transition-all duration-300 flex items-center gap-2 group cursor-pointer active:scale-95" onClick={handleReferNow}>
                Start Earning This
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              
              <div className="bg-gray-50/60 border border-gray-100 p-5 rounded-2xl space-y-1.5 shadow-sm">
                <p className="text-[10px] font-black tracking-wider uppercase text-gray-400">
                  Annual Potential
                </p>
                <p className="text-base md:text-xl font-black text-[#010048] transition-all duration-300">
                  ₹{annualPotential.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="bg-gray-50/60 border border-gray-100 p-5 rounded-2xl space-y-1.5 shadow-sm">
                <p className="text-[10px] font-black tracking-wider uppercase text-gray-400">
                  Per Referral
                </p>
                <p className="text-base md:text-xl font-black text-[#010048] transition-all duration-300">
                  ₹{perReferralAmount.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="bg-gray-50/60 border border-gray-100 p-5 rounded-2xl space-y-1.5 shadow-sm">
                <p className="text-[10px] font-black tracking-wider uppercase text-gray-400">
                  Base Commission
                </p>
                <p className="text-base md:text-xl font-black text-[#010048] transition-all duration-300">
                  ₹{baseCommission.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="bg-gray-50/60 border border-gray-100 p-5 rounded-2xl space-y-1.5 shadow-sm">
                <p className="text-[10px] font-black tracking-wider uppercase text-gray-400">
                  Tier Bonus
                </p>
                <p className="text-base md:text-xl font-black text-green-600 transition-all duration-300">
                  {tierBonus > 0 ? `+₹${tierBonus.toLocaleString("en-IN")}` : `₹0`}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}