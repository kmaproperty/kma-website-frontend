'use client'
import { Menu } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import ListView from "./listView";

export default function HomdeHeader(){
    const [anchorEl, setanchorEl] = useState(null)
    const openType = Boolean(anchorEl);
    return(
        <div className="bg-white/10 rounded-[200px] bg-clip-padding backdrop-filter  backdrop-blur-[20px] h-[50px] 2md:h-[63px] px-3 lg:px-7 pt-[4px] flex justify-between items-center border border-1 border-[#FFFFFF33]"> 
            
            <div className="flex items-center px-1.5 shrink-0 cursor-pointer">
                <Image src="/assets/kma-logo-white.svg" width={100} height={35} alt="logo" className="w-[80px] h-[33px] 2md:w-[100px] 2md:h-[38px]" />
            </div>

            <div className="flex flex-row justify-between items-center gap-1 w-full px-4 text-center">
                <div className="hidden sm:flex items-center justify-between cursor-pointer">
                    <Image
                        src="/assets/location-white.svg"
                        className="text-gray-300"
                        width={20}
                        height={20}
                        alt="location"
                        style={{width: '14px', height: '14px'}}
                    />
                    <p className="pl-1 text-gray-100 text-xs lg:text-sm"> City </p>
                    <Image src='/assets/down-arrow-white-line.svg' alt='down-arrow' width={20} height={20} style={{width: '12px', height: '10px', marginLeft: '15px'}}/>
                </div>
                <div className="hidden 2md:block border border-[0.2px] border-[#FFFFFF] h-[30px] ml-2" />

                {[
                    "Rent",
                    "Buy",
                    "Projects",
                    "Channel Partner",
                    "Refer & Earn",
                    "Help",
                ].map((item) => (
                    <p onClick={(event) => setanchorEl(event.currentTarget)} key={item} className="hidden 2md:block mt-2 text-gray-100 break-word text-xs xl:text-sm nowrap w-max border-b-2 border-transparent hover:border-blue transition-colors duration-200 cursor-pointer px-1.5  pb-1">
                    {item}
                    </p>
                ))}

                <Image src="/assets/more-white.svg" height={14} width={14} alt="more" className="hidden 2md:block cursor-pointer"/>
            </div>
            <div className="flex items-center justify-start gap-[7px] shrink-0">
                <button className="animated-button px-[10px] sm:px-[20px] py-[6px] sm:py-[9px] cursor-pointer">
                    <span className="flex items-center justify-between gap-[6px] relative z-11">
                    <Image src="/assets/home-white.svg" width={14} height={14} alt="home" className="w-3 h-3 w-3.5 h-3.5"/>
                    <p className="text-nowrap text-[10px] sm:text-xs xl:text-sm">Post Property</p>
                    </span>
                </button>
                <div className="flex flex-row gap-[6px] items-center cursor-pointer">
                <Image
                    src="/assets/profile.png"
                    height={40}
                    width={40}
                    className="w-[28px] h-[28px] sm:w-[35px] sm:h-[35px] rounded-[50%] object-cover"
                    alt="profile"
                />
                <Image
                    src="/assets/down-arrow-white.svg"
                    width={12}
                    height={5}
                    alt="Down Arrow"
                    className="w-[10px] h-full"
                />
                </div>
            </div>

            <Menu
                  anchorEl={anchorEl}
                  open={openType}
                  onClose={() => {}}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  PaperProps={{
                    className:
                      "mt-5 w-auto rounded-2xl p-4 shadow-xl border border-gray-200",
                  }}
                >
                  <ListView/>
                </Menu>
        </div>
    )
}