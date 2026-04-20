"use client";

import { useEffect, useRef, useState } from "react";
import { InputBase, ClickAwayListener } from "@mui/material";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { searchSuggestApiHandler, SearchSuggestResponse } from "@/services/homeService";

interface SearchSuggestProps {
  value: string;
  onChange: (v: string) => void;
  onSelect?: (item: { type: "city" | "locality" | "society"; id: string; name: string; cityId?: string }) => void;
  placeholder?: string;
  className?: string;
}

const EMPTY: SearchSuggestResponse = { success: true, cities: [], localities: [], societies: [] };

export default function SearchSuggest({ value, onChange, onSelect, placeholder = "Search by Locality, Society, City", className = "" }: SearchSuggestProps) {
  const [open, setOpen] = useState(false);
  const [debounced, setDebounced] = useState(value);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), 200);
    return () => clearTimeout(t);
  }, [value]);

  const { data } = useQuery({
    queryKey: ["search-suggest", debounced],
    queryFn: () => searchSuggestApiHandler(debounced.trim(), 6),
    enabled: debounced.trim().length >= 1,
    staleTime: 30_000,
  });

  const results = data ?? EMPTY;
  const hasResults = results.cities.length + results.localities.length + results.societies.length > 0;

  const handlePick = (item: Parameters<NonNullable<SearchSuggestProps["onSelect"]>>[0], label: string) => {
    onChange(label);
    setOpen(false);
    onSelect?.(item);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div ref={inputRef} className={`relative w-full ${className}`}>
        <div className="flex items-center w-full">
          <Image src="/assets/search-gray.svg" width={16} height={16} alt="search" />
          <InputBase
            placeholder={placeholder}
            fullWidth
            value={value}
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              onChange(e.target.value);
              setOpen(true);
            }}
            className="w-full h-full px-3 text-xs rounded-full"
            inputProps={{
              className:
                "font-ibm-plex-sans! text-sm text-text-gray placeholder:!text-text-gray placeholder:!text-sm placeholder:!opacity-100",
            }}
          />
        </div>

        {open && value.trim().length >= 1 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-[320px] overflow-auto rounded-lg border border-border bg-white shadow-lg">
            {!hasResults && (
              <div className="px-4 py-3 text-sm text-text-gray">No matches found</div>
            )}
            {results.cities.length > 0 && (
              <div className="py-1">
                <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Cities</div>
                {results.cities.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handlePick({ type: "city", id: c.id, name: c.name }, c.name)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]"
                  >
                    <Image src="/assets/search-gray.svg" width={14} height={14} alt="" />
                    <span className="text-text-black">{c.name}</span>
                    {c.state && <span className="ml-auto text-xs text-text-gray">{c.state}</span>}
                  </button>
                ))}
              </div>
            )}
            {results.localities.length > 0 && (
              <div className="py-1 border-t border-border">
                <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Localities</div>
                {results.localities.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => handlePick({ type: "locality", id: l.id, name: l.name, cityId: l.cityId }, l.name)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]"
                  >
                    <Image src="/assets/search-gray.svg" width={14} height={14} alt="" />
                    <span className="text-text-black">{l.name}</span>
                    {l.cityName && <span className="ml-auto text-xs text-text-gray">{l.cityName}</span>}
                  </button>
                ))}
              </div>
            )}
            {results.societies.length > 0 && (
              <div className="py-1 border-t border-border">
                <div className="px-3 pt-1.5 pb-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-light-gray">Societies</div>
                {results.societies.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handlePick({ type: "society", id: s.id, name: s.name, cityId: s.cityId ?? undefined }, s.name)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#F7F8FC]"
                  >
                    <Image src="/assets/search-gray.svg" width={14} height={14} alt="" />
                    <span className="text-text-black">{s.name}</span>
                    {(s.localityName || s.cityName) && (
                      <span className="ml-auto text-xs text-text-gray">
                        {[s.localityName, s.cityName].filter(Boolean).join(", ")}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}
