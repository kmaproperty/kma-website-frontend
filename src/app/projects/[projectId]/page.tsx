import MainLayout from "@/components/myList/mainLayout";
import ProjectsPageClient from "../_components/ProjectsPageClient";
import { fetchPropertyMasterData } from "@/app/api/home";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HeaderDataSync from "@/components/header/HeaderDataSync";

export default async function ProjectDetailsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const projectId = params?.projectId;
  const response = await fetchPropertyMasterData();
  let propertyMasterData: unknown[] = [];
  if (response && response.success) {
    propertyMasterData = response.data as unknown[];
  }

  return (
    <>
      <HeaderDataSync propertyMasterData={propertyMasterData} />
      <MainLayout>
        <ProjectsPageClient cityId={projectId} />
      </MainLayout>
      <AboutusDataSync />
      <HomeFooter />
    </>
  );
}

