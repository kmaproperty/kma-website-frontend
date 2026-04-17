"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { type Settings } from "react-slick";
import { useLayoutEffect, useRef, useState } from "react";
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

/** Aligns with theme: sm/md → 2md/lg → xl → 1xl+ */
function getExploreSlidesToShow(viewportWidth: number): number {
  if (viewportWidth <= 640) return 1;
  if (viewportWidth <= 1024) return 2;
  if (viewportWidth < 1440) return 3;
  return 4;
}

export default function ExploreSection({ explorePropertyList = [] }: ExploreSectionProps) {
  const sliderRef = useRef<InstanceType<typeof Slider> | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const list = Array.isArray(explorePropertyList) ? explorePropertyList : [];
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  // react-slick ^0.31: `responsive` often does not apply on first paint — derive slidesToShow from width.
  useLayoutEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxAtWidth = windowWidth == null ? 1 : getExploreSlidesToShow(windowWidth);
  const slidesToShow = list.length > 0 ? Math.min(maxAtWidth, list.length) : 1;
  const showSliderArrows = windowWidth != null && list.length > slidesToShow;

  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: list.length > slidesToShow,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
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
          Whether you're looking for a cozy apartment, a luxurious villa, or a
          commercial investment, we’ve got you covered.
        </p>

        {showSliderArrows ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => sliderRef.current?.slickPrev?.()}
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
              onClick={() => sliderRef.current?.slickNext?.()}
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
        ) : null}
      </motion.div>

      <motion.div
        className="flex-1 w-full 2md:min-w-0"
        variants={rightVariant}
      >
        <Slider
          key={`explore-${slidesToShow}-${list.length}`}
          ref={sliderRef}
          {...settings}
        >
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
                  href={`/properties?type=${encodeURIComponent(item.code)}`}
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
