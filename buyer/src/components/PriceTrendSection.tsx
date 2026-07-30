"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, ChevronDown } from "lucide-react";

interface PriceTrendProps {
  societyName?: string;
  currentPrice?: number;
  trendData: {
    localityName: string;
    localityAvgPrice: number;
    localityTrends: Array<{ year: string; locality: number }>;
    growth1Yr: string;
    growth3Yr: string;
    growth5Yr: string;
  };
}

export default function PriceTrendSection({
  societyName = "Property Unit",
  currentPrice = 13550,
  trendData,
}: PriceTrendProps) {
  const [activeTab, setActiveTab] = useState<"locality" | "societies">("locality");
  const [timeRange, setTimeRange] = useState("Last 5 Years");

  // Chart data formatting
  const chartData = trendData.localityTrends.map((item) => ({
    year: item.year,
    locality: item.locality,
    society: Math.round(item.locality * (currentPrice / trendData.localityAvgPrice || 0.95)),
  }));

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 md:p-8 my-8 shadow-sm font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#02013b]">
            Price Trend & Comparison
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            The graph shows the quarterly average rates of properties.
          </p>
        </div>

        {/* TAB BUTTONS */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("locality")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "locality" ? "bg-white text-[#02013b] shadow-sm" : "text-slate-600"
            }`}
          >
            With Locality
          </button>
          <button
            onClick={() => setActiveTab("societies")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "societies" ? "bg-white text-[#02013b] shadow-sm" : "text-slate-600"
            }`}
          >
            With Societies
          </button>
        </div>
      </div>

      {/* PRICE METRICS */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between my-6 gap-4">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            RATE ON KMA (Super Built up Area)
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl md:text-3xl font-extrabold text-[#02013b]">
              ₹ {currentPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-slate-500 font-medium">/ sqft</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold uppercase">Avg. Property Rate</span>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-xs font-bold text-[#02013b] py-2 pl-3 pr-8 rounded-lg shadow-sm focus:outline-none cursor-pointer"
            >
              <option>Last 5 Years</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* GRAPH CANVAS */}
      <div className="w-full h-[280px] md:h-[320px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSociety" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorLocality" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              tickFormatter={(val) => `₹ ${(val / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#02013b", borderRadius: "8px", color: "#fff" }}
              formatter={(value: any) => [`₹ ${Number(value).toLocaleString("en-IN")}/sqft`, ""]}
            />

            {/* 🎯 WITH LOCALITY TAB: Sirf Locality ki single line with dots */}
            {activeTab === "locality" && (
              <Area
                type="monotone"
                dataKey="locality"
                stroke="#f59e0b"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorLocality)"
                name={trendData.localityName}
                dot={{ r: 4, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#f59e0b" }}
              />
            )}

            {/* 🎯 WITH SOCIETIES TAB: Sirf Society ki single line with dots */}
            {activeTab === "societies" && (
              <Area
                type="monotone"
                dataKey="society"
                stroke="#7c3aed"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSociety)"
                name={societyName}
                dot={{ r: 4, fill: "#7c3aed", stroke: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#7c3aed" }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* COMPARISON TABLE */}
      <div className="mt-8">
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Name</th>
                <th className="p-3.5">Current Price</th>
                <th className="p-3.5">Last 1 year</th>
                <th className="p-3.5">Last 3 years</th>
                <th className="p-3.5">Last 5 years</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {activeTab === "societies" && (
                <tr>
                  <td className="p-3.5 font-bold text-[#02013b]">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block mr-2" />
                    {societyName}
                  </td>
                  <td className="p-3.5 font-semibold">₹{currentPrice.toLocaleString("en-IN")}/sqft</td>
                  <td className="p-3.5 text-emerald-600 font-semibold inline-flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" /> {trendData.growth1Yr}
                  </td>
                  <td className="p-3.5 text-emerald-600 font-semibold inline-flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" /> {trendData.growth3Yr}
                  </td>
                  <td className="p-3.5 text-emerald-600 font-semibold inline-flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" /> {trendData.growth5Yr}
                  </td>
                </tr>
              )}
              {activeTab === "locality" && (
                <tr className="bg-slate-50/50">
                  <td className="p-3.5 font-bold text-[#02013b]">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block mr-2" />
                    {trendData.localityName} (Benchmark)
                  </td>
                  <td className="p-3.5 font-semibold">₹{trendData.localityAvgPrice.toLocaleString("en-IN")}/sqft</td>
                  <td className="p-3.5 text-emerald-600 font-semibold inline-flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" /> {trendData.growth1Yr}
                  </td>
                  <td className="p-3.5 text-emerald-600 font-semibold inline-flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" /> {trendData.growth3Yr}
                  </td>
                  <td className="p-3.5 text-emerald-600 font-semibold inline-flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" /> {trendData.growth5Yr}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}