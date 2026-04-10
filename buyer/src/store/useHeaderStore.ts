"use client";

import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import type { RootState } from "./store";
import {
  getCityData,
  getCityLoader,
  getPropertyMasterData,
  getSelectedCity,
  getAboutusData,
  getUserRole,
  setCityData,
  setCityLoader,
  setSelectedCity,
  setUserRole,
} from "./homeHeaderSlice";
import { getCityListApiHandler } from "@/services/homeService";
import type { CitiesResponse } from "@/services/homeService";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

function getStoredUserRole(): string | null {
  if (typeof window === "undefined") return null;
  // Check localStorage first
  const raw = localStorage.getItem("user");
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (isRecord(parsed) && typeof parsed.role === "string") {
        if (parsed.name && (typeof parsed.name !== "string" || parsed.name.trim())) {
          return parsed.role;
        }
      }
    } catch { /* ignore */ }
  }
  // Fallback: check kma_user cookie (set by cross-app auth from seller)
  try {
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("kma_user="));
    if (cookie) {
      const decoded = decodeURIComponent(cookie.split("=")[1]);
      const parsed: unknown = JSON.parse(decoded);
      if (isRecord(parsed) && typeof parsed.role === "string") {
        // Sync to localStorage so subsequent checks work
        localStorage.setItem("user", decoded);
        return parsed.role;
      }
    }
  } catch { /* ignore */ }
  return null;
}

/**
 * Hook to read and update header-related state from the global store.
 * Use this anywhere you need header data (city, property master, about us, user role).
 * Optionally syncs user role from localStorage on mount.
 */
export function useHeaderStore(syncUserRole = false) {
  const dispatch = useDispatch();

  const selectedCity = useSelector(getSelectedCity);
  const aboutsUsData = useSelector(getAboutusData);
  const cityData = useSelector(getCityData);
  const cityLoader = useSelector(getCityLoader);
  const propertyMasterData = useSelector(getPropertyMasterData);
  const userRole = useSelector(getUserRole);

  const { mutate: fetchCities, isPending: cityLoaderMutation } = useMutation({
    mutationFn: getCityListApiHandler,
    onSuccess: (response: CitiesResponse) => {
      const findCity = response?.allCities?.find((item) => item.name === "Gurgaon");
      if (findCity) {
        dispatch(setSelectedCity(findCity as RootState["homeHeader"]["selectedCity"]));
      }
      dispatch(setCityData(response));
    },
    onSettled: () => {
      dispatch(setCityLoader(false));
    },
    onMutate: () => {
      dispatch(setCityLoader(true));
    },
    onError: () => {},
  });

  const isLoading = cityLoader || cityLoaderMutation;

  useEffect(() => {
    if (syncUserRole) {
      dispatch(setUserRole(getStoredUserRole()));
    }
  }, [dispatch, syncUserRole]);

  // When store has no city data yet, fetch once so header works on any page (e.g. my-list, about-us)
  const hasFetchedCitiesRef = useRef(false);
  useEffect(() => {
    if (!cityData && !hasFetchedCitiesRef.current) {
      hasFetchedCitiesRef.current = true;
      fetchCities({});
    }
  }, [cityData, fetchCities]);

  const fetchCitiesStable = useCallback(
    (payload: { search?: string; latitude?: string; longitude?: string } = {}) => {
      fetchCities(payload);
    },
    [fetchCities]
  );

  return {
    selectedCity,
    aboutsUsData,
    cityData,
    cityLoader: isLoading,
    propertyMasterData: Array.isArray(propertyMasterData) ? propertyMasterData : [],
    userRole,
    fetchCities: fetchCitiesStable,
  };
}
