'use client'

import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";


export default function UserProfile() {
    const router = useRouter()
  return (
    <div className="w-full bg-white rounded-xl flex justify-center items-center p-3">
        <div className="bg-light-purple w-[400px] h-auto p-3 flex flex-col justify-center items-center gap-3 border border-[#757BEE] rounded-xl">
            <Image src='/assets/kyc-info.svg' width={50} height={50} alt='kyc-info' />
            <p className="font-medium text-text-black text-base">Your E-KYC is remaning</p>
            <button
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
            </button>
        </div>
   </div>
  );
}
