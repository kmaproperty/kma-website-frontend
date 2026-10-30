// "use client";

// import { useCallback, useEffect } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight, Heart, Share2, X } from "lucide-react";

// export interface ViewerImage {
//   url: string;
//   sectionName: string;
// }

// interface GalleryImageViewerProps {
//   images: ViewerImage[];
//   currentIndex: number;
//   propertyName: string;
//   onClose: () => void;
//   onIndexChange: (index: number) => void;
//   showVerified?: boolean;
// }

// export function GalleryImageViewer({
//   images,
//   currentIndex,
//   propertyName,
//   onClose,
//   onIndexChange,
//   showVerified = false,
// }: GalleryImageViewerProps) {
//   const total = images.length;
//   const current = images[currentIndex];
//   const currentNumber = currentIndex + 1;

//   const goPrev = useCallback(() => {
//     onIndexChange((currentIndex - 1 + total) % total);
//   }, [currentIndex, total, onIndexChange]);

//   const goNext = useCallback(() => {
//     onIndexChange((currentIndex + 1) % total);
//   }, [currentIndex, total, onIndexChange]);

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//       if (e.key === "ArrowLeft") goPrev();
//       if (e.key === "ArrowRight") goNext();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [onClose, goPrev, goNext]);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, []);

//   const handleShare = async () => {
//     if (typeof navigator !== "undefined" && navigator.share) {
//       try {
//         await navigator.share({
//           title: propertyName,
//           text: `${propertyName} - ${current?.sectionName ?? "Gallery"}`,
//           url: window.location.href,
//         });
//       } catch {
//         await navigator.clipboard?.writeText(window.location.href);
//       }
//     } else {
//       await navigator.clipboard?.writeText(window.location.href);
//     }
//   };

//   if (!current) return null;

//   return (
//     <div className="fixed inset-0 z-100 flex flex-col bg-[#1a1a1a]">
//       {/* Header */}
//       <header className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6">
//         <button
//           type="button"
//           onClick={onClose}
//           className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
//           aria-label="Close"
//         >
//           <X className="h-6 w-6" />
//         </button>
//         <span className="text-sm font-medium text-white sm:text-base">
//           {currentNumber}/{total}
//         </span>
//         {/* <div className="flex items-center gap-2">
//           <button
//             type="button"
//             className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
//             aria-label="Favorite"
//           >
//             <Heart className="h-5 w-5 stroke-[1.5]" />
//           </button>
//           <button
//             type="button"
//             onClick={handleShare}
//             className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
//             aria-label="Share"
//           >
//             <Share2 className="h-5 w-5" />
//           </button>
//         </div> */}
//       </header>

//       {/* Main image area with side arrows */}
//       <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 py-4 sm:px-4">
//         <button
//           type="button"
//           onClick={goPrev}
//           className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 sm:left-4"
//           aria-label="Previous image"
//         >
//           <ChevronLeft className="h-7 w-7" />
//         </button>

//         <div className="relative flex h-full w-full max-w-5xl items-center justify-center">
//           <div className="relative h-full w-full">
//             <Image
//               src={current.url}
//               alt={`${propertyName} - ${current.sectionName}`}
//               fill
//               className="object-contain"
//               unoptimized={!current.url.startsWith("/")}
//               priority
//               sizes="100vw"
//             />
//             {showVerified && (
//               <span className="absolute right-3 top-3 rounded bg-[#22c55e] px-2 py-1 text-xs font-medium text-white">
//                 Verified
//               </span>
//             )}
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={goNext}
//           className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 sm:right-4"
//           aria-label="Next image"
//         >
//           <ChevronRight className="h-7 w-7" />
//         </button>
//       </div>

//       {/* Caption */}
//       <div className="shrink-0 px-4 pb-6 pt-2 text-center sm:px-6">
//         <p className="text-base font-medium text-white sm:text-lg">{propertyName}</p>
//         <p className="mt-1 text-sm text-white/80">{current.sectionName}</p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface ViewerImage {
  url: string;
  sectionName: string;
}

interface GalleryImageViewerProps {
  images: ViewerImage[];
  currentIndex: number;
  propertyName: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  showVerified?: boolean;
}

export function GalleryImageViewer({
  images,
  currentIndex,
  propertyName,
  onClose,
  onIndexChange,
  showVerified = false,
}: GalleryImageViewerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = images.length;
  const current = images[currentIndex];
  const currentNumber = currentIndex + 1;

  const goPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      onIndexChange((currentIndex - 1 + total) % total);
    },
    [currentIndex, total, onIndexChange]
  );

  const goNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      onIndexChange((currentIndex + 1) % total);
    },
    [currentIndex, total, onIndexChange]
  );

  const handleClose = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      onClose();
    },
    [onClose]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goPrev, goNext]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!mounted || !current) return null;

  const viewerContent = (
    <>
      <button
        type="button"
        onClick={handleClose}
        className="fixed top-18 md:top-4 left-2 md:left-4 z-30 md:z-[999999] flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 active:scale-95 transition-all cursor-pointer backdrop-blur-xs shadow-lg"
        style={{ pointerEvents: "auto" }}
        aria-label="Close"
      >
        <X className="h-6 w-6 pointer-events-none" />
      </button>

      <div 
        className="fixed top-20 md:top-5 right-2 md:right-5 z-30 md:z-[999999] px-3 py-1 rounded-full bg-black/50 backdrop-blur-xs text-sm font-semibold text-white select-none shadow-md"
      >
        {currentNumber}/{total}
      </div>

     
      <div className="fixed inset-0 z-[20] flex flex-col bg-[#1a1a1a]">
        
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 py-4 sm:px-6">
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 sm:left-6 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/85 active:scale-95 transition-all cursor-pointer shadow-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8 pointer-events-none" />
          </button>

          <div className="relative flex h-full w-full max-w-5xl items-center justify-center pointer-events-none">
            <div className="relative h-full w-full">
              <Image
                src={current.url}
                alt={`${propertyName} - ${current.sectionName}`}
                fill
                className="object-contain select-none"
                unoptimized={!current.url.startsWith("/")}
                priority
                sizes="100vw"
              />
              {showVerified && (
                <span className="absolute right-3 top-3 z-10 rounded bg-[#22c55e] px-2 py-1 text-xs font-medium text-white shadow">
                  Verified
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 sm:right-6 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/85 active:scale-95 transition-all cursor-pointer shadow-md"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8 pointer-events-none" />
          </button>
        </div>

        <div className="relative z-30 shrink-0 px-4 pb-6 pt-2 text-center sm:px-6">
          <p className="text-base font-semibold text-white sm:text-lg">{propertyName}</p>
          <p className="mt-1 text-sm text-white/80">{current.sectionName}</p>
        </div>
      </div>
    </>
  );

  return createPortal(viewerContent, document.body);
}