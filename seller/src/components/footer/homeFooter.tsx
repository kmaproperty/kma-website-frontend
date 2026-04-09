"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useSelector } from "react-redux";
import { getAboutusData, getSelectedCity, getPropertyMasterData } from "@/store/homeHeaderSlice";
import { useEndUserProperties } from "@/api/hooks/useEndUserProperties";

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

export default function HomeFooter({ tab }: { tab?: number } = {}) {
  const selectedCity = useSelector(getSelectedCity);
  const aboutusData = useSelector(getAboutusData);
  const propertyMasterData = useSelector(getPropertyMasterData);

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
  const [footerTab, setFooterTab] = useState(String(tab ?? "1"));
  const currentYear = new Date().getFullYear();

  const handleTab = (tab) => {
    setFooterTab(tab);
  };

  const rentCategory = propertyMasterData?.find(
    (item) => item.code == "rent"
  )?.categories;
  const commercialRentProperty =
    rentCategory?.find(
      (item) => item.code == "commercial"
    )?.propertyTypes ?? [];
  const residentialRentProperty =
    rentCategory?.find(
      (item) => item.code == "residential"
    )?.propertyTypes ?? [];

  const saleCategory = propertyMasterData?.find(
    (item) => item.code == "sale"
  )?.categories;
  const commercialSaleProperty =
    saleCategory?.find(
      (item) => item.code == "commercial"
    )?.propertyTypes ?? [];
  const residentialSaleProperty =
    saleCategory?.find(
      (item) => item.code == "residential"
    )?.propertyTypes ?? [];

  const isRentTab = footerTab === "1";
  const propertyVerb = isRentTab ? "rent" : "sale";
  const rawResidentialList = isRentTab
    ? residentialRentProperty
    : residentialSaleProperty;
  const rawCommercialList = isRentTab ? commercialRentProperty : commercialSaleProperty;
  const citySuffix = selectedCity?.name ? `in ${selectedCity.name}` : "";

  // Fetch properties for selected city + listing type to filter property types with 0 results
  const listingTypeId = isRentTab
    ? propertyMasterData?.find((item) => item.code == "rent")?.id
    : propertyMasterData?.find((item) => item.code == "sale")?.id;

  const { data: footerProperties = [] } = useEndUserProperties(
    {
      cityId: selectedCity?.id,
      listingTypeIds: listingTypeId ? [listingTypeId] : undefined,
      limit: 100,
      page: 1,
    },
    { enabled: !!selectedCity?.id && !!listingTypeId }
  );

  const availablePropertyTypeIds = useMemo(() => {
    const ids = new Set<string>();
    for (const p of footerProperties) {
      const ptId = typeof p.propertyType === 'object' && p.propertyType?.id
        ? p.propertyType.id
        : p.propertyTypeId;
      if (ptId) ids.add(ptId);
    }
    return ids;
  }, [footerProperties]);

  const residentialList = useMemo(() => {
    if (!selectedCity?.id || availablePropertyTypeIds.size === 0) return rawResidentialList;
    return rawResidentialList.filter(item => availablePropertyTypeIds.has(item.id));
  }, [rawResidentialList, availablePropertyTypeIds, selectedCity?.id]);

  const commercialList = useMemo(() => {
    if (!selectedCity?.id || availablePropertyTypeIds.size === 0) return rawCommercialList;
    return rawCommercialList.filter(item => availablePropertyTypeIds.has(item.id));
  }, [rawCommercialList, availablePropertyTypeIds, selectedCity?.id]);

  return (
    <footer className="w-full bg-text-black">
      {/* Tabs */}
      <div ref={ref} className="w-full bg-[#121D2B] flex justify-center border-t border-white/5">
        <div className="w-[90%] md:w-[75%] flex items-stretch">
          <button
            type="button"
            onClick={() => handleTab("1")}
            className={`flex-1 py-3 text-center transition-colors ${
              footerTab === "1"
                ? "border-b-2 border-white text-white"
                : "border-b-2 border-transparent text-white/80 hover:text-white"
            }`}
            aria-pressed={footerTab === "1"}
          >
            <span className="uppercase text-xs md:text-sm tracking-wide">
              Properties for Rent
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleTab("2")}
            className={`flex-1 py-3 text-center transition-colors ${
              footerTab === "2"
                ? "border-b-2 border-white text-white"
                : "border-b-2 border-transparent text-white/80 hover:text-white"
            }`}
            aria-pressed={footerTab === "2"}
          >
            <span className="uppercase text-xs md:text-sm tracking-wide">
              Properties for Sale
            </span>
          </button>
        </div>
      </div>

      {/* Property Links */}
      <div className="flex justify-center">
        <div className="w-[90%] md:w-[75%] pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={topVariant}
              className="flex flex-col gap-3"
              animate={isInView ? "visible" : "hidden"}
            >
              <p className="text-white text-base font-semibold">In Residential</p>
              {residentialList.length === 0 ? (
                <p className="text-[#fffc] text-[13px]">No property types available.</p>
              ) : (
                <ul className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {residentialList.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={selectedCity?.id ? `/projects/${selectedCity.id}` : "/projects"}
                        className="text-[#fffc] text-[13px] leading-5 cursor-pointer hover:underline hover:text-white"
                      >
                        {item.name} for {propertyVerb} {citySuffix ? ` ${citySuffix}` : ""}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            <motion.div
              variants={topVariant}
              className="flex flex-col gap-3"
              animate={isInView ? "visible" : "hidden"}
            >
              <p className="text-white text-base font-semibold">In Commercial</p>
              {commercialList.length === 0 ? (
                <p className="text-[#fffc] text-[13px]">No property types available.</p>
              ) : (
                <ul className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {commercialList.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={selectedCity?.id ? `/projects/${selectedCity.id}` : "/projects"}
                        className="text-[#fffc] text-[13px] leading-5 cursor-pointer hover:underline hover:text-white"
                      >
                        {item.name} for {propertyVerb} {citySuffix ? ` ${citySuffix}` : ""}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full flex justify-center py-8">
        <div className="w-[90%] md:w-[75%]">
          <div className="border-t border-text-gray/60 mb-8" />

          <motion.div
            variants={topVariant}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* About KMA */}
            <div className="space-y-3">
              <h3 className="text-white text-base font-semibold">About KMA</h3>
              <p className="text-[13px] text-white/90 leading-relaxed">
                {aboutusData?.description ?? ""}
              </p>

              <ul className="space-y-3 text-[13px] text-white/90">
                <li className="flex items-start gap-3">
                  <span className="mt-[1px]">
                    <Image
                      src={"/assets/footor/mobile.svg"}
                      width={22}
                      height={22}
                      alt="mobile"
                    />
                  </span>
                  <a
                    href={aboutusData?.phoneNumber ? `tel:${aboutusData.phoneNumber.startsWith('+') ? aboutusData.phoneNumber : `+91${aboutusData.phoneNumber}`}` : undefined}
                    className="hover:text-white"
                  >
                    {aboutusData?.phoneNumber ? (aboutusData.phoneNumber.startsWith('+') ? aboutusData.phoneNumber : `+91 ${aboutusData.phoneNumber}`) : ""}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[1px]">
                    <Image
                      src={"/assets/footor/email.svg"}
                      width={22}
                      height={22}
                      alt="email"
                    />
                  </span>
                  <a
                    href={aboutusData?.email ? `mailto:${aboutusData.email}` : undefined}
                    className="break-words hover:text-white"
                  >
                    {aboutusData?.email ?? ""}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[1px]">
                    <Image
                      src={"/assets/footor/location.svg"}
                      width={22}
                      height={22}
                      alt="location"
                      className="h-[22px]"
                    />
                  </span>
                  <span className="break-words">{aboutusData?.address ?? ""}</span>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white text-base font-semibold mb-3">
                Company
              </h3>
              <ul className="space-y-3 text-[13px] text-white/90">
                {[
                  { label: "About Us", href: `${process.env.NEXT_PUBLIC_BUYER_URL || "http://localhost:3001"}/about-us` },
                  { label: "Contact Us", href: `${process.env.NEXT_PUBLIC_BUYER_URL || "http://localhost:3001"}/contact-us` },
                  { label: "Terms & Conditions", href: `${process.env.NEXT_PUBLIC_BUYER_URL || "http://localhost:3001"}/about-us` },
                  { label: "Privacy Policy", href: `${process.env.NEXT_PUBLIC_BUYER_URL || "http://localhost:3001"}/about-us` },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[#fffc] hover:text-white hover:underline cursor-pointer"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location Map */}
            <div>
              <h3 className="text-base text-white font-semibold mb-3">
                KMA Location
              </h3>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <iframe
                  src={`https://www.google.com/maps?q=${latitude},${longitude}&output=embed`}
                  width="100%"
                  height="170"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* <div className="border-t border-text-gray/60 my-8" /> */}

          {/* Gallery Section */}
          <motion.div
            variants={rightVariant}
            className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 items-center"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Image
                src="/assets/kma-logo-white.svg"
                width={100}
                height={35}
                alt="logo"
                style={{ height: "38px" }}
              />
              <div className="sm:text-right">
                {instagramLink ? (
                  <a
                    href={instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#FFBB55] hover:underline"
                  >
                    @kma on Instagram
                  </a>
                ) : (
                  <p className="text-xs text-[#FFBB55]">@kma on Instagram</p>
                )}
                <p className="text-sm font-semibold text-white mt-1">
                  Nice Gallery
                </p>
              </div>
            </div> */}

            {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="relative group w-full overflow-hidden rounded-lg border border-white/10 aspect-square"
                >
                  <Image
                    src="/assets/blogs/blog-img-1.png"
                    alt="Gallery"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Image
                      src="/assets/footor/instagram.svg"
                      alt="Instagram"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              ))}
            </div> */}
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex justify-center">
        <div className="w-[90%] md:w-[75%] border-t border-text-gray/60 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-white">
          <p className="text-center md:text-left">
            Copyright © {currentYear} KMA. All Rights Reserved.
          </p>

          <div className="flex items-center justify-center md:justify-end gap-3">
            <span className="text-white/90">Social Media:</span>

            {fbLink && (
              <a
                href={fbLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition"
                aria-label="Facebook"
              >
                <Image
                  src="/assets/footor/facebook.svg"
                  width={14}
                  height={14}
                  alt="facebook"
                />
              </a>
            )}

            {twitterLink && (
              <a
                href={twitterLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition"
                aria-label="X"
              >
                <Image
                  src="/assets/footor/x.svg"
                  width={16}
                  height={16}
                  alt="x"
                />
              </a>
            )}

            {youtubeLink && (
              <a
                href={youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition"
                aria-label="YouTube"
              >
                <Image
                  src="/assets/footor/youtube.svg"
                  width={18}
                  height={18}
                  alt="youtube"
                />
              </a>
            )}

            {instagramLink && (
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition"
                aria-label="Instagram"
              >
                <Image
                  src="/assets/footor/instagram.svg"
                  width={16}
                  height={16}
                  alt="instagram"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
