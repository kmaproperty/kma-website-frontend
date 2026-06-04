"use client";

import { useTransition } from "react";
import { Search, RotateCcw, Check, ChevronDown } from "lucide-react";
import ActiveFilterChips from "./ActiveFilterChips";
import { useProjectsStore } from "../_store/useProjectsStore";
import { useEndUserFilters } from "@/api/hooks/useEndUserFilters";
import type { PostedByTab, ProjectsFilters } from "../_types";
import { cx } from "../_utils/format";

function SelectField({
  value,
  onChange,
  children,
}: {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-11 items-center rounded-[5px] border border-[#DBDBDB] bg-white px-3">
      <select
        value={value}
        onChange={onChange}
        className="w-full cursor-pointer appearance-none bg-transparent pr-9 text-[16px] leading-[20px] text-[#888888] outline-none focus:ring-2 focus:ring-blue/15"
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888888]"
        aria-hidden
      />
    </div>
  );
}

function Section({
  title,
  hint,
  children,
  compact = false,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "py-3" : "py-4"}>
      <div className="flex items-end justify-between gap-3">
        <div className="text-[15px] font-medium text-text-black">{title}</div>
        {hint ? <div className="text-xs text-text-gray">{hint}</div> : null}
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function CheckboxRow({
  checked,
  label,
  onChange,
  disabled,
  compact = false,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
  disabled?: boolean;
  compact?: boolean;
}) {
  return (
    <label
      className={cx(
        compact
          ? "inline-flex min-w-0 max-w-full cursor-pointer items-center gap-2 rounded border px-3 py-1.5 text-sm transition"
          : "flex min-w-0 cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm transition",
        checked
          ? "border-blue bg-light-purple"
          : compact
            ? "border-border"
            : "border-border bg-white",
        disabled
          ? "cursor-not-allowed opacity-50"
          : checked
            ? "hover:brightness-[0.98]"
            : compact
              ? "hover:bg-white"
              : ""
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      <Check
        className={cx(
          "shrink-0 transition",
          compact ? "h-3 w-3" : "h-3.5 w-3.5",
          checked ? "text-blue" : "text-text-gray/50"
        )}
        aria-hidden
      />
      <span
        className={cx(
          "min-w-0 break-words leading-tight",
          checked ? "font-medium text-text-black" : "text-text-gray"
        )}
      >
        {label}
      </span>
    </label>
  );
}

const POSTED_BY_OPTIONS: Array<{ id: PostedByTab; label: string }> = [
  { id: "owner", label: "Owner" },
  { id: "channel_partner", label: "Channel Partner" },
];

export default function FiltersSidebar({
  hideHeader = false,
  compact = false,
}: {
  hideHeader?: boolean;
  compact?: boolean;
}) {
  const tab = useProjectsStore((s) => s.tab);
  const setTab = useProjectsStore((s) => s.setTab);
  const filters = useProjectsStore((s) => s.filters);
  const listingIntent = useProjectsStore((s) => s.listingIntent);
  const resetFilters = useProjectsStore((s) => s.resetFilters);
  const setFilters = useProjectsStore((s) => s.setFilters);
  const setCategoryId = useProjectsStore((s) => s.setCategoryId);
  const togglePropertyTypeIdGroup = useProjectsStore((s) => s.togglePropertyTypeIdGroup);
  const toggleBhkTypeIdGroup = useProjectsStore((s) => s.toggleBhkTypeIdGroup);
  const setFurnishingTypeId = useProjectsStore((s) => s.setFurnishingTypeId);
  const togglePossession = useProjectsStore((s) => s.togglePossession);
  const toggleAmenityId = useProjectsStore((s) => s.toggleAmenityId);

  const isRent = listingIntent === "rent";

  const [isPending, startTransition] = useTransition();

  const categoryId = filters.categoryId ?? undefined;
  const { data: filtersData } = useEndUserFilters({ categoryId });

  const propertyTypeId =
    filters.propertyTypeIds[0] ?? undefined;
  const { data: filtersDataWithBhk } = useEndUserFilters(
    { categoryId, propertyTypeId },
    { enabled: !!propertyTypeId }
  );

  const patchFilters = <K extends keyof ProjectsFilters>(
    key: K,
    value: ProjectsFilters[K]
  ) => {
    setFilters({ [key]: value } as Pick<ProjectsFilters, K>);
  };

  const categories = filtersData?.categories ?? [];

  // Backend sometimes returns the same label (e.g. "Villa", "1 BHK") under
  // multiple ids tied to different property/listing types. Collapse to one
  // label whose toggle flips every id in the group.
  const collapseByName = <T extends { id: string; name: string }>(list: T[]) => {
    const byName = new Map<string, { name: string; ids: string[] }>();
    for (const b of list) {
      const label = (b?.name ?? "").trim();
      if (!label) continue;
      const existing = byName.get(label);
      if (existing) {
        if (!existing.ids.includes(b.id)) existing.ids.push(b.id);
      } else {
        byName.set(label, { name: label, ids: [b.id] });
      }
    }
    return Array.from(byName.values());
  };

  const propertyTypes = collapseByName(filtersData?.propertyTypes ?? []);
  const rawBhkTypes =
    propertyTypeId != null
      ? (filtersDataWithBhk?.bhkTypes ?? [])
      : (filtersData?.bhkTypes ?? []);
  const bhkTypes = collapseByName(rawBhkTypes);
  const furnishingList = filtersData?.furnishing ?? [];
  const amenitiesList = filtersData?.amenities ?? [];

  const setBudget = (key: "minBudget" | "maxBudget", raw: string) => {
    const v = raw === "" ? null : Number(raw);
    startTransition(() =>
      patchFilters(key, v == null ? null : Number.isFinite(v) ? v : null)
    );
  };

  const setSize = (key: "minSizeSqYd" | "maxSizeSqYd", raw: string) => {
    const v = raw === "" ? null : Number(raw);
    startTransition(() =>
      patchFilters(key, v == null ? null : Number.isFinite(v) ? v : null)
    );
  };

  return (
    <div className="overflow-hidden rounded-lg">
      <div className={cx("z-10 border-b border-[#00000012] pb-3 pt-3", hideHeader ? "" : "sticky top-0 bg-white")}>
        {!hideHeader && (
          <div className="flex items-center justify-between gap-3">
            <div className="text-base font-semibold text-text-black">Filters</div>
            <button
              onClick={() => startTransition(() => resetFilters())}
              className="flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-sm font-medium text-blue hover:bg-light-purple hover:underline"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        )}

        {hideHeader && (
          <div className="flex items-center justify-between pb-2.5">
            <p className="text-[#8A8A8A] text-[16px] leading-[20px] font-medium">Filters</p>
            <button
              onClick={() => startTransition(() => resetFilters())}
              className="text-sm text-text-black leading-[20px] font-medium cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        <ActiveFilterChips />

        {isPending && (
          <div className="mt-3 rounded bg-light-purple px-3 py-2 text-xs text-blue">
            Updating filters…
          </div>
        )}
      </div>

      <div className="divide-y divide-[#00000012]">
        {/* <Section
          title="Budget"
          hint={isRent ? "₹ / month" : "₹ Crore"}
          compact={compact}
        >
          <div className="grid grid-cols-2 gap-3.5">
            <SelectField
              value={filters.minBudget ?? ""}
              onChange={(e) => setBudget("minBudget", e.target.value)}
            >
              <option value="">Min</option>
              {(isRent
                ? [
                    { value: 5_000, label: "₹ 5K" },
                    { value: 10_000, label: "₹ 10K" },
                    { value: 15_000, label: "₹ 15K" },
                    { value: 25_000, label: "₹ 25K" },
                    { value: 50_000, label: "₹ 50K" },
                    { value: 100_000, label: "₹ 1L" },
                  ]
                : [
                    { value: 5_000_000, label: "₹ 0.5 Cr" },
                    { value: 10_000_000, label: "₹ 1 Cr" },
                    { value: 14_000_000, label: "₹ 1.4 Cr" },
                    { value: 20_000_000, label: "₹ 2 Cr" },
                    { value: 50_000_000, label: "₹ 5 Cr" },
                    { value: 100_000_000, label: "₹ 10 Cr" },
                  ]
              ).map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SelectField>
            <SelectField
              value={filters.maxBudget ?? ""}
              onChange={(e) => setBudget("maxBudget", e.target.value)}
            >
              <option value="">Max</option>
              {(isRent
                ? [
                    { value: 10_000, label: "₹ 10K" },
                    { value: 25_000, label: "₹ 25K" },
                    { value: 50_000, label: "₹ 50K" },
                    { value: 100_000, label: "₹ 1L" },
                    { value: 200_000, label: "₹ 2L" },
                    { value: 500_000, label: "₹ 5L" },
                  ]
                : [
                    { value: 10_000_000, label: "₹ 1 Cr" },
                    { value: 20_000_000, label: "₹ 2 Cr" },
                    { value: 50_000_000, label: "₹ 5 Cr" },
                    { value: 100_000_000, label: "₹ 10 Cr" },
                    { value: 200_000_000, label: "₹ 20 Cr" },
                  ]
              ).map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SelectField>
          </div>
        </Section> */}

        <Section
          title="Budget"
          hint={isRent ? "₹ / month" : "₹ Crore"}
          compact={compact}
        >
          <div className="grid grid-cols-2 gap-3.5">
            {/* Min Budget Dropdown */}
            <SelectField
              value={filters.minBudget ?? ""}
              onChange={(e) => {
                const newMin = e.target.value ? Number(e.target.value) : null;
                // Pehle min value set karo standard method se
                setBudget("minBudget", e.target.value);
                
                // 🎯 SAFE ROLLBACK: Agar naya min select karne par purana max chhota ya barabar ho jata hai, toh max ko reset kar do
                if (filters.maxBudget && newMin && newMin >= filters.maxBudget) {
                  setBudget("maxBudget", "");
                }
              }}
            >
              <option value="">Min</option>
              {(isRent
                ? [
                    { value: 5_000, label: "₹ 5K" },
                    { value: 10_000, label: "₹ 10K" },
                    { value: 15_000, label: "₹ 15K" },
                    { value: 25_000, label: "₹ 25K" },
                    { value: 50_000, label: "₹ 50K" },
                    { value: 100_000, label: "₹ 1L" },
                  ]
                : [
                    { value: 5_000_000, label: "₹ 0.5 Cr" },
                    { value: 10_000_000, label: "₹ 1 Cr" },
                    { value: 14_000_000, label: "₹ 1.4 Cr" },
                    { value: 20_000_000, label: "₹ 2 Cr" },
                    { value: 50_000_000, label: "₹ 5 Cr" },
                    { value: 100_000_000, label: "₹ 10 Cr" },
                  ]
              ).map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SelectField>

            {/* Max Budget Dropdown */}
            <SelectField
              value={filters.maxBudget ?? ""}
              onChange={(e) => setBudget("maxBudget", e.target.value)}
            >
              <option value="">Max</option>
              {(isRent
                ? [
                    { value: 10_000, label: "₹ 10K" },
                    { value: 25_000, label: "₹ 25K" },
                    { value: 50_000, label: "₹ 50K" },
                    { value: 100_000, label: "₹ 1L" },
                    { value: 200_000, label: "₹ 2L" },
                    { value: 500_000, label: "₹ 5L" },
                  ]
                : [
                    { value: 10_000_000, label: "₹ 1 Cr" },
                    { value: 20_000_000, label: "₹ 2 Cr" },
                    { value: 50_000_000, label: "₹ 5 Cr" },
                    { value: 100_000_000, label: "₹ 10 Cr" },
                    { value: 200_000_000, label: "₹ 20 Cr" },
                  ]
              )
              // 🎯 FIXED: Max dropdown mein sirf minBudget se badi values hi filter hokar visible hongi
              .filter((o) => !filters.minBudget || o.value > filters.minBudget)
              .map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SelectField>
          </div>
        </Section>

        <Section title="Size" hint="Sq. Yd." compact={compact}>
          <div className="grid grid-cols-2 gap-3.5">
            <SelectField
              value={filters.minSizeSqYd ?? ""}
              onChange={(e) => setSize("minSizeSqYd", e.target.value)}
            >
              <option value="">Min</option>
              {[50, 100, 200, 300, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000].map((v) => (
                <option key={v} value={v}>
                  {v} Sq.Yd.
                </option>
              ))}
            </SelectField>
            <SelectField
              value={filters.maxSizeSqYd ?? ""}
              onChange={(e) => setSize("maxSizeSqYd", e.target.value)}
            >
              <option value="">Max</option>
              {[100, 200, 300, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000].map((v) => (
                <option key={v} value={v}>
                  {v} Sq.Yd.
                </option>
              ))}
            </SelectField>
          </div>
        </Section>

        <Section title="Building Type" compact={compact}>
          <div className="grid grid-cols-2 gap-3.5">
            <button
              onClick={() => startTransition(() => setCategoryId(null))}
              className={cx(
                "h-11 cursor-pointer rounded-[5px] border px-4 text-[15px] font-medium transition",
                filters.categoryId == null
                  ? "border-blue bg-blue text-white"
                  : "border-border  text-text-gray"
              )}
              aria-pressed={filters.categoryId == null}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() =>
                  startTransition(() =>
                    setCategoryId(filters.categoryId === c.id ? null : c.id)
                  )
                }
                className={cx(
                  "h-11 cursor-pointer rounded-[5px] border px-4 text-[15px] font-medium transition",
                  filters.categoryId === c.id
                    ? "border-blue bg-blue text-white"
                    : "border-border  text-text-gray"
                )}
                aria-pressed={filters.categoryId === c.id}
              >
                {c.name}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Localities" hint="Search by area" compact={compact}>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-gray" />
            <input
              value={filters.searchLocality}
              onChange={(e) =>
                startTransition(() => setFilters({ searchLocality: e.target.value }))
              }
              placeholder="Search locality..."
              className="h-9 w-full rounded-md border border-border  pl-9 pr-3 text-sm text-text-gray outline-none transition focus:border-blue"
            />
          </div>
        </Section>

        <Section title="Posted by" compact={compact}>
          <div className="grid grid-cols-2 gap-1">
            {POSTED_BY_OPTIONS.map((t) => (
              <button
                key={t.id}
                onClick={() => startTransition(() => setTab(t.id))}
                className={cx(
                  "h-9 cursor-pointer rounded-md border text-sm transition",
                  tab === t.id
                    ? "border-blue bg-blue text-white"
                    : "border-border  text-text-gray"
                )}
                aria-pressed={tab === t.id}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Property Type" compact={compact}>
          <div className="flex flex-wrap gap-1">
            {propertyTypes.map((p) => {
              const isChecked = p.ids.some((id) => filters.propertyTypeIds.includes(id));
              return (
                <CheckboxRow
                  key={p.name}
                  checked={isChecked}
                  label={p.name}
                  onChange={() =>
                    startTransition(() => togglePropertyTypeIdGroup(p.ids))
                  }
                  compact
                />
              );
            })}
          </div>
        </Section>

        <Section title="Bedroom" compact={compact}>
          <div className="flex flex-wrap gap-2">
            {bhkTypes.map((b) => {
              const isChecked = b.ids.some((id) => filters.bhkTypeIds.includes(id));
              return (
                <CheckboxRow
                  key={b.name}
                  checked={isChecked}
                  label={b.name}
                  onChange={() =>
                    startTransition(() => toggleBhkTypeIdGroup(b.ids))
                  }
                  compact
                />
              );
            })}
          </div>
        </Section>

        <Section title="Furnishing Status" compact={compact}>
          <div className="flex flex-wrap gap-2">
            <CheckboxRow
              checked={filters.furnishingTypeId == null}
              label="Any"
              onChange={() =>
                startTransition(() => setFurnishingTypeId(null))
              }
              compact
            />
            {furnishingList.map((f) => (
              <CheckboxRow
                key={f.id}
                checked={filters.furnishingTypeId === f.id}
                label={f.name}
                onChange={() =>
                  startTransition(() =>
                    setFurnishingTypeId(
                      filters.furnishingTypeId === f.id ? null : f.id
                    )
                  )
                }
                compact
              />
            ))}
          </div>
        </Section>

        <Section title="Possession Status" compact={compact}>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "ready_to_move" as const, label: "Ready To Move" },
              { id: "under_construction" as const, label: "Under Construction" },
            ].map((p) => (
              <CheckboxRow
                key={p.id}
                checked={filters.possessionStatuses.includes(p.id)}
                label={p.label}
                onChange={() => startTransition(() => togglePossession(p.id))}
                compact
              />
            ))}
          </div>
        </Section>

        <Section title="Amenities" compact={compact}>
          <div className="flex flex-wrap gap-2">
            {amenitiesList.map((a) => (
              <CheckboxRow
                key={a.id}
                checked={filters.amenityIds.includes(a.id)}
                label={a.name}
                onChange={() => startTransition(() => toggleAmenityId(a.id))}
                compact
              />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
