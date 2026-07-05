"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, Home } from "lucide-react";
import Image from "next/image";
import Script from "next/script";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-6 max-w-md mx-auto relative">
        <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KHBBX4H2');
        `}
      </Script>
      {/* Header Logo */}
      <header className="bg-white py-4 border-b border-gray-100 flex justify-center items-center sticky top-0 z-50 w-full">
        <Image 
          src="https://seller.kmaglobalproperty.com/assets/kma_logo_blue.png" 
          width={100} 
          height={35} 
          alt="KMA Logo" 
          style={{ height: "38px" }} 
        />
      </header>

      {/* Center Content Section */}
      <main className="flex-1 flex flex-col items-center justify-center my-auto text-center px-4">
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-green-50 animate-ping opacity-75" />
          <div className="relative p-4 rounded-full bg-green-100/80 text-green-600 shadow-sm">
            <CheckCircle2 className="w-16 h-16 stroke-[1.5]" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2.5">
          Thank You!
        </h1>
        <p className="text-sm font-medium text-gray-500 max-w-[320px] leading-relaxed">
          Your contact query request has been registered. Our team will reach out to you shortly.
        </p>
      </main>

      <div className="w-full pt-6 border-t border-gray-50 bg-white mt-auto">
        <button
          type="button"
          onClick={() => router.replace("/")}
          className="w-full bg-[#010048] hover:bg-opacity-95 text-white font-semibold text-sm py-4 rounded-full transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>View More Properties</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}