"use client";

import { Suspense } from "react";
import HomeHeader from "../header/homeHeader";

export default function BuyerMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="relative w-full min-h-[calc(100dvh-10dvh)] md:min-h-[calc(100dvh-7dvh)] bg-list-background">
        <div className="sticky top-0 z-50 w-full flex justify-center">
          <Suspense fallback={null}>
            <HomeHeader />
          </Suspense>
        </div>
        <div className="absolute top-0 left-0 w-full h-[450px] bg-blue rounded-b-[25px] sm:rounded-b-[60px] lg:rounded-b-[80px] xl:rounded-b-[100px]">
        </div>
        <div className="flex justify-center pt-[8rem] pb-[2rem]  relative z-1 w-full">
          <div className="w-full max-w-[1440px] min-h-[66dvh] flex">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
