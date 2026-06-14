// "use client";

// import { useEffect, useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "nextjs-toploader/app";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";

// import OtpInput from "../common/optInput";
// import Spinner from "../common/spinner";
// import { OTP_RESEND_TIME, USER_TYPE } from "@/lib/enums";
// import { matchIsNumeric } from "@/lib/commonValidator";
// import { createURLSearchParam, setAuthCookies } from "@/lib/helper";
// import {
//   OtpPayload,
//   resendOtpApiHandler,
//   SendOtpResponse,
//   validateOtpApiHandler,
//   ValidateOtpPayload,
//   ValidateOtpResponse,
// } from "@/services/authService";
// import { UserType } from "@/types/user";
// import { resetForm } from "@/store/createAccountSlice";

// export default function SignupOtpCard() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const mobileNumber = searchParams.get("mobile");
//   const code = searchParams.get("code");
//   const ownerType = searchParams.get("ownerType");
//   const propertyIntent = searchParams.get("propertyIntent");

//   const [otp, setOtp] = useState("");
//   const [otpError, setOtpError] = useState("");
//   const [otpTimer, setOtpTimer] = useState(OTP_RESEND_TIME);
//   const [isEnableOtpResend, setIsEnableOtpResend] = useState(false);

//   const { mutate: handleVerifyOtp, isPending } = useMutation({
//     mutationFn: async (payload: ValidateOtpPayload): Promise<ValidateOtpResponse> => {
//       return await validateOtpApiHandler(payload);
//     },
//     onSuccess: async (response: ValidateOtpResponse) => {
//       await setAuthCookies(response.accessToken, response.refreshToken);
//       localStorage.setItem("user", JSON.stringify(response.user));
//       const params = createURLSearchParam({
//         ...(ownerType == USER_TYPE.OWNER ? { propertyIntent: propertyIntent } : ""),
//       });
//       dispatch(resetForm());
//       setTimeout(() => {
//         router.replace(`/create-account${params}`);
//       }, 300);
//     },
//     onError: (error: any) => {
//       setOtpError(error?.message);
//     },
//   });

//   const { mutate: handleResendOtp } = useMutation({
//     mutationFn: async (payload: OtpPayload): Promise<SendOtpResponse> => {
//       return await resendOtpApiHandler(payload);
//     },
//     onSuccess: (response: SendOtpResponse) => {
//       toast.success(response.message ?? "OTP sent successfully");
//     },
//     onError: (error: any) => {
//       if (Array.isArray(error.message)) {
//         error.message.forEach((item: string) => toast.error(item));
//       } else {
//         toast.error(error.message);
//       }
//     },
//   });

//   const verifyOtp = (value: string) => {
//     if (ownerType && mobileNumber && value.length == 4) {
//       const payload: ValidateOtpPayload = {
//         phone: mobileNumber,
//         otp: value,
//         role: ownerType as UserType,
//       };
//       setOtpError("");
//       handleVerifyOtp(payload);
//     }
//   };

//   const handleOtpResend = () => {
//     if (isPending || !isEnableOtpResend) {
//       return;
//     }
//     setOtpTimer(OTP_RESEND_TIME);
//     setIsEnableOtpResend(false);
//     if (mobileNumber) {
//       handleResendOtp({ phone: mobileNumber });
//     }
//   };

//   const handleChangeNumber = () => {
//     const params = createURLSearchParam({
//       mobile: mobileNumber,
//       code,
//       ownerType,
//       ...(ownerType == USER_TYPE.OWNER ? { propertyIntent } : ""),
//       postProperty: true,
//     });
//     router.replace(`/user-flow${params}`);
//   };

//   useEffect(() => {
//     if (!mobileNumber || !ownerType) {
//       router.replace("/user-flow");
//       return;
//     }
//   }, [mobileNumber, ownerType, router]);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (otpTimer > 0) {
//       setIsEnableOtpResend(false);
//       interval = setInterval(() => {
//         setOtpTimer((prev) => prev - 1);
//       }, 1000);
//     } else {
//       setIsEnableOtpResend(true);
//     }
//     return () => clearInterval(interval);
//   }, [otpTimer]);

//   return (
//     <div
//       className="bg-white w-full md:min-w-[420px] h-auto rounded-[16px] p-6 md:p-8"
//       style={{ boxShadow: "0px 4px 20px 0px #0000000D", flexGrow: "11" }}
//     >
//       <p className="text-text-black font-semibold text-3xl leading-[2.3rem] mb-2">Verify Your Mobile Number</p>
//       <p className="text-sm md:text-base text-text-gray">
//         We've sent a 4-digit OTP to your number <span className="text-blue">+91-XXXXXXXXXX</span>. Verify to access your all the features.
//       </p>
//       <p className="text-sm md:text-base text-text-gray mb-6">
//         Not your number?{" "}
//         <span onClick={handleChangeNumber} className="text-blue italic underline cursor-pointer">
//           Change
//         </span>
//       </p>

//       <div className="flex flex-col gap-6 w-full">
//         <div>
//           <p className="text-sm lg:text-base text-text-black font-medium pb-3">Enter the OTP below to continue</p>
//           <OtpInput
//             length={4}
//             value={otp}
//             onChange={(val) => {
//               setOtp(val);
//               setOtpError("");
//             }}
//             onComplete={verifyOtp}
//             validateChar={matchIsNumeric}
//           />
//           {otpError && <p className="text-red-500 text-xs pt-2">{otpError}</p>}
//         </div>
//         <div className="flex flex-col justify-center gap-4 items-start">
//           <button
//             disabled={isPending}
//             onClick={() => verifyOtp(otp)}
//             className="animated-button px-12 py-3 border border-blue text-center text-sm cursor-pointer"
//           >
//             <span className="gap-3 relative">
//               {!isPending ? <p className="text-nowrap">Verify OTP</p> : <Spinner size={20} className="h-[24px]" />}
//             </span>
//           </button>
//           <p className="text-sm lg:text-base text-text-gray">
//             Didn&apos;t get the code?
//             <span onClick={handleOtpResend} className={`text-sm cursor-pointer ml-1 ${otpTimer > 0 ? "text-text-gray" : "text-text-black"}`}>
//               Resend OTP <span className="text-text-black">{otpTimer > 0 ? `in 0:${otpTimer < 10 ? `0${otpTimer}` : otpTimer}` : ""}</span>
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import confetti from "canvas-confetti";

import OtpInput from "../common/optInput";
import Spinner from "../common/spinner";
import { OTP_RESEND_TIME, USER_TYPE } from "@/lib/enums";
import { matchIsNumeric } from "@/lib/commonValidator";
import { createURLSearchParam, setAuthCookies } from "@/lib/helper";
import {
  OtpPayload,
  resendOtpApiHandler,
  SendOtpResponse,
  validateOtpApiHandler,
  ValidateOtpPayload,
  ValidateOtpResponse,
} from "@/services/authService";
import { UserType } from "@/types/user";
import { resetForm } from "@/store/createAccountSlice";

export default function SignupOtpCard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const mobileNumber = searchParams.get("mobile");
  const code = searchParams.get("code");
  const ownerType = searchParams.get("ownerType");
  const propertyIntent = searchParams.get("propertyIntent");

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpTimer, setOtpTimer] = useState(OTP_RESEND_TIME);
  const [isEnableOtpResend, setIsEnableOtpResend] = useState(false);

  // 🎯 PREMIUM POPUP STATES: Control overlays and targeting redirects
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [targetRedirectUrl, setTargetRedirectUrl] = useState("");

  const { mutate: handleVerifyOtp, isPending } = useMutation({
    mutationFn: async (payload: ValidateOtpPayload): Promise<ValidateOtpResponse> => {
      return await validateOtpApiHandler(payload);
    },
    onSuccess: async (response: ValidateOtpResponse) => {
      await setAuthCookies(response.accessToken, response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      
      const params = createURLSearchParam({
        ...(ownerType == USER_TYPE.OWNER ? { propertyIntent: propertyIntent } : ""),
      });
      
      dispatch(resetForm());

      setTargetRedirectUrl(`/create-account${params}`);
      setShowWelcomePopup(true);
    },
    onError: (error: any) => {
      setOtpError(error?.message ?? "Invalid OTP");
    },
  });

  const handlePopupCloseAndRedirect = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#B38728", "#FBF5B7", "#D4AF37", "#FFFFFF"],
    });

    setTimeout(() => {
      setShowWelcomePopup(false);
      if (typeof window !== "undefined") {
        window.location.href = targetRedirectUrl;
      } else {
        router.replace(targetRedirectUrl);
      }
    }, 900);
  };

  const { mutate: handleResendOtp } = useMutation({
    mutationFn: async (payload: OtpPayload): Promise<SendOtpResponse> => {
      return await resendOtpApiHandler(payload);
    },
    onSuccess: (response: SendOtpResponse) => {
      toast.success(response.message ?? "OTP sent successfully");
    },
    onError: (error: any) => {
      if (Array.isArray(error.message)) {
        error.message.forEach((item: string) => toast.error(item));
      } else {
        toast.error(error.message);
      }
    },
  });

  const verifyOtp = (value: string) => {
    if (ownerType && mobileNumber && value.length == 4) {
      const payload: ValidateOtpPayload = {
        phone: mobileNumber,
        otp: value,
        role: ownerType as UserType,
      };
      setOtpError("");
      handleVerifyOtp(payload);
    }
  };

  const handleOtpResend = () => {
    if (isPending || !isEnableOtpResend) {
      return;
    }
    setOtpTimer(OTP_RESEND_TIME);
    setIsEnableOtpResend(false);
    if (mobileNumber) {
      handleResendOtp({ phone: mobileNumber });
    }
  };

  const handleChangeNumber = () => {
    const params = createURLSearchParam({
      mobile: mobileNumber,
      code,
      ownerType,
      ...(ownerType == USER_TYPE.OWNER ? { propertyIntent } : ""),
      postProperty: true,
    });
    router.replace(`/user-flow${params}`);
  };

  useEffect(() => {
    if (!mobileNumber || !ownerType) {
      router.replace("/user-flow");
      return;
    }
  }, [mobileNumber, ownerType, router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      setIsEnableOtpResend(false);
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsEnableOtpResend(true);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  return (
    <div className="relative">
      <div
        className="bg-white w-full md:min-w-[420px] h-auto rounded-[16px] p-6 md:p-8"
        style={{ boxShadow: "0px 4px 20px 0px #0000000D", flexGrow: "11" }}
      >
        <p className="text-text-black font-semibold text-3xl leading-[2.3rem] mb-2">Verify Your Mobile Number</p>
        <p className="text-sm md:text-base text-text-gray">
          We've sent a 4-digit OTP to your number <span className="text-blue">+91-XXXXXXXXXX</span>. Verify to access your all the features.
        </p>
        <p className="text-sm md:text-base text-text-gray mb-6">
          Not your number?{" "}
          <span onClick={handleChangeNumber} className="text-blue italic underline cursor-pointer">
            Change
          </span>
        </p>

        <div className="flex flex-col gap-6 w-full">
          <div>
            <p className="text-sm lg:text-base text-text-black font-medium pb-3">Enter the OTP below to continue</p>
            <OtpInput
              length={4}
              value={otp}
              onChange={(val) => {
                setOtp(val);
                setOtpError("");
              }}
              onComplete={verifyOtp}
              validateChar={matchIsNumeric}
            />
            {otpError && <p className="text-red-500 text-xs pt-2">{otpError}</p>}
          </div>
          <div className="flex flex-col justify-center gap-4 items-start">
            <button
              disabled={isPending}
              onClick={() => verifyOtp(otp)}
              className="animated-button px-12 py-3 border border-blue text-center text-sm cursor-pointer"
            >
              <span className="gap-3 relative">
                {!isPending ? <p className="text-nowrap">Verify OTP</p> : <Spinner size={20} className="h-[24px]" />}
              </span>
            </button>
            <p className="text-sm lg:text-base text-text-gray">
              Didn&apos;t get the code?
              <span onClick={handleOtpResend} className={`text-sm cursor-pointer ml-1 ${otpTimer > 0 ? "text-text-gray" : "text-text-black"}`}>
                Resend OTP <span className="text-text-black">{otpTimer > 0 ? `in 0:${otpTimer < 10 ? `0${otpTimer}` : otpTimer}` : ""}</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {showWelcomePopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div 
            className="relative w-full max-w-[440px] bg-[#ffffff] rounded-[24px] border-2 border-[#D4AF37]/40 p-8 text-center text-white overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

            {/* Glowing Coin Grid */}
            <div className="flex justify-center mb-6">
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.2)] animate-pulse">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#B38728] via-[#FBF5B7] to-[#AA771C] flex items-center justify-center font-bold text-xl text-[#5C4008] border border-[#FFF]/30 shadow-inner">
                  🪙
                </div>
              </div>
            </div>

            {/* Headlines */}
            <h2 className="text-3xl font-bold tracking-tight text-blue mb-2">
              Welcome to KMA 🎉
            </h2>
            <p className="text-lg font-semibold text-blue mb-6">
              You earned your first coin!
            </p>

            {/* Notification Info Box */}
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl py-3 px-4 mb-8">
              <p className="text-sm text-text-black font-medium">+1 Coin added successfully</p>
              <p className="text-xs text-text-gray mt-0.5">Keep coming back for more rewards 🔥</p>
            </div>

            {/* Action CTA Button */}
            <button
              onClick={handlePopupCloseAndRedirect}
              className="w-full bg-blue font-bold text-base py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_15px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 text-white cursor-pointer"
            >
              <span>Claim & Explore</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}