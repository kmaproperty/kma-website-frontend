// "use client";

// import ReferralDetailDialog from "@/components/referral/ReferralDetailDialog";
// import ReferralLoginGate from "@/components/referral/ReferralLoginGate";
// import { statusBadgeClass } from "@/components/referral/statusStyles";
// import { RUPEE_PER_COIN } from "@/lib/referral/constants";
// import { coinsToInr, getReferrals, totalCoinsEarned } from "@/lib/referral/storage";
// import type { StoredReferral } from "@/lib/referral/types";
// import { useCallback, useEffect, useMemo, useState } from "react";

// type TabKey = "direct" | "partner";

// function formatDate(iso: string): string {
//   try {
//     return new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });
//   } catch {
//     return iso;
//   }
// }

// export default function MyReferralsDashboard() {
//   const [tab, setTab] = useState<TabKey>("direct");
//   const [rows, setRows] = useState<StoredReferral[]>([]);
//   const [selected, setSelected] = useState<StoredReferral | null>(null);
//   const [detailOpen, setDetailOpen] = useState(false);

//   const refresh = useCallback(() => {
//     setRows(getReferrals());
//   }, []);

//   useEffect(() => {
//     refresh();
//   }, [refresh]);

//   const { direct, partner } = useMemo(() => {
//     const all = rows;
//     return {
//       direct: all.filter((r) => !r.viaPartner),
//       partner: all.filter((r) => r.viaPartner),
//     };
//   }, [rows]);

//   const list = tab === "direct" ? direct : partner;
//   const points = totalCoinsEarned();
//   const inr = coinsToInr(points);

//   const openDetail = (r: StoredReferral) => {
//     setSelected(r);
//     setDetailOpen(true);
//   };

//   return (
//     <ReferralLoginGate title="Sign in to view your referrals">
//       <div className="space-y-6">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//           <div className="inline-flex p-1 rounded-xl border border-[#D0D5DD] bg-[#F8FAFC]">
//             <button
//               type="button"
//               onClick={() => setTab("direct")}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
//                 tab === "direct" ? "bg-blue text-white" : "text-[#475467] hover:bg-white"
//               }`}
//             >
//               Client referrals
//             </button>
//             <button
//               type="button"
//               onClick={() => setTab("partner")}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
//                 tab === "partner" ? "bg-blue text-white" : "text-[#475467] hover:bg-white"
//               }`}
//             >
//               Channel partner referrals
//             </button>
//           </div>
//           <button
//             type="button"
//             onClick={refresh}
//             className="text-sm font-medium text-[#1D4ED8] hover:underline self-start sm:self-auto"
//           >
//             Refresh
//           </button>
//         </div>

//         <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left text-sm">
//               <thead className="bg-[#F8FAFC] text-[#475467]">
//                 <tr>
//                   {tab === "direct" ? (
//                     <>
//                       <th className="px-4 py-3 font-medium">Client name</th>
//                       <th className="px-4 py-3 font-medium">Mobile</th>
//                       <th className="px-4 py-3 font-medium">Property</th>
//                       <th className="px-4 py-3 font-medium">Status</th>
//                       <th className="px-4 py-3 font-medium">Date</th>
//                     </>
//                   ) : (
//                     <>
//                       <th className="px-4 py-3 font-medium">Partner</th>
//                       <th className="px-4 py-3 font-medium">Client</th>
//                       <th className="px-4 py-3 font-medium">Status</th>
//                       <th className="px-4 py-3 font-medium">Coins</th>
//                       <th className="px-4 py-3 font-medium">Date</th>
//                     </>
//                   )}
//                 </tr>
//               </thead>
//               <tbody>
//                 {list.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="px-4 py-10 text-center text-[#667085]">
//                       No referrals in this view yet. Submit a referral from{" "}
//                       <a href="/refer-and-earn" className="text-[#1D4ED8] font-medium hover:underline">
//                         Give a referral
//                       </a>
//                       .
//                     </td>
//                   </tr>
//                 ) : (
//                   list.map((r) => (
//                     <tr
//                       key={r.referralId}
//                       onClick={() => openDetail(r)}
//                       className="border-t border-[#EAECF0] hover:bg-[#F9FAFB] cursor-pointer"
//                     >
//                       {tab === "direct" ? (
//                         <>
//                           <td className="px-4 py-3 text-[#101828] font-medium">{r.clientName}</td>
//                           <td className="px-4 py-3 text-[#475467]">{r.clientMobile}</td>
//                           <td className="px-4 py-3 text-[#475467]">{r.propertyType}</td>
//                           <td className="px-4 py-3">
//                             <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusBadgeClass(r.status)}`}>
//                               {r.status}
//                             </span>
//                           </td>
//                           <td className="px-4 py-3 text-[#475467] whitespace-nowrap">{formatDate(r.submittedAt)}</td>
//                         </>
//                       ) : (
//                         <>
//                           <td className="px-4 py-3 text-[#101828]">{r.channelPartnerName || r.channelPartnerId || "—"}</td>
//                           <td className="px-4 py-3 text-[#101828] font-medium">{r.clientName}</td>
//                           <td className="px-4 py-3">
//                             <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusBadgeClass(r.status)}`}>
//                               {r.status}
//                             </span>
//                           </td>
//                           <td className="px-4 py-3 text-[#475467]">{r.status === "Deal Closed" ? r.coinsEarned : "—"}</td>
//                           <td className="px-4 py-3 text-[#475467] whitespace-nowrap">{formatDate(r.submittedAt)}</td>
//                         </>
//                       )}
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <p className="text-sm text-[#667085]">My points</p>
//             <p className="text-3xl font-semibold text-[#0F172A] mt-1">{points} coins</p>
//             <p className="text-sm text-[#475467] mt-1">≈ ₹{inr.toLocaleString("en-IN")} (1 coin = ₹{RUPEE_PER_COIN})</p>
//           </div>
//           <p className="text-xs text-[#98A2B3] max-w-sm">
//             Coins are credited when KMA marks your referral as Deal Closed. Totals update when you refresh after admin updates.
//           </p>
//         </div>
//       </div>

//       <ReferralDetailDialog open={detailOpen} onClose={() => setDetailOpen(false)} referral={selected} />
//     </ReferralLoginGate>
//   );
// }

"use client";

import ReferralDetailDialog from "@/components/referral/ReferralDetailDialog";
import ReferralLoginGate from "@/components/referral/ReferralLoginGate";
import { statusBadgeClass } from "@/components/referral/statusStyles";
import { RUPEE_PER_COIN } from "@/lib/referral/constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Coins, RefreshCw } from "lucide-react";

type TabKey = "direct" | "partner";

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

export default function MyReferralsDashboard() {
  const [tab, setTab] = useState<TabKey>("direct");
  const [rows, setRows] = useState<ApiResponseReferral[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

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
  //       setRows(json.data);
  //     }
  //   } catch (error) {
  //     console.error("Sync failure:", error);
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
          console.error("Error parsing 'user' object from localStorage:", parseErr);
        }
      }

      console.log("Extracted Mobile Number:", loggedInUserMobile);

      if (!loggedInUserMobile || String(loggedInUserMobile).trim() === "") {
        console.warn("⚠️ Fetch Aborted: Valid mobile number context not found inside 'user' object.");
        setRows([]);
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/client/dashboard-sync?referrerId=${String(loggedInUserMobile).trim()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRows(json.data);
      } else {
        console.error("Proxy query evaluation sync failure:", json.message);
      }
    } catch (error) {
      console.error("Failed to sync personal referrals data safely:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    refresh();
  }, [refresh]);

  const { direct, partner } = useMemo(() => {
    const all = rows;
    return {
      direct: all.filter((r) => !r.channelPartnerName || r.channelPartnerName === "Direct"),
      partner: all.filter((r) => r.channelPartnerName && r.channelPartnerName !== "Direct"),
    };
  }, [rows]);

  const list = tab === "direct" ? direct : partner;

  const totalCoins = useMemo(() => {
    return rows.reduce((sum, item) => sum + (Number(item.coinsCredited) || 0), 0);
  }, [rows]);

  const totalInr = totalCoins * (RUPEE_PER_COIN || 1000);

  const openDetail = (r: ApiResponseReferral) => {
    setSelected(r);
    setDetailOpen(true);
  };

  return (
    <ReferralLoginGate title="Sign in to view your referrals">
      <div className="space-y-6 max-w-6xl mx-auto p-4">
        
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gradient-to-br from-[#010048] to-[#0b0a63] p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-6 translate-y-6 text-white/[0.03] pointer-events-none">
            <Coins className="w-48 h-48" />
          </div>
          <div className="space-y-1 relative z-10">
            <p className="text-xs font-bold text-white/60 tracking-wider uppercase">Your Accumulative Points Balance</p>
            <h2 className="text-4xl font-black tracking-tight text-[#FFD166]">{totalCoins} Coins</h2>
            <p className="text-xs text-white/70 font-medium">Accumulated across all successfully closed deals</p>
          </div>
          <div className="sm:text-right flex flex-col justify-end sm:items-end space-y-1 relative z-10 mt-4 sm:mt-0">
            <p className="text-xs font-bold text-white/60 tracking-wider uppercase">Cash Equivalent Value</p>
            <h3 className="text-2xl font-black tracking-tight text-white">≈ ₹{totalInr.toLocaleString("en-IN")}</h3>
            <p className="text-[11px] text-white/50 font-semibold">Valued at 1 Coin = ₹{(RUPEE_PER_COIN || 1000).toLocaleString("en-IN")}</p>
          </div>
        </div> */}

        {/* Navigation Tab Controllers Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <div className="inline-flex p-1 rounded-xl border border-[#D0D5DD] bg-[#F8FAFC]">
            <button
              type="button"
              onClick={() => setTab("direct")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                tab === "direct" ? "bg-[#010048] text-white" : "text-[#475467] hover:bg-white"
              }`}
            >
              Client referrals ({direct.length})
            </button>
            <button
              type="button"
              onClick={() => setTab("partner")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                tab === "partner" ? "bg-[#010048] text-white" : "text-[#475467] hover:bg-white"
              }`}
            >
              Channel partner referrals ({partner.length})
            </button>
          </div>
          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1D4ED8] hover:underline disabled:text-gray-400 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Syncing..." : "Refresh Status"}
          </button>
        </div>

        {/* Main Data Presentation Layout Table */}
        <div className="bg-white rounded-2xl border border-[#EAECF0] overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAFC] text-[#475467]">
                <tr>
                  {tab === "direct" ? (
                    <>
                      <th className="px-4 py-3 font-medium">Client name</th>
                      <th className="px-4 py-3 font-medium">Mobile</th>
                      <th className="px-4 py-3 font-medium">Property</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Coins</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                    </>
                  ) : (
                    <>
                      <th className="px-4 py-3 font-medium">Partner</th>
                      <th className="px-4 py-3 font-medium">Client</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Coins</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-[#667085]">
                      Syncing live data pipelines...
                    </td>
                  </tr>
                ) : list.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-[#667085]">
                      No referrals found under this tab category.
                    </td>
                  </tr>
                ) : (
                  list.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => openDetail(r)}
                      className="hover:bg-[#F9FAFB] cursor-pointer transition-colors"
                    >
                      {tab === "direct" ? (
                        <>
                          <td className="px-4 py-3 text-[#101828] font-bold">{r.clientName}</td>
                          <td className="px-4 py-3 text-[#475467] font-medium">{r.clientMobile}</td>
                          <td className="px-4 py-3 text-[#475467] font-semibold">{r.propertyType}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusBadgeClass(r.status as any)}`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[#010048] font-black">{r.coinsCredited || 0}</td>
                          <td className="px-4 py-3 text-[#475467] whitespace-nowrap">{formatDate(r.submittedAt)}</td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3 text-[#101828] font-semibold">{r.channelPartnerName || "—"}</td>
                          <td className="px-4 py-3 text-[#101828] font-bold">{r.clientName}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusBadgeClass(r.status as any)}`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[#010048] font-black">{r.coinsCredited || 0}</td>
                          <td className="px-4 py-3 text-[#475467] whitespace-nowrap">{formatDate(r.submittedAt)}</td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gradient-to-br from-[#010048] to-[#0b0a63] p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-6 translate-y-6 text-white/[0.03] pointer-events-none">
            <Coins className="w-48 h-48" />
          </div>
          <div className="space-y-1 relative z-10">
            <p className="text-xs font-bold text-white/60 tracking-wider uppercase">Your Points Balance</p>
            <h2 className="text-4xl font-black tracking-tight text-[#FFD166]">{totalCoins} Coins</h2>
            <p className="text-xs text-white/70 font-medium">Accumulated across all successfully closed deals</p>
          </div>
          <div className="sm:text-right flex flex-col justify-end sm:items-end space-y-1 relative z-10 mt-4 sm:mt-0">
            <p className="text-xs font-bold text-white/60 tracking-wider uppercase">Total Cash Value</p>
            <h3 className="text-2xl font-black tracking-tight text-white">≈ ₹{totalInr.toLocaleString("en-IN")}</h3>
            <p className="text-[11px] text-white/50 font-semibold">Valued at 1 Coin = ₹{(RUPEE_PER_COIN || 1000).toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>

      <ReferralDetailDialog open={detailOpen} onClose={() => setDetailOpen(false)} referral={selected} />
    </ReferralLoginGate>
  );
}