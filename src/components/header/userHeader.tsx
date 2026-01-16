"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ProfileMenu from "../common/profileMenu";
import { useRouter } from "nextjs-toploader/app";
import { useQuery } from "@tanstack/react-query";
import { UserDashboardDetailsApiHandler, UserDashboardDetailsResponse } from "@/services/userService";
import { toast } from "react-toastify";
import { USER_TYPE } from "@/lib/enums";


export default function UserHeader() {
  const pathName = usePathname();
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    const isActiveRoute = (routeName: string) => {
    const cleaned = pathName.startsWith("/") ? pathName.slice(1) : pathName;
    if (routeName == cleaned) {
      return true;
    } else {
      return false;
    }
  };

   const handleRedirect = (routeName: string) => {
    router.push(routeName);
  };

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

  const handleRedirectPostProperty = () => {
    if(userDashboardDetails?.role == USER_TYPE.CHANNEL_PARTNER){
      if(userDashboardDetails?.kycStatus?.kyc_completed){
        router.push('/post-property')
      }else{
        if(userDashboardDetails?.kycStatus?.kyc_status == 'under_review'){
          toast.info('Your KYC is under review. You can post property once it is approved.')
        }else{
          router.push('/profile')
        }
      }
    }else if(userDashboardDetails?.role == USER_TYPE.OWNER){
      if(userDashboardDetails.freeListings.remaining != 0){
        router.push('/post-property')
      }else{
        toast.error('Your free listing used upgread to channel partner to post property.')
      }
    }
    
  }

  return (
    <div className="bg-white/10 rounded-[200px] bg-clip-padding backdrop-filter w-[80%]  backdrop-blur-[20px] h-[63px] px-7 pt-[4px] flex justify-between items-center border border-1 border-[#FFFFFF33] z-3">
      <div className="flex items-center px-1.5 shrink-0 cursor-pointer">
        <Image
          src="/assets/kma-logo-white.svg"
          width={100}
          height={35}
          alt="logo"
          style={{ height: "38px" }}
        />
      </div>

      <div className="flex flex-row justify-center items-center gap-12 w-full px-8">
        {[{name:"Dashboard", route: 'user-dashboard'}, {name: "Leads", route:''}, {name: "Listing", route: 'my-listing'}].map((item) => (
          <p
            key={item.name}
            onClick={() => handleRedirect(`/${item.route}`)}
            style={{borderBottom: isActiveRoute(item.route) ? '2px solid white' : ''}}
            className="mt-2 text-gray-100 break-word text-sm w-max border-b-2 border-transparent hover:border-white transition-colors duration-200 cursor-pointer px-1.5  pb-1"
          >
            {item.name}
          </p>
        ))}

        <div
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="cursor-pointer flex justify-start items-center gap-2"
        >
          <p className="mt-2 text-gray-100 break-word text-sm w-max border-b-2 border-transparent cursor-pointer px-1.5  pb-1">
            More
          </p>
          <Image
            src="/assets/down-arrow-white.svg"
            width={12}
            height={5}
            alt="Down Arrow"
            className="w-[12px] h-full mt-1"
          ></Image>
        </div>
      </div>
      <div className="flex items-center justify-start gap-[7px] shrink-0">
        <button onClick={() => handleRedirectPostProperty()} className="animated-button px-[20px] py-[9px] cursor-pointer">
          <span className="flex items-center justify-between gap-[6px] relative z-11">
            <Image
              src="/assets/plus-sign.svg"
              width={14}
              height={14}
              alt="home"
            />
            <p className="text-nowrap text-sm">Post Property</p>
          </span>
        </button>
      </div>

      <ProfileMenu anchorEl={anchorEl} handleClose={handleClose} open={open} />
    </div>
  );
}
