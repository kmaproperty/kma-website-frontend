"use client";
import Social from "./social";
import HomeHeader from "../header/homeHeader";
import BannerText from "./bannertext";
import TopProperties from "./topProperties";
import Filter from "./filter";
import ContactUs from "./contactus";
import ContactInformation from "../contactInformation";

type MainHomeProps = {
  topProperties: unknown[];
};

export default function MainHome({ topProperties }: MainHomeProps) {

  return (
    <>
    <div className="fixed -top-[25px] left-0 right-0 z-[60] flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-full flex justify-center">
        <HomeHeader />
      </div>
    </div>
    <div className="relative w-[100%] top-0 2xl:py-[150px] 1xl:py-[120px] xl:py-[110px] lg:py-[90px] 2md:py-[80px] md:py-[70px] sm:py-[60px] py-[50px] 2md:px-0 px-3">
      <div>
        <Social/>
      </div>
      <div className="flex flex-col items-center">
        <div className="2md:w-[75%] mt-[45px] flex justify-between gap-5 overflow-x-auto no-scrollbar">
          <div className="w-[100%] lg:w-[50%]">
            <BannerText />
          </div>
          <div className="w-[100%] lg:w-[40%]">
            {Array.isArray(topProperties) && topProperties.length > 0 && <TopProperties topProperties={topProperties}/>}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-full 2md:w-[75%] lg:w-[55%] border border-white 2md:border-transparent rounded-md px-5 py-8 2md:p-0 2md:backdrop-filter-none backdrop-blur-[13px] bg-white/50 2md:bg-transparent">
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
