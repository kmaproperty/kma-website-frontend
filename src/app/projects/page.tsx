import type { Metadata } from "next";
import ProjectsPageClient from "./_components/ProjectsPageClient";
import { mockProjects } from "./_data/mockProjects";

export const metadata: Metadata = {
  title: "Projects | KMA Property",
};

export default async function ProjectsPage() {
  // Server component: fast first paint + SEO friendly shell.
  // Interactions (filters/sort/favorite) are handled client-side.
  return <ProjectsPageClient initialProjects={mockProjects} />;
}

