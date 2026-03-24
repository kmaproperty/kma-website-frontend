"use client";

import { Search, Share2, RotateCcw, Download, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import CustomPagination from "@/components/common/pagination";
import FiltersSidebar from "@/app/projects/_components/FiltersSidebar";

type LeadItem = {
  id: string;
  ownerName: string;
  contactedProperties: string;
  title: string;
  budget: string;
  location: string;
  category: string;
  bed: string;
  price: string;
  area: string;
  contactAgo: string;
};

const leads: LeadItem[] = [
  {
    id: "1",
    ownerName: "Dwayne Douglas",
    contactedProperties: "5 properties contacted",
    title: "3 BHK Apartment",
    budget: "Budget: ₹40L - 60L",
    location: "Locations: Sector 70A",
    category: "Buy",
    bed: "",
    price: "₹1.6 Cr",
    area: "1423 Sq.ft",
    contactAgo: "Contacted 9 hours ago",
  },
  {
    id: "2",
    ownerName: "Dwayne Douglas",
    contactedProperties: "3 properties contacted",
    title: "3 BHK Apartment",
    budget: "Budget: ₹75L - 90L",
    location: "Locations: Sector 48",
    category: "Buy",
    bed: "",
    price: "₹1.8 Cr",
    area: "1560 Sq.ft",
    contactAgo: "Contacted 8 hours ago",
  },
  {
    id: "3",
    ownerName: "Dwayne Douglas",
    contactedProperties: "2 properties contacted",
    title: "2 BHK Apartment",
    budget: "Budget: ₹55L - 75L",
    location: "Locations: Golf Course Ext",
    category: "Buy",
    bed: "",
    price: "₹1.2 Cr",
    area: "1209 Sq.ft",
    contactAgo: "Contacted 12 hours ago",
  },
  {
    id: "4",
    ownerName: "Dwayne Douglas",
    contactedProperties: "4 properties contacted",
    title: "3 BHK Apartment",
    budget: "Budget: ₹1Cr - 1.5Cr",
    location: "Locations: New Gurgaon",
    category: "Buy",
    bed: "",
    price: "₹2.1 Cr",
    area: "1781 Sq.ft",
    contactAgo: "Contacted 1 day ago",
  },
  {
    id: "5",
    ownerName: "Dwayne Douglas",
    contactedProperties: "5 properties contacted",
    title: "3 BHK Apartment",
    budget: "Budget: ₹90L - 1.2Cr",
    location: "Locations: Sector 70A",
    category: "Buy",
    bed: "",
    price: "₹1.9 Cr",
    area: "1650 Sq.ft",
    contactAgo: "Contacted 1 day ago",
  },
  {
    id: "6",
    ownerName: "Dwayne Douglas",
    contactedProperties: "1 properties contacted",
    title: "3 BHK Apartment",
    budget: "Budget: ₹35L - 55L",
    location: "Locations: Sohna Road",
    category: "Buy",
    bed: "",
    price: "₹95L",
    area: "1110 Sq.ft",
    contactAgo: "Contacted 1 day ago",
  },
];

const tabItems = [
  { label: "All", count: 6, key: "all" },
  { label: "New", count: 18, key: "new" },
  { label: "Sep", count: 18, key: "sep" },
  { label: "Last Month", count: 28, key: "last_month" },
] as const;

export default function LeadSummaryListClient() {
  const [activeTab, setActiveTab] = useState<(typeof tabItems)[number]["key"]>("all");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const visibleLeads = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return leads;
    return leads.filter((item) => {
      const haystack = `${item.ownerName} ${item.title} ${item.location}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [searchText]);

  return (
    <div className="w-full ">
      <div className="px-2 text-xs font-medium text-text-light-gray sm:px-1">
        Home <span className="px-1">/</span>
        <span className="text-white"> Lead Summary / List</span>
      </div>

      <section className="mt-6 relative w-full">
        <h1 className="px-2 text-3xl font-semibold text-white">Lead Summary / List</h1>

        <div className="mt-4 rounded-[30px_30px_0_0] bg-white p-4 sm:p-5 w-full">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
            <aside className="rounded-xl bg-[#f5f5f5] px-5 py-4 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain">
              <FiltersSidebar />
            </aside>

            <main className="min-w-0 rounded-4xl bg-white p-3 sm:p-4 absolute top-0 right-0 w-[74%]">
              <div className="relative mb-4">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-gray" />
                <input
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Search by Name...."
                  className="h-11 w-full rounded-full border border-[#e3e3e3] bg-white px-11 pr-4 text-sm text-text-black outline-none"
                />
              </div>

              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  {tabItems.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                        activeTab === tab.key
                          ? "border-blue bg-blue text-white"
                          : "border-[#e5e5e5] bg-white text-text-gray"
                      }`}
                    >
                      {tab.label} <span className="ml-1">{tab.count}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-1 rounded-md border border-[#dcdcdc] bg-white px-3 py-1.5 text-xs font-medium text-text-black">
                    <RotateCcw className="h-3.5 w-3.5" />
                    Sync Last 5 mins
                  </button>
                  <button className="inline-flex items-center gap-1 rounded-md border border-[#0b1555] bg-[#0b1555] px-3 py-1.5 text-xs font-medium text-white">
                    <Download className="h-3.5 w-3.5" />
                    Export Leads
                  </button>
                </div>
              </div>

              <p className="mb-3 text-xs text-text-gray">
                Showing <span className="font-semibold text-text-black">1 - {visibleLeads.length}</span> results
              </p>

              <div className="space-y-3 overflow-y-auto h-[calc(100vh-200px)]">
                {visibleLeads.map((item) => (
                  <article key={item.id} className="rounded-lg border border-[#e2e2e2] bg-[#fbfbfb] px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <p className="text-[18px] font-semibold text-text-black">{item.ownerName}</p>
                        <button className="rounded-md border border-[#e1e1e1] bg-[#f2f2f4] p-1.5 text-[#8f8fa0]">
                          <Share2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-sm text-[#8c8c8c]">{item.contactAgo}</p>
                    </div>
                    <div className="my-3 border-t border-[#e5e5e5]" />

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.6fr]">
                      <div>
                        <p className="text-sm text-[#8a8a8a]">{item.contactedProperties}</p>
                        <p className="mt-1 text-sm text-[#8a8a8a]">{item.budget}</p>
                        <p className="mt-1 text-sm text-[#8a8a8a]">{item.location}</p>
                      </div>

                      <div>
                        <p className="text-[15px] font-semibold text-text-black ">{item.title}</p>
                        <p className="mt-1 text-sm text-[#8a8a8a]">Tulip Orange, Sector 70A</p>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-[#e2e2e2] bg-[#f5f5f5] px-3 py-1 text-sm text-[#8b8b8b]">
                            {item.category}
                          </span>
                          <span className="rounded-full border border-[#e2e2e2] bg-[#f5f5f5] px-3 py-1 text-sm text-[#8b8b8b]">
                            {item.price}
                          </span>
                          <span className="rounded-full border border-[#e2e2e2] bg-[#f5f5f5] px-3 py-1 text-sm text-[#8b8b8b]">
                            {item.area}
                          </span>
                          <button className="text-[#0b1555]">
                            <ExternalLink className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="my-3 border-t border-[#e5e5e5]" />
                    <div className="flex justify-end">
                      <button className="inline-flex items-center gap-2 rounded-md border border-[#8bcf97] bg-[#f5fff6] px-4 py-2 text-sm font-medium text-[#4a9e5a]">
                        <span className="grid h-4 w-4 grid-cols-2 gap-0.5">
                          <span className="rounded-[1px] bg-[#7fc78c]" />
                          <span className="rounded-[1px] bg-[#7fc78c]" />
                          <span className="rounded-[1px] bg-[#7fc78c]" />
                          <span className="rounded-[1px] bg-[#7fc78c]" />
                        </span>
                        CRM Dashboard
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-5 flex justify-end">
                <CustomPagination page={currentPage} totalPages={3} onChange={setCurrentPage} />
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}

