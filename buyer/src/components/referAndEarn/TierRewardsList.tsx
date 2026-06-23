import * as React from "react";
import { Award, Diamond, Check, Flame, Star } from "lucide-react";

export default function TierRewardsList() {
  const tiers = [
    {
      name: "Bronze",
      badge: "Base",
      range: "1 – 4 referrals / month",
      bonus: "",
      icon: <Award className="w-6 h-6 text-orange-800" />,
      features: [
        "Standard commission rate",
        "₹5,000 flat per referral",
        "7-day payout processing",
        "Personal dashboard access",
      ],
      isPopular: false,
    },
    {
      name: "Silver",
      badge: "+10%",
      range: "5 – 9 referrals / month",
      bonus: "10% bonus on all commissions",
      icon: <Award className="w-6 h-6 text-gray-400" />,
      features: [
        "10% bonus on all commissions",
        "Priority support channel",
        "5-day payout processing",
        "Monthly earnings report",
      ],
      isPopular: false,
    },
    {
      name: "Gold",
      badge: "+25%",
      range: "10 – 19 referrals / month",
      bonus: "25% bonus on all commissions",
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      features: [
        "25% bonus on all commissions",
        "Dedicated account manager",
        "3-day payout processing",
        "Exclusive project previews",
      ],
      isPopular: true,
    },
    {
      name: "Platinum",
      badge: "+50%",
      range: "20+ referrals / month",
      bonus: "50% bonus on commissions",
      icon: <Diamond className="w-6 h-6 text-cyan-400" />,
      features: [
        "50% bonus on commissions",
        "Co-marketing support",
        "1-day payout processing",
        "VIP events & property launches",
      ],
      isPopular: false,
    },
  ];

  return (
    <div className="w-full py-10 antialiased text-[#010048] mt-10 md:mt-0">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center space-y-3 mb-10 md:mb-16">
            <p className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-[#010048]/60 flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#010048]/30" />
            Partner Tiers
            <span className="w-6 h-[1px] bg-[#010048]/30" />
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tighter">
            Grow Your Rank, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue via-blue-800 to-blue-400 italic font-serif">Grow Your Rewards</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-400 font-semibold max-w-xl mx-auto leading-relaxed">
            The more you refer, the higher you climb — and the better your earnings become.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg border
                ${tier.isPopular 
                  ? "bg-gradient-to-r from-blue via-blue-800 to-blue-400 border-2 border-[#FFD166] shadow-md scale-[1.02] lg:scale-105 z-10" 
                  : "bg-blue border-gray-200"
                }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#010048] text-white text-[10px] font-black uppercase tracking-widest px-2 py-1.5 rounded-full flex items-center gap-1 shadow-sm whitespace-nowrap">
                  <Star className="w-3 h-3 text-[#FFD166] fill-[#FFD166]" />
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                  {tier.icon}
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-gray-400">
                    {tier.name}
                  </h3>
                  <p className="text-3xl md:text-4xl font-black tracking-tight text-[#ffffff]">
                    {tier.badge}
                  </p>
                  <p className="text-[11px] font-bold text-gray-400 pt-1">
                    {tier.range}
                  </p>
                </div>

                <hr className="border-gray-200/60" />

                <ul className="space-y-3.5">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2.5 text-xs md:text-sm font-semibold text-[#ffffff]/80 leading-[110%]">
                      <Check className="w-4 h-4 text-[#ffffff] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}