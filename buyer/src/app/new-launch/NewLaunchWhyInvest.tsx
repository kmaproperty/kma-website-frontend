import Image from "next/image";
import NewLaunchSectionHeading from "./NewLaunchSectionHeading";
import { newLaunchPageData } from "./newLaunchData";

export default function NewLaunchWhyInvest() {
  const { whyInvest } = newLaunchPageData;

  return (
    <section
      id="newLaunchWhyInvest"
      className="relative w-full bg-[#010048] text-white py-20 px-6 md:px-12 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_1.35fr] gap-12 lg:gap-16 relative z-10 items-center">
        <div className="relative hidden lg:flex justify-center">
          <div className="relative w-full max-w-[560px]">
            <div className="absolute -top-10 left-8 w-48 h-48 rounded-full bg-cyan-400/10 blur-[90px]" />
            <div className="absolute -bottom-10 right-6 w-56 h-56 rounded-full bg-indigo-500/10 blur-[110px]" />

            <div className="grid grid-cols-[1.15fr_0.85fr] gap-5 items-stretch">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 shadow-[0_28px_70px_rgba(0,0,0,0.35)]">
                <Image
                  src={whyInvest.visual.mainImage}
                  alt={whyInvest.visual.mainAlt}
                  width={800}
                  height={1000}
                  className="w-full h-full min-h-[560px] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010048]/60 via-transparent to-transparent" />
              </div>

              <div className="flex flex-col gap-5">
                <div className="relative overflow-hidden rounded-[24px] border border-cyan-400/20 bg-[linear-gradient(145deg,#06147a,#020847)] p-7 shadow-[0_20px_50px_rgba(0,212,255,0.15)] flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300/80">
                      {whyInvest.visual.badgeTitle}
                    </p>

                    <h3 className="mt-5 text-5xl font-serif font-bold leading-none bg-gradient-to-br from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                      {whyInvest.visual.badgeValue}
                    </h3>

                    <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-white/55 leading-relaxed">
                      {whyInvest.visual.badgeLabel}
                    </p>
                  </div>

                  <div className="mt-8 h-px bg-gradient-to-r from-cyan-400/40 to-transparent" />

                  <p className="mt-6 text-sm leading-7 text-white/55">
                    {whyInvest.visual.badgeDesc}
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-[24px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                  <Image
                    src={whyInvest.visual.accentImage}
                    alt={whyInvest.visual.accentAlt}
                    width={600}
                    height={480}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#010048]/70 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <NewLaunchSectionHeading
            kicker={whyInvest.section.kicker}
            title={whyInvest.section.title}
            titleAccent={whyInvest.section.titleAccent}
            titleSuffix={whyInvest.section.titleSuffix}
            description={whyInvest.section.description}
            theme="blue"
            align="left"
            className="mb-8"
          />

          <div className="flex flex-col">
            {whyInvest.reasons.map((reason) => (
              <div
                key={reason.num}
                className="relative flex gap-6 py-7 border-b border-white/10 last:border-b-0 group pr-4 hover:pl-4 hover:pr-0 transition-all duration-300 before:absolute before:left-0 before:top-7 before:bottom-7 before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:to-teal-400 before:scale-y-0 before:origin-bottom hover:before:scale-y-100 before:transition-transform"
              >
                <span className="text-4xl font-black text-cyan-400/10 group-hover:text-cyan-400/25 shrink-0 transition-colors">
                  {reason.num}
                </span>
                <div>
                  <span className="inline-block text-[10px] tracking-wider uppercase text-cyan-400 border border-cyan-400/25 px-2 py-0.5 rounded-full bg-cyan-400/10 mb-2">
                    {reason.tag}
                  </span>
                  <h3 className="text-base font-extrabold text-white mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-white/50 font-medium leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
