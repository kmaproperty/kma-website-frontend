import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";

export default function KycSuccess(){
  const router = useRouter()
    return(
        <div className="flex flex-col justify-center items-center gap-2">
            <Image src='/assets/kyc-success.svg' width={150} height={150} alt="success" />
            <p className="text-blue text-base font-bold">KYC Details Added Successfully!</p>
            <p className="text-text-gray text-sm font-semibold">Profile Complete</p>
            <div className="flex flex-wrap justify-center gap-2 mt-8">
               <button onClick={() => {
                router.push('/user-dashboard')
               }}  className="w-full md:w-[130px] text-sm 1xl:text-base px-12 py-3 border border-blue text-center cursor-pointer rounded-full bg-light-purple">
                 <span className="gap-3 relative flex justify-center">
                     <p className={`text-nowrap font-medium`}>Back to Home</p>
                   </span>
               </button>
       
               <button
                 className="w-full md:w-[170px] px-12 py-3 animated-button border border-blue"
                 onClick={() => {
                  router.push('/profile')
                 }}
               >
                 <span className="gap-3 relative flex justify-center">
                       <p className={`text-nowrap`}>Back to your profile</p>
                   </span>
               </button>
             </div>
        </div>
    )
}