export const dynamic = 'force-dynamic';
import MainLayout from "@/components/myList/mainLayout";
import ProjectsPageClient from "../_components/ProjectsPageClient";
import { fetchPropertyMasterData } from "@/app/api/home";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HeaderDataSync from "@/components/header/HeaderDataSync";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  let propertyMasterData: unknown[] = [];
  try {
    const response = await fetchPropertyMasterData();
    if (response?.success && Array.isArray(response.data)) {
      propertyMasterData = response.data;
    }
  } catch {
    // Gracefully handle — page still renders with empty master data
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

