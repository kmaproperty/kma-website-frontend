import type { Metadata } from "next";
import ProjectsPageClient from "./_components/ProjectsPageClient";
import { mockProjects } from "./_data/mockProjects";
import MainLayout from "@/components/myList/mainLayout";

export const metadata: Metadata = {
  title: "Projects | KMA Property",
};

export default async function ProjectsPage() {

  return (
    <MainLayout>
      <ProjectsPageClient  />
    </MainLayout>
  );
}

