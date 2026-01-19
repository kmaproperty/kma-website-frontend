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
const propertyList = [
  {
    type: "Apartment",
    rating: "5.0",
    name: "Royal Apartment",
    location: "25, Willow Crest Apartment",
    price: "$400.00",
    ListedOn: "25 May 2025",
    PossessionStatus: "Ready to move",
    bed: 2,
    bath: 2,
    size: "350 Sq Ft",
    imgage: "/assets/property/img-1.png",
  },
  {
    type: "Villa",
    rating: "5.0",
    name: "Grand Villa House",
    location: "10, Oak Ridge Villa",
    price: "$400.00",
    ListedOn: "25 May 2025",
    PossessionStatus: "Ready to move",
    bed: 2,
    bath: 2,
    size: "350 Sq Ft",
    imgage: "/assets/property/img-2.png",
  },
  {
    type: "Suite",
    rating: "5.0",
    name: "Elite Suite Room",
    location: "42, Maple Grove Residences",
    price: "$400.00",
    ListedOn: "25 May 2025",
    PossessionStatus: "Ready to move",
    bed: 2,
    bath: 2,
    size: "350 Sq Ft",
    imgage: "/assets/property/img-3.png",
  },
  {
    type: "Residency",
    rating: "5.0",
    name: "Celestial Residency",
    location: "88, Pine Valley Heights",
    price: "$400.00",
    ListedOn: "25 May 2025",
    PossessionStatus: "Ready to move",
    bed: 2,
    bath: 2,
    size: "350 Sq Ft",
    imgage: "/assets/property/img-4.png",
  },
  {
    type: "Residency",
    rating: "5.0",
    name: "Celestial Residency",
    location: "88, Pine Valley Heights",
    price: "$400.00",
    ListedOn: "25 May 2025",
    PossessionStatus: "Ready to move",
    bed: 2,
    bath: 2,
    size: "350 Sq Ft",
    imgage: "/assets/property/img-1.png",
  },
];

function Star({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} text-amber-400`}>
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

  const settings = {
    slidesToShow: 4,
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

      <div className="flex-1 w-full  2md:min-w-0 -mx-2">
        <Slider ref={sliderRef} {...settings} className="mt-10">
          {topProperties.map((item, index) => {
            const img = item.images.length > 0 ? item.images[0]?.fileKey : null;
            const size = item.units.length > 0 ? item.units[0]?.size : null
            return (
              <motion.div
                className="px-1.5 h-full"
                variants={index == 0 || index == 1 ? topVariant : bottomVariant}
                animate={isInView ? "visible" : "hidden"}
              >
                <div className="h-full rounded-[8px] border border-border bg-white">
                  <div className=" h-full">
                    <div className="relative">
                      {img ? (
                        <Image
                          src={profileBaseUrl + img}
                          width={100}
                          height={100}
                          alt="property"
                          className="h-[160px] w-full object-cover rounded-t-[8px]"
                        />
                      ) : (
                        <div className="w-full h-[160px] rounded-t-[8px] bg-gradient-to-br from-white/20 via-white/10 to-white/5 flex items-center justify-center">
                          <span className="text-white/50 text-xs font-medium">
                            No Image
                          </span>
                        </div>
                      )}

                      <span className="absolute top-3 right-3 rounded-[4px] px-3 py-1 text-xs text-white bg-indigo-500">
                        {item.propertyType}
                      </span>

                      <button className="absolute bottom-3 left-3 border border-white rounded-full">
                        <Image
                          src={"/assets/property/profile.png"}
                          width={28}
                          height={28}
                          alt="profile"
                          className="rounded-full"
                        />
                      </button>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col gap-1 px-3 py-3">
                      {/* RATING */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} />
                          ))}
                          <span className="ml-2 text-sm text-text-gray">
                            {item.rating}
                          </span>
                        </div>
                        <div>
                          <Image
                            src={"/assets/property/heart.svg"}
                            width={16}
                            height={16}
                            alt="Like"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-base font-medium leading-snug line-clamp-2 text-text-black">
                          {item.propertyName}
                        </p>
                        <p className="mt-1 flex items-start gap-1 text-xs text-text-gray ">
                          <Image
                            src={"/assets/property/location-white.svg"}
                            width={14}
                            height={14}
                            alt="location"
                          />
                          <p className="line-clamp-2">{item.address}</p>
                        </p>
                      </div>

                      <p className="text-base font-semibold text-blue">
                        ₹ {item.listingType == "Sale"
                          ? item.price
                          : item.monthlyRent}{" "} {item.listingType == "Sale" ? "" : "/ Month"}
                      </p>

                      <div className="pt-3 pb-2 border-t flex flex-col justify-center items-start text-[10px] border-border">
                        <div className="flex gap-2 text-xs">
                          <p className="text-text-gray">Listed On:</p>
                          <p>25 May 2025</p>
                        </div>
                        {item.constructionStatus && <div className="flex gap-2 text-xs">
                          <p className="text-text-gray">Possession Status:</p>
                          <p>{item.constructionStatus}</p>
                        </div>}
                      </div>
                      <div className="pt-3 border-t flex justify-between items-center text-[10px] border-border">
                        {![
                          "Office",
                          "Plot",
                          "Retail Shop",
                          "Warehouse",
                          "Showroom",
                          "Agricultural Land",
                        ].includes(item.propertyType) && <div className="flex items-center gap-1">
                          <Image
                            src={"/assets/property/bad.svg"}
                            width={23}
                            height={23}
                            alt="bed"
                          />{" "}
                          {item.bed} Bed
                        </div>}
                        {![
                          "Office",
                          "Plot",
                          "Retail Shop",
                          "Warehouse",
                          "Showroom",
                          "Agricultural Land",
                        ].includes(item.propertyType) && <div className="flex items-center gap-1">
                          <Image
                            src={"/assets/property/bathroom.svg"}
                            width={23}
                            height={23}
                            alt="bed"
                          />{" "}
                          {item.bath} Bath
                        </div>}
                        {size && <div className="flex items-center gap-1 truncate">
                          <Image
                            src={"/assets/property/major-white.svg"}
                            width={23}
                            height={23}
                            alt="major"
                          />{" "}
                          {size}
                        </div>}
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
