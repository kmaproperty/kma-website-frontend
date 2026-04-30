"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserReviewApiHandler,
  GetUserReviewApiHandlerResponse,
  Rating,
  submitEndUserReviewApiHandler,
} from "@/services/homeService";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import LoginCard from "@/components/channelParterner/loginCard";
import LoginOtpCard from "@/components/channelParterner/loginOtpCard";
import { closeReferralLoginDialog, openReferralLoginDialog } from "@/lib/referral/openLoginDialog";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

function Star({
  fill = 100,
  className = "h-4 w-4",
}: {
  fill?: number; // 0 → 100
  className?: string;
}) {
  const id = Math.random().toString(36).slice(2); // unique gradient id

  return (
    <svg viewBox="0 0 24 24" className={className}>
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill}%`} stopColor="#f59e0b" />
          <stop offset={`${fill}%`} stopColor="#d3d5d8" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M12 2.5l2.97 6.02 6.65.97-4.81 4.69 1.14 6.64L12 17.77 6.05 20.82l1.14-6.64-4.81-4.69 6.65-.97L12 2.5z"
      />
    </svg>
  );
}

function RatingStars({
  rating,
  total = 5,
}: {
  rating: number;
  total?: number;
}) {
  return (
    <div className="flex">
      {Array.from({ length: total }).map((_, i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1) * 100;

        return <Star key={i} fill={fill} />;
      })}
    </div>
  );
}

const bottomVariant = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

const topVariant = {
  hidden: { y: "-100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

export default function SuccessStoriesSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const profileBaseUrl = process.env.NEXT_PUBLIC_AWS_URL;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [isAuthChecking, setIsAuthChecking] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);
  const reviewsPerPage = 4;
  const isLoginParam = searchParams.get("isLogin") === "true";
  const isOtpParam = searchParams.get("isOtp") === "true";
  const flowParam = searchParams.get("flow");
  const isOtpStep = isOtpParam && (flowParam === "login" || flowParam === "enduser-login");
  const isLoginDialogOpen = isLoginParam || isOtpStep;

  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: () => {
      return getUserReviewApiHandler();
    },
    select: (response: GetUserReviewApiHandlerResponse) => {
      return response;
    },
  });

  const totalReviews =
    reviewData?.statistics?.totalCount ?? reviewData?.reviews?.length ?? 0;
  const averageRating = Number(reviewData?.statistics?.averageRating ?? 0);
  const reviews = reviewData?.reviews ?? [];
  const { mutate: submitReview, isPending: isSubmittingReview } = useMutation({
    mutationFn: submitEndUserReviewApiHandler,
    onSuccess: (response) => {
      toast.success(response?.message ?? "Review submitted successfully");
      setIsWriteReviewOpen(false);
      setReview("");
      setRating(5);
      queryClient.invalidateQueries({ queryKey: ["review"] });
    },
    onError: (error: unknown) => {
      const maybeMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string | string[] }).message
          : undefined;
      const message = Array.isArray(maybeMessage)
        ? maybeMessage.join(", ")
        : maybeMessage ?? "Unable to submit review";
      toast.error(message);
    },
  });

  const handleWriteReviewClick = async () => {
    if (isAuthChecking || isSubmittingReview) return;

    setIsAuthChecking(true);
    try {
      const response = await fetch("/api/get-token");
      const data = (await response.json()) as { accessToken?: string | null };
      const isUserLoggedIn = Boolean(data?.accessToken);

      if (!isUserLoggedIn) {
        openReferralLoginDialog(router);
        return;
      }

      setIsWriteReviewOpen(true);
    } catch {
      openReferralLoginDialog(router);
    } finally {
      setIsAuthChecking(false);
    }
  };

  const handleSubmitReview = () => {
    const cleanedReview = review.trim();
    if (!cleanedReview) {
      toast.error("Please enter your review");
      return;
    }

    submitReview({
      rating,
      review: cleanedReview,
    });
  };

  return (
    <>
      <div ref={ref} className="w-[92%] 2md:w-[75%] z-10">
        {/* Header row (matches Figma page header) */}
        <motion.div
          className="mb-6 flex items-center justify-between"
          initial="hidden"
          variants={topVariant}
          animate={isInView ? "visible" : "hidden"}
        >
          <h1 className="text-white text-2xl 2md:text-3xl font-semibold">
            Success Stories
          </h1>

          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-white border border-white/20"
          >
            <span>Mar 2026 - Feb 2026</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-90"
            >
              <path
                d="M7 10l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>

        {/* Main card */}
        <motion.div
          className="rounded-[12px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden"
          initial="hidden"
          variants={bottomVariant}
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Stats row */}
          <div className="grid grid-cols-1 2md:grid-cols-3 border-b border-[#EEF0F3]">
            <div className="p-6 2md:p-8 border-b 2md:border-b-0 2md:border-r border-[#EEF0F3]">
              <p className="text-[11px] text-[#6B7280]">Total Reviews</p>
              <div className="mt-2 flex items-end gap-2">
                <p className="text-2xl font-semibold text-[#111827]">
                  {totalReviews >= 1000
                    ? `${(totalReviews / 1000).toFixed(1)}K`
                    : totalReviews}
                </p>
                <p className="text-[11px] text-[#22C55E] font-medium">
                  +12%
                </p>
              </div>
              <p className="mt-1 text-[11px] text-[#9CA3AF]">
                Growth in reviews this year
              </p>
            </div>

            <div className="p-6 2md:p-8 border-b 2md:border-b-0 2md:border-r border-[#EEF0F3]">
              <p className="text-[11px] text-[#6B7280]">Average Rating</p>
              <div className="mt-2 flex items-center gap-3">
                <p className="text-2xl font-semibold text-[#111827]">
                  {averageRating ? averageRating.toFixed(1) : "0.0"}
                </p>
                <div className="flex items-center gap-2">
                  <RatingStars rating={averageRating} total={5} />
                  <p className="text-[11px] text-[#6B7280]">
                    Average rating during the period
                  </p>
                </div>
              </div>
            </div>

            {/* lightweight "chart" placeholder */}
            <div className="p-6 2md:p-8">
              <div className="flex flex-col gap-2">
                {[80, 60, 45, 35, 25].map((w, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-[6px] w-full rounded-full bg-[#EEF0F3] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#1E3A8A]"
                        style={{ width: `${w}%` }}
                      />
                    </div>
                    <p className="w-8 text-right text-[11px] text-[#6B7280]">
                      {5 - i}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews header + controls */}
          <div className="p-6 2md:p-8">
            <div className="flex flex-col gap-4 2md:flex-row 2md:items-center 2md:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#111827]">
                  All Reviews ({totalReviews})
                </p>
                <p className="mt-1 text-[11px] text-[#9CA3AF]">0.20</p>
              </div>

              <div className="flex flex-col gap-3 2md:flex-row 2md:items-center">
                {/* <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      placeholder=""
                      className="h-9 w-[240px] max-w-full rounded-[6px] border border-[#EEF0F3] bg-white pl-3 pr-9 text-xs text-[#111827] outline-none"
                      readOnly
                    />
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 21l-4.35-4.35"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="11"
                          cy="11"
                          r="7"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                  <button type="button" className="hover:text-[#111827]">
                    Filter
                  </button>
                  <button type="button" className="hover:text-[#111827]">
                    Rating
                  </button>
                  <button type="button" className="hover:text-[#111827]">
                    Sort by
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-2 hover:text-[#111827]"
                  >
                    <span>Recommended</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 10l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div> */}

                <button
                  type="button"
                  className="h-9 rounded-[6px] bg-blue px-4 text-xs font-medium text-white"
                  onClick={handleWriteReviewClick}
                  disabled={isAuthChecking}
                >
                  {isAuthChecking ? "Checking..." : "Write Review"}
                </button>


                {/* show this again */}
              </div>
            </div>

            {/* Review list — pagedReviews keeps server data in sync; placeholders only show when there's no data */}
            <div className="mt-6 rounded-[8px] border border-[#EEF0F3]">
              {(() => {
                const allReviews = reviews.length
                  ? (reviews as (Rating | null)[])
                  : (Array.from({ length: 4 }).map(() => null) as (Rating | null)[]);
                const start = (reviewPage - 1) * reviewsPerPage;
                return allReviews.slice(start, start + reviewsPerPage);
              })().map((item: Rating | null, idx: number) => {
                const name = item?.name ?? "Meera";
                const rating = Number(item?.rating ?? 4.2);
                const review =
                  item?.review ??
                  "This society has been a great and harmonious place. The security, amenities, and maintenance are consistently reliable...";
                const profileImage =
                  item?.endUser?.profileImage && profileBaseUrl
                    ? profileBaseUrl + item.endUser?.profileImage
                    : null;

                return (
                  <div
                    key={item?.id ?? idx}
                    className="px-5 py-5 2md:px-6 2md:py-6 border-b last:border-b-0 border-[#EEF0F3]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        {profileImage ? (
                          <Image
                            src={profileImage}
                            width={36}
                            height={36}
                            alt="profile"
                            className="rounded-full object-cover h-9 w-9"
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700 uppercase">
                            {name?.charAt(0)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#111827]">
                            {name}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <RatingStars rating={rating} total={5} />
                            <p className="text-[11px] text-[#6B7280]">
                              {rating.toFixed(1)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="flex items-center gap-2 text-xs text-[#6B7280]"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 10v10h10V10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 10l3-6 3 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Helpful
                      </button>
                    </div>

                    <p className="mt-4 text-xs leading-5 text-[#6B7280]">
                      {review}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {reviews.length > reviewsPerPage && (() => {
              const totalPages = Math.max(1, Math.ceil(reviews.length / reviewsPerPage));
              // Show up to 3 page numbers, sliding around the current page
              const start = Math.max(1, Math.min(reviewPage - 1, totalPages - 2));
              const pageNumbers = Array.from({ length: Math.min(3, totalPages) }, (_, i) => start + i).filter((p) => p <= totalPages);
              return (
                <div className="mt-5 flex items-center justify-end gap-2 text-xs text-[#6B7280]">
                  <button
                    type="button"
                    onClick={() => setReviewPage((p) => Math.max(1, p - 1))}
                    disabled={reviewPage === 1}
                    className="h-7 rounded-[4px] px-3 border border-[#EEF0F3] bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>
                  {pageNumbers.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setReviewPage(p)}
                      className={`h-7 w-7 rounded-[4px] border ${
                        reviewPage === p
                          ? "border-[#1E3A8A] bg-[#1E3A8A] text-white"
                          : "border-[#EEF0F3] bg-white"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setReviewPage((p) => Math.min(totalPages, p + 1))}
                    disabled={reviewPage >= totalPages}
                    className="h-7 rounded-[4px] px-3 border border-[#EEF0F3] bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              );
            })()}
          </div>
        </motion.div>
      </div>
      <Dialog
        open={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "0.75rem",
            },
          },
        }}
      >
        <DialogContent sx={{ padding: 0 }}>
          <div className="w-full rounded-xl bg-white p-5 sm:w-[460px]">
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="text-[24px] font-semibold text-[#1E2236]">Write a Review</h3>
              <button
                type="button"
                onClick={() => setIsWriteReviewOpen(false)}
                className="rounded-full p-1 text-[#1E2236] transition hover:bg-black/5"
                aria-label="Close review dialog"
              >
                ✕
              </button>
            </div>

            <div className="mb-3">
              <label htmlFor="review-rating" className="mb-1 block text-xs font-medium text-[#4B5563]">
                Rating
              </label>
              <select
                id="review-rating"
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
                className="h-10 w-full rounded-md border border-[#D1D5DB] px-3 text-sm outline-none focus:border-blue"
                disabled={isSubmittingReview}
              >
                {[5, 4, 3, 2, 1].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="review-text" className="mb-1 block text-xs font-medium text-[#4B5563]">
                Review
              </label>
              <textarea
                id="review-text"
                value={review}
                onChange={(event) => setReview(event.target.value)}
                placeholder="Write your experience with KMA..."
                rows={4}
                maxLength={500}
                className="w-full resize-none rounded-md border border-[#D1D5DB] p-3 text-sm outline-none focus:border-blue"
                disabled={isSubmittingReview}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmitReview}
              disabled={isSubmittingReview}
              className="inline-flex h-10 w-full items-center justify-center rounded-full bg-blue px-6 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmittingReview ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isLoginDialogOpen}
        onClose={() => closeReferralLoginDialog(router)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "0.75rem",
            },
          },
        }}
      >
        <DialogContent sx={{ padding: 0 }}>
          <div className="relative w-full rounded-xl bg-white sm:w-[460px]">
            <button
              type="button"
              onClick={() => closeReferralLoginDialog(router)}
              className="absolute right-4 top-4 z-10 rounded-full p-1 text-[#1E2236] transition hover:bg-black/5"
              aria-label="Close login dialog"
            >
              ✕
            </button>
            {isOtpStep ? <LoginOtpCard /> : <LoginCard />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
