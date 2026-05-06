"use client";

import PageTitle from "@/components/common/PageTitle";
import { Search } from "lucide-react";
import type { ReactNode } from "react";

type BreadcrumbItem = { name: string; link?: string; icon?: ReactNode };

type CareersBannerProps = {
  title: string;
  description?: string;
  breadcrumps?: BreadcrumbItem[];
  backgroundImage: string;
  showSearch?: boolean;
  onSearchClick?: () => void;
};

export default function CareersBanner({
  title,
  description,
  breadcrumps,
  backgroundImage,
  showSearch = false,
  onSearchClick,
}: CareersBannerProps) {
  return (
    <div
      className="relative min-h-[385px] max-h-[385px] rounded-bl-[40px] rounded-br-[40px] pt-[25px] sm:min-h-[min(100dvh,560px)] sm:max-h-[560px] sm:rounded-bl-[72px] sm:rounded-br-[72px] md:min-h-[500px] md:max-h-[500px] lg:min-h-[545px] lg:max-h-[545px] lg:rounded-bl-[100px] lg:rounded-br-[100px]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div className="mx-auto mt-[120px] w-full max-w-full px-4 sm:mt-28 sm:px-6 md:mt-32 lg:px-10 xl:mt-[150px]">
        <PageTitle
          title={title}
          description={description}
          breadcrumps={breadcrumps}
          actions={null}
          innerClassName="w-full max-w-full"
        />
      </div>

      {showSearch && (
        <div className="absolute inset-x-0 bottom-4 px-4 sm:bottom-5 sm:px-6 md:bottom-6 md:px-8 lg:hidden">
          <div className="mx-auto w-full max-w-[56rem]">
            <div className="flex h-14 w-full items-center gap-2 rounded-full border border-[#D9D9D9] bg-white px-3">
              <button
                type="button"
                onClick={onSearchClick}
                className="flex min-w-0 flex-1 items-center gap-3 px-2 text-left text-[15px] font-normal text-[#9aa3b2]"
              >
                <Search className="h-5 w-5 shrink-0 text-[#6b7280]" aria-hidden />
                <span>Search your job</span>
              </button>
              <button
                type="button"
                onClick={onSearchClick}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#010048] text-white"
                aria-label="Open filters"
              >
                <Search className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

