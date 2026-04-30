import type { Metadata } from "next";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HeaderDataSync from "@/components/header/HeaderDataSync";
import { fetchPropertyMasterData } from "@/app/api/home";
import ChannelPartnerPageClient from "./_components/ChannelPartnerPageClient";
import ChannelPartnerHeroLayout from "./_components/ChannelPartnerHeroLayout";
export const metadata: Metadata = {
  title: "Channel Partner | KMA Property",
  description: "View channel partner profile and active listings.",
};

export default async function ChannelPartnerListingPage() {
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
        <ChannelPartnerHeroLayout>
          <ChannelPartnerPageClient />
        </ChannelPartnerHeroLayout>
      </div>
      <AboutusDataSync />
      <HomeFooter />
    </>
  );
}

