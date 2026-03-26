"use client";

import { Search, Share2, RotateCcw, Download, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import CustomPagination from "@/components/common/pagination";
import LeadFiltersSidebar, {
  LeadFilters,
  DEFAULT_LEAD_FILTERS,
} from "./LeadFiltersSidebar";
import {
  getLeadsApiHandler,
  exportLeadsApiHandler,
  syncLeadsApiHandler,
  LeadItem,
  LeadListQueryParams,
  LeadTabCounts,
} from "@/services/leadService";

type TabKey = "all" | "new" | "this_month" | "last_month";

const TAB_LABELS: Record<TabKey, string> = {
  all: "All",
  new: "New",
  this_month: "This Month",
  last_month: "Last Month",
};

const ITEMS_PER_PAGE = 20;

export default function LeadSummaryListClient() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [total, setTotal] = useState(0);
  const [tabCounts, setTabCounts] = useState<LeadTabCounts>({
    all: 0,
    new: 0,
    this_month: 0,
    last_month: 0,
  });
  const [filters, setFilters] = useState<LeadFilters>({ ...DEFAULT_LEAD_FILTERS });
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [exporting, setExporting] = useState(false);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params: LeadListQueryParams = {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      };
      if (searchText.trim()) params.search = searchText.trim();
      if (activeTab !== "all") params.timeFilter = activeTab;
      if (filters.budgetMin != null) params.budgetMin = filters.budgetMin;
      if (filters.budgetMax != null) params.budgetMax = filters.budgetMax;
      if (filters.sizeMin != null) params.sizeMin = filters.sizeMin;
      if (filters.sizeMax != null) params.sizeMax = filters.sizeMax;
      if (filters.buildingType != null) params.buildingType = filters.buildingType;
      if (filters.locality.trim()) params.locality = filters.locality.trim();

      const res = await getLeadsApiHandler(params);
      setLeads(res.data);
      setTotal(res.total);
      if (res.tabCounts) setTabCounts(res.tabCounts);
    } catch (err) {
      console.error("Failed to fetch leads", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchText, activeTab, filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Reset to page 1 when tab, search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchText, filters]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncLeadsApiHandler();
      await fetchLeads();
    } catch (err) {
      console.error("Failed to sync leads", err);
    } finally {
      setSyncing(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const params: LeadListQueryParams = {};
      if (searchText.trim()) params.search = searchText.trim();
      if (activeTab !== "all") params.timeFilter = activeTab;
      if (filters.budgetMin != null) params.budgetMin = filters.budgetMin;
      if (filters.budgetMax != null) params.budgetMax = filters.budgetMax;
      if (filters.sizeMin != null) params.sizeMin = filters.sizeMin;
      if (filters.sizeMax != null) params.sizeMax = filters.sizeMax;
      if (filters.buildingType != null) params.buildingType = filters.buildingType;
      if (filters.locality.trim()) params.locality = filters.locality.trim();

      const blob = await exportLeadsApiHandler(params);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "leads-export.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to export leads", err);
    } finally {
      setExporting(false);
    }
  };

  const formatBudget = (min?: number | null, max?: number | null) => {
    if (!min && !max) return "";
    const fmt = (v: number) => {
      if (v >= 10000000) return `${(v / 10000000).toFixed(1)}Cr`;
      if (v >= 100000) return `${(v / 100000).toFixed(0)}L`;
      return `${v}`;
    };
    if (min && max) return `Budget: ₹${fmt(min)} - ${fmt(max)}`;
    if (min) return `Budget: ₹${fmt(min)}+`;
    return `Budget: Up to ₹${fmt(max!)}`;
  };

  const stripHtml = (str: string) => str.replace(/<[^>]*>/g, "").trim();

  const formatAreaUnit = (unit?: string) => {
    if (!unit) return "Sq.ft";
    return unit.replace(/_/g, " ").replace(/sq ft/i, "Sq.ft").replace(/sq yd/i, "Sq.yd");
  };

  const formatTimeAgo = (dateStr?: string | null) => {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "Contacted just now";
    if (hours < 24) return `Contacted ${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Contacted 1 day ago";
    return `Contacted ${days} days ago`;
  };

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
              <LeadFiltersSidebar filters={filters} onChange={setFilters} />
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
                  {(Object.keys(TAB_LABELS) as TabKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                        activeTab === key
                          ? "border-blue bg-blue text-white"
                          : "border-[#e5e5e5] bg-white text-text-gray"
                      }`}
                    >
                      {TAB_LABELS[key]} <span className="ml-1">{tabCounts[key]}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSync}
                    disabled={syncing}
                    className="inline-flex items-center gap-1 rounded-md border border-[#dcdcdc] bg-white px-3 py-1.5 text-xs font-medium text-text-black disabled:opacity-50"
                  >
                    <RotateCcw className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`} />
                    {syncing ? "Syncing..." : "Sync Last 5 mins"}
                  </button>
                  <button
                    onClick={handleExport}
                    disabled={exporting}
                    className="inline-flex items-center gap-1 rounded-md border border-[#0b1555] bg-[#0b1555] px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
                  >
                    <Download className="h-3.5 w-3.5" />
                    {exporting ? "Exporting..." : "Export Leads"}
                  </button>
                </div>
              </div>

              <p className="mb-3 text-xs text-text-gray">
                Showing{" "}
                <span className="font-semibold text-text-black">
                  {total === 0
                    ? "0"
                    : `${(currentPage - 1) * ITEMS_PER_PAGE + 1} - ${Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        total
                      )}`}
                </span>{" "}
                of {total} results
              </p>

              <div className="space-y-3 overflow-y-auto h-[calc(100vh-200px)]">
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue border-t-transparent" />
                  </div>
                ) : leads.length === 0 ? (
                  <div className="flex items-center justify-center py-20 text-sm text-text-gray">
                    No leads found
                  </div>
                ) : (
                  leads.map((item) => {
                    const firstProperty = item.propertyContacts?.[0]?.property;
                    return (
                      <article key={item.id} className="rounded-lg border border-[#e2e2e2] bg-[#fbfbfb] px-4 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <p className="text-[18px] font-semibold text-text-black">{item.name}</p>
                            <button className="rounded-md border border-[#e1e1e1] bg-[#f2f2f4] p-1.5 text-[#8f8fa0]">
                              <Share2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-sm text-[#8c8c8c]">{formatTimeAgo(item.lastContactedAt)}</p>
                        </div>
                        <div className="my-3 border-t border-[#e5e5e5]" />

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.6fr]">
                          <div>
                            <p className="text-sm text-[#8a8a8a]">
                              {item.propertiesContactedCount} properties contacted
                            </p>
                            <p className="mt-1 text-sm text-[#8a8a8a]">
                              {formatBudget(item.budgetMin, item.budgetMax)}
                            </p>
                            {item.locations && item.locations.length > 0 && (
                              <p className="mt-1 text-sm text-[#8a8a8a]">
                                Locations: {item.locations.join(", ")}
                              </p>
                            )}
                          </div>

                          <div>
                            {firstProperty ? (
                              <>
                                <p className="text-[15px] font-semibold text-text-black">
                                  {firstProperty.bhkTypeName
                                    ? `${firstProperty.bhkTypeName} `
                                    : ""}
                                  {stripHtml(firstProperty.title || "Property")}
                                </p>
                                <p className="mt-1 text-sm text-[#8a8a8a]">
                                  {[firstProperty.societyName, firstProperty.localityName]
                                    .filter(Boolean)
                                    .join(", ")}
                                </p>
                              </>
                            ) : (
                              <p className="text-[15px] font-semibold text-text-black">
                                {item.propertyTypes?.join(", ") || "Property"}
                              </p>
                            )}

                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              {item.buildingType && (
                                <span className="rounded-full border border-[#e2e2e2] bg-[#f5f5f5] px-3 py-1 text-sm text-[#8b8b8b]">
                                  {item.buildingType}
                                </span>
                              )}
                              {firstProperty?.price && (
                                <span className="rounded-full border border-[#e2e2e2] bg-[#f5f5f5] px-3 py-1 text-sm text-[#8b8b8b]">
                                  ₹{firstProperty.price >= 10000000
                                    ? `${(firstProperty.price / 10000000).toFixed(1)} Cr`
                                    : firstProperty.price >= 100000
                                    ? `${(firstProperty.price / 100000).toFixed(0)}L`
                                    : firstProperty.price}
                                </span>
                              )}
                              {firstProperty?.area && (
                                <span className="rounded-full border border-[#e2e2e2] bg-[#f5f5f5] px-3 py-1 text-sm text-[#8b8b8b]">
                                  {firstProperty.area} {formatAreaUnit(firstProperty.areaUnit)}
                                </span>
                              )}
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
                    );
                  })
                )}
              </div>

              {totalPages > 1 && (
                <div className="mt-5 flex justify-end">
                  <CustomPagination page={currentPage} totalPages={totalPages} onChange={setCurrentPage} />
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
