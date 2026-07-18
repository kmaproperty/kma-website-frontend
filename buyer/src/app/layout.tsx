import type { Metadata } from "next";
import { IBM_Plex_Sans  } from "next/font/google";
import "@/styles/globals.css";
import QueryProvider from "@/providers/QueryProvider";
import StoreProvider from "@/providers/StoreProvider";
import ToasterProvider from "@/providers/ToastProvider";
import { Suspense } from "react";
import TopLoaderProvider from "@/providers/TopLoaderProvider";
import CookieSessionGuard from "@/components/common/cookieSessionGuard";
import WhatsAppSticky from "@/components/whatsappSticky/WhatsAppSticky";
import Script from "next/script";
import RealEstateChatbot from "@/components/RealEstateChatbot";

const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KHBBX4H2');`;

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: gtmScript,
          }}
        />
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '3837781979695365');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body
        className={`${ibmPlexSans.variable} antialiased min-w-0 overflow-x-hidden`}
      >
      <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3837781979695365&ev=PageView&noscript=1"
            alt="meta-pixel-fallback"
          />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: gtmScript,
          }}
        />
        <Suspense>
        <StoreProvider>
          <QueryProvider>
          <CookieSessionGuard />
          {children}
          <ToasterProvider />
          <TopLoaderProvider/>
          <WhatsAppSticky phoneNumber="919289977646"/>
          <RealEstateChatbot/>
          </QueryProvider>
        </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
