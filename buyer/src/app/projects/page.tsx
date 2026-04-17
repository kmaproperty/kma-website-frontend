import type { Metadata } from "next";
import ProjectsPageClient from "./_components/ProjectsPageClient";
import MainLayout from "@/components/myList/mainLayout";
import { fetchPropertyMasterData } from "../api/home";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HeaderDataSync from "@/components/header/HeaderDataSync";

export const metadata: Metadata = {
  title: "Projects | KMA Property",
};

export default async function ProjectsPage() {
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
        <ProjectsPageClient />
      </MainLayout>
      <AboutusDataSync />
      <HomeFooter />
    </>
  );
}

