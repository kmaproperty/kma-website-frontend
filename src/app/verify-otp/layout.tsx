import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Verify Otp | KMA Property",
};

interface SignUpLayoutProps {
  children: ReactNode;
}

export default function VerifyOtpLayout({children} : SignUpLayoutProps) {
    return <>{children}</>
}