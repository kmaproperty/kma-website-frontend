"use client";

import HomdeHeader from "@/components/header/homeHeader";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import CareersBanner from "@/components/careers/CareersBanner";

export default function CareersDetailPageClient() {
  return (
    <div className="min-w-0">
      <div className="pointer-events-none fixed left-0 right-0 z-[60] flex justify-center">
        <div className="pointer-events-auto flex w-full justify-center">
          <HomdeHeader />
        </div>
      </div>

      <CareersBanner
        title="Senior Frontend Developer"
        description="Explore full role details, responsibilities, and application process for this position."
        backgroundImage="/assets/app/help-center-herobg.jpg"
      />

      <section className="bg-white px-4 py-10 sm:px-6 md:px-8 md:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-[90rem] rounded-2xl border border-[#E4E4E4] bg-white p-6 text-[#888888] shadow-sm md:p-8">
          Job details section is ready for next design step.
        </div>
      </section>

      <div className="flex justify-center bg-text-black">
        <AboutusDataSync />
        <HomeFooter tab={1} />
      </div>
    </div>
  );
}

