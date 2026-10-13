"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  Building,
  Flame,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

import { projects, NewLaunchProject } from "@/lib/demandHeatData";

interface DemandHeatMapProps {
  data?: NewLaunchProject[];
  onViewNumber?: (project: NewLaunchProject) => void;
}

export default function DemandHeatMap({
  data = projects,
}: DemandHeatMapProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative w-full pt-30 md:pt-16 overflow-hidden bg-gradient-to-b from-white via-blue-100 to-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-slate-200/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[11px] font-extrabold tracking-wider text-[#1B2DBE] uppercase mb-2">
              <span>FRESH TO MARKET</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Newly Launched Projects
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 flex items-center gap-2 flex-wrap font-medium">
              <span>Pre-launch Pricing</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>First-Mover Advantage</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>RERA Approved</span>
            </p>
          </div>

          <Link
            href="/new-launch"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 hover:text-white hover:bg-slate-900 shadow-xs hover:shadow-md transition-all duration-200 whitespace-nowrap self-start sm:self-end group"
          >
            <span>See All Launches</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative group/slider mt-6">
          
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous Slide"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-slate-800 border border-slate-200 shadow-md flex items-center justify-center hover:bg-slate-900 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next Slide"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white text-slate-800 border border-slate-200 shadow-md flex items-center justify-center hover:bg-slate-900 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 22,
              },
              1024: {
                slidesPerView: 2.6,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="w-full !py-3"
          >
            {data.map((project) => {
              const configMeta = project.meta.find(
                (m) =>
                  m.key.toLowerCase().includes("config") ||
                  m.key.toLowerCase().includes("bhk")
              )?.val || project.meta[0]?.val || "Luxury Residences";

              const sizeMeta = project.meta.find(
                (m) =>
                  m.key.toLowerCase().includes("size") ||
                  m.key.toLowerCase().includes("area")
              )?.val;

              const isRera = project.badges.some(
                (b) => b.variant === "rera" || b.label.toLowerCase().includes("rera")
              );

              const isHot = project.badges.some(
                (b) => b.variant === "hot" || b.label.toLowerCase().includes("hot")
              );

              const projectLink = project.webUrl || `/projects/${project.id}`;
              const isExternal = projectLink.startsWith("http");

              return (
                <SwiperSlide key={project.id} className="!h-auto flex">
                  
                  <div className="group w-full bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                    
                    <div className="flex items-center justify-between px-4 pt-3.5 pb-2">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[#8F5900] text-[10px] font-extrabold uppercase tracking-wide">
                        <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>NEW LAUNCH</span>
                      </div>

                      {isHot && (
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                          <Flame className="w-3 h-3 fill-rose-500" />
                          <span>Hot Pick</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 sm:p-5 pt-1">
                      <div className="flex items-start gap-4">
                        
                        <div className="relative shrink-0 flex flex-col items-center">
                          <div className="w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-2xl overflow-hidden border-2 border-white shadow-md relative bg-slate-100 ring-2 ring-slate-100">
                            <Image
                              src={project.image}
                              alt={project.alt || project.name}
                              fill
                              sizes="90px"
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          {isRera && (
                            <div className="absolute -bottom-2 bg-slate-900 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-white">
                              <ShieldCheck className="w-3 h-3 text-emerald-400" strokeWidth={2.5} />
                              <span className="text-[9px] font-extrabold tracking-wider">RERA</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <Link
                            href={projectLink}
                            target={isExternal ? "_blank" : "_self"}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                          >
                            <h3 className="text-base sm:text-[17px] font-extrabold text-slate-900 hover:text-blue-700 transition-colors truncate leading-snug">
                              {project.name}
                            </h3>
                          </Link>

                          <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{project.location}</span>
                          </p>

                          <p className="text-[11px] text-slate-600 truncate flex items-center gap-1 mt-1 font-medium">
                            <Building className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{project.developer}</span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 bg-[#F8FAFC] border border-slate-200/70 rounded-xl p-3 flex items-center justify-between gap-2">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            Starting Price
                          </p>
                          <p className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                            {project.price}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="inline-block text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-md">
                            {configMeta}
                          </span>
                          {sizeMeta && (
                            <p className="text-[10px] text-slate-500 mt-1 font-medium truncate max-w-[120px]">
                              {sizeMeta}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-slate-200 bg-slate-50/70 px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-start md:justify-end gap-3">
                      {/* <div className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Zero Brokerage Verified</span>
                      </div> */}

                      <Link
                        href={projectLink}
                        target={isExternal ? "_blank" : "_self"}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="bg-blue-800 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

      </div>
    </section>
  );
}