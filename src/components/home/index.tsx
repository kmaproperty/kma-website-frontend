"use client";
import BannerSlider from "./bannerSlider";
import MainHome from "./home";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  AboutusResponse,
  ChannelPartner,
  getAboutUsDataAPiHanlder,
  getChannelPartnerListApiHandler,
  getExploreApiHanlder,
  GetChannelPartnerListPayload,
  GetChannelPartnerListResponse,
  GetExplorePayload,
  GetExploreResponse,
  getTopProperties,
  GetTopPropertiesPayload,
  GetTopPropertiesResponse,
} from "@/services/homeService";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedCity, setAboutusData } from "@/store/homeHeaderSlice";
import HeaderDataSync from "../header/HeaderDataSync";
import { useHeaderStore } from "@/store/useHeaderStore";

const LazyNeedSection = dynamic(() => import("./needSection"), { loading: () => <div className="min-h-[200px]" /> });
const LazyRealEstateSection = dynamic(() => import("./realEstetSection"), { loading: () => <div className="min-h-[200px]" /> });
const LazyAboutUsSection = dynamic(() => import("./aboutUsSection"), { loading: () => <div className="min-h-[200px]" /> });
const LazyExploreSection = dynamic(() => import("./exploreSection"), { loading: () => <div className="min-h-[200px]" /> });
const LazyFeaturedProperties = dynamic(() => import("./featureProperties"), { loading: () => <div className="min-h-[200px]" /> });
const LazySuccessStoriesSection = dynamic(() => import("./successStoriesSection"), { loading: () => <div className="min-h-[200px]" /> });
const LazyWorkingSection = dynamic(() => import("./workingSection"), { loading: () => <div className="min-h-[200px]" /> });
const LazyChannelPartnerSection = dynamic(() => import("./channelPartnerSection"), { loading: () => <div className="min-h-[200px]" /> });
const LazyAppDownloadSection = dynamic(() => import("./appDownloadSection"), { loading: () => <div className="min-h-[200px]" /> });
const LazyBlogSection = dynamic(() => import("./blogSection"), { loading: () => <div className="min-h-[200px]" /> });
const LazyHomeFooter = dynamic(() => import("../footer/homeFooter"), { loading: () => <div className="min-h-[200px]" /> });

export default function Home({ propertyMasterData, propertyCitiesData }) {
  const dispatch = useDispatch();
  const selectedCity = useSelector(getSelectedCity);
  const { fetchCities } = useHeaderStore();

  const {
    mutate: fetchAboutusData
  } = useMutation({
    mutationFn: getAboutUsDataAPiHanlder,
    onSuccess: (response: AboutusResponse) => {
      dispatch(setAboutusData(response?.configuration))
    },
    onError: () => {}
  });

  const { data: explorePropertyList } = useQuery({
    queryKey: ["explore-list", selectedCity?.id ?? null],
    queryFn: () => {
      const payload: GetExplorePayload = {
        ...(selectedCity?.id ? { cityId: selectedCity.id } : {}),
      };
      return getExploreApiHanlder(payload);
    },
    select: (response: GetExploreResponse) => {
      return response.propertyTypes;
    },
    enabled: Boolean(selectedCity?.id),
    // staleTime: 60_000,
  }); 

  

  const { data } = useQuery({
    queryKey: ["top-properties-list", selectedCity?.id ?? null],
    queryFn: () => {
      const payload: GetTopPropertiesPayload = {
        cityId: selectedCity?.id ?? null
      };
      return getTopProperties(payload);
    },
    select: (response: GetTopPropertiesResponse) => {
      return response;
    },
    enabled: Boolean(selectedCity?.id),
    staleTime: 60_000,
  });

  const { data: channelPartnerList = [] } = useQuery<
    GetChannelPartnerListResponse,
    unknown,
    ChannelPartner[]
  >({
    queryKey: ["channel-partner", selectedCity?.name ?? ""],
    queryFn: () => {
      const payload: GetChannelPartnerListPayload = {
        city: selectedCity?.name ?? "",
        experience: "",
        limit: "8",
        page: "1",
        search: "",
      };
      return getChannelPartnerListApiHandler(payload);
    },
    select: (response: GetChannelPartnerListResponse) => response?.data ?? [],
    enabled: Boolean(selectedCity?.name),
    // Keep the list stable to avoid UI flicker/refresh feel on remount/refetch.
    // placeholderData: keepPreviousData,
    // staleTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });



  useEffect(() => {
    fetchAboutusData();
  }, [dispatch, fetchAboutusData]);

  useEffect(() => {
    if (!propertyCitiesData) {
      fetchCities({});
    }
  }, [propertyCitiesData, fetchCities]);

  const imageSlider = useMemo(
    () => [
      {
        imagePath: "/assets/backgroundSlider/background_slider_1.jpg",
        alt: "Background Image 1",
      },
      {
        imagePath: "/assets/backgroundSlider/background_slider_2.png",
        alt: "Background Image 2",
      },
    ],
    []
  );

  return (
    <div className="overflow-hidden">
      <HeaderDataSync propertyMasterData={propertyMasterData} propertyCitiesData={propertyCitiesData} />
      <div className="relative ">
        <BannerSlider bannerHeight={'min-h-[700px] 2md:min-h-auto 2md:h-[90vh]'} backgroundImages={imageSlider} overlayClass='gradient-overlay' />
        <MainHome topProperties={data?.properties ?? []} />
      </div>
      <div className="my-16 flex justify-center overflow-hidden">
        <div className="w-[90%] md:w-[75%]">
          <LazyNeedSection />
        </div>
      </div>
      <div className="bg-[#F2F2F2] flex justify-center overflow-hidden">
        <div className="my-16 w-[90%] md:w-[75%]">
          <LazyRealEstateSection />
        </div>
      </div>
      <div className="relative bg-text-black flex justify-center overflow-hidden">
        <LazyAboutUsSection />
      </div>
      {(Array.isArray(explorePropertyList) && explorePropertyList.length > 0 && typeof explorePropertyList[0] !== "undefined") && (
        <div className="my-16 flex justify-center">
          <div className="w-[90%] md:w-[75%]">
            <LazyExploreSection explorePropertyList={explorePropertyList} />
          </div>
        </div>
      )}
      {Array.isArray(data?.properties) && data?.properties.length > 0 && <div className="bg-[#F2F2F2] flex justify-center">
        <div className="my-16 w-[90%] md:w-[75%]">
          <LazyFeaturedProperties topProperties={data?.properties ?? []} />
        </div>
      </div>}

      <div className="relative bg-[#F2F2F2] flex justify-center overflow-hidden">
        <LazySuccessStoriesSection />
      </div>

      <div className="relative bg-text-black flex justify-center overflow-hidden">
        <LazyWorkingSection />
      </div>
      {Array.isArray(channelPartnerList) && channelPartnerList.length > 0 && (
        <div className="bg-[#F2F2F2] flex justify-center overflow-hidden">
          <div className="my-16 w-[90%] 2md:w-[75%]">
            <LazyChannelPartnerSection channelPartnerList={channelPartnerList} />
          </div>
        </div>
      )}
      <div className="">
        <LazyAppDownloadSection />
      </div>
      <div className="flex justify-center overflow-hidden">
        <div className="my-16 w-[90%] 2md:w-[75%]">
          <LazyBlogSection />
        </div>
      </div>
      <div className="">
        <LazyHomeFooter />
      </div>
    </div>
  );
}
