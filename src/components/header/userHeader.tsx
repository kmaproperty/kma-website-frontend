'use client'
import Image from "next/image";
import ProfileMenu from "../common/profileMenu";
import { useEffect, useState } from "react";
import PositionMenu from "../common/menu";
import MenuList from "../common/MenuList";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { UserDashboardDetailsApiHandler, UserDashboardDetailsResponse } from "@/services/userService";

export default function UserHeader() {
    const router = useRouter()
    const pathName = usePathname()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [openMenuList, setOpenMenuList] = useState(false)
    const [isLoggedUser, setIsLoggedUser] = useState(false)


     useEffect(() => {
    if (isDrawerOpen || openMenuList) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, openMenuList]);

  useEffect(() => {
    let isUserfound = localStorage.getItem('user')
    if(isUserfound){
      setIsLoggedUser(true)
    }
  },[])

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleRedirect = (routeName: string) => {
    router.push(routeName)
  }

  const isActiveRoute =(routeName: string) => {
    const cleaned = pathName.startsWith("/") ? pathName.slice(1) : pathName;
    if(routeName == cleaned){
      return true
    }else{
      return false
    }
  }

  const { data: userDashboardDetails } = useQuery({
    queryKey: ["user-dashboard-details-to-verify-count"],
    queryFn: async (): Promise<UserDashboardDetailsResponse> => {
      return UserDashboardDetailsApiHandler();
    },
    select: (resposne: UserDashboardDetailsResponse) => {
      return resposne;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const disablePostProperty = () => {
    if(userDashboardDetails){
      if(userDashboardDetails?.freeListings?.remaining == 0){
        return true
      }
    }   
    return false
  }

  return (
    <>
      {/* DeskTop Header */}
      <div className="hidden 2md:flex w-[85%] h-[70px] rounded-[200px] bg-white/10 backdrop-blur-md backdrop-filter border border-white/10 items-center px-6 z-3">
        <div className="flex items-center px-5 shrink-0">
          <Image
            src="/assets/kma-logo-white.svg"
            width={100}
            height={55}
            alt="logo"
            className="w-[80px] h-[45px] lg:w-[100px] lg:h-[55px]"
          />
        </div>

        <div className="flex items-center gap-3">
          <Image
            src="/assets/home-white.svg"
            width={20}
            height={20}
            alt="Home"
            className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]"
          />
          <p className="text-white font-medium text-sm lg:text-base">Home</p>
        </div>

        {isLoggedUser && <div className="hidden 2md:flex gap-4 justify-end w-full">
          <div onClick={() => handleRedirect('/user-dashboard')} className="cursor-pointer flex items-center gap-3">
            <p className="text-white font-medium text-sm lg:text-base" style={{borderBottom: isActiveRoute('user-dashboard') ? '2px solid white' : ''}}>Dashboard</p>
          </div>
          <div onClick={() => handleRedirect('/my-listing')} className="cursor-pointer flex items-center gap-3">
            <p className="text-white font-medium text-sm lg:text-base" style={{borderBottom: isActiveRoute('my-listing') ? '2px solid white' : ''}}>Listing</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-white font-medium text-sm lg:text-base">Leads</p>
          </div>
          <div className="">
            <button disabled={disablePostProperty()} onClick={() => handleRedirect('/post-property')} className="w-min text-sm lg:text-base animated-button px-7 lg:px-10 py-3 border border-blue text-center cursor-pointer">
                <span className="gap-3 relative flex justify-center">
                  <img src='/assets/plus-sign.svg'/>
                  <p className={`text-nowrap font-medium`}>Post Property</p>
                </span>
              </button>
          </div>
          <div className="flex gap-2 items-center cursor-pointer" onClick={(event: React.MouseEvent<HTMLElement>) =>  setAnchorEl(event.currentTarget)}>
              <Image
                src="/assets/profile.png"
                height={40}
                width={40}
                className="w-[35px] h-[35px] sm:w-[49px] sm:h-[49px] rounded-[50%] object-cover"
                alt="profile"
              />
              <Image
                src="/assets/down-arrow-white.svg"
                width={12}
                height={5}
                alt="Down Arrow"
                className="w-[12px] h-full pt-[4px]"
              />
            </div>
        </div>}

      </div>

      {/* Mobile Header */}
      <div className="flex 2md:hidden w-full h-[60px] bg-white/10 backdrop-blur-md backdrop-filter border border-white/10 items-center justify-center z-3">
        <div className="w-[85%] flex justify-between">
          <div className="flex">
            {isLoggedUser && <>
            {!openMenuList ? <Image
              alt="menu"
              src={"/assets/menu-white.svg"}
              width={10}
              height={10}
              className="w-8 h-10 cursor-pointer"
              onClick={() => {
                setOpenMenuList(true)
              }}
            /> : <Image
              alt="menu"
              src={"/assets/close-icon-white.svg"}
              width={10}
              height={10}
              className="w-8 h-10 cursor-pointer"
              onClick={() => {
                setOpenMenuList(false)
              }}
            />}
            </>}
            <Image
              src="/assets/kma-logo-white.svg"
              width={100}
              height={40}
              alt="logo"
              className="w-25 h-10 pt-[6px] "
            />
          </div>
          {isLoggedUser && <div className="flex gap-2 items-center cursor-pointer" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
            <Image
              src="/assets/profile.png"
              height={40}
              width={40}
              className="w-[40px] h-[40px] rounded-[50%] object-cover"
              alt="profile"
            />
            <Image
              src="/assets/down-arrow-white.svg"
              width={12}
              height={5}
              alt="Down Arrow"
              className="w-[12px] h-full pt-[4px]"
            />
          </div>}
        </div>
      </div>
      
      {/* Render Header Content*/}
      <div
        className={`fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-white z-40 transition-transform duration-300 ease-in-out overflow-y-auto 2md:hidden ${
          (isDrawerOpen || openMenuList) ? "translate-x-0 " : "-translate-x-full"
        }`}
      >
        {isDrawerOpen && <ProfileMenu/>}
        {openMenuList && <MenuList/>}
      </div>
      <div className="hidden 2md:flex">
        <PositionMenu anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}>
          <ProfileMenu/>
        </PositionMenu>
      </div>
      
    </>
  );
}
