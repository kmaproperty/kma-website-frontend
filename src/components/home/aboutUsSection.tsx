'use client'
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import AboutUsImage from "../common/home/aboutUsImage";
import { useRef } from "react";

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
  hidden: { y: 120, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function AboutUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <div className="my-16 w-[90%] 2md:w-[75%] z-10">
        <motion.div
          className="grid grid-cols-1 2md:grid-cols-2 gap-6 justify-between items-center"
          ref={ref}
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={leftVariant}
            className="flex flex-col gap-3 2md:pr-6"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="w-fit text-black bg-white px-2 py-1 text-xs rounded-[5px]">
              About Us
            </div>
            <div>
              <p className="text-xl text-white text-wrap font-semibold">
                Discover property solutions that are simple, transparent, and
                hassle-free.
              </p>
              <p className="mt-1 leading-4 text-xs text-white text-wrap font-regular">
                Explore top-performing locations where we deliver expert
                support, faster service, and exceptional customer satisfaction —
                right in your neighborhood.
              </p>
            </div>
            <div className="flex gap-4 mt-2">
              <button className="w-auto text-sm 1xl:text-base text-white! hover:text-text-black! animated-button-white px-8 py-2 border border-white bg-transparent! text-center cursor-pointer">
                <span className="gap-3 relative flex justify-center">
                  <p className={`text-nowrap`}>Contact Us</p>
                </span>
              </button>
            </div>
          </motion.div>
          <motion.div
            variants={rightVariant}
            className="flex justify-center h-full 2md:justify-end"
            animate={isInView ? "visible" : "hidden"}
          >
            <AboutUsImage
              width="100%"
              height="280px"
              imageUrl={"/assets/aboutUs/about_us_img.png"}
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 2md:grid-cols-4 gap-3 mt-15"
          variants={staggerContainer}
          animate={isInView ? "visible" : "hidden"}
        >
          {[
            {
              img: "/assets/aboutUs/about_us_1.svg",
              value: "8040+",
              label: "Rentals Completed",
            },
            {
              img: "/assets/aboutUs/about_us_2.svg",
              value: "1014+",
              label: "Trusted Owners",
            },
            {
              img: "/assets/aboutUs/about_us_3.svg",
              value: "6K+",
              label: "Happy Clients",
            },
            {
              img: "/assets/aboutUs/about_us_4.svg",
              value: "1014+",
              label: "Total Bookings",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={bottomVariant}
              animate={isInView ? "visible" : "hidden"}
              className="flex items-center gap-4 bg-[#131D2C] px-5 py-4 rounded-xl"
            >
              <Image src={item.img} width={40} height={40} alt={item.label} />
              <div>
                <p className="text-xl text-white font-medium">{item.value}</p>
                <p className="text-xs text-white">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div
        className="absolute -left-10 bottom-0 z-0"
        variants={leftVariant}
        animate={isInView ? "visible" : "hidden"}
      >
        <Image
          src="/assets/aboutUs/about_us_back.svg"
          width={400}
          height={400}
          alt="bg"
        />
      </motion.div>
      <motion.div
        className="absolute right-30 bottom-0 z-0"
        variants={bottomVariant}
        animate={isInView ? "visible" : "hidden"}
      >
        <Image
          src="/assets/aboutUs/box-below.svg"
          width={300}
          height={300}
          alt="bg"
        />
      </motion.div>
      <motion.div
        className="absolute right-10 top-0 z-0"
        variants={rightVariant}
        animate={isInView ? "visible" : "hidden"}
      >
        <Image
          src="/assets/aboutUs/box-up.svg"
          width={300}
          height={300}
          alt="bg"
        />
      </motion.div>
    </>
  );
}
