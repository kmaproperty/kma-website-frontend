"use client";

import { X } from "lucide-react";
import { useProjectsStore } from "../_store/useProjectsStore";
import type { PropertyType } from "../_types";
import { cx, titleCase } from "../_utils/format";

function typeLabel(t: PropertyType) {
  switch (t) {
    case "retail_shop":
      return "Retail shop";
    case "office_space":
      return "Of Space";
    case "ind_floor":
      return "Ind Floor";
    default:
      return titleCase(t.replaceAll("_", " "));
  }
}

export default function ActiveFilterChips() {
  const filters = useProjectsStore((s) => s.filters);
  const removeChip = useProjectsStore((s) => s.removeChip);

  const chips: Array<{ id: string; label: string }> = [];

  // screenshot-like chips
  for (const t of filters.propertyTypes) {
    if (t === "retail_shop") chips.push({ id: "chip:retail_shop", label: typeLabel(t) });
    if (t === "office_space") chips.push({ id: "chip:office_space", label: typeLabel(t) });
  }

  if (filters.minBudget != null || filters.maxBudget != null) {
    const min = filters.minBudget != null ? `₹ ${filters.minBudget} Crore` : "Any";
    const max = filters.maxBudget != null ? `₹ ${filters.maxBudget} Crore` : "Any";
    chips.push({ id: "chip:budget", label: `${min} – ${max}` });
  }

  if (!chips.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {chips.map((c) => (
        <button
          key={c.id}
          onClick={() => removeChip(c.id)}
          className={cx(
            "group flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-xs text-text-gray transition hover:bg-background-gray"
          )}
        >
          <span>{c.label}</span>
          <span className="rounded-md p-0.5 text-text-gray group-hover:bg-white">
            <X className="h-3.5 w-3.5" />
          </span>
        </button>
      ))}
    </div>
  );
}

