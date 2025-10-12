'use client'

import CopyRightFooter from "../footer/copyrightFooter";
export default function MainLayout({ children }:{children:React.ReactNode}) {
  return (
    <div className="">
      <div className="relative w-full min-h-[calc(100dvh-7dvh)] bg-background-gray">
        <div className="absolute w-full h-[450px] bg-blue rounded-b-[25px] sm:rounded-b-[60px] lg:rounded-b-[80px] xl:rounded-b-[100px]">
          {/* <div className="hidden sm:block w-[47%] ml-[8rem] mt-[14rem] ">
            <InfoSection/>
          </div> */}
        </div>
        <div className="flex justify-center pt-[8rem] pb-[2rem]  relative z-1 w-full">
          <div className="w-[85%] xl:w-[85%] min-h-[71dvh] flex">
            {children}
          </div>    
        </div>
      </div>
      <CopyRightFooter />
    </div>
  );
}
