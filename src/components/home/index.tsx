"use client";
import AboutUsSection from "./aboutUsSection";
import BannerSlider from "./bannerSlider";
import NeedSection from "./needSection";
import RealEstateSection from "./realEstetSection";
import ExploreSection from "./exploreSection";
import BlogSection from "./blogSection";
import FeaturedProperties from "./featureProperties";
import SuccessStoriesSection from "./successStoriesSection";
import WorkingSection from "./workingSection";
import ChannelPartnerSection from "./channelPartnerSection";
import AppDownloadSection from "./appDownloadSection";
import HomeFooter from "../footer/homeFooter";
import MainHome from "./home";
import { useMutation } from "@tanstack/react-query";
import { CitiesPayload, CitiesResponse, getCityListApiHandler } from "@/services/homeService";
import { useEffect, useState } from "react";

export default function Home({ propertyMasterData }) {
  const [selectedCity, setSelectedCity] = useState(null)
  const [cityData, setCityData] = useState(null)

  const {
    mutate: fetchCities, isPending: cityLoader
  } = useMutation({
    mutationFn: getCityListApiHandler,
    onSuccess: (response: CitiesResponse) => {
      setCityData(response)
    },
    onError: (error) => {

    }
  });

  useEffect(() => {
    fetchCities({})
  },[])

  return (
    <div className="overflow-hidden">
      <div className="relative ">
        <BannerSlider />
        <MainHome selectedCity={selectedCity} setSelectedCity={setSelectedCity} fetchCities={fetchCities} cityLoader={cityLoader} cityData={cityData} propertyMasterData={propertyMasterData} />
      </div>
      <div className="my-16 flex justify-center overflow-hidden">
        <div className="w-[90%] md:w-[75%]">
          <NeedSection />
        </div>
      </div>
      <div className="bg-[#F2F2F2] flex justify-center overflow-hidden">
        <div className="my-16 w-[90%] md:w-[75%]">
          <RealEstateSection />
        </div>
      </div>
      <div className="relative bg-text-black flex justify-center overflow-hidden">
        <AboutUsSection />
      </div>
      <div className="my-16 flex justify-center">
        <div className="w-[90%] md:w-[75%]">
          <ExploreSection />
        </div>
      </div>
      <div className="bg-[#F2F2F2] flex justify-center">
        <div className="my-16 w-[90%] md:w-[75%]">
          <FeaturedProperties />
        </div>
      </div>
      <div className="relative bg-text-black flex justify-center overflow-hidden">
        <WorkingSection />
      </div>
      <div className="relative bg-[#F2F2F2] flex justify-center overflow-hidden">
        <SuccessStoriesSection />
      </div>
      <div className="flex justify-center overflow-hidden">
        <div className="my-16 w-[90%] 2md:w-[75%]">
          <BlogSection />
        </div>
      </div>
      <div className="bg-[#F2F2F2] flex justify-center overflow-hidden">
        <div className="my-16 w-[90%] 2md:w-[75%]">
          <ChannelPartnerSection selectedCity={selectedCity}/>
        </div>
      </div>
      <div className="">
        <AppDownloadSection />
      </div>
      <div className="">
        <HomeFooter />
      </div>
    </div>
  );
}
