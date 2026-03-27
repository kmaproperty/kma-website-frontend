'use client'

import HomeHeader from "../header/homeHeader";

export default function MainLayout({ children }:{children:React.ReactNode}) {
  return (
    <div className="">
      <div className="relative w-full min-h-[calc(100dvh-10dvh)] md:min-h-[calc(100dvh-7dvh)] bg-background-gray">
        <HomeHeader/>
        <div className="absolute top-0 w-full h-[450px] bg-blue rounded-b-[25px] sm:rounded-b-[60px] lg:rounded-b-[80px] xl:rounded-b-[100px]">
        </div>
        <div className="flex justify-center pt-[4rem] pb-[2rem] relative z-1 w-full">
          <div className="w-[80%] xl:w-[80%] min-h-[66dvh] flex">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
