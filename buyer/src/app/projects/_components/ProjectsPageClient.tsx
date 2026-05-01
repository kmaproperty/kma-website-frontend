"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useSelector } from "react-redux";
import { getSelectedCity, getPropertyMasterData } from "@/store/homeHeaderSlice";
import type { Project } from "../_types";
import FiltersSidebar from "./FiltersSidebar";
import ProjectsToolbar from "./ProjectsToolbar";
import ProjectCard from "./ProjectCard";
import { useProjectsStore } from "../_store/useProjectsStore";
import {
  useEndUserProperties,
  useEndUserPropertiesCount,
} from "@/api/hooks/useEndUserProperties";
import ProjectsPagination from "./ProjectsPagination";
import { getUserCoordinates } from "@/api/hooks/useGeoloaction";
import { buildProjectsRouteLabels } from "../_utils/routeLabels";

const awsBaseUrl = process.env.NEXT_PUBLIC_AWS_URL ?? "";
const fallbackProjectImage = "/assets/properties_pic_1.png";
const PAGE_SIZE = 20;

const toFullAssetUrl = (value?: string | null) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (!awsBaseUrl) return value;
  return `${awsBaseUrl}${value}`;
};

const parseBedrooms = (value?: string) => {
  if (!value) return undefined;
  const match = value.match(/\d+/);
  if (!match) return undefined;
  const n = Number(match[0]);
  return Number.isFinite(n) ? n : undefined;
};

const formatIndianNumber = (value: number) => {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(value);
};

const normalizeProjectType = (value?: string) => {
  const raw = (value ?? "").trim().toLowerCase();
  const key = raw.replace(/\s+/g, "_").replace(/\//g, "_");
  const map: Record<string, Project["propertyType"]> = {
    villa: "villa",
    plot: "plot",
    apartment: "apartment",
    flat_apartment: "apartment",
    penthouse: "penthouse",
    independent_floor: "ind_floor",
    independent_house: "ind_floor",
    ind_floor: "ind_floor",
    retail_shop: "retail_shop",
    office_space: "office_space",
  };
  return map[key] ?? map[raw] ?? undefined;
};

const normalizeFurnishing = (value?: string) => {
  const key = (value ?? "").trim().toLowerCase().replace(/[\s-]+/g, "_");
  if (key === "furnished") return "furnished";
  if (key === "unfurnished") return "unfurnished";
  if (key === "semi_furnished") return "semi-furnished";
  return undefined;
};

const normalizePostedBy = (value?: string) => {
  const key = (value ?? "").trim().toLowerCase();
  if (key === "owner") return "owner";
  if (key === "channel_partner" || key === "channel partner") {
    return "channel_partner";
  }
  return "owner";
};

const formatRoleBadge = (value?: string) => {
  if (!value) return undefined;
  const cleaned = value.trim();
  if (!cleaned) return undefined;
  return cleaned
    .toLowerCase()
    .split(/[\s_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const normalizeListingIntent = (value?: string) => {
  const key = (value ?? "").trim().toLowerCase();
  return key === "rent" ? "rent" : "sale";
};

/** Resolve listing type string from API (nested object or string). */
const resolveListingType = (item: { listingType?: string | { name?: string; code?: string } }) => {
  const lt = item.listingType;
  if (typeof lt === "string") return lt;
  if (lt && typeof lt === "object" && "code" in lt) return lt.code ?? lt.name ?? "";
  return "";
};

/** Resolve category string from API (nested object or string). */
const resolveCategory = (item: { category?: string | { name?: string; code?: string } }) => {
  const c = item.category;
  if (typeof c === "string") return c;
  if (c && typeof c === "object" && "name" in c) return c.name ?? c.code ?? "";
  return "";
};

/** Resolve property type string from API (nested object or string). */
const resolvePropertyType = (item: { propertyType?: string | { name?: string; code?: string } }) => {
  const pt = item.propertyType;
  if (typeof pt === "string") return pt;
  if (pt && typeof pt === "object" && "name" in pt) return pt.name ?? pt.code ?? "";
  return "";
};

/** Resolve BHK string from API (nested object or string). */
const resolveBhkType = (item: { bhkType?: string | { name?: string; code?: string } }) => {
  const b = item.bhkType;
  if (typeof b === "string") return b;
  if (b && typeof b === "object" && "name" in b) return b.name ?? b.code ?? "";
  return "";
};

/** Resolve city string from API (nested object or string). */
const resolveCity = (item: { city?: string | { name?: string } }) => {
  const c = item.city;
  if (typeof c === "string") return c;
  if (c && typeof c === "object" && "name" in c) return c.name ?? "";
  return "";
};

/** Resolve locality string from API (nested object or string). */
const resolveLocality = (item: { locality?: string | { name?: string } }) => {
  const l = item.locality;
  if (typeof l === "string") return l;
  if (l && typeof l === "object" && "name" in l) return l.name ?? "";
  return "";
};

/** Build image URLs from photos (prefer cover) or images, then fallback imageUrl. */
const getImageUrlsFromItem = (
  item: {
    photos?: Array<{ fileKey?: string; isCoverImage?: boolean | string }>;
    images?: Array<{ fileKey?: string }>;
    imageUrl?: string | null;
  },
  toFullUrl: (v?: string | null) => string,
  fallback: string
) => {
  const list = item.photos ?? item.images ?? [];
  const withCoverFirst = [...list].sort((a, b) => {
    const aCover = Boolean((a as { isCoverImage?: boolean | string }).isCoverImage);
    const bCover = Boolean((b as { isCoverImage?: boolean | string }).isCoverImage);
    if (aCover && !bCover) return -1;
    if (!aCover && bCover) return 1;
    return 0;
  });
  const urls = withCoverFirst
    .map((m) => toFullUrl(m?.fileKey))
    .filter(Boolean) as string[];
  if (urls.length) return urls;
  const single = toFullUrl(item.imageUrl);
  return single ? [single] : [fallback];
};

const uniqueNonEmpty = (values: string[]) =>
  Array.from(new Set(values.filter((value) => Boolean(value?.trim()))));

const getStringProp = (value: unknown, key: string) => {
  if (!value || typeof value !== "object") return undefined;
  const property = (value as Record<string, unknown>)[key];
  return typeof property === "string" && property.trim() ? property : undefined;
};

const normalizeBuildingType = (value?: string) => {
  const key = (value ?? "").trim().toLowerCase();
  if (key === "commercial") return "commercial";
  if (key.length > 0) return "residential";
  return undefined;
};

export default function ProjectsPageClient({ cityId }: { cityId?: string }) {
  const router = useRouter();
  const selectedCity = useSelector(getSelectedCity) as { name?: string } | null;
  const propertyMasterData = useSelector(getPropertyMasterData);
  const tab = useProjectsStore((s) => s.tab);
  const sort = useProjectsStore((s) => s.sort);
  const filters = useProjectsStore((s) => s.filters);
  const setFilters = useProjectsStore((s) => s.setFilters);
  const setListingIntentInStore = useProjectsStore((s) => s.setListingIntent);
  const [currentPage, setCurrentPage] = useState(1);
  const [nearMeCoords, setNearMeCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [listingTypeId, setListingTypeId] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filtersPortalReady, setFiltersPortalReady] = useState(false);

  useEffect(() => {
    setFiltersPortalReady(true);
  }, []);

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileFiltersOpen]);

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileFiltersOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileFiltersOpen]);

  // Apply filters from URL query params (from homepage search / header dropdown)
  const searchParams = useSearchParams();
  const cityNameFromQuery = searchParams.get("cityName")?.trim() || undefined;
  const appliedQueryRef = useRef<string | null>(null);
  useEffect(() => {
    const queryKey = searchParams.toString();
    if (!queryKey || appliedQueryRef.current === queryKey) return;
    appliedQueryRef.current = queryKey;

    const ltId = searchParams.get('listingTypeId') || searchParams.get('listingType');
    if (ltId) {
      // If it's a name like "rent"/"sale" instead of UUID, ignore it (backend expects UUID)
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(ltId);
      if (isUuid) setListingTypeId(ltId);
    }

    const patch: Partial<typeof filters> = {};

    const propertyTypeId = searchParams.get('propertyTypeId');
    const propertyTypeIds = searchParams.get('propertyTypeIds');
    if (propertyTypeId) {
      patch.propertyTypeIds = [propertyTypeId];
    } else if (propertyTypeIds) {
      patch.propertyTypeIds = propertyTypeIds.split(',').filter(Boolean);
    }

    const search = searchParams.get('search');
    if (search) patch.searchText = search;

    const minPrice = searchParams.get('minPrice');
    if (minPrice) patch.minBudget = Number(minPrice) || null;

    const maxPrice = searchParams.get('maxPrice');
    if (maxPrice) patch.maxBudget = Number(maxPrice) || null;

    const constructionStatuses = searchParams.get('constructionStatuses');
    if (constructionStatuses) {
      patch.possessionStatuses = constructionStatuses.split(',').filter(Boolean) as typeof filters.possessionStatuses;
    }

    const furnishingTypes = searchParams.get('furnishingTypes');
    if (furnishingTypes) {
      patch.furnishingTypeId = furnishingTypes.split(',')[0] || null;
    }

    const categoryIds = searchParams.get('categoryIds');
    if (categoryIds) {
      patch.categoryId = categoryIds.split(',')[0] || null;
    }

    if (Object.keys(patch).length > 0) {
      setFilters(patch);
    }
  }, [searchParams, setFilters]);

  // Resolve listingTypeId UUID → "rent" | "sale" code via the master data so
  // the sidebar can swap budget options. Falls back to the URL param name when
  // the master data hasn't loaded yet.
  useEffect(() => {
    const masterData = Array.isArray(propertyMasterData) ? (propertyMasterData as Array<{ id: string; code?: string }>) : [];
    if (listingTypeId) {
      const match = masterData.find((lt) => lt.id === listingTypeId);
      const code = (match?.code ?? "").toLowerCase();
      if (code === "rent" || code === "sale") {
        setListingIntentInStore(code);
        return;
      }
    }
    const raw = (searchParams.get("listingType") ?? "").toLowerCase();
    if (raw === "rent" || raw === "sale") {
      setListingIntentInStore(raw);
    } else if (!listingTypeId) {
      setListingIntentInStore(null);
    }
  }, [listingTypeId, propertyMasterData, searchParams, setListingIntentInStore]);

  const deferredFilters = useDeferredValue(filters);
  const deferredSort = useDeferredValue(sort);
  const deferredTab = useDeferredValue(tab);

  const baseQueryParams = useMemo(() => {
    const searchParts = [
      deferredFilters.searchText?.trim(),
      deferredFilters.searchLocality?.trim(),
    ].filter(Boolean);
    const search = searchParts.length ? searchParts.join(" ") : undefined;

    return {
      search,
      cityId,
      postedBy:
        deferredTab === "all"
          ? undefined
          : deferredTab === "owner"
            ? "OWNER"
            : "CHANNEL_PARTNER",
      minPrice:
        deferredFilters.minBudget != null
          ? Math.round(deferredFilters.minBudget)
          : undefined,
      maxPrice:
        deferredFilters.maxBudget != null
          ? Math.round(deferredFilters.maxBudget)
          : undefined,
      categoryIds:
        deferredFilters.categoryId != null
          ? [deferredFilters.categoryId]
          : undefined,
      propertyTypeIds:
        deferredFilters.propertyTypeIds.length > 0
          ? uniqueNonEmpty(deferredFilters.propertyTypeIds)
          : undefined,
      bhkTypeIds:
        deferredFilters.bhkTypeIds.length > 0
          ? uniqueNonEmpty(deferredFilters.bhkTypeIds)
          : undefined,
      furnishingTypes:
        deferredFilters.furnishingTypeId != null
          ? [deferredFilters.furnishingTypeId]
          : undefined,
      constructionStatuses:
        deferredFilters.possessionStatuses.length > 0
          ? deferredFilters.possessionStatuses
          : undefined,
      listingTypeIds:
        listingTypeId ? [listingTypeId] : undefined,
      sortBy: "price",
      sortOrder: deferredSort === "price_low_high" ? "ASC" : "DESC",
      latitude: nearMeCoords?.latitude,
      longitude: nearMeCoords?.longitude,
    };
  }, [cityId, deferredFilters, deferredSort, deferredTab, nearMeCoords, listingTypeId]);

  const apiQueryParams = useMemo(
    () => ({
      ...baseQueryParams,
      page: currentPage,
      limit: PAGE_SIZE,
    }),
    [baseQueryParams, currentPage]
  );

  const paginationResetKey = useMemo(
    () => JSON.stringify(baseQueryParams),
    [baseQueryParams]
  );

  const { data: apiProperties = [], isPending, isError } =
    useEndUserProperties(apiQueryParams);
  const { data: totalCount = 0 } = useEndUserPropertiesCount(baseQueryParams);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [paginationResetKey]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const initialProjects = useMemo<Project[]>(() => {
    return apiProperties.map((item) => {
      const listingIntent = normalizeListingIntent(resolveListingType(item));
      const salePrice = Number(item.price ?? 0);
      const monthlyRent = Number(item.monthlyRent ?? 0);
      const priceValue =
        listingIntent === "rent"
          ? monthlyRent > 0
            ? monthlyRent / 100_000
            : 0
          : salePrice > 0
            ? salePrice / 10_000_000
            : 0;

      const priceLabel =
        listingIntent === "rent"
          ? monthlyRent > 0
            ? `₹ ${formatIndianNumber(monthlyRent)} / month`
            : "Price on request"
          : salePrice > 0
            ? `₹ ${formatIndianNumber(salePrice)}`
            : "Price on request";

      const imageUrls = getImageUrlsFromItem(item, toFullAssetUrl, fallbackProjectImage);
      const localityStr = resolveLocality(item);
      const cityStr = resolveCity(item);
      const society = item.society;
      const address =
        (typeof society === "object" && society?.address) ||
        (typeof item.address === "string" ? item.address : "") ||
        "";
      const titleParts = [
        resolveBhkType(item),
        resolvePropertyType(item),
        typeof society === "object" && society?.name,
        localityStr,
      ].filter(Boolean);
      const title =
        (typeof item.propertyName === "string" && item.propertyName.trim()) ||
        (typeof item.title === "string" && item.title.trim()) ||
        (titleParts.length ? titleParts.join(" in ") : "Property");

      const postedByRole =
        getStringProp(item.user, "role") ??
        getStringProp(item.owner, "role") ??
        (typeof item.postedBy === "string" ? item.postedBy : undefined);
      const ownerName =
        getStringProp(item.owner, "name") ?? getStringProp(item.user, "name");
      const ownerProfileImage =
        getStringProp(item.owner, "profileImage") ??
        getStringProp(item.user, "profileImage") ??
        getStringProp(item.user, "avatar");
      const furnishingRaw =
        typeof item.furnishType === "string"
          ? item.furnishType
          : (item.furnishingType as string | undefined);

      return {
        id: item.id,
        title,
        address,
        city: cityStr,
        isFavorite: Boolean(item.isFavorite),
        postedBy: normalizePostedBy(postedByRole as string | undefined),
        listingIntent,
        priceValue,
        priceLabel,
        plotAreaSqYd: typeof item.plotArea === "number" ? item.plotArea : undefined,
        bedrooms: parseBedrooms(resolveBhkType(item)),
        view: typeof item.facing === "string" ? item.facing : undefined,
        furnishing: normalizeFurnishing(furnishingRaw),
        locality: localityStr,
        propertyType: normalizeProjectType(resolvePropertyType(item)),
        buildingType: normalizeBuildingType(resolveCategory(item)),
        possessionStatus:
          item.constructionStatus === "under_construction"
            ? "under_construction"
            : item.constructionStatus
              ? "ready_to_move"
              : undefined,
        images: imageUrls,
        mediaCounts: {
          photos: imageUrls.length || 1,
          videos: Array.isArray(item.videos) ? item.videos.length : 0,
        },
        agent:
          ownerName || postedByRole || ownerProfileImage
            ? {
                name: ownerName ?? "KMA Expert",
                badge: formatRoleBadge(postedByRole),
                avatarUrl: toFullAssetUrl(ownerProfileImage),
              }
            : undefined,
      } satisfies Project;
    });
  }, [apiProperties]);

  const routeLabels = useMemo(() => {
    const cityName =
      cityNameFromQuery ??
      selectedCity?.name ??
      initialProjects[0]?.city ??
      undefined;

    return buildProjectsRouteLabels({
      cityName,
      listingTypeId,
      categoryId: filters.categoryId,
      propertyTypeIds: filters.propertyTypeIds,
      propertyMasterData,
    });
  }, [
    cityNameFromQuery,
    selectedCity?.name,
    initialProjects,
    listingTypeId,
    filters.categoryId,
    filters.propertyTypeIds,
    propertyMasterData,
  ]);

  const handleNearMeClick = async () => {
    if (isLocating) return;

    setIsLocating(true);
    const coordinates = await getUserCoordinates();
    setIsLocating(false);

    if (!coordinates) return;

    setNearMeCoords({
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    });
    setCurrentPage(1);
  };

  const cityLabel = initialProjects[0]?.city || "Gurgaon";
  const lastUpdatedLabel = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    []
  );

  return (
    <div className="w-full min-w-0">
      <div className="hidden w-full md:block lg:px-8">
        <div className="text-xs font-medium text-text-light-gray">
          Home <span className="px-1">/</span>
          <span className="text-white"> New Properties in {initialProjects[0]?.city}</span>
        </div>
      </div>

      <section className="mt-7 w-full px-0 sm:px-6 lg:px-8">
        <div className="p-0 md:rounded-none md:border-0 md:bg-transparent md:p-0">
        <div className="mb-4 md:px-0 px-4 md:hidden">
          <div className="mb-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/projects")}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#D8DAE1] bg-[#F4F5F8] text-[#0A0E67]"
              aria-label="Back to listings"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-[13px] text-[#8E8F95]">
                Home / <span className="font-semibold text-[#0A0E67] underline underline-offset-2">New Project in {cityLabel}</span>
              </p>
            </div>
          </div>
          <h2 className="text-[24px] font-semibold leading-[1.15] text-[#1B2230]">
            Property for Sale in {cityLabel}
          </h2>
          <div className="mt-4 flex items-center gap-2">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-gray" />
              <input
                value={filters.searchText}
                onChange={(e) => setFilters({ searchText: e.target.value })}
                placeholder="Search by Project Name, Builder...."
                className="h-12 w-full rounded-full border border-border bg-white px-12 pr-4 text-sm text-text-black outline-none transition focus:border-blue"
              />
            </div>
            <button
              type="button"
              onClick={handleNearMeClick}
              disabled={isLocating}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-white text-text-gray"
              aria-label="Near me properties"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_mobile_nearme)">
                  <path d="M12 7.63635C9.5891 7.63635 7.6364 9.5891 7.6364 12C7.6364 14.4109 9.5891 16.3636 12 16.3636C14.411 16.3636 16.3636 14.4109 16.3636 12C16.3636 9.58915 14.4109 7.63635 12 7.63635ZM21.7528 10.9091C21.2509 6.35999 17.64 2.74909 13.0909 2.24729V0H10.9091V2.24729C6.35999 2.74909 2.74909 6.35999 2.24729 10.9091H0V13.0909H2.24729C2.74909 17.64 6.36004 21.2509 10.9091 21.7528V24H13.0909V21.7528C17.64 21.2509 21.2509 17.64 21.7528 13.0909H24V10.9091H21.7528ZM12 19.6364C7.78368 19.6364 4.36367 16.2164 4.36367 12C4.36367 7.78368 7.78368 4.36367 12 4.36367C16.2164 4.36367 19.6364 7.78362 19.6364 12C19.6364 16.2164 16.2164 19.6364 12 19.6364Z" fill="#888888" />
                </g>
                <defs>
                  <clipPath id="clip0_mobile_nearme">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-[#8E8F95]">
            <p>
              Showing <span className="font-semibold text-[#0A0E67]">{totalCount} Projects</span>
            </p>
            <p>Last Updated {lastUpdatedLabel}</p>
          </div>
        </div>

        <div className="relative">
          <h1 className="mt-3 hidden text-2xl font-semibold text-white md:block lg:text-3xl">
            All Properties List
          </h1>

          <div className="mt-4 hidden w-full flex-col gap-3 rounded-[28px] bg-white p-4 md:absolute md:right-0 md:top-15 md:mt-0 md:flex md:w-[73%] md:max-w-[73%] md:flex-row md:items-stretch md:gap-3 md:rounded-[34px_34px_0_0] md:border-b-0 md:p-5">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-gray" />

              <input
                value={filters.searchText}
                onChange={(e) => setFilters({ searchText: e.target.value })}
                placeholder="Search by Neighborhood...."
                className="h-12 w-full rounded-full border border-border bg-white px-12 pr-4 text-sm text-text-black outline-none transition focus:border-blue"
              />
            </div>

            {/* <button
              type="button"
              onClick={handleNearMeClick}
              disabled={isLocating}
              className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-background-gray px-4 text-sm font-medium text-text-gray transition hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/20 sm:w-auto sm:px-6"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1_12821)">
                  <path d="M12 7.63635C9.5891 7.63635 7.6364 9.5891 7.6364 12C7.6364 14.4109 9.5891 16.3636 12 16.3636C14.411 16.3636 16.3636 14.4109 16.3636 12C16.3636 9.58915 14.4109 7.63635 12 7.63635ZM21.7528 10.9091C21.2509 6.35999 17.64 2.74909 13.0909 2.24729V0H10.9091V2.24729C6.35999 2.74909 2.74909 6.35999 2.24729 10.9091H0V13.0909H2.24729C2.74909 17.64 6.36004 21.2509 10.9091 21.7528V24H13.0909V21.7528C17.64 21.2509 21.2509 17.64 21.7528 13.0909H24V10.9091H21.7528ZM12 19.6364C7.78368 19.6364 4.36367 16.2164 4.36367 12C4.36367 7.78368 7.78368 4.36367 12 4.36367C16.2164 4.36367 19.6364 7.78362 19.6364 12C19.6364 16.2164 16.2164 19.6364 12 19.6364Z" fill="#888888" />
                </g>
                <defs>
                  <clipPath id="clip0_1_12821">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              {isLocating ? "Locating..." : "Near Me Properties"}
            </button> */}
          </div>
        </div>

        <div className="mt-2 grid grid-cols-1 gap-6 rounded-xl p-0 md:mt-20 md:grid-cols-[320px_1fr] md:rounded-xl md:bg-white md:p-4">
          <aside className="hidden rounded-xl bg-[#f5f5f5] px-5 py-4 md:block md:sticky md:top-6 md:mt-0 md:max-h-[calc(100vh-3rem)] md:self-start md:overflow-y-auto md:overscroll-contain">
            <FiltersSidebar />
          </aside>

          <main className="mt-1 min-w-0 md:mt-2">
            <div className="rounded-none px-4 md:rounded-2xl md:p-4">
              <div>
                <ProjectsToolbar
                  total={initialProjects.length}
                  onOpenFilters={() => setMobileFiltersOpen(true)}
                />

              </div>

              <div className="mt-4 flex flex-col gap-4">
                {isPending && (
                  <div className="rounded-xl border border-border bg-white p-8 text-center text-text-gray">
                    Loading properties...
                  </div>
                )}
                {isError && !isPending && (
                  <div className="rounded-xl border border-border bg-white p-8 text-center text-red-600">
                    Could not load properties. Please try again.
                  </div>
                )}
                {initialProjects.map((p, idx) => (
                  <div
                    key={p.id}
                    style={{
                      contentVisibility: "auto",
                      containIntrinsicSize: "260px",
                    }}
                  >
                    <ProjectCard project={p} priority={idx < 2} />
                  </div>
                ))}

                {!isPending && !isError && initialProjects.length === 0 && (
                  <div className="rounded-xl border border-border bg-white p-8 text-center text-text-gray">
                    No projects match your filters.
                  </div>
                )}

                {!isPending && !isError && totalPages > 0 && (
                  <div className="flex justify-center lg:justify-end">
                    <ProjectsPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
        </div>
      </section>

      {filtersPortalReady &&
        mobileFiltersOpen &&
        createPortal(
          <div className="fixed inset-0 z-[200] bg-white lg:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-filters-title">
            <div className="rounded-b-[20px] bg-[#010048] px-5 pb-6 pt-4 text-white">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-white font-medium text-[15px] flex items-center gap-3 cursor-pointer"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Back"
                >
                  <span aria-hidden>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.175386 6.42826L5.57173 11.8228C5.80852 12.059 6.19215 12.059 6.42954 11.8228C6.66633 11.5866 6.66633 11.203 6.42954 10.9668L1.46123 6.00027L6.42894 1.03376C6.66573 0.797565 6.66573 0.413931 6.42894 0.177143C6.19215 -0.0590475 5.80792 -0.0590475 5.57113 0.177143L0.174788 5.57164C-0.0583623 5.80539 -0.0583623 6.19506 0.175386 6.42826Z" fill="currentColor" />
                    </svg>
                  </span>
                  <span>Filters</span>
                </button>
                <h2 id="mobile-filters-title" className="sr-only">
                  Filters
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-3">
                <div className="flex items-center rounded-b-[10px] bg-white px-3 py-2">
                  <Search className="h-[18px] w-[18px] text-[#606060] opacity-70" aria-hidden />
                  <input
                    value={filters.searchText}
                    onChange={(e) => setFilters({ searchText: e.target.value })}
                    placeholder="Search by Project, Locality, or ..."
                    className="w-full px-3 text-sm text-[#606060] outline-none"
                  />
                </div>
                <button
                  type="button"
                  className="mt-3.5 flex items-center gap-2 text-sm text-white"
                  onClick={handleNearMeClick}
                  disabled={isLocating}
                >
                  <svg className="h-[18px] w-[18px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79085 14.2091 8 12 8C9.79085 8 8 9.79085 8 12C8 14.2091 9.79085 16 12 16Z" fill="currentColor" />
                    <path d="M23.5 11H20.941C20.4781 6.83578 17.1647 3.52191 13 3.05897V0.500016C13 0.434345 12.9871 0.369309 12.962 0.308628C12.9369 0.247947 12.9001 0.19281 12.8536 0.146372C12.8072 0.099933 12.7521 0.0631028 12.6914 0.0379871C12.6307 0.0128715 12.5657 -3.68695e-05 12.5 1.07814e-07H11.5C11.4344 -4.30326e-05 11.3693 0.0128608 11.3086 0.0379737C11.2479 0.0630865 11.1928 0.0999158 11.1464 0.146355C11.0999 0.192794 11.0631 0.247933 11.038 0.308617C11.0129 0.369301 11 0.434341 11 0.500016V3.05897C6.83531 3.52191 3.52191 6.83573 3.05902 11H0.500016C0.434345 11 0.369309 11.0129 0.308628 11.038C0.247947 11.0631 0.19281 11.0999 0.146372 11.1464C0.099933 11.1928 0.0631028 11.2479 0.0379871 11.3086C0.0128715 11.3693 -3.68695e-05 11.4343 1.07814e-07 11.5V12.5C-4.30326e-05 12.5656 0.0128608 12.6307 0.0379737 12.6914C0.0630865 12.7521 0.0999158 12.8072 0.146355 12.8536C0.192794 12.9001 0.247933 12.9369 0.308617 12.962C0.369301 12.9871 0.434341 13 0.500016 13H3.05902C3.52191 17.1642 6.83531 20.4781 11 20.941V23.5C11 23.5657 11.0129 23.6307 11.038 23.6914C11.0631 23.7521 11.0999 23.8072 11.1464 23.8536C11.1928 23.9001 11.2479 23.9369 11.3086 23.962C11.3693 23.9871 11.4344 24 11.5 24H12.5C12.5657 24 12.6307 23.9871 12.6914 23.962C12.7521 23.9369 12.8072 23.9001 12.8537 23.8536C12.9001 23.8072 12.9369 23.7521 12.9621 23.6914C12.9872 23.6307 13.0001 23.5657 13 23.5V20.941C17.1647 20.4781 20.4781 17.1642 20.941 13H23.5C23.5657 13 23.6307 12.9871 23.6914 12.962C23.7521 12.9369 23.8073 12.9001 23.8537 12.8536C23.9001 12.8072 23.937 12.7521 23.9621 12.6914C23.9872 12.6307 24.0001 12.5656 24 12.5V11.5C24.0001 11.4343 23.9872 11.3693 23.962 11.3086C23.9369 11.2479 23.9001 11.1928 23.8536 11.1464C23.8072 11.0999 23.7521 11.0631 23.6914 11.038C23.6307 11.0129 23.5657 11 23.5 11ZM12 19C8.14064 19 5.00002 15.8598 5.00002 12C5.00002 8.14017 8.14064 5.00002 12 5.00002C15.8594 5.00002 19 8.14013 19 12C19 15.8599 15.8594 19 12 19Z" fill="currentColor" />
                  </svg>
                  {isLocating ? "Locating..." : "Use my current location"}
                </button>
              </div>
            </div>

            <div className="h-[calc(100dvh-220px)] overflow-y-auto px-5 pb-5">
              <FiltersSidebar hideHeader compact />
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white px-5 pt-3 [padding-bottom:max(1.25rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="h-12 w-full rounded-full bg-[#010048] text-sm font-semibold text-white transition hover:opacity-95"
              >
                Show results
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

