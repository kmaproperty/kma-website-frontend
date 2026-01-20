"use client";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSelector } from "react-redux";
import { getAboutusData, getSelectedCity } from "@/store/homeHeaderSlice";


const rightVariant = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
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

export default function HomeFooter({
  propertyMasterData,
}) {
  const selectedCity = useSelector(getSelectedCity)
  const aboutusData = useSelector(getAboutusData)
  
  const {
    instagramLink,
    fbLink,
    twitterLink,
    youtubeLink,
    latitude,
    longitude,
  } = aboutusData || {};
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [footerTab, setFooterTab] = useState("1");

  const handleTab = (tab) => {
    setFooterTab(tab);
  };

  const rentCategory = propertyMasterData?.find(
    (item) => item.code == "rent"
  )?.categories;
  const commercialRentProperty =
    rentCategory?.find(
      (item) => item.id == "425df69f-8bd3-4050-8db6-b4093ea5d0b2"
    )?.propertyTypes ?? [];
  const residentialRentProperty =
    rentCategory?.find(
      (item) => item.id == "867c2adf-7e01-45a8-a305-74900b24c529"
    )?.propertyTypes ?? [];

  const saleCategory = propertyMasterData?.find(
    (item) => item.code == "sale"
  )?.categories;
  const commercialSaleProperty =
    saleCategory?.find(
      (item) => item.id == "425df69f-8bd3-4050-8db6-b4093ea5d0b2"
    )?.propertyTypes ?? [];
  const residentialSaleProperty =
    saleCategory?.find(
      (item) => item.id == "867c2adf-7e01-45a8-a305-74900b24c529"
    )?.propertyTypes ?? [];

  return (
    <>
      <div
        ref={ref}
        className="bg-[#121D2B] h-[40px] w-full flex justify-center"
      >
        <div className="cursor-pointer w-[90%] md:w-[75%] flex justify-between items-center">
          <div
            onClick={() => handleTab("1")}
            className={`flex w-full justify-center items-center text-center h-full ${
              footerTab == "1"
                ? "border-b-2 border-white"
                : "border-b-2 border-[#121D2B]"
            }`}
          >
            <p className="uppercase text-white text-xs md:text-sm">
              Properties for Rent
            </p>
          </div>
          <div
            onClick={() => handleTab("2")}
            className={`flex w-full justify-center items-center text-center h-full ${
              footerTab == "2"
                ? "border-b-2 border-white"
                : "border-b-2 border-[#121D2B]"
            }`}
          >
            <p className="uppercase text-white text-xs md:text-sm">
              Properties for Sale
            </p>
          </div>
        </div>
      </div>
      <div className="bg-text-black flex justify-center">
        <div className="mt-6 w-[90%] md:w-[75%]">
          {footerTab == "1" && (
            <div className="flex flex-col gap-5">
              <motion.div
                variants={topVariant}
                className="flex flex-col gap-3"
                animate={isInView ? "visible" : "hidden"}
              >
                <p className="text-white text-base font-semibold">
                  In Residential
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 2md:grid-cols-3 lg:grid-cols-4 gap-3 mt-1">
                  {residentialRentProperty.map((item) => {
                    return (
                      <p key={item.id} className="text-[#fffc] text-[13px] cursor-pointer hover:underline hover:text-white">
                        {item.name} for rent{" "}
                        {selectedCity ? `in ${selectedCity?.name}` : ""}
                      </p>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                variants={topVariant}
                className="flex flex-col gap-3 mt-2"
                animate={isInView ? "visible" : "hidden"}
              >
                <p className="text-white text-base font-semibold">
                  In Commercial
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 2md:grid-cols-3 lg:grid-cols-4 gap-3 mt-1">
                  {commercialRentProperty.map((item) => {
                    return (
                      <p key={item.id} className="text-[#fffc] text-[13px] cursor-pointer hover:underline hover:text-white">
                        {item.name} for rent{" "}
                        {selectedCity ? `in ${selectedCity?.name}` : ""}
                      </p>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
          {footerTab == "2" && (
            <div className="flex flex-col gap-5">
              <motion.div
                variants={topVariant}
                className="flex flex-col gap-3"
                animate={isInView ? "visible" : "hidden"}
              >
                <p className="text-white text-base font-semibold">
                  In Residential
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 2md:grid-cols-3 lg:grid-cols-4 gap-3 mt-1">
                  {residentialSaleProperty.map((item) => {
                    return (
                      <p key={item.id} className="text-[#fffc] text-[13px] cursor-pointer hover:underline hover:text-white">
                        {item.name} for rent{" "}
                        {selectedCity ? `in ${selectedCity?.name}` : ""}
                      </p>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                variants={topVariant}
                className="flex flex-col gap-3 mt-2"
                animate={isInView ? "visible" : "hidden"}
              >
                <p className="text-white text-base font-semibold">
                  In Commercial
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 2md:grid-cols-3 lg:grid-cols-4 gap-3 mt-1">
                  {commercialSaleProperty.map((item) => {
                    return (
                      <p key={item.id} className="text-[#fffc] text-[13px] cursor-pointer hover:underline hover:text-white">
                        {item.name} for rent{" "}
                        {selectedCity ? `in ${selectedCity?.name}` : ""}
                      </p>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full bg-text-black flex justify-center py-6">
        <div className="w-[90%] md:w-[75%]">
          <div className="border-t border-text-gray mb-6" />
          {/* Top Grid */}
          <motion.div
            variants={topVariant}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* About KMA */}
            <div className="space-y-3">
              <h3 className="text-white text-base font-semibold">About KMA</h3>
              <p className="text-xs text-white leading-relaxed pr-3">
                {aboutusData?.description ?? ""}
              </p>

              <ul className="space-y-3 text-xs text-white">
                <li className="flex items-center gap-3">
                  <span>
                    <Image
                      src={"/assets/footor/mobile.svg"}
                      width={25}
                      height={25}
                      alt="mobile"
                    />{" "}
                  </span>{" "}
                  +91 {aboutusData?.phoneNumber}
                </li>
                <li className="flex items-center gap-3">
                  <span>
                    <Image
                      src={"/assets/footor/email.svg"}
                      width={25}
                      height={25}
                      alt="mobile"
                    />
                  </span>{" "}
                  infomail123@domain.com
                </li>
                <li className="flex items-center gap-3">
                  <span>
                    <Image
                      src={"/assets/footor/location.svg"}
                      width={25}
                      height={25}
                      alt="mobile"
                      className="h-[25px]"
                    />
                  </span>{" "}
                  {aboutusData?.address}
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white text-base font-semibold mb-3">
                Company
              </h3>
              <ul className="space-y-3 text-xs text-white">
                <li className="text-[#fffc] text-[13px] hover:text-white hover:underline">
                  About Us
                </li>
                <li className="text-[#fffc] text-[13px] hover:text-white hover:underline">
                  Careers
                </li>
                <li className="text-[#fffc] text-[13px] hover:text-white hover:underline">
                  Services
                </li>
                <li className="text-[#fffc] text-[13px] hover:text-white hover:underline">
                  Contact Us
                </li>
                <li className="text-[#fffc] text-[13px] hover:text-white hover:underline">
                  Terms & Conditions
                </li>
                <li className="text-[#fffc] text-[13px] hover:text-white hover:underline">
                  Privacy Policy
                </li>
              </ul>
            </div>

            {/* Location Map */}
            <div>
              <h3 className="text-base text-white font-semibold mb-3">
                KMA Location
              </h3>
              <div className="overflow-hidden rounded-xl border border-gray-700">
                <iframe
                  src={`https://www.google.com/maps?q=${latitude},${longitude}&output=embed`}
                  width="100%"
                  height="150"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-text-gray my-6" />

          {/* Gallery Section */}
          <motion.div
            variants={rightVariant}
            className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 items-center"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="flex justify-between items-center">
              <Image
                src="/assets/kma-logo-white.svg"
                width={100}
                height={35}
                alt="logo"
                style={{ height: "38px" }}
              />
              <div>
                <p className="text-xs text-[#FFBB55] mt-2">@kma on Instagram</p>
                <p className="text-sm font-semibold text-white mt-1">
                  Nice Gallery
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="relative group h-28 w-full overflow-hidden rounded-[5px]"
                >
                  <img
                    src="/assets/blogs/blog-img-1.png"
                    alt="Gallery"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <img
                      src="/assets/footor/instagram.svg"
                      alt="icon"
                      className="w-6 h-6"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="w-full bg-text-black flex justify-center">
        <div className="w-[90%] md:w-[75%] border-t border-text-gray pt-6 pb-10 flex flex-col md:flex-row items-center justify-between text-xs text-white">
          <p>Copyright © 2025 KMA. All Rights Reserved.</p>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <span>Social Media:</span>

            {fbLink && (
              <a
                href={fbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <Image
                  src="/assets/footor/facebook.svg"
                  width={9}
                  height={9}
                  alt="facebook"
                />
              </a>
            )}

            {twitterLink && (
              <a
                href={twitterLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <Image
                  src="/assets/footor/x.svg"
                  width={14}
                  height={14}
                  alt="x"
                />
              </a>
            )}

            {youtubeLink && (
              <a
                href={youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <Image
                  src="/assets/footor/youtube.svg"
                  width={16}
                  height={16}
                  alt="youtube"
                />
              </a>
            )}

            {instagramLink && (
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <Image
                  src="/assets/footor/instagram.svg"
                  width={14}
                  height={14}
                  alt="instagram"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
