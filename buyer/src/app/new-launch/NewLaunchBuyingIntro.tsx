import { newLaunchPageData } from "./newLaunchData";

export default function NewLaunchBuyingIntro() {
  const { section } = newLaunchPageData.buyingIntro;

  return (
    <section
      id="newLaunchGuide"
      className="relative w-full bg-white text-[#010048] py-20 md:py-24 px-6 md:px-12 overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,212,255,0.08),transparent_55%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-6 h-[1px] bg-[#010048]" />
          <p className="text-[11px] font-bold tracking-[0.25em] text-[#010048] uppercase">
            {section.kicker}
          </p>
          <div className="w-6 h-[1px] bg-[#010048]" />
        </div>

        <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.2] mb-8">
          {section.title}{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#010048] via-[#0047AB] to-[#00D4FF]">
            {section.titleAccent}
          </span>
          {section.titleSuffix}
        </h2>

        <p className="text-sm md:text-base text-gray-600 font-normal leading-[1.9] max-w-3xl mx-auto">
          {section.description}
        </p>
      </div>
    </section>
  );
}
