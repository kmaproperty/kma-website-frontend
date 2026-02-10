import { create } from "zustand";
import type {
  Amenity,
  BuildingType,
  Furnishing,
  PossessionStatus,
  PostedByTab,
  ProjectsFilters,
  PropertyType,
  SortOption,
} from "../_types";

const DEFAULT_FILTERS: ProjectsFilters = {
  searchText: "",
  searchLocality: "",
  buildingType: "all",
  propertyTypes: [],
  minBudget: 1.4, // Cr (default to match screenshot chips)
  maxBudget: 10, // Cr
  minSizeSqYd: null,
  maxSizeSqYd: null,
  bedrooms: [],
  furnishing: "any",
  possessionStatuses: [],
  amenities: [],
};

interface ProjectsState {
  tab: PostedByTab;
  sort: SortOption;
  filters: ProjectsFilters;
  favorites: Record<string, true>;

  setTab: (tab: PostedByTab) => void;
  setSort: (sort: SortOption) => void;
  setFilters: (patch: Partial<ProjectsFilters>) => void;
  resetFilters: () => void;

  togglePropertyType: (type: PropertyType) => void;
  toggleBedroom: (count: 1 | 2 | 3) => void;
  setBuildingType: (type: BuildingType) => void;
  setFurnishing: (value: Furnishing) => void;
  togglePossession: (value: PossessionStatus) => void;
  toggleAmenity: (value: Amenity) => void;

  toggleFavorite: (projectId: string) => void;
  removeChip: (chipId: string) => void;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  tab: "all",
  sort: "price_low_high",
  filters: DEFAULT_FILTERS,
  favorites: {},

  setTab: (tab) => set({ tab }),
  setSort: (sort) => set({ sort }),
  setFilters: (patch) =>
    set((s) => ({ filters: { ...s.filters, ...patch } })),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  togglePropertyType: (type) =>
    set((s) => {
      const exists = s.filters.propertyTypes.includes(type);
      return {
        filters: {
          ...s.filters,
          propertyTypes: exists
            ? s.filters.propertyTypes.filter((t) => t !== type)
            : [...s.filters.propertyTypes, type],
        },
      };
    }),

  toggleBedroom: (count) =>
    set((s) => {
      const exists = s.filters.bedrooms.includes(count);
      return {
        filters: {
          ...s.filters,
          bedrooms: exists
            ? s.filters.bedrooms.filter((b) => b !== count)
            : [...s.filters.bedrooms, count],
        },
      };
    }),

  setBuildingType: (type) =>
    set((s) => ({ filters: { ...s.filters, buildingType: type } })),

  setFurnishing: (value) =>
    set((s) => ({ filters: { ...s.filters, furnishing: value } })),

  togglePossession: (value) =>
    set((s) => {
      const exists = s.filters.possessionStatuses.includes(value);
      return {
        filters: {
          ...s.filters,
          possessionStatuses: exists
            ? s.filters.possessionStatuses.filter((v) => v !== value)
            : [...s.filters.possessionStatuses, value],
        },
      };
    }),

  toggleAmenity: (value) =>
    set((s) => {
      const exists = s.filters.amenities.includes(value);
      return {
        filters: {
          ...s.filters,
          amenities: exists
            ? s.filters.amenities.filter((v) => v !== value)
            : [...s.filters.amenities, value],
        },
      };
    }),

  toggleFavorite: (projectId) =>
    set((s) => {
      const next = { ...s.favorites };
      if (next[projectId]) delete next[projectId];
      else next[projectId] = true;
      return { favorites: next };
    }),

  removeChip: (chipId) => {
    const { filters } = get();
    switch (chipId) {
      case "chip:retail_shop":
        set({
          filters: {
            ...filters,
            propertyTypes: filters.propertyTypes.filter((t) => t !== "retail_shop"),
          },
        });
        return;
      case "chip:office_space":
        set({
          filters: {
            ...filters,
            propertyTypes: filters.propertyTypes.filter((t) => t !== "office_space"),
          },
        });
        return;
      case "chip:budget":
        set({ filters: { ...filters, minBudget: null, maxBudget: null } });
        return;
      default:
        return;
    }
  },
}));

