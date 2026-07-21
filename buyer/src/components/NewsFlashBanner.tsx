// import React, { useState, useEffect, useRef } from "react";
// import { ArrowUpRight } from "lucide-react";

// interface NewsItem {
//   id: string;
//   title: string;
//   time: string;
//   url: string;
// }

// export default function NewsFlashBanner() {
//   const [newsList, setNewsList] = useState<NewsItem[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [animateTrigger, setAnimateTrigger] = useState(true);
//   const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     fetch("/api/market-news")
//       .then((res) => res.json())
//       .then((resData) => {
//         if (resData.success && resData.data && resData.data.length > 0) {
//           setNewsList(resData.data.slice(0, 3));
//         }
//       })
//       .catch((err) => console.warn("News flash delay:", err.message))
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     if (loading || newsList.length <= 1) return;

//     autoPlayRef.current = setInterval(() => {
//       setAnimateTrigger(false);
//       setTimeout(() => {
//         setCurrentIndex((prev) => (prev + 1) % newsList.length);
//         setAnimateTrigger(true);
//       }, 300);
//     }, 3000);

//     return () => {
//       if (autoPlayRef.current) clearInterval(autoPlayRef.current);
//     };
//   }, [loading, newsList]);

//   if (newsList.length === 0 && !loading) return null;

//   return (
//     <div className="w-[95%] lg:w-[57%] mx-auto px-4 my-3 md:my-10">
//       <div className="relative w-full h-[120px] md:h-[125px] bg-[#02013b] text-white rounded-[12px] p-5 md:p-6 shadow-[0_20px_50px_rgba(1,0,72,0.3)] border border-cyan-500/40 flex flex-col justify-center overflow-hidden">
        
//         <div className="absolute inset-0 rounded-[12px] border border-cyan-400/20 pointer-events-none" />

//         {loading ? (
//           <div className="space-y-3 animate-pulse">
//             <div className="flex items-center gap-4">
//               <div className="h-5 bg-slate-800 rounded w-24" />
//               <div className="h-3 bg-slate-800 rounded w-32" />
//             </div>
//             <div className="h-6 bg-slate-800 rounded w-3/4" />
//           </div>
//         ) : (
//           <div className="flex flex-col justify-between h-full">
            
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-1.5 bg-[#ef4444] px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse">
//                   <span className="w-1.5 h-1.5 rounded-full bg-white" />
//                   LIVE
//                 </div>

//                 <div className="hidden md:flex items-center gap-1.5 text-emerald-400">
//                   <svg 
//                     xmlns="http://www.w3.org/2000/svg" 
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     strokeWidth={2.5} 
//                     stroke="currentColor" 
//                     className="w-4 h-4"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
//                   </svg>
//                   <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">
//                     MARKET TRENDS
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4">
//                 <span className="hidden sm:inline text-[10px] md:text-xs text-slate-400 font-light">
//                   Updated {newsList[currentIndex]?.time || "just now"}
//                 </span>
                
//                 <a
//                   href={newsList[currentIndex]?.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-1.5 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-all duration-300 active:scale-95 group/btn"
//                 >
//                   <span>Read Full Story</span>
//                   <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
//                 </a>
//               </div>
//             </div>

//             <div className="flex-1 flex items-center mt-2.5">
//               <div 
//                 className={`flex items-start md:items-center gap-3.5 transition-all duration-300 ease-out transform ${
//                   animateTrigger ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
//                 }`}
//               >
//                 <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-[#02013b] shrink-0 mt-0.5 md:mt-0 shadow-sm">
//                   <svg 
//                     xmlns="http://www.w3.org/2000/svg" 
//                     viewBox="0 0 24 24" 
//                     fill="currentColor" 
//                     className="w-4 h-4 text-red-500"
//                   >
//                     <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
//                   </svg>
//                 </div>

//                 <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white tracking-wide leading-tight line-clamp-2 md:line-clamp-2 pr-4">
//                   {newsList[currentIndex]?.title}
//                 </h2>
//               </div>
//             </div>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  time: string;
  url: string;
}

export default function NewsFlashBanner() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [animateTrigger, setAnimateTrigger] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch(`/api/market-news?t=${Date.now()}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data && resData.data.length > 0) {
          
          setNewsList(resData.data);

          if (typeof window !== "undefined") {
            const savedIndexStr = window.sessionStorage.getItem("banner_news_index");
            let savedIndex = savedIndexStr ? parseInt(savedIndexStr, 10) : 0;

            if (savedIndex >= resData.data.length) {
              savedIndex = 0;
            }

            let finalIndex = savedIndex;
            if (savedIndexStr) {
              finalIndex = (savedIndex + 1) % resData.data.length;
            }

            window.sessionStorage.setItem("banner_news_index", finalIndex.toString());
            setCurrentIndex(finalIndex);
          }
        }
      })
      .catch((err) => console.warn("News flash delay:", err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || newsList.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setAnimateTrigger(false);
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % newsList.length;
          
          if (typeof window !== "undefined") {
            window.sessionStorage.setItem("banner_news_index", nextIndex.toString());
          }
          
          return nextIndex;
        });
        setAnimateTrigger(true);
      }, 300);
    }, 4000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [loading, newsList]);

  if (newsList.length === 0 && !loading) return null;

  return (
    <div className="w-[95%] lg:w-[57%] mx-auto px-4 my-3 md:my-10">
      <div className="relative w-full h-[120px] md:h-[125px] bg-[#02013b] text-white rounded-[12px] p-5 md:p-6 shadow-[0_20px_50px_rgba(1,0,72,0.3)] border border-cyan-500/40 flex flex-col justify-center overflow-hidden">
        
        <div className="absolute inset-0 rounded-[12px] border border-cyan-400/20 pointer-events-none" />

        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="h-5 bg-slate-800 rounded w-24" />
              <div className="h-3 bg-slate-800 rounded w-32" />
            </div>
            <div className="h-6 bg-slate-800 rounded w-3/4" />
          </div>
        ) : (
          <div className="flex flex-col justify-between h-full">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-[#ef4444] px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  LIVE
                </div>

                <div className="hidden md:flex items-center gap-1.5 text-emerald-400">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2.5} 
                    stroke="currentColor" 
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.281m5.94 2.28l-2.28 5.941" />
                  </svg>
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">
                    MARKET TRENDS
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-[10px] md:text-xs text-slate-400 font-light">
                  Updated {newsList[currentIndex]?.time || "just now"}
                </span>
                
                <a
                  href={newsList[currentIndex]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-all duration-300 active:scale-95 group/btn"
                >
                  <span>Read Full Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>
            </div>

            <div className="flex-1 flex items-center mt-2.5">
              <div 
                className={`flex items-start md:items-center gap-3.5 transition-all duration-300 ease-out transform ${
                  animateTrigger ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                }`}
              >
                <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-[#02013b] shrink-0 mt-0.5 md:mt-0 shadow-sm">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-4 h-4 text-red-500"
                  >
                    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                  </svg>
                </div>

                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white tracking-wide leading-tight line-clamp-2 md:line-clamp-2 pr-4">
                  {newsList[currentIndex]?.title}
                </h2>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}