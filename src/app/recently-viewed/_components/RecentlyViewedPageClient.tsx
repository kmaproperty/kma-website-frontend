"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/app/projects/_types";
import ProjectsPagination from "@/app/projects/_components/ProjectsPagination";
import Image from "next/image";
import { Bath, BedDouble, ChevronDown, ChevronLeft, ChevronRight, Heart, Images, LogIn, Maximize2, Video } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

type ActivitySection = "recentSearch" | "saved" | "contacted" | "recentlyViewed";
type SortType = "latest" | "price_low_high" | "price_high_low";

type ActivityProject = Project & {
  activitySection: ActivitySection;
  viewedAt: string;
};

function CompactPropertyCard({ project }: { project: ActivityProject }) {
  return (
    <article className="w-full overflow-hidden rounded-lg border border-[#E6E8EF] bg-white shadow-[0_4px_14px_rgba(10,24,61,0.08)] transition hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(10,24,61,0.11)]">
      <div className="relative h-[145px]">
        <Image
          src={project.images?.[0] || "/assets/properties_pic_1.png"}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-1 text-white">
          <ChevronLeft className="h-3 w-3" />
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/35 p-1 text-white">
          <ChevronRight className="h-3 w-3" />
        </div>
        <button
          type="button"
          aria-label="Add to favorites"
          className="absolute right-2 top-2 rounded-full bg-black/35 p-1 text-white transition hover:bg-black/50"
        >
          <Heart className="h-3.5 w-3.5" />
        </button>
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-white/90 px-1.5 py-0.5">
          <Image
            src={project.agent?.avatarUrl || "/assets/profile.png"}
            alt={project.agent?.name || "agent"}
            width={20}
            height={20}
            className="h-5 w-5 rounded-full object-cover"
          />
        </div>
        <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-black/45 px-2 py-0.5 text-[10px] text-white">
          <span>{`2/${project.mediaCounts?.photos ?? 15}`}</span>
          <span className="inline-flex items-center gap-1">
            <Images className="h-2.5 w-2.5" />
            {project.mediaCounts?.photos ?? 4}
          </span>
          <span className="inline-flex items-center gap-1">
            <Video className="h-2.5 w-2.5" />
            {project.mediaCounts?.videos ?? 2}
          </span>
        </div>
      </div>

      <div className="p-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-[#FFB200]">
            <span>★★★★★</span>
            <span className="text-[#8A90A2]">5.0</span>
          </div>
          <span className="rounded bg-[#6D5CF6] px-1.5 py-0.5 text-[9px] font-medium text-white">
            Apartment
          </span>
        </div>

        <h3 className="mt-1.5 line-clamp-1 text-base font-semibold text-[#1E2236]">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-[#8A90A2]">{project.address}</p>

        <p className="mt-2 text-2xl leading-none font-semibold text-[#131A55]">
          {project.listingIntent === "rent" ? "₹40.00/month" : "₹400.00"}
        </p>

        <div className="mt-2 border-t border-[#ECEEF4] pt-2 text-xs text-[#8A90A2]">
          <p>
            Listed on : <span className="text-[#343A4F]">25 May 2025</span>
          </p>
          <p className="mt-1">
            Possession status: <span className="text-[#343A4F]">Ready to move</span>
          </p>
        </div>

        <div className="mt-2.5 grid grid-cols-3 gap-1.5 border-t border-[#ECEEF4] pt-2 text-[11px] text-[#3B4259]">
          <div className="inline-flex items-center gap-1 rounded bg-[#F7F8FC] px-1.5 py-1">
            <BedDouble className="h-3 w-3 text-[#8A90A2]" />
            <span>{project.bedrooms ?? 2} Bed</span>
          </div>
          <div className="inline-flex items-center gap-1 rounded bg-[#F7F8FC] px-1.5 py-1">
            <Bath className="h-3 w-3 text-[#8A90A2]" />
            <span>2 Bath</span>
          </div>
          <div className="inline-flex items-center gap-1 rounded bg-[#F7F8FC] px-1.5 py-1">
            <Maximize2 className="h-3 w-3 text-[#8A90A2]" />
            <span>350 Sq Ft</span>
          </div>
        </div>
      </div>
    </article>
  );
}

const activityTabs: Array<{
  key: ActivitySection;
  label: string;
  count: string;
  icon: string;
}> = [
  { key: "recentSearch", label: "Recently Search", count: "12", icon: "/assets/home-search-blue.svg" },
  { key: "recentlyViewed", label: "Recently Viewed", count: "08", icon: "/assets/home-recent-blue.svg" },
  { key: "saved", label: "Saved Properties", count: "18", icon: "/assets/home-save-blue.svg" },
  { key: "contacted", label: "Contacted", count: "18", icon: "/assets/home-contact-blue.svg" },
];

const allActivityProjects: ActivityProject[] = Array.from({ length: 24 }).map((_, idx) => {
  const sectionMap: ActivitySection[] = [
    "recentlyViewed",
    "recentlyViewed",
    "saved",
    "recentSearch",
    "contacted",
    "recentlyViewed",
    "saved",
    "recentSearch",
    "recentlyViewed",
    "contacted",
    "recentlyViewed",
    "saved",
    "recentlyViewed",
    "recentSearch",
    "saved",
    "recentlyViewed",
    "contacted",
    "recentlyViewed",
    "saved",
    "recentSearch",
    "recentlyViewed",
    "contacted",
    "recentlyViewed",
    "saved",
  ];
  const intentMap: Array<"sale" | "rent"> = [
    "sale",
    "sale",
    "rent",
    "sale",
    "sale",
    "rent",
    "sale",
    "rent",
    "sale",
    "sale",
    "rent",
    "sale",
    "sale",
    "rent",
    "sale",
    "sale",
    "rent",
    "sale",
    "sale",
    "rent",
    "sale",
    "sale",
    "rent",
    "sale",
  ];
  const titleMap = [
    "Royal Apartment",
    "Maple Residency",
    "Skyline Heights",
    "Palm Enclave",
    "City View Towers",
    "Harmony Homes",
    "Willow Greens",
    "Trinity Suites",
  ];
  const localityMap = [
    "Willow Crest",
    "Sector 56",
    "DLF Phase 3",
    "Golf Course Road",
    "South City",
    "Sector 67",
    "Sohna Road",
    "New Chandigarh",
  ];
  const intent = intentMap[idx] ?? "sale";
  const title = `${titleMap[idx % titleMap.length]} ${idx + 1}`;
  const locality = localityMap[idx % localityMap.length];

  return {
    id: `recent-${idx + 1}`,
    title,
    address: `${25 + idx}, ${locality} Apartment`,
    city: "Chandigarh",
    postedBy: idx % 2 === 0 ? "owner" : "channel_partner",
    listingIntent: intent,
    priceValue: intent === "rent" ? 45000 + idx * 500 : 9000000 + idx * 350000,
    priceLabel:
      intent === "rent"
        ? `₹ ${(45000 + idx * 500).toLocaleString("en-IN")} / month`
        : `₹ ${(9000000 + idx * 350000).toLocaleString("en-IN")}`,
    plotAreaSqYd: 180 + idx * 2,
    bedrooms: 2 + (idx % 3),
    view: "Park Facing",
    furnishing: idx % 2 === 0 ? "furnished" : "semi-furnished",
    images: ["/assets/properties_pic_1.png"],
    mediaCounts: { photos: 10, videos: 2 },
    agent: {
      name: idx % 2 === 0 ? "KMA Expert" : "Channel Partner",
      badge: idx % 2 === 0 ? "Owner" : "Channel Partner",
      avatarUrl: "/assets/profile.png",
    },
    tags: ["prime_location", "safe_secure_locality"],
    buildingType: idx % 4 === 0 ? "commercial" : "residential",
    propertyType: "apartment",
    locality,
    possessionStatus: idx % 3 === 0 ? "under_construction" : "ready_to_move",
    activitySection: sectionMap[idx] ?? "recentlyViewed",
    viewedAt: new Date(Date.now() - idx * 86400000).toISOString(),
  };
});

export default function RecentlyViewedPageClient() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<ActivitySection>("recentlyViewed");
  const [activeIntent, setActiveIntent] = useState<"buy" | "rent" | "commercial">("buy");
  const [sortBy, setSortBy] = useState<SortType>("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pageSize = 4;
  const guestPreviewCount = 8;

  const filteredProjects = useMemo(() => {
    const bySection = allActivityProjects.filter((project) => project.activitySection === activeSection);
    const byIntent = bySection.filter((project) => {
      if (activeIntent === "buy") return project.listingIntent === "sale";
      if (activeIntent === "rent") return project.listingIntent === "rent";
      return project.buildingType === "commercial";
    });

    const sorted = [...byIntent].sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime();
      }
      if (sortBy === "price_low_high") {
        return a.priceValue - b.priceValue;
      }
      return b.priceValue - a.priceValue;
    });

    return sorted;
  }, [activeIntent, activeSection, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [currentPage, filteredProjects]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeSection, activeIntent, sortBy]);

  useEffect(() => {
    const readAuthState = () => {
      try {
        const rawUser = localStorage.getItem("user");
        if (!rawUser) {
          setIsLoggedIn(false);
          return;
        }
        const parsed = JSON.parse(rawUser) as { role?: string };
        setIsLoggedIn(Boolean(parsed?.role));
      } catch {
        setIsLoggedIn(false);
      }
    };

    readAuthState();
    window.addEventListener("storage", readAuthState);
    return () => window.removeEventListener("storage", readAuthState);
  }, []);

  const visibleProjects = useMemo(() => {
    if (isLoggedIn) return paginatedProjects;
    return filteredProjects.slice(0, guestPreviewCount);
  }, [filteredProjects, isLoggedIn, paginatedProjects]);
  const shouldShowGuestLock = !isLoggedIn && visibleProjects.length > 0;
  const shouldRenderGuestOverlay = shouldShowGuestLock && visibleProjects.length > 4;

  return (
    <div className="w-full">
      <section className="relative">
        <div className="relative h-[310px] overflow-hidden rounded-[0_0_28px_28px] sm:rounded-[0_0_44px_44px]">
          {/* <Image src="/assets/properties_pic_1.png" alt="recently viewed hero" fill className="object-cover" /> */}
          {/* <div className="absolute inset-0 bg-[#020C2A]/65" /> */}

          <div className="relative z-10 px-4 pt-4 sm:px-6 lg:px-8">
            <p className="text-xs font-medium text-white/90">
              Home <span className="px-1">/</span> Recently Viewed
            </p>

            <div className="mt-14 text-center">
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">Track Your Journey</h1>
              <p className="mx-auto mt-3 max-w-[540px] text-sm text-white/80 sm:text-base">
                Review your recently searched, viewed, saved, and contacted properties all in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-[245px] z-20 w-full rounded-xl border border-[#EAECF0] bg-white p-4 sm:p-5">
          <h3 className="text-[22px] font-semibold text-[#1E2236]">Filter</h3>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {activityTabs.map((tab) => {
                const isActive = tab.key === activeSection;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveSection(tab.key)}
                    className={`inline-flex h-9 items-center overflow-hidden rounded border text-xs ${
                      isActive ? "border-[#0C145E] bg-white text-[#0C145E]" : "border-[#E4E7EE] bg-white text-[#8A90A2]"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5 px-2.5">
                      <Image
                        src={tab.icon}
                        width={12}
                        height={12}
                        alt={tab.label}
                        className={isActive ? "" : "opacity-70"}
                      />
                      <span>{tab.label}</span>
                    </span>
                    <span
                      className={`inline-flex h-full min-w-7 items-center justify-center border-l px-2 text-[11px] font-semibold ${
                        isActive
                          ? "border-[#0C145E] bg-[#0C145E] text-white"
                          : "border-[#E4E7EE] bg-[#F8F9FC] text-[#0C145E]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-5 pr-1">
              {(["buy", "rent", "commercial"] as const).map((intent) => {
                const isSelected = activeIntent === intent;
                return (
                  <label key={intent} className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-[#3B4259] sm:text-sm">
                    <button
                      type="button"
                      onClick={() => setActiveIntent(intent)}
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        isSelected ? "border-[#0C145E]" : "border-[#A5A7B5]"
                      }`}
                      aria-label={`Filter ${intent}`}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? <span className="h-2 w-2 rounded-full bg-[#0C145E]" /> : null}
                    </button>
                    <span className="capitalize">{intent}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[90px] rounded-xl">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-[#1E2236] sm:text-2xl">
              {activeSection === "recentlyViewed" ? "Your Recent Picks ( Recently Viewed)" : "Your Activity"}
            </h2>
            <p className="mt-1 text-sm text-[#8A90A2]">A quick look at the properties that caught your eye.</p>
          </div>

          <div className="flex items-center gap-2 self-end">
            <label htmlFor="recent-sort" className="text-sm font-medium text-[#343A4F]">
              Sort By :
            </label>
            <div className="relative">
              <select
                id="recent-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="h-9 min-w-[140px] appearance-none rounded border border-[#E3E6EF] bg-[#F8F9FC] pl-3 pr-8 text-sm text-[#6B7280] outline-none"
              >
                <option value="latest">Relevance</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm font-medium text-[#6B7280]">
          Showing{" "}
          {visibleProjects.length > 0
            ? `${isLoggedIn ? (currentPage - 1) * pageSize + 1 : 1}-${visibleProjects.length}`
            : "0"}{" "}
          of {isLoggedIn ? filteredProjects.length : 100} Results
        </p>

        <div className="relative mt-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {visibleProjects.map((project, index) => {
              const blurForGuest = !isLoggedIn && index >= 4;
              return (
                <div key={project.id} className={blurForGuest ? "pointer-events-none select-none blur-[2.5px]" : ""}>
                  <CompactPropertyCard project={project} />
                </div>
              );
            })}
          </div>

          {shouldRenderGuestOverlay && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-[42%] items-end justify-center bg-gradient-to-t from-white via-white/90 to-transparent pb-8">
              <div className="pointer-events-auto flex flex-col items-center gap-3 rounded-xl px-5 py-4 text-center">
                <p className="text-[28px] font-semibold leading-tight text-[#111827]">Login To View All The Properties</p>
                <button
                  type="button"
                  onClick={() => router.push("/user-flow?isLogin=true&redirect=/recently-viewed")}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0C145E] px-7 text-sm font-medium text-white transition hover:opacity-95"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </button>
              </div>
            </div>
          )}
        </div>

        {shouldShowGuestLock && !shouldRenderGuestOverlay && (
          <div className="mt-4 flex justify-center rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] px-4 py-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <p className="text-xl font-semibold leading-tight text-[#111827] sm:text-2xl">Login To View All The Properties</p>
              <button
                type="button"
                onClick={() => router.push("/user-flow?isLogin=true&redirect=/recently-viewed")}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0C145E] px-7 text-sm font-medium text-white transition hover:opacity-95"
              >
                <LogIn className="h-4 w-4" />
                Login
              </button>
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="mt-4 rounded-xl border border-border bg-white p-8 text-center text-text-gray">
            No properties available for this filter.
          </div>
        )}

        {isLoggedIn && filteredProjects.length > pageSize && (
          <div className="mt-2 flex justify-end">
            <ProjectsPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </section>
    </div>
  );
}
