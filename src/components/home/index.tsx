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
import { useMutation, useQuery } from "@tanstack/react-query";
import { AboutusResponse, CitiesResponse, getAboutUsDataAPiHanlder, getCityListApiHandler, getExploreApiHanlder, GetExplorePayload, GetExploreResponse, getTopProperties, GetTopPropertiesPayload, GetTopPropertiesResponse } from "@/services/homeService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAboutusData, getSelectedCity, setAboutusData, setSelectedCity } from "@/store/homeHeaderSlice";

export default function Home({ propertyMasterData, propertyCitiesData }) {
  const dispatch = useDispatch()
  const selectedCity = useSelector(getSelectedCity)
  const aboutusData = useSelector(getAboutusData)

  const [cityData, setCityData] = useState(null)

  const {
    mutate: fetchCities, isPending: cityLoader
  } = useMutation({
    mutationFn: getCityListApiHandler,
    onSuccess: (response: CitiesResponse) => {
      let findCity = response?.allCities?.find(item => item.name == 'Gurgaon')
      if(findCity){
        dispatch(setSelectedCity(findCity))
      }
      setCityData(response)
    },
    onError: (error) => {

    }
  });

  const {
    mutate: fetchAboutusData, isPending: aboutusLoader
  } = useMutation({
    mutationFn: getAboutUsDataAPiHanlder,
    onSuccess: (response: AboutusResponse) => {
      dispatch(setAboutusData(response?.configuration))
    },
    onError: (error) => {

    }
  });

  const { data: explorePropertyList } = useQuery({
    queryKey: ["explore-list", selectedCity],
    queryFn: () => {
      let payload: GetExplorePayload = {
        ...(selectedCity?.id ? {cityId: selectedCity?.id ?? null,} : {}),
        ...(false ? {cityId: ''} : {}),
        ...(false ? {cityId: '',} : {}),
      };
      return getExploreApiHanlder(payload);
    },
    select: (response: GetExploreResponse) => {
      console.log("response", response);
      return response.propertyTypes;
    },
  });

  const { data } = useQuery({
    queryKey: ["top-properties-list", selectedCity],
    queryFn: () => {
      let payload: GetTopPropertiesPayload = {
        cityId: selectedCity?.id ?? null
      };
      return getTopProperties(payload);
    },
    select: (response: GetTopPropertiesResponse) => {
      console.log("response", response);
      return response;
    },
    enabled: selectedCity ? true : false
  });

  useEffect(() => {
    fetchAboutusData()
    if(propertyCitiesData){
      let findCity = propertyCitiesData?.allCities?.find(item => item.name == 'Gurgaon')
      if(findCity){
        dispatch(setSelectedCity(findCity))
      }
      setCityData(propertyCitiesData)
    }else{
      fetchCities({})
    }
  },[])

  const imageSlider =  [
      {
        imagePath: "/assets/backgroundSlider/background_slider_1.jpg",
        alt: "Background Image 1",
      },
      {
        imagePath: "/assets/backgroundSlider/background_slider_2.png",
        alt: "Background Image 2",
      },
    ];

  return (
    <div className="overflow-hidden">
      <div className="relative ">
        <BannerSlider bannerHeight={'min-h-[700px] 2md:min-h-auto 2md:h-[90vh]'} backgroundImages={imageSlider} overlayClass='gradient-overlay'/>
        <MainHome topProperties={data?.properties ?? []} fetchCities={fetchCities} cityLoader={cityLoader} cityData={cityData} propertyMasterData={propertyMasterData} />
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
      {Array.isArray(explorePropertyList) && explorePropertyList.length > 0 && <div className="my-16 flex justify-center">
        <div className="w-[90%] md:w-[75%]">
          <ExploreSection explorePropertyList={explorePropertyList}/>
        </div>
      </div>}
      {Array.isArray(data?.properties) && data?.properties.length > 0 && <div className="bg-[#F2F2F2] flex justify-center">
        <div className="my-16 w-[90%] md:w-[75%]">
          <FeaturedProperties topProperties={data?.properties ?? []}/>
        </div>
      </div>}
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
          <ChannelPartnerSection/>
        </div>
      </div>
      {aboutusData?.mobileAppAvailable && <div className="">
        <AppDownloadSection />
      </div>}
      <div className="">
        <HomeFooter propertyMasterData={propertyMasterData}/>
      </div>
    </div>
  );
}
