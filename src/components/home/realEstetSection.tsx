"use client";
import Image from "next/image";
import SectionHeader from "../common/home/secionHeader";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { topCitiesApiHandler, TopCitiesResponse } from "@/services/homeService";
import { useQuery } from "@tanstack/react-query";

const exploreDetails = [
  {
    name: "Vaishali Nagar",
    properties: 300,
    image: "/assets/estateCity/vaishali_nagar.jpeg",
  },
  {
    name: "Mansarovar",
    properties: 300,
    image: "/assets/estateCity/mansarovar.jpeg",
  },
  {
    name: "Jagatpura",
    properties: 300,
    image: "/assets/estateCity/jagatpura.jpeg",
  },
  {
    name: "Malviya Nagar",
    properties: 300,
    image: "/assets/estateCity/malviya_nagar.jpeg",
  },
  {
    name: "Tonk Road",
    properties: 300,
    image: "/assets/estateCity/tonk_road.jpeg",
  },
];
function ExploreCard({ name, properties, image }) {
  const profileBaseUrl = process.env.NEXT_PUBLIC_AWS_URL;

  return (
    <div className="relative flex-1 rounded-[8px] overflow-hidden shadow-md group">
      {image ? (
        <Image
          src={profileBaseUrl + image}
          alt={name}
          width={300}
          height={400}
          className="cursor-pointer
        w-full h-full object-cover
        transform transition-transform duration-700 ease-in-out
        group-hover:scale-150
      "
        />
      ) : (
        <div
          className=" cursor-pointer
        w-full h-full min-h-[180px]
        bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800
        flex items-center justify-center
        text-white
        text-5xl font-bold
        uppercase
        transform transition-transform duration-700 ease-in-out
        group-hover:scale-150
      "
        >
          {name?.charAt(0)}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-base font-semibold">{name}</h3>
        <p className="text-xs">{properties} Properties</p>
      </div>
      <button className="cursor-pointer absolute bottom-4 right-4 bg-white rounded-full p-1 shadow">
        <Image
          src={"/assets/navigate-arrow-blue.svg"}
          width={15}
          height={15}
          alt="navigate"
          className="w-6 h-6"
        />
      </button>
    </div>
  );
}

export default function RealEstateSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const leftRowVariant = {
    hidden: { x: "-100%", opacity: 1 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
      },
    },
  };

  const rightRowVariant = {
    hidden: { x: "100%", opacity: 1 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
      },
    },
  };

  const { data: citiList } = useQuery({
    queryKey: ["city-list"],
    queryFn: () => {
      return topCitiesApiHandler();
    },
    select: (response: TopCitiesResponse) => {
      return response.cities;
    },
  });

  return (
    <div>
      <SectionHeader
        isInView={isInView}
        heading="Explore Top Real Estate Opportunities Across India"
        subHeading="Smart property choices in India's leading cities."
      />
      <div className="mt-10" ref={ref}>
        {/* First Row */}
        <motion.div
          className="flex flex-col 2md:flex-row gap-4 will-change-transform"
          variants={leftRowVariant}
          animate={isInView ? "visible" : "hidden"}
        >
          {citiList?.slice(0, 3).map((exploreDetail, index) => (
            <ExploreCard
              key={exploreDetail.name}
              name={exploreDetail.name}
              image={exploreDetail.imageUrl}
              properties={exploreDetail?.propertyCount}
            />
          ))}
        </motion.div>
        {/* Second Row */}
        <motion.div
          className="flex flex-col 2md:flex-row mt-4 gap-4 will-change-transform"
          variants={rightRowVariant}
          animate={isInView ? "visible" : "hidden"}
        >
          {citiList?.slice(3).map((exploreDetail, index) => (
            <ExploreCard
              key={exploreDetail.name}
              name={exploreDetail.name}
              image={exploreDetail.imageUrl}
              properties={exploreDetail?.propertyCount}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
