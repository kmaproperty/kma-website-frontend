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
      <div className="pointer-events-auto w-full flex justify-center pt-6">
        <HomeHeader />
      </div>
    </div>
    <div className="absolute w-[100%] h-[88vh] top-0">
      <div>
        <Social/>
      </div>
      <div className="flex flex-col items-center pt-[85px] text-center md:text-left">
        <div className="w-[90%] md:w-[75%] mt-[45px] flex flex-col md:flex-row md:justify-between gap-5 overflow-x-auto no-scrollbar">
          <div className="w-[100%] lg:w-[50%]">
            <BannerText />
          </div>
          <div className="w-[100%] lg:w-[40%]">
            {Array.isArray(topProperties) && topProperties.length > 0 && <TopProperties topProperties={topProperties}/>}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[85%] lg:w-[55%]">
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
