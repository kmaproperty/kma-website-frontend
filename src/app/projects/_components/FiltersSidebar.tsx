"use client";

import { useMemo, useTransition } from "react";
import { Search, RotateCcw } from "lucide-react";
import ActiveFilterChips from "./ActiveFilterChips";
import { useProjectsStore } from "../_store/useProjectsStore";
import type {
  Amenity,
  BuildingType,
  Furnishing,
  PossessionStatus,
  PropertyType,
} from "../_types";
import { cx } from "../_utils/format";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <div className="text-sm font-semibold text-text-black">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function CheckboxRow({
  checked,
  label,
  onChange,
  disabled,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={cx(
        "flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm",
        disabled ? "cursor-not-allowed opacity-50" : "hover:bg-background-gray"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-4 w-4 accent-blue"
      />
      <span className="text-text-gray">{label}</span>
    </label>
  );
}

export default function FiltersSidebar() {
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

  const propertyTypeOptions: Array<{ id: PropertyType; label: string }> = useMemo(
    () => [
      { id: "villa", label: "Villa" },
      { id: "plot", label: "Plot" },
      { id: "ind_floor", label: "Ind Floor" },
      { id: "penthouse", label: "Penthouse" },
      { id: "apartment", label: "Apartment" },
      { id: "retail_shop", label: "Retail shop" },
      { id: "office_space", label: "Of Space" },
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
    startTransition(() => setFilters({ [key]: Number.isFinite(v as number) ? v : null } as any));
  };

  const setSize = (key: "minSizeSqYd" | "maxSizeSqYd", raw: string) => {
    const v = raw === "" ? null : Number(raw);
    startTransition(() => setFilters({ [key]: Number.isFinite(v as number) ? v : null } as any));
  };

  const buildingButtons: Array<{ id: BuildingType; label: string }> = useMemo(
    () => [
      { id: "residential", label: "Residential" },
      { id: "commercial", label: "Commercial" },
    ],
    []
  );

  return (
    <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-base font-semibold text-text-black">Filters</div>
        <button
          onClick={() => startTransition(() => resetFilters())}
          className="flex cursor-pointer items-center gap-1 text-sm font-medium text-blue hover:underline"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      <ActiveFilterChips />

      {isPending && (
        <div className="mt-3 rounded-lg bg-light-purple px-3 py-2 text-xs text-blue">
          Updating filters…
        </div>
      )}

      <Section title="Budget">
        <div className="grid grid-cols-2 gap-2">
          <select
            value={filters.minBudget ?? ""}
            onChange={(e) => setBudget("minBudget", e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-gray outline-none focus:border-blue"
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
            className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-gray outline-none focus:border-blue"
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

      <Section title="Size">
        <div className="grid grid-cols-2 gap-2">
          <select
            value={filters.minSizeSqYd ?? ""}
            onChange={(e) => setSize("minSizeSqYd", e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-gray outline-none focus:border-blue"
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
            className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-gray outline-none focus:border-blue"
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
        <div className="grid grid-cols-2 gap-2">
          {buildingButtons.map((b) => (
            <button
              key={b.id}
              onClick={() =>
                startTransition(() => setBuildingType(filters.buildingType === b.id ? "all" : b.id))
              }
              className={cx(
                "h-10 cursor-pointer rounded-lg border text-sm font-medium transition",
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
        <div className="grid grid-cols-2 gap-1">
          {propertyTypeOptions.map((p) => (
            <CheckboxRow
              key={p.id}
              checked={filters.propertyTypes.includes(p.id)}
              label={p.label}
              onChange={() => startTransition(() => togglePropertyType(p.id))}
            />
          ))}
        </div>
      </Section>

      <Section title="Bedroom">
        <div className="grid grid-cols-2 gap-1">
          <CheckboxRow
            checked={filters.bedrooms.includes(1)}
            label="1 BHK"
            onChange={() => startTransition(() => toggleBedroom(1))}
          />
          <CheckboxRow checked={false} label="1.5 BHK" onChange={() => {}} disabled />
          <CheckboxRow checked={false} label="1 RK" onChange={() => {}} disabled />
          <CheckboxRow
            checked={filters.bedrooms.includes(2)}
            label="2 RK"
            onChange={() => startTransition(() => toggleBedroom(2))}
          />
          <CheckboxRow
            checked={filters.bedrooms.includes(3)}
            label="3 RK"
            onChange={() => startTransition(() => toggleBedroom(3))}
          />
        </div>
      </Section>

      <Section title="Localities">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-gray" />
          <input
            value={filters.searchLocality}
            onChange={(e) =>
              startTransition(() => setFilters({ searchLocality: e.target.value }))
            }
            placeholder="Search..."
            className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-3 text-sm text-text-gray outline-none focus:border-blue"
          />
        </div>
      </Section>

      <Section title="Furnishing Status">
        <div className="grid grid-cols-2 gap-2">
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
            />
          ))}
        </div>
      </Section>

      <Section title="Possession Status">
        <div className="grid grid-cols-2 gap-2">
          {possessionOptions.map((p) => (
            <CheckboxRow
              key={p.id}
              checked={filters.possessionStatuses.includes(p.id)}
              label={p.label}
              onChange={() => startTransition(() => togglePossession(p.id))}
            />
          ))}
        </div>
      </Section>

      <Section title="Amenities">
        <div className="grid grid-cols-1 gap-1">
          {amenityOptions.map((a) => (
            <CheckboxRow
              key={a.id}
              checked={filters.amenities.includes(a.id)}
              label={a.label}
              onChange={() => startTransition(() => toggleAmenity(a.id))}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

