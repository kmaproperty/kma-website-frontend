"use client";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Social from "./social";
import HomeHeader from "../header/homeHeader";
import BannerText from "./bannertext";
import TopProperties from "./topProperties";
import Filter from "./filter";
import ContactUs from "./contactus";
import UserRating from "../common/home/rating";
import { useQuery } from "@tanstack/react-query";
import { getUserReviewApiHandler, GetUserReviewApiHandlerResponse, Rating } from "@/services/homeService";
import ContactInformation from "../contactInformation";

type MainHomeProps = {
  topProperties: unknown[];
  cityData: unknown;
  cityLoader: boolean;
  fetchCities: (payload: unknown) => void;
  propertyMasterData: unknown;
};

const dissolve: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

export default function MainHome({
  topProperties,
  cityData,
  cityLoader,
  fetchCities,
  propertyMasterData,
}: MainHomeProps) {
  const profileBaseUrl = process.env.NEXT_PUBLIC_AWS_URL ?? "";
  const [show, setShow] = useState(false);

  const { data: reviewData } = useQuery<GetUserReviewApiHandlerResponse>({
    queryKey: ["review"],
    queryFn: () => getUserReviewApiHandler(),
    staleTime: 60_000,
  });

  const avatars = useMemo(() => {
    const reviews: Rating[] = reviewData?.reviews ?? [];
    if (!Array.isArray(reviews) || reviews.length === 0) return [];
    return reviews.map((item) => ({
      img: item.endUser?.profileImage ? `${profileBaseUrl}${item.endUser.profileImage}` : "",
      name: item.name ?? "",
    }));
  }, [profileBaseUrl, reviewData]);

  return (
    <>
    <div className="fixed -top-[25px] left-0 right-0 z-[60] flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-full flex justify-center">
        <HomeHeader
          cityData={cityData}
          cityLoader={cityLoader}
          fetchCities={fetchCities}
          propertyMasterData={propertyMasterData}
        />
      </div>
    </div>
    <motion.div
      className="absolute w-[100%] h-[88vh] top-0"
      variants={dissolve}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      onMouseEnter={() => setShow(true)}
      onTouchStart={() => setShow(true)}
    >
      <div>
        <Social/>
      </div>
      <div className="flex flex-col items-center pt-[85px]">
        <div className="w-[75%] mt-[45px] flex justify-between gap-5 overflow-x-auto no-scrollbar">
          <div className="w-[100%] lg:w-[50%]">
            <BannerText />
          </div>
          <div className="w-[100%] lg:w-[40%]">
            {Array.isArray(topProperties) && topProperties.length > 0 && <TopProperties topProperties={topProperties}/>}
            <UserRating avatars={avatars} rating={reviewData?.statistics?.averageRating} subtitle={reviewData?.trustedByText}/>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[75%] lg:w-[55%]">
          <Filter cityData={cityData} propertyMasterData={propertyMasterData}/>
        </div>
      </div>
      <div>
        <ContactUs />
      </div>
    </motion.div>
    <ContactInformation isEndUser={true}/>
    </>
  );
}
