"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronRight,
  Heart,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const cleanImageUrl = (rawKey?: string | null): string => {
  if (!rawKey) return "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80";

  if (rawKey.includes("https://res.cloudinary.com/")) {
    const cloudIndex = rawKey.indexOf("https://res.cloudinary.com/");
    return rawKey.substring(cloudIndex);
  }

  if (rawKey.includes(".amazonaws.com/http")) {
    const splitIndex = rawKey.indexOf(".amazonaws.com/");
    return rawKey.substring(splitIndex + ".amazonaws.com/".length);
  }

  if (rawKey.startsWith("http://") || rawKey.startsWith("https://")) {
    return rawKey;
  }

  return `https://kma-property.s3.ap-south-1.amazonaws.com/${rawKey.replace(/^\/+/, "")}`;
};

const formatSalePrice = (price: number | string | null | undefined): string => {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (!num || isNaN(num) || num <= 0) {
    return "Price on Request";
  }

  if (num >= 10000000) {
    const cr = num / 10000000;
    return `₹ ${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2).replace(/\.?0+$/, "")} Cr`;
  }
  if (num >= 100000) {
    const lac = num / 100000;
    return `₹ ${lac % 1 === 0 ? lac.toFixed(0) : lac.toFixed(2).replace(/\.?0+$/, "")} Lac`;
  }
  if (num >= 1000) {
    const k = num / 1000;
    return `₹ ${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1).replace(/\.?0+$/, "")} K`;
  }
  return `₹ ${new Intl.NumberFormat("en-IN").format(num)}`;
};

const getTimeAgo = (item: any): string => {
  let createdDate: Date | null = null;

  if (item?.createdAt) {
    createdDate = new Date(item.createdAt);
  } else {
    const targetString = item?.imageUrl || item?.images?.[0]?.fileKey || "";
    const match = targetString.match(/(\d{13})/);
    if (match && match[1]) {
      const timestamp = parseInt(match[1], 10);
      createdDate = new Date(timestamp);
    }
  }

  if (!createdDate || isNaN(createdDate.getTime())) {
    return "Recently added";
  }

  const now = new Date();
  const diffInMs = Math.abs(now.getTime() - createdDate.getTime());
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Added today";
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }
  const months = Math.floor(diffInDays / 30);
  return `${months} ${months === 1 ? "month" : "months"} ago`;
};

const cleanText = (str?: string | null): string => {
  if (!str) return "";
  return str.replace(/<[^>]*>?/gm, "").trim();
};

const DEFAULT_GURGAON_CITY_ID = "e8894ea7-b8fc-43da-b983-b1d43c77597e";

export default function HighDemandProjects() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  // 🌟 API Query with provided Sale listingTypeId endpoint
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["high-demand-sale-properties-by-id"],
    queryFn: async () => {
      const apiUrl =
        `https://kmaglobalproperty.com/api/backend/end-user/properties?page=1&limit=20&cityId=${DEFAULT_GURGAON_CITY_ID}&listingTypeIds=ea43e344-48aa-4b75-bae6-117a070a1ef8&sortBy=price&sortOrder=ASC`;

      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch sale properties");
      }

      const json = await res.json();
      const rawList = json?.properties || json?.data || [];

      return rawList.slice(0, 10);
    },
    staleTime: 1000 * 60 * 5,
  });

//   const toggleFavorite = (e: React.MouseEvent, id: string) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setFavoriteIds((prev) => {
//       const next = new Set(prev);
//       if (next.has(id)) next.delete(id);
//       else next.add(id);
//       return next;
//     });
//   };

  return (
    <section className="w-full py-10 md:py-16 bg-gradient-to-b from-white via-blue-200 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          
          <div className="lg:col-span-8 xl:col-span-9 min-w-0 flex flex-col justify-between">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#05085E] tracking-tight">
                  Projects in High Demand
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                  The most explored properties for sale in Gurugram
                </p>
              </div>
            </div>

            <div className="relative group/slider">
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next slide"
                className="hidden sm:flex absolute -right-3 top-[36%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white text-slate-800 border border-slate-200 shadow-md items-center justify-center hover:bg-[#05085E] hover:text-white hover:border-[#05085E] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="animate-pulse space-y-3 p-4 bg-white rounded-2xl border border-slate-200">
                      <div className="h-44 bg-slate-200 rounded-xl w-full" />
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                      <div className="h-3 bg-slate-200 rounded w-1/2" />
                      <div className="h-4 bg-slate-200 rounded w-1/3" />
                    </div>
                  ))}
                </div>
              ) : properties.length === 0 ? (
                <div className="h-48 rounded-2xl border border-dashed border-slate-200 bg-white flex flex-col items-center justify-center text-slate-400 text-sm">
                  <p>No sale properties available in this location right now.</p>
                </div>
              ) : (
                <Swiper
                  onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  modules={[Navigation, Autoplay]}
                  spaceBetween={18}
                  slidesPerView={1}
                  loop={properties.length > 3}
                  autoplay={{
                    delay: 3800,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  breakpoints={{
                    480: {
                      slidesPerView: 1.3,
                      spaceBetween: 16,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 18,
                    },
                    1024: {
                      slidesPerView: 2.7,
                      spaceBetween: 20,
                    },
                    1280: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                  className="w-full !py-2"
                >
                  {properties.map((item: any, idx: number) => {
                    const coverPhoto =
                      item?.images?.find((img: any) => img.isCoverImage) ||
                      item?.images?.[0];
                    const rawImage = coverPhoto?.url || item?.imageUrl || "";
                    const imageSrc = cleanImageUrl(rawImage);

                    const rawTitle = item?.society || item?.propertyName || "Prime Residential Property";
                    const propertyTitle = cleanText(rawTitle);

                    const bhk = item?.bhkType ? `${item.bhkType} ` : "";
                    const pType = item?.propertyType || "Apartment";
                    const locality = cleanText(item?.locality) || "Gurugram";

                    const priceFormatted = formatSalePrice(item?.price || item?.plotPrice);
                    const timeAgo = getTimeAgo(item);
                    const isFav = favoriteIds.has(item?.id || String(idx));

                    const cityId = item?.cityId || item?.city?.id || DEFAULT_GURGAON_CITY_ID;
                    const detailsUrl = `/projects/${cityId}/${item?.id}`;

                    return (
                      <SwiperSlide key={item?.id || idx} className="!h-auto flex">
                        
                        <Link
                          href={detailsUrl}
                          className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(5,8,94,0.08)] hover:border-blue-300 transition-all duration-300 flex flex-col justify-between p-3 sm:p-3.5 group/card cursor-pointer no-underline"
                        >
                          <div>
                            <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                              <img
                                src={imageSrc}
                                alt={propertyTitle}
                                className="w-full h-full object-cover group-hover/card:scale-106 transition-transform duration-500 ease-out"
                                loading="lazy"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80";
                                }}
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />

                              <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
                                For Sale
                              </span>

                              {/* Favorite Heart Button */}
                              {/* <button
                                type="button"
                                onClick={(e) => toggleFavorite(e, item?.id || String(idx))}
                                aria-label="Save to favorite"
                                className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer border border-white/20"
                              >
                                <Heart
                                  className={`w-4 h-4 transition-colors ${
                                    isFav ? "fill-red-500 text-red-500" : "text-white"
                                  }`}
                                />
                              </button> */}
                            </div>

                            <div className="pt-3 px-1 flex flex-col">
                              <h3 className="text-[15px] sm:text-base font-bold text-[#0F172A] group-hover/card:text-[#0070E0] transition-colors truncate leading-snug">
                                {propertyTitle}
                              </h3>

                              <p className="text-xs text-slate-500 truncate mt-1 font-medium">
                                {bhk}{pType} in {locality}
                              </p>

                              <div className="mt-2 flex items-center gap-1.5 text-sm sm:text-[15px] font-extrabold text-[#05085E]">
                                <span>{priceFormatted}</span>
                                <span className="text-xs font-normal text-slate-400">
                                  onwards
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-2.5 px-1 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>{timeAgo}</span>
                            </div>
                            {/* <span className="text-blue-600 font-semibold group-hover/card:translate-x-0.5 transition-transform flex items-center">
                              Explore <ChevronRight className="w-3 h-3 ml-0.5" />
                            </span> */}
                          </div>

                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 xl:col-span-3 w-full mt-22 hidden md:block">
            <div className="w-full bg-blue border border-[#D5EFE2] rounded-2xl p-5 md:p-6 shadow-xs flex flex-col justify-between relative overflow-hidden">
              <div className="z-10">
                <h3 className="text-lg md:text-xl font-extrabold text-[#ffffff] leading-snug">
                  Sell or rent faster at the right price!
                </h3>
                
                <p className="text-xs text-white/50 mt-2 font-medium">
                  List your property now
                </p>

                <div className="mt-5">
                  <Link
                    href="/user-flow?postProperty=true"
                    className="inline-block bg-[#0070E0] hover:bg-[#005EC2] active:scale-95 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm transition-all"
                  >
                    Post Property, It&apos;s FREE
                  </Link>
                </div>
              </div>
              </div>
              </div>

        </div>
      </div>
    </section>
  );
}