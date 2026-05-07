"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useId, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  getChannelPartnerListApiHandler,
  type ChannelPartner,
  type GetChannelPartnerListPayload,
  type GetChannelPartnerListResponse,
} from "@/services/homeService";
import { joinUrl } from "@/lib/helper";
import { useSelector } from "react-redux";
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
  onOpenDetails,
}: {
  partner: ChannelPartner;
  onOpenDetails?: (partner: ChannelPartner) => void;
}) {
  const handleOpenDetails = () => onOpenDetails?.(partner);

  const profileSrc = joinUrl(PROFILE_BASE, partner.profile_image);
  const rating = Number(partner.average_rating ?? partner.rating);
  const ratingText = Number.isFinite(rating) ? rating.toFixed(1) : "0.0";
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
        <div className="mt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
          <a
            href="tel:+919056170022"
            className="flex-1 py-3 px-3 rounded-xl bg-blue text-white font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Image
              src="/assets/call-ring-white.svg"
              width={18}
              height={18}
              alt=""
            />
            Call KMA
          </a>
          <a
            href="https://wa.me/919289977646"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[18px] h-[18px]"
              aria-hidden
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            WhatsApp
          </a>
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
  const [filterExperience, setFilterExperience] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterProperties, setFilterProperties] = useState("");
  const [citySearch, setCitySearch] = useState("");

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

  const filteredCities = FILTER_CITIES.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase().trim())
  );

  const handleApplyFilters = useCallback(() => {
    setPage(1);
    setFilterOpen(false);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilterExperience("");
    setFilterCity("");
    setFilterProperties("");
    setCitySearch("");
    setPage(1);
  }, []);

  return (
    <div className="w-full flex flex-col mt-[150px]">
      {/* Hero */}
      <div className="relative mt-[120px] sm:-mt-[100px]  mb-8 md:mb-10">
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


      {/* Grid */}
     <div className="w-full py-[180px]">
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
              onOpenDetails={handleOpenDetails}
            />
          ))}
        </div>
      )}
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

    </div>
  );
}
