"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getChannelPartnerDetailsApiHandler,
  getChannelPartnerReviews,
  submitChannelPartnerReview,
  type ChannelPartner,
  type GetCPReviewsResponse,
} from "@/services/homeService";
import { joinUrl } from "@/lib/helper";
import ContactUsPopup from "@/components/contactUsPopup";
import type { ChannelPartnerActiveProperty } from "@/services/homeService";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MapPin,
} from "lucide-react";

const PROFILE_BASE = process.env.NEXT_PUBLIC_AWS_URL;

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

function safeSplitCities(cities: string | null | undefined): string[] {
  return (
    cities
      ?.split(",")
      .map((c) => c.trim())
      .filter(Boolean) ?? []
  );
}

function formatISODate(input?: string | null): string | null {
  if (!input) return null;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatCountPlus(count?: number | null, plusThreshold?: number) {
  const n = typeof count === "number" ? count : 0;
  if (!plusThreshold) return `${n}`;
  return n >= plusThreshold ? `${n}+` : `${n}`;
}

function stripHtml(input?: string | null) {
  if (!input) return "";
  // Quick and safe enough for short descriptions in UI.
  return input.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function parseBedrooms(bhkType?: string | null): string | null {
  if (!bhkType) return null;
  // Examples: "5 BHK", "3.5 BHK", "2 BHK"
  const match = bhkType.match(/(\d+(?:\.\d+)?)\s*BHK/i);
  if (!match) return null;
  const num = Number(match[1]);
  if (!Number.isFinite(num)) return null;
  return num % 1 === 0 ? `${num}` : `${Math.floor(num)}`;
}

function parseSqFt(size?: string | null): string | null {
  if (!size) return null;
  // Examples: "1700.00 Sq. Ft. (Saleable)"
  const match = size.match(/(\d+(?:\.\d+)?)\s*Sq\s*\.?\s*Ft/i);
  if (!match) return null;
  const num = Number(match[1]);
  if (!Number.isFinite(num)) return null;
  return num % 1 === 0 ? `${num}` : `${Math.round(num)}`;
}

function formatPossessionStatus(status?: string | null): string | null {
  if (!status) return null;
  const s = status
    .toString()
    .replace(/_/g, " ")
    .toLowerCase()
    .trim();
  if (!s) return null;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatMoney(value?: number | null): string {
  if (value === null || value === undefined) return "-";
  if (!Number.isFinite(value)) return "-";
  return `\u20B9 ${value.toLocaleString("en-IN")}`;
}

function getPriceLabel(p: ChannelPartnerActiveProperty): string {
  if (p.monthlyRent !== null && p.monthlyRent !== undefined) {
    return `${formatMoney(p.monthlyRent)}/month`;
  }
  if (p.price !== null && p.price !== undefined) {
    return formatMoney(p.price);
  }
  return "-";
}

function PropertyCard({
  property,
  partnerProfileSrc,
  partnerRating,
  onCardClick,
}: {
  property: ChannelPartnerActiveProperty;
  partnerProfileSrc: string | null;
  partnerRating: number;
  onCardClick: (propertyId: string) => void;
}) {
  const priceLabel = getPriceLabel(property);
  const title = property.propertyName ?? "Property";
  const location =
    property.locality ??
    property.address ??
    property.city ??
    property.society ??
    "";
  const badgeLabel = property.propertyType ?? property.category ?? "";
  const imageUrl = property.imageUrl ?? null;

  const beds = parseBedrooms(property.bhkType);
  const sqft = parseSqFt(property.units?.[0]?.size);
  const possessionStatus = formatPossessionStatus(
    property.constructionStatus ?? null
  );
  const handleCardClick = () => onCardClick(property.id);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className="bg-white rounded-2xl border border-[#EEF0F4] shadow-[0_6px_24px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col hover:shadow-[0_10px_40px_rgba(0,0,0,0.09)] transition cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] bg-[#F2F2F2]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-gray">
            No Image
          </div>
        )}

        {/* Image controls (visual-only to match the design) */}
        {/* <button
          type="button"
          aria-label="Previous image"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center"
        >
          <ChevronRight className="h-4 w-4" />
        </button> */}

        {/* Like button */}
        {/* <button
          type="button"
          aria-label="Like property"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/20 backdrop-blur flex items-center justify-center"
        >
          <Image
            src="/assets/property/heart.svg"
            alt="Like"
            width={18}
            height={18}
          />
        </button> */}

        {/* Badge */}
        {badgeLabel ? (
          <span className="absolute top-3 right-12 bg-[#7C3AED] text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg">
            {badgeLabel}
          </span>
        ) : null}

        {/* Partner avatar */}
        <div className="absolute bottom-3 left-3">
          {partnerProfileSrc ? (
            <div className="relative w-10 h-10 rounded-full bg-white border-2 border-white overflow-hidden">
              <Image
                src={partnerProfileSrc}
                alt="Partner"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-text-black font-semibold">
              {title.charAt(0)}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Rating + badge */}
        {/* <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                fill={Math.min(100, (partnerRating / 5) * 100)}
                className="h-3 w-3 text-[#F7BB06]"
              />
            ))}
          </div>
          <span className="text-xs font-medium text-text-black">
            {Number.isFinite(partnerRating) ? partnerRating.toFixed(1) : "4.2"}
          </span>
        </div> */}

        <h3 className="text-sm font-semibold text-text-black line-clamp-2">
          {title}
        </h3>
        {location ? (
          <p className="text-xs text-text-gray line-clamp-1">
            {stripHtml(location)}
          </p>
        ) : null}

        <div className="mt-auto">
          <div className="text-xl font-bold text-blue leading-tight">
            {priceLabel.includes("/month") ? (
              <>
                <span>{priceLabel.replace("/month", "")}</span>
                <span className="text-xs font-medium text-text-gray">
                  {" "}
                  /month
                </span>
              </>
            ) : (
              <span>{priceLabel}</span>
            )}
          </div>

          {possessionStatus ? (
            <div className="mt-2 border-t border-slate-200 pt-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-text-gray">Possession status:</span>
                <span className="text-text-black">{possessionStatus}</span>
              </div>
            </div>
          ) : null}

          {/* Spec badges */}
          <div className="mt-2 border-t border-slate-200 pt-3">
            <div className="flex flex-wrap gap-3">
              {beds ? (
                <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-text-black border border-slate-200">
                  <Image
                    src="/assets/property/bad.svg"
                    width={16}
                    height={16}
                    alt="Bed"
                  />
                  <span className="whitespace-nowrap">
                    {beds} Bed
                  </span>
                </div>
              ) : null}

              {sqft ? (
                <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs text-text-black border border-slate-200">
                  <Image
                    src="/assets/property/major-white.svg"
                    width={16}
                    height={16}
                    alt="Sq Ft"
                    className="invert"
                  />
                  <span className="whitespace-nowrap">{sqft} Sq Ft</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChannelPartnerDetailsClient({
  partnerId,
}: {
  partnerId: string;
}) {
  const router = useRouter();
  const [contactPopupOpen, setContactPopupOpen] = useState(false);
  const [propertyTab, setPropertyTab] = useState<
    "sale" | "rent" | "rating"
  >("sale");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewModalMode, setReviewModalMode] = useState<
    "form" | "success"
  >("form");
  const [reviewName, setReviewName] = useState("");
  const [reviewRole, setReviewRole] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [likedOptions, setLikedOptions] = useState<string[]>([]);
  const [reviewPage, setReviewPage] = useState(1);

  type PartnerReview = {
    id: string;
    name: string;
    role: string;
    rating: number;
    reviewText: string;
    createdAt: string;
  };

  const queryClient = useQueryClient();

  const { data: reviewsData } = useQuery<GetCPReviewsResponse>({
    queryKey: ["channel-partner-reviews", partnerId],
    queryFn: () => getChannelPartnerReviews(partnerId, { page: 1, limit: 50, sortBy: "newest" }),
    enabled: Boolean(partnerId),
  });

  const reviews: PartnerReview[] = useMemo(() => {
    if (!reviewsData?.reviews) return [];
    return reviewsData.reviews.map((r) => ({
      id: r.id,
      name: r.reviewerName || "User",
      role: "",
      rating: r.overallRating,
      reviewText: r.review,
      createdAt: r.createdAt?.slice(0, 10) ?? "",
    }));
  }, [reviewsData]);

  const REVIEWS_PER_PAGE = 3;

  const pagedReviews = useMemo(() => {
    const start = (reviewPage - 1) * REVIEWS_PER_PAGE;
    return reviews.slice(start, start + REVIEWS_PER_PAGE);
  }, [reviewPage, reviews]);

  const totalReviewPages = useMemo(() => {
    return Math.max(1, Math.ceil(reviews.length / REVIEWS_PER_PAGE));
  }, [reviews.length]);

  const likedOptionsForRating = useMemo(() => {
    const positiveLeft = [
      "Polite & Professional",
      "Clear communication and good listing skill",
    ];
    const positiveRight = [
      "Answered all my queries to my satisfaction",
      "Other not listed",
    ];

    const negativeLeft = [
      "Unfriendly & Unprofessional",
      "Unclear communication and bad listing skill",
    ];
    const negativeRight = [
      "Couldn't answer my queries to my satisfaction",
      "Other not listed",
    ];

    // Match your example: higher stars => positive options, lower stars => negative options.
    const isPositive = reviewRating >= 3;
    return {
      left: isPositive ? positiveLeft : negativeLeft,
      right: isPositive ? positiveRight : negativeRight,
    };
  }, [reviewRating]);

  const toggleLikedOption = (opt: string) => {
    setLikedOptions((prev) => {
      if (prev.includes(opt)) return prev.filter((x) => x !== opt);
      return [...prev, opt];
    });
  };

  // When rating changes, keep only checkboxes that exist in the current option set.
  useEffect(() => {
    const allowed = new Set([
      ...likedOptionsForRating.left,
      ...likedOptionsForRating.right,
    ]);
    setLikedOptions((prev) => prev.filter((x) => allowed.has(x)));
  }, [likedOptionsForRating.left, likedOptionsForRating.right]);

  const ensureLoggedIn = useCallback(async () => {
    try {
      const response = await fetch("/api/get-token");
      const tokenData = await response.json();
      if (tokenData?.accessToken) {
        return true;
      }
    } catch {
      // Fallback to login redirect when token check fails.
    }

    toast.info("Please login first to continue.");
    const redirectTo = `${window.location.pathname}${window.location.search}`;
    router.push(`/user-flow?isLogin=true&redirect=${encodeURIComponent(redirectTo)}`);
    return false;
  }, [router]);

  const openReviewModal = async () => {
    const isLoggedIn = await ensureLoggedIn();
    if (!isLoggedIn) return;

    setReviewModalMode("form");
    setLikedOptions([]);
    setReviewName("");
    setReviewRole("");
    setReviewRating(5);
    setReviewText("");
    setReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setReviewModalMode("form");
    setLikedOptions([]);
    setReviewModalOpen(false);
    setReviewName("");
    setReviewRole("");
    setReviewRating(5);
    setReviewText("");
  };

  const { mutate: submitReviewMutation, isPending: isSubmittingReview } = useMutation({
    mutationFn: (payload: { rating: number; review: string }) =>
      submitChannelPartnerReview(partnerId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channel-partner-reviews", partnerId] });
      setReviewModalMode("success");
      setLikedOptions([]);
      setReviewName("");
      setReviewRole("");
      setReviewRating(5);
      setReviewText("");
      setReviewPage(1);
    },
    onError: (error: any) => {
      const message = error?.message || "Failed to submit review. Please try again.";
      toast.error(Array.isArray(message) ? message.join(", ") : message);
    },
  });

  const submitReview = async () => {
    const text = reviewText.trim();
    if (!text) return;

    const isLoggedIn = await ensureLoggedIn();
    if (!isLoggedIn) return;

    submitReviewMutation({ rating: reviewRating, review: text });
  };

  const {
    data: partnerData,
    isLoading,
    isError,
  } = useQuery<ChannelPartner | null, Error>({
    queryKey: ["channel-partner-details", partnerId],
    queryFn: () => getChannelPartnerDetailsApiHandler(partnerId),
    enabled: Boolean(partnerId),
  });

  const partner = partnerData ?? null;

  const profileSrc = useMemo(() => {
    return partner ? joinUrl(PROFILE_BASE, partner.profile_image) : null;
  }, [partner]);

  const apiAverageRating = reviewsData?.averageRating ?? null;

  const ratingCount = reviewsData?.totalReviews ?? 0;

  const rating = useMemo(() => {
    if (apiAverageRating != null && Number.isFinite(apiAverageRating)) return apiAverageRating;
    const v = Number(partner?.rating ?? 0);
    return Number.isFinite(v) ? v : 0;
  }, [partner, apiAverageRating]);

  const ratingText = useMemo(() => {
    return Number.isFinite(rating) ? rating.toFixed(1) : "0.0";
  }, [rating]);

  const areasOfOperation = useMemo(() => {
    const list = partner?.areas_of_operation_list ?? null;
    const normalizedList =
      list?.map((x) => (typeof x === "string" ? x.trim() : "")).filter(Boolean) ??
      [];

    if (normalizedList.length > 0) return normalizedList;
    return safeSplitCities(partner?.cities);
  }, [partner]);

  const handleBack = useCallback(() => {
    router.push("/channel-partner");
  }, [router]);
  const handlePropertyCardClick = useCallback(
    (propertyId: string) => {
      if (!propertyId) return;
      router.push(`/projects/${propertyId}/${propertyId}`);
    },
    [router]
  );

  if (isLoading) {
    return (
      <div className="w-full flex flex-col py-10 px-4 md:px-6">
        <div className="w-full rounded-2xl bg-white border border-[#EEF0F4] p-6 sm:p-8 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
          <div className="h-8 bg-[#F2F2F2] rounded w-2/3 animate-pulse" />
          <div className="mt-4 h-5 bg-[#F2F2F2] rounded w-1/2 animate-pulse" />
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-xl border border-[#EEF0F4] bg-[#F7F7FF] animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="w-full flex flex-col py-10 px-4 md:px-6">
        <div className="w-full rounded-2xl bg-white border border-[#EEF0F4] p-6 sm:p-8 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
          <h1 className="text-text-black text-2xl font-bold">
            Channel Partner
          </h1>
          <p className="mt-2 text-text-gray">
            {isError
              ? "Unable to load partner details."
              : "Select a partner from the list page to view details."}
          </p>
          <button
            type="button"
            onClick={handleBack}
            className="mt-6 px-5 py-2.5 rounded-lg bg-[#7C3AED] text-white font-semibold text-sm hover:opacity-90"
          >
            Back to Channel Partners
          </button>
        </div>
      </div>
    );
  }

  const expYears = partner.experience_years ?? partner.statistics?.years_of_experience ?? 0;
  const propCount =
    partner.property_count ?? partner.statistics?.property_holdings ?? 0;

  const saleProperties = partner.active_properties?.buy ?? [];
  const rentProperties = partner.active_properties?.rent ?? [];
  // Commercial is currently not shown in the tab UI (kept for future use).
  const commercialProperties = partner.active_properties?.commercial ?? [];

  return (
    <div className="w-full flex flex-col">
      {/* Hero */}
      <div className="">
        <div className="pt-6 pb-10 px-4 md:px-6 flex flex-col items-center">
            <div className="w-full rounded-2xl sm:p-6">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#F2F2F2] overflow-hidden">
                {profileSrc ? (
                  <Image
                    src={profileSrc}
                    alt={`${partner.name ?? "Partner"} profile`}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-text-black uppercase">
                    {partner.name?.charAt(0) ?? "?"}
                  </div>
                )}
                <span className="absolute bottom-2 right-2 bg-[#7C3AED] text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg">
                  KMA Expert Pro
                </span>
              </div>

              <div className="min-w-0">
                <h1 className="text-white text-2xl sm:text-3xl font-bold leading-tight truncate">
                  {partner.name ?? "Channel Partner"}
                </h1>
                <p className="mt-1 text-white text-sm sm:text-base">
                  {partner.firm_name ?? "Channel Partner"}
                </p>

                {/* <div className="flex items-center gap-2 mt-3 justify-center text-sm">
                  <Star
                    fill={Math.min(100, (rating / 5) * 100)}
                    className="h-4 w-4 text-[#F7BB06]"
                  />
                  <span className="font-semibold text-white">
                    {ratingText}
                  </span>
                  <span className="text-white">{ratingCount} Ratings</span>
                </div> */}
              </div>

              <button
                type="button"
                onClick={() => setContactPopupOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white text-white font-semibold text-sm hover:bg-black transition-opacity flex items-center justify-center gap-2"
              >
                <Image
                  src="/assets/call-ring-white.svg"
                  width={18}
                  height={18}
                  alt=""
                />
                Contact Agent
              </button>
            </div>

            {/* Stats Row */}
            <div className="mt-5 grid grid-cols-2  rounded-xl  sm:grid-cols-3 lg:grid-cols-5 gap-3 bg-white">
              <div className="rounded-xl  p-3">
                <p className="text-xs text-text-gray">Years Experience</p>
                <p className="mt-1 text-lg font-bold text-text-black">
                  {expYears}
                </p>
              </div>
              <div className="rounded-xl  p-3">
                <p className="text-xs text-text-gray">Properties for Sale</p>
                <p className="mt-1 text-lg font-bold text-text-black">
                  {formatCountPlus(
                    partner.active_properties?.buy?.length ?? 0,
                    99
                  )}
                </p>
              </div>
              <div className="rounded-xl  p-3">
                <p className="text-xs text-text-gray">Properties for Rent</p>
                <p className="mt-1 text-lg font-bold text-text-black">
                  {formatCountPlus(
                    partner.active_properties?.rent?.length ?? 0,
                    99
                  )}
                </p>
              </div>
              <div className="rounded-xl  p-3">
                <p className="text-xs text-text-gray">Team Size</p>
                <p className="mt-1 text-lg font-bold text-text-black">
                  {partner.statistics?.team_size ?? "-"}
                </p>
              </div>
              <div className="rounded-xl  p-3">
                <p className="text-xs text-text-gray">Areas of Operation</p>
                <p className="mt-1 text-lg font-bold text-text-black">
                  {formatCountPlus(
                    partner.statistics?.areas_of_operation ??
                      areasOfOperation.length ??
                      0,
                    19
                  )}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="">
        <div className="w-full">
          {/* About */}
          <section className="  sm:p-7">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
              <div className="lg:flex-1 min-w-0">
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12 rounded-full bg-[#F2F2F2] overflow-hidden flex-shrink-0">
                    {profileSrc ? (
                      <Image
                        src={profileSrc}
                        alt={`${partner.name ?? "Partner"} profile`}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-text-black uppercase">
                        {(partner.name ?? "?").charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl font-bold text-text-black truncate">
                      {partner.name ?? "Channel Partner"}
                    </h2>
                    <p className="mt-1 text-sm text-text-gray truncate">
                      {partner.firm_name ?? ""}
                    </p>

                    <div className="mt-2 inline-flex items-center rounded-md border border-[#D9D9FF] bg-[#F7F7FF] px-2.5 py-1 text-[10px] font-semibold text-[#7C3AED]">
                      KMA Expert Pro
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-text-gray leading-relaxed">
                  {partner.about?.trim()
                    ? partner.about
                    : partner.firm_name
                      ? `${partner.firm_name} is a verified channel partner supporting buyers and sellers across multiple locations.`
                      : "This partner is a verified channel partner supporting buyers and sellers across multiple locations."}
                </p>

                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex items-start gap-2 text-xs text-text-gray">
                    <MapPin className="h-4 w-4 text-[#7C3AED] mt-0.5" />
                    <span className="text-text-black font-medium">
                      {partner.cities ?? areasOfOperation[0] ?? ""}
                    </span>
                  </div>

                  {partner.trusted_since ? (
                    <div className="mt-3 flex items-start gap-2 text-xs text-text-gray">
                      <CheckCircle2 className="h-4 w-4 text-[#7C3AED] mt-0.5" />
                      <span className="text-text-black font-medium">
                        Trusted Since {formatISODate(partner.trusted_since) ?? partner.trusted_since}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="lg:w-[420px] xl:w-[440px]">
                <div className="flex items-center gap-2 mb-3">
                  <Star
                    fill={Math.min(100, (rating / 5) * 100)}
                    className="h-4 w-4 text-[#F7BB06]"
                  />
                  <span className="text-sm font-bold text-text-black">
                    {ratingText}
                  </span>
                  <span className="text-xs text-text-gray">{ratingCount} Ratings</span>
                </div>
                <h3 className="text-sm font-semibold text-text-black mb-3">
                  Areas of Operation
                </h3>
                {areasOfOperation.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {areasOfOperation.map((city) => (
                      <span
                        key={city}
                        className="px-3 py-1 text-xs font-medium bg-[#F7F7FF] border border-[#D9D9FF] text-[#7C3AED] rounded-lg"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-text-gray">
                    No areas available.
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Properties */}
          <section className="mt-6">
            {/* Tabs */}
            <div className="border-b border-slate-200">
              <div className="flex gap-8 sm:gap-12">
                <button
                  type="button"
                  onClick={() => setPropertyTab("sale")}
                  className={`pb-4 text-sm font-semibold whitespace-nowrap border-b-2 ${
                    propertyTab === "sale"
                      ? "text-text-black border-blue"
                      : "text-text-gray border-transparent hover:text-text-black"
                  }`}
                >
                  Properties on sale ({saleProperties.length})
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyTab("rent")}
                  className={`pb-4 text-sm font-semibold whitespace-nowrap border-b-2 ${
                    propertyTab === "rent"
                      ? "text-text-black border-blue"
                      : "text-text-gray border-transparent hover:text-text-black"
                  }`}
                >
                  Properties on rent ({rentProperties.length})
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyTab("rating")}
                  className={`pb-4 text-sm font-semibold whitespace-nowrap border-b-2 ${
                    propertyTab === "rating"
                      ? "text-text-black border-blue"
                      : "text-text-gray border-transparent hover:text-text-black"
                  }`}
                >
                  Rating and Reviews
                </button>
              </div>
            </div>

            {/* Sale / Rent */}
            {propertyTab !== "rating" ? (
              <>
                {propertyTab === "sale" && saleProperties.length > 0 ? (
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {saleProperties.slice(0, 8).map((p) => (
                      <PropertyCard
                        key={p.id}
                        property={p}
                        partnerProfileSrc={profileSrc}
                        partnerRating={rating}
                        onCardClick={handlePropertyCardClick}
                      />
                    ))}
                  </div>
                ) : null}

                {propertyTab === "rent" && rentProperties.length > 0 ? (
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {rentProperties.slice(0, 8).map((p) => (
                      <PropertyCard
                        key={p.id}
                        property={p}
                        partnerProfileSrc={profileSrc}
                        partnerRating={rating}
                        onCardClick={handlePropertyCardClick}
                      />
                    ))}
                  </div>
                ) : null}

                {propertyTab === "sale" && saleProperties.length === 0 ? (
                  <p className="mt-5 text-sm text-text-gray">
                    No properties available for sale.
                  </p>
                ) : null}

                {propertyTab === "rent" && rentProperties.length === 0 ? (
                  <p className="mt-5 text-sm text-text-gray">
                    No properties available for rent.
                  </p>
                ) : null}

                {/* Keep CTA available without cluttering tab header */}
                {/* <div className="mt-5 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setContactPopupOpen(true)}
                    className="px-4 py-2 rounded-lg border border-[#D9D9D9] text-text-black font-semibold text-sm hover:bg-[#F5F5F5]"
                  >
                    Request Property Details
                  </button>
                </div> */}
              </>
            ) : (
              <div className="mt-5 bg-white rounded-2xl border border-[#EEF0F4] shadow-[0_6px_24px_rgba(0,0,0,0.06)] p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row gap-6 sm:items-start sm:justify-between">
                  <div className="flex flex-col items-center sm:items-start">
                    <div className="text-2xl sm:text-3xl font-bold text-text-black">
                      {ratingText} / 5
                    </div>
                    <div className="mt-2 flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const starFill = rating >= i + 1 ? 100 : rating > i ? Math.round((rating - i) * 100) : 0;
                        return (
                          <Star
                            key={i}
                            fill={starFill}
                            className="h-4 w-4 text-[#F7BB06]"
                          />
                        );
                      })}
                    </div>
                    <p className="mt-2 text-xs text-text-gray">
                      {reviews.length} Ratings and Reviews
                    </p>
                  </div>

                  <div className="flex-1">
                    <div className="space-y-3">
                      {[
                        { stars: 5, label: "5 *" },
                        { stars: 4, label: "4 *" },
                        { stars: 3, label: "3 *" },
                        { stars: 2, label: "2 *" },
                        { stars: 1, label: "1 *" },
                      ].map((row) => {
                        const dist = reviewsData?.starDistribution ?? {};
                        const count = Number(dist[String(row.stars)] ?? 0);
                        const maxCount = Math.max(1, ratingCount);
                        const pct = Math.min(100, Math.round((count / maxCount) * 100));

                        return (
                          <div key={row.stars} className="flex items-center gap-3">
                            <div className="w-[34px] text-xs text-text-gray text-right">
                              {row.label}
                            </div>
                            <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full bg-blue"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <div className="w-[18px] text-right text-xs text-text-gray">
                              {count}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-text-black">
                    Reviews
                  </h4>
                  <button
                    type="button"
                    onClick={openReviewModal}
                    className="px-4 py-2 rounded-lg border border-[#D9D9D9] text-text-black font-semibold text-sm hover:bg-[#F5F5F5]"
                  >
                    Add a Review
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {pagedReviews.map((r) => (
                    <div
                      key={r.id}
                      className="rounded-lg border border-[#EEF0F4] bg-white p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-text-black">
                            {r.name}
                          </div>
                          <div className="text-xs text-text-gray">{r.role}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              fill={i + 1 <= r.rating ? 100 : 30}
                              className="h-4 w-4 text-[#F7BB06]"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-text-gray leading-relaxed">
                        {r.reviewText}
                      </p>
                      <p className="mt-2 text-[10px] text-text-gray">
                        {r.createdAt}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setReviewPage((p) => Math.max(1, p - 1))}
                      disabled={reviewPage === 1}
                      className="px-3 py-1 text-xs font-semibold text-text-gray disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Prev
                    </button>
                    {[1, 2, 3]
                      .filter((p) => p <= totalReviewPages)
                      .map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setReviewPage(p)}
                          className={`w-7 h-7 rounded ${
                            reviewPage === p
                              ? "bg-[#0B1B54] text-white"
                              : "border border-[#EEF0F4] text-text-black hover:bg-[#F5F5F5]"
                          } text-xs font-semibold`}
                        >
                          {p}
                        </button>
                      ))}
                    <button
                      type="button"
                      onClick={() =>
                        setReviewPage((p) => Math.min(totalReviewPages, p + 1))
                      }
                      disabled={reviewPage >= totalReviewPages}
                      className="px-3 py-1 text-xs font-semibold text-text-gray disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>

                {/* Add Review Modal */}
                {reviewModalOpen && (
                  <div className="fixed inset-0 z-[60]">
                    <div
                      className="absolute inset-0 bg-black/20"
                      onClick={closeReviewModal}
                      aria-hidden
                    />
                    <div className="relative mx-auto mt-24 w-[calc(100%-2rem)] max-w-lg rounded-2xl bg-white border border-[#EEF0F4] shadow-xl p-6">
                      <button
                        type="button"
                        onClick={closeReviewModal}
                        className="absolute right-4 top-4 w-9 h-9 rounded-lg border border-[#EEF0F4] hover:bg-[#F5F5F5] flex items-center justify-center"
                        aria-label="Close review modal"
                      >
                        ✕
                      </button>

                      {reviewModalMode === "form" ? (
                        <div className="pt-2">
                          <h3 className="text-sm font-semibold text-text-black">
                            Rating
                          </h3>

                          <div className="mt-2 flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => {
                              const v = i + 1;
                              const active = v <= reviewRating;
                              return (
                                <button
                                  key={v}
                                  type="button"
                                  onClick={() => setReviewRating(v)}
                                  className="focus:outline-none"
                                  aria-label={`Set rating ${v}`}
                                >
                                  <Star
                                    fill={active ? 100 : 0}
                                    className={`h-5 w-5 ${
                                      active ? "text-[#F7BB06]" : "text-[#D9D9D9]"
                                    }`}
                                  />
                                </button>
                              );
                            })}
                          </div>

                          <div className="mt-3">
                            <p className="text-xs font-medium text-text-black">
                              What you liked?
                            </p>
                            <div className="mt-2 grid grid-cols-2 gap-x-6">
                              <div className="space-y-2">
                              {likedOptionsForRating.left.map((opt) => {
                                  const checked = likedOptions.includes(opt);
                                  return (
                                    <label
                                      key={opt}
                                      className="flex items-center gap-2 text-xs text-text-gray"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() =>
                                          toggleLikedOption(opt)
                                        }
                                        className="h-4 w-4 rounded border-[#D9D9D9] text-blue focus:ring-blue"
                                      />
                                      <span>{opt}</span>
                                    </label>
                                  );
                                })}
                              </div>

                              <div className="space-y-2">
                              {likedOptionsForRating.right.map((opt) => {
                                  const checked = likedOptions.includes(opt);
                                  return (
                                    <label
                                      key={opt}
                                      className="flex items-center gap-2 text-xs text-text-gray"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() =>
                                          toggleLikedOption(opt)
                                        }
                                        className="h-4 w-4 rounded border-[#D9D9D9] text-blue focus:ring-blue"
                                      />
                                      <span>{opt}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4">
                            <textarea
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              className="w-full min-h-[92px] rounded-lg border border-[#D9D9D9] bg-white px-3 py-2.5 text-sm text-text-black outline-none focus:border-blue resize-none"
                              placeholder="Your message..."
                            />
                          </div>

                          <div className="mt-4 flex justify-end">
                            <button
                              type="button"
                              onClick={submitReview}
                              className="px-6 py-2 rounded-full bg-[#0B1B54] text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={!reviewText.trim() || isSubmittingReview}
                            >
                              {isSubmittingReview ? "Submitting..." : "Submit"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="py-6 px-2 flex flex-col items-center text-center">
                          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2
                              size={48}
                              className="text-green-500"
                            />
                          </div>
                          <p className="mt-4 text-sm font-semibold text-text-black">
                            Thank you for your review!
                          </p>
                          <button
                            type="button"
                            onClick={closeReviewModal}
                            className="mt-6 px-8 py-2 rounded-lg bg-[#0B1B54] text-white font-semibold text-sm hover:opacity-90"
                          >
                            Close
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      <ContactUsPopup
        open={contactPopupOpen}
        onClose={() => setContactPopupOpen(false)}
      />
    </div>
  );
}

