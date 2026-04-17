"use client";
import Image from "next/image";
import SectionHeader from "../common/home/secionHeader";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getUserReviewApiHandler,
  GetUserReviewApiHandlerResponse,
  type Rating,
} from "@/services/homeService";
import Link from "next/link";

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

const leftVariant = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeInOut" as const },
  },
};

const rightVariant = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

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

function SuccessStoryCard({
  item,
  profileBaseUrl,
  isInView,
}: {
  item: Rating;
  profileBaseUrl: string | undefined;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="flex h-full min-w-0 flex-col items-start gap-2 rounded-[8px] bg-white p-3 shadow-sm ring-1 ring-slate-200/70 2md:p-4"
      variants={topVariant}
      animate={isInView ? "visible" : "hidden"}
    >
      <Image
        src={"/assets/stories/quote.svg"}
        width={20}
        height={20}
        alt="quote"
        className="shrink-0"
      />
      <RatingStars rating={Number(item.rating)} total={5} />
      <p className="min-h-0 text-sm leading-snug text-text-gray line-clamp-3 2md:line-clamp-2">
        {item.review}
      </p>
      <div className="mt-auto flex w-full min-w-0 items-center gap-2">
        {item.endUser?.profileImage ? (
          <Image
            src={(profileBaseUrl ?? "") + item.endUser.profileImage}
            width={28}
            height={28}
            alt="profile"
            className="shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-300 text-xs font-semibold uppercase text-gray-700 2md:h-[35px] 2md:w-[35px] 2md:text-sm"
          >
            {item.name?.charAt(0)}
          </div>
        )}
        <p className="min-w-0 flex-1 truncate font-medium text-sm text-text-black">
          {item.name}
        </p>
        <Image
          src={"/assets/stories/dot.svg"}
          width={5}
          height={5}
          alt=""
          className="shrink-0"
        />
        <p className="shrink-0 text-sm text-text-gray">India</p>
      </div>
    </motion.div>
  );
}

export default function SuccessStoriesSection() {
  const profileBaseUrl = process.env.NEXT_PUBLIC_AWS_URL;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: () => {
      return getUserReviewApiHandler();
    },
    select: (response: GetUserReviewApiHandlerResponse) => {
      return response;
    },
  });

  return (
    <>
      <div ref={ref} className="my-16 max-w-[1440px] mx-auto w-full z-10">
        <div className="grid grid-cols-1 2md:grid-cols-[1.2fr_1fr_1fr]">
          <motion.div
            className="col-span-1 flex gap-4 flex-col"
            initial="hidden"
            variants={leftVariant}
            animate={isInView ? "visible" : "hidden"}
          >
            <div className=" w-[80%]">
              <SectionHeader
                isInView={isInView}
                hideButton={true}
                heading="Success stories in their own words"
                subHeading="Read what our satisfied clients have to say about their experiences with our platform."
              />
            </div>
            <Link href="/about-us" className="w-fit text-sm 1xl:text-base animated-button px-8 py-2 border border-blue text-center cursor-pointer">
              <span className="gap-3 relative flex justify-center">
                <p className={`text-nowrap`}>View More</p>
              </span>
            </Link>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-text-black text-base font-medium">
                  Trusted by 50K+ customers
                </p>

                <div className="flex gap-1 items-center">
                  <RatingStars
                    rating={reviewData?.statistics?.averageRating}
                    total={5}
                  />
                  <p className="text-text-black text-xs">
                    {reviewData?.statistics?.averageRating}/5.0
                  </p>
                  <p className="border-l border-border h-full border-1"></p>
                  <p className="text-text-gray text-xs">
                    {" "}
                    {reviewData?.statistics?.totalCount} Reviews
                  </p>
                </div>
              </div>
              <div className="2md:-mt-8">
                <Image
                  src={"/assets/stories/arrow.svg"}
                  width={100}
                  height={100}
                  alt="arrow"
                  className="transform scale-y-[-1] 2md:scale-y-[1]"
                />
              </div>
            </div>
          </motion.div>
          <div className="col-span-1 min-w-0 pb-12 2md:col-span-2 2md:pb-0">
            {/* Mobile: single 2×2 grid — avoids right-column mt-4 stagger */}
            <div className="grid grid-cols-2 gap-3 2md:hidden">
              {(reviewData?.reviews ?? []).slice(0, 4).map((item) => (
                <SuccessStoryCard
                  key={item.id}
                  item={item}
                  profileBaseUrl={profileBaseUrl}
                  isInView={isInView}
                />
              ))}
            </div>
            {/* Desktop: two columns, slight vertical offset on right */}
            <div className="hidden items-start gap-4 2md:flex">
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                {(reviewData?.reviews ?? []).slice(0, 2).map((item) => (
                  <SuccessStoryCard
                    key={item.id}
                    item={item}
                    profileBaseUrl={profileBaseUrl}
                    isInView={isInView}
                  />
                ))}
              </div>
              <div className="mt-4 flex min-w-0 flex-1 flex-col gap-4">
                {(reviewData?.reviews ?? []).slice(2, 4).map((item) => (
                  <SuccessStoryCard
                    key={item.id}
                    item={item}
                    profileBaseUrl={profileBaseUrl}
                    isInView={isInView}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0"
        variants={bottomVariant}
        animate={isInView ? "visible" : "hidden"}
      >
        <Image
          src={"/assets/stories/building.svg"}
          width={200}
          height={200}
          alt="building"
        />
      </motion.div>
      <motion.div
        className="absolute top-0 right-10"
        variants={topVariant}
        animate={isInView ? "visible" : "hidden"}
      >
        <Image
          src={"/assets/stories/top-square.svg"}
          width={200}
          height={200}
          alt="building"
        />
      </motion.div>
      <motion.div
        className="absolute right-0 bottom-2"
        variants={rightVariant}
        animate={isInView ? "visible" : "hidden"}
      >
        <Image
          src={"/assets/stories/bottom-square.svg"}
          width={140}
          height={100}
          alt="building"
        />
      </motion.div>
    </>
  );
}
