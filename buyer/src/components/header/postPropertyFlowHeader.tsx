"use client";

import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";

export default function PostPropertyFlowHeader() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 w-full flex justify-center pt-[25px] px-4">
      <div className="w-full mx-auto max-w-[1440px]">
        <div className="rounded-[200px] h-[50px] 2md:h-[63px] px-4 lg:px-7 pt-[4px] flex justify-between items-center border border-[#FFFFFF33] bg-white/10 bg-clip-padding backdrop-filter backdrop-blur-[20px]">
          <div
            onClick={() => router.push("/")}
            className="flex items-center px-1.5 shrink-0 cursor-pointer"
          >
            <Image
              src="/assets/kma-logo-white.svg"
              width={100}
              height={35}
              alt="logo"
              className="w-[80px] h-[33px] 2md:w-[100px] 2md:h-[38px]"
            />
          </div>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-100 text-xs sm:text-sm cursor-pointer px-2 py-1 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            <Image src="/assets/home-white.svg" width={14} height={14} alt="home" />
            <span>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}
