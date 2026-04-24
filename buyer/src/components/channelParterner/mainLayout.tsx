'use client'

import ContactInformation from "../contactInformation";
import CopyRightFooter from "../footer/copyrightFooter";
import HomeHeader from "../header/homeHeader";
import PostPropertyFlowHeader from "../header/postPropertyFlowHeader";
import { useSearchParams } from "next/navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isPostPropertyFlow = searchParams.get("postProperty") === "true";

  return (
    <div>
      <div className="relative w-full min-h-[calc(100dvh-10dvh)] md:min-h-[calc(100dvh-7dvh)] bg-list-background overflow-hidden">
        <div className="absolute w-full flex justify-center top-0 z-10">
          {isPostPropertyFlow ? <PostPropertyFlowHeader /> : <HomeHeader />}
        </div>
        <div className="absolute top-0 left-0 w-full 2md:h-[450px] h-40 bg-blue rounded-b-[25px] sm:rounded-b-[60px] lg:rounded-b-[80px] xl:rounded-b-[100px]" />

        <div className="relative z-[1] flex w-full justify-center px-4 pb-8 pt-[6rem] sm:px-6 md:pt-[8.5rem] lg:px-8">
          <div className="flex min-h-[66dvh] w-full min-w-0 max-w-[1200px] xl:w-[75%] xl:max-w-[1320px]">
            {children}
          </div>
        </div>
      </div>
      <CopyRightFooter />
      <ContactInformation />
    </div>
  );
}
