'use client'
import { Variants, motion } from "framer-motion";
import { useState } from "react";
import Social from "./social";
import HomdeHeader from "../header/homeHeader";
import BannerText from "./bannertext";
import TopProperties from "./topProperties";
import Filter from "./filter";
import ContactUs from "./contactus";
import UserRating from "../common/home/rating";
import { useQuery } from "@tanstack/react-query";
import { getUserReviewApiHandler, GetUserReviewApiHandlerResponse } from "@/services/homeService";
import ContactInformation from "../contactInformation";

export default function MainHome({cityData,selectedCity, setSelectedCity, cityLoader, fetchCities, propertyMasterData}) {
    const profileBaseUrl = process.env.NEXT_PUBLIC_AWS_URL;
  const [show, setShow] = useState(false);

  const dissolve: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  const { data: reviewData } = useQuery({
    queryKey: ["review"],
    queryFn: () => {
      return getUserReviewApiHandler();
    },
    select: (response: GetUserReviewApiHandlerResponse) => {
      console.log("response", response);
      return response;
    },
  });

   const profileImages = () => {
    if(reviewData?.reviews?.length > 0){
        return reviewData?.reviews?.map(item => ({img: item?.endUser?.profileImage ? profileBaseUrl + item?.endUser?.profileImage : '', name: item?.name}))
    }else{
      return []
    }
   }
  return (
    <>
    <motion.div
      className="absolute w-[100%] h-[88vh] top-0"
      variants={dissolve}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      onMouseMove={() => setShow(true)}
    >
      <div>
        <Social />
      </div>
      <div className="flex flex-col items-center">
        <HomdeHeader selectedCity={selectedCity} setSelectedCity={setSelectedCity} cityData={cityData} cityLoader={cityLoader} fetchCities={fetchCities} propertyMasterData={propertyMasterData}/>
       

        <div className="w-[75%] mt-[45px] flex justify-between gap-5 overflow-scroll no-scrollbar">
          <div className="w-[100%] lg:w-[50%]">
            <BannerText />
          </div>
          <div className="w-[100%] lg:w-[40%]">
            <TopProperties />
            {/* <ProfileRating /> */}
            <UserRating avatars={profileImages()} rating={reviewData?.statistics?.averageRating} subtitle={reviewData?.trustedByText}/>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[75%] lg:w-[55%]">
          <Filter propertyMasterData={propertyMasterData}/>
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
