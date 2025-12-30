import { InputBase } from "@mui/material"
import FullscreenSpinner from "../common/spinner/fullScreenSpinner"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { aadharVerifyApiHandler, aadharVerifyGetApiHandler, AadharVerifyGetApiHandler, AadharVerifyPayload, AadharVerifyResponse } from "@/services/kycService"
import { toast } from "react-toastify"
import { useRouter } from "nextjs-toploader/app"

export default function AadharVerification(){
    const router = useRouter()
    const [aadharNumber, setAadharNumber] = useState('')
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [codeError, setCodeError] = useState('')
    const [isVerified, setIsVerified] = useState(false)

      const dynamicClass = (flag: string) => {
    return `
                  box-border h-[47.81px] px-4 py-2 text-sm rounded-full 
                  border focus:outline-none
                  ${
                    Boolean(flag)
                      ? "border-red-500 focus:border-red-500"
                      : "border-border focus:border-blue"
                  }
                  text-text-gray
                `;
  };

  const { mutate: handleAdharVerify, isPending: loader } = useMutation({
    mutationFn: async (
      payload: AadharVerifyPayload
    ): Promise<AadharVerifyResponse> => {
      return await aadharVerifyApiHandler(payload);
    },
    onSuccess: (response: AadharVerifyResponse) => {
        toast.success(response.message)
    },
    onError: (error: any) => {
      if (Array.isArray(error.message)) {
        error.message.map((item: string) => {
          toast.error(item);
        });
      } else {
        toast.error(error.message);
      }
    },
  });

  const { data: aadharDetails, isLoading: detailsLoader } = useQuery({
    queryKey: ["live-photo"],
    queryFn: async (): Promise<AadharVerifyGetApiHandler> => {
      return aadharVerifyGetApiHandler();
    },
    select: (resposne: AadharVerifyGetApiHandler) => {
      console.log("uploadDetails", resposne);
      return resposne;
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  useEffect(() => {
    if(aadharDetails){
      setAadharNumber(aadharDetails?.aadhaar_number)
      setIsVerified(aadharDetails?.aadhaar_verified)
    }
  },[aadharDetails])

  const handleCancel = () => {
    router.push('/profile')
  }
    return(
       <>
           { false ?
               <FullscreenSpinner/> : 
           
           
           <div className="w-[50%]">
            
                <p className="required-label text-sm 1xl:text-base text-text-black pb-2">
                Enter your aadhar number
                </p>
                <div>
                <InputBase
                    placeholder="Aadhar number"
                    fullWidth
                    disabled={isVerified}
                    value={aadharNumber}
                    onChange={(e) => {
                        const value = e.target.value
                        const isOnlyDigits = /^\d*$/.test(value);
                        if(!isOnlyDigits) return
                        if(value.length > 12) return
                        setAadharNumber(value)
                        setError('')
                    }}
                    className={dynamicClass(error)}
                    inputProps={{
                    className: "placeholder-gray",
                    }}
                />
                {error && (
                    <p className="pt-1 text-red-500 text-xs">
                    {error}
                    </p>
                )}
                </div>  
                <p className="text-end text-blue underline py-2">Resend code</p> 
                 <p className="required-label text-sm 1xl:text-base text-text-black pb-2">
               Enter the code received on your register mobile number
                </p>
                <div>
                <InputBase
                    placeholder="Enter code"
                    disabled={isVerified}
                    fullWidth
                    value={code}
                    onChange={(e) => {
                        const value = e.target.value
                        const isOnlyDigits = /^\d*$/.test(value);
                        if(!isOnlyDigits) return
                        if(value.length > 4) return
                        setCode(value)
                        setCodeError('')
                    }}  
                    className={dynamicClass(error)}
                    inputProps={{
                    className: "placeholder-gray",
                    }}
                />
                {codeError && (
                    <p className="pt-1 text-red-500 text-xs">
                    {codeError}
                    </p>
                )}
                </div>  

             {/* Submit / Cancel */}
             <div className="flex flex-wrap justify-center gap-2 mt-8">
               <button onClick={handleCancel}  className="w-full md:w-[130px] text-sm 1xl:text-base px-12 py-3 border border-blue text-center cursor-pointer rounded-full bg-light-purple">
                 <span className="gap-3 relative flex justify-center">
                     <p className={`text-nowrap font-medium`}>Cancel</p>
                   </span>
               </button>
       
               <button
                 disabled={loader || isVerified}
                 className="w-full md:w-[130px] px-12 py-3 animated-button border border-blue"
                 onClick={() => {
                  let hasError = false
                  if(!aadharNumber){
                    setError('Aadhar number is required')
                    hasError = true
                  }
                  if(aadharNumber.length != 12){
                    setError('Enter valid 12 digit aadhar number')
                    hasError = true
                  }

                  if(!code){
                    setCodeError('Code is required')
                    hasError = true
                  }

                  if(hasError){
                    return
                  }

                   handleAdharVerify({aadhaar_number: aadharNumber,otp: code })
                 }}
               >
                 <span className="gap-3 relative flex justify-center">
                       <p className={`text-nowrap`}>Submit</p>
                   </span>
               </button>
             </div>
           </div>
       
               }
            </>
    )
}