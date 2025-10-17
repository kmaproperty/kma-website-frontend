'use client'
import Image from "next/image";
import ProfileMenu from "../common/profileMenu";
import { useEffect, useState } from "react";

export default function UserHeader() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

     useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);
  return (
    <>
      {/* DeskTop Header */}
      <div className="hidden 2md:flex w-[85%] h-[60px] rounded-[200px] bg-white/10 backdrop-blur-md backdrop-filter border border-white/10 items-center px-6 z-3">
        <div className="flex items-center px-5 shrink-0">
          <Image
            src="/assets/kma-logo-white.svg"
            width={100}
            height={55}
            alt="logo"
          />
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/assets/home-white.svg"
            width={20}
            height={20}
            alt="Home"
          />
          <p className="text-white font-medium text-base">Home</p>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex 2md:hidden w-full h-[60px] bg-white/10 backdrop-blur-md backdrop-filter border border-white/10 items-center justify-center z-3">
        <div className="w-[85%] flex justify-between">
          <div className="flex">
            <Image
              alt="menu"
              src={"/assets/menu-white.svg"}
              width={10}
              height={10}
              className="w-8 h-10"
            />
            <Image
              src="/assets/kma-logo-white.svg"
              width={100}
              height={40}
              alt="logo"
              className="w-25 h-10 pt-[6px] "
            />
          </div>
          <div className="flex gap-2 items-center" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            <Image
              src="/assets/profile.png"
              height={40}
              width={40}
              className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] rounded-[50%]"
              alt="profile"
            />
            <Image
              src="/assets/down-arrow-white.svg"
              width={15}
              height={5}
              alt="Down Arrow"
              className="w-[15px] h-full md:w-[15px]  pt-[4px]"
            />
          </div>
        </div>
      </div>
      
      {/* Render Header Content*/}
      <div
        className={`fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-white z-40 transition-transform duration-300 ease-in-out overflow-y-auto 2md:hidden ${
          isDrawerOpen ? "translate-x-0 " : "-translate-x-full"
        }`}
      >
        <ProfileMenu/>
      </div>
    </>
  );
}
