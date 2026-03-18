import type { Metadata } from "next";
import MainLayout from "@/components/myList/mainLayout";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HeaderDataSync from "@/components/header/HeaderDataSync";
import { fetchPropertyMasterData } from "@/app/api/home";
import ChannelPartnerPageClient from "./_components/ChannelPartnerPageClient";

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
      <MainLayout>
        <ChannelPartnerPageClient />
      </MainLayout>
      <AboutusDataSync />
      <HomeFooter />
    </>
  );
}
