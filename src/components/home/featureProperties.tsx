"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import Slider from "react-slick";
import { motion, useInView } from "framer-motion";
import SectionHeader from "../common/home/secionHeader";
import Image from "next/image";

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

function Star({
  className = "h-4 w-4",
  filled = true,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} ${filled ? "text-amber-400" : "text-slate-200"}`}
    >
      <path
        fill="currentColor"
        d="M12 2.5l2.97 6.02 6.65.97-4.81 4.69 1.14 6.64L12 17.77 6.05 20.82l1.14-6.64-4.81-4.69 6.65-.97L12 2.5z"
      />
    </svg>
  );
}

export default function FeaturedProperties({ topProperties }) {
  const profileBaseUrl = process.env.NEXT_PUBLIC_AWS_URL;
  const sliderRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const slidesCount = topProperties?.length ?? 0;
  const settings = {
    slidesToShow: Math.min(4, slidesCount),
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div ref={ref} className="flex flex-col">
      <SectionHeader
        isInView={isInView}
        hideButton={true}
        sectionName="featureProperties"
        heading="Featured Properties"
        subHeading="Discover Exclusive Listings of Premium Properties Available for Purchase"
      />

      <div className="flex-1 w-full  2md:min-w-0 -mx-2 feature-property">
        <Slider ref={sliderRef} {...settings} className="mt-10">
          {(topProperties ?? []).map((item, index) => {
            const img = item?.images?.length > 0 ? item.images[0]?.fileKey : null;
            const size = item?.units?.length > 0 ? item.units[0]?.size : null;
            const ratingNumber = Math.max(
              0,
              Math.min(5, Number.parseFloat(String(item?.rating ?? "5")) || 0)
            );
            const filledStars = Math.round(ratingNumber);
            const priceValue =
              item?.listingType == "Sale" ? item?.price : item?.monthlyRent;
            const formattedPrice =
              typeof priceValue === "number"
                ? new Intl.NumberFormat("en-IN").format(priceValue)
                : priceValue ?? "-";
            return (
              <motion.div
                key={item?.id ?? index}
                className="px-1.5 w-[344px] h-[528px]"
                variants={index == 0 || index == 1 ? topVariant : bottomVariant}
                animate={isInView ? "visible" : "hidden"}
              >
                <div className="h-full w-full rounded-[10px] border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 overflow-hidden">
                  <div className="h-full flex flex-col">
                    {/* IMAGE */}
                    <div className="relative">
                      {img ? (
                        <Image
                          src={profileBaseUrl + img}
                          width={600}
                          height={400}
                          alt="property"
                          className="h-[230px] w-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-[230px] bg-gradient-to-br from-slate-100 via-slate-50 to-white flex items-center justify-center">
                          <span className="text-slate-400 text-xs font-medium">
                            No Image
                          </span>
                        </div>
                      )}

                      {/* Tag pill */}
                      <span className="absolute top-3 right-3 rounded-lg px-4 py-2 text-sm font-medium text-white bg-indigo-500 shadow-sm">
                        {item?.propertyType}
                      </span>

                      {/* Avatar */}
                      <button
                        type="button"
                        className="absolute -bottom-5 left-4 rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200"
                        aria-label="View agent"
                      >
                        <Image
                          src={"/assets/property/profile.png"}
                          width={28}
                          height={28}
                          alt="profile"
                          className="rounded-full h-8 w-8"
                        />
                      </button>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-1 min-h-0 flex-col px-4 pb-4 pt-8 gap-2 overflow-hidden">
                      {/* Rating + Like */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4"
                                filled={i < filledStars}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-text-gray">
                            {ratingNumber.toFixed(1)}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="rounded-full border border-slate-200 bg-white p-2 shadow-sm transition-colors hover:bg-slate-50"
                          aria-label="Add to favorites"
                        >
                          <Image
                            src={"/assets/property/heart.svg"}
                            width={18}
                            height={18}
                            alt="Like"
                          />
                        </button>
                      </div>

                      {/* Title + Address */}
                      <div className="min-h-[56px]">
                        <p className="text-xl font-semibold leading-snug text-text-black line-clamp-2">
                          {item?.propertyName}
                        </p>
                        <div className="mt-1 flex items-start gap-2 text-sm text-text-gray">
                          <Image
                            src={"/assets/location-blue.svg"}
                            width={16}
                            height={16}
                            alt="location"
                            className="mt-0.5"
                          />
                          <span className="line-clamp-2">{item?.address}</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-2xl font-bold text-blue">
                        <span>₹ {formattedPrice}</span>
                        <span className="text-sm font-medium text-text-gray">
                          {item?.listingType == "Sale" ? "" : " / Month"}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="mt-1 border-t border-slate-200 pt-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-text-gray">Listed on :</span>
                          <span className="text-text-black">25 May 2025</span>
                        </div>
                        {item?.constructionStatus ? (
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-text-gray">
                              Possession status:
                            </span>
                            <span className="text-text-black">
                              {item.constructionStatus}
                            </span>
                          </div>
                        ) : null}
                      </div>

                      {/* Amenities */}
                      <div className="mt-2 border-t border-slate-200 pt-3">
                        <div className="flex flex-wrap gap-3">
                          {![
                            "Office",
                            "Plot",
                            "Retail Shop",
                            "Warehouse",
                            "Showroom",
                            "Agricultural Land",
                          ].includes(item?.propertyType) ? (
                            <>
                              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-text-black border border-slate-200">
                                <Image
                                  src={"/assets/property/bad.svg"}
                                  width={18}
                                  height={18}
                                  alt="bed"
                                />
                                <span className="whitespace-nowrap">
                                  {item?.bed} Bed
                                </span>
                              </div>
                              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-text-black border border-slate-200">
                                <Image
                                  src={"/assets/property/bathroom.svg"}
                                  width={18}
                                  height={18}
                                  alt="bath"
                                />
                                <span className="whitespace-nowrap">
                                  {item?.bath} Bath
                                </span>
                              </div>
                            </>
                          ) : null}

                          {size ? (
                            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-text-black border border-slate-200 max-w-full">
                              <Image
                                src={"/assets/property/major-white.svg"}
                                width={18}
                                height={18}
                                alt="size"
                                className="invert"
                              />
                              <span className="truncate">{size}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </Slider>
      </div>

      {/* ---------- CONTROLS ---------- */}
      <motion.div
        className="mt-10 flex justify-end gap-6"
        variants={bottomVariant}
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => sliderRef.current?.slickPrev()}
            className="bg-blue text-white cursor-pointer w-9 h-9 rounded-full flex justify-center"
          >
            <Image
              src="/assets/explore/left-arrow.svg"
              alt="left-arrow"
              width={15}
              height={15}
            />
          </button>

          <button
            type="button"
            onClick={() => sliderRef.current?.slickNext()}
            className="bg-blue text-white cursor-pointer w-9 h-9 rounded-full flex justify-center"
          >
            <Image
              src="/assets/explore/right-arrow.svg"
              alt="left-arrow"
              width={15}
              height={15}
            />
          </button>
          <button className="w-auto text-sm 1xl:text-base animated-button px-8 py-2 border border-blue text-center cursor-pointer">
            <span className="gap-3 relative flex justify-center">
              <p className={`text-nowrap`}>All View</p>
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
