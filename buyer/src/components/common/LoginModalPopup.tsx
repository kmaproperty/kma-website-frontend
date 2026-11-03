"use client";

import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import LoginCard from "@/components/channelParterner/loginCard";
import LoginOtpCard from "@/components/channelParterner/loginOtpCard";

export default function LoginModalPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOtpScreen = searchParams.get("isOtp") === "true";

  const checkIsLoggedIn = () => {
    if (typeof window === "undefined") return false;
    try {
      return Boolean(localStorage.getItem("user"));
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (checkIsLoggedIn() || pathname.includes("/user-flow")) {
      setIsOpen(false);
      return;
    }

    if (isOtpScreen) {
      setIsOpen(true);
      return;
    }

    const interval = setInterval(() => {
      if (checkIsLoggedIn()) {
        setIsOpen(false);
        clearInterval(interval);
        return;
      }

      const nextAllowedTime = sessionStorage.getItem("next_login_popup_time");
      const currentTime = Date.now();

      if (!nextAllowedTime) {
        sessionStorage.setItem("next_login_popup_time", String(currentTime + 5000));
      } else if (currentTime >= parseInt(nextAllowedTime, 10)) {
        setIsOpen(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [pathname, isOtpScreen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("next_login_popup_time", String(Date.now() + 60000));
  };

  if (checkIsLoggedIn()) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "1rem",
            maxWidth: "460px",
            width: "100%",
            margin: "16px",
            overflow: "visible",
            position: "relative",
          },
        },
      }}
    >
      <button
        onClick={handleClose}
        type="button"
        className="absolute -top-3 -right-3 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-md hover:bg-slate-100 cursor-pointer border border-slate-200"
      >
        <X className="h-4 w-4" />
      </button>

      <DialogContent sx={{ padding: 0 }}>
        {isOtpScreen ? <LoginOtpCard /> : <LoginCard />}
      </DialogContent>
    </Dialog>
  );
}