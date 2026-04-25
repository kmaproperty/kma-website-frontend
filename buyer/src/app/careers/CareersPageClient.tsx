"use client";

import HomdeHeader from "@/components/header/homeHeader";
import HomeFooter from "@/components/footer/homeFooter";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import PageTitle from "@/components/common/PageTitle";
import Image from "next/image";
import { useState } from "react";
import {
  House,
  Search,
  MapPin,
  Calendar,
  Check,
  ChevronDown,
  X,
  Wallet,
  ArrowRight,
  Flower2,
  Zap,
  Send,
} from "lucide-react";

/** Figma: “Popular:” row — square tags, light grey */
const POPULAR_TAGS = [
  "Admin",
  "Software Engineering",
  "Design",
  "Support",
  "Product Manager",
];

/** Figma job categories — icon PNGs in /public/assets/careers/category-*.png */
const CATEGORIES = [
  {
    name: "Design",
    jobsLine: "241+ Jobs",
    iconSrc: "/assets/careers/category-design.png",
  },
  {
    name: "Development",
    jobsLine: "1K+ Jobs",
    iconSrc: "/assets/careers/category-development.png",
  },
  {
    name: "Marketing",
    jobsLine: "124+ Jobs",
    iconSrc: "/assets/careers/category-marketing.png",
  },
  {
    name: "Editing",
    jobsLine: "24+ Jobs",
    iconSrc: "/assets/careers/category-editing.png",
  },
  {
    name: "Business",
    jobsLine: "1.2K+ Jobs",
    iconSrc: "/assets/careers/category-business.png",
  },
  {
    name: "IT",
    jobsLine: "1.3K+ Jobs",
    iconSrc: "/assets/careers/category-it.png",
  },
];

const DREAM_CHECKS = [
  "Curated roles from verified employers across industries.",
  "Transparent listings with clear salary and location details.",
  "One profile to track applications and saved opportunities.",
];

type FeaturedTab = "All" | "Industrial" | "Food" | "Health" | "Public Village";

/** Gallery row: first slot uses logo-mark-4 hero asset; then collage → ratings → celebration */
const HERO_CARDS = [
  {
    src: "/assets/careers/logo-mark-4.png",
    alt: "Professional with laptop and ratings",
  },
  {
    src: "/assets/careers/dream-job-collage.png",
    alt: "Professional at workspace",
  },
  {
    src: "/assets/careers/rating-yellow-hero.png",
    alt: "Team member with high ratings",
  },
  {
    src: "/assets/careers/celebration-first-job.png",
    alt: "Celebrating first job",
  },
];
const SCROLL_HERO_CARDS = [...HERO_CARDS, ...HERO_CARDS];

const JOBS = [
  {
    company: "Wilson Engineering Solutions",
    title: "Nuclear Outage Worker",
    logoIcon: Flower2,
    logoIconColor: "text-[#ff7a45]",
    address: "120 Center st #300",
    date: "2025-09-26",
    salary: "$3k - $3,8k a month",
  },
  {
    company: "Solit It Solutions",
    title: "Nuclear Outage Worker",
    logoIcon: Zap,
    logoIconColor: "text-[#10b981]",
    address: "120 Center st #300",
    date: "2025-09-26",
    salary: "$3k - $3,8k a month",
  },
  {
    company: "Wilson Engineering Solutions",
    title: "Nuclear Outage Worker",
    logoIcon: Flower2,
    logoIconColor: "text-[#ff7a45]",
    address: "120 Center st #300",
    date: "2025-09-26",
    salary: "$3k - $3,8k a month",
  },
  {
    company: "Templates.Gallery",
    title: "Nuclear Outage Worker",
    logoIcon: Send,
    logoIconColor: "text-[#f59e0b]",
    address: "120 Center st #300",
    date: "2025-09-26",
    salary: "$3k - $3,8k a month",
  },
  {
    company: "Wilson Engineering Solutions",
    title: "Nuclear Outage Worker",
    logoIcon: Flower2,
    logoIconColor: "text-[#ff7a45]",
    address: "120 Center st #300",
    date: "2025-09-26",
    salary: "$3k - $3,8k a month",
  },
];

const TABS: FeaturedTab[] = [
  "All",
  "Industrial",
  "Food",
  "Health",
  "Public Village",
];

const JOB_CATEGORY_OPTIONS = ["Full Time", "Part Time", "Contract", "Internship"];
const LOCATION_OPTIONS = ["Gurugram", "Delhi NCR", "Remote", "Mumbai"];
const KEYWORD_OPTIONS = ["Designer", "Developer", "Marketing", "Support"];

const careersBreadcrumps = [
  {
    name: "Home",
    link: "/",
    icon: <House className="w-5" />,
  },
  {
    name: "Careers",
  },
];

export default function CareersPageClient() {
  const [activeTab, setActiveTab] = useState<FeaturedTab>("All");
  const [jobCategory, setJobCategory] = useState("");
  const [location, setLocation] = useState("");
  const [mobileKeyword, setMobileKeyword] = useState("");
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<
    "" | "jobCategory" | "location" | "keyword"
  >("");
  const [desktopOpenDropdown, setDesktopOpenDropdown] = useState<
    "" | "jobCategory" | "location" | "keyword"
  >("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  /** Flat mock list; tab filter can slice/replace when per-tab data exists */
  const jobs = JOBS;

  return (
    <div className="min-w-0 ">
      <div className="pointer-events-none fixed left-0 right-0 z-[60] flex justify-center">
        <div className="pointer-events-auto flex w-full justify-center">
          <HomdeHeader />
        </div>
      </div>

      {/* Banner — same layout & PageTitle typography as Help Center */}
      <div
        className="relative min-h-[385px] max-h-[385px] rounded-bl-[40px] rounded-br-[40px] pt-[25px] sm:min-h-[min(100dvh,560px)] sm:max-h-[560px] sm:rounded-bl-[72px] sm:rounded-br-[72px] md:min-h-[500px] md:max-h-[500px] lg:min-h-[min(100dvh,600px)] lg:max-h-[600px] lg:rounded-bl-[100px] lg:rounded-br-[100px]"
        style={{
          backgroundImage: "url(assets/app/help-center-herobg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div className="mx-auto mt-[120px] w-full max-w-full px-4 sm:mt-28 sm:px-6 md:mt-32 lg:px-10 xl:mt-[150px]">
          <PageTitle
            title="Unlock Your Future: Find Your Perfect Job Today!"
            description="Search roles, explore categories, and take the next step in your career with us."
            breadcrumps={careersBreadcrumps}
            actions={null}
            innerClassName="w-full max-w-full"
          />
        </div>

        {/* Mobile + tablet search trigger stays inside banner */}
        <div className="absolute inset-x-0 bottom-4 px-4 sm:bottom-5 sm:px-6 md:bottom-6 md:px-8 lg:hidden">
          <div className="mx-auto w-full max-w-[56rem]">
            <div className="flex h-14 w-full items-center gap-2 rounded-full border border-[#D9D9D9] bg-white px-3">
              <button
                type="button"
                onClick={() => {
                  setMobileOpenDropdown("");
                  setIsMobileFilterOpen(true);
                }}
                className="flex min-w-0 flex-1 items-center gap-3 px-2 text-left text-[15px] font-normal text-[#9aa3b2]"
              >
                <Search className="h-5 w-5 shrink-0 text-[#6b7280]" aria-hidden />
                <span>Search your job</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpenDropdown("");
                  setIsMobileFilterOpen(true);
                }}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#010048] text-white"
                aria-label="Open filters"
              >
                <Search className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ① Filter — boxed & centered ② Popular + gallery — full-width, no outer card (Figma) */}
      <div className="relative z-10 flex flex-col gap-3 translate-y-0 sm:gap-4 md:gap-5 lg:-translate-y-12 xl:-translate-y-16">
        <div className="mx-auto hidden w-[92%] max-w-[1200px] md:w-[90%] lg:block">
          <div
            className="rounded-2xl border border-gray-100/80 bg-white px-5 py-5 sm:px-8 sm:py-6 md:px-10 md:py-7"
            style={{
              boxShadow: "0px 5px 10px 0px #00000012",
            }}
          >
            {/* Desktop filter row */}
            <div className="hidden lg:block">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-6 xl:gap-8">
              <div className="grid min-w-0 flex-1 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[minmax(0,220px)_minmax(0,220px)_minmax(0,1fr)] lg:gap-6 xl:gap-8">
                <div className="flex min-w-0 flex-col gap-2">
                  <label className="text-sm font-semibold tracking-tight text-[#0c1328]">
                    Job Categories
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setDesktopOpenDropdown((prev) =>
                          prev === "jobCategory" ? "" : "jobCategory"
                        )
                      }
                      className={`h-12 w-full rounded-full border border-[#D9D9D9] bg-white py-2.5 pl-5 pr-11 text-left text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#0c2340]/20 ${jobCategory ? "text-[#0c1328]" : "text-gray-400"}`}
                    >
                      {jobCategory || "Select"}
                    </button>
                    <ChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0c1328]"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    {desktopOpenDropdown === "jobCategory" && (
                      <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-2xl border border-[#D9D9D9] bg-white shadow-lg">
                        {JOB_CATEGORY_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setJobCategory(option);
                              setDesktopOpenDropdown("");
                            }}
                            className="block w-full px-4 py-2.5 text-left text-sm text-[#0c1328] hover:bg-gray-50"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                  <label className="text-sm font-semibold tracking-tight text-[#0c1328]">
                    Location
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setDesktopOpenDropdown((prev) =>
                          prev === "location" ? "" : "location"
                        )
                      }
                      className={`h-12 w-full rounded-full border border-[#D9D9D9] bg-white py-2.5 pl-5 pr-11 text-left text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#0c2340]/20 ${location ? "text-[#0c1328]" : "text-gray-400"}`}
                    >
                      {location || "Select"}
                    </button>
                    <ChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0c1328]"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    {desktopOpenDropdown === "location" && (
                      <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-2xl border border-[#D9D9D9] bg-white shadow-lg">
                        {LOCATION_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setLocation(option);
                              setDesktopOpenDropdown("");
                            }}
                            className="block w-full px-4 py-2.5 text-left text-sm text-[#0c1328] hover:bg-gray-50"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex min-w-0 flex-col gap-2 sm:col-span-2 lg:col-span-1">
                  <label className="text-sm font-semibold tracking-tight text-[#0c1328]">
                    Keywords or Titles
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setDesktopOpenDropdown((prev) =>
                          prev === "keyword" ? "" : "keyword"
                        )
                      }
                      className={`h-12 w-full rounded-full border border-[#D9D9D9] bg-white py-2.5 pl-5 pr-11 text-left text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#0c2340]/20 ${mobileKeyword ? "text-[#0c1328]" : "text-gray-400"}`}
                    >
                      {mobileKeyword || "Select"}
                    </button>
                    <ChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0c1328]"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                    {desktopOpenDropdown === "keyword" && (
                      <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-2xl border border-[#D9D9D9] bg-white shadow-lg">
                        {KEYWORD_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setMobileKeyword(option);
                              setDesktopOpenDropdown("");
                            }}
                            className="block w-full px-4 py-2.5 text-left text-sm text-[#0c1328] hover:bg-gray-50"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 justify-center lg:justify-end lg:items-end">
                <button
                  type="button"
                  onClick={() => setDesktopOpenDropdown("")}
                  className="inline-flex h-[50px] w-[190px] min-w-[190px] shrink-0 items-center justify-center gap-2 self-start rounded-full border border-solid border-[#010048] bg-[#010048] px-4 text-[16px] font-medium leading-none text-white transition hover:opacity-90 sm:self-auto"
                >
                  <Search
                    className="h-4 w-4 shrink-0 text-white"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                  Search
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>

        <section className="w-full min-w-0 bg-white px-4 pb-4 pt-5 sm:px-6 sm:pb-6 sm:pt-6 md:pb-8 md:pt-7 lg:px-8 lg:pb-10 lg:pt-0">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 sm:gap-12 md:gap-14 lg:gap-[110px]">
            <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-4 sm:gap-y-2">
              <span className="shrink-0 text-sm font-semibold text-[#4b5563] sm:text-base">
                Popular:
              </span>
              <div className="flex min-w-0 max-w-full flex-wrap justify-center gap-2 sm:gap-3">
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="rounded-[5px] border border-solid border-[#D9D9D9] bg-[#f3f4f6] px-3 py-2 text-left text-xs font-medium text-[#1f2937] transition hover:border-[#bfbfbf] hover:bg-[#e5e7eb] sm:px-3.5 sm:py-2.5 sm:text-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full overflow-hidden">
              <div className="careers-marquee-track flex w-max gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {SCROLL_HERO_CARDS.map((card, index) => (
                  <div
                    key={`${card.src}-${index}`}
                    className="relative h-[220px] w-[280px] shrink-0 overflow-hidden rounded-2xl bg-[#F2F2F2] ring-1 ring-black/[0.06] sm:h-[240px] sm:w-[320px] md:h-[260px] md:w-[360px] lg:h-[250px] lg:w-[352px]"
                  >
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 360px, 352px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Popular job categories — Figma look + fluid grid / clamp / rem for all viewports */}
      <section
        className="w-full bg-[#F2F2F2]"
        style={{ paddingBlock: "clamp(2rem, 4vw, 4rem)" }}
      >
        <div
          className="mx-auto w-full max-w-[90rem] min-w-0"
          style={{ paddingInline: "clamp(1rem, 3vw, 2rem)" }}
        >
          <div
            className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
            style={{ marginBottom: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            <div className="min-w-0 pr-2">
              <div className="mb-2 h-[2px] w-8 bg-gray-400">
                <div className="h-[2px] w-1/2 bg-gray-900" />
              </div>
              <h2
                className="font-bold text-[#0D1520]"
                style={{
                  fontSize: "clamp(1.375rem, 1.1rem + 1.2vw, 1.75rem)",
                  lineHeight: "1.18",
                }}
              >
                Popular Job Categories
              </h2>
              <p
                className="mt-2 font-normal tracking-normal text-[#888888]"
                style={{
                  fontSize: "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)",
                  lineHeight: "1",
                }}
              >
                Recruitment made easy in just 1 Min!
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-[50px] w-[190px] min-w-[190px] shrink-0 items-center justify-center self-start rounded-full border border-solid border-[#010048] bg-[#010048] px-4 text-[16px] font-medium leading-none text-white transition hover:opacity-90 sm:self-auto"
            >
              All View
            </button>
          </div>
          <div
            className="grid w-full justify-items-stretch"
            style={{
              gap: "1.25rem",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 10.5rem), 1fr))",
            }}
          >
            {CATEGORIES.map((c) => (
              <div
                key={c.name}
                className="mx-auto flex aspect-[224/234] w-full max-w-[14rem] flex-col items-center justify-center bg-white px-3 py-5 text-center sm:px-4"
                style={{
                  borderRadius: "0.625rem",
                  border: "0.95px dashed #E4E4E4",
                }}
              >
                <div
                  className="flex shrink-0 items-center justify-center rounded-xl"
                  style={{
                    width: "clamp(3rem, 8vw, 4.76rem)",
                    height: "clamp(3rem, 8vw, 4.76rem)",
                  }}
                >
                  <Image
                    src={c.iconSrc}
                    alt=""
                    width={56}
                    height={56}
                    className="object-contain"
                    style={{
                      width: "clamp(2.25rem, 6vw, 3.5rem)",
                      height: "clamp(2.25rem, 6vw, 3.5rem)",
                    }}
                  />
                </div>
                <h3
                  className="font-medium leading-none text-[#0D1520]"
                  style={{
                    marginTop: "clamp(1rem, 2vw, 1.625rem)",
                    fontSize: "clamp(1.0625rem, 0.95rem + 0.6vw, 1.5rem)",
                  }}
                >
                  {c.name}
                </h3>
                <p
                  className="mt-2 font-normal text-[#888888]"
                  style={{
                    fontSize: "clamp(0.8125rem, 0.75rem + 0.35vw, 1rem)",
                    lineHeight: "1.98",
                  }}
                >
                  {c.jobsLine}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile + Tablet filter popup (rendered at page root so it fully covers banner) */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[200] bg-black/35 lg:hidden">
          <div className="h-full w-full overflow-y-auto bg-white p-5 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#0c1328] md:text-sm">Filter</h3>
              <button
                type="button"
                onClick={() => {
                  setIsMobileFilterOpen(false);
                  setMobileOpenDropdown("");
                }}
                className="rounded p-1 text-[#0c1328] hover:bg-gray-100"
                aria-label="Close filter"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex min-w-0 flex-col gap-2">
                <label className="text-sm font-medium text-[#0c1328] md:text-xs">Job Categories</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileOpenDropdown((prev) =>
                        prev === "jobCategory" ? "" : "jobCategory"
                      )
                    }
                    className={`h-12 w-full rounded-md border bg-white py-2 pl-4 pr-10 text-left text-sm outline-none transition md:h-10 md:text-xs ${jobCategory ? "border-[#0c2340] text-[#0c1328]" : "border-[#D9D9D9] text-gray-400"}`}
                  >
                    {jobCategory || "Select"}
                  </button>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0c1328] md:h-4 md:w-4"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {mobileOpenDropdown === "jobCategory" && (
                    <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 overflow-hidden rounded-md border border-[#D9D9D9] bg-white shadow-lg">
                      {JOB_CATEGORY_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setJobCategory(option);
                            setMobileOpenDropdown("");
                          }}
                          className="block w-full px-4 py-2.5 text-left text-sm text-[#0c1328] hover:bg-gray-50 md:text-xs"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-2">
                <label className="text-sm font-medium text-[#0c1328] md:text-xs">Location</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileOpenDropdown((prev) =>
                        prev === "location" ? "" : "location"
                      )
                    }
                    className={`h-12 w-full rounded-md border bg-white py-2 pl-4 pr-10 text-left text-sm outline-none transition md:h-10 md:text-xs ${location ? "border-[#0c2340] text-[#0c1328]" : "border-[#D9D9D9] text-gray-400"}`}
                  >
                    {location || "Select"}
                  </button>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0c1328] md:h-4 md:w-4"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {mobileOpenDropdown === "location" && (
                    <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 overflow-hidden rounded-md border border-[#D9D9D9] bg-white shadow-lg">
                      {LOCATION_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setLocation(option);
                            setMobileOpenDropdown("");
                          }}
                          className="block w-full px-4 py-2.5 text-left text-sm text-[#0c1328] hover:bg-gray-50 md:text-xs"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-2">
                <label className="text-sm font-medium text-[#0c1328] md:text-xs">Keywords or Titles</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileOpenDropdown((prev) =>
                        prev === "keyword" ? "" : "keyword"
                      )
                    }
                    className={`h-12 w-full rounded-md border bg-white py-2 pl-4 pr-10 text-left text-sm outline-none transition md:h-10 md:text-xs ${mobileKeyword ? "border-[#0c2340] text-[#0c1328]" : "border-[#D9D9D9] text-gray-400"}`}
                  >
                    {mobileKeyword || "Select"}
                  </button>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0c1328] md:h-4 md:w-4"
                    strokeWidth={2}
                    aria-hidden
                  />
                  {mobileOpenDropdown === "keyword" && (
                    <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 overflow-hidden rounded-md border border-[#D9D9D9] bg-white shadow-lg">
                      {KEYWORD_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setMobileKeyword(option);
                            setMobileOpenDropdown("");
                          }}
                          className="block w-full px-4 py-2.5 text-left text-sm text-[#0c1328] hover:bg-gray-50 md:text-xs"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsMobileFilterOpen(false);
                setMobileOpenDropdown("");
              }}
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-md border border-solid border-[#010048] bg-[#010048] px-4 text-base font-medium leading-none text-white transition hover:opacity-90 md:mt-4 md:h-10 md:text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Dream job — 100px vertical padding; image column max height ~Figma row */}
      <section
        className="bg-white"
        style={{
          paddingTop: "clamp(44px, 6.5vw, 100px)",
          paddingBottom: "clamp(44px, 6.5vw, 100px)",
        }}
      >
        <div
          className="mx-auto flex min-h-0 w-full flex-col items-stretch lg:flex-row lg:items-center"
          style={{
            maxWidth: "min(100%, 86.25rem)",
            paddingInline: "clamp(1rem, 3vw, 2rem)",
            gap: "70px",
          }}
        >
          <div className="relative min-h-0 w-full min-w-0 flex-1">
            <div
              className="relative mx-auto w-full max-w-[min(100%,28rem)] overflow-hidden bg-transparent sm:max-w-[min(100%,32rem)] lg:max-w-[min(100%,36rem)]"
              style={{
                aspectRatio: "4 / 5",
                maxHeight: "min(569px, 75vh)",
              }}
            >
              <Image
                src="/assets/careers/group-hero.png"
                alt="Team collage with professionals and average ratings"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
            </div>
          </div>
          <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col justify-center lg:min-w-0">
            <div className="mb-2 h-[2px] w-8 bg-gray-400">
              <div className="h-[2px] w-1/2 bg-gray-900" />
            </div>
            <h2
              className="max-w-full overflow-x-auto text-[#0c1328] whitespace-nowrap pb-0.5 [-webkit-overflow-scrolling:touch] lg:overflow-x-visible"
              style={{
                fontSize: "clamp(15px, 2.35vw, 28px)",
                lineHeight: "clamp(26px, 4.2vw, 46.81px)",
              }}
            >
              <span className="font-medium" style={{ fontWeight: 500 }}>
                Choose Your Dream Job From Over{" "}
              </span>
              <span className="font-bold" style={{ fontWeight: 700 }}>
                50,000+ Jobs
              </span>
            </h2>
            <p
              className="mt-4 text-[#888888]"
              style={{
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "180%",
              }}
            >
              Explore roles that match your skills and goals. We bring together
              employers who value clarity and candidates who are ready for the
              next step—so you spend less time guessing and more time
              interviewing for the right fit.
            </p>
            <ul
              className="mt-6 space-y-3 text-[#888888]"
              style={{
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "180%",
              }}
            >
              {DREAM_CHECKS.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-8 inline-flex h-[50px] w-[190px] min-w-[190px] shrink-0 items-center justify-center self-start rounded-full border border-solid border-[#010048] bg-[#010048] px-4 text-[16px] font-medium leading-none text-white transition hover:opacity-90"
            >
              Search Job
            </button>
          </div>
        </div>
      </section>

      {/* Featured jobs — Figma: #F2F2F2 only on inner panel; section edges stay white */}
      <section
        id="jobs"
        className="relative bg-white pb-12 pt-8 md:pb-14 md:pt-10 lg:pb-24 lg:pt-20"
        data-testid="featured-jobs"
      >
        <div className="mx-auto w-full max-w-[min(100%,90rem)] px-4 md:px-6">
          <div className="relative rounded-2xl bg-[#F2F2F2] px-5 pb-10 pt-6 md:px-8 md:pb-12 md:pt-8 lg:px-10 lg:pb-20 lg:pt-16">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto mb-2 h-[2px] w-8 bg-gray-400">
                <div className="h-[2px] w-1/2 bg-gray-900" />
              </div>
              <h2
                className="font-display text-4xl tracking-tight text-slate-900 md:text-5xl"
                data-testid="featured-heading"
              >
                <span className="font-extrabold">Featured</span>{" "}
                <span className="font-light text-slate-700">Jobs</span>
              </h2>
            </div>

            {/* Tabs */}
            <div
              className="flex flex-wrap justify-center gap-3 mb-10"
              data-testid="featured-tabs"
            >
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveTab(t)}
                  className={`text-sm px-6 py-2.5 rounded-md border transition ${
                    activeTab === t
                      ? "bg-[#1e1b7a] text-white border-[#1e1b7a] shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[#1e1b7a] hover:text-[#1e1b7a]"
                  }`}
                  data-testid={`tab-${t.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Job cards */}
            <div className="space-y-4">
              {jobs.map((j, i) => {
              const Icon = j.logoIcon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl px-5 md:px-6 py-5 md:py-6 card-hover"
                  data-testid={`job-card-${i}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-6">
                    {/* Logo */}
                    <div className="shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-slate-50 p-2 flex items-center justify-center">
                        <div className="w-full h-full rounded-lg bg-[#1a1f2c] flex items-center justify-center">
                          <Icon
                            size={22}
                            className={j.logoIconColor}
                            strokeWidth={2.5}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Company + Title */}
                    <div className="lg:w-60 shrink-0">
                      <div className="text-xs md:text-sm text-slate-400 font-medium">
                        {j.company}
                      </div>
                      <div className="font-display font-bold text-lg text-slate-900 leading-snug mt-1">
                        {j.title}
                      </div>
                    </div>

                    {/* Middle: tags + meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs font-medium px-3 py-1 rounded-md border border-[#d9d4ff] text-[#6c5ce7] bg-[#f3f1ff]">
                          Featured
                        </span>
                        <span className="text-xs font-medium px-3 py-1 rounded-md border border-[#c9f0d6] text-[#10a36e] bg-[#e9faf0]">
                          Full-Time
                        </span>
                        <span className="text-xs font-medium px-3 py-1 rounded-md border border-[#c9ddf5] text-[#2c7bd4] bg-[#eaf2fc]">
                          Outage Worker
                        </span>
                        <span className="text-xs font-medium px-3 py-1 rounded-md border border-[#f5c9c9] text-[#e05252] bg-[#fcecec]">
                          3 Applicants
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={15} /> {j.address}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={15} /> {j.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Wallet size={15} /> {j.salary}
                        </span>
                      </div>
                    </div>

                    {/* Apply button */}
                    <div className="lg:shrink-0">
                      <button
                        className="w-full lg:w-auto bg-[#1e1b7a] hover:bg-[#29259c] text-white font-semibold rounded-full px-8 py-3 text-sm transition"
                        data-testid={`apply-job-${i}`}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>

            {/* Bottom CTA pill */}
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2"
              data-testid="bottom-cta"
            >
              <div className="pointer-events-auto inline-flex min-w-[248px] h-[50px] items-center gap-1.5 rounded-full border border-[#ececf1] bg-white px-6 text-[13px] text-[#8f939d] shadow-[0_4px_12px_rgba(15,23,42,0.06)] md:min-w-0 md:px-7">
                <span className="leading-none">Do you want to post a job like this?</span>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 font-semibold leading-none text-[#1e1b7a] transition hover:text-[#29259c]"
                  data-testid="join-now-link"
                >
                  Join Now <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center bg-text-black">
        <AboutusDataSync />
        <HomeFooter tab={1} />
      </div>
      <style jsx>{`
        .careers-marquee-track {
          animation: careersMarquee 28s linear infinite;
        }
        @keyframes careersMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
