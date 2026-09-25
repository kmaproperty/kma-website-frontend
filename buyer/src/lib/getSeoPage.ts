export interface SeoPageSummary {
  slug: string;
  h1_heading: string;
  meta_description: string;
  city_name: string;
}

export interface SeoPageData extends SeoPageSummary {
  id: string;
  meta_title: string;
  canonical_url: string;
  listing_type: string;
  article_body: string;
  faqs: Array<{ question: string; answer: string }>;
  is_active: boolean;
  json_ld?: any;
  related_links?: Array<{ name: string; url: string }>;
  primary_keyword?: string;
  lead_image_alt?: string;
  search_filters?: Record<string, any>;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://kmaglobalproperty.com/api/backend";

const GURUGRAM_CITY_ID = "e8894ea7-b8fc-43da-b983-b1d43c77597e";
const SALE_LISTING_TYPE_ID = "ea43e344-48aa-4b75-bae6-117a070a1ef8";
const RENT_LISTING_TYPE_ID = "3bfa8626-d621-4f11-8fc2-a8f6be4e3f31";

const CORRIDOR_SECTORS: Record<string, string[]> = {
  "dwarka-expressway": [
    "dwarka expressway", "dwarka", "sector 99", "sector 102", "sector 103",
    "sector 104", "sector 105", "sector 106", "sector 107", "sector 108",
    "sector 109", "sector 110", "sector 111", "sector 112", "sector 113",
    "sector 37d", "sector 88", "sector 84"
  ],
  "golf-course-extension": [
    "golf course extension", "gcx", "sector 61", "sector 62", "sector 65",
    "sector 66", "sector 67", "sector 68"
  ],
  "golf-course": [
    "golf course road", "golf course", "sector 42", "sector 43", "sector 53", "sector 54", "dlf phase", "dlf"
  ],
  "sohna-road": [
    "sohna road", "sohna", "sector 47", "sector 48", "sector 49", "sector 50"
  ],
  "new-gurgaon": [
    "new gurgaon", "sector 81", "sector 82", "sector 83", "sector 84",
    "sector 85", "sector 86", "sector 90", "sector 91", "sector 92"
  ],
  "southern-peripheral-road": [
    "southern peripheral road", "spr", "sector 69", "sector 70", "sector 71",
    "sector 73", "sector 74"
  ]
};

export function getCleanLabel(heading: string): string {
  if (!heading) return "";
  const text = heading.replace(/<[^>]*>/g, "").trim();
  const parts = text.split(/[-–—:|]/);
  return parts[0].trim();
}

export async function getSeoPageData(slug: string): Promise<SeoPageData | null> {
  try {
    const res = await fetch(`${BASE_URL}/end-user/seo-landing-pages/${slug}`, {
      next: { revalidate: 3600 },
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data?.data ?? data) as SeoPageData;
  } catch (error) {
    console.error("[getSeoPageData] Error:", error);
    return null;
  }
}

export async function getAllSeoPages(): Promise<SeoPageSummary[]> {
  try {
    const res = await fetch(`${BASE_URL}/end-user/seo-landing-pages`, {
      next: { revalidate: 3600 },
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.data ?? data) as SeoPageSummary[];
  } catch (error) {
    console.error("[getAllSeoPages] Error:", error);
    return [];
  }
}

export async function getRelatedSeoPages(slug: string): Promise<SeoPageSummary[]> {
  try {
    const res = await fetch(`${BASE_URL}/end-user/seo-landing-pages/related/${slug}`, {
      next: { revalidate: 3600 },
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.data ?? data) as SeoPageSummary[];
  } catch (error) {
    console.error("[getRelatedSeoPages] Error:", error);
    return [];
  }
}

export function parseSlugFilters(slug: string) {
  const clean = slug.toLowerCase();

  // 1. BHK / Studio check
  let bhk: number | null = null;
  const isRk = clean.includes("1-rk") || clean.includes("1rk") || clean.includes("studio");
  const bhkMatch = clean.match(/(\d+)\s*-?\s*bhk/);
  if (bhkMatch) {
    bhk = parseInt(bhkMatch[1], 10);
  }

  // 2. Pricing Intent
  const isBudget = clean.includes("cheap") || clean.includes("budget") || clean.includes("affordable");
  const isLuxury = clean.includes("luxury") || clean.includes("ultra-luxury") || clean.includes("premium");

  // 3. Property Type
  let propertyCategory: "flat_only" | "builder_floor" | "villa" | "plot" | "commercial" | "apartment" | "all" = "all";
  if (clean.includes("commercial") || clean.includes("office") || clean.includes("shop")) {
    propertyCategory = "commercial";
  } else if (clean.includes("builder-floor") || clean.includes("builder-floors")) {
    propertyCategory = "builder_floor";
  } else if (clean.includes("villa") || clean.includes("villas")) {
    propertyCategory = "villa";
  } else if (clean.includes("plot") || clean.includes("plots")) {
    propertyCategory = "plot";
  } else if (clean.includes("flat") || clean.includes("flats")) {
    propertyCategory = "flat_only";
  } else if (clean.includes("apartment") || clean.includes("apartments")) {
    propertyCategory = "apartment";
  }

  let corridorKey: string | null = null;
  if (clean.includes("golf-course-extension")) corridorKey = "golf-course-extension";
  else if (clean.includes("golf-course")) corridorKey = "golf-course";
  else if (clean.includes("dwarka-expressway")) corridorKey = "dwarka-expressway";
  else if (clean.includes("sohna-road")) corridorKey = "sohna-road";
  else if (clean.includes("new-gurgaon")) corridorKey = "new-gurgaon";
  else if (clean.includes("southern-peripheral-road") || clean.includes("spr")) corridorKey = "southern-peripheral-road";

  return { bhk, isRk, isBudget, isLuxury, propertyCategory, corridorKey };
}

function getNumericPrice(property: any, isRent: boolean): number {
  if (isRent) {
    return Number(property.monthlyRent) || 0;
  }
  if (property.price && !isNaN(Number(property.price))) {
    return Number(property.price);
  }
  if (property.units?.[0]?.price) {
    const raw = String(property.units[0].price).replace(/[^0-9.]/g, "");
    const parsed = parseFloat(raw);
    if (!isNaN(parsed)) return parsed;
  }
  return 0;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function getMatchingProperties(
  slug: string,
  cityName?: string,
  listingTypeFromDb?: string,
  searchFiltersFromDb?: Record<string, any>
) {
  const cleanSlug = slug.toLowerCase();
  const { bhk, isRk, isBudget, isLuxury, propertyCategory, corridorKey } = parseSlugFilters(slug);

  try {
    const isCommercial =
      listingTypeFromDb?.toLowerCase() === "commercial" ||
      propertyCategory === "commercial" ||
      cleanSlug.includes("commercial");

    const isRent =
      !isCommercial &&
      (listingTypeFromDb?.toLowerCase() === "rent" ||
        cleanSlug.includes("-rent") ||
        cleanSlug.includes("rental"));

    const isSale = !isCommercial && !isRent;

    const targetCityId = searchFiltersFromDb?.cityId || GURUGRAM_CITY_ID;

    const isPropertyRental = (p: any): boolean => {
      if (p.monthlyRent && Number(p.monthlyRent) > 0) return true;
      if (p.rent && Number(p.rent) > 0) return true;

      const pType = String(
        (typeof p.listingType === "object" ? p.listingType?.code || p.listingType?.name : p.listingType) ||
        p.listingTypeCode ||
        p.propertyFor ||
        p.transactionType ||
        ""
      ).toLowerCase();

      if (pType.includes("rent") || pType.includes("lease")) return true;

      const titleAndDesc = `${p.propertyName || ""} ${p.title || ""} ${p.description || ""}`.toLowerCase();
      if (titleAndDesc.includes("for rent") || titleAndDesc.includes("on rent") || titleAndDesc.includes("rental")) {
        return true;
      }

      return false;
    };

    const params = new URLSearchParams({
      page: "1",
      limit: "100",
      cityId: targetCityId,
    });

    if (searchFiltersFromDb && Object.keys(searchFiltersFromDb).length > 0) {
      Object.entries(searchFiltersFromDb).forEach(([key, value]) => {
        if (key !== "cityId" && value !== undefined && value !== null && value !== "") {
          params.set(key, String(value));
        }
      });
    } else {
      if (isSale) {
        params.set("listingTypeIds", SALE_LISTING_TYPE_ID);
      }
      
      if (corridorKey === "dwarka-expressway") params.set("search", "dwarka expressway");
      else if (corridorKey === "golf-course-extension") params.set("search", "golf course extension");
      else if (corridorKey === "golf-course") params.set("search", "golf course");
      else if (corridorKey === "sohna-road") params.set("search", "sohna road");
      else if (corridorKey === "new-gurgaon") params.set("search", "new gurgaon");
    }

    let res = await fetch(`${BASE_URL}/end-user/properties?${params.toString()}`, {
      next: { revalidate: 1800 },
      headers: { "Content-Type": "application/json" },
    });

    let data = res.ok ? await res.json() : null;
    let rawList: any[] = data?.properties || data?.data || (Array.isArray(data) ? data : []);

    if (rawList.length === 0) {
      const openParams = new URLSearchParams({
        page: "1",
        limit: "100",
        cityId: targetCityId,
      });

      const openRes = await fetch(`${BASE_URL}/end-user/properties?${openParams.toString()}`, {
        next: { revalidate: 1800 },
        headers: { "Content-Type": "application/json" },
      });
      if (openRes.ok) {
        const openData = await openRes.json();
        rawList = openData?.properties || openData?.data || (Array.isArray(openData) ? openData : []);
      }
    }

    if (rawList.length === 0) return [];

    const activeList = rawList.filter((p: any) => {
      const status = String(p.status || "").toLowerCase();
      return status !== "inactive" && status !== "rejected";
    });

    const typeMatchedPool = activeList.filter((p: any) => {
      const propIsRent = isPropertyRental(p);

      if (isCommercial) {
        const catText = String(
          (typeof p.category === "object" ? p.category?.code || p.category?.name : p.category) ||
          p.propertyType ||
          p.propertyName ||
          ""
        ).toLowerCase();
        return catText.includes("commercial") || catText.includes("office") || catText.includes("shop");
      }

      if (isRent) {
        return propIsRent;
      }

      return !propIsRent;
    });

    let zonePool = typeMatchedPool;
    if (corridorKey && CORRIDOR_SECTORS[corridorKey]) {
      const allowedTerms = CORRIDOR_SECTORS[corridorKey];
      const matched = typeMatchedPool.filter((p: any) => {
        const fullAddr = `${p.locality || ""} ${p.society || ""} ${p.address || ""} ${p.propertyName || ""} ${p.title || ""}`.toLowerCase();
        return allowedTerms.some((term) => fullAddr.includes(term));
      });
      if (matched.length > 0) {
        zonePool = matched;
      }
    }

    let specificPool = zonePool;

    if (isRk) {
      const rkMatches = specificPool.filter((p: any) => {
        const text = `${p.bhkType || ""} ${p.bhk || ""} ${p.propertyName || ""} ${p.title || ""}`.toLowerCase();
        return text.includes("1 rk") || text.includes("1rk") || text.includes("studio");
      });
      if (rkMatches.length > 0) specificPool = rkMatches;
    } else if (bhk !== null) {
      const bhkMatches = specificPool.filter((p: any) => {
        const text = `${p.bhkType || ""} ${p.bhk || ""} ${p.propertyName || ""} ${p.title || ""}`.toLowerCase();
        const regex = new RegExp(`(^|\\D)${bhk}\\s*(bhk|bed|bedroom)?(\\D|$)`, "i");
        return regex.test(text);
      });
      if (bhkMatches.length > 0) specificPool = bhkMatches;
    }

    if (propertyCategory !== "all" && propertyCategory !== "commercial") {
      const catMatches = specificPool.filter((p: any) => {
        const pType = (
          typeof p.propertyType === "object"
            ? `${p.propertyType?.name || ""} ${p.propertyType?.code || ""}`
            : `${p.propertyType || ""} ${p.propertyName || ""} ${p.title || ""}`
        ).toLowerCase();

        if (propertyCategory === "flat_only") return pType.includes("flat") || pType.includes("apartment");
        if (propertyCategory === "builder_floor") return pType.includes("floor");
        if (propertyCategory === "villa") return pType.includes("villa") || pType.includes("house");
        if (propertyCategory === "plot") return pType.includes("plot") || pType.includes("land");
        if (propertyCategory === "apartment") return pType.includes("flat") || pType.includes("apartment") || pType.includes("floor");
        return true;
      });
      if (catMatches.length > 0) specificPool = catMatches;
    }
    let finalPool = specificPool;
    if (finalPool.length === 0) {
      const fallbackSource = zonePool.length > 0 ? zonePool : typeMatchedPool;
      finalPool = shuffleArray(fallbackSource);
    } else {
      finalPool.sort((a: any, b: any) => {
        const priceA = getNumericPrice(a, isRent);
        const priceB = getNumericPrice(b, isRent);

        if (isBudget) {
          if (priceA > 0 && priceB > 0) return priceA - priceB;
          if (priceA > 0) return -1;
          if (priceB > 0) return 1;
        } else if (isLuxury) {
          if (priceA > 0 && priceB > 0) return priceB - priceA;
          if (priceA > 0) return -1;
          if (priceB > 0) return 1;
        }

        const aVer = a.isVerified === "verified" || a.isVerified === true ? 1 : 0;
        const bVer = b.isVerified === "verified" || b.isVerified === true ? 1 : 0;
        return bVer - aVer;
      });
    }

    return finalPool;
  } catch (err) {
    console.error("[getMatchingProperties] Exception:", err);
    return [];
  }
}