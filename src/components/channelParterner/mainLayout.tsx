'use client'

import ContactInformation from "../contactInformation";
import CopyRightFooter from "../footer/copyrightFooter";
import HomeHeader from "../header/homeHeader";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="relative w-full min-h-[calc(100dvh-10dvh)] md:min-h-[calc(100dvh-7dvh)] bg-background-gray overflow-hidden">
        <div className="absolute w-full flex justify-center top-0 z-10">
          <HomeHeader />
        </div>
        <div className="absolute w-full h-[450px] bg-blue rounded-b-[25px] sm:rounded-b-[60px] lg:rounded-b-[80px] xl:rounded-b-[100px]" />

        <div className="flex justify-center pt-[6rem] md:pt-[8.5rem] pb-[2rem] relative z-1 w-full">
          <div className="w-[90%] xl:w-[75%] min-h-[66dvh] flex">
            {children}
          </div>
        </div>
      </div>
      <CopyRightFooter />
      <ContactInformation />
    </div>
  );
}
