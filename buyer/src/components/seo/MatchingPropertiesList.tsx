"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  ArrowRight,
  ShieldCheck,
  BedDouble,
  Maximize2,
  Compass,
  UserCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface MatchingPropertiesListProps {
  properties: any[];
  cityName?: string;
}

const ITEMS_PER_PAGE = 10;

export default function MatchingPropertiesList({
  properties,
  cityName,
}: MatchingPropertiesListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (!properties || properties.length === 0) return null;

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProperties = properties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById("matching-properties-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="matching-properties-section" className="max-w-6xl mx-auto px-4 sm:px-6 mb-14">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#010048]">
              {/* Available Verified Properties ({properties.length}) */}
              Available Verified Properties
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Handpicked & verified residential inventory matching {cityName || "Delhi NCR"}.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#010048] hover:underline shrink-0"
        >
          <span>View All Properties</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {currentProperties.map((property: any) => {
          const title =
            property.propertyName ||
            property.society ||
            property.title ||
            "Premium Residential Property";
          const cityId = property.cityId || "e8894ea7-b8fc-43da-b983-b1d43c77597e";
          const detailHref = `/projects/${cityId}/${property.id}`;
          const partnerName = property.owner?.name?.trim() || "KMA Verified Partner";
          const partnerRole =
            property.owner?.role === "CHANNEL_PARTNER" ? "Channel Partner" : "Property Advisor";

          const displayPrice = property.monthlyRent
            ? `₹ ${Number(property.monthlyRent).toLocaleString("en-IN")}/month`
            : property.units?.[0]?.price
            ? property.units[0].price
            : property.price
            ? `₹ ${Number(property.price).toLocaleString("en-IN")}`
            : "Price on Request";

          const cleanDescription = property.description
            ? property.description.replace(/<[^>]*>/g, "").trim()
            : "";

          const unitSize =
            property.units?.[0]?.size ||
            (property.plotArea ? `${property.plotArea} ${property.plotAreaUnit || "sqft"}` : null);

          return (
            <Link href={detailHref}>
            <div
              key={property.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:shadow-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-[340px_1fr]">
                <div className="relative min-h-[220px] bg-slate-100 flex items-center justify-center overflow-hidden">
                  {property.imageUrl ? (
                    <Image
                      src={property.imageUrl}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-400 p-6 text-center">
                      <Building2 className="h-12 w-12 stroke-1" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        {property.bhkType || property.propertyType || "Residential Property"}
                      </span>
                    </div>
                  )}

                  <div className="absolute left-3 top-3 z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-emerald-700 shadow-xs border border-emerald-100">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-5 md:p-6">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <Link href={detailHref} className="hover:underline">
                          <h3 className="text-xl font-bold text-[#010048] line-clamp-1">
                            {title.replace(/<[^>]*>/g, "").trim()}
                          </h3>
                        </Link>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-1">
                          {property.address || `${property.locality || ""}, ${property.city || ""}`}
                        </p>
                      </div>
                      <div className="text-lg sm:text-xl font-extrabold text-[#010048] shrink-0">
                        {displayPrice}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {property.bhkType && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 border border-slate-200/80">
                          <BedDouble className="h-3.5 w-3.5 text-[#010048]" />
                          <span>{property.bhkType}</span>
                        </span>
                      )}
                      {unitSize && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 border border-slate-200/80">
                          <Maximize2 className="h-3.5 w-3.5 text-[#010048]" />
                          <span>{unitSize}</span>
                        </span>
                      )}
                      {property.furnishType && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 border border-slate-200/80">
                          <span>{property.furnishType}</span>
                        </span>
                      )}
                      {property.facing && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 border border-slate-200/80">
                          <Compass className="h-3.5 w-3.5 text-slate-500" />
                          <span>Facing: {property.facing}</span>
                        </span>
                      )}
                    </div>

                    {cleanDescription && (
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {cleanDescription}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3">
                    <Link
                      href={detailHref}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#010048] hover:underline"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-[#FAFBFD] px-5 py-3 sm:px-6">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#010048]/10 text-[#010048]">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-tight">
                      {partnerName}
                    </p>
                    <span className="inline-block rounded-xs bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                      {partnerRole}
                    </span>
                  </div>
                </div>
              </div> */}
            </div>
            </Link> 
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => handlePageChange(pageNum)}
                className={`h-8 w-8 rounded-lg text-xs font-bold transition ${
                  currentPage === pageNum
                    ? "bg-[#010048] text-white"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}