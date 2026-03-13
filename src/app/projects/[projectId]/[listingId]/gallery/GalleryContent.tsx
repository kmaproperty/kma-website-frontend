"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GalleryImageViewer, type ViewerImage } from "./GalleryImageViewer";

export interface GallerySection {
  name: string;
  imageUrls: string[];
}

interface GalleryContentProps {
  tabs: string[];
  sections: GallerySection[];
  videoUrls: string[];
  propertyName?: string;
  children?: React.ReactNode;
}

export function GalleryContent({ tabs, sections, videoUrls, propertyName = "Property", children }: GalleryContentProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const flatImages: ViewerImage[] = useMemo(
    () =>
      sections.flatMap((section) =>
        section.imageUrls.map((url) => ({ url, sectionName: section.name }))
      ),
    [sections]
  );

  const totalSections = sections.length + (videoUrls.length > 0 ? 1 : 0);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, totalSections);
  }, [totalSections]);

  useEffect(() => {
    if (totalSections === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        const byTop = [...intersecting].sort(
          (a, b) => (a.boundingClientRect?.()?.top ?? 0) - (b.boundingClientRect?.()?.top ?? 0)
        );
        const first = byTop[0];
        const id = first.target.getAttribute("data-section-index");
        if (id !== null) {
          const index = parseInt(id, 10);
          if (!Number.isNaN(index)) setActiveTabIndex(index);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    const timer = requestAnimationFrame(() => {
      for (let i = 0; i < totalSections; i++) {
        const el = document.getElementById(`gallery-section-${i}`);
        if (el) observer.observe(el);
      }
    });
    return () => {
      cancelAnimationFrame(timer);
      observer.disconnect();
    };
  }, [totalSections]);

  const scrollToSection = (index: number) => {
    setActiveTabIndex(index);
    const el = sectionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className="mt-6 border-b border-border">
        <div className="flex w-max min-w-full items-center gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              type="button"
              onClick={() => scrollToSection(idx)}
              className={`whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-md ${
                idx === activeTabIndex ? "border-[#13181F] text-text-black" : "border-transparent text-text-light-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid min-w-0 grid-cols-1 gap-8 xl:grid-cols-[1fr_360px]">
        <main className="min-w-0 space-y-8">
          {sections.map((section, sectionIdx) => (
            <section
              key={section.name}
              ref={(el) => {
                sectionRefs.current[sectionIdx] = el;
              }}
              data-section-index={sectionIdx}
              id={`gallery-section-${sectionIdx}`}
            >
              <h2 className="text-lg font-semibold text-text-black ">{section.name}</h2>
              <div className="mt-4 rounded-lg border border-[#D7D8DC] p-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {section.imageUrls.length > 0 ? (
                    section.imageUrls.map((src, idx) => {
                      const globalIndex =
                        sections
                          .slice(0, sectionIdx)
                          .reduce((sum, sec) => sum + sec.imageUrls.length, 0) + idx;
                      return (
                        <button
                          type="button"
                          key={`${section.name}-${idx}`}
                          className="relative h-[170px] overflow-hidden rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-[#05085E] focus:ring-offset-2"
                          onClick={() => setViewerIndex(globalIndex)}
                        >
                          <Image
                            src={src}
                            alt={`${section.name} ${idx + 1}`}
                            fill
                            className="object-cover"
                            unoptimized={!src.startsWith("/")}
                          />
                        </button>
                      );
                    })
                  ) : (
                    <p className="col-span-full text-sm text-text-gray">No photos in this category.</p>
                  )}
                </div>
              </div>
            </section>
          ))}

          {videoUrls.length > 0 ? (
            <section
              ref={(el) => {
                sectionRefs.current[sections.length] = el;
              }}
              data-section-index={sections.length}
              id={`gallery-section-${sections.length}`}
            >
              <h2 className="text-lg font-semibold text-text-black ">Videos</h2>
              <div className="mt-4 rounded-lg border border-[#D7D8DC] p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {videoUrls.map((url, idx) => (
                    <div
                      key={`video-${idx}`}
                      className="relative aspect-video overflow-hidden rounded-lg bg-black"
                    >
                      <video
                        src={url}
                        controls
                        className="h-full w-full object-contain"
                        preload="metadata"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </main>
        {children}
      </div>

      {viewerIndex !== null && flatImages.length > 0 && (
        <GalleryImageViewer
          images={flatImages}
          currentIndex={viewerIndex}
          propertyName={propertyName}
          onClose={() => setViewerIndex(null)}
          onIndexChange={setViewerIndex}
        />
      )}
    </>
  );
}
