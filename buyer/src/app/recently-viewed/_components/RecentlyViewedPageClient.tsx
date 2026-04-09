"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/app/projects/_types";
import ProjectsPagination from "@/app/projects/_components/ProjectsPagination";
import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, ChevronDown, ChevronLeft, ChevronRight, Heart, Images, Maximize2, Video } from "lucide-react";
import { useRecentlyViewedProperties } from "@/api/hooks/useRecentlyViewedProperties";
import { useRecentlySearched } from "@/api/hooks/useRecentlySearched";
import { useContactedProperties } from "@/api/hooks/useContactedProperties";
import { useFavoriteProperties } from "@/api/hooks/useFavoriteProperties";
import type { RecentSearchItem } from "@/api/actions/propertyActions";
import { mapApiPropertyToProject } from "@/app/projects/_utils/mapApiPropertyToProject";
import { Search } from "lucide-react";
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

function CompactPropertyCard({ project, detailsHref }: { project: ActivityProject; detailsHref: string }) {
  return (
    <Link href={detailsHref} className="block">
      <article className="w-full overflow-hidden rounded-lg border border-[#E6E8EF] bg-white shadow-[0_4px_14px_rgba(10,24,61,0.08)] transition hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(10,24,61,0.11)]">
        <div className="relative h-[145px]">
          <Image
            src={project.images?.[0] || fallbackProjectImage}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-1 text-white">
            <ChevronLeft className="h-3 w-3" />
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-1 text-white">
            <ChevronRight className="h-3 w-3" />
          </div>
          <button
            type="button"
            aria-label="Add to favorites"
            className="absolute right-2 top-2 rounded-full bg-black/35 p-1 text-white transition hover:bg-black/50"
          >
            <Heart className="h-3.5 w-3.5" />
          </button>
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-white/90 px-1.5 py-0.5">
            <Image
              src={project.agent?.avatarUrl || "/assets/profile.png"}
              alt={project.agent?.name || "agent"}
              width={20}
              height={20}
              className="h-5 w-5 rounded-full object-cover"
            />
          </div>
          <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-black/45 px-2 py-0.5 text-[10px] text-white">
            <span>{`1/${project.mediaCounts?.photos ?? 1}`}</span>
            <span className="inline-flex items-center gap-1">
              <Images className="h-2.5 w-2.5" />
              {project.mediaCounts?.photos ?? 0}
            </span>
            <span className="inline-flex items-center gap-1">
              <Video className="h-2.5 w-2.5" />
              {project.mediaCounts?.videos ?? 0}
            </span>
          </div>
        </div>

        <div className="p-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-[11px] text-[#FFB200]">
              <span>★★★★★</span>
              <span className="text-[#8A90A2]">—</span>
            </div>
            <span className="rounded bg-[#6D5CF6] px-1.5 py-0.5 text-[9px] font-medium text-white capitalize">
              {project.propertyType ?? "Property"}
            </span>
          </div>

          <h3 className="mt-1.5 line-clamp-1 text-base font-semibold text-[#1E2236]">
            {project.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs text-[#8A90A2]">{project.address}</p>

          <p className="mt-2 text-2xl leading-none font-semibold text-[#131A55]">
            {project.priceLabel}
          </p>

          <div className="mt-2 border-t border-[#ECEEF4] pt-2 text-xs text-[#8A90A2]">
            <p className="mt-1">
              Possession: <span className="text-[#343A4F] capitalize">{project.possessionStatus?.replace("_", " ") ?? "—"}</span>
            </p>
          </div>

          <div className="mt-2.5 grid grid-cols-3 gap-1.5 border-t border-[#ECEEF4] pt-2 text-[11px] text-[#3B4259]">
            <div className="inline-flex items-center gap-1 rounded bg-[#F7F8FC] px-1.5 py-1">
              <BedDouble className="h-3 w-3 text-[#8A90A2]" />
              <span>{project.bedrooms ?? "—"} Bed</span>
            </div>
            <div className="inline-flex items-center gap-1 rounded bg-[#F7F8FC] px-1.5 py-1">
              <Bath className="h-3 w-3 text-[#8A90A2]" />
              <span>— Bath</span>
            </div>
            <div className="inline-flex items-center gap-1 rounded bg-[#F7F8FC] px-1.5 py-1">
              <Maximize2 className="h-3 w-3 text-[#8A90A2]" />
              <span>{project.plotAreaSqYd != null ? `${project.plotAreaSqYd} Sq Yd` : "—"}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

function RecentSearchCard({ search, searchAgainHref }: { search: RecentSearchItem; searchAgainHref: string }) {
  const dateLabel =
    search.createdAt &&
    (() => {
      try {
        const d = new Date(search.createdAt);
        return Number.isFinite(d.getTime()) ? d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";
      } catch {
        return "";
      }
    })();

  const filterLabels: string[] = [];
  if (search.filters?.propertyType) filterLabels.push(search.filters.propertyType);
  if (search.filters?.bhk) filterLabels.push(`${search.filters.bhk} BHK`);
  const filterText = filterLabels.length ? filterLabels.join(" • ") : null;

  return (
    <article className="flex flex-col gap-2 rounded-lg border border-[#E6E8EF] bg-white p-4 shadow-[0_4px_14px_rgba(10,24,61,0.08)] transition hover:shadow-[0_8px_18px_rgba(10,24,61,0.11)]">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-medium text-[#1E2236]">{search.searchQuery}</p>
          {(search.location || search.city) && (
            <p className="mt-1 line-clamp-1 text-xs text-[#8A90A2]">
              {[search.location, search.city].filter(Boolean).join(", ")}
            </p>
          )}
          {search.priceRange && (
            <p className="mt-0.5 text-xs text-[#343A4F]">Price: {search.priceRange}</p>
          )}
          {filterText && (
            <p className="mt-0.5 text-xs text-[#6B7280]">{filterText}</p>
          )}
          {dateLabel && (
            <p className="mt-1 text-[10px] text-[#8A90A2]">Searched on {dateLabel}</p>
          )}
        </div>
        <Link
          href={searchAgainHref}
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#0C145E] px-3 py-1.5 text-xs font-medium text-white transition hover:opacity-90"
        >
          <Search className="h-3.5 w-3.5" />
          Search again
        </Link>
      </div>
    </article>
  );
}

const ACTIVITY_TABS: Array<{
  key: ActivitySection;
  label: string;
  icon: string;
}> = [
  { key: "recentSearch", label: "Recently Search", icon: "/assets/home-search-blue.svg" },
  { key: "recentlyViewed", label: "Recently Viewed", icon: "/assets/home-recent-blue.svg" },
  { key: "saved", label: "Saved Properties", icon: "/assets/home-save-blue.svg" },
  { key: "contacted", label: "Contacted", icon: "/assets/home-contact-blue.svg" },
];

const allActivityProjects: ActivityProject[] = Array.from({ length: 24 }).map((_, idx) => {
  const sectionMap: ActivitySection[] = [
    "recentlyViewed",
    "recentlyViewed",
    "saved",
    "recentSearch",
    "contacted",
    "recentlyViewed",
    "saved",
    "recentSearch",
    "recentlyViewed",
    "contacted",
    "recentlyViewed",
    "saved",
    "recentlyViewed",
    "recentSearch",
    "saved",
    "recentlyViewed",
    "contacted",
    "recentlyViewed",
    "saved",
    "recentSearch",
    "recentlyViewed",
    "contacted",
    "recentlyViewed",
    "saved",
  ];
  const intentMap: Array<"sale" | "rent"> = [
    "sale",
    "sale",
    "rent",
    "sale",
    "sale",
    "rent",
    "sale",
    "rent",
    "sale",
    "sale",
    "rent",
    "sale",
    "sale",
    "rent",
    "sale",
    "sale",
    "rent",
    "sale",
    "sale",
    "rent",
    "sale",
    "sale",
    "rent",
    "sale",
  ];
  const titleMap = [
    "Royal Apartment",
    "Maple Residency",
    "Skyline Heights",
    "Palm Enclave",
    "City View Towers",
    "Harmony Homes",
    "Willow Greens",
    "Trinity Suites",
  ];
  const localityMap = [
    "Willow Crest",
    "Sector 56",
    "DLF Phase 3",
    "Golf Course Road",
    "South City",
    "Sector 67",
    "Sohna Road",
    "New Chandigarh",
  ];
  const intent = intentMap[idx] ?? "sale";
  const title = `${titleMap[idx % titleMap.length]} ${idx + 1}`;
  const locality = localityMap[idx % localityMap.length];

  return {
    id: `recent-${idx + 1}`,
    title,
    address: `${25 + idx}, ${locality} Apartment`,
    city: "Chandigarh",
    postedBy: idx % 2 === 0 ? "owner" : "channel_partner",
    listingIntent: intent,
    priceValue: intent === "rent" ? 45000 + idx * 500 : 9000000 + idx * 350000,
    priceLabel:
      intent === "rent"
        ? `₹ ${(45000 + idx * 500).toLocaleString("en-IN")} / month`
        : `₹ ${(9000000 + idx * 350000).toLocaleString("en-IN")}`,
    plotAreaSqYd: 180 + idx * 2,
    bedrooms: 2 + (idx % 3),
    view: "Park Facing",
    furnishing: idx % 2 === 0 ? "furnished" : "semi-furnished",
    images: ["/assets/properties_pic_1.png"],
    mediaCounts: { photos: 10, videos: 2 },
    agent: {
      name: idx % 2 === 0 ? "KMA Expert" : "Channel Partner",
      badge: idx % 2 === 0 ? "Owner" : "Channel Partner",
      avatarUrl: "/assets/profile.png",
    },
    tags: ["prime_location", "safe_secure_locality"],
    buildingType: idx % 4 === 0 ? "commercial" : "residential",
    propertyType: "apartment",
    locality,
    possessionStatus: idx % 3 === 0 ? "under_construction" : "ready_to_move",
    activitySection: sectionMap[idx] ?? "recentlyViewed",
    viewedAt: new Date(Date.now() - idx * 86400000).toISOString(),
  };
});

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

  const listingTypeApi = activeIntent === "buy" ? "sale" : activeIntent === "rent" ? "rent" : "sale";
  const sortApi: "newest" | "oldest" | "price_high" | "price_low" | undefined =
    sortBy === "latest" ? "newest" : sortBy === "price_low_high" ? "price_low" : sortBy === "price_high_low" ? "price_high" : "newest";

  const {
    properties: apiRecentlyViewed,
    total: recentlyViewedTotal,
    totalPages: apiTotalPages,
    isPending: isRecentlyViewedLoading,
    isError: isRecentlyViewedError,
  } = useRecentlyViewedProperties({
    page: currentPage,
    limit: PAGE_SIZE,
    listingType: listingTypeApi,
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
    listingType: listingTypeApi,
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
    listingType: listingTypeApi,
    sort: sortApi,
    enabled: activeSection === "saved",
  });

  const recentlyViewedAsActivityProjects = useMemo<ActivityProject[]>(() => {
    const mapOptions = { toFullAssetUrl, fallbackImage: fallbackProjectImage };
    return apiRecentlyViewed.map((item) => {
      const project = mapApiPropertyToProject(item, mapOptions);
      return {
        ...project,
        activitySection: "recentlyViewed" as const,
        viewedAt: "",
      };
    });
  }, [apiRecentlyViewed]);

  const contactedAsActivityProjects = useMemo<ActivityProject[]>(() => {
    const mapOptions = { toFullAssetUrl, fallbackImage: fallbackProjectImage };
    return contactedProperties.map((item) => {
      const project = mapApiPropertyToProject(item, mapOptions);
      return {
        ...project,
        activitySection: "contacted" as const,
        viewedAt: "",
      };
    });
  }, [contactedProperties]);

  const savedAsActivityProjects = useMemo<ActivityProject[]>(() => {
    const mapOptions = { toFullAssetUrl, fallbackImage: fallbackProjectImage };
    return favoriteProperties.map((item) => {
      const project = mapApiPropertyToProject(item, mapOptions);
      return {
        ...project,
        activitySection: "saved" as const,
        viewedAt: "",
      };
    });
  }, [favoriteProperties]);

  const filteredMockProjects = useMemo(() => {
    const bySection = allActivityProjects.filter((project) => project.activitySection === activeSection);
    const byIntent = bySection.filter((project) => {
      if (activeIntent === "buy") return project.listingIntent === "sale";
      if (activeIntent === "rent") return project.listingIntent === "rent";
      return project.buildingType === "commercial";
    });
    const sorted = [...byIntent].sort((a, b) => {
      if (sortBy === "latest") return new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime();
      if (sortBy === "price_low_high") return a.priceValue - b.priceValue;
      return b.priceValue - a.priceValue;
    });
    return sorted;
  }, [activeIntent, activeSection, sortBy]);

  const isRecentlyViewedTab = activeSection === "recentlyViewed";
  const isRecentSearchTab = activeSection === "recentSearch";
  const isContactedTab = activeSection === "contacted";
  const isSavedTab = activeSection === "saved";
  const mockTotalPages = Math.max(1, Math.ceil(filteredMockProjects.length / PAGE_SIZE));
  const totalPages = isRecentlyViewedTab
    ? apiTotalPages
    : isRecentSearchTab
      ? recentSearchTotalPages
      : isContactedTab
        ? contactedTotalPages
        : isSavedTab
          ? favoritesTotalPages
          : mockTotalPages;
  const paginatedMock = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredMockProjects.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredMockProjects]);
  const visibleProjects: ActivityProject[] = isRecentlyViewedTab
    ? recentlyViewedAsActivityProjects
    : isContactedTab
      ? contactedAsActivityProjects
      : isSavedTab
        ? savedAsActivityProjects
        : paginatedMock;

  const showingCount = isRecentSearchTab
    ? recentSearches.length
    : visibleProjects.length;
  const totalCount = isRecentSearchTab
    ? recentlySearchedTotal
    : isRecentlyViewedTab
      ? recentlyViewedTotal
      : isContactedTab
        ? contactedTotal
        : isSavedTab
          ? favoritesTotal
          : filteredMockProjects.length;
  const rangeStart =
    showingCount > 0
      ? (currentPage - 1) * (isRecentSearchTab ? RECENT_SEARCH_PAGE_SIZE : PAGE_SIZE) + 1
      : 0;
  const rangeEnd = showingCount > 0 ? rangeStart + showingCount - 1 : 0;

  const activityTabs = useMemo(
    () =>
      ACTIVITY_TABS.map((tab) => ({
        ...tab,
        count:
          tab.key === "recentlyViewed"
            ? String(recentlyViewedTotal)
            : tab.key === "recentSearch"
              ? String(recentlySearchedTotal)
              : tab.key === "contacted"
                ? String(contactedTotal)
                : tab.key === "saved"
                  ? String(favoritesTotal)
                  : "0",
      })),
    [recentlyViewedTotal, recentlySearchedTotal, contactedTotal, favoritesTotal]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeSection, activeIntent, sortBy, searchSortBy]);

  return (
    <div className="w-full">
      <section className="relative">
        <div className="relative h-[310px] overflow-hidden rounded-[0_0_28px_28px] sm:rounded-[0_0_44px_44px]">
          {/* <Image src="/assets/properties_pic_1.png" alt="recently viewed hero" fill className="object-cover" /> */}
          {/* <div className="absolute inset-0 bg-[#020C2A]/65" /> */}

          <div className="relative z-10 px-4 pt-4 sm:px-6 lg:px-8">
            <p className="text-xs font-medium text-white/90">
              Home <span className="px-1">/</span> Recently Viewed
            </p>

            <div className="mt-14 text-center">
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">Track Your Journey</h1>
              <p className="mx-auto mt-3 max-w-[540px] text-sm text-white/80 sm:text-base">
                Review your recently searched, viewed, saved, and contacted properties all in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-[245px] z-20 w-full rounded-xl border border-[#EAECF0] bg-white p-4 sm:p-5">
          <h3 className="text-[22px] font-semibold text-[#1E2236]">Filter</h3>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {activityTabs.map((tab) => {
                const isActive = tab.key === activeSection;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => selectActivityTab(tab.key)}
                    className={`inline-flex h-9 items-center overflow-hidden rounded border text-xs ${
                      isActive ? "border-[#0C145E] bg-white text-[#0C145E]" : "border-[#E4E7EE] bg-white text-[#8A90A2]"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5 px-2.5">
                      <Image
                        src={tab.icon}
                        width={12}
                        height={12}
                        alt={tab.label}
                        className={isActive ? "" : "opacity-70"}
                      />
                      <span>{tab.label}</span>
                    </span>
                    <span
                      className={`inline-flex h-full min-w-7 items-center justify-center border-l px-2 text-[11px] font-semibold ${
                        isActive
                          ? "border-[#0C145E] bg-[#0C145E] text-white"
                          : "border-[#E4E7EE] bg-[#F8F9FC] text-[#0C145E]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-5 pr-1">
              {(["buy", "rent", "commercial"] as const).map((intent) => {
                const isSelected = activeIntent === intent;
                return (
                  <label key={intent} className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-[#3B4259] sm:text-sm">
                    <button
                      type="button"
                      onClick={() => setActiveIntent(intent)}
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        isSelected ? "border-[#0C145E]" : "border-[#A5A7B5]"
                      }`}
                      aria-label={`Filter ${intent}`}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? <span className="h-2 w-2 rounded-full bg-[#0C145E]" /> : null}
                    </button>
                    <span className="capitalize">{intent}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[90px] rounded-xl">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-[#1E2236] sm:text-2xl">
              {isRecentlyViewedTab
                ? "Your Recent Picks (Recently Viewed)"
                : isRecentSearchTab
                  ? "Recently Searched"
                  : isContactedTab
                    ? "Contacted Properties"
                    : isSavedTab
                      ? "Saved Properties"
                      : "Your Activity"}
            </h2>
            <p className="mt-1 text-sm text-[#8A90A2]">
              {isRecentSearchTab
                ? "Your recent search queries. Search again to see current results."
                : isContactedTab
                  ? "Properties you have contacted or inquired about."
                  : isSavedTab
                    ? "Properties you have saved as favorites."
                    : "A quick look at the properties that caught your eye."}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end">
            {isRecentSearchTab ? (
              <>
                <label htmlFor="search-sort" className="text-sm font-medium text-[#343A4F]">
                  Sort By :
                </label>
                <div className="relative">
                  <select
                    id="search-sort"
                    value={searchSortBy}
                    onChange={(e) => setSearchSortBy(e.target.value as "recent" | "relevance")}
                    className="h-9 min-w-[140px] appearance-none rounded border border-[#E3E6EF] bg-[#F8F9FC] pl-3 pr-8 text-sm text-[#6B7280] outline-none"
                  >
                    <option value="recent">Most recent</option>
                    <option value="relevance">Relevance</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                </div>
              </>
            ) : (
              <>
                <label htmlFor="recent-sort" className="text-sm font-medium text-[#343A4F]">
                  Sort By :
                </label>
                <div className="relative">
                  <select
                    id="recent-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortType)}
                    className="h-9 min-w-[140px] appearance-none rounded border border-[#E3E6EF] bg-[#F8F9FC] pl-3 pr-8 text-sm text-[#6B7280] outline-none"
                  >
                    <option value="latest">Relevance</option>
                    <option value="price_low_high">Price: Low to High</option>
                    <option value="price_high_low">Price: High to Low</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                </div>
              </>
            )}
          </div>
        </div>

        <p className="mt-5 text-sm font-medium text-[#6B7280]">
          Showing{" "}
          {showingCount > 0 ? `${rangeStart}-${rangeEnd}` : "0"} of {totalCount} Results
        </p>

        <div className="relative mt-4">
          {isRecentlyViewedTab && isRecentlyViewedLoading && (
            <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] py-12">
              <p className="text-sm text-[#6B7280]">Loading recently viewed properties…</p>
            </div>
          )}
          {isRecentlyViewedTab && isRecentlyViewedError && !isRecentlyViewedLoading && (
            <div className="rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] p-8 text-center text-sm text-[#6B7280]">
              Unable to load recently viewed properties. Please try again later.
            </div>
          )}
          {isRecentSearchTab && isRecentlySearchedLoading && (
            <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] py-12">
              <p className="text-sm text-[#6B7280]">Loading recent searches…</p>
            </div>
          )}
          {isRecentSearchTab && isRecentlySearchedError && !isRecentlySearchedLoading && (
            <div className="rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] p-8 text-center text-sm text-[#6B7280]">
              Unable to load recent searches. Please try again later.
            </div>
          )}
          {isContactedTab && isContactedLoading && (
            <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] py-12">
              <p className="text-sm text-[#6B7280]">Loading contacted properties…</p>
            </div>
          )}
          {isContactedTab && isContactedError && !isContactedLoading && (
            <div className="rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] p-8 text-center text-sm text-[#6B7280]">
              Unable to load contacted properties. Please try again later.
            </div>
          )}
          {isSavedTab && isFavoritesLoading && (
            <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] py-12">
              <p className="text-sm text-[#6B7280]">Loading saved properties…</p>
            </div>
          )}
          {isSavedTab && isFavoritesError && !isFavoritesLoading && (
            <div className="rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] p-8 text-center text-sm text-[#6B7280]">
              Unable to load saved properties. Please try again later.
            </div>
          )}
          {isRecentSearchTab && !isRecentlySearchedLoading && !isRecentlySearchedError && (
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
          {!isRecentSearchTab &&
            !(isRecentlyViewedTab && (isRecentlyViewedLoading || isRecentlyViewedError)) &&
            !(isContactedTab && (isContactedLoading || isContactedError)) &&
            !(isSavedTab && (isFavoritesLoading || isFavoritesError)) && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {visibleProjects.map((project) => {
              const detailsHref = `/projects/${project.id}/${project.id}`;
              return (
                <div key={project.id}>
                  <CompactPropertyCard project={project} detailsHref={detailsHref} />
                </div>
              );
            })}
          </div>
          )}

        </div>

        {((isRecentSearchTab && recentSearches.length === 0) || (!isRecentSearchTab && visibleProjects.length === 0)) &&
          !isRecentlyViewedLoading &&
          !isRecentlySearchedLoading &&
          !isContactedLoading &&
          !isFavoritesLoading && (
            <div className="mt-4 rounded-xl border border-border bg-white p-8 text-center text-text-gray">
              {isRecentlyViewedTab
                ? "No recently viewed properties yet."
                : isRecentSearchTab
                  ? "No recent searches yet."
                  : isContactedTab
                    ? "No contacted properties yet."
                    : isSavedTab
                      ? "No saved properties yet."
                      : "No properties available for this filter."}
            </div>
          )}

        {totalPages > 1 && (
          <div className="mt-2 flex justify-end">
            <ProjectsPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </section>
    </div>
  );
}
