import type { Metadata } from "next";
import ProjectsPageClient from "./_components/ProjectsPageClient";
import { mockProjects } from "./_data/mockProjects";
import MainLayout from "@/components/myList/mainLayout";
import { fetchPropertyMasterData } from "../api/home";
import HomeFooter from "@/components/footer/homeFooter";

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
     <MainLayout>
      <ProjectsPageClient />
    </MainLayout>
      <HomeFooter propertyMasterData={propertyMasterData} />
    </>
   
  );
}

