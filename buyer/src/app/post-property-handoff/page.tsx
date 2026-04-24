"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "react-toastify";
import OtpInput from "@/components/common/optInput";
import Spinner from "@/components/common/spinner";
import { setAuthCookies } from "@/lib/helper";
import {
  sendUpgradeOtpApiHandler,
  upgradeToOwnerApiHandler,
} from "@/services/userService";

const SELLER_URL = process.env.NEXT_PUBLIC_SELLER_URL ?? "https://seller.kmaglobalproperty.com";
const SELLER_TARGET = `${SELLER_URL.replace(/\/$/, "")}/post-property`;
const OTP_RESEND_SECONDS = 30;

type Step = "sending" | "otp" | "verifying" | "redirecting" | "error";

/**
 * Bridge page between buyer and seller for the "Post Property" CTA.
 *
 * Flow:
 *  1. Not logged in → bounce to /user-flow?isLogin=true with this page as redirect.
 *  2. Already OWNER / CHANNEL_PARTNER → send-otp no-ops, upgrade-to-owner no-ops,
 *     we forward straight to seller/post-property with fresh tokens.
 *  3. END_USER → send an OTP to their registered phone, ask them to verify, then
 *     call POST /users/upgrade-to-owner with the OTP. On success write the new
 *     OWNER tokens to the shared cookie and redirect to seller/post-property.
 */
export default function PostPropertyHandoffPage() {
  const router = useRouter();
  const initRef = useRef(false);
  const [step, setStep] = useState<Step>("sending");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [phoneMasked, setPhoneMasked] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(OTP_RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);

  const hasSession = () =>
    typeof document !== "undefined" &&
    document.cookie.split(";").some((c) => c.trim().startsWith("kma_user="));

  const readStoredPhone = (): string | null => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem("user") : null;
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return typeof parsed?.phone === "string" ? parsed.phone : null;
    } catch {
      return null;
    }
  };

  const maskPhone = (phone: string | null) => {
    if (!phone) return "";
    const digits = phone.replace(/\D/g, "").slice(-10);
    if (digits.length < 10) return phone;
    return `+91 ${digits.slice(0, 2)}****${digits.slice(6)}`;
  };

  const redirectToSeller = (accessToken: string, refreshToken: string, user: unknown) => {
    setStep("redirecting");
    setAuthCookies(accessToken, refreshToken).finally(() => {
      try {
        if (user && typeof window !== "undefined") {
          window.localStorage.setItem("user", JSON.stringify(user));
        }
      } catch {
        /* ignore */
      }
      window.location.href = SELLER_TARGET;
    });
  };

  const requestOtp = async () => {
    setOtp("");
    setOtpError(null);
    setStep("sending");
    try {
      const response = await sendUpgradeOtpApiHandler();
      // No-op path: backend tells us the user is already Owner/CP. Finish the
      // upgrade call (which just mints fresh tokens) and redirect.
      if (!response.otp && /already an Owner/i.test(response.message)) {
        const upgradeResponse = await upgradeToOwnerApiHandler();
        redirectToSeller(upgradeResponse.accessToken, upgradeResponse.refreshToken, upgradeResponse.user);
        return;
      }
      if (response.otp) {
        toast.success(`Dev OTP: ${response.otp}`);
      }
      setPhoneMasked(maskPhone(readStoredPhone()));
      setStep("otp");
      setResendTimer(OTP_RESEND_SECONDS);
      setCanResend(false);
    } catch (error: any) {
      const message =
        typeof error?.message === "string"
          ? error.message
          : "Unable to send OTP. Please try again.";
      setErrorMessage(message);
      setStep("error");
    }
  };

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    if (!hasSession()) {
      router.replace("/user-flow?isLogin=true&redirect=/post-property-handoff");
      return;
    }
    void requestOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (step !== "otp") return;
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }
    const timeout = window.setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => window.clearTimeout(timeout);
  }, [step, resendTimer]);

  const handleVerify = async () => {
    if (otp.length !== 4) {
      setOtpError("Enter the 4-digit OTP");
      return;
    }
    setOtpError(null);
    setStep("verifying");
    try {
      const response = await upgradeToOwnerApiHandler(otp);
      redirectToSeller(response.accessToken, response.refreshToken, response.user);
    } catch (error: any) {
      const message =
        typeof error?.message === "string"
          ? error.message
          : "Invalid OTP. Please try again.";
      setOtpError(message);
      setStep("otp");
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    void requestOtp();
  };

  if (step === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6 py-10">
        <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
          <h1 className="text-lg font-semibold text-text-black">Something went wrong</h1>
          <p className="mt-3 text-sm text-text-gray">{errorMessage}</p>
          <button
            type="button"
            onClick={() => router.replace("/")}
            className="mt-6 rounded-xl border border-border px-6 py-2 text-sm font-medium text-text-black hover:bg-[#F8F8F9]"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  if (step === "sending" || step === "redirecting") {
    const label = step === "sending" ? "Sending OTP…" : "Opening seller dashboard…";
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6 py-10">
        <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#D0D5DD] border-t-[#05085E]" />
          <h1 className="mt-5 text-lg font-semibold text-text-black">{label}</h1>
          <p className="mt-2 text-sm text-text-gray">Hang on for a second.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-text-black text-center">
          Verify to continue as Owner
        </h1>
        <p className="mt-2 text-sm text-text-gray text-center">
          {phoneMasked
            ? `We sent a 4-digit OTP to ${phoneMasked}.`
            : "We sent a 4-digit OTP to your registered phone."}
          {" "}Enter it below to unlock the Post Property dashboard.
        </p>

        <div className="mt-6 flex justify-center">
          <OtpInput
            length={4}
            value={otp}
            onChange={(v) => {
              setOtp(v);
              if (otpError) setOtpError(null);
            }}
          />
        </div>
        {otpError && (
          <p className="mt-3 text-center text-sm text-red-600">{otpError}</p>
        )}

        <button
          type="button"
          onClick={handleVerify}
          disabled={step === "verifying" || otp.length !== 4}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#05085E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0B127A] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {step === "verifying" ? <Spinner size={20} /> : "Verify & Continue"}
        </button>

        <div className="mt-4 flex items-center justify-center text-sm text-text-gray">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="font-medium text-[#05085E] underline hover:text-[#0B127A]"
            >
              Resend OTP
            </button>
          ) : (
            <span>Resend OTP in {resendTimer}s</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => router.replace("/")}
          className="mt-6 w-full rounded-xl border border-border px-6 py-2 text-sm font-medium text-text-black hover:bg-[#F8F8F9]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
