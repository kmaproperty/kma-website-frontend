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
  getFeaturedProperties,
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
    onError: () => { }
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

  const { data: featuredData } = useQuery({
    queryKey: ["featured-properties-list", selectedCity?.id ?? null],
    queryFn: () => {
      const payload: GetTopPropertiesPayload = {
        cityId: selectedCity?.id ?? null
      };
      return getFeaturedProperties(payload);
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
      <div className="relative">
        <BannerSlider bannerHeight={'h-full min-h-full'} backgroundImages={imageSlider} overlayClass='gradient-overlay' />
        <MainHome topProperties={data?.properties ?? []} />

        <div className="md:hidden block fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-t-[18px] shadow-[0px_-8px_20px_0px_#00000026]">
          <div className="flex justify-between items-center py-3 px-6">

            <div className="flex-1 cursor-pointer flex flex-col items-center text-center">

              <svg className="w-[30px] h-[30px]" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.7925 10.318L18.0542 3.53409C17.3449 2.8996 16.4265 2.54883 15.4748 2.54883C14.5231 2.54883 13.6047 2.8996 12.8953 3.53409L5.15703 10.318C4.74737 10.6844 4.42047 11.1338 4.19809 11.6364C3.9757 12.139 3.86294 12.6832 3.86731 13.2328V24.5049C3.86731 25.5311 4.27495 26.5152 5.00056 27.2408C5.72617 27.9664 6.7103 28.3741 7.73647 28.3741H23.2131C24.2393 28.3741 25.2234 27.9664 25.949 27.2408C26.6746 26.5152 27.0823 25.5311 27.0823 24.5049V13.2199C27.0848 12.6725 26.9712 12.1308 26.7488 11.6305C26.5265 11.1303 26.2006 10.6829 25.7925 10.318ZM18.0542 25.7946H12.8953V19.346C12.8953 19.004 13.0312 18.6759 13.2731 18.4341C13.515 18.1922 13.843 18.0563 14.1851 18.0563H16.7645C17.1066 18.0563 17.4346 18.1922 17.6765 18.4341C17.9183 18.6759 18.0542 19.004 18.0542 19.346V25.7946ZM24.5028 24.5049C24.5028 24.847 24.3669 25.175 24.1251 25.4169C23.8832 25.6588 23.5552 25.7946 23.2131 25.7946H20.6337V19.346C20.6337 18.3199 20.226 17.3357 19.5004 16.6101C18.7748 15.8845 17.7907 15.4769 16.7645 15.4769H14.1851C13.1589 15.4769 12.1748 15.8845 11.4492 16.6101C10.7235 17.3357 10.3159 18.3199 10.3159 19.346V25.7946H7.73647C7.39441 25.7946 7.06637 25.6588 6.8245 25.4169C6.58263 25.175 6.44675 24.847 6.44675 24.5049V13.2199C6.44698 13.0368 6.48621 12.8558 6.56181 12.689C6.63742 12.5222 6.74768 12.3735 6.88525 12.2526L14.6236 5.48156C14.8589 5.2748 15.1615 5.16076 15.4748 5.16076C15.7881 5.16076 16.0906 5.2748 16.326 5.48156L24.0643 12.2526C24.2019 12.3735 24.3121 12.5222 24.3878 12.689C24.4634 12.8558 24.5026 13.0368 24.5028 13.2199V24.5049Z" fill="#010048" />
              </svg>

              <p className="block text-xs text-[#010048] mt-0.5 leading-none">Home</p>
            </div>


            <div className="flex-1 cursor-pointer flex flex-col items-center text-center">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.2503 26.2498L20.8215 20.821M20.8215 20.821C21.7501 19.8924 22.4867 18.79 22.9893 17.5767C23.4918 16.3634 23.7505 15.063 23.7505 13.7498C23.7505 12.4365 23.4919 11.1361 22.9893 9.92284C22.4867 8.70955 21.7501 7.60713 20.8215 6.67852C19.8929 5.74991 18.7905 5.0133 17.5772 4.51074C16.3639 4.00818 15.0635 3.74951 13.7503 3.74951C12.437 3.74951 11.1366 4.00818 9.92332 4.51074C8.71004 5.0133 7.60762 5.74991 6.67901 6.67852C4.8036 8.55393 3.75 11.0975 3.75 13.7498C3.75 16.402 4.8036 18.9456 6.67901 20.821C8.55442 22.6964 11.098 23.75 13.7503 23.75C16.4025 23.75 18.9461 22.6964 20.8215 20.821Z" stroke="#888888" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <p className="block text-xs text-[#888888] mt-0.5 leading-none">Search</p>
            </div>


            <div className="relative cursor-pointer flex-1 flex flex-col items-center text-center">

              <button className="bg-[#03017B] -mt-10 text-white w-[65px] h-[65px] rounded-full shadow-lg flex flex-col items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.6667 13.3333H13.3333V21.6667C13.3333 22.1087 13.1577 22.5326 12.8452 22.8452C12.5326 23.1577 12.1087 23.3333 11.6667 23.3333C11.2246 23.3333 10.8007 23.1577 10.4882 22.8452C10.1756 22.5326 10 22.1087 10 21.6667V13.3333H1.66667C1.22464 13.3333 0.800716 13.1577 0.488156 12.8452C0.175595 12.5326 0 12.1087 0 11.6667C0 11.2246 0.175595 10.8007 0.488156 10.4882C0.800716 10.1756 1.22464 10 1.66667 10H10V1.66667C10 1.22464 10.1756 0.800715 10.4882 0.488155C10.8007 0.175594 11.2246 0 11.6667 0C12.1087 0 12.5326 0.175594 12.8452 0.488155C13.1577 0.800715 13.3333 1.22464 13.3333 1.66667V10H21.6667C22.1087 10 22.5326 10.1756 22.8452 10.4882C23.1577 10.8007 23.3333 11.2246 23.3333 11.6667C23.3333 12.1087 23.1577 12.5326 22.8452 12.8452C22.5326 13.1577 22.1087 13.3333 21.6667 13.3333Z" fill="white" />
                </svg>
              </button>
              <p className="block text-xs text-[#606060] mt-1 leading-none">Sent/Rent</p>
            </div>


            <div className="flex-1 cursor-pointer flex flex-col items-center text-center">

              <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.9993 6.44887C24.6321 5.07816 22.8199 4.24156 20.8898 4.09019C18.9598 3.93881 17.0393 4.48264 15.4752 5.62345C13.8342 4.4029 11.7917 3.84945 9.75903 4.07454C7.72633 4.29963 5.85442 5.28654 4.52025 6.83654C3.18608 8.38653 2.48875 10.3845 2.56868 12.428C2.64862 14.4716 3.49988 16.4089 4.95105 17.85L12.9602 25.872C13.6309 26.5321 14.5342 26.902 15.4752 26.902C16.4162 26.902 17.3194 26.5321 17.9901 25.872L25.9993 17.85C27.5051 16.3349 28.3503 14.2856 28.3503 12.1494C28.3503 10.0133 27.5051 7.96394 25.9993 6.44887ZM24.1808 16.0702L16.1716 24.0793C16.0805 24.1714 15.972 24.2444 15.8525 24.2943C15.7329 24.3441 15.6047 24.3698 15.4752 24.3698C15.3456 24.3698 15.2174 24.3441 15.0979 24.2943C14.9783 24.2444 14.8699 24.1714 14.7787 24.0793L6.76956 16.0315C5.75811 14.9976 5.19173 13.6087 5.19173 12.1623C5.19173 10.7159 5.75811 9.32708 6.76956 8.29317C7.80024 7.27556 9.19033 6.70496 10.6387 6.70496C12.0871 6.70496 13.4772 7.27556 14.5079 8.29317C14.6278 8.41405 14.7704 8.51 14.9276 8.57547C15.0847 8.64095 15.2533 8.67466 15.4236 8.67466C15.5938 8.67466 15.7624 8.64095 15.9196 8.57547C16.0767 8.51 16.2194 8.41405 16.3393 8.29317C17.37 7.27556 18.76 6.70496 20.2084 6.70496C21.6568 6.70496 23.0469 7.27556 24.0776 8.29317C25.1029 9.31353 25.6879 10.6949 25.7072 12.1413C25.7265 13.5877 25.1786 14.9841 24.1808 16.0315V16.0702Z" fill="#888888" />
              </svg>
              <p className="block text-xs text-[#888888] mt-0.5 leading-none">Sent/Rent</p>
            </div>


            <div className="flex-1 cursor-pointer flex flex-col items-center text-center">

              <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.2597 16.3923C21.5241 15.3974 22.4471 14.0333 22.9001 12.4895C23.3531 10.9457 23.3137 9.29913 22.7873 7.77882C22.2609 6.2585 21.2738 4.94005 19.9632 4.00689C18.6526 3.07373 17.0837 2.57227 15.4749 2.57227C13.866 2.57227 12.2971 3.07373 10.9865 4.00689C9.67594 4.94005 8.68879 6.2585 8.16242 7.77882C7.63604 9.29913 7.59662 10.9457 8.04963 12.4895C8.50264 14.0333 9.42556 15.3974 10.69 16.3923C8.52336 17.2603 6.6329 18.7 5.22015 20.5579C3.8074 22.4159 2.92532 24.6223 2.66794 26.9422C2.64931 27.1115 2.66422 27.2829 2.71182 27.4465C2.75942 27.6101 2.83878 27.7627 2.94537 27.8957C3.16063 28.1642 3.47373 28.3361 3.81579 28.3737C4.15784 28.4114 4.50083 28.3116 4.76931 28.0963C5.03778 27.881 5.20975 27.5679 5.24738 27.2259C5.53058 24.7047 6.73273 22.3763 8.62414 20.6855C10.5156 18.9946 12.9636 18.0599 15.5006 18.0599C18.0377 18.0599 20.4857 18.9946 22.3771 20.6855C24.2686 22.3763 25.4707 24.7047 25.7539 27.2259C25.789 27.5428 25.9402 27.8355 26.1784 28.0475C26.4165 28.2594 26.7248 28.3757 27.0436 28.3737H27.1855C27.5236 28.3348 27.8326 28.1639 28.0452 27.8982C28.2578 27.6324 28.3567 27.2934 28.3205 26.9551C28.0619 24.6287 27.175 22.4165 25.755 20.5557C24.335 18.6949 22.4354 17.2557 20.2597 16.3923ZM15.4749 15.4766C14.4545 15.4766 13.4571 15.174 12.6087 14.6071C11.7604 14.0403 11.0991 13.2346 10.7087 12.2919C10.3182 11.3492 10.216 10.3119 10.4151 9.31122C10.6142 8.3105 11.1055 7.39127 11.827 6.66979C12.5485 5.94831 13.4677 5.45698 14.4684 5.25792C15.4691 5.05886 16.5064 5.16103 17.4491 5.55149C18.3917 5.94195 19.1974 6.60318 19.7643 7.45155C20.3312 8.29992 20.6337 9.29734 20.6337 10.3177C20.6337 11.6859 20.0902 12.9981 19.1227 13.9655C18.1553 14.933 16.8431 15.4766 15.4749 15.4766Z" fill="#888888" />
              </svg>

              <p className="block text-xs text-[#888888] mt-0.5 leading-none">Profile</p>
            </div>
          </div>
        </div>
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
      {Array.isArray(featuredData?.properties) && featuredData?.properties.length > 0 && <div className="bg-[#F2F2F2] flex justify-center">
        <div className="my-16 w-[90%] md:w-[75%]">
          <LazyFeaturedProperties topProperties={featuredData?.properties ?? []} />
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
      {/* <div className="">
        <LazyAppDownloadSection />
      </div> */}
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
