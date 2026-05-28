"use client";
import { Paper, Popper } from "@mui/material";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ListView from "./listView";
import {
  channelPartnerMenuList,
  headerMenuList,
  helpMenuList,
  moreMenuList,
  projectMenuList,
} from "@/lib/constants";
import RentSellHeaderView from "./rentSellHeaderView";
import CityView from "./cityView";
import HomeMobileHeader from "./homeMobileHeader";
import ProfileView from "./profileView";
import { useRouter } from "nextjs-toploader/app";
import { USER_TYPE } from "@/lib/enums";
import { useHeaderStore } from "@/store/useHeaderStore";
import { useQuery } from "@tanstack/react-query";
import { userProfileApiHandler, UserProfileResponse, endUserProfileApiHandler } from "@/services/userService";
import { clearAuthCookies } from "@/lib/helper";

const baseUrl = process.env.NEXT_PUBLIC_AWS_URL ?? "";

type HomeHeaderProps = {
  showColor?: boolean;
  show2color?: boolean;
};

export default function HomeHeader({ showColor = false, show2color = false }: HomeHeaderProps) {
  const router = useRouter();
  const {
    selectedCity,
    cityData,
    cityLoader,
    fetchCities,
    propertyMasterData,
    userRole,
    crossApp,
  } = useHeaderStore(true);
  const isEndUser = userRole === USER_TYPE.END_USER || userRole === USER_TYPE.USER;
  const isLoggedIn = Boolean(userRole === USER_TYPE.CHANNEL_PARTNER || userRole === USER_TYPE.OWNER || isEndUser);
  const isSeller = Boolean(userRole === USER_TYPE.CHANNEL_PARTNER || userRole === USER_TYPE.OWNER);

  const { data: profileResponse } = useQuery({
    queryKey: ["user-profile", userRole, crossApp],
    queryFn: async () => {
      try {
        const res = await endUserProfileApiHandler();
        return { success: res.success, user: res.user } as UserProfileResponse;
      } catch (err: any) {
        if (err?.statusCode === 401 || err?.status === 401 || err?.message === 'Authentication failed') {
          localStorage.clear();
          clearAuthCookies();
          window.location.replace("/");
        }
        throw err;
      }
    },
    enabled: isLoggedIn,
    staleTime: 60 * 1000,
    retry: false,
  });
  const headerAvatarSrc = useMemo(() => {
    const user = profileResponse?.user;
    if (!user?.profileImage) return "/assets/profile.png";
    if (/^https?:\/\//.test(user.profileImage)) return user.profileImage;
    return `${baseUrl}${user.profileImage}`;
  }, [profileResponse?.user?.profileImage]);

  const [anchorEl, setanchorEl] = useState(null);
  const [menuList, setMenuList] = useState([]);
  const [type, setType] = useState(null);
  const [cityMenu, setCityMenu] = useState(null);
  const [profileMenu, setProfileMenu] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const headerBarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isBlueTheme = showColor || show2color || isScrolled;

  const isHomePage = pathname === "/";
  const isAboutPage = pathname === "/about-us"
  const isJoinUs = pathname === "/join-us"
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setActiveSubMenu(null);
  };

  const openSubMenu = (label) => setActiveSubMenu(label);
  const closeSubMenu = () => setActiveSubMenu(null);

  const resetMenuState = useCallback(() => {
    setanchorEl(null);
    setCityMenu(false);
    setType(null);
    setMenuList([]);
    setProfileMenu(null);
    setHoveredMenu(null);
  }, []);

  useEffect(() => {
    resetMenuState();
  }, [pathname, resetMenuState]);

  const openType = Boolean(anchorEl);

  const cancelCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      resetMenuState();
    }, 200);
  }, [cancelCloseTimer, resetMenuState]);

  useEffect(() => {
    return () => cancelCloseTimer();
  }, [cancelCloseTimer]);

  useEffect(() => {
    if (!openType) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (headerBarRef.current?.contains(e.target as Node)) return;
      if (dropdownRef.current?.contains(e.target as Node)) return;
      resetMenuState();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openType, resetMenuState]);

  const handleOpenMenu = (event, menuType) => {
    cancelCloseTimer();
    switch (menuType) {
      case "project":
        setMenuList(projectMenuList);
        setType(null);
        setanchorEl(event.currentTarget);
        break;
      case "channel_partner":
        setMenuList(channelPartnerMenuList);
        setType(null);
        setanchorEl(event.currentTarget);
        break;
      case "help":
        setMenuList(helpMenuList);
        setType(null);
        setanchorEl(event.currentTarget);
        break;
      case "more":
        setMenuList(moreMenuList);
        setType(null);
        setanchorEl(event.currentTarget);
        break;
      case "sale":
        setType(menuType);
        setMenuList([]);
        setanchorEl(event.currentTarget);
        break;
      case "rent":
        setType(menuType);
        setMenuList([]);
        setanchorEl(event.currentTarget);
        break;
      case "refer_and_earn":
        setMenuList([]);
        setType(null);
        setanchorEl(null);
        break;
      default:
        setMenuList([]);
        setType(null);
        setanchorEl(null);
    }
    setCityMenu(false);
    setProfileMenu(null)
  };

  const handleScroll = () => {
    setanchorEl(null);
    setCityMenu(false);
    setType(null);
    setHoveredMenu(null);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
  if (!openType) return;
  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [openType]);

const sellerUrl = process.env.NEXT_PUBLIC_SELLER_URL || "http://localhost:3002";

const navigatePostProperty = () => {
  router.push("/post-property-handoff");
}

const navigateDashboard = () => {
  window.location.href = `${sellerUrl}/user-dashboard`;
}

const handleHeaderSubMenuClick = (label: string) => {
  setanchorEl(null);
  setCityMenu(false);
  setType(null);
  setProfileMenu(null);
  switch (label) {
    case "Join Us":
      router.push("/join-us");
      break;
    case "Sales Enquiry":
      router.push("/sales-enquiry");
      break;
    case "Meet The Team":
      router.push("/meet-the-team");
      break;
    case "Help Center":
      router.push("/help-center");
      break;
    case "Find an agent":
      router.push("/channel-partner");
      break;
  }
}

  return (
    <>
    <div className={`sticky top-0 ${isHomePage || isAboutPage || isJoinUs ? "mt-5" : "mt-10"} md:mt-10 z-50 w-full flex justify-center`}>
    <div className="w-[90%] mx-auto max-w-[1440px]">
      <div
        ref={headerBarRef}
        className={[
          "rounded-[200px] h-[50px] 2md:h-[63px] px-3 lg:px-7 pt-[4px] flex justify-between items-center border border-1 transition-colors duration-300",
          isBlueTheme
            ? "bg-blue shadow-xl border-[#FFFFFF1F]"
            : "bg-white/10 bg-clip-padding backdrop-filter backdrop-blur-[20px] border-[#FFFFFF33]",
        ].join(" ")}
      >
        <div className="flex items-center gap-2">
          <Image 
            onClick={toggleDrawer}
            src={'/assets/bar.svg'}
            width={24}
            height={20}
            alt="menubar"
            className="2md:hidden text-white cursor-pointer"
          />
          <div
            onClick={() => router.push("/")}
            className="flex items-center px-1.5 pr-6 shrink-0 cursor-pointer"
          >
            <Image
              src="/assets/kma-logo-white.svg"
              width={100}
              height={35}
              alt="logo"
              className="w-[80px] h-[33px] 2md:w-[100px] 2md:h-[38px]"
            />
          </div>
        </div>

        <div className="flex flex-row justify-between items-center gap-5 w-full px-4 text-center">
          <div
            onMouseEnter={(event) => {
              cancelCloseTimer();
              setanchorEl(event.currentTarget);
              setCityMenu(true);
              setType(null);
              setProfileMenu(null);
              setHoveredMenu("city");
            }}
            onMouseLeave={() => scheduleClose()}
            onClick={(event) => {
              setanchorEl(event.currentTarget);
              setCityMenu(true);
            }}
            className="hidden sm:flex items-center justify-between cursor-pointer"
          >
            <Image
              src="/assets/location-white.svg"
              className="text-gray-300"
              width={20}
              height={20}
              alt="location"
              style={{ width: "14px", height: "14px" }}
            />
            <p className="pl-1 text-gray-100 text-xs lg:text-sm">{selectedCity ? selectedCity?.name : 'City'}</p>
            <Image
              src="/assets/down-arrow-white-line.svg"
              alt="down-arrow"
              width={20}
              height={20}
              className={`transition-transform duration-300 ease-in-out ${cityMenu ? 'rotate-180' : 'rotate-0'}`}
              style={{ width: "12px", height: "10px", marginLeft: "15px" }}
            />
          </div>
          <div className="hidden 2md:block border border-[0.2px] border-[#FFFFFF] h-[30px]" />

          {headerMenuList.map((item) => {
            const hasDropdown = item.value !== "refer_and_earn";
            const isActive = hoveredMenu === item.value;
            const isReferAndEarn = item.value === "refer_and_earn";
            return (
              <div key={item.value}>
                <p
                  onMouseEnter={(event) => {
                    cancelCloseTimer();
                    setHoveredMenu(item.value);
                    if (hasDropdown) handleOpenMenu(event, item.value);
                  }}
                  onMouseLeave={() => hasDropdown ? scheduleClose() : setHoveredMenu(null)}
                  onClick={(event) => {
                    if (hasDropdown) handleOpenMenu(event, item.value);
                    else { resetMenuState(); router.push("/refer-and-earn"); }
                  }}
                  className={`hidden 2md:block mt-2 break-word text-xs xl:text-sm nowrap w-max border-b-2 transition-colors duration-200 cursor-pointer px-1.5 pb-1 hover:border-blue ${
                    isReferAndEarn ? "text-[#FDE68A] animate-pulse font-semibold" : "text-gray-100"
                  } ${isActive ? "border-blue" : "border-transparent"}`}
                >
                  {item.label}
                  {isReferAndEarn && (
                    <span className="ml-1 inline-flex items-center rounded-full bg-[#FDE68A] text-[#1E3A8A] px-1.5 py-0.5 text-[9px] font-bold align-middle">
                      NEW
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Side: Profile & CTA */}
        <div className="flex items-center justify-start gap-[7px] shrink-0">
          <div
            onMouseEnter={(event) => { cancelCloseTimer(); setHoveredMenu("more"); handleOpenMenu(event, "more"); }}
            onMouseLeave={() => scheduleClose()}
            onClick={(event) => handleOpenMenu(event, "more")}
            className="flex justify-center items-center h-[30px] pt-1 mr-2 2md:mr-10"
          >
            <Image
              src="/assets/more-white.svg"
              height={14}
              width={14}
              alt="more"
              className="hidden 2md:block cursor-pointer"
            />
          </div>

          {!isSeller && (
            <button onClick={navigatePostProperty} className={`${isBlueTheme ? "bg-transparent border border-white" : "animated-button"} px-[10px] sm:px-[20px] py-[6px] sm:py-[9px] rounded-[50px] cursor-pointer transition-colors duration-300`}>
              <span className="flex items-center justify-between gap-[6px] relative z-10 text-white">
                <Image src="/assets/home-white.svg" width={14} height={14} alt="home" className="w-3.5 h-3.5" />
                <p className="whitespace-nowrap text-[10px] sm:text-xs xl:text-sm text-white">Post Property</p>
              </span>
            </button>
          )}

           {isSeller && <button onClick={navigateDashboard} className={`${isBlueTheme ? "bg-transparent border border-white" : "animated-button"} px-[10px] sm:px-[20px] py-[6px] sm:py-[9px] rounded-[50px] cursor-pointer transition-colors duration-300`}>
            <span className="flex items-center justify-between gap-[6px] relative z-10 text-white">
              <Image
                src="/assets/home-white.svg"
                width={14}
                height={14}
                alt="home"
                className="w-3.5 h-3.5"
              />
              <p className="whitespace-nowrap text-[10px] sm:text-xs xl:text-sm text-white">
                Seller Dashboard
              </p>
            </span>
          </button>}


          <div
            onMouseEnter={(event) => {
              cancelCloseTimer();
              setProfileMenu("profile");
              setanchorEl(event.currentTarget);
              setHoveredMenu("profile");
            }}
            onMouseLeave={() => scheduleClose()}
            className="flex flex-row gap-[6px] items-center cursor-pointer"
          >
            <Image
              onClick={(event) => {
                setProfileMenu("profile");
                setanchorEl(event.currentTarget);
                setCityMenu(false);
                setType(null);
              }}
              src={headerAvatarSrc}
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
              className="w-[10px] h-full block"
            />
          </div>
        </div>

        {/* Popper stays as it is */}
        <Popper
          open={openType}
          anchorEl={anchorEl}
          placement="bottom-start"
          sx={{ zIndex: 9999 }}
          modifiers={[{ name: "offset", options: { offset: cityMenu ? [-50, 26] : type ? [-250, 20] : profileMenu === "profile" ? [-270, 20] : [0, 20] } }]}
        >
          <div ref={dropdownRef} onMouseEnter={cancelCloseTimer} onMouseLeave={scheduleClose}>
            {!cityMenu ? (!type ? (
              <Paper className={`rounded-2xl! shadow-xl border border-gray-200 bg-white relative z-[9999] ${profileMenu === "profile" ? "w-[320px] sm:w-[340px]! p-0!" : "w-auto min-w-[180px]! px-2 py-2"}`}>
                {profileMenu != 'profile' ? <ListView menuList={menuList} onItemClick={handleHeaderSubMenuClick} /> : <ProfileView userRole={userRole}/>}
              </Paper>
            ) : (
              <Paper className="rounded-2xl! shadow-xl border border-gray-200 bg-white relative z-[9999] overflow-hidden"><RentSellHeaderView type={type} onClose={resetMenuState} /></Paper>
            )) : (
              <Paper className="w-auto min-w-[180px]! rounded-2xl! px-2 py-2 shadow-xl border border-gray-200 bg-white relative z-[9999]"><CityView handleScroll={handleScroll}/></Paper>
            )}
          </div>
        </Popper>
      </div>
    </div>
    </div>
    <HomeMobileHeader open={isDrawerOpen} onClose={toggleDrawer} activeSubMenu={activeSubMenu} openSubMenu={openSubMenu} closeSubMenu={closeSubMenu}/>
    </>
  );
}