"use client";
import { createURLSearchParam } from "@/lib/helper";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

export default function ContactUs() {
  const router = useRouter();
  const pathname = usePathname();

  const handleRedirectCode = () => {
    const params = createURLSearchParam({
      isContactInformation: true,
    });
    router.push(`${pathname}${params}`);
  };
  return (
    <button
      onClick={handleRedirectCode}
      type="button"
      className="
        fixed z-40 right-4 bottom-6
        md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-0
        group
        bg-[#010048]
        text-white
        rounded-full md:rounded-l-2xl md:rounded-r-none
        border border-white/15
        shadow-[0_10px_28px_rgba(1,0,72,0.28)]
        px-3.5 py-2.5 md:px-2.5 md:py-4
        transition-all duration-300
        hover:bg-[#0B0A63]
        hover:shadow-[0_14px_32px_rgba(1,0,72,0.34)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70
      "
      aria-label="Open contact options"
    >
      <div className="flex items-center gap-2 md:flex-col md:gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 border border-white/20">
          <Image src="/assets/mobile-white.svg" alt="Phone" width={15} height={15} />
        </span>
        <span className="text-xs font-semibold tracking-[0.3px] uppercase md:[writing-mode:vertical-rl] md:[text-orientation:mixed]">
          Contact Us
        </span>
      </div>
    </button>
  );
}
