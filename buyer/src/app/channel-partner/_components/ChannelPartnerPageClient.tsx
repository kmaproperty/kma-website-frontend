"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import {
  getChannelPartnerListApiHandler,
  type ChannelPartner,
  type GetChannelPartnerListPayload,
  type GetChannelPartnerListResponse,
} from "@/services/homeService";
import { joinUrl } from "@/lib/helper";
import ContactUsPopup from "@/components/contactUsPopup";
import { getSelectedCity } from "@/store/homeHeaderSlice";

const PROFILE_BASE = process.env.NEXT_PUBLIC_AWS_URL;
const DEFAULT_PAGE_SIZE = 12;

const FILTER_CITIES = [
  "Agra",
  "Ahmedabad",
  "Allahabad",
  "Amritsar",
  "Bangalore",
  "Bhopal",
  "Bhubaneswar",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Cuttack",
  "Delhi",
  "Dehradun",
  "Faridabad",
  "Ghaziabad",
  "Gurgaon",
  "Guwahati",
  "Hyderabad",
  "Indore",
  "Jaipur",
  "Jodhpur",
  "Kanpur",
  "Kochi",
  "Kolkata",
  "Lucknow",
  "Ludhiana",
  "Madurai",
  "Meerut",
  "Mumbai",
  "Nagpur",
  "Nashik",
  "Noida",
  "Patna",
  "Pune",
  "Raipur",
  "Rajkot",
  "Ranchi",
  "Surat",
  "Thane",
  "Vadodara",
  "Varanasi",
  "Vijayawada",
  "Visakhapatnam"
];

const PROPERTY_RANGES = [
  "1-5",
  "5-10",
  "10-15",
  "15-20",
  "20-30",
  "30-50",
  "50+",
];

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
  onOpenDetails,
}: {
  partner: ChannelPartner;
  onContact?: (partner: ChannelPartner) => void;
  onOpenDetails?: (partner: ChannelPartner) => void;
}) {
  const handleOpenDetails = () => onOpenDetails?.(partner);

  const profileSrc = joinUrl(PROFILE_BASE, partner.profile_image);
  const rating = Number(partner.rating ?? 4.2);
  const ratingText = Number.isFinite(rating) ? rating.toFixed(1) : "4.2";
  const cityList = partner.cities
    ?.split(",")
    .map((c) => c.trim())
    .filter(Boolean) ?? [];

  return (
    <article
      className="bg-white rounded-2xl border border-[#EEF0F4] shadow-[0_6px_24px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col cursor-pointer transition hover:shadow-[0_10px_40px_rgba(0,0,0,0.09)]"
      role="button"
      tabIndex={0}
      onClick={handleOpenDetails}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpenDetails();
        }
      }}
    >
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
          onClick={(e) => {
            // Keep this button action isolated from card navigation.
            e.stopPropagation();
            onContact?.(partner);
          }}
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

function ChannelPartnerMobileCard({
  partner,
  onOpenDetails,
}: {
  partner: ChannelPartner;
  onOpenDetails?: (partner: ChannelPartner) => void;
}) {
  const handleOpenDetails = () => onOpenDetails?.(partner);
  const profileSrc = joinUrl(PROFILE_BASE, partner.profile_image);
  const rating = Number(partner.rating ?? 4.3);
  const ratingText = Number.isFinite(rating) ? rating.toFixed(1) : "4.3";
  const cityList = partner.cities
    ?.split(",")
    .map((c) => c.trim())
    .filter(Boolean) ?? [];

  return (
    <article
      className="rounded-2xl border border-[#EEF0F4] bg-white p-3.5 shadow-[0_6px_20px_rgba(16,24,40,0.08)]"
      role="button"
      tabIndex={0}
      onClick={handleOpenDetails}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpenDetails();
        }
      }}
    >
      <div className="flex items-start gap-3.5">
        <div className="relative h-[116px] w-[116px] shrink-0 overflow-hidden rounded-xl bg-[#F2F2F2]">
          {profileSrc ? (
            <Image src={profileSrc} alt={`${partner.name} profile`} fill className="object-cover" sizes="112px" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-semibold text-text-black uppercase">
              {partner.name?.charAt(0) ?? "?"}
            </div>
          )}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-[#02035A] px-1.5 py-1 text-white">
            <Star fill={100} className="h-3 w-3 text-white" />
            <span className="text-xs font-semibold leading-none">{ratingText}</span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-1 text-[20px] font-semibold leading-tight text-[#101828]">{partner.name}</h3>
          <span className="mt-2 inline-flex rounded-md bg-[#1F2A7B] px-3 py-1 text-[12px] font-semibold text-white">
            KMA Expert Pro
          </span>
          {cityList.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-2">
              {cityList.slice(0, 2).map((city, i) => (
                <span key={`${city}-${i}`} className="rounded-full bg-[#EEF2FF] px-3 py-1 text-[13px] font-medium text-[#3F3F8F]">
                  {city}
                </span>
              ))}
            </div>
          )}
          <p className="mt-2.5 text-[14px] font-medium text-[#1D2939]">
            {partner.experience_years ?? 0} Years Experience
            <span className="mx-2 text-[#D0D5DD]">|</span>
            {partner.property_count ?? 0} Properties
          </p>
        </div>
      </div>
    </article>
  );
}

export default function ChannelPartnerPageClient() {
  const selectedCity = useSelector(getSelectedCity);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [contactPopupOpen, setContactPopupOpen] = useState(false);
  const [filterExperience, setFilterExperience] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterProperties, setFilterProperties] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const payload: GetChannelPartnerListPayload = {
    search: search || null,
    city: filterCity || (selectedCity?.name ?? null),
    experience: filterExperience.trim() || null,
    properties: filterProperties || null,
    page: String(page),
    limit: String(DEFAULT_PAGE_SIZE),
  };

  const handleOpenDetails = useCallback(
    (p: ChannelPartner) => {
      router.push(`/channel-partner/${encodeURIComponent(p.id)}`);
    },
    [router]
  );

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

  const handleApplyMobileFilters = useCallback(() => {
    setPage(1);
    setMobileSearchOpen(false);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!mobileSearchOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileSearchOpen]);

  const filteredCities = FILTER_CITIES.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase().trim())
  );

  const handleClearFilters = useCallback(() => {
    setFilterExperience("");
    setFilterCity("");
    setFilterProperties("");
    setCitySearch("");
    setPage(1);
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* Hero */}
      <div className="relative mb-5 md:mb-10">
        <div className="absolute inset-0 rounded-b-[25px] sm:rounded-b-[60px] lg:rounded-b-[80px] xl:rounded-b-[100px]" />
        <div className="relative -mt-6 sm:mt-0 py-5 sm:py-7 px-4 md:px-6 flex flex-col items-center">
          <div className="w-full max-w-4xl rounded-2xl px-4 py-4 sm:px-0 sm:py-6 md:px-8 ">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2">
              Find Trusted Property Experts
            </h1>
            <p className="text-white/90 text-sm sm:text-base text-center mb-4 sm:mb-6 max-w-xl mx-auto">
              Connect with verified KMA channel partners to assist you
              professionally.
            </p>
            <div className="sm:hidden w-full">
              <div className="w-full flex items-center gap-2 bg-white rounded-[14px] shadow-[0_8px_24px_rgba(15,23,42,0.18)] p-2.5">
                <Image
                  src="/assets/search-gray.svg"
                  width={18}
                  height={18}
                  alt=""
                  className="shrink-0 ml-1"
                />
                <input
                  type="search"
                  placeholder="Search by Chanel Partner Name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.blur();
                    setMobileSearchOpen(true);
                  }}
                  onClick={() => setMobileSearchOpen(true)}
                  readOnly
                  className="flex-1 min-w-0 bg-transparent text-[#0F172A] placeholder:text-[#98A2B3] text-[16px] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setMobileSearchOpen(true)}
                  className="h-8 w-8 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0"
                  aria-label="Search"
                >
                  <Image
                    src="/assets/blue-location-tracker.svg"
                    width={14}
                    height={14}
                    alt=""
                  />
                </button>
              </div>
            </div>

            <div className="hidden sm:flex w-full flex-col sm:flex-row gap-2 bg-white rounded-[14px] shadow-[0_8px_24px_rgba(15,23,42,0.18)] p-2">
              <button
                type="button"
                onClick={() => setFilterOpen((o) => !o)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-[10px] border border-[#E6E8EF] text-[#0F172A] font-medium text-sm shrink-0 bg-white sm:min-w-[112px]"
              >
                <Image
                  src="/assets/fitler-line.svg"
                  width={16}
                  height={16}
                  alt=""
                />
                Filter
                <ChevronDown className="h-4 w-4 text-[#0F172A]" />
              </button>
              <div className="flex-1 flex items-center gap-2 pl-3 pr-2 py-2 rounded-[10px] bg-white border border-[#E6E8EF] focus-within:border-[#CBD2E1]">
                <Image
                  src="/assets/search-gray.svg"
                  width={16}
                  height={16}
                  alt=""
                  className="shrink-0"
                />
                <input
                  type="search"
                  placeholder="Search by Channel Partner Name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 min-w-0 bg-transparent text-[#0F172A] placeholder:text-[#98A2B3] text-sm outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#02035A] text-white font-semibold text-sm hover:opacity-90 transition-opacity shrink-0"
              >
                <Image
                  src="/assets/white-search.svg"
                  width={16}
                  height={16}
                  alt=""
                />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}


      {/* Grid */}
     <div className="w-full px-4 md:px-6 pt-2 pb-16 md:pb-20">
      <div className="mx-auto w-full max-w-[1440px]">
      {!isLoading && list.length > 0 && (
        <div className="mb-4 flex items-center justify-between sm:hidden">
          <p className="text-base font-normal text-[#98A2B3]">
            Showing <span className="font-semibold text-[#02035A]">{pagination?.total ?? list.length}</span> Partners
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-base font-medium text-[#667085]"
          >
            Sort Listing
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
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
        <>
          <div className="space-y-3.5 sm:hidden">
            {list.map((partner, index) => (
              <ChannelPartnerMobileCard
                key={partner.id ?? `${partner.name}-${index}`}
                partner={partner}
                onOpenDetails={handleOpenDetails}
              />
            ))}
          </div>
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {list.map((partner, index) => (
              <ChannelPartnerCard
                key={partner.id ?? `${partner.name}-${index}`}
                partner={partner}
                onContact={() => setContactPopupOpen(true)}
                onOpenDetails={handleOpenDetails}
              />
            ))}
          </div>
        </>
      )}
      </div>
     </div>

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
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            aria-hidden
            onClick={() => setFilterOpen(false)}
          />
          <div className="fixed left-1/2 top-[180px] z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-2xl bg-[#F5F5F5] shadow-xl max-h-[calc(100vh-220px)] overflow-y-auto">
            <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-text-black mb-3">
                Cities
              </h3>
              <input
                type="search"
                placeholder="Search Cities"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="w-full rounded-lg border border-[#D9D9D9] bg-[#F5F5F5] px-3 py-2.5 text-sm text-text-black placeholder:text-text-gray outline-none focus:border-blue mb-3"
              />
              <div className="flex flex-wrap gap-2">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setFilterCity(city);
                    }}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      filterCity === city
                        ? "border-blue bg-light-purple text-blue"
                        : "border-[#D9D9D9] bg-white text-text-black hover:bg-[#F5F5F5]"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Properties card */}
            <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm mb-4">
              <h3 className="text-sm font-semibold text-text-black mb-3">
                Properties
              </h3>
              <div className="flex flex-wrap gap-2">
                {PROPERTY_RANGES.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setFilterProperties(range)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      filterProperties === range
                        ? "border-blue bg-light-purple text-blue"
                        : "border-[#D9D9D9] bg-white text-text-black hover:bg-[#F5F5F5]"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleClearFilters}
                className="rounded-lg border border-[#D9D9D9] bg-white px-4 py-2.5 text-sm font-semibold text-text-black hover:bg-[#F5F5F5] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </>
      )}

      {isMounted &&
        mobileSearchOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] sm:hidden bg-white">
            <div className="h-full w-full overflow-y-auto overscroll-contain bg-white px-5 pb-8 pt-6">
              <div className="mx-auto w-full max-w-[460px]">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-[32px] font-semibold text-[#101828]">Filter</h3>
                  <button
                    type="button"
                    onClick={() => setMobileSearchOpen(false)}
                    className="h-8 w-8 rounded-full text-[32px] leading-none text-[#101828]"
                    aria-label="Close filter"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="mb-1.5 text-[15px] font-semibold text-[#1D2939]">By Name</p>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="i.e. Sam john"
                      className="w-full rounded-xl border border-[#E4E7EC] px-4 py-3 text-[16px] text-[#101828] placeholder:text-[#98A2B3] outline-none"
                    />
                  </div>

                  <div>
                    <p className="mb-1.5 text-[15px] font-semibold text-[#1D2939]">By Experience</p>
                    <div className="relative">
                      <select
                        value={filterExperience}
                        onChange={(e) => setFilterExperience(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 pr-10 text-[16px] text-[#98A2B3] outline-none"
                      >
                        <option value="">i.e. 1</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="10">10+</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />
                    </div>
                  </div>

                  <div>
                    <p className="mb-1.5 text-[15px] font-semibold text-[#1D2939]">By City</p>
                    <div className="relative">
                      <select
                        value={filterCity}
                        onChange={(e) => setFilterCity(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 pr-10 text-[16px] text-[#98A2B3] outline-none"
                      >
                        <option value="">Select City</option>
                        {FILTER_CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />
                    </div>
                  </div>

                  <div>
                    <p className="mb-1.5 text-[15px] font-semibold text-[#1D2939]">By Properties</p>
                    <div className="relative">
                      <select
                        value={filterProperties}
                        onChange={(e) => setFilterProperties(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 pr-10 text-[16px] text-[#98A2B3] outline-none"
                      >
                        <option value="">Select No. of Properties</option>
                        {PROPERTY_RANGES.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleApplyMobileFilters}
                    className="mt-2 w-full rounded-xl bg-[#02035A] px-4 py-3 text-[18px] font-medium text-white"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      <ContactUsPopup
        open={contactPopupOpen}
        onClose={() => setContactPopupOpen(false)}
      />
    </div>
  );
}
