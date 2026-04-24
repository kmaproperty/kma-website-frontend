"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import UserHeader from "../header/userHeader";
import HomeHeader from "../header/homeHeader";

/** All project browse + detail + nested routes (listing, gallery, reviews, …). */
function isProjectsSectionPath(pathname: string) {
  return pathname === "/projects" || pathname.startsWith("/projects/");
}

function MainLayoutHeaderSwitcher() {
  const pathname = usePathname();
  const useHomeHeader =
    pathname === "/recently-viewed" || isProjectsSectionPath(pathname);
  if (useHomeHeader) {
    return <HomeHeader />;
  }
  return <UserHeader />;
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="relative w-full min-h-[calc(100dvh-10dvh)] md:min-h-[calc(100dvh-7dvh)] md:bg-background-gray bg-white">
        <div className="fixed -top-[25px] left-0 right-0 z-[60] flex justify-center pointer-events-none">
          <div className="pointer-events-auto w-full flex justify-center 2md:pt-6">
            <Suspense fallback={<UserHeader />}>
              <MainLayoutHeaderSwitcher />
            </Suspense>
          </div>
        </div>
        <div className="absolute w-full h-20 bg-blue rounded-b-[25px] sm:rounded-b-[40px] 2md:rounded-b-[60px] 2md:h-[450px] md:h-[350px] lg:rounded-b-[80px] xl:rounded-b-[100px]">
          
        </div>
        <div className="relative z-[1] flex w-full justify-center md:px-4 pb-8 2md:pt-[10rem] md:pt-[8rem] pt-16">
          <div className="flex min-h-[66dvh] w-full min-w-0 max-w-[1440px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
