import Image from "next/image";
import HomdeHeader from "../header/homeHeader";
import AboutUsSection from "./aboutUsSection";
import BannerSlider from "./bannerSlider";
import BannerText from "./bannertext";
import ContactUs from "./contactus";
import Filter from "./filter";
import NeedSection from "./needSection";
import ProfileRating from "./rating";
import RealEstateSection from "./realEstetSection";
import Social from "./social";
import TopProperties from "./topProperties";
import ExploreSection from "./exploreSection";
import BlogSection from "./blogSection";
import FeaturedProperties from "./featureProperties";
import SuccessStoriesSection from "./successStoriesSection";
import WorkingSection from "./workingSection";
import ChannelPartnerSection from "./channelPartnerSection";
import AppDownloadSection from "./appDownloadSection";

export default function Home() {
  return (
    <div>
      <div className="relative ">
        <BannerSlider />

        <div className="absolute w-[100%] h-[88vh] top-0">
          <div>
            <Social />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-[75%] mt-[25px]">
              <HomdeHeader />
            </div>

            <div className="w-[75%] mt-[45px] flex justify-between gap-5">
              <div className="w-[50%]">
                <BannerText />
              </div>
              <div className="w-[40%]">
                <TopProperties />
                <ProfileRating />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <div className="w-[55%]">
              <Filter />
            </div>
          </div>
          <div>
            <ContactUs />
          </div>
        </div>
      </div>
      <div className="my-13 flex justify-center">
        <div className="w-[75%]">
          <NeedSection />
        </div>
      </div>
      <div className="bg-[#F2F2F2] flex justify-center">
        <div className="my-13 w-[75%]">
          <RealEstateSection />
        </div>
      </div>
      <div className="relative bg-text-black flex justify-center">
        <div className="my-13 w-[75%] z-10">
          <AboutUsSection />
        </div>
        <div className="absolute -left-10 bottom-0 z-0">
          <Image
            alt="background"
            src="/assets/aboutUs/about_us_back.svg"
            width={400}
            height={400}
          />
        </div>
        <div className="absolute right-30 bottom-0 z-0">
          <Image
            alt="background"
            src="/assets/aboutUs/box-below.svg"
            width={300}
            height={300}
          />
        </div>
        <div className="absolute right-10 top-0 z-0">
          <Image
            alt="background"
            src="/assets/aboutUs/box-up.svg"
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className="my-13 flex justify-center">
        <div className="w-[75%]">
          <ExploreSection />
        </div>
      </div>
      <div className="bg-[#F2F2F2] flex justify-center">
        <div className="my-13 w-[75%]">
          <FeaturedProperties />
        </div>
      </div>
      <div className="relative bg-text-black flex justify-center">
        <div className="my-13 w-[75%] z-10">
          <WorkingSection />
        </div>
        <div className="absolute -right-0 bottom-0 z-0">
          <Image
            alt="background"
            src="/assets/working/back.svg"
            width={300}
            height={300}
          />
        </div>
        <div className="absolute left-20 top-0 z-0">
          <Image
            alt="background"
            src="/assets/working/top-arrow.svg"
            width={300}
            height={300}
          />
        </div>
        <div className="absolute left-20 bottom-0 z-0">
          <Image
            alt="background"
            src="/assets/working/bottom-arrow.svg"
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className="relative bg-[#F2F2F2] flex justify-center">
        <div className="my-13 w-[75%] z-10">
          <SuccessStoriesSection />
        </div>
        <div className="absolute bottom-0 left-0">
          <Image
            src={"/assets/stories/building.svg"}
            width={200}
            height={200}
            alt="building"
          />
        </div>
        <div className="absolute top-0 right-10">
          <Image
            src={"/assets/stories/top-square.svg"}
            width={200}
            height={200}
            alt="building"
          />
        </div>
        <div className="absolute right-0 bottom-2">
          <Image
            src={"/assets/stories/bottom-square.svg"}
            width={140}
            height={100}
            alt="building"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="my-13 w-[75%]">
          <BlogSection />
        </div>
      </div>
      <div className="bg-[#F2F2F2] flex justify-center">
        <div className="my-13 w-[75%]">
          <ChannelPartnerSection />
        </div>
      </div>
      <div className="">
        <div className="app-background">
          <div className="z-2 h-full relative py-13 flex justify-center w-full">
            <div className="w-[75%] relative h-full flex flex-col gap-20">
              <div className="flex w-[40%] h-full gap-20 flex-col justify-between items-start">
                <div>
                  <div className="bg-gray-400 h-0.5 w-8 mb-2">
                    <div className="w-1/2 h-0.5 bg-white" />
                  </div>
                  <h2 className="text-2xl text-white font-semibold">
                    Get the Power of Real Estate in Your Pocket
                  </h2>
                  <h3 className="text-text-gray text-xs">
                    Browse properties, connect with agents, and manage your
                    deals — all from your phone. Anytime. Anywhere.
                  </h3>
                </div>
              </div>
              <div className="flex justify-between items-center gap-4">
                <div className="flex gap-4">
                  <div className="flex">
                    <p className="text-white text-sm w-[70px]">
                      Scan to Downlaod
                    </p>
                    <div className="mt-8">
                      <Image
                        src={"/assets/app/arrow.svg"}
                        width={100}
                        height={100}
                        alt="arrow"
                      />
                    </div>
                  </div>
                  <div>
                    <Image
                      src={"/assets/app/qrcode.svg"}
                      width={100}
                      height={100}
                      alt="qrcode"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute right-0 top-13 h-[400px]">
                  <Image
                    src={"/assets/app/mobile.svg"}
                    width={800}
                    height={500}
                    alt="mobile"
                    className="w-fit h-[400px]"
                  />
                </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-5">
          <AppDownloadSection />
        </div>
      </div>
    </div>
  );
}
