"use client";

import { useDeferredValue, useMemo } from "react";
import type { Project } from "../_types";
import { applyProjectsQuery } from "../_utils/filtering";
import FiltersSidebar from "./FiltersSidebar";
import ProjectsToolbar from "./ProjectsToolbar";
import ProjectCard from "./ProjectCard";
import { useProjectsStore } from "../_store/useProjectsStore";

export default function ProjectsPageClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const tab = useProjectsStore((s) => s.tab);
  const sort = useProjectsStore((s) => s.sort);
  const filters = useProjectsStore((s) => s.filters);

  const deferredFilters = useDeferredValue(filters);
  const deferredSort = useDeferredValue(sort);
  const deferredTab = useDeferredValue(tab);

  const filtered = useMemo(() => {
    return applyProjectsQuery({
      projects: initialProjects,
      tab: deferredTab,
      filters: deferredFilters,
      sort: deferredSort,
    });
  }, [initialProjects, deferredFilters, deferredSort, deferredTab]);

  return (
    <div className="w-full bg-background-gray">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <FiltersSidebar />
          </aside>

          <main className="min-w-0">
            <ProjectsToolbar total={filtered.length} />

            <div className="mt-4 flex flex-col gap-4">
              {filtered.map((p, idx) => (
                <div
                  key={p.id}
                  style={{ contentVisibility: "auto", containIntrinsicSize: "260px" }}
                >
                  <ProjectCard project={p} priority={idx < 2} />
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="rounded-xl border border-border bg-white p-8 text-center text-text-gray">
                  No projects match your filters.
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

