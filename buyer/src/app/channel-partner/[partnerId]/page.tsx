import type { Metadata } from "next";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HeaderDataSync from "@/components/header/HeaderDataSync";
import { fetchPropertyMasterData } from "@/app/api/home";
import ChannelPartnerDetailsClient from "./_components/ChannelPartnerDetailsClient";
import ChannelPartnerHeroLayout from "../_components/ChannelPartnerHeroLayout";

export const metadata: Metadata = {
  title: "Channel Partner | KMA Property",
  description: "View channel partner profile and active listings.",
};

export default async function ChannelPartnerDetailPage({
  params,
}: {
  params: Promise<{ partnerId: string }>;
}) {
  const { partnerId } = await params;

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
        <ChannelPartnerHeroLayout
          headerClassName="sticky -top-[25px] z-50 w-full flex justify-center bg-[#010048] rounded-b-[28px] pb-2 sm:rounded-b-[34px] sm:pb-3 lg:rounded-b-none lg:bg-transparent lg:pb-0 2md:pt-6"
          heroClassName="hidden lg:block absolute top-0 left-0 w-full h-[550px] rounded-b-[25px] sm:rounded-b-[60px] lg:rounded-b-[80px] xl:rounded-b-[100px] bg-cover bg-center"
          contentWrapClassName="flex justify-center pt-5 sm:pt-6 lg:pt-[7rem] pb-[2rem] relative z-1 w-full"
        >
          <ChannelPartnerDetailsClient partnerId={partnerId} />
        </ChannelPartnerHeroLayout>
      </div>
      <AboutusDataSync />
      <HomeFooter />
    </>
  );
}

