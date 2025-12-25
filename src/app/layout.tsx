import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "@/styles/globals.css";
import QueryProvider from "@/providers/QueryProvider";
import StoreProvider from "@/providers/StoreProvider";
import ToasterProvider from "@/providers/ToastProvider";
import { Suspense } from "react";
import TopLoaderProvider from "@/providers/TopLoaderProvider";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "KMA Property",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.variable} antialiased`}
      >
        <Suspense>
        <StoreProvider>
          <QueryProvider>
          {children}
          <ToasterProvider />
          <TopLoaderProvider/>
          </QueryProvider>
        </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
