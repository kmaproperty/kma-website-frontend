import type { Metadata } from "next";
import { Suspense } from "react";
import MainLayout from "@/components/layouts/BuyerMainLayout";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HeaderDataSync from "@/components/header/HeaderDataSync";
import { fetchPropertyMasterData } from "../api/home";
import RecentlyViewedPageClient from "./_components/RecentlyViewedPageClient";

export const metadata: Metadata = {
  title: "Recently Viewed | KMA Property",
};

export default async function RecentlyViewedPage() {
  let propertyMasterData: any = await fetchPropertyMasterData();
  if (propertyMasterData?.success) {
    propertyMasterData = propertyMasterData.data;
  } else {
    propertyMasterData = [];
  }

  return (
    <>
      <HeaderDataSync propertyMasterData={propertyMasterData} />
      <MainLayout>
        <Suspense fallback={null}>
          <RecentlyViewedPageClient />
        </Suspense>
      </MainLayout>
      <AboutusDataSync />
      <HomeFooter />
    </>
  );
}
