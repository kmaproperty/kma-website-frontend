"use client";
import { ClickAwayListener, Paper, Popper } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
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

export default function HomdeHeader({cityData, selectedCity, setSelectedCity, cityLoader, fetchCities, propertyMasterData}) {
  const router = useRouter()

  const [anchorEl, setanchorEl] = useState(null);
  const [menuList, setMenuList] = useState([]);
  const [type, setType] = useState(null);
  const [cityMenu, setCityMenu] = useState(null);
  const [profileMenu, setProfileMenu] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
 

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setActiveSubMenu(null);
  };

  const openSubMenu = (label) => setActiveSubMenu(label);
  const closeSubMenu = () => setActiveSubMenu(null);

  const openType = Boolean(anchorEl);
  const handleOpenMenu = (event, menuType) => {
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
      default:
        setMenuList([]);
        setType(null);
        setanchorEl(null);
    }
    setCityMenu(false);
    setProfileMenu(null)
  };

  useEffect(() => {
  if (!openType) return;

  const handleScroll = () => {
    setanchorEl(null);
    setCityMenu(false);
    setType(null)
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [openType]);

const navigatePostProperty = () => {
  router.push('/post-property')
}

  return (
    <>
    <div className="w-[90%] lg:w-[75%] mt-[25px]">
      <div className="bg-white/10 rounded-[200px] bg-clip-padding backdrop-filter  backdrop-blur-[20px] h-[50px] 2md:h-[63px] px-3 lg:px-7 pt-[4px] flex justify-between items-center border border-1 border-[#FFFFFF33]">
        <div className="flex items-center px-1.5 shrink-0 cursor-pointer">
          <Image
            src="/assets/kma-logo-white.svg"
            width={100}
            height={35}
            alt="logo"
            className="w-[80px] h-[33px] 2md:w-[100px] 2md:h-[38px]"
          />
        </div>

        <div className="flex flex-row justify-between items-center gap-1 w-full px-4 text-center">
          <div
            onMouseEnter={(event) => {
              setanchorEl(event.currentTarget);
              setCityMenu(true);
            }}
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
          <div className="hidden 2md:block border border-[0.2px] border-[#FFFFFF] h-[30px] ml-2" />

          {headerMenuList.map((item) => (
            <p
              onMouseEnter={(event) => handleOpenMenu(event, item.value)}
              onClick={(event) => handleOpenMenu(event, item.value)}
              key={item.value}
              className="hidden 2md:block mt-2 text-gray-100 break-word text-xs xl:text-sm nowrap w-max border-b-2 border-transparent hover:border-blue transition-colors duration-200 cursor-pointer px-1.5  pb-1"
            >
              {item.label}
            </p>
          ))}
          <div
            onMouseEnter={(event) => handleOpenMenu(event, "more")}
            onClick={(event) => handleOpenMenu(event, "more")}
            className="flex justify-center items-center h-[30px] pt-1"
          >
            <Image
              src="/assets/more-white.svg"
              height={14}
              width={14}
              alt="more"
              className="hidden 2md:block cursor-pointer"
            />
          </div>
        </div>
        <div className="flex items-center justify-start gap-[7px] shrink-0">
          <button onClick={navigatePostProperty} className="animated-button px-[10px] sm:px-[20px] py-[6px] sm:py-[9px] cursor-pointer">
            <span className="flex items-center justify-between gap-[6px] relative z-11">
              <Image
                src="/assets/home-white.svg"
                width={14}
                height={14}
                alt="home"
                className="w-3 h-3 w-3.5 h-3.5"
              />
              <p className="text-nowrap text-[10px] sm:text-xs xl:text-sm">
                Post Property
              </p>
            </span>
          </button>
          <div className="flex flex-row gap-[6px] items-center cursor-pointer">
            <Image
             onMouseEnter={(event) => {
              setProfileMenu('profile')
              setanchorEl(event.currentTarget)
             }}
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
            <Image 
              onClick={toggleDrawer}
              src={'/assets/bar.svg'}
              width={24}
              height={20}
              alt="menubar"
              className="2md:hidden text-white ml-2"
              />
          </div>
        </div>

        <Popper
          open={openType}
          anchorEl={anchorEl}
          placement="bottom-start"
          modifiers={[
            {
              name: "offset",
              options: {
                offset: cityMenu ? [-50, 26] : type ? [-250, 20] : [0, 20],
              },
            },
          ]}
        >
          <ClickAwayListener
            onClickAway={() => {
              setanchorEl(null);
              setCityMenu(false);
              setType(null)
              setProfileMenu(null)
            }}
          >
            <div>
              {!cityMenu &&
                (!type ? (
                  <Paper className="w-auto min-w-[180px]! rounded-2xl! px-2 py-2 shadow-xl border border-gray-200">
                    {profileMenu != 'profile' ? <ListView menuList={menuList} />
                     : <ProfileView/>}
                  </Paper>
                ) : (
                  <RentSellHeaderView propertyMasterData={propertyMasterData} type={type} />
                ))}
              {cityMenu && (
                <Paper className="w-auto min-w-[180px]! rounded-2xl! px-2 py-2 shadow-xl border border-gray-200">
                    <CityView selectedCity={selectedCity} setSelectedCity={setSelectedCity} cityData={cityData} cityLoader={cityLoader} fetchCities={fetchCities}/>
                </Paper>
              )}
            </div>
          </ClickAwayListener>
        </Popper>
      </div>
    </div>
    <HomeMobileHeader propertyMasterData={propertyMasterData} type={type}  selectedCity={selectedCity} setSelectedCity={setSelectedCity} cityData={cityData} cityLoader={cityLoader} fetchCities={fetchCities} open={isDrawerOpen} onClose={toggleDrawer} activeSubMenu={activeSubMenu} openSubMenu={openSubMenu} closeSubMenu={closeSubMenu}/>
    </>
  );
}


