import type { Metadata } from "next";
import MainLayout from "@/components/myList/mainLayout";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HeaderDataSync from "@/components/header/HeaderDataSync";
import { fetchPropertyMasterData } from "@/app/api/home";
import ChannelPartnerPageClient from "./_components/ChannelPartnerPageClient";
import ChannelPartnerDetailsClient from "./_components/ChannelPartnerPageClient";
import HomeHeader from "@/components/header/homeHeader";
import channelPartnerHeroBg from "@/assets/channel-partner-herobg.jpg";
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
      <div className="relative w-full min-h-[calc(100dvh-10dvh)] md:min-h-[calc(100dvh-7dvh)] bg-list-background">
        <div className="sticky top-0 z-50 w-full flex justify-center 2md:pt-6">
          <HomeHeader />
        </div>
        <div
          className="absolute top-0 left-0 w-full h-[430px] sm:h-[550px] rounded-b-[16px] sm:rounded-b-[60px] lg:rounded-b-[80px] xl:rounded-b-[100px] bg-cover bg-center"
          style={{
            backgroundImage:
              `linear-gradient(0deg, #00000099, #00000099), url('${channelPartnerHeroBg.src}')`,
          }}
        />
        <div className="relative z-1 flex w-full justify-center pb-[2rem] pt-[8.5rem] sm:pt-[9.5rem] md:pt-[10.5rem] lg:pt-[11.5rem]">
          <div className="w-full max-w-[1440px] min-h-[66dvh] flex">
          <ChannelPartnerDetailsClient partnerId={partnerId} />
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

