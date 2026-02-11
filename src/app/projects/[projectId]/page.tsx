 "use client";

import Link from "next/link";
import { usePropertyDetails } from "@/api/hooks/usePropertyDetails";

export default function ProjectDetailsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const projectId = params?.projectId;
  const {
    data: project,
    isPending,
    isError,
  } = usePropertyDetails({ id: projectId });

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8">
      <Link href="/projects" className="text-blue underline">
        Back to projects
      </Link>

      <div className="mt-6 rounded-xl border border-border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-text-black">
          {isPending
            ? "Loading project..."
            : project?.propertyName ?? project?.title ?? "Project"}
        </h1>
        <p className="mt-2 text-text-gray">{project?.address ?? ""}</p>

        {isError ? (
          <p className="mt-4 text-sm text-red-600">
            Could not load project details. Please try again.
          </p>
        ) : (
          <p className="mt-4 text-text-gray">
            {String(project?.description ?? "No description available.")}
          </p>
        )}
      </div>
    </div>
  );
}

