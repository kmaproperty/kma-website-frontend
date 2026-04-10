"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "react-toastify";

import MobileInput from "../common/mobileInput";
import Spinner from "../common/spinner";
import { mobileNumberValidator } from "@/lib/commonValidator";
import { createURLSearchParam } from "@/lib/helper";
import {
  OtpPayload,
  sendSignInOtpApiHandler,
  SendOtpResponse,
  EndUserLoginPayload,
  EndUserSignupResponse,
  sendEndUserLoginOtpApiHandler,
} from "@/services/authService";

type LoginRole = "END_USER" | "OWNER_CP";

interface MobileState {
  value: string;
  code: string;
  validationMessage: string;
}

export default function LoginCard() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");

  const [loginRole, setLoginRole] = useState<LoginRole>("OWNER_CP");
  const [mobileInput, setMobileInput] = useState<MobileState>({
    value: "",
    code: "+91",
    validationMessage: "",
  });

  const handleMobileInputChange = (value: string, code: string) => {
    const validationMessage = mobileInput.validationMessage ? mobileNumberValidator(value) : "";
    setMobileInput({ value, code, validationMessage });
  };

  const { mutate: sendOwnerCpOtp, isPending: isOwnerCpPending } = useMutation({
    mutationFn: async (payload: OtpPayload): Promise<SendOtpResponse> => sendSignInOtpApiHandler(payload),
    onSuccess: (response) => {
      const params = createURLSearchParam({
        mobile: mobileInput.value,
        code: mobileInput.code,
        isOtp: true,
        flow: "login",
        ...(redirect ? { redirect } : {}),
      });
      toast.success(response.otp);
      router.replace(`${pathname}${params}`);
    },
    onError: (error: any) => {
      if (Array.isArray(error?.message)) {
        error.message.forEach((item: string) => toast.error(item));
        return;
      }
      toast.error(error?.message ?? "Unable to send OTP");
    },
  });

  const { mutate: sendEndUserOtp, isPending: isEndUserPending } = useMutation({
    mutationFn: async (payload: EndUserLoginPayload): Promise<EndUserSignupResponse> =>
      sendEndUserLoginOtpApiHandler(payload),
    onSuccess: (response) => {
      const params = createURLSearchParam({
        mobile: mobileInput.value,
        code: mobileInput.code,
        isOtp: true,
        flow: "enduser-login",
        ...(redirect ? { redirect } : {}),
      });
      toast.success(response.otp);
      router.replace(`${pathname}${params}`);
    },
    onError: (error: any) => {
      if (Array.isArray(error?.message)) {
        error.message.forEach((item: string) => toast.error(item));
        return;
      }
      toast.error(error?.message ?? "Unable to send OTP");
    },
  });

  const isPending = isOwnerCpPending || isEndUserPending;

  const handleContinue = () => {
    const validationMessage = mobileNumberValidator(mobileInput.value);
    if (validationMessage) {
      setMobileInput((prev) => ({ ...prev, validationMessage }));
      return;
    }
    if (loginRole === "END_USER") {
      sendEndUserOtp({ phone: mobileInput.value });
    } else {
      sendOwnerCpOtp({ phone: mobileInput.value });
    }
  };

  const handleCreateAccountRedirect = () => {
    const params = createURLSearchParam({
      ...(loginRole === "OWNER_CP" ? { postProperty: true } : {}),
      ...(mobileInput.value ? { mobile: mobileInput.value } : {}),
      ...(redirect ? { redirect } : {}),
      ...(loginRole === "OWNER_CP" ? { postProperty: true } : {}),
    });
    router.replace(`${pathname}${params}`);
  };

  return (
    <div
      className="bg-white w-full md:min-w-[420px] h-auto rounded-[16px] p-6 md:p-8"
      style={{ boxShadow: "0px 4px 20px 0px #0000000D", flexGrow: 11 }}
    >
      <p className="text-text-black font-semibold text-[2rem] leading-[2.3rem] mb-2">
        Welcome Back!
      </p>
      <p className="text-sm md:text-base text-text-gray pb-4 border-b border-border">
        Login to your KMA account to continue.
      </p>

      <p className="text-sm lg:text-base text-text-black font-medium mt-6 mb-2">I am a</p>
      <div className="flex gap-3 mb-6">
        <button
          type="button"
          onClick={() => { window.location.href = `${process.env.NEXT_PUBLIC_BUYER_URL || "http://localhost:3001"}/user-flow?isLogin=true`; }}
          className="flex-1 py-2.5 px-4 rounded-full text-sm font-medium border transition cursor-pointer bg-white text-text-black border-border hover:border-blue"
        >
          User
        </button>
        <button
          type="button"
          className="flex-1 py-2.5 px-4 rounded-full text-sm font-medium border transition cursor-pointer bg-blue text-white border-blue"
        >
          Owner / Channel Partner
        </button>
      </div>

      <p className="text-sm lg:text-base text-text-black font-medium">Mobile Number</p>
      <p className="text-sm text-text-gray mb-2">We&apos;ll send you a verification code to get started.</p>
      <MobileInput
        placeHolder="Enter your mobile number"
        required={true}
        validationMessage={mobileInput.validationMessage}
        value={mobileInput.value}
        countryCode={mobileInput.code}
        onChange={handleMobileInputChange}
      />

      <div className="flex justify-start flex-col md:flex-row gap-4 items-center mt-8">
        <button
          disabled={isPending}
          onClick={handleContinue}
          className="w-full md:w-[150px] text-sm animated-button px-12 py-3 border border-blue text-center cursor-pointer"
        >
          <span className="gap-3 relative flex justify-center">
            {!isPending ? <p className="text-nowrap">Continue</p> : <Spinner size={20} className="h-[24px]" />}
          </span>
        </button>
        <p className="text-sm text-text-gray">
          New to KMA?{" "}
          <span onClick={handleCreateAccountRedirect} className="font-semibold underline text-text-black cursor-pointer">
            Create your account
          </span>
        </p>
      </div>
    </div>
  );
}
