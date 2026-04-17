export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import MainLayout from "@/components/myList/mainLayout";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HeaderDataSync from "@/components/header/HeaderDataSync";
import { fetchPropertyMasterData } from "@/app/api/home";
import ChannelPartnerPageClient from "./_components/ChannelPartnerPageClient";
import HomeHeader from "@/components/header/homeHeader";

export const metadata: Metadata = {
  title: "Channel Partner | KMA Property",
  description:
    "Connect with verified KMA channel partners to assist you professionally.",
};

export default async function ChannelPartnerPage() {
  let propertyMasterData: unknown[] = [];
  try {
    const res = await fetchPropertyMasterData();
    if (res?.success && Array.isArray((res as { data?: unknown[] }).data)) {
      propertyMasterData = (res as { data: unknown[] }).data;
    }
  } catch {
    propertyMasterData = [];
  }

  return (
    <>
    <HeaderDataSync propertyMasterData={propertyMasterData} />
    <div className="">
    <div className="relative w-full min-h-[calc(100dvh-10dvh)] md:min-h-[calc(100dvh-7dvh)] bg-background-gray">
      <div className="absolute w-full flex justify-center 2md:top-6">
        <HomeHeader />
      </div>
      <div className="absolute w-full h-[550px] bg-blue rounded-b-[25px] sm:rounded-b-[60px] lg:rounded-b-[80px] xl:rounded-b-[100px]">
        
      </div>
      <div className="flex justify-center pt-[10rem] pb-[2rem]  relative z-1 w-full">
        <div className="w-full max-w-[1440px] min-h-[66dvh] flex">
        <ChannelPartnerPageClient />
        </div>    
      </div>
    </div>
  </div>
      {/*  */}
    <AboutusDataSync />
    <HomeFooter />
  </>
  );
}
