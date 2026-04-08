"use client";

import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HomeFooter from "@/components/footer/homeFooter";
import HomeHeader from "@/components/header/homeHeader";
import SuccessStoriesSection from "@/components/home/successStoriesSection";

export default function SuccessStoriesPage() {
  return (
    <>
      <div className="min-h-screen bg-[#F2F2F2]">
        <div className="relative h-[180px] bg-blue">
          <div className="absolute left-0 right-0 top-6 flex justify-center">
            <HomeHeader />
          </div>
          <div className="absolute w-full h-[550px] bg-blue rounded-b-[55px]">

          </div>

        </div>

        <div className="relative flex justify-center overflow-hidden pb-16">
          <SuccessStoriesSection />
        </div>
      </div>

      <AboutusDataSync />
      <HomeFooter />
    </>
  );
}