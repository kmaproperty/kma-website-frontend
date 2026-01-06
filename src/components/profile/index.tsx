'use client'

import { KYC_STATUS, USER_TYPE, userType } from "@/lib/enums";
import { getKycStatusApiHandler, KycStatusResponse } from "@/services/kycService";
import { UserDashboardDetailsApiHandler, UserDashboardDetailsResponse, userProfileApiHandler, UserProfileResponse } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import FullscreenSpinner from "../common/spinner/fullScreenSpinner";
import ProfileUpdate from "./profileedit";
import { useDispatch } from "react-redux";
import { resetForm } from "@/store/createAccountSlice";


export default function UserProfile() {
    const baseUrl = process.env.NEXT_PUBLIC_AWS_URL
    const router = useRouter()
    const dispatch = useDispatch()
    const [kycVerificationPending, setKycVerificationPending] = useState(false)
    const [openProfileUpdate, setOpenProfileUpdate] = useState(false)
    const { data: kycDetails, isLoading: detailsLoader } = useQuery({
    queryKey: ["kyc"],
    queryFn: async (): Promise<KycStatusResponse> => {
      return getKycStatusApiHandler();
    },
    select: (resposne: KycStatusResponse) => {
      console.log("kyc", resposne);
      return resposne;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const { data: userProfile, isLoading: profielLoader, refetch: refreshUserProfileData } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async (): Promise<UserProfileResponse> => {
      return userProfileApiHandler();
    },
    select: (resposne: UserProfileResponse) => {
      console.log("profile", resposne);
      return resposne.user;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const { data: userDashboardDetails } = useQuery({
      queryKey: ["user-dashboard-details-profile"],
      queryFn: async (): Promise<UserDashboardDetailsResponse> => {
        return UserDashboardDetailsApiHandler();
      },
      select: (resposne: UserDashboardDetailsResponse) => {
        return resposne;
      },
      staleTime: 0,
      refetchOnMount: true,
    });

  useEffect(() => {
    if(kycDetails){
        if(kycDetails.kyc_completed){
            setKycVerificationPending(true)
        }
    }
  },[kycDetails])

  const renderTitle = (status) => {
    if(status == 'in_progress'){
      return 'KYC is In Progress'
    }
    if(status == 'not_started'){
      return 'Your E-KYC is remaning'
    }
  }

  return (
    <>
    {profielLoader && <FullscreenSpinner />}
    {userProfile && <div className="w-full bg-white rounded-xl flex flex-col justify-start items-start p-5 gap-3">
        <div className="flex w-full justify-between items-start gap-4">
            <div className="flex-3 flex justify-between  gap-4">
              <div className="flex  gap-4">
                <div className="w-fit rounded-full overflow-hidden">
                    <Image src={baseUrl + userProfile.profileImage} width={100} height={100} alt="user profile" className="w-[85px] h-[85px] object-cover"/>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-text-black text-base font-semibold">{userProfile.name}</p>
                  <p className="text-text-gray text-base">+91 {userProfile.phone}</p>
                  <p className="text-text-gray text-base">{userProfile.email}</p>
                </div>
              </div>
              <div>
              <p onClick={() => {
                setOpenProfileUpdate(true)
              }} className="cursor-pointer flex text-[#757BEE] gap-2 text-base font-medium"><Image src={'/assets/editprofile.svg'} width={16} height={16} alt="edit"/>Edit Profile</p>
            </div>
            </div>
            
            <div className="flex-1">
                 {userDashboardDetails && userDashboardDetails?.role == USER_TYPE.CHANNEL_PARTNER && userDashboardDetails?.kycStatus?.kyc_status != 'completed' &&  userDashboardDetails?.kycStatus?.kyc_status !='under_review' && <div className="bg-light-purple w-[200px] h-auto p-3 flex flex-col justify-center items-center gap-1 border border-[#757BEE] rounded-xl">
            <Image src='/assets/kyc-info.svg' width={35} height={35} alt='kyc-info' />
            <p className="font-medium text-text-black text-sm">{renderTitle(userDashboardDetails?.kycStatus?.kyc_status)}</p>
            {!kycVerificationPending && <button
                onClick={() => {
                    router.push('/kyc')
                }} 
                className="w-full md:w-auto text-xs 1xl:text-base animated-button px-12 py-3 border border-blue text-center cursor-pointer"
            >
                <span className="gap-3 relative">
                <p className="text-nowrap">
                   Complete kyc
                </p>
                </span>
            </button>}
        </div>}
            </div>
        </div>
        {userProfile.role == USER_TYPE.CHANNEL_PARTNER && <>
          <hr className="border-border w-full "/>
        <div className="flex gap-4">
          <p className="text-text-black text-base w-[85px]">Kyc Status</p>
          <p className="text-text-gray text-base">{KYC_STATUS[userDashboardDetails?.kycStatus?.kyc_status]}</p>
        </div>
        </>}
        <hr className="border-border w-full "/>
        <div className="flex gap-4">
          <p className="text-text-black text-base w-[85px]">Role</p>
          <p className="text-text-gray text-base">{userType[userProfile?.role]}</p>
        </div>
        <hr className="border-border w-full "/>
        <div className="flex gap-4">
          <p className="text-text-black text-base w-[85px]">City</p>
          <p className="text-text-gray text-base">{userProfile?.role == USER_TYPE.CHANNEL_PARTNER ?  userProfile?.cities : userProfile?.city}</p>
        </div>
        {userProfile?.role == USER_TYPE.CHANNEL_PARTNER && <><hr className="border-border w-full "/>
        <div className="flex gap-4">
          <p className="text-text-black text-base w-[85px]">Experience</p>
          <p className="text-text-gray text-base">{userProfile?.businessSince}</p>
        </div></>}
        {userProfile?.role == USER_TYPE.CHANNEL_PARTNER && <><hr className="border-border w-full "/>
        <div className="flex gap-4">
          <p className="text-text-black text-base w-[85px]">Firm Name</p>
          <p className="text-text-gray text-base">{userProfile?.firmName}</p>
        </div> </>}
       {userProfile?.role == USER_TYPE.CHANNEL_PARTNER && <><hr className="border-border w-full "/>
        <div className="flex gap-4">
          <p className="text-text-black text-base w-[85px]">Partner code</p>
          <p className="text-text-gray text-base">{userProfile?.channelPartnerCode}</p>
        </div></>}
       {userProfile?.role == USER_TYPE.CHANNEL_PARTNER && <> <hr className="border-border w-full "/>
        <div className="flex gap-4">
          <p className="text-text-black text-base w-[85px]">Description</p>
          <p className="text-text-gray text-base">{userProfile?.aboutYourSelf}</p>
        </div> </>}
   </div>}
   {openProfileUpdate && <ProfileUpdate open={openProfileUpdate} onClose={(isUpdate) => {
    if(isUpdate){
        refreshUserProfileData()
    }
    setOpenProfileUpdate(false)
    dispatch(resetForm())
    
   }}/>}
   </>
  );
}
