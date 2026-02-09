import Link from "next/link";
import { mockProjects } from "../_data/mockProjects";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = mockProjects.find((p) => p.id === projectId);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8">
      <Link href="/projects" className="text-blue underline">
        Back to projects
      </Link>

      <div className="mt-6 rounded-xl border border-border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-text-black">
          {project?.title ?? "Project"}
        </h1>
        <p className="mt-2 text-text-gray">{project?.address ?? ""}</p>

        <p className="mt-4 text-text-gray">
          This is a placeholder details page so the “Read More” link has a real
          Next.js route. We can plug in real API data + a full design next.
        </p>
      </div>
    </div>
  );
}

