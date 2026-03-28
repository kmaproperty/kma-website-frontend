'use client'

import UserHeader from "../header/userHeader";


export default function MainLayout({ children }:{children:React.ReactNode}) {
  return (
    <div className="">
      <div className="relative w-full min-h-[calc(100dvh-10dvh)] md:min-h-[calc(100dvh-7dvh)] bg-background-gray">
        <div className="absolute w-full flex justify-center w-full 2md:top-6">
        <UserHeader/>
        </div>
        <div className="absolute w-full h-[450px] bg-blue rounded-b-[25px] sm:rounded-b-[60px] lg:rounded-b-[80px] xl:rounded-b-[100px]">
          
        </div>
        <div className="flex justify-center pt-[10rem] pb-[2rem]  relative z-1 w-full">
          <div className="w-[80%] xl:w-[80%] min-h-[66dvh] flex">
            {children}
          </div>    
        </div>
      </div>
    </div>
  );
}
