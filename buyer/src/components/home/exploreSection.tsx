"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const CARD_BG_COLORS = [
  "bg-[#FFF3E0]",
  "bg-[#E4DDFC]",
  "bg-[#FFECF4]",
  "bg-[#D1E8E8]",
  "bg-[#E8F5E9]",
  "bg-[#FCE4EC]",
  "bg-[#E3F2FD]",
  "bg-[#F3E5F5]",
];

type ExplorePropertyItem = {
  id: string;
  name: string;
  code: string;
  propertyCount: number;
  imageUrl: string;
  images?: { fileKey: string; url: string; view: string; isCoverImage: boolean }[];
};

const leftVariant = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
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
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

const topVariant = {
  hidden: { y: '-100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

type ExploreSectionProps = {
  explorePropertyList?: ExplorePropertyItem[];
};

export default function ExploreSection({ explorePropertyList = [] }: ExploreSectionProps) {
  const sliderRef = useRef<Slider | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  // Deduplicate by name — merge property counts for same type (e.g. Builder Floor sale + rent)
  const list = (() => {
    const raw = Array.isArray(explorePropertyList) ? explorePropertyList : [];
    const map = new Map<string, ExplorePropertyItem>();
    for (const item of raw) {
      const existing = map.get(item.name);
      if (existing) {
        existing.propertyCount += item.propertyCount;
      } else {
        map.set(item.name, { ...item });
      }
    }
    return Array.from(map.values());
  })();

  const settings = {
      dots: false,
      arrows: false,
      infinite: list.length > 4,
      speed: 600,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1280,
          settings: { slidesToShow: 3 },
        },
        {
          breakpoint: 1024,
          settings: { slidesToShow: 2 },
        },
        {
          breakpoint: 640,
          settings: { slidesToShow: 1 },
        },
      ],
    };

  if (list.length === 0) return null;

  return (
    <div className="w-full flex flex-col 2md:flex-row gap-6 items-center">
      <motion.div
        className="flex flex-col 2md:w-[30%] justify-center items-start gap-3"
        ref={ref}
        variants={leftVariant}
        animate={isInView ? "visible" : "hidden"}
      >
        <h2 className="text-xl font-semibold text-black leading-tight">
          Explore by <br /> Property Type
        </h2>

        <div className="bg-gray-400 h-[2px] w-8 mb-2">
          <div className="w-1/2 h-[2px] bg-gray-900" />
        </div>

        <p className="text-text-gray text-xs leading-relaxed ">
        Looking for a cozy apartment, a luxurious villa, a smart investment, or a premium office space? We’ve got you covered.

        </p>

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
        </div>
      </motion.div>

      <motion.div
        className="flex-1 w-full 2md:min-w-0"
        variants={rightVariant}
      >
        <Slider ref={sliderRef} {...settings}>
          {list.map((item, index) => {
            const bgColor = CARD_BG_COLORS[index % CARD_BG_COLORS.length];
            return (
              <motion.div
                key={item.id}
                variants={index === 0 || index === 1 ? topVariant : bottomVariant}
                className="px-2"
                animate={isInView ? "visible" : "hidden"}
              >
                <Link
                  href={`/projects?propertyTypeId=${encodeURIComponent(item.id)}`}
                  className="block group"
                >
                  <div
                    className={`h-[180px] rounded-xl ${bgColor} flex flex-col items-center justify-center overflow-hidden relative`}
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden mb-3 flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-black text-center px-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-text-gray">
                      {item.propertyCount} {item.propertyCount === 1 ? "Property" : "Properties"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </Slider>
      </motion.div>
    </div>
  );
}
