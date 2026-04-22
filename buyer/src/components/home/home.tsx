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
      <div className="flex 2md:flex-col flex-col-reverse relative w-[100%] top-0 2xl:py-[150px] 1xl:py-[120px] xl:py-[110px] lg:py-[90px] 2md:py-[80px] md:pt-[110px] sm:pt-[90px] pt-[80px] 2md:px-0 px-10 2md:mb-0 mb-32">
        <div>
          <Social />
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full sm:w-[75%] 2md:mt-[45px] mt-7 2md:mb-0 -mb-20 flex 2md:flex-row flex-col justify-between gap-5">
            <div className="2md:block hidden w-[100%] xl:w-[50%] lg:w-[58%]">
              <BannerText />
            </div>
            <div className="w-[100%] lg:w-[40%]">
              {Array.isArray(topProperties) && topProperties.length > 0 && <TopProperties topProperties={topProperties} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center 2md:mt-10">
          <div className="2md:hidden w-full sm:w-[75%] lg:w-[55%]">
            <BannerText />
          </div>
          <div className="w-full sm:w-[75%] lg:w-[55%]">
            <Filter />
          </div>
        </div>
        <div>
          <ContactUs />
        </div>
      </div>
      <ContactInformation isEndUser={true} />
    </>
  );
}
