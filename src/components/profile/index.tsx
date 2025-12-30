'use client'

import { getKycStatusApiHandler, KycStatusResponse } from "@/services/kycService";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";


export default function UserProfile() {
    const router = useRouter()
    const [kycVerificationPending, setKycVerificationPending] = useState(false)
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

  useEffect(() => {
    if(kycDetails){
        if(kycDetails.kyc_completed){
            setKycVerificationPending(true)
        }
    }
  },[kycDetails])
  return (
    <div className="w-full bg-white rounded-xl flex justify-center items-center p-3">
        <div className="bg-light-purple w-[400px] h-auto p-3 flex flex-col justify-center items-center gap-3 border border-[#757BEE] rounded-xl">
            <Image src='/assets/kyc-info.svg' width={50} height={50} alt='kyc-info' />
            <p className="font-medium text-text-black text-base">{!kycVerificationPending ? 'Your E-KYC is remaning' : 'E-KYC Done'}</p>
            {!kycVerificationPending && <button
                onClick={() => {
                    router.push('/kyc')
                }} 
                className="w-full md:w-auto text-sm 1xl:text-base animated-button px-12 py-3 border border-blue text-center cursor-pointer"
            >
                <span className="gap-3 relative">
                <p className="text-nowrap">
                   Complete kyc
                </p>
                </span>
            </button>}
        </div>
   </div>
  );
}
