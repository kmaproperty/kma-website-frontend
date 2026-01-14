"use client";
import Image from "next/image";
import SectionHeader from "../common/home/secionHeader";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  getChannelPartnerListApiHandler,
  GetChannelPartnerListPayload,
  GetChannelPartnerListResponse,
} from "@/services/homeService";

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

export default function ChannelPartnerSection({ selectedCity }) {
  const profileBaseUrl = process.env.NEXT_PUBLIC_AWS_URL;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { data: channelPartnerList } = useQuery({
    queryKey: ["channel-partner", selectedCity],
    queryFn: () => {
      let payload: GetChannelPartnerListPayload = {
        city: selectedCity ?? "",
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

  return (
    <div ref={ref} className="">
      <SectionHeader
        isInView={isInView}
        channelPartnerBtn={true}
        heading="Become a Channel Partner"
        subHeading="Join hands with us and unlock new opportunities in the real estate ecosystem."
      />
      <div className="grid  grid-cols-1 sm:grid-cols-[1fr_1fr] 2md:grid-cols-[1fr_1fr_1fr] xl:grid-cols-[1fr_1fr_1fr_1fr] gap-3 mt-3">
        {Array.isArray(channelPartnerList) &&
          channelPartnerList?.map((item, index) => {
            return (
              <motion.div
                className="cursor-pointer bg-white px-2 py-4 flex gap-2 rounded-[8px]"
                ref={ref}
                variants={
                  [0, 1, 2, 3].includes(index) ? leftVariant : rightVariant
                }
                animate={isInView ? "visible" : "hidden"}
              >
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
                <div className="flex flex-col">
                  <p className="text-text-black text-sm font-medium">
                    {item.name}
                  </p>
                  <div className="flex flex-col justify-start items-start">
                    <p className="text-text-gray text-xs">
                      {item.experience_years} Years Experience
                    </p>
                    {/* <div className="border-l border-1 border-border h-full"></div> */}
                    <p className="text-text-gray text-xs">
                      {item.property_count} Properties
                    </p>
                  </div>
                  <p
                    className={`mt-2 rounded-[2px]  text-white text-[10px] w-fit px-2 py-0.5`}
                    style={{ background: "#FFC107" }}
                  >
                    Contact Us
                  </p>
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}
