"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useId, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getChannelPartnerListApiHandler,
  type ChannelPartner,
  type GetChannelPartnerListPayload,
  type GetChannelPartnerListResponse,
} from "@/services/homeService";
import { joinUrl } from "@/lib/helper";
import { useSelector } from "react-redux";
import { getSelectedCity } from "@/store/homeHeaderSlice";
import ContactUsPopup from "@/components/contactUsPopup";

const PROFILE_BASE = process.env.NEXT_PUBLIC_AWS_URL;
const DEFAULT_PAGE_SIZE = 12;

function Star({
  fill = 100,
  className = "h-4 w-4",
}: {
  fill?: number;
  className?: string;
}) {
  const id = useId();
  const gradientId = `star-${id.replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id={gradientId}>
          <stop offset={`${fill}%`} stopColor="currentColor" />
          <stop offset={`${fill}%`} stopColor="currentColor" opacity={0.3} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M12 2.5l2.97 6.02 6.65.97-4.81 4.69 1.14 6.64L12 17.77 6.05 20.82l1.14-6.64-4.81-4.69 6.65-.97L12 2.5z"
      />
    </svg>
  );
}

function ChannelPartnerCard({
  partner,
  onContact,
}: {
  partner: ChannelPartner;
  onContact?: (partner: ChannelPartner) => void;
}) {
  const profileSrc = joinUrl(PROFILE_BASE, partner.profile_image);
  const rating = Number(partner.rating ?? 4.2);
  const ratingText = Number.isFinite(rating) ? rating.toFixed(1) : "4.2";
  const cityList = partner.cities
    ?.split(",")
    .map((c) => c.trim())
    .filter(Boolean) ?? [];

  return (
    <article className="bg-white rounded-2xl border border-[#EEF0F4] shadow-[0_6px_24px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
      <div className="relative aspect-square w-full bg-[#F2F2F2]">
        {profileSrc ? (
          <Image
            src={profileSrc}
            alt={`${partner.name} profile`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-text-black uppercase">
            {partner.name?.charAt(0) ?? "?"}
          </div>
        )}
        <span className="absolute top-3 right-3 bg-[#7C3AED] text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
          KMA Expert Pro
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-text-black text-lg font-semibold leading-tight truncate">
          {partner.name}
        </h3>
        <div className="flex items-center gap-1.5 mt-1.5 text-sm text-text-gray">
          <Star fill={Math.min(100, (rating / 5) * 100)} className="h-4 w-4 text-[#F7BB06]" />
          <span className="font-medium text-text-black">{ratingText}</span>
          <span>4 Ratings</span>
        </div>
        {cityList.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {cityList.slice(0, 2).map((city, i) => (
              <span
                key={`${city}-${i}`}
                className="px-3 py-1 text-xs font-medium bg-[#7C3AED] text-white rounded-lg"
              >
                {city}
              </span>
            ))}
          </div>
        )}
        <p className="mt-3 text-sm text-text-gray">
          {partner.experience_years ?? 0} Years Experience
          <span className="mx-2 text-[#D9D9D9]">|</span>
          {partner.property_count ?? 0} Properties
        </p>
        <button
          type="button"
          onClick={() => onContact?.(partner)}
          className="mt-4 w-full py-3 px-6 rounded-xl bg-blue text-white font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Image
            src="/assets/call-ring-white.svg"
            width={18}
            height={18}
            alt=""
          />
          Contact Now
        </button>
      </div>
    </article>
  );
}

export default function ChannelPartnerPageClient() {
  const selectedCity = useSelector(getSelectedCity);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [contactPopupOpen, setContactPopupOpen] = useState(false);

  const payload: GetChannelPartnerListPayload = {
    search: search || null,
    city: selectedCity?.name ?? null,
    experience: null,
    properties: null,
    page: String(page),
    limit: String(DEFAULT_PAGE_SIZE),
  };

  const { data, isLoading } = useQuery<
    GetChannelPartnerListResponse,
    Error,
    GetChannelPartnerListResponse
  >({
    queryKey: ["channel-partner-list", payload],
    queryFn: () => getChannelPartnerListApiHandler(payload),
  });

  const list = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const handleSearch = useCallback(() => {
    setPage(1);
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* Hero */}
      <div className="relative -mt-[120px] sm:-mt-[140px] md:-mt-[160px] mb-8 md:mb-10">
        <div className="absolute inset-0 bg-blue rounded-b-[25px] sm:rounded-b-[60px] lg:rounded-b-[80px] xl:rounded-b-[100px]" />
        <div className="relative pt-6 pb-10 px-4 md:px-6 flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2">
            Find Trusted Property Experts
          </h1>
          <p className="text-white/90 text-sm sm:text-base text-center mb-6 max-w-xl">
            Connect with verified KMA channel partners to assist you
            professionally.
          </p>
          <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-3 bg-white rounded-xl shadow-lg p-2 sm:p-1">
            <button
              type="button"
              onClick={() => setFilterOpen((o) => !o)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#D9D9D9] text-text-black font-medium text-sm shrink-0"
            >
              <Image
                src="/assets/fitler-line.svg"
                width={20}
                height={20}
                alt=""
              />
              Filter
            </button>
            <div className="flex-1 flex items-center gap-2 pl-3 pr-2 py-2 rounded-lg bg-[#F5F5F5] border border-transparent focus-within:bg-white focus-within:border-[#D9D9D9]">
              <Image
                src="/assets/search-gray.svg"
                width={20}
                height={20}
                alt=""
                className="shrink-0"
              />
              <input
                type="search"
                placeholder="Search by Channel Partner Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 min-w-0 bg-transparent text-text-black placeholder:text-text-gray text-sm outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#7C3AED] text-white font-semibold text-sm hover:opacity-90 transition-opacity shrink-0"
            >
              <Image
                src="/assets/white-search.svg"
                width={18}
                height={18}
                alt=""
              />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <nav className="text-sm text-text-gray mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-blue">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text-black">Channel Partner</span>
      </nav>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#EEF0F4] overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-[#F2F2F2]" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-[#F2F2F2] rounded w-3/4" />
                <div className="h-4 bg-[#F2F2F2] rounded w-1/2" />
                <div className="h-4 bg-[#F2F2F2] rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="text-center py-16 text-text-gray">
          <p className="text-lg font-medium">No channel partners found.</p>
          <p className="text-sm mt-1">
            Try adjusting your search or filter to see more results.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {list.map((partner, index) => (
            <ChannelPartnerCard
              key={partner.id ?? `${partner.name}-${index}`}
              partner={partner}
              onContact={() => setContactPopupOpen(true)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !isLoading && (
        <div className="flex items-center justify-center gap-2 mt-10 mb-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!hasPrev}
            className="px-4 py-2 rounded-lg border border-[#D9D9D9] text-text-black font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F5F5]"
          >
            Prev
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm ${
                    page === p
                      ? "bg-[#7C3AED] text-white"
                      : "border border-[#D9D9D9] text-text-black hover:bg-[#F5F5F5]"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={!hasNext}
            className="px-4 py-2 rounded-lg border border-[#D9D9D9] text-text-black font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F5F5]"
          >
            Next
          </button>
        </div>
      )}

      {filterOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          aria-hidden
          onClick={() => setFilterOpen(false)}
        />
      )}

      <ContactUsPopup
        open={contactPopupOpen}
        onClose={() => setContactPopupOpen(false)}
      />
    </div>
  );
}
