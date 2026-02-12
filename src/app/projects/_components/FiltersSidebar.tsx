"use client";

import { useMemo, useTransition } from "react";
import { Search, RotateCcw, Check } from "lucide-react";
import ActiveFilterChips from "./ActiveFilterChips";
import { useProjectsStore } from "../_store/useProjectsStore";
import type {
  Amenity,
  BuildingType,
  Furnishing,
  ProjectsFilters,
  PostedByTab,
  PossessionStatus,
  PropertyType,
} from "../_types";
import { cx } from "../_utils/format";

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-4">
      <div className="flex items-end justify-between gap-3">
        <div className="text-sm font-semibold text-text-black">{title}</div>
        {hint ? <div className="text-xs text-text-gray">{hint}</div> : null}
      </div>
      <div className="mt-2">{children}</div>
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
            ? "border-border bg-background-gray"
            : "border-border bg-white",
        disabled
          ? "cursor-not-allowed opacity-50"
          : checked
            ? "hover:brightness-[0.98]"
            : compact
              ? "hover:bg-white"
              : "hover:bg-background-gray"
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

export default function FiltersSidebar() {
  const tab = useProjectsStore((s) => s.tab);
  const setTab = useProjectsStore((s) => s.setTab);
  const filters = useProjectsStore((s) => s.filters);
  const resetFilters = useProjectsStore((s) => s.resetFilters);
  const setFilters = useProjectsStore((s) => s.setFilters);
  const setBuildingType = useProjectsStore((s) => s.setBuildingType);
  const togglePropertyType = useProjectsStore((s) => s.togglePropertyType);
  const toggleBedroom = useProjectsStore((s) => s.toggleBedroom);
  const setFurnishing = useProjectsStore((s) => s.setFurnishing);
  const togglePossession = useProjectsStore((s) => s.togglePossession);
  const toggleAmenity = useProjectsStore((s) => s.toggleAmenity);

  const [isPending, startTransition] = useTransition();

  const patchFilters = <K extends keyof ProjectsFilters>(
    key: K,
    value: ProjectsFilters[K]
  ) => {
    setFilters({ [key]: value } as Pick<ProjectsFilters, K>);
  };

  const propertyTypeOptions: Array<{ id: PropertyType; label: string }> = useMemo(
    () => [
      { id: "villa", label: "Villa" },
      { id: "plot", label: "Plot" },
      { id: "ind_floor", label: "Ind Floor" },
      { id: "penthouse", label: "Penthouse" },
      { id: "apartment", label: "Apartment" },
      { id: "retail_shop", label: "Retail shop" },
      { id: "office_space", label: "Office Space" },
    ],
    []
  );

  const furnishingOptions: Array<{ id: Furnishing; label: string }> = useMemo(
    () => [
      { id: "any", label: "Any" },
      { id: "furnished", label: "Furnished" },
      { id: "unfurnished", label: "Unfurnished" },
      { id: "semi-furnished", label: "Semi-Furnished" },
    ],
    []
  );

  const possessionOptions: Array<{ id: PossessionStatus; label: string }> =
    useMemo(
      () => [
        { id: "ready_to_move", label: "Ready To Move" },
        { id: "under_construction", label: "Under Construction" },
      ],
      []
    );

  const amenityOptions: Array<{ id: Amenity; label: string }> = useMemo(
    () => [
      { id: "security_24x7", label: "24 x 7 Security" },
      { id: "power_backup", label: "Power Backup" },
      { id: "attached_market", label: "Attached Market" },
    ],
    []
  );

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

  const buildingButtons: Array<{ id: BuildingType; label: string }> = useMemo(
    () => [
      { id: "residential", label: "Residential" },
      { id: "commercial", label: "Commercial" },
    ],
    []
  );

  return (
    <div className="overflow-hidden rounded-lg">
      <div className="sticky top-0 z-10 border-b border-border p-4 backdrop-blur">
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

        <ActiveFilterChips />

        {isPending && (
          <div className="mt-3 rounded bg-light-purple px-3 py-2 text-xs text-blue">
            Updating filters…
          </div>
        )}
      </div>

      <div className="divide-y divide-border px-4">
        <Section title="Localities" hint="Search by area">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-gray" />
            <input
              value={filters.searchLocality}
              onChange={(e) =>
                startTransition(() => setFilters({ searchLocality: e.target.value }))
              }
              placeholder="Search locality..."
              className="h-10 w-full rounded-md border border-border bg-white pl-9 pr-3 text-sm text-text-gray outline-none transition focus:border-blue"
            />
          </div>
        </Section>

        <Section title="Posted by">
          <div className="grid grid-cols-2 gap-1">
            {(
              [
                // { id: "all", label: "All" },
                { id: "owner", label: "Owner" },
                { id: "channel_partner", label: "Channel Partner" },
              ] satisfies Array<{ id: PostedByTab; label: string }>
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => startTransition(() => setTab(t.id))}
                className={cx(
                  "h-10 cursor-pointer rounded-md border text-xs font-medium transition",
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
        </Section>

        <Section title="Budget" hint="₹ Crore">
          <div className="grid grid-cols-2 gap-1">
            <select
              value={filters.minBudget ?? ""}
              onChange={(e) => setBudget("minBudget", e.target.value)}
              className="h-10 w-full cursor-pointer rounded-md border border-border bg-white px-3 text-sm text-text-gray outline-none transition focus:border-blue"
            >
              <option value="">Min</option>
              {[0.5, 1, 1.4, 2, 5, 10].map((v) => (
                <option key={v} value={v}>
                  ₹ {v} Cr
                </option>
              ))}
            </select>
            <select
              value={filters.maxBudget ?? ""}
              onChange={(e) => setBudget("maxBudget", e.target.value)}
              className="h-10 w-full cursor-pointer rounded-md border border-border bg-white px-3 text-sm text-text-gray outline-none transition focus:border-blue"
            >
              <option value="">Max</option>
              {[1, 2, 5, 10, 20].map((v) => (
                <option key={v} value={v}>
                  ₹ {v} Cr
                </option>
              ))}
            </select>
          </div>
        </Section>

        <Section title="Size" hint="Sq. Yd.">
          <div className="grid grid-cols-2 gap-1">
            <select
              value={filters.minSizeSqYd ?? ""}
              onChange={(e) => setSize("minSizeSqYd", e.target.value)}
              className="h-10 w-full cursor-pointer rounded-md border border-border bg-white px-3 text-sm text-text-gray outline-none transition focus:border-blue"
            >
              <option value="">Min</option>
              {[50, 100, 119, 150, 200].map((v) => (
                <option key={v} value={v}>
                  {v} Sq.Yd.
                </option>
              ))}
            </select>
            <select
              value={filters.maxSizeSqYd ?? ""}
              onChange={(e) => setSize("maxSizeSqYd", e.target.value)}
              className="h-10 w-full cursor-pointer rounded-md border border-border bg-white px-3 text-sm text-text-gray outline-none transition focus:border-blue"
            >
              <option value="">Max</option>
              {[119, 150, 200, 300].map((v) => (
                <option key={v} value={v}>
                  {v} Sq.Yd.
                </option>
              ))}
            </select>
          </div>
        </Section>

        <Section title="Building Type">
          <div className="grid grid-cols-2 gap-1">
            {buildingButtons.map((b) => (
              <button
                key={b.id}
                onClick={() =>
                  startTransition(() =>
                    setBuildingType(filters.buildingType === b.id ? "all" : b.id)
                  )
                }
                className={cx(
                  "h-10 cursor-pointer rounded-md border text-sm font-medium transition",
                  filters.buildingType === b.id
                    ? "border-blue bg-blue text-white"
                    : "border-border bg-white text-text-gray hover:bg-background-gray"
                )}
                aria-pressed={filters.buildingType === b.id}
              >
                {b.label}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Property Type">
          <div className="flex flex-wrap gap-1">
            {propertyTypeOptions.map((p) => (
              <CheckboxRow
                key={p.id}
                checked={filters.propertyTypes.includes(p.id)}
                label={p.label}
                onChange={() => startTransition(() => togglePropertyType(p.id))}
                compact
              />
            ))}
          </div>
        </Section>

        <Section title="Bedroom">
          <div className="flex flex-wrap gap-2">
            <CheckboxRow
              checked={filters.bedrooms.includes(1)}
              label="1 BHK"
              onChange={() => startTransition(() => toggleBedroom(1))}
              compact
            />
            <CheckboxRow
              checked={false}
              label="1.5 BHK"
              onChange={() => { }}
              disabled
              compact
            />
            <CheckboxRow
              checked={false}
              label="1 RK"
              onChange={() => { }}
              disabled
              compact
            />
            <CheckboxRow
              checked={filters.bedrooms.includes(2)}
              label="2 RK"
              onChange={() => startTransition(() => toggleBedroom(2))}
              compact
            />
            <CheckboxRow
              checked={filters.bedrooms.includes(3)}
              label="3 RK"
              onChange={() => startTransition(() => toggleBedroom(3))}
              compact
            />
          </div>
        </Section>

        <Section title="Furnishing Status">
          <div className="flex flex-wrap gap-2">
            {furnishingOptions.slice(1).map((f) => (
              <CheckboxRow
                key={f.id}
                checked={filters.furnishing === f.id}
                label={f.label}
                onChange={() =>
                  startTransition(() =>
                    setFurnishing(filters.furnishing === f.id ? "any" : (f.id as Furnishing))
                  )
                }
                compact
              />
            ))}
          </div>
        </Section>

        <Section title="Possession Status">
          <div className="flex flex-wrap gap-2">
            {possessionOptions.map((p) => (
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

        <Section title="Amenities">
          <div className="flex flex-wrap gap-2">
            {amenityOptions.map((a) => (
              <CheckboxRow
                key={a.id}
                checked={filters.amenities.includes(a.id)}
                label={a.label}
                onChange={() => startTransition(() => toggleAmenity(a.id))}
                compact
              />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

