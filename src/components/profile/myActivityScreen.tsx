import Image from "next/image";
import { Heart, Maximize2 } from "lucide-react";
import { useMemo, useState } from "react";

type ActivitySection = "recentSearch" | "saved" | "contacted" | "recentlyViewed";
type PropertyIntent = "buy" | "rent" | "commercial";

type ActivityCard = {
  id: number;
  title: string;
  address: string;
  listedOn: string;
  possession: string;
  rating: string;
  price: string;
  type: string;
  intent: PropertyIntent;
  beds: number;
  baths: number;
  area: string;
};

const activityTabs: Array<{
  key: ActivitySection;
  label: string;
  count: string;
  icon: string;
}> = [
  { key: "recentSearch", label: "Recently Search", count: "08", icon: "/assets/home-search-blue.svg" },
  { key: "saved", label: "Saved Properties", count: "10", icon: "/assets/home-save-blue.svg" },
  { key: "contacted", label: "Contacted", count: "01", icon: "/assets/home-contact-blue.svg" },
  { key: "recentlyViewed", label: "Recently Viewed", count: "03", icon: "/assets/home-recent-blue.svg" },
];

const activityCards: ActivityCard[] = Array.from({ length: 6 }).map((_, index) => ({
  id: index + 1,
  title: "Royal Apartment",
  address: "25, Willow Crest Apartment",
  listedOn: "25 May 2025",
  possession: "Ready to move",
  rating: "5.0",
  price: "$400.00",
  type: "Apartment",
  intent: index % 3 === 0 ? "rent" : index % 2 === 0 ? "commercial" : "buy",
  beds: 2,
  baths: 2,
  area: "350 Sq Ft",
}));

export default function MyActivityScreen() {
  const [activeSection, setActiveSection] = useState<ActivitySection>("recentlyViewed");
  const [activeIntent, setActiveIntent] = useState<PropertyIntent>("buy");

  const filteredCards = useMemo(
    () => activityCards.filter((card) => card.intent === activeIntent),
    [activeIntent]
  );

  return (
    <div className="rounded-2xl bg-white p-4 sm:p-5 lg:p-6">
      <h2 className="text-[32px] font-semibold leading-none text-text-black">My Activity</h2>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {activityTabs.map((tab) => {
          const isActive = tab.key === activeSection;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveSection(tab.key)}
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs transition sm:text-sm ${
                isActive
                  ? "border-[#0C145E] bg-[#0C145E] text-white"
                  : "border-border bg-[#F5F6FA] text-text-gray hover:border-[#CDD3E0] hover:text-text-black"
              }`}
            >
              <Image src={tab.icon} width={14} height={14} alt={tab.label} className={isActive ? "brightness-0 invert" : ""} />
              <span>{tab.label}</span>
              <span className={`rounded-md px-1.5 py-[2px] text-[11px] font-semibold ${isActive ? "bg-white/20 text-white" : "bg-white text-[#0C145E]"}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-6">
        {(["buy", "rent", "commercial"] as const).map((intent) => {
          const isSelected = activeIntent === intent;
          return (
            <label key={intent} className="flex cursor-pointer items-center gap-2 text-sm text-text-black">
              <button
                type="button"
                onClick={() => setActiveIntent(intent)}
                className={`flex h-4 w-4 items-center justify-center rounded-full border transition ${
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

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredCards.map((card) => (
          <article key={card.id} className="overflow-hidden rounded-xl border border-[#E4E7EE] bg-white shadow-[0_2px_10px_rgba(17,24,39,0.05)]">
            <div className="relative h-[175px] bg-gradient-to-tr from-[#8097d9] via-[#9fb2e6] to-[#f0c49e] px-3 pt-3">
              <span className="absolute right-3 top-3 rounded-md bg-[#7659FF] px-2 py-1 text-[11px] font-medium text-white">
                {card.type}
              </span>
              <div className="absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/80 text-xs font-semibold text-[#0C145E]">
                P
              </div>
            </div>

            <div className="p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1 text-sm text-[#FFB300]">
                    <span>★★★★★</span>
                    <span className="text-text-gray">{card.rating}</span>
                  </div>
                  <h3 className="mt-1 text-[26px] leading-none font-semibold text-text-black">{card.title}</h3>
                </div>
                <button type="button" className="mt-1 text-text-gray transition hover:text-blue" aria-label="Add to favourites">
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-2 flex items-center gap-1 text-sm text-text-gray">
                <Image src="/assets/location-blue.svg" width={12} height={12} alt="location" />
                <span>{card.address}</span>
              </p>

              <p className="mt-2 text-[30px] leading-none font-semibold text-[#111A67]">{card.price}</p>

              <div className="mt-2 border-t border-border pt-2 text-sm text-text-gray">
                <p>
                  Listed on : <span className="text-text-black">{card.listedOn}</span>
                </p>
                <p className="mt-1">
                  Possession status: <span className="text-text-black">{card.possession}</span>
                </p>
              </div>

              <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                <div className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-text-black">
                  <Image src="/assets/bed.svg" width={12} height={12} alt="bed" />
                  <span>{card.beds} Bed</span>
                </div>
                <div className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-text-black">
                  <Image src="/assets/bath.svg" width={12} height={12} alt="bath" />
                  <span>{card.baths} Bath</span>
                </div>
                <div className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-text-black">
                  <Maximize2 className="h-3 w-3 text-text-gray" />
                  <span>{card.area}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
