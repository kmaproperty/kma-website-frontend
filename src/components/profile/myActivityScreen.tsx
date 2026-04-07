"use client";

import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, ChevronDown, ChevronLeft, ChevronRight, Heart, Images, Maximize2, Search, Video } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useRecentlyViewedProperties } from "@/api/hooks/useRecentlyViewedProperties";
import { useRecentlySearched } from "@/api/hooks/useRecentlySearched";
import { useContactedProperties } from "@/api/hooks/useContactedProperties";
import { useFavoriteProperties } from "@/api/hooks/useFavoriteProperties";
import type { RecentSearchItem } from "@/api/actions/propertyActions";
import type { Project } from "@/app/projects/_types";
import { mapApiPropertyToProject } from "@/app/projects/_utils/mapApiPropertyToProject";

const PAGE_SIZE = 12;
const RECENT_SEARCH_PAGE_SIZE = 10;
const awsBaseUrl = process.env.NEXT_PUBLIC_AWS_URL ?? "";
const fallbackImage = "/assets/properties_pic_1.png";

const toFullAssetUrl = (value?: string | null) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (!awsBaseUrl) return value;
  return `${awsBaseUrl}${value}`;
};

type ActivitySection = "recentSearch" | "saved" | "contacted" | "recentlyViewed";
type PropertyIntent = "buy" | "rent";
type SortType = "latest" | "price_low_high" | "price_high_low";

const ACTIVITY_TABS: Array<{ key: ActivitySection; label: string; icon: string }> = [
  { key: "recentSearch", label: "Recently Search", icon: "/assets/home-search-blue.svg" },
  { key: "saved", label: "Saved Properties", icon: "/assets/home-save-blue.svg" },
  { key: "contacted", label: "Contacted", icon: "/assets/home-contact-blue.svg" },
  { key: "recentlyViewed", label: "Recently Viewed", icon: "/assets/home-recent-blue.svg" },
];

function ActivityPropertyCard({ project }: { project: Project }) {
  const href = `/projects/${project.id}/${project.id}`;
  return (
    <Link href={href} className="block">
      <article className="w-full overflow-hidden rounded-lg border border-[#E6E8EF] bg-white shadow-[0_4px_14px_rgba(10,24,61,0.08)] transition hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(10,24,61,0.11)]">
        <div className="relative h-[145px]">
          <Image
            src={project.images?.[0] || fallbackImage}
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
            onClick={(e) => e.preventDefault()}
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

function RecentSearchCardRow({ search }: { search: RecentSearchItem }) {
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
  const searchAgainHref = `/projects?q=${encodeURIComponent(search.searchQuery)}`;

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

/** Shared loading / error / empty states for property-grid sections */
function SectionState({
  isLoading,
  isError,
  isEmpty,
  loadingLabel,
  emptyLabel,
}: {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  loadingLabel: string;
  emptyLabel: string;
}) {
  if (isLoading) {
    return (
      <div className="mt-4 flex min-h-[200px] items-center justify-center rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] py-12">
        <p className="text-sm text-[#6B7280]">{loadingLabel}</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="mt-4 rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] p-8 text-center text-sm text-[#6B7280]">
        Unable to load properties. Please try again later.
      </div>
    );
  }
  if (isEmpty) {
    return (
      <div className="mt-4 rounded-xl border border-border bg-white p-8 text-center text-text-gray">
        {emptyLabel}
      </div>
    );
  }
  return null;
}

/** Grid of property cards with pagination */
function PropertyGrid({
  projects,
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  projects: Project[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ActivityPropertyCard key={project.id} project={project} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="flex items-center px-2 text-sm text-text-gray">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default function MyActivityScreen() {
  const [activeSection, setActiveSection] = useState<ActivitySection>("recentlyViewed");
  const [activeIntent, setActiveIntent] = useState<PropertyIntent>("buy");
  const [sortBy, setSortBy] = useState<SortType>("latest");
  const [searchSortBy, setSearchSortBy] = useState<"recent" | "relevance">("recent");
  const [currentPage, setCurrentPage] = useState(1);

  // Map intent to the API's listingType param: "buy" -> "sale", "rent" -> "rent"
  const listingTypeApi: "sale" | "rent" = activeIntent === "buy" ? "sale" : "rent";
  const sortApi: "newest" | "oldest" | "price_high" | "price_low" =
    sortBy === "latest" ? "newest" : sortBy === "price_low_high" ? "price_low" : "price_high";

  const {
    properties: apiRecentlyViewed,
    total: recentlyViewedTotal,
    totalPages: recentlyViewedTotalPages,
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

  const mapOptions = useMemo(() => ({ toFullAssetUrl, fallbackImage }), []);

  const recentlyViewedProjects = useMemo<Project[]>(() => {
    return apiRecentlyViewed.map((item) => mapApiPropertyToProject(item, mapOptions));
  }, [apiRecentlyViewed, mapOptions]);

  const contactedProjects = useMemo<Project[]>(() => {
    return contactedProperties.map((item) => mapApiPropertyToProject(item, mapOptions));
  }, [contactedProperties, mapOptions]);

  const savedProjects = useMemo<Project[]>(() => {
    return favoriteProperties.map((item) => mapApiPropertyToProject(item, mapOptions));
  }, [favoriteProperties, mapOptions]);

  const activityTabsWithCount = useMemo(
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

  const showIntentFilter = activeSection === "saved" || activeSection === "recentlyViewed" || activeSection === "contacted";
  const showSortFilter = activeSection === "recentlyViewed" || activeSection === "contacted" || activeSection === "saved" || activeSection === "recentSearch";

  return (
    <div className="rounded-2xl bg-white p-4 sm:p-4.5 lg:p-5">
      <h2 className="text-[28px] font-semibold leading-none text-text-black">My Activity</h2>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {activityTabsWithCount.map((tab) => {
          const isActive = tab.key === activeSection;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveSection(tab.key)}
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs transition sm:text-sm ${
                isActive
                  ? "border-[#0C145E] bg-[#0C145E] text-white"
                  : "border-border bg-[#F5F6FA] text-text-gray hover:border-[#CDD3E0] hover:text-text-black"
              }`}
            >
              <Image src={tab.icon} width={14} height={14} alt={tab.label} className={isActive ? "brightness-0 invert" : ""} />
              <span>{tab.label}</span>
              <span className={`rounded-md px-1.5 py-[2px] text-[11px] font-semibold ${isActive ? "bg-white/20 text-white" : "bg-white text-[#0C145E]"}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {showIntentFilter && (
        <div className="mt-5 flex flex-wrap items-center gap-6">
          {(["buy", "rent"] as const).map((intent) => {
            const isSelected = activeIntent === intent;
            return (
              <label key={intent} className="flex cursor-pointer items-center gap-2 text-sm text-text-black">
                <button
                  type="button"
                  onClick={() => setActiveIntent(intent)}
                  className={`flex h-4 w-4 items-center justify-center rounded-full border transition ${isSelected ? "border-[#0C145E]" : "border-[#A5A7B5]"}`}
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
      )}

      {showSortFilter && (
        <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
          <label htmlFor="activity-sort" className="text-sm font-medium text-[#343A4F]">
            Sort By :
          </label>
          <div className="relative">
            {activeSection === "recentSearch" ? (
              <select
                id="activity-sort"
                value={searchSortBy}
                onChange={(e) => setSearchSortBy(e.target.value as "recent" | "relevance")}
                className="h-9 min-w-[140px] appearance-none rounded border border-[#E3E6EF] bg-[#F8F9FC] pl-3 pr-8 text-sm text-[#6B7280] outline-none"
              >
                <option value="recent">Most recent</option>
                <option value="relevance">Relevance</option>
              </select>
            ) : (
              <select
                id="activity-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="h-9 min-w-[140px] appearance-none rounded border border-[#E3E6EF] bg-[#F8F9FC] pl-3 pr-8 text-sm text-[#6B7280] outline-none"
              >
                <option value="latest">Relevance</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
              </select>
            )}
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {activeSection === "recentlyViewed" && (
        <>
          <SectionState
            isLoading={isRecentlyViewedLoading}
            isError={isRecentlyViewedError && !isRecentlyViewedLoading}
            isEmpty={!isRecentlyViewedLoading && !isRecentlyViewedError && recentlyViewedProjects.length === 0}
            loadingLabel="Loading recently viewed..."
            emptyLabel="No recently viewed properties yet."
          />
          {!isRecentlyViewedLoading && !isRecentlyViewedError && recentlyViewedProjects.length > 0 && (
            <PropertyGrid
              projects={recentlyViewedProjects}
              totalPages={recentlyViewedTotalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}

      {/* Recent Search */}
      {activeSection === "recentSearch" && (
        <>
          <SectionState
            isLoading={isRecentlySearchedLoading}
            isError={isRecentlySearchedError && !isRecentlySearchedLoading}
            isEmpty={!isRecentlySearchedLoading && !isRecentlySearchedError && recentSearches.length === 0}
            loadingLabel="Loading recent searches..."
            emptyLabel="No recent searches yet."
          />
          {!isRecentlySearchedLoading && !isRecentlySearchedError && recentSearches.length > 0 && (
            <>
              <div className="mt-4 space-y-3">
                {recentSearches.map((search) => (
                  <RecentSearchCardRow key={search.id} search={search} />
                ))}
              </div>
              {recentSearchTotalPages > 1 && (
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="flex items-center px-2 text-sm text-text-gray">
                    {currentPage} / {recentSearchTotalPages}
                  </span>
                  <button
                    type="button"
                    disabled={currentPage >= recentSearchTotalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Contacted */}
      {activeSection === "contacted" && (
        <>
          <SectionState
            isLoading={isContactedLoading}
            isError={isContactedError && !isContactedLoading}
            isEmpty={!isContactedLoading && !isContactedError && contactedProjects.length === 0}
            loadingLabel="Loading contacted properties..."
            emptyLabel="No contacted properties yet."
          />
          {!isContactedLoading && !isContactedError && contactedProjects.length > 0 && (
            <PropertyGrid
              projects={contactedProjects}
              totalPages={contactedTotalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}

      {/* Saved (favorites API) */}
      {activeSection === "saved" && (
        <>
          <SectionState
            isLoading={isFavoritesLoading}
            isError={isFavoritesError && !isFavoritesLoading}
            isEmpty={!isFavoritesLoading && !isFavoritesError && savedProjects.length === 0}
            loadingLabel="Loading saved properties..."
            emptyLabel="No saved properties yet."
          />
          {!isFavoritesLoading && !isFavoritesError && savedProjects.length > 0 && (
            <PropertyGrid
              projects={savedProjects}
              totalPages={favoritesTotalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}
