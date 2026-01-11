"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const properties = [
  {
    title: "Villas",
    count: "28 Properties",
    bg: "bg-[#FFF3E0]",
    icon: "/assets/explore/villas.svg",
  },
  {
    title: "Offices",
    count: "45 Properties",
    bg: "bg-[#E4DDFC]",
    icon: "/assets/explore/office.svg",
  },
  {
    title: "Apartment",
    count: "35 Properties",
    bg: "bg-[#FFECF4]",
    icon: "/assets/explore/apratment.svg",
  },
  {
    title: "Home",
    count: "30 Properties",
    bg: "bg-[#D1E8E8]",
    icon: "/assets/explore/home.svg",
  },
  {
    title: "Home",
    count: "30 Properties",
    bg: "bg-[#D1E8E8]",
    icon: "/assets/explore/home.svg",
  },
];

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

export default function ExploreSection() {
  const sliderRef = useRef<Slider | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const settings = {
      dots: false,
      arrows: false,
      infinite: true, 
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
          {properties.map((item, index) => (
            <motion.div
                variants={(index == 0 || index == 1) ? topVariant : bottomVariant}
                className="px-2"
                animate={isInView ? 'visible' : 'hidden'}
              >
              <div
                className={`h-[180px] rounded-xl ${item.bg} flex flex-col items-center justify-center`}
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-14 h-14 mb-6"
                />

                <h3 className="text-lg font-semibold text-black">
                  {item.title}
                </h3>

                <p className="text-xs text-text-gray">{item.count}</p>
              </div>
            </motion.div>
          ))}
        </Slider>
      </motion.div>
    </div>
  );
}
