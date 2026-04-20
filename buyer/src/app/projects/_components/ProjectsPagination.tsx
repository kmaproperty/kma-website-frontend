"use client";

interface ProjectsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getVisiblePages = (currentPage: number, totalPages: number) => {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = Math.max(1, currentPage - 1);
  let end = Math.min(totalPages, start + 2);

  if (end - start < 2) {
    start = Math.max(1, end - 2);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export default function ProjectsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProjectsPaginationProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <nav
      aria-label="Projects pagination"
      className="md:mt-8 mt-5 flex items-center justify-center gap-3"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isPrevDisabled}
        className="inline-flex md:h-12 h-10 md:min-w-[110px] cursor-pointer min-w-20 items-center justify-center rounded-md border border-[#E6E6E6] bg-white px-6 text-base font-medium text-[#888888] transition hover:bg-background-gray disabled:cursor-not-allowed disabled:opacity-60"
      >
        Prev
      </button>

      {visiblePages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex md:h-12 h-10 md:w-12 w-10 cursor-pointer items-center justify-center rounded-md border text-base font-medium transition ${
              isActive
                ? "border-[#010048] bg-[#010048] text-white"
                : "border-[#E6E6E6] bg-white text-[#888888] hover:bg-background-gray"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        className="inline-flex md:h-12 h-10 md:min-w-[110px] min-w-20 cursor-pointer items-center justify-center rounded-md border border-[#E6E6E6] bg-white px-6 text-base font-medium text-[#010048] transition hover:bg-background-gray disabled:cursor-not-allowed disabled:opacity-60"
      >
        Next
      </button>
    </nav>
  );
}
