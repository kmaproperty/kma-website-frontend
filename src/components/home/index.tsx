"use client";
import Image from "next/image";
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

export default function Home() {
  return (
    <div className="overflow-hidden">
      <div className="relative ">
        <BannerSlider />
        <MainHome />
      </div>
      <div className="my-16 flex justify-center overflow-hidden">
        <div className="w-[75%]">
          <NeedSection />
        </div>
      </div>
      <div className="bg-[#F2F2F2] flex justify-center overflow-hidden">
        <div className="my-16 w-[75%]">
          <RealEstateSection />
        </div>
      </div>
      <div className="relative bg-text-black flex justify-center overflow-hidden">
          <AboutUsSection />
      </div>
      <div className="my-16 flex justify-center">
        <div className="w-[75%]">
          <ExploreSection />
        </div>
      </div>
      <div className="bg-[#F2F2F2] flex justify-center">
        <div className="my-16 w-[75%]">
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
        <div className="my-16 w-[75%]">
          <BlogSection />
        </div>
      </div>
      <div className="bg-[#F2F2F2] flex justify-center overflow-hidden">
        <div className="my-16 w-[75%]">
          <ChannelPartnerSection />
        </div>
      </div>
      <div className="">
        <div className="app-background">
          <div className="z-2 h-full relative py-16 flex justify-center w-full">
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
        <div className="flex justify-center mb-16">
          <AppDownloadSection />
        </div>
      </div>
      <div className="">
        <div className="bg-[#121D2B] h-[40px] w-full flex justify-center">
          <div className="w-[75%] flex justify-between items-center">
            <div className="flex border-b-2 border-white w-full justify-center items-center text-center h-full">
              <p className="text-white text-sm">Tab List 1</p>
            </div>
            <div className="flex w-full justify-center items-center text-center h-full">
              <p className="text-white text-sm">Tab List 1</p>
            </div>
          </div>
        </div>
        <div className="bg-text-black flex justify-center">
          <div className="my-10 w-[75%]">
            <HomeFooter tab={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
