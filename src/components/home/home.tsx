"use client";
import { useMemo } from "react";
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
};

export default function MainHome({ topProperties }: MainHomeProps) {
  const profileBaseUrl = process.env.NEXT_PUBLIC_AWS_URL ?? "";

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
        <HomeHeader />
      </div>
    </div>
    <div className="absolute w-[100%] h-[88vh] top-0">
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
          <Filter />
        </div>
      </div>
      <div>
        <ContactUs />
      </div>
    </div>
    <ContactInformation isEndUser={true}/>
    </>
  );
}
