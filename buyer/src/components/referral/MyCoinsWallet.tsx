// "use client";

// import ReferralLoginGate from "@/components/referral/ReferralLoginGate";
// import { MIN_REDEEM_COINS, RUPEE_PER_COIN } from "@/lib/referral/constants";
// import { coinsToInr, getReferrals } from "@/lib/referral/storage";
// import type { StoredReferral } from "@/lib/referral/types";
// import Link from "next/link";
// import { useCallback, useEffect, useMemo, useState } from "react";

// function formatDate(iso: string): string {
//   try {
//     return new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });
//   } catch {
//     return iso;
//   }
// }

// export default function MyCoinsWallet() {
//   const [referrals, setReferrals] = useState<StoredReferral[]>([]);

//   const refresh = useCallback(() => {
//     setReferrals(getReferrals());
//   }, []);

//   useEffect(() => {
//     refresh();
//   }, [refresh]);

//   const balance = useMemo(() => {
//     return referrals.filter((r) => r.status === "Deal Closed").reduce((s, r) => s + (r.coinsEarned || 0), 0);
//   }, [referrals]);

//   const inr = coinsToInr(balance);

//   const historyRows = useMemo(() => {
//     return referrals
//       .filter((r) => r.status === "Deal Closed" && r.coinsEarned > 0)
//       .map((r) => ({
//         id: r.referralId,
//         date: r.submittedAt,
//         clientName: r.clientName,
//         coins: r.coinsEarned,
//         status: r.status,
//       }));
//   }, [referrals]);

//   return (
//     <ReferralLoginGate title="Sign in to view your coins">
//       <div className="space-y-6">
//         <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
//           {/* <p className="text-sm text-[#667085]">Total coin balance</p>
//           <p className="text-4xl font-semibold text-[#0F172A] mt-2">{balance} coins</p>
//           <p className="text-lg text-[#475467] mt-2">≈ ₹{inr.toLocaleString("en-IN")}</p> */}
//           <p className="text-sm text-[#667085]">Total coin balance</p>
//           {/* <p className="text-4xl font-semibold text-[#0F172A] mt-2">{balance} coins</p> */}
//           <p className="text-4xl font-semibold text-[#0F172A] mt-2">1 coins</p>
//           {/* <p className="text-lg text-[#475467] mt-2">≈ ₹{inr.toLocaleString("en-IN")}</p> */}
//           <p className="text-lg text-[#475467] mt-2">≈ ₹1000</p>
//           <p className="text-sm text-[#98A2B3] mt-3">
//             1 coin = ₹{RUPEE_PER_COIN}. Coins are added when a referral is marked Deal Closed by KMA.
//           </p>
//           <div className="mt-6 flex flex-wrap gap-3">
//             <Link href="/refer-and-earn/redeem" className="animated-button px-8 py-3 border border-blue text-center">
//               <span className="relative">Redeem</span>
//             </Link>
//             <button
//               type="button"
//               onClick={refresh}
//               className="px-6 py-3 rounded-full border border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB] text-sm font-medium"
//             >
//               Refresh
//             </button>
//           </div>
//           {balance < MIN_REDEEM_COINS ? (
//             <p className="text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-4">
//               Minimum redeem is {MIN_REDEEM_COINS} coins (₹{(MIN_REDEEM_COINS * RUPEE_PER_COIN).toLocaleString("en-IN")}) once
//               available.
//             </p>
//           ) : null}
//         </div>

//         <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
//           <div className="px-5 py-4 border-b border-[#EAECF0]">
//             <h2 className="text-lg font-semibold text-[#0F172A]">Earning history</h2>
//             <p className="text-sm text-[#667085]">Credits appear after deals close.</p>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-left text-sm">
//               <thead className="bg-[#F8FAFC] text-[#475467]">
//                 <tr>
//                   <th className="px-4 py-3 font-medium">Date</th>
//                   <th className="px-4 py-3 font-medium">Referral ID</th>
//                   <th className="px-4 py-3 font-medium">Client</th>
//                   <th className="px-4 py-3 font-medium">Coins</th>
//                   <th className="px-4 py-3 font-medium">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {historyRows.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="px-4 py-10 text-center text-[#667085]">
//                       No coin credits yet. When KMA closes a deal, coins will show here.
//                     </td>
//                   </tr>
//                 ) : (
//                   historyRows.map((row) => (
//                     <tr key={row.id} className="border-t border-[#EAECF0]">
//                       <td className="px-4 py-3 text-[#475467] whitespace-nowrap">{formatDate(row.date)}</td>
//                       <td className="px-4 py-3 font-mono text-xs text-[#101828]">{row.id}</td>
//                       <td className="px-4 py-3 text-[#101828]">{row.clientName}</td>
//                       <td className="px-4 py-3 font-medium text-[#0F172A]">+{row.coins}</td>
//                       <td className="px-4 py-3 text-emerald-700 text-xs font-medium">{row.status}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </ReferralLoginGate>
//   );
// }


"use client";

import ReferralLoginGate from "@/components/referral/ReferralLoginGate";
import { MIN_REDEEM_COINS, RUPEE_PER_COIN } from "@/lib/referral/constants";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

interface ApiResponseReferral {
  id: string;
  referrerName: string;
  referrerUniqueId: string;
  clientName: string;
  clientMobile: string;
  channelPartnerId: string | null;
  channelPartnerName: string;
  propertyType: string;
  location: string | null;
  status: string;
  coinsCredited: number;
  submittedAt: string;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });
  } catch {
    return iso;
  }
}

export default function MyCoinsWallet() {
  const [referrals, setReferrals] = useState<ApiResponseReferral[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const refresh = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const loggedInUserMobile = localStorage.getItem("userMobile") || "9354040527";

  //     if (!loggedInUserMobile) {
  //       setLoading(false);
  //       return;
  //     }

  //     const res = await fetch(`/api/client/dashboard-sync?referrerId=${loggedInUserMobile}`, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" }
  //     });
      
  //     const json = await res.json();
  //     if (json.success && Array.isArray(json.data)) {
  //       setReferrals(json.data);
  //     }
  //   } catch (error) {
  //     console.error("Failed to sync client wallet information stream:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const userObjString = localStorage.getItem("user");
      let loggedInUserMobile = null;

      if (userObjString) {
        try {
          const userData = JSON.parse(userObjString);
          loggedInUserMobile = userData?.phone || userData?.phone_number;
        } catch (parseErr) {
          console.error("🚨 Error parsing 'user' object inside wallet frame:", parseErr);
        }
      }

      if (!loggedInUserMobile || String(loggedInUserMobile).trim() === "") {
        console.warn("⚠️ Wallet Sync Cancelled: 'phone' property missing in local storage user node.");
        setReferrals([]); 
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/client/dashboard-sync?referrerId=${String(loggedInUserMobile).trim()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setReferrals(json.data);
      }
    } catch (error) {
      console.error("Failed to sync client wallet information stream:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const balance = useMemo(() => {
    return referrals
      .filter((r) => r.status === "Deal Closed")
      .reduce((sum, r) => sum + (Number(r.coinsCredited) || 0), 0);
  }, [referrals]);

  const inr = balance * (RUPEE_PER_COIN || 1000);

  const historyRows = useMemo(() => {
    return referrals
      .filter((r) => r.status === "Deal Closed" && Number(r.coinsCredited) > 0)
      .map((r) => ({
        id: r.id,
        date: r.submittedAt,
        clientName: r.clientName,
        coins: r.coinsCredited,
        status: r.status,
      }));
  }, [referrals]);

  return (
    <ReferralLoginGate title="Sign in to view your coins">
      <div className="space-y-6 max-w-4xl mx-auto p-4">
        
        <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <p className="text-sm font-semibold text-[#667085]">Total coin balance</p>
          <p className="text-4xl font-black text-[#010048] mt-2">{balance} coins</p>
          <p className="text-lg font-bold text-[#475467] mt-1">≈ ₹{inr.toLocaleString("en-IN")}</p>
          <p className="text-xs text-[#98A2B3] mt-3">
            1 coin = ₹{(RUPEE_PER_COIN || 1000).toLocaleString("en-IN")}. Coins are added automatically when a referral status is marked Deal Closed by KMA.
          </p>
          
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <Link 
              href="/refer-and-earn/redeem" 
              className={`px-8 py-3 rounded-xl font-bold text-sm text-center transition shadow-sm
                ${balance >= MIN_REDEEM_COINS 
                  ? "bg-[#010048] text-white hover:bg-[#010048]/90" 
                  : "bg-gray-100 text-gray-400 pointer-events-none border border-gray-200"
                }`}
            >
              Redeem Balance
            </Link>
            
            <button
              type="button"
              onClick={refresh}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB] text-sm font-semibold transition cursor-pointer disabled:text-gray-400"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Syncing..." : "Refresh"}
            </button>
          </div>

          {balance < MIN_REDEEM_COINS ? (
            <p className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5 mt-4">
              Minimum redeem threshold is {MIN_REDEEM_COINS} coins (₹{(MIN_REDEEM_COINS * (RUPEE_PER_COIN || 1000)).toLocaleString("en-IN")}) once available.
            </p>
          ) : null}
        </div>

        <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <div className="px-5 py-4 border-b border-[#EAECF0]">
            <h2 className="text-lg font-bold text-[#0F172A]">Earning history</h2>
            <p className="text-sm text-[#667085] font-medium">Credits appear dynamically after deals close.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAFC] text-[#475467]">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Referral ID</th>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 font-medium">Coins</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-[#667085]">
                      Syncing wallet statements from server...
                    </td>
                  </tr>
                ) : historyRows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-[#667085]">
                      No coin credits yet. When KMA closes an assigned deal, coins ledger entries will show here.
                    </td>
                  </tr>
                ) : (
                  historyRows.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="px-4 py-3 text-[#475467] whitespace-nowrap">{formatDate(row.date)}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[#101828] font-semibold">{row.id}</td>
                      <td className="px-4 py-3 text-[#101828] font-bold">{row.clientName}</td>
                      <td className="px-4 py-3 font-black text-emerald-600">+{row.coins} Coins</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </ReferralLoginGate>
  );
}