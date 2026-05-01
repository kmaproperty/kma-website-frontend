"use client";

import { X } from "lucide-react";
import { useProjectsStore } from "../_store/useProjectsStore";
import { useEndUserFilters } from "@/api/hooks/useEndUserFilters";
import { cx } from "../_utils/format";

function findNameById(
  list: Array<{ id: string; name: string }> | undefined,
  id: string
): string {
  return list?.find((x) => x.id === id)?.name ?? id;
}

function formatBudget(value: number, isRent: boolean): string {
  if (!Number.isFinite(value)) return `₹ ${value}`;
  if (isRent) {
    if (value >= 100000) return `₹ ${value / 100000} L`;
    if (value >= 1000) return `₹ ${value / 1000} K`;
    return `₹ ${value}`;
  }
  return `₹ ${value / 10_000_000} Cr`;
}

export default function ActiveFilterChips() {
  const filters = useProjectsStore((s) => s.filters);
  const listingIntent = useProjectsStore((s) => s.listingIntent);
  const removeChip = useProjectsStore((s) => s.removeChip);
  const removeChipGroup = useProjectsStore((s) => s.removeChipGroup);
  const { data: filterOptions } = useEndUserFilters({});

  const isRent = listingIntent === "rent";
  type Chip = { id: string; label: string; ids?: string[] };
  const chips: Chip[] = [];

  if (filters.categoryId != null) {
    chips.push({
      id: `chip:category:${filters.categoryId}`,
      label: findNameById(filterOptions?.categories, filters.categoryId),
    });
  }

  // Property type IDs may map to the same label (e.g. "Villa" repeated across
  // property types). Group by label so the user sees one chip per label and
  // removing it clears every underlying id.
  const propertyTypeGroups = new Map<string, string[]>();
  for (const id of filters.propertyTypeIds) {
    const label = findNameById(filterOptions?.propertyTypes, id);
    const existing = propertyTypeGroups.get(label) ?? [];
    if (!existing.includes(id)) existing.push(id);
    propertyTypeGroups.set(label, existing);
  }
  for (const [label, ids] of propertyTypeGroups) {
    chips.push({
      id: `chip:propertyType:${ids[0]}`,
      label,
      ids,
    });
  }

  const bhkGroups = new Map<string, string[]>();
  for (const id of filters.bhkTypeIds) {
    const label = findNameById(filterOptions?.bhkTypes, id);
    const existing = bhkGroups.get(label) ?? [];
    if (!existing.includes(id)) existing.push(id);
    bhkGroups.set(label, existing);
  }
  for (const [label, ids] of bhkGroups) {
    chips.push({
      id: `chip:bhk:${ids[0]}`,
      label,
      ids,
    });
  }

  if (filters.furnishingTypeId != null) {
    chips.push({
      id: "chip:furnishing:any",
      label: findNameById(filterOptions?.furnishing, filters.furnishingTypeId),
    });
  }

  for (const id of filters.amenityIds) {
    chips.push({
      id: `chip:amenity:${id}`,
      label: findNameById(filterOptions?.amenities, id),
    });
  }

  if (filters.minBudget != null || filters.maxBudget != null) {
    const min = filters.minBudget != null ? formatBudget(filters.minBudget, isRent) : "Any";
    const max = filters.maxBudget != null ? formatBudget(filters.maxBudget, isRent) : "Any";
    chips.push({ id: "chip:budget", label: `${min} – ${max}${isRent ? " /mo" : ""}` });
  }

  if (!chips.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {chips.map((c) => (
        <button
          key={c.id}
          onClick={() => (c.ids && c.ids.length > 1 ? removeChipGroup(c.id, c.ids) : removeChip(c.id))}
          className={cx(
            "group flex cursor-pointer items-center gap-2 rounded-md border border-[#C7C6FF] bg-[#F7F7FF] px-3 py-1.5 text-xs text-text-gray transition hover:brightness-[0.98]"
          )}
        >
          <span>{c.label}</span>
          <span className="rounded-md p-0.5 text-text-gray group-hover:bg-white/60">
            <X className="h-3.5 w-3.5" />
          </span>
        </button>
      ))}
    </div>
  );
}
