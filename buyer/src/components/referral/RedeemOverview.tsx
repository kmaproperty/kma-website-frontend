// "use client";

// import ReferralLoginGate from "@/components/referral/ReferralLoginGate";
// import { MIN_REDEEM_COINS, RUPEE_PER_COIN } from "@/lib/referral/constants";
// import { coinsToInr, getReferrals } from "@/lib/referral/storage";
// import { useMemo, useState } from "react";

// export default function RedeemOverview() {
//   const [tick, setTick] = useState(0);

//   const balance = useMemo(() => {
//     void tick;
//     return getReferrals()
//       .filter((r) => r.status === "Deal Closed")
//       .reduce((s, r) => s + (r.coinsEarned || 0), 0);
//   }, [tick]);

//   const inr = coinsToInr(balance);

//   return (
//     <ReferralLoginGate title="Sign in to redeem coins">
//       <div className="space-y-6">
//         <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
//           <h2 className="text-lg font-semibold text-[#0F172A]">Redeem overview</h2>
//           <p className="text-sm text-[#667085] mt-1">Convert earned coins to payout (UPI, bank, or wallet).</p>

//           <div className="mt-6 p-4 rounded-xl bg-[#F8FAFC] border border-[#E4E7EC]">
//             <p className="text-sm text-[#475467]">Balance</p>
//             <p className="text-3xl font-semibold text-[#0F172A] mt-1">{balance} coins</p>
//             <p className="text-[#475467] mt-1">≈ ₹{inr.toLocaleString("en-IN")}</p>
//             <p className="text-sm text-[#667085] mt-3">1 coin = ₹{RUPEE_PER_COIN}</p>
//             <p className="text-sm text-[#667085] mt-2">
//               Minimum redeem: {MIN_REDEEM_COINS} coins (₹{(MIN_REDEEM_COINS * RUPEE_PER_COIN).toLocaleString("en-IN")}).
//             </p>
//           </div>

//           <p className="text-sm text-[#475467] mt-6">
//             Payout requests are processed within <strong>48 hours</strong> after submission. Full method selection and payout
//             details will connect here once the redeem API is live.
//           </p>

//           <button
//             type="button"
//             disabled={balance < MIN_REDEEM_COINS}
//             className="mt-6 animated-button px-10 py-3 border border-blue text-center disabled:opacity-50 disabled:pointer-events-none"
//           >
//             <span className="relative">Start payout (coming soon)</span>
//           </button>
//           {balance < MIN_REDEEM_COINS ? (
//             <p className="text-xs text-[#667085] mt-3">Earn more coins to reach the minimum redeem amount.</p>
//           ) : null}

//           <button
//             type="button"
//             onClick={() => setTick((n) => n + 1)}
//             className="block mt-4 text-sm font-medium text-[#1D4ED8] hover:underline"
//           >
//             Refresh balance
//           </button>
//         </div>

//         <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
//           <h3 className="font-semibold text-[#0F172A]">Redeem history</h3>
//           <p className="text-sm text-[#667085] mt-2">Past redemptions will appear here after the redeem service is enabled.</p>
//         </div>
//       </div>
//     </ReferralLoginGate>
//   );
// }

"use client";

import ReferralLoginGate from "@/components/referral/ReferralLoginGate";
import { MIN_REDEEM_COINS, RUPEE_PER_COIN } from "@/lib/referral/constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, RefreshCw, Landmark, CheckCircle2 } from "lucide-react";
import RedeemBankDetails from "../referAndEarn/RedeemBankDetails";
import RedeemAadharVerify from "../referAndEarn/RedeemAadharVerify";


interface ApiResponseReferral {
  id: string;
  coinsCredited: number;
  status: string;
}

export default function RedeemOverview() {
  const [referrals, setReferrals] = useState<ApiResponseReferral[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submittingToAdmin, setSubmittingToAdmin] = useState<boolean>(false);

  const [currentPayoutStep, setCurrentPayoutStep] = useState<"overview" | "aadhar" | "bank" | "final">("overview");

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const loggedInUserMobile = localStorage.getItem("userMobile") || "9354040527";
      if (!loggedInUserMobile) {
        setLoading(false);
        return;
      }
      const res = await fetch(`/api/client/dashboard-sync?referrerId=${loggedInUserMobile}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setReferrals(json.data);
      }
    } catch (error) {
      console.error("Failed sync:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const balance = useMemo(() => {
    return referrals
      .filter((r) => r.status === "Deal Closed")
      .reduce((sum, r) => sum + (Number(r.coinsCredited) || 0), 0);
  }, [referrals]);

  const inr = balance * (RUPEE_PER_COIN || 1000);

  return (
    <ReferralLoginGate title="Sign in to redeem coins">
      <div className="space-y-6 max-w-4xl mx-auto p-4 font-sans antialiased text-[#010048]">
        
        <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          
          {currentPayoutStep === "overview" && (
            <>
              <h2 className="text-xl font-bold">Redeem overview</h2>
              <p className="text-sm text-[#667085] mt-1">Convert earned coins to payout (UPI, bank, or wallet).</p>

              <div className="mt-6 p-5 rounded-2xl bg-[#F8FAFC] border border-[#E4E7EC]">
                <p className="text-xs font-bold text-[#475467] tracking-wider uppercase">Available Balance</p>
                <h3 className="text-3xl font-black text-[#010048] mt-1">{loading ? "..." : `${balance} coins`}</h3>
                <p className="text-[#FFD166] font-extrabold text-lg mt-1">{loading ? "Calculating..." : `≈ ₹${inr.toLocaleString("en-IN")}`}</p>
              </div>

              <button
                type="button"
                disabled={loading || balance < MIN_REDEEM_COINS}
                onClick={() => setCurrentPayoutStep("aadhar")}
                className="mt-6 w-full py-3.5 bg-[#010048] hover:bg-[#010048]/90 text-white font-bold text-sm rounded-xl transition shadow-sm cursor-pointer flex gap-2 justify-center items-center disabled:bg-gray-100 disabled:text-gray-400"
              >
                Start payout Verification Process <ArrowRight height={20} width={20}/>
              </button>
            </>
          )}

          {currentPayoutStep === "aadhar" && (
            <RedeemAadharVerify 
              onVerificationSuccess={() => setCurrentPayoutStep("bank")} 
              onCancel={() => setCurrentPayoutStep("overview")}
            />
          )}

          {currentPayoutStep === "bank" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4 text-left">
                <Landmark className="w-6 h-6 text-[#010048]" />
                <div>
                  <h3 className="text-base font-black text-[#010048]">Step 2: Settlement Bank Details</h3>
                  <p className="text-xs text-gray-400 font-semibold">Link active financial bank credentials</p>
                </div>
              </div>

              <RedeemBankDetails 
                onVerificationSuccess={() => setCurrentPayoutStep("final")} 
                onCancel={() => setCurrentPayoutStep("aadhar")}
              />
            </div>
          )}

          {currentPayoutStep === "final" && (
            <div className="text-center space-y-6 py-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#010048]">Verification Successful!</h3>
                <p className="text-sm text-gray-500 font-semibold max-w-xs mx-auto leading-relaxed">
                  You get your reward money of <span className="text-emerald-600 font-bold">₹5000</span> within 24 hours directly in your account.
                </p>
              </div>
              <button 
                onClick={() => { setCurrentPayoutStep("overview"); refresh(); }}
                className="w-full bg-[#010048] text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-[#010048]/90 transition"
              >
                Go Back to Dashboard
              </button>
            </div>
          )}

          {currentPayoutStep === "overview" && (
            <div className="border-t border-gray-100 mt-6 pt-4 text-left">
              <button
                type="button"
                onClick={refresh}
                disabled={loading}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#1D4ED8] hover:underline disabled:text-gray-400 cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                {loading ? "Syncing points..." : "Refresh balance"}
              </button>
            </div>
          )}

        </div>

        {currentPayoutStep === "overview" && (
          <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] animate-fade-in">
            <h3 className="font-bold text-[#0F172A]">Redeem history</h3>
            <p className="text-sm text-[#667085] mt-2 font-medium">Past redemptions will appear here after the redeem service is enabled.</p>
          </div>
        )}

      </div>
    </ReferralLoginGate>
  );
}
