"use client";
import * as React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import MobileInput from "../common/mobileInput";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { mobileNumberValidator } from "@/lib/commonValidator";
import { useMutation } from "@tanstack/react-query";
import { OtpPayload, sendOtpApiHandler, SendOtpResponse } from "@/services/authService";
import { createURLSearchParam } from "@/lib/helper";
import { toast } from "react-toastify";

interface MobileInput {
  value: string,
  validationMessage: string,
  code: string,
}

export default function SignIn() {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const router = useRouter()
  const isLogin = searchParams.get('isLogin')
  const mobileNumber = searchParams.get('mobileNumber')
  const code = searchParams.get('code')
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileInput, setMobileInput] = React.useState<MobileInput>({value: '', validationMessage: '', code: '+91'})

  const handleMobileInputChange = (value: string, code: string) => {
    const msg = mobileInput.validationMessage ? mobileNumberValidator(value) : ''
    setMobileInput({...mobileInput, value: value, code: code, validationMessage: msg})
  }

  const {
      mutate: handleSendOtp,
      isPending,
    } = useMutation({
      mutationFn: async (payload: OtpPayload): Promise<SendOtpResponse> => {
        return await sendOtpApiHandler(payload);
      },
      onSuccess: (response: SendOtpResponse) => {
        console.log('response', response)
        const params = createURLSearchParam({
          mobile: mobileInput.value,
          code: mobileInput.code,
          isOtp: true
          // ownerType: selectedPartnerType,
          // ...(selectedPartnerType == USER_TYPE.OWNER ? {propertyIntent: propertyIntent,} : '')
        })
        router.push(`${pathname}${params}`);
      },
      onError: (error: any) => {
        console.log('error', error)
        if(Array.isArray(error.message)){
        error.message.map((item: string) => {
          toast.error(item)
        })
      }else{
        toast.error(error.message)
      }
      },
    });

  const handleLogin = () => {
    let msg = mobileNumberValidator(mobileInput.value)
    if(msg){
      setMobileInput({...mobileInput, validationMessage: msg})
      return
    }
    const paylaod = { phone: mobileInput.value}
    handleSendOtp(paylaod)
  }

  const handleClose: DialogProps["onClose"] = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
     router.push(`${pathname}`);
  };

  const createAccountRedirect = () => {
    router.push(`/signup`);
  }

  const openPopup = React.useMemo(() => {
    return isLogin == 'true' ? true : false
  }, [isLogin])

  React.useEffect(() => {
    if(code && mobileNumber){
      setMobileInput({validationMessage: '', value: mobileNumber, code: code})
    }
  },[mobileNumber, code])

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={openPopup}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        slotProps={{
          paper: {
            sx: {
              borderRadius: fullScreen ? '' : "1rem",
            },
          },
        }}
      >
        <DialogContent>
          <div >
            <div className="flex justify-end w-full">
              <Image
                onClick={() => {
                   router.push(`${pathname}`);
                }}
                src="/assets/close-icon.svg"
                alt="close"
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </div>
            <div className="flex flex-col items-center gap-4 xl:gap-6 w-full md:w-[400px] p-1">
              <Image
                alt="Login-icon"
                src="/assets/login-logo.svg"
                width={50}
                height={50}
                style={{ width: "287px", height: "150px" }}
              />
              <div className="content-start w-full">
                <p className="text-text-black font-semibold text-2xl pb-1">
                  Welcome Back 👋
                </p>
                <p className="text-base text-text-gray">
                  Log in to explore exclusive properties and connect with
                  trusted owners & partners.
                </p>
              </div>
              <div className="w-full content-start">
                <p className="required-label text-sm lg:text-base 2xl:text-lg text-text-black font-medium pb-1">
                  Mobile Number
                </p>
                <MobileInput required={true} validationMessage={mobileInput.validationMessage} value={mobileInput.value} countryCode={mobileInput.code} onChange={handleMobileInputChange}/>
              </div>
              <div className="flex justify-start flex-col md:flex-row gap-4 items-center">
                <button disabled={isPending} onClick={handleLogin} className="w-full md:w-auto animated-button px-12 py-3 border border-blue text-center cursor-pointer">
                  <span className="gap-3 relative">
                    <p className="text-nowrap">Continue</p>
                  </span>
                </button>
                <p className="text-sm lg:text-sm 2xl:text-lg text-text-gray">
                  New Here?{" "}
                  <span onClick={createAccountRedirect} className="text-sm lg:text-sm 2xl:text-lg font-semibold underline text-text-black cursor-pointer">
                    Create an Account
                  </span>
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
