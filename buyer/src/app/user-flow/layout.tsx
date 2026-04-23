import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login | KMA Property",
};

interface UserFlowLayoutProps {
  children: ReactNode;
}

export default function UserFlowLayout({ children }: UserFlowLayoutProps) {
  return <>{children}</>;
}
