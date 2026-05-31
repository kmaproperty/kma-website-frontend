"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";

import OtpInput from "../common/optInput";
import Spinner from "../common/spinner";
import { OTP_RESEND_TIME } from "@/lib/enums";
import { createURLSearchParam, setAuthCookies } from "@/lib/helper";
import { matchIsNumeric } from "@/lib/commonValidator";
import {
  EndUserVerifyOtpPayload,
  verifyEndUserSignupOtpApiHandler,
  ValidateOtpResponse,
  sendEndUserSignupOtpApiHandler,
  EndUserSignupPayload,
  EndUserSignupResponse,
} from "@/services/authService";

export default function EndUserSignupOtpCard() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();

  const mobileNumber = searchParams.get("mobile");
  const code = searchParams.get("code");
  const fullName = searchParams.get("fullName");
  const email = searchParams.get("email");
  const redirect = searchParams.get("redirect");

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpTimer, setOtpTimer] = useState(OTP_RESEND_TIME);
  const [isEnableOtpResend, setIsEnableOtpResend] = useState(false);

    // State to manage premium popup visibility
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [targetRedirectUrl, setTargetRedirectUrl] = useState("/");

  const { mutate: resendOtp } = useMutation({
    mutationFn: (payload: EndUserSignupPayload): Promise<EndUserSignupResponse> =>
      sendEndUserSignupOtpApiHandler(payload),
    onSuccess: (response) => {
      toast.success(response.message ?? "OTP sent successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Unable to resend OTP");
    },
  });

  const { mutate: verifyOtp, isPending } = useMutation({
    mutationFn: (payload: EndUserVerifyOtpPayload): Promise<ValidateOtpResponse> =>
      verifyEndUserSignupOtpApiHandler(payload),
    onSuccess: async (response) => {
      await setAuthCookies(response.accessToken, response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      toast.success(response.message);
      queryClient.clear();
       // Calculate redirect path and save it in state instead of immediate redirect
      const safeRedirect =
        redirect && redirect.startsWith("/") && !redirect.startsWith("//") ? redirect : null;
      setTargetRedirectUrl(safeRedirect ?? "/");
      
      // Trigger the premium congrats popup modal
      setShowWelcomePopup(true);
    },
    onError: (error: any) => {
      setOtpError(error?.message ?? "Invalid OTP");
    },
  });

  const handlePopupCloseAndRedirect = () => {
      // Blast a massive premium confetti explosion from the center/bottom
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#B38728", "#FBF5B7", "#D4AF37", "#FFFFFF"], // Custom Gold & Premium Theme Colors
      });
  
      // Wait for 900ms so user can enjoy the celebration animation before popup closes
      setTimeout(() => {
        setShowWelcomePopup(false); // Close Popup
        
        if (typeof window !== "undefined") {
          window.location.href = targetRedirectUrl;
        } else {
          router.replace(targetRedirectUrl);
        }
      }, 900);
    };

  const handleOtpResend = () => {
    if (!isEnableOtpResend || !mobileNumber || !fullName || !email || isPending) return;
    resendOtp({ name: fullName, email, phone: mobileNumber });
    setOtpTimer(OTP_RESEND_TIME);
    setIsEnableOtpResend(false);
  };

  const handleChangeNumber = () => {
    const params = createURLSearchParam({ mobile: mobileNumber, code });
    router.replace(`/user-flow${params}`);
  };

  const handleVerifyOtp = (value: string) => {
    if (!mobileNumber || !fullName || !email || value.length !== 4) {
      setOtpError("Enter OTP");
      return;
    }
    setOtpError("");
    verifyOtp({ name: fullName, email, phone: mobileNumber, otp: value });
  };

  useEffect(() => {
    if (!mobileNumber || !fullName || !email) {
      router.replace("/user-flow");
      return;
    }
  }, [mobileNumber, fullName, email, router]);

  useEffect(() => {
    if (otpTimer <= 0) {
      setIsEnableOtpResend(true);
      return;
    }
    const interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

  const formattedTimer = useMemo(() => {
    return otpTimer > 0 ? `0:${otpTimer < 10 ? `0${otpTimer}` : otpTimer}` : "";
  }, [otpTimer]);

  return (
    <div className="relative">

    
    <div
      className="bg-white w-full md:min-w-[420px] h-auto rounded-[16px] p-6 md:p-8"
      style={{ boxShadow: "0px 4px 20px 0px #0000000D", flexGrow: 11 }}
    >
      <p className="text-text-black font-semibold text-3xl leading-[2.3rem] mb-2">Verify Your Mobile Number</p>
      <p className="text-sm md:text-base text-text-gray">
        We&apos;ve sent a 4-digit OTP to your mobile number{" "}
        <span className="text-blue font-medium">
          {code}
          {mobileNumber ? `-${mobileNumber}` : ""}
        </span>
      </p>
      <p className="text-sm md:text-base text-text-gray mb-6">
        Not your number?{" "}
        <span onClick={handleChangeNumber} className="text-blue italic underline cursor-pointer">
          Change
        </span>
      </p>

      <p className="text-sm lg:text-base text-text-black font-medium pb-3">Enter the OTP below to continue</p>
      <OtpInput
        length={4}
        value={otp}
        onChange={(value) => {
          setOtp(value);
          setOtpError("");
        }}
        onComplete={handleVerifyOtp}
        validateChar={matchIsNumeric}
      />
      {otpError && <p className="text-red-500 text-xs pt-2">{otpError}</p>}

      <div className="flex flex-col justify-center gap-4 items-start mt-8">
        <button
          disabled={isPending}
          onClick={() => handleVerifyOtp(otp)}
          className="animated-button px-12 py-3 border border-blue text-center text-sm cursor-pointer"
        >
          <span className="gap-3 relative">
            {!isPending ? <p className="text-nowrap">Verify OTP</p> : <Spinner size={20} className="h-[24px]" />}
          </span>
        </button>
        <p className="text-sm lg:text-base text-text-gray">
          Didn&apos;t get the code?
          <span onClick={handleOtpResend} className={`text-sm cursor-pointer ml-1 ${otpTimer > 0 ? "text-text-gray" : "text-text-black"}`}>
            Resend OTP <span className="text-text-black">{otpTimer > 0 ? `in ${formattedTimer}` : ""}</span>
          </span>
        </p>
      </div>
    </div>
     {showWelcomePopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div 
            className="relative w-full max-w-[440px] bg-[#ffffff] rounded-[24px] border-2 border-[#D4AF37]/40 p-8 text-center text-white overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)]"
          >
            {/* Background Soft Confetti Elements or Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

            {/* Glowing Reward Coin Container */}
            <div className="flex justify-center mb-6">
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.2)] animate-pulse">
                {/* Coin image placeholder or Icon matching your aesthetic */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#B38728] via-[#FBF5B7] to-[#AA771C] flex items-center justify-center font-bold text-xl text-[#5C4008] border border-[#FFF]/30 shadow-inner">
                  🪙
                </div>
              </div>
            </div>

            {/* Main Headlines */}
            <h2 className="text-3xl font-bold tracking-tight text-blue mb-2">
              Welcome to KMA 🎉
            </h2>
            <p className="text-lg font-semibold text-blue mb-6">
              You earned your first coin!
            </p>

            {/* Notification Badge Info Box */}
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl py-3 px-4 mb-8">
              <p className="text-sm text-gray-300 font-medium">+1 Coin added successfully</p>
              <p className="text-xs text-gray-500 mt-0.5">Keep coming back for more rewards 🔥</p>
            </div>

            {/* Action CTA Button */}
            <button
              onClick={handlePopupCloseAndRedirect}
              className="w-full bg-gradient-to-r from-blue to-blue font-bold text-base py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_15px_rgba(212,175,55,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Claim & Explore</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
