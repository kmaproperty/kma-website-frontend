"use client";
import Image from "next/image";
import SectionHeader from "../common/home/secionHeader";
import { useRef, useState } from "react";
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

function Star({
  fill = 100,
  className = "h-3 w-3",
}: {
  fill?: number; // 0 → 100
  className?: string;
}) {
  const id = Math.random().toString(36).slice(2); // unique gradient id

  return (
    <svg viewBox="0 0 24 24" className={className}>
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill}%`} stopColor="white" />
          <stop offset={`${fill}%`} stopColor="white" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
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

export default function ChannelPartnerSection() {
  const selectedCity = useSelector(getSelectedCity)

  const profileBaseUrl = process.env.NEXT_PUBLIC_AWS_URL;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [openContact, setOpenContact] = useState(false)

  const { data: channelPartnerList } = useQuery({
    queryKey: ["channel-partner", selectedCity],
    queryFn: () => {
      let payload: GetChannelPartnerListPayload = {
        city: selectedCity?.name ?? "",
        experience: "",
        limit: "8",
        page: "1",
        // properties: '',
        search: "",
      };
      return getChannelPartnerListApiHandler(payload);
    },
    select: (response: GetChannelPartnerListResponse) => {
      console.log("response", response);
      return response.data;
    },
  });
  

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
            const cityList = item?.cities?.split(',') ?? []
            return (
              <motion.div
                className="cursor-pointer bg-white px-2 py-4 flex flex-col gap-2 rounded-[8px]"
                ref={ref}
                variants={
                  [0, 1, 2, 3].includes(index) ? leftVariant : rightVariant
                }
                animate={isInView ? "visible" : "hidden"}
              >
                <div className="flex gap-1">
                {item.profile_image ? (
                  <Image
                    src={profileBaseUrl + item.profile_image}
                    width={35}
                    height={35}
                    alt="profile"
                    className="h-[35px] w-[35px] rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="
                    h-[35px] w-[35px]
                    rounded-full
                    bg-gray-300
                    flex items-center justify-center
                    text-sm font-semibold text-gray-700
                    uppercase
                    "
                  >
                    {item.name?.charAt(0)}
                  </div>
                )}
                <div className="flex flex-col flex-1 gap-1">
                  <p className="text-text-black text-sm font-medium flex gap-1">
                    {item.name} <span className="bg-[#010048CC] rounded-[3px] px-1 text-white text-[10px] gap-1 flex items-center"><Star/>5</span>
                  </p>
                  <p className={`rounded-[2px]  text-white text-[10px] w-fit px-1`} style={{background: '#FE792D'}}>{'KMA Expert Pro'}</p>
                </div>
                </div>
                <div className="flex flex-col justify-start items-start">
                    <p className="text-text-gray text-xs">
                      {item.experience_years} Years Experience
                    </p>
                    {/* <div className="border-l border-1 border-border h-full"></div> */}
                    <p className="text-text-gray text-xs">
                      {item.property_count} Properties
                    </p>
                    {
                      cityList.length > 0 && <div className="flex flex-wrap mt-1">
                        {
                          cityList.map(city => {
                            return(
                              <p className="px-4 py-1 text-xs bg-[#F2F2F2] rounded-full text-text-black">{city}</p>
                            )
                          })
                        }
                      </div>
                    }
                    <button onClick={() => {
                      setOpenContact(true)
                    }} className="animated-button mt-2 px-[30px] py-[8px] cursor-pointer h-full w-full">
                      <span className="flex items-center justify-center gap-[6px] relative z-11">
                        <Image
                          src="/assets/call-ring-white.svg"
                          width={16}
                          height={16}
                          alt="Search"
                        />
                        <p className="text-nowrap font-medium text-xs">
                          Contact Us
                        </p>
                      </span>
                    </button>
                  </div>
              </motion.div>
            );
          })}
      </div>
      <ContactUsPopup open={openContact} onClose={() => {
        setOpenContact(false)
      }}/>
    </div>
  );
}
