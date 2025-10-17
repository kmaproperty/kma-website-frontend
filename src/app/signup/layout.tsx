import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign up | KMA Property",
};

interface SignUpLayoutProps {
  children: ReactNode;
}

export default function SignUpLayout({children} : SignUpLayoutProps) {
    return <>{children}</>
}