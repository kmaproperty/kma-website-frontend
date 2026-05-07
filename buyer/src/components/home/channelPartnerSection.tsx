"use client";
import Image from "next/image";
import SectionHeader from "../common/home/secionHeader";
import { useId, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ChannelPartner,
} from "@/services/homeService";
import { joinUrl } from "@/lib/helper";
import { useRouter } from "nextjs-toploader/app";

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

/** Max partners shown on the home section; matches xl grid row (4 columns). */
const CHANNEL_PARTNER_PREVIEW_LIMIT = 4;

export default function ChannelPartnerSection({
  channelPartnerList,
}: {
  channelPartnerList?: ChannelPartner[];
}) {
  const router = useRouter();
  const profileBaseUrl = process.env.NEXT_PUBLIC_AWS_URL;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const list = Array.isArray(channelPartnerList) ? channelPartnerList : [];
  const hasMorePartners = list.length > CHANNEL_PARTNER_PREVIEW_LIMIT;
  const displayList = hasMorePartners
    ? list.slice(0, CHANNEL_PARTNER_PREVIEW_LIMIT)
    : list;

  // if (!Array.isArray(channelPartnerList) || channelPartnerList.length === 0) {
  //   return null;
  // }

  return (
    <div ref={ref} className="">
      <SectionHeader
        isInView={isInView}
        channelPartnerBtn={true}
        hideButton={!hasMorePartners}
        onViewMore={
          hasMorePartners ? () => router.push("/channel-partner") : undefined
        }
        heading="Become a Channel Partner"
        subHeading="Join hands with us and unlock new opportunities in the real estate ecosystem."
      />
      <div className="grid  grid-cols-1 sm:grid-cols-[1fr_1fr] 2md:grid-cols-[1fr_1fr_1fr] xl:grid-cols-[1fr_1fr_1fr_1fr] gap-3 mt-6">
        {displayList.map((item, index) => {
            const cityList =
              item?.cities
                ?.split(",")
                .map((c) => c.trim())
                .filter(Boolean) ?? [];

            const profileSrc =
              joinUrl(profileBaseUrl, item?.profile_image);
            const ratingValue = Number(item?.average_rating ?? item?.rating);
            const ratingText = Number.isFinite(ratingValue) ? ratingValue.toFixed(1) : "0.0";

            return (
              <motion.div
                key={item?.id ?? `${item?.name ?? "partner"}-${index}`}
                onClick={() => router.push('/channel-partner')}
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

                <div className="mt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <a
                    href="tel:+919056170022"
                    className="flex-1 py-3 px-3 rounded-xl bg-blue text-white font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Image
                      src="/assets/call-ring-white.svg"
                      width={18}
                      height={18}
                      alt="Phone"
                    />
                    Call KMA
                  </a>
                  <a
                    href="https://wa.me/919289977646"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-[18px] h-[18px]"
                      aria-hidden
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            );
        })}
      </div>
    </div>
  );
}
