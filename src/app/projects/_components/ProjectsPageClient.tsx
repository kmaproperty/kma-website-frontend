"use client";

import { useDeferredValue, useMemo } from "react";
import { Crosshair, Search } from "lucide-react";
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
  const setFilters = useProjectsStore((s) => s.setFilters);

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
    <div className="w-full">
      {/* Hero / page heading (matches screenshot top section) */}
      <div className="w-full px-1 sm:px-2">
        <div className="text-xs font-medium text-text-light-gray">
          Home <span className="px-1">/</span>
          <span className="text-white"> New Project in Chandigarh</span>
        </div>

        <h1 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
          All Property List
        </h1>
      </div>

      {/* White rounded container (as in screenshot) */}
      <section className="mt-7 w-full rounded-[28px] bg-white px-4 py-6 shadow-sm sm:px-6 lg:px-8">
        {/* Search row (inside the white container) */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
          <div className="relative w-full lg:max-w-[640px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-gray" />
            <input
              value={filters.searchText}
              onChange={(e) => setFilters({ searchText: e.target.value })}
              placeholder="Search by Project Name, Neighborhood, or Builder...."
              className="h-12 w-full rounded-full border border-border bg-white px-12 pr-4 text-sm text-text-black outline-none transition focus:border-blue"
            />
          </div>

          <button
            type="button"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background-gray px-6 text-sm font-medium text-text-gray transition hover:brightness-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/20"
          >
            <Crosshair className="h-4 w-4" />
            Near Me Properties
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
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
      </section>
    </div>
  );
}

