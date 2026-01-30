"use client";
import Image from "next/image";
import SectionHeader from "../common/home/secionHeader";
import { useId, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  getChannelPartnerListApiHandler,
  GetChannelPartnerListPayload,
  GetChannelPartnerListResponse,
} from "@/services/homeService";
import ContactUsPopup from "../contactUsPopup";
import { useSelector } from "react-redux";
import { getSelectedCity } from "@/store/homeHeaderSlice";
import { joinUrl } from "@/lib/helper";

type SelectedCity = { id?: unknown; name?: string } | null | undefined;

function Star({
  fill = 100,
  className = "h-3 w-3",
}: {
  fill?: number; // 0 → 100
  className?: string;
}) {
  // Stable id avoids hydration mismatches (Math.random() is unstable across renders).
  const id = useId();
  const gradientId = `star-${id.replace(/:/g, "")}`;

  return (
    <svg viewBox="0 0 24 24" className={className}>
      <defs>
        <linearGradient id={gradientId}>
          <stop offset={`${fill}%`} stopColor="white" />
          <stop offset={`${fill}%`} stopColor="#ffffff33" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M12 2.5l2.97 6.02 6.65.97-4.81 4.69 1.14 6.64L12 17.77 6.05 20.82l1.14-6.64-4.81-4.69 6.65-.97L12 2.5z"
      />
    </svg>
  );
}

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

export default function ChannelPartnerSection({
  selectedCity: selectedCityProp,
}: {
  selectedCity?: SelectedCity;
}) {
  const selectedCityFromRedux = useSelector(getSelectedCity) as SelectedCity;
  const selectedCity = selectedCityProp ?? selectedCityFromRedux;
  const profileBaseUrl = process.env.NEXT_PUBLIC_AWS_URL;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [openContact, setOpenContact] = useState(false);

  const { data: channelPartnerResponse } =
    useQuery<GetChannelPartnerListResponse>({
      queryKey: ["channel-partner", selectedCity?.name ?? ""],
    queryFn: () => {
      const payload: GetChannelPartnerListPayload = {
        city: selectedCity?.name ?? "",
        experience: "",
        limit: "8",
        page: "1",
        // properties: '',
        search: "",
      };
      return getChannelPartnerListApiHandler(payload);
    },
  });

  const channelPartnerList = channelPartnerResponse?.data ?? [];
  if (!Array.isArray(channelPartnerList) || channelPartnerList.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className="">
      <SectionHeader
        isInView={isInView}
        channelPartnerBtn={true}
        heading="Become a Channel Partner"
        subHeading="Join hands with us and unlock new opportunities in the real estate ecosystem."
      />
      <div className="grid  grid-cols-1 sm:grid-cols-[1fr_1fr] 2md:grid-cols-[1fr_1fr_1fr] xl:grid-cols-[1fr_1fr_1fr_1fr] gap-3 mt-6">
        {Array.isArray(channelPartnerList) &&
          channelPartnerList?.map((item, index) => {
            const cityList =
              item?.cities
                ?.split(",")
                .map((c) => c.trim())
                .filter(Boolean) ?? [];

            const profileSrc =
              joinUrl(profileBaseUrl, item?.profile_image);
            const rating = Number((item as any)?.rating ?? 4.3);
            const ratingText = Number.isFinite(rating) ? rating.toFixed(1) : "4.3";

            return (
              <motion.div
                key={item?.id ?? `${item?.name ?? "partner"}-${index}`}
                className="cursor-pointer bg-white p-5 flex flex-col rounded-2xl border border-[#EEF0F4] shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
                variants={
                  [0, 1, 2, 3].includes(index) ? leftVariant : rightVariant
                }
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <div className="flex items-start gap-3">
                  {profileSrc ? (
                    <Image
                      src={profileSrc}
                      width={56}
                      height={56}
                      alt={`${item?.name ?? "Channel partner"} profile`}
                      className="h-14 w-14 rounded-full object-cover ring-1 ring-[#EEF0F4]"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-[#F2F2F2] flex items-center justify-center text-base font-semibold text-text-black uppercase ring-1 ring-[#EEF0F4]">
                      {item?.name?.charAt(0) ?? "?"}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-text-black text-lg font-semibold leading-6 truncate">
                        {item?.name}
                      </p>
                      <span className="shrink-0 bg-blue rounded-lg px-2 py-1 text-white text-xs font-semibold flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {ratingText}
                      </span>
                    </div>

                    <span className="mt-2 inline-flex w-fit rounded-lg bg-[#FE792D] px-3 py-1 text-xs font-semibold text-white">
                      KMA Expert Pro
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-text-gray">
                  {item?.experience_years ?? 0} Years Experience
                  <span className="mx-2 text-[#D9D9D9]">|</span>
                  {item?.property_count ?? 0} Properties
                </p>

                {cityList.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cityList.map((city, cityIndex) => (
                      <span
                        key={`${city}-${cityIndex}`}
                        className="px-4 py-1 text-xs bg-[#F2F2F2] rounded-full text-text-gray"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setOpenContact(true)}
                  className="animated-button mt-4 w-full py-3 px-6 cursor-pointer"
                >
                  <span className="flex items-center justify-center gap-2 relative z-11">
                    <Image
                      src="/assets/call-ring-white.svg"
                      width={18}
                      height={18}
                      alt="Phone"
                    />
                    <span className="text-nowrap font-semibold text-sm">
                      Contact Now
                    </span>
                  </span>
                </button>
              </motion.div>
            );
          })}
      </div>
      <ContactUsPopup open={openContact} onClose={() => {
        setOpenContact(false);
      }}/>
    </div>
  );
}
