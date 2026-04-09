"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  CarFront,
  MapPin,
  MessageCircle,
  PhoneCall,
  Search,
  ShieldCheck,
  Star,
  ThumbsUp,
  Trees,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { usePropertyDetails } from "@/api/hooks/usePropertyDetails";
import { usePropertyRatingReviews } from "@/api/hooks/usePropertyRatingReviews";
import type { PropertyRatingReviewItem } from "@/api/actions/propertyActions";
import MainLayout from "@/components/layouts/BuyerMainLayout";
import HomeFooter from "@/components/footer/homeFooter";
import { fetchPropertyMasterData } from "@/app/api/home";
import { useDispatch } from "react-redux";
import { setPropertyMasterData } from "@/store/homeHeaderSlice";
import AboutusDataSync from "@/components/footer/AboutusDataSync";

const galleryImages = [
  "/assets/property/img-1.png",
  "/assets/property/img-2.png",
  "/assets/property/img-3.png",
  "/assets/property/img-4.png",
];

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "highest", label: "Highest" },
  { value: "lowest", label: "Lowest" },
] as const;

const RATING_FILTER_OPTIONS = [
  { value: "", label: "All ratings" },
  { value: "5", label: "5 stars" },
  { value: "4", label: "4 stars" },
  { value: "3", label: "3 stars" },
  { value: "2", label: "2 stars" },
  { value: "1", label: "1 star" },
];

const awsBaseUrl = process.env.NEXT_PUBLIC_AWS_URL ?? "";
const toFullAssetUrl = (value?: string | null) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (!awsBaseUrl) return value;
  return `${awsBaseUrl}${value}`;
};
const asString = (value: unknown): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
const asNumber = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value)
    ? value
    : typeof value === "string"
      ? (() => {
        const n = Number(value.trim());
        return Number.isFinite(n) ? n : null;
      })()
      : null;
const formatInr = (value: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);

function objectToTags(obj: Record<string, unknown> | undefined): string[] {
  if (!obj || typeof obj !== "object") return [];
  return Object.entries(obj)
    .filter(([, v]) => v != null && String(v).trim() !== "")
    .map(([k, v]) => (typeof v === "string" ? v : `${k}: ${String(v)}`));
}

function ReviewCard({ review }: { review: PropertyRatingReviewItem }) {
  const avatarSrc = review.reviewerProfileImage
    ? toFullAssetUrl(review.reviewerProfileImage)
    : "/assets/profile.png";
  const likeTags = objectToTags(review.likeText);
  const dislikeTags = objectToTags(review.dislikeText);
  return (
    <article className="rounded-xl border border-[#D4D5D8] bg-[#F8F8F9] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={avatarSrc}
            alt={review.reviewerName}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-text-black">{review.reviewerName}</p>
            <p className="text-sm text-text-gray">{review.reviewerDetail ?? review.role ?? "—"}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5 text-[#F5A524]">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i <= Math.floor(review.overallRating)
                    ? "fill-[#F5A524] text-[#F5A524]"
                    : "text-[#E5E7EB]"
                    }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-text-black">
              {review.overallRating}/5
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button type="button" className="inline-flex items-center gap-1 text-text-gray hover:text-text-black">
              <AlertCircle className="h-4 w-4" /> Report fake
            </button>
            <button type="button" className="inline-flex items-center gap-1 text-text-gray hover:text-text-black">
              <ThumbsUp className="h-4 w-4" /> Helpful
            </button>
          </div>
        </div>
      </div>
      {(likeTags.length > 0 || dislikeTags.length > 0) && (
        <div className="mt-5 space-y-4 border-t border-[#E7E7E9] pt-4">
          {likeTags.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-text-black">What&apos;s good</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {likeTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#E7E7E9] px-3 py-1 text-xs text-text-black">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          {dislikeTags.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-text-black">What&apos;s bad</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {dislikeTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#E7E7E9] px-3 py-1 text-xs text-text-black">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

const FEATURE_KEYS = [
  { key: "connectivity" as const, icon: CarFront, label: "Connectivity" },
  { key: "neighbourhood" as const, icon: MapPin, label: "Neighbourhood" },
  { key: "safety" as const, icon: ShieldCheck, label: "Safety" },
  { key: "livability" as const, icon: Trees, label: "Livability" },
];

export default function ListingReviewsPage() {
  const params = useParams<{ projectId: string; listingId: string }>();
  const projectId = params?.projectId ?? "";
  const listingId = params?.listingId ?? "";
  const { data: propertyDetails } = usePropertyDetails({ id: listingId });

  const [searchQ, setSearchQ] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [ratingFilter, setRatingFilter] = useState<1 | 2 | 3 | 4 | 5 | "">("");
  const [sortBy, setSortBy] = useState<"recommended" | "newest" | "oldest" | "highest" | "lowest">("recommended");
  const [page, setPage] = useState(1);

  const { data: ratingData, isPending: ratingLoading } = usePropertyRatingReviews({
    propertyId: listingId,
    page,
    limit: 10,
    q: searchQ || undefined,
    rating: ratingFilter || undefined,
    sortBy,
  });

  const dispatch = useDispatch();
  const [propertyMasterData, setPropertyMasterData] = useState<unknown[]>([]);
  useEffect(() => {
    fetchPropertyMasterData().then((response) => {
      const data = response?.success ? ((response.data as unknown[]) ?? []) : [];
      setPropertyMasterData(data);
      dispatch(setPropertyMasterData(data));
    });
  }, [dispatch]);

  const summary = ratingData?.summary;
  const featureRatingsData = ratingData?.featureRatings;
  const whatsGood = ratingData?.whatsGood ?? [];
  const whatsBad = ratingData?.whatsBad ?? [];
  const reviews = ratingData?.reviews ?? [];
  const totalReviewsCount = summary?.totalReviews ?? 0;
  const overallRating = summary?.averageRating ?? 0;
  const totalPages = ratingData?.totalPages ?? 1;
  const total = ratingData?.total ?? 0;

  const ratingBreakdown = useMemo(() => {
    if (!summary?.starDistribution || summary.totalReviews <= 0)
      return [5, 4, 3, 2, 1].map((stars) => ({ stars, width: "0%" }));
    const dist = summary.starDistribution;
    return [5, 4, 3, 2, 1].map((stars) => {
      const count = dist[String(stars)] ?? 0;
      const pct = Math.round((count / summary.totalReviews) * 100);
      return { stars, width: `${Math.min(100, pct)}%` };
    });
  }, [summary]);

  const featureRatings = useMemo(
    () =>
      FEATURE_KEYS.map(({ key, icon, label }) => ({
        icon,
        label,
        score: featureRatingsData?.[key] != null
          ? `${Number(featureRatingsData[key]).toFixed(1)}/5`
          : "—/5",
      })),
    [featureRatingsData]
  );

  const handleSearch = () => {
    setSearchQ(searchInput.trim());
    setPage(1);
  };
  const handleRatingFilter = (value: string) => {
    setRatingFilter(value === "" ? "" : (Number(value) as 1 | 2 | 3 | 4 | 5));
    setPage(1);
  };
  const handleSortBy = (value: string) => {
    setSortBy(value as "recommended" | "newest" | "oldest" | "highest" | "lowest");
    setPage(1);
  };

  const propertyTitle =
    asString(propertyDetails?.propertyName) ??
    asString(propertyDetails?.title) ??
    "Property name lorem Ipsum";
  const propertyAddress =
    asString(propertyDetails?.address) ?? "Madhya Pradesh, India, 455001";
  const monthlyRent = asNumber(propertyDetails?.monthlyRent);
  const salePrice = asNumber(propertyDetails?.price);
  const priceLabel =
    monthlyRent && monthlyRent > 0
      ? `₹${formatInr(monthlyRent)}/month`
      : salePrice && salePrice > 0
        ? `₹${formatInr(salePrice)}`
        : "₹85,000/month";

  const coverImage = useMemo(() => {
    const media = [...(propertyDetails?.photos ?? []), ...(propertyDetails?.images ?? [])];
    const url = media[0] && typeof media[0] === "object" && media[0] !== null && "fileKey" in media[0]
      ? toFullAssetUrl((media[0] as { fileKey?: string }).fileKey)
      : "";
    return url || galleryImages[0];
  }, [propertyDetails]);

  const listingHref = `/projects/${projectId}/${listingId}`;

  return (
    <>
      <MainLayout>
        <div className="w-full">
          <div className="py-8">
            <div className="text-3xl ml-6 mb-7 rounded-lg font-medium text-white">
              User Ratings and Reviews
            </div>
            <div className="mx-auto w-full min-w-0 px-4 lg:px-6 max-w-[1440px]">
              <div className="rounded-lg border border-border bg-white p-4 shadow-sm lg:p-8">
                {/* Top bar - same pattern as gallery */}
                {/* <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4">
                    <Link
                      href={listingHref}
                      className="inline-flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-xl border border-[#D8DADF] bg-[#F8F8F9] text-text-black"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Link>
                    <div className="min-w-0">
                      <span className="text-lg font-semibold leading-tight text-text-black">
                        {propertyTitle}
                      </span>
                      <p className="mt-1 text-sm font-semibold leading-none text-text-black">
                        {priceLabel}
                      </p>
                      <p className="mt-1 text-xs text-text-gray">{propertyAddress}</p>
                    </div>
                  </div>
                  <div className="inline-flex w-fit rounded-md border border-[#D4D5D8] bg-white p-1">
                    <Link
                      href={listingHref}
                      className="min-w-[110px] rounded-md bg-[#05085E] px-3 py-2 text-xs font-semibold text-white sm:min-w-[125px] sm:px-4 sm:py-2.5 sm:text-sm"
                    >
                      Listing
                    </Link>
                    <button
                      type="button"
                      className="min-w-[110px] rounded-md px-3 py-2 text-xs font-medium text-text-light-black sm:min-w-[125px] sm:px-4 sm:py-2.5 sm:text-sm"
                    >
                      Project
                    </button>
                    <button
                      type="button"
                      className="min-w-[110px] rounded-md px-3 py-2 text-xs font-medium text-text-light-black sm:min-w-[125px] sm:px-4 sm:py-2.5 sm:text-sm"
                    >
                      Units
                    </button>
                  </div>
                </div> */}

                {/* Property banner with rating - light card, image + details | reviews */}
                <div className=" flex flex-col sm:flex-row overflow-hidden rounded-xl bg-white pb-6">
                  {/* Left 50%: Image and Property details */}
                  <div className="flex w-full w-[55%] min-h-[160px] sm:min-h-[120px] flex-row boreder border-r-2 border-gray-200">
                    <div className="relative h-[100px] w-[180px] sm:h-[180px] sm:w-[280px] shrink-0 overflow-hidden rounded-xl mr-6 border border-[#E5E7EB]">
                      <Image
                        src={coverImage}
                        alt={propertyTitle}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col justify-center px-2 sm:px-0">
                      <h1 className="text-base font-semibold text-[#374151] sm:text-2xl line-clamp-2">
                        {propertyTitle}
                      </h1>
                      <p className="mt-2 font-semibold text-md text-[#6B7280]">
                        {priceLabel}
                      </p>
                      <p className="mt-2 text-sm text-[#6B7280] flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-[#6B7280]" />
                        {propertyAddress}
                      </p>
                    </div>
                  </div>

                  {/* Right 50%: Ratings (from API summary) */}
                  <div className="flex w-full sm:w-1/2 flex-col justify-center px-4 sm:px-8 mt-6 sm:mt-0">
                    {ratingLoading && !ratingData ? (
                      <div className="text-sm text-[#6B7280]">Loading ratings…</div>
                    ) : (
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-start justify-center">
                          <span className="text-2xl sm:text-3xl font-semibold text-[#374151]">
                            {overallRating.toFixed(1)}<span className="text-base font-medium text-[#797B85] align-top">/5</span>
                          </span>
                          <div className="flex gap-0.5 mt-1">
                            {[1, 2, 3, 4, 5].map((i) => {
                              const filled = i <= Math.floor(overallRating);
                              const partial = i === Math.ceil(overallRating) && overallRating % 1 > 0;
                              return (
                                <span key={i} className="relative inline-block h-5 w-5">
                                  <Star className="absolute inset-0 h-5 w-5 text-[#E5E7EB]" />
                                  {(filled || partial) && (
                                    <span
                                      className="absolute top-0 left-0 h-5 overflow-hidden"
                                      style={
                                        partial
                                          ? { width: `${(overallRating % 1) * 100}%` }
                                          : { width: "100%" }
                                      }
                                    >
                                      <Star className="h-5 w-5 fill-[#F5A524] text-[#F5A524]" />
                                    </span>
                                  )}
                                </span>
                              );
                            })}
                          </div>
                          <span className="text-xs text-[#B0B2B8] mt-2">
                            {totalReviewsCount} Total Reviews
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col gap-1 ml-2">
                          {ratingBreakdown.map(({ stars, width }) => (
                            <div key={stars} className="flex items-center gap-2">
                              <div className="h-1.5 flex-1 bg-[#E7E7E9] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#05085E] rounded-full"
                                  style={{ width }}
                                />
                              </div>
                              <span className="flex w-8 shrink-0 justify-end items-center text-xs text-[#797B85]">
                                {stars}&nbsp;
                                <Star className="h-3 w-3 fill-[#B0B2B8] text-[#B0B2B8]" />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ratings by features */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-text-black">
                    Ratings by features
                  </h2>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {featureRatings.map(({ icon: Icon, label, score }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 rounded-xl border border-[#E7E7E9] bg-[#F8F8F9] p-4"
                      >
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F0BC00] bg-white text-[#05085E]">
                          <Icon className="h-6 w-6" />
                        </span>
                        <div>
                          <p className="text-sm text-gray-600">{label}</p>
                          <p className="text-sm mt-0.5 font-medium text-[#05085E]">{score}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What's good / What's bad summary (from API) */}
                <div className="mt-6 grid grid-cols-1 gap-6 border-b border-[#CFCFD2] pb-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-base font-semibold text-text-black">What&apos;s good</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {whatsGood.length > 0
                        ? whatsGood.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-[#f5f5f5] px-3 py-1.5 text-xs text-gray-600"
                          >
                            {item}
                          </span>
                        ))
                        : <span className="text-sm text-text-gray">—</span>}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text-black">What&apos;s bad</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {whatsBad.length > 0
                        ? whatsBad.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-[#f5f5f5] px-3 py-1.5 text-xs text-gray-600"
                          >
                            {item}
                          </span>
                        ))
                        : <span className="text-sm text-text-gray">—</span>}
                    </div>
                  </div>
                </div>

                {/* Main + Sidebar grid (like gallery) */}
                <main className="space-y-6 mt-8">
                  {/* All Reviews section */}
                  <div>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="text-xl font-semibold text-text-black">
                        All Reviews ({total})
                      </h2>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative flex gap-2">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-gray" />
                            <input
                              type="search"
                              placeholder="Search reviews..."
                              value={searchInput}
                              onChange={(e) => setSearchInput(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                              className="w-full rounded-xl border border-[#D4D5D8] bg-white py-2.5 pl-9 pr-4 text-sm text-text-black placeholder:text-text-gray focus:border-[#05085E] focus:outline-none focus:ring-1 focus:ring-[#05085E] sm:w-[220px]"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleSearch}
                            className="rounded-xl border border-[#D4D5D8] bg-white px-4 py-2.5 text-sm font-medium text-text-black hover:bg-[#F8F8F9]"
                          >
                            Search
                          </button>
                        </div>
                        <Link
                          href={`/projects/${projectId}/${listingId}/reviews/create`}
                          className="inline-flex items-center justify-center rounded-xl bg-[#05085E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0B127A]"
                        >
                          Write Review
                        </Link>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-end gap-4">
                      <p className="text-sm font-medium text-text-black">Filter by:</p>
                      <div className="relative">
                        <select
                          value={ratingFilter === "" ? "" : String(ratingFilter)}
                          onChange={(e) => handleRatingFilter(e.target.value)}
                          className="inline-flex appearance-none items-center gap-1 border-b-1 border-[#D4D5D8] bg-white px-4 py-2 pr-8 min-w-[160px] text-sm font-medium text-gray-600 pl-0"
                        >
                          {RATING_FILTER_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-text-gray" />
                      </div>
                      <div className="relative">
                        <select
                          value={sortBy}
                          onChange={(e) => handleSortBy(e.target.value)}
                          className="inline-flex appearance-none items-center gap-1 border-b-1 border-[#D4D5D8] bg-white px-4 py-2 pr-8 min-w-[160px] text-sm font-medium text-gray-600 pl-0"
                        >
                          {SORT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-text-gray" />
                      </div>
                    </div>

                    {ratingLoading && !ratingData ? (
                      <div className="mt-6 text-sm text-text-gray">Loading reviews…</div>
                    ) : (
                      <>
                        <div className="mt-6 space-y-6">
                          {reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                          ))}
                        </div>
                        {reviews.length === 0 && (
                          <p className="mt-6 text-sm text-text-gray">No reviews match your filters.</p>
                        )}
                        {totalPages > 1 && (
                          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                            <button
                              type="button"
                              disabled={page <= 1}
                              onClick={() => setPage((p) => Math.max(1, p - 1))}
                              className="rounded-lg border border-[#D4D5D8] bg-white px-4 py-2 text-sm font-medium text-text-black disabled:opacity-50 hover:bg-[#F8F8F9]"
                            >
                              Previous
                            </button>
                            <span className="text-sm text-text-gray">
                              Page {page} of {totalPages}
                            </span>
                            <button
                              type="button"
                              disabled={page >= totalPages}
                              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                              className="rounded-lg border border-[#D4D5D8] bg-white px-4 py-2 text-sm font-medium text-text-black disabled:opacity-50 hover:bg-[#F8F8F9]"
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
      <AboutusDataSync />
      <HomeFooter />
    </>
  );
}
