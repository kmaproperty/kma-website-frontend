"use client";

import HomdeHeader from "@/components/header/homeHeader";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import CareersBanner from "@/components/careers/CareersBanner";
import JobDetailContent from "@/components/careers/JobDetailContent";

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

      <JobDetailContent />

      <div className="flex justify-center bg-text-black">
        <AboutusDataSync />
        <HomeFooter tab={1} />
      </div>
    </div>
  );
}

