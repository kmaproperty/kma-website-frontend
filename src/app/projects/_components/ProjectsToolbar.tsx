"use client";

import { useTransition } from "react";
import { ChevronDown, Leaf, Shield } from "lucide-react";
import { useProjectsStore } from "../_store/useProjectsStore";
import type { PostedByTab, SortOption } from "../_types";
import { cx } from "../_utils/format";

const TABS: Array<{
  id: PostedByTab;
  label: string;
  icon?: React.ReactNode;
}> = [
  { id: "all", label: "All" },
  {
    id: "owner",
    label: "Owner",
    icon: <Leaf className="h-4 w-4 text-[#16A34A]" />,
  },
  {
    id: "channel_partner",
    label: "Channel Partner",
    icon: <Shield className="h-4 w-4 text-text-black" />,
  },
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
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-3 text-sm text-text-gray">
        <span>
          Showing{" "}
          <span className="font-semibold text-blue">{total} Property</span>
        </span>
        <span>|</span>
        <span className="text-text-gray">New Projects in Chandigarh</span>
        {isPending ? (
          <span className="ml-1 rounded-full bg-light-purple px-2 py-0.5 text-xs font-medium text-blue">
            Updating…
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => startTransition(() => setTab(t.id))}
              className={cx(
                "inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border px-5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/30",
                tab === t.id
                  ? "border-blue bg-blue text-white"
                  : "border-border bg-white text-text-gray hover:bg-background-gray"
              )}
              aria-pressed={tab === t.id}
            >
              {t.icon ? <span aria-hidden>{t.icon}</span> : null}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3">
          <span className="text-sm font-semibold text-text-black">Sort By :</span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => startTransition(() => setSort(e.target.value as SortOption))}
              className="h-10 min-w-[180px] cursor-pointer appearance-none rounded-full border border-border bg-background-gray px-4 pr-10 text-sm text-text-gray outline-none focus:border-blue"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-gray" />
          </div>
        </div>
      </div>
    </div>
  );
}

