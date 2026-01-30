'use client'
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import AboutUsImage from "../common/home/aboutUsImage";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAboutUsSectionDataApiResponse, GetAboutUsSectionResponse } from "@/services/homeService";
import CountUp from 'react-countup';

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

  const { data: aboutus } = useQuery({
    queryKey: ["about-us"],
    queryFn: () => {
      return getAboutUsSectionDataApiResponse();
    },
    select: (response: GetAboutUsSectionResponse) => {
      return response;
    },
  });

  return (
    <>
      <div ref={ref} className="my-16 w-[90%] 2md:w-[75%] z-10">
        <motion.div
          className="grid grid-cols-1 2md:grid-cols-2 gap-6 justify-between items-center"
          
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
                {aboutus?.aboutUs?.heading}
              </p>
              <p className="mt-1 leading-4 text-xs text-white text-wrap font-regular">
                {aboutus?.aboutUs?.description}
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
          className="grid grid-cols-1 2md:grid-cols-4 gap-3 mt-15 justify-items-center "
          variants={staggerContainer}
          animate={isInView ? "visible" : "hidden"}
        >
          {aboutus && [
            {
              img: "/assets/aboutUs/about_us_1.svg",
              value: aboutus?.statistics?.totalOwners,
              label: "Total Owners",
            },
            {
              img: "/assets/aboutUs/about_us_2.svg",
              value: aboutus?.statistics?.totalChannelPartners,
              label: "Total Channel Partner",
            },
            {
              img: "/assets/aboutUs/about_us_3.svg",
              value: aboutus?.statistics?.totalUsers,
              label: "Total Users / Clients",
            },
            {
              img: "/assets/aboutUs/about_us_4.svg",
              value: aboutus?.statistics?.totalActiveProperties,
              label: "Total Active Properties",
            },
            //  {
            //   img: "/assets/aboutUs/about_us_4.svg",
            //   value: aboutus?.statistics?.propertiesListedLast24Hours,
            //   label: "Properties Listed in Last 24 Hours",
            // },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={bottomVariant}
              animate={isInView ? "visible" : "hidden"}
              className="flex items-center gap-4 bg-[#131D2C] w-full max-w-[343px] h-[117px] px-5 py-4 rounded-[10px] border border-white/5 shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:border-white/10 transition-colors"
            >
              <Image src={item.img} width={40} height={40} alt={item.label} />
              <div className="number-count">
                {isInView && <CountUp start={0} end={Number(item.value ?? 0)} delay={1} />}
                <p className="text-xs text-white leading-tight">{item.label}</p>
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
