// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";

// interface OfferConfig {
//   href: string;
//   cta: string;
//   eyebrow: string;
//   tag: string;
//   fine: string;
//   rotateMs: number;
// }

// interface OfferItem {
//   id: number;
//   bookings: number;
//   worth: string;
//   bonus: string | null;
//   color: string;
// }

// const CFG: OfferConfig = {
//   href: "/join-us",
//   cta: "Join Now",
//   eyebrow: "Channel Partner Offer",
//   tag: "Goa Luxe",
//   fine: "*Onwards. Rates as per Yugen (without discount). Perks: 5 Star Hotel Membership, Free Site Visit, Hassle-free Construction, EOI Completion Benefit.",
//   rotateMs: 4500,
// };

// const OFFERS: OfferItem[] = [
//   { id: 3, bookings: 3, worth: "₹5 – ₹6 Lakh", bonus: null, color: "#e11d2e" },
//   { id: 5, bookings: 5, worth: "₹10 – ₹12 Lakh", bonus: "8%", color: "#2447c9" },
// ];

// function Car({ color }: { color: string }) {
//   return (
//     <svg className="w-full relative block overflow-visible animate-dcx-bob" viewBox="0 0 160 64" aria-hidden="true">
//       <defs>
//         <linearGradient id="dcxBeam" x1="0" x2="1">
//           <stop offset="0" stopColor="#fff6c8" stopOpacity=".95" />
//           <stop offset="1" stopColor="#fff6c8" stopOpacity="0" />
//         </linearGradient>
//         <linearGradient id="dcxGlass" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0" stopColor="#bfe0ff" />
//           <stop offset="1" stopColor="#1c2c4f" />
//         </linearGradient>
//         <linearGradient id="dcxShine" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0" stopColor="#fff" stopOpacity=".38" />
//           <stop offset="1" stopColor="#fff" stopOpacity="0" />
//         </linearGradient>
//       </defs>

//       <polygon className="animate-dcx-beam" points="150,36 240,10 240,66 150,42" fill="url(#dcxBeam)" />

//       <path
//         d="M8 44 L8 36 Q8 31 14 30 L34 28 L50 12 Q52 10 56 10 L106 10 Q110 10 113 13 L128 28 L146 31 Q152 32 152 38 L152 44 Q152 47 149 47 L11 47 Q8 47 8 44 Z"
//         fill={color}
//       />
//       <path
//         d="M8 36 Q8 31 14 30 L34 28 L50 12 Q52 10 56 10 L106 10 Q110 10 113 13 L128 28 L146 31 Q152 32 152 38 L152 38 H8 Z"
//         fill="url(#dcxShine)"
//       />

//       <path d="M53 15 L80 15 L80 28 L42 28 Z" fill="url(#dcxGlass)" />
//       <path d="M84 15 L105 15 L119 28 L84 28 Z" fill="url(#dcxGlass)" />

//       <path d="M12 39 H148" stroke="rgba(255,255,255,.35)" strokeWidth="1" />

//       <rect x="143" y="33" width="9" height="5" rx="2" fill="#fff7cf" className="animate-dcx-flash [filter:drop-shadow(0_0_4px_#fff3b0)]" />
//       <rect x="8" y="33" width="5" height="5" rx="1.5" fill="#ff3b3b" className="[filter:drop-shadow(0_0_3px_#ff3b3b)]" />

//       {[38, 124].map((cx) => (
//         <g key={cx}>
//           <circle cx={cx} cy="47" r="12" fill="#0b0b12" />
//           <g className="origin-[var(--cx)_47px] [transform-box:view-box] animate-dcx-wheel" style={{ "--cx": `${cx}px` } as React.CSSProperties}>
//             <circle cx={cx} cy="47" r="7.5" fill="#d9dee6" />
//             {[0, 60, 120].map((r) => (
//               <rect key={r} x={cx - 0.8} y="40" width="1.6" height="14" fill="#5b6472" transform={`rotate(${r} ${cx} 47)`} />
//             ))}
//             <circle cx={cx} cy="47" r="2" fill="#0b0b12" />
//           </g>
//         </g>
//       ))}
//     </svg>
//   );
// }

// export default function DiwaliCarOffer() {
//   const [i, setI] = useState<number>(0);
//   const [paused, setPaused] = useState<boolean>(false);

//   useEffect(() => {
//     if (paused) return;
//     const t = setInterval(() => setI((p) => (p + 1) % OFFERS.length), CFG.rotateMs);
//     return () => clearInterval(t);
//   }, [paused]);

//   const o = OFFERS[i];

//   return (
//     <>
//       <aside
//         className="relative flex-none w-[min(400px,100%)] h-[157px] z-6 animate-dcx-enter group select-none mt-20 md:mt-0"
//         title={CFG.fine}
//         onMouseEnter={() => setPaused(true)}
//         onMouseLeave={() => setPaused(false)}
//         aria-label="Car reward offer for channel partners"
//       >
//         <div className="relative box-border w-full h-full grid grid-rows-[auto_1fr_auto] row-gap-[6px] overflow-hidden p-[10px_12px] rounded-[20px] text-white border border-[#ffd98a]/30 bg-[radial-gradient(120%_90%_at_100%_0%,rgba(255,190,80,0.2)_0%,transparent_55%),linear-gradient(160deg,#2a1236_0%,#190a26_55%,#0e0618_100%)] animate-dcx-glow">
          
//           <div className="absolute inset-0 rounded-[inherit] p-[2px] pointer-events-none z-3 [background:conic-gradient(from_var(--dcx-ang,0deg),transparent_0_50%,#ffd98a_72%,#fff6d0_82%,transparent_100%)] [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor] [mask-composite:exclude] animate-dcx-spin" />
          
//           <div className="absolute top-0 -left-[60%] w-[40%] h-full pointer-events-none z-3 bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.13),transparent)] -skew-x-[18deg] animate-dcx-sheen" />

//           <div className="flex items-center justify-between gap-2 z-4">
//             <span className="inline-flex items-center gap-[6px] py-[3px] px-[9px] text-[9.5px] font-bold tracking-[0.08em] uppercase text-[#2a1236] bg-gradient-to-r from-[#ffd98a] to-[#ffb84a] rounded-full">
//               <span className="w-[6px] h-[6px] rounded-full bg-[#d6122b] animate-dcx-pulse" />
//               {CFG.eyebrow}
//             </span>
//             <span className="text-[9.5px] font-semibold tracking-[0.14em] uppercase text-[#ffd98a]">
//               {CFG.tag}
//             </span>
//           </div>

//           <div className="min-h-0 flex items-stretch justify-between gap-2 z-4">
            
//             <div className="min-w-0 self-center animate-dcx-pop" key={`r${o.id}`}>
//               <h3 className="m-0 font-serif text-[17px] sm:text-[19px] leading-[1.15] font-bold text-white">
//                 Win a{" "}
//                 <em className="not-italic bg-gradient-to-r from-[#ffd98a] via-[#fff6d0] via-[#ffb84a] to-[#ffd98a] bg-[length:250%_100%] bg-clip-text text-transparent animate-dcx-shine">
//                   Dream Car
//                 </em>
//               </h3>

//               <div className="mt-[3px] text-[17px] sm:text-[19px] font-extrabold leading-[1.15] whitespace-nowrap text-[#ffd98a] [text-shadow:0_0_14px_rgba(255,190,80,0.45)]">
//                 {o.worth}
//                 <sup className="text-[10px] ml-[1px] font-normal">*</sup>
//               </div>

//               <div className="flex items-center gap-[6px] mt-[3px] text-[11px] whitespace-nowrap text-white/80 font-medium">
//                 {o.bookings} bookings
//                 {o.bonus && (
//                   <span className="py-[1px] px-[7px] text-[10px] font-extrabold text-[#2a1236] bg-gradient-to-r from-[#ffd98a] to-[#ffb84a] rounded-full animate-dcx-ring">
//                     + {o.bonus} commission
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="relative flex-none w-[130px] min-[430px]:w-[180px] overflow-hidden rounded-[14px] border border-[#ffd98a]/30 bg-gradient-to-b from-[#1b1040] via-[#5a2a62] to-[#ff8a47]">
              
//               <div className="absolute inset-0 bottom-1/2 opacity-45 animate-dcx-stars bg-[radial-gradient(1.5px_1.5px_at_12%_20%,#fff,transparent),radial-gradient(1.5px_1.5px_at_38%_12%,#fff,transparent),radial-gradient(1px_1px_at_62%_28%,#fff,transparent),radial-gradient(1.5px_1.5px_at_85%_16%,#fff,transparent),radial-gradient(1px_1px_at_74%_6%,#fff,transparent)]" />
              
//               <div className="absolute -right-[18px] bottom-[10px] w-16 h-16 rounded-full bg-[radial-gradient(circle,#fff1b8_0_28%,rgba(255,196,90,0.55)_45%,transparent_70%)] animate-dcx-sun" />
              
//               <div
//                 className="absolute left-0 right-0 bottom-[9px] h-[22px] opacity-55 animate-dcx-hills"
//                 style={{
//                   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='22'%3E%3Cpath fill='%230a0414' d='M0 22V14h8v-4h6v6h6V8h8v14zM40 22V16l6-8 6 8v6zM62 22V12h7V6h7v8h8v8z'/%3E%3Cpath stroke='%230a0414' stroke-width='1.6' fill='none' d='M30 22V9M30 9q-7-2-10 4M30 9q7-2 10 4M30 9q-2-5-8-5M30 9q2-5 8-5'/%3E%3C/svg%3E")`,
//                   backgroundRepeat: "repeat-x",
//                   backgroundPosition: "0 100%",
//                   backgroundSize: "90px 22px",
//                 }}
//               />

//               <div className="absolute inset-0 pointer-events-none">
//                 <i className="absolute h-[1.5px] w-[34px] rounded-xs top-[38%] bg-gradient-to-r from-transparent to-[#ffeab4]/90 animate-dcx-streak" />
//                 <i className="absolute h-[1.5px] w-[34px] rounded-xs top-[56%] bg-gradient-to-r from-transparent to-[#ffeab4]/90 animate-dcx-streak [animation-delay:0.27s]" />
//                 <i className="absolute h-[1.5px] w-[34px] rounded-xs top-[70%] bg-gradient-to-r from-transparent to-[#ffeab4]/90 animate-dcx-streak [animation-delay:0.54s]" />
//               </div>

//               <div className="absolute left-0 right-0 bottom-0 h-[10px] bg-[repeating-linear-gradient(90deg,#ffd98a_0_12px,transparent_12px_26px)_0_50%/100%_1.5px_no-repeat,linear-gradient(#1a0f26,#0b0614)] animate-dcx-road" />

//               <div className="absolute left-[14px] min-[430px]:left-[22px] bottom-[6px] w-[88px] min-[430px]:w-[104px] animate-dcx-drive-in" key={o.id}>
                
//                 <div className="absolute left-[4px] bottom-[12px]">
//                   <b className="absolute w-[7px] h-[7px] rounded-full bg-white/50 animate-dcx-puff" />
//                   <b className="absolute w-[7px] h-[7px] rounded-full bg-white/50 animate-dcx-puff [animation-delay:0.3s]" />
//                   <b className="absolute w-[7px] h-[7px] rounded-full bg-white/50 animate-dcx-puff [animation-delay:0.6s]" />
//                 </div>

//                 <Car color={o.color} />

//                 <div className="absolute left-[6%] right-[4%] -bottom-[2px] h-[6px] rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.7),transparent)]" />

//                 <div className="absolute left-1/2 top-[40%] w-0 h-0 pointer-events-none">
//                   {Array.from({ length: 10 }).map((_, n) => (
//                     <s
//                       key={n}
//                       className="absolute -left-[2px] -top-[2px] w-[4px] h-[4px] rounded-full bg-[#ffe28a] shadow-[0_0_6px_2px_rgba(255,217,138,0.9)] animate-dcx-burst"
//                       style={{ "--a": `${n * 36}deg` } as React.CSSProperties}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between gap-2 z-4">
            
//             <div className="flex gap-[3px] p-[3px] rounded-[11px] bg-white/10" role="tablist">
//               {OFFERS.map((x, n) => (
//                 <button
//                   key={x.id}
//                   role="tab"
//                   aria-selected={n === i}
//                   className={`relative overflow-hidden py-[6px] px-[10px] border-0 rounded-[8px] font-sans text-[11px] font-semibold leading-none whitespace-nowrap cursor-pointer transition-all duration-200 hover:-translate-y-px hover:text-white focus-visible:outline-2 focus-visible:outline-[#ffd98a] ${
//                     n === i
//                       ? "text-[#2a1236] bg-gradient-to-r from-[#ffd98a] to-[#ffb84a] shadow-xs"
//                       : "text-white/75 bg-transparent"
//                   }`}
//                   onClick={() => setI(n)}
//                 >
//                   {x.bookings} Bookings
//                   {n === i && !paused && (
//                     <span
//                       className="absolute left-0 bottom-0 h-[2px] w-full bg-[#2a1236]/60 origin-left animate-dcx-bar"
//                       style={{ animationDuration: `${CFG.rotateMs}ms` }}
//                       key={`p${i}`}
//                     />
//                   )}
//                 </button>
//               ))}
//             </div>

//             <Link
//               href={CFG.href}
//               className="relative overflow-hidden inline-flex items-center gap-[6px] py-[9px] px-4 rounded-[11px] text-[12.5px] font-bold leading-none whitespace-nowrap text-[#2a1236] bg-gradient-to-r from-[#ffd98a] via-[#fff0b8] to-[#ffb84a] animate-dcx-cta hover:-translate-y-0.5 hover:scale-105 transition-transform duration-200 shadow-md"
//             >
//               <span>{CFG.cta}</span>
//               <svg
//                 viewBox="0 0 24 24"
//                 width="14"
//                 height="14"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2.6"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="animate-dcx-nudge"
//               >
//                 <path d="M5 12h14M13 6l6 6-6 6" />
//               </svg>
//               <span className="absolute top-0 -left-[70%] w-[40%] h-full bg-gradient-to-r from-transparent via-white/85 to-transparent -skew-x-[20deg] animate-dcx-sheen-cta pointer-events-none" />
//             </Link>
//           </div>
//         </div>
//       </aside>

//       <style jsx global>{`
//         @property --dcx-ang {
//           syntax: "<angle>";
//           inherits: false;
//           initial-value: 0deg;
//         }

//         @keyframes dcx-enter {
//           from { opacity: 0; transform: scale(0.92); }
//           to { opacity: 1; transform: none; }
//         }
//         @keyframes dcx-glow {
//           0%, 100% { box-shadow: 0 0 10px rgba(255, 170, 60, 0.12); }
//           50% { box-shadow: 0 0 22px rgba(255, 170, 60, 0.4); }
//         }
//         @keyframes dcx-spin {
//           to { --dcx-ang: 360deg; }
//         }
//         @keyframes dcx-sheen {
//           0%, 60% { left: -60%; }
//           100% { left: 140%; }
//         }
//         @keyframes dcx-shine {
//           to { background-position: 250% 0; }
//         }
//         @keyframes dcx-pulse {
//           0% { box-shadow: 0 0 0 0 rgba(214, 18, 43, 0.7); }
//           100% { box-shadow: 0 0 0 7px rgba(214, 18, 43, 0); }
//         }
//         @keyframes dcx-road {
//           to { background-position: -26px 50%, 0 0; }
//         }
//         @keyframes dcx-hills {
//           to { background-position: -90px 100%; }
//         }
//         @keyframes dcx-streak {
//           from { left: 105%; opacity: 0; }
//           15% { opacity: 1; }
//           to { left: -35%; opacity: 0; }
//         }
//         @keyframes dcx-drive-in {
//           from { transform: translateX(-190px); opacity: 0; }
//           55% { opacity: 1; }
//           to { transform: translateX(0); opacity: 1; }
//         }
//         @keyframes dcx-bob {
//           0%, 100% { margin-top: 0; }
//           50% { margin-top: -1.5px; }
//         }
//         @keyframes dcx-wheel {
//           to { transform: rotate(360deg); }
//         }
//         @keyframes dcx-beam {
//           0%, 100% { opacity: 0.55; }
//           50% { opacity: 1; }
//         }
//         @keyframes dcx-flash {
//           0%, 100% { opacity: 0.8; }
//           50% { opacity: 1; }
//         }
//         @keyframes dcx-puff {
//           from { transform: translateX(0) scale(0.6); opacity: 0.6; }
//           to { transform: translateX(-26px) translateY(-6px) scale(1.8); opacity: 0; }
//         }
//         @keyframes dcx-burst {
//           from { transform: rotate(var(--a)) translateX(0) scale(1); opacity: 1; }
//           to { transform: rotate(var(--a)) translateX(46px) scale(0.2); opacity: 0; }
//         }
//         @keyframes dcx-stars {
//           0%, 100% { opacity: 0.45; }
//           50% { opacity: 1; }
//         }
//         @keyframes dcx-sun {
//           0%, 100% { transform: scale(1); opacity: 0.85; }
//           50% { transform: scale(1.18); opacity: 1; }
//         }
//         @keyframes dcx-bar {
//           from { transform: scaleX(0); }
//           to { transform: scaleX(1); }
//         }
//         @keyframes dcx-pop {
//           from { opacity: 0; transform: translateY(8px); }
//           to { opacity: 1; transform: none; }
//         }
//         @keyframes dcx-ring {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.1); }
//         }
//         @keyframes dcx-cta {
//           0% { box-shadow: 0 0 0 0 rgba(255, 190, 80, 0.55); }
//           100% { box-shadow: 0 0 0 10px rgba(255, 190, 80, 0); }
//         }
//         @keyframes dcx-nudge {
//           0%, 100% { transform: translateX(0); }
//           50% { transform: translateX(3px); }
//         }
//         @keyframes dcx-sheen-cta {
//           0%, 55% { left: -70%; }
//           100% { left: 150%; }
//         }

//         .animate-dcx-enter { animation: dcx-enter 0.8s ease-out 0.3s both; }
//         .animate-dcx-glow { animation: dcx-glow 2.6s ease-in-out infinite; }
//         .animate-dcx-spin { animation: dcx-spin 4s linear infinite; }
//         .animate-dcx-sheen { animation: dcx-sheen 5s ease-in-out infinite; }
//         .animate-dcx-pulse { animation: dcx-pulse 1.1s ease-out infinite; }
//         .animate-dcx-pop { animation: dcx-pop 0.5s cubic-bezier(0.2, 1.2, 0.4, 1) both; }
//         .animate-dcx-shine { animation: dcx-shine 3.2s linear infinite; }
//         .animate-dcx-ring { animation: dcx-ring 1.4s ease-in-out infinite; }
//         .animate-dcx-stars { animation: dcx-stars 2.2s ease-in-out infinite; }
//         .animate-dcx-sun { animation: dcx-sun 3s ease-in-out infinite; }
//         .animate-dcx-hills { animation: dcx-hills 3.2s linear infinite; }
//         .animate-dcx-road { animation: dcx-road 0.4s linear infinite; }
//         .animate-dcx-streak { animation: dcx-streak 0.8s linear infinite; }
//         .animate-dcx-drive-in { animation: dcx-drive-in 1.1s cubic-bezier(0.18, 0.85, 0.25, 1) both; }
//         .animate-dcx-bob { animation: dcx-bob 0.42s ease-in-out infinite; }
//         .animate-dcx-wheel { animation: dcx-wheel 0.35s linear infinite; }
//         .animate-dcx-beam { animation: dcx-beam 1.2s ease-in-out infinite; }
//         .animate-dcx-flash { animation: dcx-flash 1.2s ease-in-out infinite; }
//         .animate-dcx-puff { animation: dcx-puff 0.9s ease-out infinite; }
//         .animate-dcx-burst { animation: dcx-burst 0.9s ease-out 0.9s both; }
//         .animate-dcx-bar { animation: dcx-bar linear both; }
//         .animate-dcx-cta { animation: dcx-cta 1.8s ease-out infinite; }
//         .animate-dcx-nudge { animation: dcx-nudge 1.2s ease-in-out infinite; }
//         .animate-dcx-sheen-cta { animation: dcx-sheen-cta 2.6s ease-in-out infinite; }

//         @media (prefers-reduced-motion: reduce) {
//           *, *::before, *::after {
//             animation: none !important;
//             transition: none !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface OfferConfig {
  href: string;
  cta: string;
  eyebrow: string;
  tag: string;
  fine: string;
  rotateMs: number;
}

interface OfferItem {
  id: number;
  bookings: number;
  worth: string;
  bonus: string | null;
  color: string;
}

const CFG: OfferConfig = {
  href: "https://kmaglobalproperty.in/diwali-offer/",
  cta: "Join Now",
  eyebrow: "Channel Partner Offer",
  tag: "Goa Luxe",
  fine: "*Onwards. Rates as per Yugen (without discount). Perks: 5 Star Hotel Membership, Free Site Visit, Hassle-free Construction, EOI Completion Benefit.",
  rotateMs: 4500,
};

const OFFERS: OfferItem[] = [
  { id: 3, bookings: 3, worth: "₹5 – ₹6 Lakh", bonus: null, color: "#e11d2e" },
  { id: 5, bookings: 5, worth: "₹10 – ₹12 Lakh", bonus: "8%", color: "#2447c9" },
];

function Car({ color }: { color: string }) {
  return (
    <svg className="w-full relative block overflow-visible animate-dcx-bob" viewBox="0 0 160 64" aria-hidden="true">
      <defs>
        <linearGradient id="dcxBeam" x1="0" x2="1">
          <stop offset="0" stopColor="#fff6c8" stopOpacity=".95" />
          <stop offset="1" stopColor="#fff6c8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dcxGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe0ff" />
          <stop offset="1" stopColor="#1c2c4f" />
        </linearGradient>
        <linearGradient id="dcxShine" x1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".38" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <polygon className="animate-dcx-beam" points="150,36 240,10 240,66 150,42" fill="url(#dcxBeam)" />

      <path
        d="M8 44 L8 36 Q8 31 14 30 L34 28 L50 12 Q52 10 56 10 L106 10 Q110 10 113 13 L128 28 L146 31 Q152 32 152 38 L152 44 Q152 47 149 47 L11 47 Q8 47 8 44 Z"
        fill={color}
      />
      <path
        d="M8 36 Q8 31 14 30 L34 28 L50 12 Q52 10 56 10 L106 10 Q110 10 113 13 L128 28 L146 31 Q152 32 152 38 L152 38 H8 Z"
        fill="url(#dcxShine)"
      />

      <path d="M53 15 L80 15 L80 28 L42 28 Z" fill="url(#dcxGlass)" />
      <path d="M84 15 L105 15 L119 28 L84 28 Z" fill="url(#dcxGlass)" />

      <path d="M12 39 H148" stroke="rgba(255,255,255,.35)" strokeWidth="1" />

      <rect x="143" y="33" width="9" height="5" rx="2" fill="#fff7cf" className="animate-dcx-flash [filter:drop-shadow(0_0_4px_#fff3b0)]" />
      <rect x="8" y="33" width="5" height="5" rx="1.5" fill="#ff3b3b" className="[filter:drop-shadow(0_0_3px_#ff3b3b)]" />

      {[38, 124].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="47" r="12" fill="#0b0b12" />
          <g className="origin-[var(--cx)_47px] [transform-box:view-box] animate-dcx-wheel" style={{ "--cx": `${cx}px` } as React.CSSProperties}>
            <circle cx={cx} cy="47" r="7.5" fill="#d9dee6" />
            {[0, 60, 120].map((r) => (
              <rect key={r} x={cx - 0.8} y="40" width="1.6" height="14" fill="#5b6472" transform={`rotate(${r} ${cx} 47)`} />
            ))}
            <circle cx={cx} cy="47" r="2" fill="#0b0b12" />
          </g>
        </g>
      ))}
    </svg>
  );
}

export default function DiwaliCarOffer() {
  const [i, setI] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % OFFERS.length), CFG.rotateMs);
    return () => clearInterval(t);
  }, [paused]);

  const o = OFFERS[i];

  return (
    <>
      <aside
        className="relative flex-none w-[96%] md:w-[min(400px,100%)] mx-auto h-[157px] z-6 animate-dcx-enter group select-none"
        title={CFG.fine}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Car reward offer for channel partners"
      >
        <div className="relative box-border w-full h-full grid grid-rows-[auto_1fr_auto] row-gap-[6px] overflow-hidden p-[10px_12px] rounded-[20px] text-white border border-[#ffd98a]/30 bg-[radial-gradient(120%_90%_at_100%_0%,rgba(255,190,80,0.2)_0%,transparent_55%),linear-gradient(160deg,#2a1236_0%,#190a26_55%,#0e0618_100%)] shadow-lg">
          
          <div className="flex items-center justify-between gap-2 z-4">
            <span className="inline-flex items-center gap-[6px] py-[3px] px-[9px] text-[9.5px] font-bold tracking-[0.08em] uppercase text-[#2a1236] bg-gradient-to-r from-[#ffd98a] to-[#ffb84a] rounded-full">
              <span className="w-[6px] h-[6px] rounded-full bg-[#d6122b] animate-dcx-pulse" />
              {CFG.eyebrow}
            </span>
            <span className="text-[9.5px] font-semibold tracking-[0.14em] uppercase text-[#ffd98a]">
              {CFG.tag}
            </span>
          </div>

          <div className="min-h-0 flex items-stretch justify-between gap-2 z-4">
            <div className="min-w-0 self-center animate-dcx-pop" key={`r${o.id}`}>
              <h3 className="m-0 font-serif text-[17px] sm:text-[19px] leading-[1.15] font-bold text-white">
                Win a{" "}
                <em className="not-italic bg-gradient-to-r from-[#ffd98a] via-[#fff6d0] via-[#ffb84a] to-[#ffd98a] bg-[length:250%_100%] bg-clip-text text-transparent animate-dcx-shine">
                  Dream Car
                </em>
              </h3>

              <div className="mt-[3px] text-[17px] sm:text-[19px] font-extrabold leading-[1.15] whitespace-nowrap text-[#ffd98a] [text-shadow:0_0_14px_rgba(255,190,80,0.45)]">
                {o.worth}
                <sup className="text-[10px] ml-[1px] font-normal">*</sup>
              </div>

              <div className="flex items-center gap-[6px] mt-[3px] text-[11px] whitespace-nowrap text-white/80 font-medium">
                {o.bookings} bookings
                {o.bonus && (
                  <span className="py-[1px] px-[7px] text-[10px] font-extrabold text-[#2a1236] bg-gradient-to-r from-[#ffd98a] to-[#ffb84a] rounded-full animate-dcx-ring">
                    + {o.bonus} commission
                  </span>
                )}
              </div>
            </div>

            <div className="relative flex-none w-[130px] min-[430px]:w-[180px] overflow-hidden rounded-[14px] border border-[#ffd98a]/30 bg-gradient-to-b from-[#1b1040] via-[#5a2a62] to-[#ff8a47]">
              <div className="absolute inset-0 bottom-1/2 opacity-45 animate-dcx-stars bg-[radial-gradient(1.5px_1.5px_at_12%_20%,#fff,transparent),radial-gradient(1.5px_1.5px_at_38%_12%,#fff,transparent),radial-gradient(1px_1px_at_62%_28%,#fff,transparent),radial-gradient(1.5px_1.5px_at_85%_16%,#fff,transparent),radial-gradient(1px_1px_at_74%_6%,#fff,transparent)]" />
              
              <div className="absolute -right-[18px] bottom-[10px] w-16 h-16 rounded-full bg-[radial-gradient(circle,#fff1b8_0_28%,rgba(255,196,90,0.55)_45%,transparent_70%)] animate-dcx-sun" />
              
              <div
                className="absolute left-0 right-0 bottom-[9px] h-[22px] opacity-55 animate-dcx-hills"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='22'%3E%3Cpath fill='%230a0414' d='M0 22V14h8v-4h6v6h6V8h8v14zM40 22V16l6-8 6 8v6zM62 22V12h7V6h7v8h8v8z'/%3E%3Cpath stroke='%230a0414' stroke-width='1.6' fill='none' d='M30 22V9M30 9q-7-2-10 4M30 9q7-2 10 4M30 9q-2-5-8-5M30 9q2-5 8-5'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat-x",
                  backgroundPosition: "0 100%",
                  backgroundSize: "90px 22px",
                }}
              />

              <div className="absolute inset-0 pointer-events-none">
                <i className="absolute h-[1.5px] w-[34px] rounded-xs top-[38%] bg-gradient-to-r from-transparent to-[#ffeab4]/90 animate-dcx-streak" />
                <i className="absolute h-[1.5px] w-[34px] rounded-xs top-[56%] bg-gradient-to-r from-transparent to-[#ffeab4]/90 animate-dcx-streak [animation-delay:0.27s]" />
                <i className="absolute h-[1.5px] w-[34px] rounded-xs top-[70%] bg-gradient-to-r from-transparent to-[#ffeab4]/90 animate-dcx-streak [animation-delay:0.54s]" />
              </div>

              <div className="absolute left-0 right-0 bottom-0 h-[10px] bg-[repeating-linear-gradient(90deg,#ffd98a_0_12px,transparent_12px_26px)_0_50%/100%_1.5px_no-repeat,linear-gradient(#1a0f26,#0b0614)] animate-dcx-road" />

              <div className="absolute left-[14px] min-[430px]:left-[22px] bottom-[6px] w-[88px] min-[430px]:w-[104px] animate-dcx-drive-in" key={o.id}>
                <div className="absolute left-[4px] bottom-[12px]">
                  <b className="absolute w-[7px] h-[7px] rounded-full bg-white/50 animate-dcx-puff" />
                  <b className="absolute w-[7px] h-[7px] rounded-full bg-white/50 animate-dcx-puff [animation-delay:0.3s]" />
                  <b className="absolute w-[7px] h-[7px] rounded-full bg-white/50 animate-dcx-puff [animation-delay:0.6s]" />
                </div>

                <Car color={o.color} />

                <div className="absolute left-[6%] right-[4%] -bottom-[2px] h-[6px] rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.7),transparent)]" />

                <div className="absolute left-1/2 top-[40%] w-0 h-0 pointer-events-none">
                  {Array.from({ length: 10 }).map((_, n) => (
                    <s
                      key={n}
                      className="absolute -left-[2px] -top-[2px] w-[4px] h-[4px] rounded-full bg-[#ffe28a] shadow-[0_0_6px_2px_rgba(255,217,138,0.9)] animate-dcx-burst"
                      style={{ "--a": `${n * 36}deg` } as React.CSSProperties}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 z-4">
            <div className="flex gap-[3px] p-[3px] rounded-[11px] bg-white/10" role="tablist">
              {OFFERS.map((x, n) => (
                <button
                  key={x.id}
                  role="tab"
                  aria-selected={n === i}
                  className={`relative overflow-hidden py-[6px] px-[10px] border-0 rounded-[8px] font-sans text-[11px] font-semibold leading-none whitespace-nowrap cursor-pointer transition-all duration-200 hover:-translate-y-px hover:text-white focus-visible:outline-2 focus-visible:outline-[#ffd98a] ${
                    n === i
                      ? "text-[#2a1236] bg-gradient-to-r from-[#ffd98a] to-[#ffb84a] shadow-xs"
                      : "text-white/75 bg-transparent"
                  }`}
                  onClick={() => setI(n)}
                >
                  {x.bookings} Bookings
                  {n === i && !paused && (
                    <span
                      className="absolute left-0 bottom-0 h-[2px] w-full bg-[#2a1236]/60 origin-left animate-dcx-bar"
                      style={{ animationDuration: `${CFG.rotateMs}ms` }}
                      key={`p${i}`}
                    />
                  )}
                </button>
              ))}
            </div>

            <Link
              href={CFG.href}
              className="relative overflow-hidden inline-flex items-center gap-[6px] py-[9px] px-4 rounded-[11px] text-[12.5px] font-bold leading-none whitespace-nowrap text-[#2a1236] bg-gradient-to-r from-[#ffd98a] via-[#fff0b8] to-[#ffb84a] animate-dcx-cta hover:-translate-y-0.5 hover:scale-105 transition-transform duration-200 shadow-md mt-1"
            >
              <span>{CFG.cta}</span>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-dcx-nudge"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
              <span className="absolute top-0 -left-[70%] w-[40%] h-full bg-gradient-to-r from-transparent via-white/85 to-transparent -skew-x-[20deg] animate-dcx-sheen-cta pointer-events-none" />
            </Link>
          </div>
        </div>
      </aside>

      <style jsx global>{`
        @keyframes dcx-enter {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: none; }
        }
        @keyframes dcx-shine {
          to { background-position: 250% 0; }
        }
        @keyframes dcx-pulse {
          0% { box-shadow: 0 0 0 0 rgba(214, 18, 43, 0.7); }
          100% { box-shadow: 0 0 0 7px rgba(214, 18, 43, 0); }
        }
        @keyframes dcx-road {
          to { background-position: -26px 50%, 0 0; }
        }
        @keyframes dcx-hills {
          to { background-position: -90px 100%; }
        }
        @keyframes dcx-streak {
          from { left: 105%; opacity: 0; }
          15% { opacity: 1; }
          to { left: -35%; opacity: 0; }
        }
        @keyframes dcx-drive-in {
          from { transform: translateX(-190px); opacity: 0; }
          55% { opacity: 1; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes dcx-bob {
          0%, 100% { margin-top: 0; }
          50% { margin-top: -1.5px; }
        }
        @keyframes dcx-wheel {
          to { transform: rotate(360deg); }
        }
        @keyframes dcx-beam {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @keyframes dcx-flash {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes dcx-puff {
          from { transform: translateX(0) scale(0.6); opacity: 0.6; }
          to { transform: translateX(-26px) translateY(-6px) scale(1.8); opacity: 0; }
        }
        @keyframes dcx-burst {
          from { transform: rotate(var(--a)) translateX(0) scale(1); opacity: 1; }
          to { transform: rotate(var(--a)) translateX(46px) scale(0.2); opacity: 0; }
        }
        @keyframes dcx-stars {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
        @keyframes dcx-sun {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.18); opacity: 1; }
        }
        @keyframes dcx-bar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes dcx-pop {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes dcx-ring {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes dcx-cta {
          0% { box-shadow: 0 0 0 0 rgba(255, 190, 80, 0.55); }
          100% { box-shadow: 0 0 0 10px rgba(255, 190, 80, 0); }
        }
        @keyframes dcx-nudge {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        @keyframes dcx-sheen-cta {
          0%, 55% { left: -70%; }
          100% { left: 150%; }
        }

        .animate-dcx-enter { animation: dcx-enter 0.8s ease-out 0.3s both; }
        .animate-dcx-pulse { animation: dcx-pulse 1.1s ease-out infinite; }
        .animate-dcx-pop { animation: dcx-pop 0.5s cubic-bezier(0.2, 1.2, 0.4, 1) both; }
        .animate-dcx-shine { animation: dcx-shine 3.2s linear infinite; }
        .animate-dcx-ring { animation: dcx-ring 1.4s ease-in-out infinite; }
        .animate-dcx-stars { animation: dcx-stars 2.2s ease-in-out infinite; }
        .animate-dcx-sun { animation: dcx-sun 3s ease-in-out infinite; }
        .animate-dcx-hills { animation: dcx-hills 3.2s linear infinite; }
        .animate-dcx-road { animation: dcx-road 0.4s linear infinite; }
        .animate-dcx-streak { animation: dcx-streak 0.8s linear infinite; }
        .animate-dcx-drive-in { animation: dcx-drive-in 1.1s cubic-bezier(0.18, 0.85, 0.25, 1) both; }
        .animate-dcx-bob { animation: dcx-bob 0.42s ease-in-out infinite; }
        .animate-dcx-wheel { animation: dcx-wheel 0.35s linear infinite; }
        .animate-dcx-beam { animation: dcx-beam 1.2s ease-in-out infinite; }
        .animate-dcx-flash { animation: dcx-flash 1.2s ease-in-out infinite; }
        .animate-dcx-puff { animation: dcx-puff 0.9s ease-out infinite; }
        .animate-dcx-burst { animation: dcx-burst 0.9s ease-out 0.9s both; }
        .animate-dcx-bar { animation: dcx-bar linear both; }
        .animate-dcx-cta { animation: dcx-cta 1.8s ease-out infinite; }
        .animate-dcx-nudge { animation: dcx-nudge 1.2s ease-in-out infinite; }
        .animate-dcx-sheen-cta { animation: dcx-sheen-cta 2.6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}