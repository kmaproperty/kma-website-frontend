"use client";

import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HomeHeader from "@/components/header/homeHeader";
import LoginCard from "@/components/channelParterner/loginCard";
import LoginOtpCard from "@/components/channelParterner/loginOtpCard";
import { USER_TYPE } from "@/lib/enums";
import { userProfileApiHandler, UserProfileResponse } from "@/services/userService";
import { useHeaderStore } from "@/store/useHeaderStore";
import { useQuery } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "react-toastify";

type PurposeType = "Rent" | "Buy";

type ReferralForm = {
  name: string;
  phoneNumber: string;
  purpose: PurposeType;
  description: string;
};

const initialForm: ReferralForm = {
  name: "",
  phoneNumber: "",
  purpose: "Rent",
  description: "",
};

const termsAndConditions: string[] = [
  "Each successful referral gives you reward coins.",
  "1 coin = Rs 10.",
  "Referral details must be genuine and reachable.",
  "KMA team verification is required before reward settlement.",
];

const referralSteps = [
  {
    title: "Share Referral",
    description: "Click Refer Now and submit your referral details.",
  },
  {
    title: "KMA Verification",
    description: "Our team verifies the enquiry and intent.",
  },
  {
    title: "Earn Coins",
    description: "Coins are credited after successful validation.",
  },
];

export default function ReferAndEarnClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userRole } = useHeaderStore(true);
  const isLoggedIn = Boolean(userRole === USER_TYPE.CHANNEL_PARTNER || userRole === USER_TYPE.OWNER);
  const isLoginParam = searchParams.get("isLogin") === "true";
  const isOtpParam = searchParams.get("isOtp") === "true";
  const flowParam = searchParams.get("flow");
  const isLoginDialogOpen = isLoginParam || (isOtpParam && flowParam === "login");

  const { data: profileResponse } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async (): Promise<UserProfileResponse> => userProfileApiHandler(),
    enabled: isLoggedIn,
    staleTime: 60 * 1000,
  });

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValue, setFormValue] = useState<ReferralForm>(initialForm);

  const prefilledForm = useMemo<ReferralForm>(() => {
    return {
      name: profileResponse?.user?.name ?? "",
      phoneNumber: profileResponse?.user?.phone ?? "",
      purpose: formValue.purpose,
      description: "",
    };
  }, [profileResponse?.user?.name, profileResponse?.user?.phone, formValue.purpose]);

  const openLoginDialog = () => {
    if (typeof window === "undefined") {
      return;
    }

    const currentSearchParams = new URLSearchParams(window.location.search);
    currentSearchParams.delete("isOtp");
    currentSearchParams.delete("flow");
    currentSearchParams.delete("mobile");
    currentSearchParams.delete("code");
    currentSearchParams.delete("redirect");
    currentSearchParams.set("isLogin", "true");

    const redirectParams = new URLSearchParams(window.location.search);
    redirectParams.delete("isLogin");
    redirectParams.delete("isOtp");
    redirectParams.delete("flow");
    redirectParams.delete("mobile");
    redirectParams.delete("code");
    redirectParams.delete("redirect");
    const redirectSearch = redirectParams.toString();
    const redirect = `${window.location.pathname}${redirectSearch ? `?${redirectSearch}` : ""}`;

    currentSearchParams.set("redirect", redirect);
    router.replace(`${window.location.pathname}?${currentSearchParams.toString()}`);
  };

  const closeLoginDialog = () => {
    if (typeof window === "undefined") {
      return;
    }

    const nextParams = new URLSearchParams(window.location.search);
    nextParams.delete("isLogin");
    nextParams.delete("isOtp");
    nextParams.delete("flow");
    nextParams.delete("mobile");
    nextParams.delete("code");
    nextParams.delete("redirect");
    const query = nextParams.toString();
    router.replace(`${window.location.pathname}${query ? `?${query}` : ""}`);
  };

  const handleReferNow = () => {
    if (isLoggedIn) {
      setShowForm(true);
      setFormValue(prefilledForm);
      return;
    }
    openLoginDialog();
  };

  const handleInputChange = (field: keyof ReferralForm, value: string) => {
    setFormValue((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formValue.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!/^\d{10}$/.test(formValue.phoneNumber.trim())) {
      toast.error("Please enter a valid 10 digit phone number");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Referral submitted successfully");
      setFormValue(isLoggedIn ? { ...prefilledForm, purpose: "Rent" } : initialForm);
      setShowForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="relative pt-[25px] min-h-[500px] rounded-b-[60px] bg-[linear-gradient(120deg,#1B2DBE_0%,#0D9DF2_100%)]">
        <HomeHeader />
        <div className="w-[90%] max-w-[1100px] mx-auto mt-[70px] pb-[140px] text-white">
          <p className="text-sm opacity-90">Home / Refer and Earn</p>
          <h1 className="text-[30px] md:text-[42px] leading-[1.15] font-semibold mt-2">Refer and Earn ( 1 coin = Rs 10 )</h1>
          <p className="text-sm md:text-base mt-3 max-w-[700px] opacity-95">
            Help friends discover the right property with KMA and earn rewards for every valid referral.
          </p>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-4">
              <p className="text-xs uppercase tracking-wide opacity-90">Reward Rate</p>
              <p className="text-2xl font-semibold mt-1">1 Coin = Rs 10</p>
            </div>
            <div className="rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-4">
              <p className="text-xs uppercase tracking-wide opacity-90">Fast Process</p>
              <p className="text-2xl font-semibold mt-1">3 Simple Steps</p>
            </div>
            <div className="rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-4">
              <p className="text-xs uppercase tracking-wide opacity-90">Trusted Brand</p>
              <p className="text-2xl font-semibold mt-1">KMA Network</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90%] max-w-[1100px] mx-auto -mt-[110px] pb-[90px] space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6">
          <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <h2 className="text-2xl font-semibold text-[#0F172A]">Terms and Conditions</h2>
            <ul className="mt-4 space-y-2">
              {termsAndConditions.map((item) => (
                <li key={item} className="text-[#475467] text-[15px] leading-6">
                  - {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleReferNow}
              className="mt-6 animated-button px-10 py-3 border border-blue text-center cursor-pointer"
            >
              <span className="relative">Refer Now</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl font-semibold text-[#0F172A]">How It Works</h3>
            <div className="mt-5 space-y-4">
              {referralSteps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#EEF4FF] text-[#1D4ED8] text-sm font-semibold flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1D2939]">{step.title}</p>
                    <p className="text-sm text-[#667085] mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h3 className="text-xl font-semibold text-[#0F172A]">Referral Details</h3>
              <p className="text-sm text-[#667085]">Fill details to submit your referral.</p>
            </div>

            <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formValue.name}
                  onChange={(event) => handleInputChange("name", event.target.value)}
                  className="w-full border border-[#D0D5DD] rounded-xl px-4 py-3 outline-none focus:border-[#2563EB]"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formValue.phoneNumber}
                  onChange={(event) => handleInputChange("phoneNumber", event.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="w-full border border-[#D0D5DD] rounded-xl px-4 py-3 outline-none focus:border-[#2563EB]"
                />
              </div>

              <div>
                <p className="text-sm text-[#344054] mb-2">Purpose</p>
                <div className="inline-flex p-1 rounded-xl border border-[#D0D5DD] bg-[#F8FAFC]">
                  {(["Rent", "Buy"] as PurposeType[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleInputChange("purpose", item)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        formValue.purpose === item ? "bg-blue text-white" : "text-[#475467] hover:bg-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={4}
                placeholder="Description (optional)"
                value={formValue.description}
                onChange={(event) => handleInputChange("description", event.target.value)}
                className="w-full border border-[#D0D5DD] rounded-xl px-4 py-3 outline-none focus:border-[#2563EB]"
              />

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-fit animated-button px-10 py-3 border border-blue text-center cursor-pointer disabled:opacity-60"
                >
                  <span className="relative">{isSubmitting ? "Submitting..." : "Submit"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 rounded-full border border-[#D0D5DD] text-[#344054] hover:bg-[#F9FAFB]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <Dialog
        open={isLoginDialogOpen}
        onClose={closeLoginDialog}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "0.75rem",
            },
          },
        }}
      >
        <DialogContent sx={{ padding: 0 }}>
          <div className="relative w-full rounded-xl bg-white sm:w-[460px]">
            <button
              type="button"
              onClick={closeLoginDialog}
              className="absolute right-4 top-4 z-10 rounded-full p-1 text-[#1E2236] transition hover:bg-black/5"
              aria-label="Close login dialog"
            >
              ✕
            </button>
            {isOtpParam && flowParam === "login" ? <LoginOtpCard /> : <LoginCard />}
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-text-black flex justify-center">
        <AboutusDataSync />
        <HomeFooter tab={1} />
      </div>
    </div>
  );
}
