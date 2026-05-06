"use client";

import * as React from "react";
import Image from "next/image";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { InputBase } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import MobileInput from "@/components/common/mobileInput";
import OtpInput from "@/components/common/optInput";
import Spinner from "@/components/common/spinner";
import { matchIsNumeric, mobileNumberValidator } from "@/lib/commonValidator";
import { OTP_RESEND_TIME } from "@/lib/enums";
import { useSessionStore } from "@/store/useSessionStore";
import {
  sendEndUserPropertyContactOtpAction,
  submitEndUserPropertyContactAction,
} from "@/api/actions/propertyActions";
import { setAuthCookies } from "@/lib/helper";
import type { Project } from "../_types";

interface ProjectCallBackModalProps {
  open: boolean;
  onClose: () => void;
  project: Project;
}

// "login"  — phone number entry (first step for guests)
// "otp"    — OTP verification
// "form"   — full form (logged-in users who need name/email)
type ModalStep = "login" | "otp" | "form";

const INITIAL_FORM = {
  name: "",
  email: "",
  mobile: "",
  countryCode: "+91",
};

export default function ProjectCallBackModal({
  open,
  onClose,
  project,
}: ProjectCallBackModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const persistedSessionId = useSessionStore((state) => state.sessionId);
  const queryClient = useQueryClient();

  const [step, setStep] = React.useState<ModalStep>("login");
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const [isAuthChecking, setIsAuthChecking] = React.useState(false);
  const [formData, setFormData] = React.useState(INITIAL_FORM);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [otp, setOtp] = React.useState("");
  const [otpError, setOtpError] = React.useState("");
  const [otpTimer, setOtpTimer] = React.useState(OTP_RESEND_TIME);
  const [isEnableOtpResend, setIsEnableOtpResend] = React.useState(false);
  const [sessionId, setSessionId] = React.useState<string | null>(null);

  const resetState = React.useCallback(() => {
    setStep("login");
    setFormData(INITIAL_FORM);
    setErrors({});
    setOtp("");
    setOtpError("");
    setOtpTimer(OTP_RESEND_TIME);
    setIsEnableOtpResend(false);
    setSessionId(null);
    setIsUserLoggedIn(false);
  }, []);

  const closeModal = React.useCallback(() => {
    resetState();
    onClose();
  }, [onClose, resetState]);

  // On open: check auth state and pre-fill form from localStorage
  React.useEffect(() => {
    if (!open) return;

    let nextName = "";
    let nextEmail = "";
    let nextPhone = "";
    let isMounted = true;

    if (typeof window !== "undefined") {
      try {
        const rawUser = localStorage.getItem("user");
        if (rawUser) {
          const userData = JSON.parse(rawUser) as {
            name?: string;
            email?: string;
            phone?: string;
          };
          nextName = userData?.name ?? "";
          nextEmail = userData?.email ?? "";
          nextPhone = userData?.phone ?? "";
        }
      } catch {}
    }

    setFormData({ name: nextName, email: nextEmail, mobile: nextPhone, countryCode: "+91" });

    setIsAuthChecking(true);
    fetch("/api/get-token")
      .then((res) => res.json())
      .then((data: { accessToken?: string | null }) => {
        if (!isMounted) return;
        const loggedIn = Boolean(data?.accessToken);
        setIsUserLoggedIn(loggedIn);
        // Logged-in users → skip login step → go to form (for final confirm/submit)
        if (loggedIn) setStep("form");
        else setStep("login");
      })
      .catch(() => {
        if (!isMounted) return;
        setIsUserLoggedIn(false);
        setStep("login");
      })
      .finally(() => {
        if (!isMounted) return;
        setIsAuthChecking(false);
      });

    return () => { isMounted = false; };
  }, [open]);

  // OTP countdown
  React.useEffect(() => {
    if (!open || step !== "otp") return;
    if (otpTimer > 0) {
      const interval = window.setInterval(() => setOtpTimer((p) => p - 1), 1000);
      return () => window.clearInterval(interval);
    }
    setIsEnableOtpResend(true);
  }, [open, otpTimer, step]);

  const { mutate: sendOtp, isPending: isOtpSending } = useMutation({
    mutationFn: async (phone: string) =>
      sendEndUserPropertyContactOtpAction({ propertyId: project.id, phone }),
    onSuccess: (response) => {
      if (response?.sessionId) setSessionId(response.sessionId);
      setStep("otp");
      setOtp("");
      setOtpError("");
      setOtpTimer(OTP_RESEND_TIME);
      setIsEnableOtpResend(false);
      toast.success(response?.message ?? "OTP sent successfully");
    },
    onError: (error: any) => {
      const message = error?.message ?? "Unable to send OTP";
      toast.error(Array.isArray(message) ? message.join(", ") : message);
    },
  });

  const { mutate: submitContact, isPending: isSubmitting } = useMutation({
    mutationFn: submitEndUserPropertyContactAction,
    onSuccess: async (response) => {
      let didAutoLogin = false;
      if (response?.accessToken && response?.refreshToken) {
        try {
          await setAuthCookies(response.accessToken, response.refreshToken);
          if (response.user && typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(response.user));
          }
          didAutoLogin = true;
        } catch {}
      }
      toast.success(response?.message ?? "Request submitted successfully");
      closeModal();
      if (didAutoLogin && typeof window !== "undefined") {
        queryClient.clear();
        window.setTimeout(() => window.location.reload(), 400);
      }
    },
    onError: (error: any) => {
      const message = error?.message ?? "Unable to submit request";
      if (step === "otp") {
        setOtpError(Array.isArray(message) ? message.join(", ") : message);
      } else {
        toast.error(Array.isArray(message) ? message.join(", ") : message);
      }
    },
  });

  // ── Step: Login (phone entry for guests) ─────────────────────────────────
  const handleSendOtp = () => {
    const mobileError = mobileNumberValidator(formData.mobile);
    if (mobileError) {
      setErrors((p) => ({ ...p, mobile: mobileError }));
      return;
    }
    if (!formData.name.trim()) {
      setErrors((p) => ({ ...p, name: "Full name is required" }));
      return;
    }
    setErrors({});
    sendOtp(formData.mobile);
  };

  // ── Step: OTP ─────────────────────────────────────────────────────────────
  const handleVerifyAndContinue = (otpValue: string) => {
    if (otpValue.length !== 4) {
      setOtpError("Enter a valid 4-digit OTP");
      return;
    }
    setOtpError("");
    submitContact({
      propertyId: project.id,
      name: formData.name.trim() || "User",
      email: formData.email.trim() || undefined,
      phone: formData.mobile,
      countryCode: formData.countryCode,
      otp: otpValue,
      sessionId: sessionId ?? persistedSessionId ?? undefined,
    });
  };

  const handleOtpResend = () => {
    if (!isEnableOtpResend || isOtpSending) return;
    sendOtp(formData.mobile);
  };

  // ── Step: Form (logged-in users) ──────────────────────────────────────────
  const validateForm = React.useCallback(() => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) nextErrors.name = "Full name is required";
    if (formData.email.trim() && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      nextErrors.email = "Invalid email format";
    const mobileError = mobileNumberValidator(formData.mobile);
    if (mobileError) nextErrors.mobile = mobileError;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [formData]);

  const handleFormContinue = () => {
    if (isAuthChecking) return;
    if (!validateForm()) return;
    submitContact({
      propertyId: project.id,
      name: formData.name.trim(),
      email: formData.email.trim() || undefined,
      phone: formData.mobile,
      countryCode: formData.countryCode,
      sessionId: sessionId ?? persistedSessionId ?? undefined,
    });
  };

  const handleClose: DialogProps["onClose"] = (_event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    closeModal();
  };

  const formattedTimer = otpTimer > 0 ? `in ${otpTimer < 10 ? `0${otpTimer}` : otpTimer}s` : "";

  // ── Shared header ─────────────────────────────────────────────────────────
  const AgentBadge = () => (
    <div className="mb-4 flex items-center gap-3 rounded-lg bg-[#E3E3E3] px-3 py-2">
      <Image
        src={project.agent?.avatarUrl ?? "/assets/app/call-person.svg"}
        alt={project.agent?.name ?? "KMA Expert"}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover"
      />
      <div>
        <p className="text-sm font-semibold text-text-black">
          {project.agent?.name ?? "KMA Expert"}
        </p>
        {project.agent?.badge ? (
          <span className="mt-1 inline-flex rounded-md bg-[#D08A2F] px-2 py-0.5 text-[11px] font-semibold text-white">
            {project.agent.badge}
          </span>
        ) : null}
      </div>
    </div>
  );

  const CloseBtn = () => (
    <button
      type="button"
      onClick={closeModal}
      className="rounded-full p-1 text-[#1E2236] transition hover:bg-black/5"
      aria-label="Close"
    >
      <Image src="/assets/close-icon.svg" alt="Close" width={22} height={22} />
    </button>
  );

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      slotProps={{ paper: { sx: { borderRadius: fullScreen ? "" : "0.75rem" } } }}
    >
      <DialogContent sx={{ padding: 0 }}>

        {/* ── STEP: LOGIN (phone entry for guests) ── */}
        {step === "login" && (
          <div className="w-full rounded-xl bg-[#EFEFEF] p-4 sm:w-[520px]">
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="text-[24px] font-semibold text-[#1E2236]">
                Login / Register to Continue
              </h3>
              <CloseBtn />
            </div>

            <AgentBadge />

            <p className="mb-4 text-sm text-[#7A7A7A]">
              Enter your details to connect with the channel partner.
            </p>

            <div className="space-y-4">
              <div>
                <p className="required-label pb-2 text-sm text-text-black">Full Name</p>
                <InputBase
                  fullWidth
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, name: e.target.value }));
                    setErrors((p) => ({ ...p, name: "" }));
                  }}
                  placeholder="Enter your full name"
                  className={`box-border h-[44px] rounded-full border px-4 py-2 text-sm ${
                    errors.name ? "border-red-500" : "border-border focus-within:border-blue"
                  }`}
                  inputProps={{ className: "placeholder-gray" }}
                />
                {errors.name && <p className="pt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <p className="required-label pb-2 text-sm text-text-black">Mobile Number</p>
                <MobileInput
                  placeHolder="Enter your mobile number"
                  required
                  validationMessage={errors.mobile}
                  value={formData.mobile}
                  countryCode={formData.countryCode}
                  onChange={(value, code) => {
                    setFormData((p) => ({ ...p, mobile: value, countryCode: code }));
                    setErrors((p) => ({ ...p, mobile: "" }));
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendOtp}
              disabled={isOtpSending || isAuthChecking}
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#0A0A63] px-6 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isOtpSending ? <Spinner size={18} /> : "Send OTP"}
            </button>

            <button
              type="button"
              onClick={() => setStep("form")}
              className="mt-3 w-full text-center text-sm text-[#7A7A7A] underline"
            >
              Continue as Guest
            </button>
          </div>
        )}

        {/* ── STEP: OTP ── */}
        {step === "otp" && (
          <div className="w-full rounded-xl bg-[#EFEFEF] p-4 sm:w-[520px]">
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="text-[24px] font-semibold text-[#1E2236]">Verify Mobile Number</h3>
              <CloseBtn />
            </div>

            <div className="rounded-lg bg-[#E3E3E3] p-4">
              <p className="mb-4 text-sm text-[#7A7A7A]">
                Enter the 4-digit code sent to{" "}
                <span className="font-semibold text-[#0A0A63]">+91 {formData.mobile}</span>
              </p>

              <OtpInput
                length={4}
                value={otp}
                onChange={(value) => { setOtp(value); setOtpError(""); }}
                onComplete={handleVerifyAndContinue}
                validateChar={matchIsNumeric}
              />

              {otpError && <p className="pt-2 text-xs text-red-500">{otpError}</p>}

              <p className="pb-5 pt-4 text-sm text-[#7A7A7A]">
                Didn&apos;t get it?{" "}
                <button
                  type="button"
                  onClick={handleOtpResend}
                  className={`font-semibold ${otpTimer > 0 ? "cursor-default text-[#7A7A7A]" : "text-blue"}`}
                >
                  Resend {formattedTimer}
                </button>{" "}
                or{" "}
                <button
                  type="button"
                  onClick={() => { setStep("login"); setOtp(""); setOtpError(""); }}
                  className="font-semibold text-blue underline"
                >
                  Change Number
                </button>
              </p>

              <button
                type="button"
                onClick={() => handleVerifyAndContinue(otp)}
                disabled={isSubmitting}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[#0A0A63] px-6 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? <Spinner size={18} /> : "Verify & Continue"}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP: FORM (logged-in users or guest with full details) ── */}
        {step === "form" && (
          <div className="w-full rounded-xl bg-[#EFEFEF] p-4 sm:w-[520px]">
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="text-[24px] font-semibold text-[#1E2236]">
                Contact Our Channel Partners
              </h3>
              <CloseBtn />
            </div>

            <AgentBadge />

            <p className="mb-4 text-sm text-[#7A7A7A]">
              Fill the form below to get the channel partner contact details.
            </p>

            <div className="space-y-4">
              <div>
                <p className="required-label pb-2 text-sm text-text-black">Full Name</p>
                <InputBase
                  fullWidth
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, name: e.target.value }));
                    setErrors((p) => ({ ...p, name: "" }));
                  }}
                  placeholder="Enter your full name"
                  className={`box-border h-[44px] rounded-full border px-4 py-2 text-sm ${
                    errors.name ? "border-red-500" : "border-border focus-within:border-blue"
                  }`}
                  inputProps={{ className: "placeholder-gray" }}
                />
                {errors.name && <p className="pt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <p className="pb-2 text-sm text-text-black">Email Address <span className="text-[#888]">(optional)</span></p>
                <InputBase
                  fullWidth
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, email: e.target.value }));
                    setErrors((p) => ({ ...p, email: "" }));
                  }}
                  placeholder="Enter your email"
                  className={`box-border h-[44px] rounded-full border px-4 py-2 text-sm ${
                    errors.email ? "border-red-500" : "border-border focus-within:border-blue"
                  }`}
                  inputProps={{ className: "placeholder-gray" }}
                />
                {errors.email && <p className="pt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <p className="required-label pb-2 text-sm text-text-black">Mobile Number</p>
                <MobileInput
                  placeHolder="Enter your mobile number"
                  required
                  validationMessage={errors.mobile}
                  value={formData.mobile}
                  countryCode={formData.countryCode}
                  onChange={(value, code) => {
                    setFormData((p) => ({ ...p, mobile: value, countryCode: code }));
                    setErrors((p) => ({ ...p, mobile: "" }));
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={isUserLoggedIn ? handleFormContinue : handleSendOtp}
              disabled={isSubmitting || isOtpSending || isAuthChecking}
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#0A0A63] px-6 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting || isOtpSending || isAuthChecking
                ? <Spinner size={18} />
                : isUserLoggedIn ? "Submit" : "Send OTP"}
            </button>

            {!isUserLoggedIn && (
              <button
                type="button"
                onClick={() => setStep("login")}
                className="mt-3 w-full text-center text-sm text-[#7A7A7A] underline"
              >
                ← Back to Login / Register
              </button>
            )}
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
