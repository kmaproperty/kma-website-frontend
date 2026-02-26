"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { CarFront, Check, ChevronLeft, MapPin, ShieldCheck, Star, Trees } from "lucide-react";
import { usePropertyDetails } from "@/api/hooks/usePropertyDetails";
import { submitPropertyRatingReviewAction } from "@/api/actions/propertyActions";
import MainLayout from "@/components/myList/mainLayout";
import HomeFooter from "@/components/footer/homeFooter";
import { fetchPropertyMasterData } from "@/app/api/home";
import { useEffect } from "react";

const galleryImages = [
  "/assets/property/img-1.png",
  "/assets/property/img-2.png",
  "/assets/property/img-3.png",
  "/assets/property/img-4.png",
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

const ROLE_OPTIONS = [
  { value: "owner", label: "Owner" },
  { value: "tenant", label: "Tenant" },
  { value: "other", label: "Other" },
];

const FEATURES = [
  {
    key: "connectivity" as const,
    icon: CarFront,
    label: "Connectivity",
    description: "Autos and Cabs easily available, Wide and spacious roads",
  },
  {
    key: "neighbourhood" as const,
    icon: MapPin,
    label: "Neighbourhood",
    description: "Great Schools nearby, Hospitals are accessible",
  },
  {
    key: "safety" as const,
    icon: ShieldCheck,
    label: "Safety",
    description: "Safe in the night, Well lit streets",
  },
  {
    key: "livability" as const,
    icon: Trees,
    label: "Livability",
    description: "Lot of green spaces, Great cleanliness",
  },
];

function StarRatingInput({
  value,
  onChange,
  max = 5,
}: {
  value: number;
  onChange: (v: number) => void;
  max?: number;
}) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onChange(star);
            }
          }}
          className="focus:outline-none focus:ring-2 focus:ring-[#05085E] focus:ring-offset-1 rounded"
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            className={`h-8 w-8 transition-colors ${
              star <= value ? "fill-[#F5A524] text-[#F5A524]" : "text-[#E5E7EB]"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function CreateReviewPage() {
  const params = useParams<{ projectId: string; listingId: string }>();
  const router = useRouter();
  const projectId = params?.projectId ?? "";
  const listingId = params?.listingId ?? "";
  const { data: propertyDetails } = usePropertyDetails({ id: listingId });

  const [propertyMasterData, setPropertyMasterData] = useState<unknown[]>([]);
  useEffect(() => {
    fetchPropertyMasterData().then((response) => {
      if (response?.success) setPropertyMasterData((response.data as unknown[]) ?? []);
    });
  }, []);

  const [role, setRole] = useState("owner");
  const [connectivityRating, setConnectivityRating] = useState(0);
  const [neighbourhoodRating, setNeighbourhoodRating] = useState(0);
  const [safetyRating, setSafetyRating] = useState(0);
  const [livabilityRating, setLivabilityRating] = useState(0);
  const [likeText, setLikeText] = useState("");
  const [dislikeText, setDislikeText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

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
    const url =
      media[0] &&
      typeof media[0] === "object" &&
      media[0] !== null &&
      "fileKey" in media[0]
        ? toFullAssetUrl((media[0] as { fileKey?: string }).fileKey)
        : "";
    return url || galleryImages[0];
  }, [propertyDetails]);

  const listingHref = `/projects/${projectId}/${listingId}`;
  const reviewsHref = `/projects/${projectId}/${listingId}/reviews`;
  const createHref = `/projects/${projectId}/${listingId}/reviews/create`;

  const canSubmit =
    connectivityRating >= 1 &&
    neighbourhoodRating >= 1 &&
    safetyRating >= 1 &&
    livabilityRating >= 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting || !listingId) return;
    setSubmitError(null);
    setSubmitting(true);
    try {
      await submitPropertyRatingReviewAction({
        propertyId: listingId,
        role,
        connectivityRating,
        neighbourhoodRating,
        safetyRating,
        livabilityRating,
        likeText: likeText.trim() || undefined,
        dislikeText: dislikeText.trim() || undefined,
      });
      setSuccessOpen(true);
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: string }).message)
          : "Failed to submit review. Please try again.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <MainLayout>
        <div className="min-w-0 w-full">
          <div className="py-8">
            <div className="text-4xl ml-6 mb-5 rounded-lg font-semibold text-white">
              Create a Review
            </div>
            <div className="mx-auto w-full min-w-0 max-w-[1440px] px-4 lg:px-6">
              <div className="rounded-lg border border-border bg-white p-4 shadow-sm lg:p-6">
                {/* Top bar – same pattern as gallery */}
                <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
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
                  <div className="flex items-center gap-4">
                    <div className="relative h-[80px] w-[120px] shrink-0 overflow-hidden rounded-xl border border-[#E5E7EB]">
                      <Image
                        src={coverImage}
                        alt={propertyTitle}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                    <div className="inline-flex w-fit rounded-md border border-[#D4D5D8] bg-white p-1">
                      <Link
                        href={listingHref}
                        className="min-w-[110px] rounded-md bg-[#05085E] px-3 py-2 text-xs font-semibold text-white sm:min-w-[125px] sm:px-4 sm:py-2.5 sm:text-sm inline-flex items-center justify-center"
                      >
                        Listing
                      </Link>
                      <Link
                        href={`/projects/${projectId}`}
                        className="min-w-[110px] rounded-md px-3 py-2 text-xs font-medium text-text-light-black sm:min-w-[125px] sm:px-4 sm:py-2.5 sm:text-sm inline-flex items-center justify-center"
                      >
                        Project
                      </Link>
                      <Link
                        href={reviewsHref}
                        className="min-w-[110px] rounded-md px-3 py-2 text-xs font-medium text-text-light-black sm:min-w-[125px] sm:px-4 sm:py-2.5 sm:text-sm inline-flex items-center justify-center"
                      >
                        Reviews
                      </Link>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-6">
                  {/* Role (optional in UI but API accepts it) */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-text-black mb-2">
                      I am a
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="rounded-xl border border-[#D4D5D8] bg-white px-4 py-2.5 text-sm text-text-black focus:border-[#05085E] focus:outline-none focus:ring-1 focus:ring-[#05085E] min-w-[160px]"
                    >
                      {ROLE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Feature ratings – two columns */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
                    {FEATURES.map(({ key, icon: Icon, label, description }) => (
                      <div
                        key={key}
                        className="rounded-xl border border-[#E7E7E9] bg-[#F8F8F9] p-4"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#F0BC00] bg-white text-[#05085E]">
                            <Icon className="h-5 w-5" />
                          </span>
                          <h3 className="text-base font-semibold text-text-black">
                            {label}
                          </h3>
                        </div>
                        <p className="text-xs text-text-gray mb-3">{description}</p>
                        <StarRatingInput
                          value={
                            key === "connectivity"
                              ? connectivityRating
                              : key === "neighbourhood"
                                ? neighbourhoodRating
                                : key === "safety"
                                  ? safetyRating
                                  : livabilityRating
                          }
                          onChange={
                            key === "connectivity"
                              ? setConnectivityRating
                              : key === "neighbourhood"
                                ? setNeighbourhoodRating
                                : key === "safety"
                                  ? setSafetyRating
                                  : setLivabilityRating
                          }
                        />
                      </div>
                    ))}
                  </div>

                  {/* What do you like / dislike */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
                    <div>
                      <label className="block text-sm font-semibold text-text-black mb-2">
                        What do you like about the locality?
                      </label>
                      <textarea
                        value={likeText}
                        onChange={(e) => setLikeText(e.target.value)}
                        placeholder="We'd love to hear"
                        rows={4}
                        className="w-full rounded-xl border border-[#D4D5D8] bg-white px-4 py-3 text-sm text-text-black placeholder:text-text-gray focus:border-[#05085E] focus:outline-none focus:ring-1 focus:ring-[#05085E] resize-y"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-black mb-2">
                        What do you dislike about the locality?
                      </label>
                      <textarea
                        value={dislikeText}
                        onChange={(e) => setDislikeText(e.target.value)}
                        placeholder="We'd love to hear"
                        rows={4}
                        className="w-full rounded-xl border border-[#D4D5D8] bg-white px-4 py-3 text-sm text-text-black placeholder:text-text-gray focus:border-[#05085E] focus:outline-none focus:ring-1 focus:ring-[#05085E] resize-y"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={!canSubmit || submitting}
                      className="rounded-xl bg-[#05085E] px-8 py-3 text-sm font-semibold text-white hover:bg-[#0B127A] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Submitting…" : "Submit Review"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
      <HomeFooter propertyMasterData={propertyMasterData} />

      {/* Success modal */}
      {successOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div className="rounded-2xl bg-white shadow-xl max-w-md w-full p-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D1FAE5] text-[#059669]">
              <Check className="h-10 w-10" strokeWidth={2.5} />
            </div>
            <h2 id="success-title" className="mt-4 text-xl font-semibold text-text-black">
              Thank you for your review!
            </h2>
            <p className="mt-2 text-sm text-text-gray">
              Your review will be appeared once approved by KMA Team
            </p>
            <p className="mt-1 text-sm text-text-gray">
              You can check in the next 2-3 Days
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={createHref}
                className="inline-flex items-center justify-center rounded-xl border border-[#D4D5D8] bg-white px-5 py-2.5 text-sm font-medium text-text-black hover:bg-[#F8F8F9]"
                onClick={() => setSuccessOpen(false)}
              >
                Add Another Review
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSuccessOpen(false);
                  router.push(reviewsHref);
                }}
                className="inline-flex items-center justify-center rounded-xl bg-[#05085E] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0B127A]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
