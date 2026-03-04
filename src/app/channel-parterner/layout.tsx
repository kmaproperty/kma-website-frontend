import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Channel Parterner | KMA Property",
};

interface ChannelParternerLayoutProps {
  children: ReactNode;
}

export default function ChannelParternerLayout({ children }: ChannelParternerLayoutProps) {
  return <>{children}</>;
}
