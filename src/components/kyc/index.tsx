"use client";

import { useEffect, useState } from "react";

import PhotoIcon from "@/assets/photo-upload.svg";
import AadharIcon from "@/assets/aadhar-verify.svg";
import BankIcon from "@/assets/bank-details.svg";
import AgreementIcon from "@/assets/aggrement-sign.svg";
import UploadPhoto from "./uploadPhoto";
import AadharVerification from "./aadharVerification";
import BankDetails from "./bankDetails";
import AggrementVerification from "./aggrementVerification";
import { useRouter } from "nextjs-toploader/app";
import { useQuery } from "@tanstack/react-query";
import { getKycStatusApiHandler, KycStatusResponse } from "@/services/kycService";
import KycSuccess from "./kycSuccess";

export default function UserKyc({tabName, event}) {
  const [activeStep, setActiveStep] = useState(tabName ? tabName : 'Photo Upload');
  const router = useRouter()

  const [isKycComplete, setIsKycComplete] = useState(false)

  const kycList = [
    { icon: PhotoIcon, name: "Photo Upload" },
    { icon: AadharIcon, name: "Aadhar Verification" },
    { icon: BankIcon, name: "Bank Details" },
    { icon: AgreementIcon, name: "Agreement Signature" },
  ];

  const handleActiveTab = (tabName) => {
    setActiveStep(tabName)
    router.replace(`/kyc?tabName=${tabName}`)
  }

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

  const renderTitle = () => {
    const titleList = {
        'Photo Upload': 'Upload Your Photo',
        'Aadhar Verification': 'Verify Your Aadhar Number',
        'Bank Details': 'Enter Your Bank Details',
        'Agreement Signature': 'Channel Partner Agreement',
    }

    return titleList[activeStep]
  }

  useEffect(() => {
    if(kycDetails){
      setIsKycComplete(kycDetails?.kyc_completed)
    }
  },[kycDetails])

  useEffect(() => {
    if(tabName){
      setActiveStep(tabName)
    }else{
      setActiveStep('Photo Upload')
    }
  },[tabName])

  return (
    <div className="bg-white rounded-xl p-10 w-full">
      {!isKycComplete && <div className="flex items-center justify-between h-[100px]">
        {kycList.map((item, index) => {
          const Icon = item.icon;

          return (
            <>
            <div onClick={() => handleActiveTab(item.name)} className={`cursor-pointer flex justify-between items-center flex-col ${activeStep == item.name ? 'text-blue' : 'text-[#888888]'}`}>
              <div className="flex justify-between items-center flex-col gap-2  p-2">
                <div
                  key={item.name}
                  className="flex-1 flex items-center"
                >
                  <Icon className="w-8 h-8" />
                </div>
                <p className="font-medium text-base">{item.name}</p>
              </div>
              {activeStep == item.name && <div className="border-b-2 w-full border-blue"></div>}
            </div>
            {index != kycList.length - 1 && <hr className="border-1 text-[#CCCCCC] h-[50%]"/>}
            </>
          );
        })}
      </div>}

        <div className="w-full flex flex-col py-4 items-center gap-6">
            {!isKycComplete && <p className="text-blue text-xl font-semibold">{renderTitle()}</p>}
            {!isKycComplete ? <>
            {activeStep == 'Photo Upload' && <UploadPhoto/>}
            {activeStep == 'Aadhar Verification' && <AadharVerification/>}
            {activeStep == 'Bank Details' && <BankDetails/>}
            {activeStep == 'Agreement Signature' && <AggrementVerification event={event}/>}
            </> :
            <KycSuccess/>}
        </div>
    </div>
  );
}
