"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/app/projects/_types";
import ProjectsPagination from "@/app/projects/_components/ProjectsPagination";
import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  BedDouble,
  ChevronDown,
  Grid3X3,
  Heart,
  LayoutList,
  LogIn,
  MapPin,
  Maximize2,
  Search,
  Star,
} from "lucide-react";
import { useRecentlyViewedProperties } from "@/api/hooks/useRecentlyViewedProperties";
import { useRecentlySearched } from "@/api/hooks/useRecentlySearched";
import { useContactedProperties } from "@/api/hooks/useContactedProperties";
import { useFavoriteProperties } from "@/api/hooks/useFavoriteProperties";
import type { RecentSearchItem } from "@/api/actions/propertyActions";
import { mapApiPropertyToProject } from "@/app/projects/_utils/mapApiPropertyToProject";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

const awsBaseUrl = process.env.NEXT_PUBLIC_AWS_URL ?? "";
const fallbackProjectImage = "/assets/properties_pic_1.png";

const toFullAssetUrl = (value?: string | null) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (!awsBaseUrl) return value;
  return `${awsBaseUrl}${value}`;
};

type ActivitySection = "recentSearch" | "saved" | "contacted" | "recentlyViewed";
type SortType = "latest" | "price_low_high" | "price_high_low";

type ActivityProject = Project & {
  activitySection: ActivitySection;
  viewedAt: string;
};

/* ── Property type badge color map ── */
const PROPERTY_TYPE_COLORS: Record<string, string> = {
  apartment: "bg-[#4A90D9]",
  villa: "bg-[#27AE60]",
  plot: "bg-[#8E44AD]",
  penthouse: "bg-[#E67E22]",
  ind_floor: "bg-[#16A085]",
  retail_shop: "bg-[#C0392B]",
  office_space: "bg-[#2C3E50]",
};

/* ── Property Card (Figma-matched) ── */
function PropertyCard({
  project,
  detailsHref,
  blurred = false,
}: {
  project: ActivityProject;
  detailsHref: string;
  blurred?: boolean;
}) {
  const badgeColor = PROPERTY_TYPE_COLORS[project.propertyType ?? ""] ?? "bg-[#4A90D9]";
  const listedDate = project.viewedAt
    ? (() => {
        try {
          const d = new Date(project.viewedAt);
          return Number.isFinite(d.getTime())
            ? d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
            : null;
        } catch {
          return null;
        }
      })()
    : null;

  return (
    <Link
      href={blurred ? "#" : detailsHref}
      className={`block ${blurred ? "pointer-events-none select-none" : ""}`}
      tabIndex={blurred ? -1 : undefined}
    >
      <article className="h-full overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
        {/* Image */}
        <div className="relative h-[180px]">
          <Image
            src={project.images?.[0] || fallbackProjectImage}
            alt={project.title}
            fill
            className="object-cover"
          />
          {/* Property type badge */}
          <span
            className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[11px] font-semibold text-white capitalize ${badgeColor}`}
          >
            {project.propertyType?.replace("_", " ") ?? "Property"}
          </span>
          {/* Favorite heart */}
          <button
            type="button"
            aria-label="Add to favorites"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#8A90A2] shadow-sm transition hover:text-red-500"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-[#FFB300] text-[#FFB300]" />
            ))}
          </div>

          {/* Title */}
          <h3 className="mt-2 line-clamp-1 text-base font-bold text-[#1B1B4B]">
            {project.title}
          </h3>

          {/* Address */}
          <p className="mt-1 flex items-center gap-1 text-xs text-[#8A90A2]">
            <MapPin className="h-3 w-3 shrink-0 text-[#8A90A2]" />
            <span className="line-clamp-1">{project.address || "—"}</span>
          </p>

          {/* Price */}
          <p className="mt-2.5 text-lg font-bold text-[#1B1B4B]">{project.priceLabel}</p>

          {/* Listed on / Possession */}
          <div className="mt-2 space-y-0.5 text-xs text-[#6B7280]">
            {listedDate && (
              <p>
                Listed on: <span className="text-[#343A4F]">{listedDate}</span>
              </p>
            )}
            <p>
              Possession Info:{" "}
              <span className="text-[#343A4F] capitalize">
                {project.possessionStatus?.replace("_", " ") ?? "—"}
              </span>
            </p>
          </div>

          {/* Divider + Specs */}
          <div className="mt-3 flex items-center gap-4 border-t border-[#ECEEF4] pt-3 text-xs text-[#3B4259]">
            <span className="inline-flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5 text-[#8A90A2]" />
              {project.bedrooms ?? "—"} Bed
            </span>
            <span className="inline-flex items-center gap-1">
              <Bath className="h-3.5 w-3.5 text-[#8A90A2]" />
              — Bath
            </span>
            <span className="inline-flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5 text-[#8A90A2]" />
              {project.plotAreaSqYd != null ? `${project.plotAreaSqYd} Sq Yd` : "—"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ── Recent Search Card ── */
function RecentSearchCard({
  search,
  searchAgainHref,
}: {
  search: RecentSearchItem;
  searchAgainHref: string;
}) {
  const dateLabel =
    search.createdAt &&
    (() => {
      try {
        const d = new Date(search.createdAt);
        return Number.isFinite(d.getTime())
          ? d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
          : "";
      } catch {
        return "";
      }
    })();

  const filterLabels: string[] = [];
  if (search.filters?.propertyType) filterLabels.push(search.filters.propertyType);
  if (search.filters?.bhk) filterLabels.push(`${search.filters.bhk} BHK`);
  const filterText = filterLabels.length ? filterLabels.join(" / ") : null;

  return (
    <article className="flex flex-col gap-2 rounded-xl border border-[#E6E8EF] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-semibold text-[#1B1B4B]">{search.searchQuery}</p>
          {(search.location || search.city) && (
            <p className="mt-1 line-clamp-1 text-xs text-[#8A90A2]">
              {[search.location, search.city].filter(Boolean).join(", ")}
            </p>
          )}
          {search.priceRange && (
            <p className="mt-0.5 text-xs text-[#343A4F]">Price: {search.priceRange}</p>
          )}
          {filterText && <p className="mt-0.5 text-xs text-[#6B7280]">{filterText}</p>}
          {dateLabel && <p className="mt-1 text-[10px] text-[#8A90A2]">Searched on {dateLabel}</p>}
        </div>
        <Link
          href={searchAgainHref}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#1B1B4B] px-4 py-2 text-xs font-medium text-white transition hover:opacity-90"
        >
          <Search className="h-3.5 w-3.5" />
          Search again
        </Link>
      </div>
    </article>
  );
}

/* ── Tab config ── */
const ACTIVITY_TABS: Array<{
  key: ActivitySection;
  label: string;
}> = [
  { key: "recentSearch", label: "Recently Search" },
  { key: "recentlyViewed", label: "Recently Viewed" },
  { key: "saved", label: "Saved Properties" },
  { key: "contacted", label: "Contacted" },
];

const PAGE_SIZE = 12;
const RECENT_SEARCH_PAGE_SIZE = 10;
const ACTIVITY_TAB_KEYS: ActivitySection[] = ["recentSearch", "saved", "contacted", "recentlyViewed"];

export default function RecentlyViewedPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<ActivitySection>("recentlyViewed");
  const [activeIntent, setActiveIntent] = useState<"buy" | "rent" | "commercial">("buy");
  const [sortBy, setSortBy] = useState<SortType>("latest");
  const [searchSortBy, setSearchSortBy] = useState<"recent" | "relevance">("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  /* ── Login check ── */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    } catch {
      setIsLoggedIn(false);
    }
  }, []);

  /* ── URL tab sync ── */
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ACTIVITY_TAB_KEYS.includes(tab as ActivitySection)) {
      setActiveSection(tab as ActivitySection);
    }
  }, [searchParams]);

  const selectActivityTab = (key: ActivitySection) => {
    setActiveSection(key);
    router.replace(`/recently-viewed?tab=${key}`, { scroll: false });
  };

  /* ── API params ── */
  const listingTypeApi: "sale" | "rent" | undefined =
    activeIntent === "buy" ? "sale" : activeIntent === "rent" ? "rent" : undefined;

  const buildingTypeFilter: "commercial" | undefined =
    activeIntent === "commercial" ? "commercial" : undefined;

  const sortApi: "newest" | "oldest" | "price_high" | "price_low" | undefined =
    sortBy === "latest"
      ? "newest"
      : sortBy === "price_low_high"
        ? "price_low"
        : sortBy === "price_high_low"
          ? "price_high"
          : "newest";

  /* ── Hooks ── */
  const {
    properties: apiRecentlyViewed,
    total: recentlyViewedTotal,
    totalPages: apiTotalPages,
    isPending: isRecentlyViewedLoading,
    isError: isRecentlyViewedError,
  } = useRecentlyViewedProperties({
    page: currentPage,
    limit: PAGE_SIZE,
    listingType: activeIntent === "commercial" ? undefined : listingTypeApi,
    sort: sortApi,
    enabled: activeSection === "recentlyViewed",
  });

  const {
    searches: recentSearches,
    total: recentlySearchedTotal,
    totalPages: recentSearchTotalPages,
    isPending: isRecentlySearchedLoading,
    isError: isRecentlySearchedError,
  } = useRecentlySearched({
    page: currentPage,
    limit: RECENT_SEARCH_PAGE_SIZE,
    sortBy: searchSortBy,
    enabled: activeSection === "recentSearch",
  });

  const {
    properties: contactedProperties,
    total: contactedTotal,
    totalPages: contactedTotalPages,
    isPending: isContactedLoading,
    isError: isContactedError,
  } = useContactedProperties({
    page: currentPage,
    limit: PAGE_SIZE,
    listingType: activeIntent === "commercial" ? undefined : listingTypeApi,
    sort: sortApi,
    enabled: activeSection === "contacted",
  });

  const {
    properties: favoriteProperties,
    total: favoritesTotal,
    totalPages: favoritesTotalPages,
    isPending: isFavoritesLoading,
    isError: isFavoritesError,
  } = useFavoriteProperties({
    page: currentPage,
    limit: PAGE_SIZE,
    listingType: activeIntent === "commercial" ? undefined : listingTypeApi,
    sort: sortApi,
    enabled: activeSection === "saved",
  });

  /* ── Map API data to ActivityProject ── */
  const mapOptions = { toFullAssetUrl, fallbackImage: fallbackProjectImage };

  const recentlyViewedAsActivityProjects = useMemo<ActivityProject[]>(
    () =>
      apiRecentlyViewed.map((item) => {
        const project = mapApiPropertyToProject(item, mapOptions);
        return { ...project, activitySection: "recentlyViewed" as const, viewedAt: "" };
      }),
    [apiRecentlyViewed]
  );

  const contactedAsActivityProjects = useMemo<ActivityProject[]>(
    () =>
      contactedProperties.map((item) => {
        const project = mapApiPropertyToProject(item, mapOptions);
        return { ...project, activitySection: "contacted" as const, viewedAt: "" };
      }),
    [contactedProperties]
  );

  const savedAsActivityProjects = useMemo<ActivityProject[]>(
    () =>
      favoriteProperties.map((item) => {
        const project = mapApiPropertyToProject(item, mapOptions);
        return { ...project, activitySection: "saved" as const, viewedAt: "" };
      }),
    [favoriteProperties]
  );

  /* ── Filter for commercial on client side ── */
  const filterByBuildingType = (projects: ActivityProject[]) => {
    if (buildingTypeFilter) {
      return projects.filter((p) => p.buildingType === "commercial");
    }
    return projects;
  };

  /* ── Compute visible projects ── */
  const isRecentlyViewedTab = activeSection === "recentlyViewed";
  const isRecentSearchTab = activeSection === "recentSearch";
  const isContactedTab = activeSection === "contacted";
  const isSavedTab = activeSection === "saved";

  const visibleProjects: ActivityProject[] = filterByBuildingType(
    isRecentlyViewedTab
      ? recentlyViewedAsActivityProjects
      : isContactedTab
        ? contactedAsActivityProjects
        : isSavedTab
          ? savedAsActivityProjects
          : []
  );

  const totalPages = isRecentlyViewedTab
    ? apiTotalPages
    : isRecentSearchTab
      ? recentSearchTotalPages
      : isContactedTab
        ? contactedTotalPages
        : isSavedTab
          ? favoritesTotalPages
          : 1;

  const showingCount = isRecentSearchTab ? recentSearches.length : visibleProjects.length;
  const totalCount = isRecentSearchTab
    ? recentlySearchedTotal
    : isRecentlyViewedTab
      ? recentlyViewedTotal
      : isContactedTab
        ? contactedTotal
        : isSavedTab
          ? favoritesTotal
          : 0;
  const rangeStart =
    showingCount > 0
      ? (currentPage - 1) * (isRecentSearchTab ? RECENT_SEARCH_PAGE_SIZE : PAGE_SIZE) + 1
      : 0;
  const rangeEnd = showingCount > 0 ? rangeStart + showingCount - 1 : 0;

  /* ── Tab counts ── */
  const activityTabs = useMemo(
    () =>
      ACTIVITY_TABS.map((tab) => ({
        ...tab,
        count:
          tab.key === "recentlyViewed"
            ? recentlyViewedTotal
            : tab.key === "recentSearch"
              ? recentlySearchedTotal
              : tab.key === "contacted"
                ? contactedTotal
                : tab.key === "saved"
                  ? favoritesTotal
                  : 0,
      })),
    [recentlyViewedTotal, recentlySearchedTotal, contactedTotal, favoritesTotal]
  );

  /* ── Reset page on filter change ── */
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSection, activeIntent, sortBy, searchSortBy]);

  /* ── Loading / Error states ── */
  const isCurrentLoading =
    (isRecentlyViewedTab && isRecentlyViewedLoading) ||
    (isRecentSearchTab && isRecentlySearchedLoading) ||
    (isContactedTab && isContactedLoading) ||
    (isSavedTab && isFavoritesLoading);

  const isCurrentError =
    (isRecentlyViewedTab && isRecentlyViewedError) ||
    (isRecentSearchTab && isRecentlySearchedError) ||
    (isContactedTab && isContactedError) ||
    (isSavedTab && isFavoritesError);

  const isEmpty =
    !isCurrentLoading &&
    !isCurrentError &&
    ((isRecentSearchTab && recentSearches.length === 0) ||
      (!isRecentSearchTab && visibleProjects.length === 0));

  const emptyMessage = isRecentlyViewedTab
    ? "No recently viewed properties yet."
    : isRecentSearchTab
      ? "No recent searches yet."
      : isContactedTab
        ? "No contacted properties yet."
        : isSavedTab
          ? "No saved properties yet."
          : "No properties available for this filter.";

  /* ── Login gate: first 4 visible, rest blurred ── */
  const LOGIN_GATE_VISIBLE_COUNT = 4;
  const shouldGateLogin = !isLoggedIn && !isRecentSearchTab && visibleProjects.length > LOGIN_GATE_VISIBLE_COUNT;

  return (
    <div className="w-full bg-[#F5F5F5] min-h-screen">
      {/* ════════════════ HERO SECTION ════════════════ */}
      <section className="relative">
        <div className="relative h-[320px] w-full overflow-hidden">
          {/* Dark cityscape background */}
          <Image
            src="/assets/properties_pic_1.png"
            alt="Track your journey hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#020C2A]/75" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Track Your <span className="text-[#F5A623]">Journey</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[600px] text-sm leading-relaxed text-white/80 sm:text-base">
              Browse your recently searched, saved, contacted, and viewed properties all in one
              place.
            </p>
          </div>
        </div>

        {/* ════════════════ FILTER BAR ════════════════ */}
        <div className="relative z-20 mx-auto -mt-10 w-[calc(100%-2rem)] max-w-7xl rounded-xl border border-[#EAECF0] bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)] sm:p-6 lg:w-[calc(100%-4rem)]">
          {/* Top row: Filter label + tabs */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-lg font-bold text-[#1B1B4B]">Filter</span>
            <div className="flex flex-wrap items-center gap-2">
              {activityTabs.map((tab) => {
                const isActive = tab.key === activeSection;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => selectActivityTab(tab.key)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-[#FFB300] text-[#1B1B4B] shadow-sm"
                        : "bg-[#F5F5F5] text-[#6B7280] hover:bg-[#E8E8E8]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                        isActive ? "bg-[#1B1B4B] text-white" : "bg-white text-[#1B1B4B]"
                      }`}
                    >
                      {String(tab.count).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom row: Property type toggles + results info + sort + view mode */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            {/* Buy / Rent / Commercial */}
            <div className="flex items-center gap-1 rounded-full bg-[#F5F5F5] p-1">
              {(["buy", "rent", "commercial"] as const).map((intent) => {
                const isSelected = activeIntent === intent;
                return (
                  <button
                    key={intent}
                    type="button"
                    onClick={() => setActiveIntent(intent)}
                    className={`rounded-full px-5 py-1.5 text-sm font-medium capitalize transition ${
                      isSelected
                        ? "bg-[#1B1B4B] text-white shadow-sm"
                        : "text-[#6B7280] hover:text-[#1B1B4B]"
                    }`}
                  >
                    {intent}
                  </button>
                );
              })}
            </div>

            {/* Right side: results count + sort + view toggle */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm text-[#6B7280]">
                Showing {showingCount > 0 ? `${rangeStart}-${rangeEnd}` : "0"} of {totalCount}{" "}
                Results
              </span>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#343A4F]">Sort By:</span>
                {isRecentSearchTab ? (
                  <div className="relative">
                    <select
                      value={searchSortBy}
                      onChange={(e) => setSearchSortBy(e.target.value as "recent" | "relevance")}
                      className="h-9 min-w-[140px] appearance-none rounded-lg border border-[#E3E6EF] bg-[#F8F9FC] pl-3 pr-8 text-sm text-[#6B7280] outline-none"
                    >
                      <option value="recent">Most recent</option>
                      <option value="relevance">Relevance</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  </div>
                ) : (
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortType)}
                      className="h-9 min-w-[140px] appearance-none rounded-lg border border-[#E3E6EF] bg-[#F8F9FC] pl-3 pr-8 text-sm text-[#6B7280] outline-none"
                    >
                      <option value="latest">Relevance</option>
                      <option value="price_low_high">Price: Low to High</option>
                      <option value="price_high_low">Price: High to Low</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  </div>
                )}
              </div>

              {/* Grid/List toggle */}
              <div className="flex items-center rounded-lg border border-[#E3E6EF] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition ${
                    viewMode === "grid" ? "bg-[#1B1B4B] text-white" : "bg-white text-[#6B7280] hover:bg-[#F5F5F5]"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition ${
                    viewMode === "list" ? "bg-[#1B1B4B] text-white" : "bg-white text-[#6B7280] hover:bg-[#F5F5F5]"
                  }`}
                  aria-label="List view"
                >
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ PROPERTY GRID ════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        {/* Loading */}
        {isCurrentLoading && (
          <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-white py-12 shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E3E6EF] border-t-[#FFB300]" />
              <p className="text-sm text-[#6B7280]">Loading...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {isCurrentError && !isCurrentLoading && (
          <div className="rounded-xl bg-white p-8 text-center text-sm text-[#6B7280] shadow-sm">
            Unable to load data. Please try again later.
          </div>
        )}

        {/* Recent Searches */}
        {isRecentSearchTab && !isCurrentLoading && !isCurrentError && (
          <div className="space-y-3">
            {recentSearches.map((search) => (
              <RecentSearchCard
                key={search.id}
                search={search}
                searchAgainHref={`/projects?q=${encodeURIComponent(search.searchQuery)}`}
              />
            ))}
          </div>
        )}

        {/* Property cards */}
        {!isRecentSearchTab && !isCurrentLoading && !isCurrentError && visibleProjects.length > 0 && (
          <div className="relative">
            <div
              className={`grid gap-5 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {visibleProjects.map((project, idx) => {
                const detailsHref = `/projects/${project.id}/${project.id}`;
                const isBlurred = shouldGateLogin && idx >= LOGIN_GATE_VISIBLE_COUNT;
                return (
                  <div
                    key={project.id}
                    className={isBlurred ? "blur-[6px] opacity-60 transition" : ""}
                  >
                    <PropertyCard
                      project={project}
                      detailsHref={detailsHref}
                      blurred={isBlurred}
                    />
                  </div>
                );
              })}
            </div>

            {/* Login gate overlay */}
            {shouldGateLogin && (
              <div className="absolute inset-x-0 bottom-0 top-[calc(25%+60px)] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 rounded-2xl bg-white/95 px-10 py-8 shadow-xl backdrop-blur-sm">
                  <p className="text-lg font-bold text-[#1B1B4B]">Login To View All The Properties</p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#27AE60] px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#219A52]"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {isEmpty && (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-[#6B7280]">{emptyMessage}</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !shouldGateLogin && (
          <div className="mt-8 flex justify-center">
            <ProjectsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </section>
    </div>
  );
}
