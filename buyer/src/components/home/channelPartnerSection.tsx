"use client";
import Image from "next/image";
import SectionHeader from "../common/home/secionHeader";
import { useId, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChannelPartner } from "@/services/homeService";
import ContactUsPopup from "../contactUsPopup";
import { joinUrl } from "@/lib/helper";
import { useRouter } from "nextjs-toploader/app";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Star({
  fill = 100,
  className = "h-3 w-3",
}: {
  fill?: number;
  className?: string;
}) {
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

const CHANNEL_PARTNER_PREVIEW_LIMIT = 8; 

export default function ChannelPartnerSection({
  channelPartnerList,
}: {
  channelPartnerList?: ChannelPartner[];
}) {
  const router = useRouter();
  const profileBaseUrl = process.env.NEXT_PUBLIC_AWS_URL;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [openContact, setOpenContact] = useState(false);

  const list = Array.isArray(channelPartnerList) ? channelPartnerList : [];
  const hasMorePartners = list.length > CHANNEL_PARTNER_PREVIEW_LIMIT;
  const displayList = hasMorePartners
    ? list.slice(0, CHANNEL_PARTNER_PREVIEW_LIMIT)
    : list;

  return (
    <div ref={ref} className="relative">
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
      
      <div className="mt-6 relative group">
        
        <div className="hidden xl:flex absolute top-1/2 -left-6 -right-6 -translate-y-1/2 justify-between pointer-events-none z-50">
          <button className="swiper-button-prev-custom pointer-events-auto w-12 h-12 rounded-full bg-white border border-[#EEF0F4] shadow-md flex items-center justify-center text-[#000066] hover:bg-[#000066] hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="swiper-button-next-custom pointer-events-auto w-12 h-12 rounded-full bg-white border border-[#EEF0F4] shadow-md flex items-center justify-center text-[#000066] hover:bg-[#000066] hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full partner-swiper">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={12}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 12 },
              1024: { slidesPerView: 3, spaceBetween: 16 },
              1280: { slidesPerView: 4, spaceBetween: 16 }
            }}
            className="pb-12 px-1"
          >
            {displayList.map((item, index) => {
              const cityList =
                item?.cities
                  ?.split(",")
                  .map((c) => c.trim())
                  .filter(Boolean) ?? [];
              const profileSrc = joinUrl(profileBaseUrl, item?.profile_image);
              const ratingValue = Number(item?.average_rating ?? item?.rating);
              const ratingText = Number.isFinite(ratingValue)
                ? ratingValue.toFixed(1)
                : "0.0";

              return (
                <SwiperSlide key={item?.id ?? index} className="h-auto">
                  <motion.div
                    onClick={() => router.push("/channel-partner")}
                    className="cursor-pointer bg-white p-5 flex flex-col rounded-2xl border border-[#EEF0F4] shadow-[0_6px_24px_rgba(0,0,0,0.06)] h-full justify-between"
                    variants={
                      [0, 1, 2, 3].includes(index) ? leftVariant : rightVariant
                    }
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    <div>
                      {/* Profile Section */}
                      <div className="flex items-start gap-3">
                        {profileSrc ? (
                          <Image
                            src={profileSrc}
                            width={56}
                            height={56}
                            alt="profile"
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
                            <span className="shrink-0 bg-[#000066] rounded-lg px-2 py-1 text-white text-xs font-semibold flex items-center gap-1">
                              <Star className="h-4 w-4 fill-white" /> {ratingText}
                            </span>
                          </div>
                          <span className="mt-2 inline-flex w-fit rounded-lg bg-[#FE792D] px-3 py-1 text-xs font-semibold text-white">
                            KMA Expert Pro
                          </span>
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-text-gray">
                        {item?.experience_years ?? 0} Years Experience{" "}
                        <span className="mx-2 text-[#D9D9D9]">|</span>{" "}
                        {item?.property_count ?? 0} Properties
                      </p>

                      {/* Cities */}
                      <div className="mt-3 flex flex-wrap gap-2 min-h-[30px]">
                        {cityList.slice(0, 2).map((city, cityIndex) => (
                          <span
                            key={cityIndex}
                            className="px-4 py-1 text-xs bg-[#F2F2F2] rounded-full text-text-gray"
                          >
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Button Block - Always aligned at bottom via flex layouts */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenContact(true);
                      }}
                      className="animated-button mt-5 w-full py-3 px-6 cursor-pointer"
                    >
                      <span className="flex items-center justify-center gap-2 relative z-11">
                        <Image
                          src="/assets/call-ring-white.svg"
                          width={18}
                          height={18}
                          alt="Phone"
                        />
                        <span className="font-semibold text-sm">
                          Contact Now
                        </span>
                      </span>
                    </button>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

      </div>
      <ContactUsPopup
        open={openContact}
        onClose={() => {
          setOpenContact(false);
        }}
      />
    </div>
  );
}
