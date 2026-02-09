"use client";

import { useTransition } from "react";
import { useProjectsStore } from "../_store/useProjectsStore";
import type { PostedByTab, SortOption } from "../_types";
import { cx } from "../_utils/format";

const TABS: Array<{ id: PostedByTab; label: string }> = [
  { id: "all", label: "All" },
  { id: "owner", label: "Owner" },
  { id: "channel_partner", label: "Channel Partner" },
];

const SORTS: Array<{ id: SortOption; label: string }> = [
  { id: "price_low_high", label: "Price: Low to High" },
  { id: "price_high_low", label: "Price: High to Low" },
];

export default function ProjectsToolbar({ total }: { total: number }) {
  const tab = useProjectsStore((s) => s.tab);
  const sort = useProjectsStore((s) => s.sort);
  const setTab = useProjectsStore((s) => s.setTab);
  const setSort = useProjectsStore((s) => s.setSort);

  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-xl border border-border bg-white px-4 py-3 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-sm text-text-gray">
          <span>
            Showing <span className="font-semibold text-text-black">{total}</span>{" "}
            Projects
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="text-text-gray">New Projects in Chandigarh</span>
          {isPending && (
            <span className="ml-1 rounded-full bg-light-purple px-2 py-0.5 text-xs text-blue">
              Updating…
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex w-full items-center gap-2 sm:w-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => startTransition(() => setTab(t.id))}
                className={cx(
                  "cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition",
                  tab === t.id
                    ? "border-blue bg-blue text-white"
                    : "border-border bg-white text-text-gray hover:bg-background-gray"
                )}
                aria-pressed={tab === t.id}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2">
            <span className="text-sm text-text-gray">Sort By :</span>
            <select
              value={sort}
              onChange={(e) =>
                startTransition(() => setSort(e.target.value as SortOption))
              }
              className="h-10 cursor-pointer rounded-lg border border-border bg-white px-3 text-sm text-text-gray outline-none focus:border-blue"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

