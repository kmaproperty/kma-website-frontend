"use client";

import { clearAuthCookies } from "@/lib/helper";
import {
  endUserProfileApiHandler,
  getActivityCountsApiHandler,
  UserLogoutApiHandler,
  UserLogoutResponse,
  userProfileApiHandler,
  UserProfileResponse,
} from "@/services/userService";
import { useSessionStore } from "@/store/useSessionStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import LoginCard from "@/components/channelParterner/loginCard";
import LoginOtpCard from "@/components/channelParterner/loginOtpCard";

type ProfileViewProps = {
  userRole?: string | null;
};

type MenuItem = {
  label: string;
  icon: string;
  count?: number;
  route?: string;
};

const baseUrl = process.env.NEXT_PUBLIC_AWS_URL ?? "";

const LOGGED_IN_MENU_BASE: MenuItem[] = [
  { label: "Recently Search", icon: "/assets/home-search-blue.svg", route: "/recently-viewed?tab=recentSearch" },
  { label: "Recently Viewed", icon: "/assets/home-recent-blue.svg", route: "/recently-viewed?tab=recentlyViewed" },
  { label: "Saved Properties", icon: "/assets/home-save-blue.svg", route: "/recently-viewed?tab=saved" },
  { label: "Contacted Properties", icon: "/assets/home-contact-blue.svg", route: "/recently-viewed?tab=contacted" },
  { label: "My Reviews (New)", icon: "/assets/review-blue.svg", route: "/profile" },
  { label: "My Services", icon: "/assets/service-blue.svg", route: "/"},
  { label: "Refer And Earn", icon: "/assets/refer-earn-blue.svg", route: "/refer-and-earn" },
  { label: "Help", icon: "/assets/help-blue.svg", route: "/help-center" },
];

const GUEST_MENU_BASE: MenuItem[] = [
  { label: "Recently Search", icon: "/assets/home-search-blue.svg", route: "/recently-viewed?tab=recentSearch" },
  { label: "Recently Viewed", icon: "/assets/home-recent-blue.svg", route: "/recently-viewed?tab=recentlyViewed" },
  { label: "Saved Properties", icon: "/assets/home-save-blue.svg", route: "/recently-viewed?tab=saved" },
  { label: "Contacted Properties", icon: "/assets/home-contact-blue.svg", route: "/recently-viewed?tab=contacted" },
  { label: "My Reviews (New)", icon: "/assets/review-blue.svg", route: "/profile" },
  { label: "My Services", icon: "/assets/service-blue.svg", route: "/" },
  { label: "Refer And Earn", icon: "/assets/refer-earn-blue.svg", route: "/refer-and-earn" },
  { label: "Help", icon: "/assets/help-blue.svg", route: "/help-center" },
];

function CountBadge({ count }: { count?: number }) {
  if (typeof count !== "number") return null;

  return (
    <span className="min-w-[18px] h-[18px] rounded-full bg-[#EEF2FF] text-[#3538CD] text-[11px] font-medium leading-[18px] px-1 text-center">
      {count}
    </span>
  );
}

function MenuRow({ item, onClick }: { item: MenuItem; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-2 px-2.5 py-2 text-left rounded-lg hover:bg-[#F7F8FC] transition-colors duration-200"
      type="button"
    >
      <span className="flex items-center gap-2.5">
        <Image src={item.icon} width={18} height={18} alt={item.label} className="w-[18px] h-[18px]" />
        <span className="text-sm text-[#202939]">{item.label}</span>
      </span>
      <CountBadge count={item.count} />
    </button>
  );
}

const ACTIVITY_COUNT_KEYS = [
  "recentlySearch",
  "recentlyViewed",
  "savedProperties",
  "contactedProperties",
] as const;

export default function ProfileView({ userRole }: ProfileViewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isLoggedIn = Boolean(userRole);
  const sessionId = useSessionStore((state) => state.sessionId);

  // On buyer domain, treat everyone as end-user for profile data + menu.
  // Seller-specific features only on seller domain.
  const isSeller = false;

  // Check if user came from seller app (crossApp flag in localStorage)
  const crossApp = (() => {
    if (typeof window === "undefined") return false;
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed?.crossApp === true;
      }
    } catch { /* ignore */ }
    return false;
  })();

  const { data: profileResponse } = useQuery({
    queryKey: ["user-profile", userRole, crossApp],
    queryFn: async () => {
      try {
        const res = await endUserProfileApiHandler();
        return { success: res.success, user: res.user } as UserProfileResponse;
      } catch (err: any) {
        if (err?.statusCode === 401 || err?.status === 401 || err?.message === 'Authentication failed') {
          localStorage.clear();
          await clearAuthCookies();
          queryClient.clear();
          window.location.replace("/");
        }
        throw err;
      }
    },
    enabled: isLoggedIn,
    staleTime: 60 * 1000,
    retry: false,
  });
  const user = profileResponse?.user;

  // Sync latest profile data to localStorage so cached views stay up-to-date
  useEffect(() => {
    if (user?.name) {
      try {
        const raw = localStorage.getItem("user");
        const existing = raw ? JSON.parse(raw) : {};
        const updated = { ...existing, name: user.name, role: user.role };
        if (user.email) updated.email = user.email;
        if (user.profileImage) updated.profileImage = user.profileImage;
        localStorage.setItem("user", JSON.stringify(updated));
      } catch { /* ignore */ }
    }
  }, [user]);

  const { data: activityCounts } = useQuery({
    queryKey: ["end-user-activity-counts", isLoggedIn, sessionId ?? null],
    queryFn: () => getActivityCountsApiHandler(isLoggedIn ? undefined : sessionId ?? undefined),
    staleTime: 60 * 1000,
  });

  const { mutate: handleLogoutApi, isPending } = useMutation({
    mutationFn: async (): Promise<UserLogoutResponse> => {
      return await UserLogoutApiHandler();
    },
    onSuccess: async () => {
      localStorage.clear();
      await clearAuthCookies();
      queryClient.clear();
      router.replace("/");
    },
    onError: (error: any) => {
      const message = Array.isArray(error?.message) ? error.message.join(", ") : error?.message ?? "Unable to logout";
      toast.error(message);
    },
  });

  const menuItems = useMemo(() => {
    const base = isLoggedIn ? LOGGED_IN_MENU_BASE : GUEST_MENU_BASE;
    if (!activityCounts) return base;
    return base.map((item, index) => {
      const key = ACTIVITY_COUNT_KEYS[index];
      const count = key ? activityCounts[key] : undefined;
      return { ...item, count };
    });
  }, [isLoggedIn, activityCounts]);
  const profileImage =
    user?.profileImage && /^https?:\/\//.test(user.profileImage)
      ? user.profileImage
      : user?.profileImage
        ? `${baseUrl}${user.profileImage}`
        : "/assets/profile.png";

  const searchParams = useSearchParams();
  const isLoginParam = searchParams.get("isLogin") === "true";
  const isOtpParam = searchParams.get("isOtp") === "true";
  const flowParam = searchParams.get("flow");
  const isOtpStep =
    isOtpParam && (flowParam === "login" || flowParam === "enduser-login");
  const isLoginDialogOpen = isLoginParam || isOtpStep;

  const navigateToLogin = () => {
    if (typeof window === "undefined") return;
    const next = new URLSearchParams(window.location.search);
    next.delete("isOtp");
    next.delete("flow");
    next.delete("mobile");
    next.delete("code");
    next.delete("redirect");
    next.set("isLogin", "true");
    router.push(`${window.location.pathname}?${next.toString()}`);
  };

  const closeLoginDialog = () => {
    if (typeof window === "undefined") return;
    const next = new URLSearchParams(window.location.search);
    next.delete("isLogin");
    next.delete("isOtp");
    next.delete("flow");
    next.delete("mobile");
    next.delete("code");
    next.delete("redirect");
    const qs = next.toString();
    router.replace(`${window.location.pathname}${qs ? `?${qs}` : ""}`);
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.route) {
      router.push(item.route);
      return;
    }
    if (!isLoggedIn) {
      navigateToLogin();
    }
  };

  return (
    <div className="w-[320px] sm:w-[340px]">
      <div className="bg-white rounded-[20px] border border-[#EAECF0] shadow-[0_14px_38px_rgba(15,23,42,0.08)] p-4">
        {isLoggedIn ? (
          <div className="flex items-center justify-between rounded-[14px] bg-[#F8FAFC] px-3 py-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <Image
                src={profileImage}
                width={42}
                height={42}
                alt="user profile"
                className="w-[42px] h-[42px] rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="text-[15px] leading-5 font-semibold text-[#101828] truncate">{user?.name || "User"}</p>
                <p className="text-xs leading-4 text-[#667085] truncate">{user?.phone ? (user.phone.startsWith('+') ? user.phone : `+91 ${user.phone}`) : ""}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="flex items-center gap-1 text-[#475467] hover:text-blue text-sm font-medium shrink-0"
            >
              <Image src="/assets/edit-blue.svg" width={14} height={14} alt="edit profile" className="w-[14px] h-[14px]" />
              Edit
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-[14px] bg-[#F8FAFC] px-3 py-3">
            <div className="flex items-center gap-2.5">
              <span className="w-[42px] h-[42px] rounded-full bg-white border border-[#EAECF0] flex items-center justify-center">
                <Image src="/assets/profile.png" width={24} height={24} alt="guest profile" className="w-6 h-6 rounded-full" />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-[#101828]">Hello</p>
                <div className="flex items-center gap-1">
                  <Image src="/assets/check-arrow-transparent.svg" width={12} height={12} alt="check" className="w-3 h-3" />
                  <p className="text-xs text-[#667085]">Easy contact with sellers</p>
                </div>
                <div className="flex items-center gap-1">
                  <Image src="/assets/check-arrow-transparent.svg" width={12} height={12} alt="check" className="w-3 h-3" />
                  <p className="text-xs text-[#667085]">Personalized experience</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={navigateToLogin}
              className="h-9 px-5 rounded-full bg-blue text-white text-sm font-medium hover:opacity-95"
            >
              Login
            </button>
          </div>
        )}

        <div className="mt-3 flex flex-col gap-2">
          {menuItems.map((item) => (
            <MenuRow key={item.label} item={item} onClick={() => handleMenuClick(item)} />
          ))}
        </div>

        {isLoggedIn && (
          <button
            type="button"
            onClick={() => handleLogoutApi()}
            disabled={isPending}
            className="mt-4 h-11 w-full rounded-full bg-blue text-white text-sm font-medium hover:opacity-95 disabled:opacity-70"
          >
            {isPending ? "Logging out..." : "Logout"}
          </button>
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
            {isOtpStep ? <LoginOtpCard /> : <LoginCard />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}