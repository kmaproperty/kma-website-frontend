"use client";

import { useDeferredValue, useMemo } from "react";
import { Search } from "lucide-react";
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
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-medium text-text-light-gray">
          Home <span className="px-1">/</span>
          <span className="text-white"> New Project in Chandigarh</span>
        </div>
      </div>

      <section className="mt-7 w-full px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <h1 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            All Property List
          </h1>

          <div className="mt-4 flex flex-row space-between gap-3 rounded-[28px]  bg-white p-4  sm:p-5 lg:absolute lg:right-0 lg:top-15 lg:mt-0 lg:w-[80%] lg:max-w-[80%] lg:rounded-[34px_34px_0_0] lg:border-b-0">
            <div className="relative w-[80%]">
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1_12821)">
                  <path d="M12 7.63635C9.5891 7.63635 7.6364 9.5891 7.6364 12C7.6364 14.4109 9.5891 16.3636 12 16.3636C14.411 16.3636 16.3636 14.4109 16.3636 12C16.3636 9.58915 14.4109 7.63635 12 7.63635ZM21.7528 10.9091C21.2509 6.35999 17.64 2.74909 13.0909 2.24729V0H10.9091V2.24729C6.35999 2.74909 2.74909 6.35999 2.24729 10.9091H0V13.0909H2.24729C2.74909 17.64 6.36004 21.2509 10.9091 21.7528V24H13.0909V21.7528C17.64 21.2509 21.2509 17.64 21.7528 13.0909H24V10.9091H21.7528ZM12 19.6364C7.78368 19.6364 4.36367 16.2164 4.36367 12C4.36367 7.78368 7.78368 4.36367 12 4.36367C16.2164 4.36367 19.6364 7.78362 19.6364 12C19.6364 16.2164 16.2164 19.6364 12 19.6364Z" fill="#888888" />
                </g>
                <defs>
                  <clipPath id="clip0_1_12821">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              Near Me Properties
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 rounded-2xl bg-white p-4 lg:mt-20 lg:grid-cols-[300px_1fr]">
          <aside className="mt-10 rounded-xl bg-background-gray p-4 lg:sticky lg:top-6 lg:mt-0 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain">
            <FiltersSidebar />
          </aside>

          <main className="min-w-0 mt-8">
            <div className="rounded-2xl p-4  sm:p-5">
              <div>
                <ProjectsToolbar total={filtered.length} />

              </div>

              <div className="mt-4 flex flex-col gap-4">
                {filtered.map((p, idx) => (
                  <div
                    key={p.id}
                    style={{
                      contentVisibility: "auto",
                      containIntrinsicSize: "260px",
                    }}
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
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}

