"use client";

import Image from "next/image";
import { Home, MapPin, Phone } from "lucide-react";
import { newLaunchPageData } from "./newLaunchData";

export default function NewLaunchHero() {
  const { hero } = newLaunchPageData;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#010048] text-white rounded-b-[32px] md:rounded-b-[64px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(114,92,255,0.18),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,198,251,0.10),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20 lg:py-28">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="order-2 lg:order-1 flex flex-col max-w-xl mx-auto lg:mx-0">

            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <span className="new-launch-blink-dot h-2 w-2 rounded-full bg-[#00F5C8]" />

              <span className="text-[11px] tracking-[0.28em] uppercase font-bold text-[#00F5C8]">
                {hero.badge}
              </span>
            </div>

            <h1 className="font-extrabold tracking-tight leading-[1.05] text-center lg:text-left text-[2.2rem] sm:text-[2.8rem] md:text-[3.5rem] lg:text-[4.2rem]">

              <span className="block uppercase tracking-[0.24em] text-white/40 text-[10px] sm:text-xs md:text-sm mb-3">
                {hero.titleLine1}
              </span>

              {hero.titleLine2}

              <span className="block mt-2 font-serif italic font-semibold bg-gradient-to-r from-[#00D4FF] to-[#00F5C8] bg-clip-text text-transparent">
                {hero.titleAccent}
              </span>
            </h1>

            <p className="mt-6 text-center lg:text-left text-sm md:text-base text-white/70 leading-7">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">

              <button
                onClick={() => scrollTo(hero.primaryCta.scrollTo)}
                className="new-launch-btn-primary flex items-center justify-center gap-3 rounded-full px-8 py-4 uppercase tracking-[0.14em] text-[11px] font-semibold transition-all duration-300 hover:-translate-y-1"
              >
                <Home className="w-4 h-4" />

                {hero.primaryCta.label}
              </button>

              <button
                onClick={() => scrollTo(hero.secondaryCta.scrollTo)}
                className="new-launch-btn-ghost flex items-center justify-center gap-3 rounded-full px-8 py-4 uppercase tracking-[0.14em] text-[11px] font-semibold transition-all duration-300 hover:-translate-y-1"
              >
                <Phone className="w-4 h-4" />

                {hero.secondaryCta.label}
              </button>

            </div>
            <div className="mt-10 grid grid-cols-3 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl">

              {hero.stats.map((stat, idx) => (

                <div
                  key={stat.label}
                  className={`px-3 py-5 md:px-5 md:py-6 text-center ${idx !== hero.stats.length - 1
                      ? "border-r border-white/10"
                      : ""
                    }`}
                >

                  <div className="text-[1.55rem] md:text-[2rem] font-serif font-bold bg-gradient-to-br from-[#00D4FF] to-[#00F5C8] bg-clip-text text-transparent">
                    {stat.val}
                  </div>

                  <div className="mt-2 text-[10px] uppercase tracking-[0.12em] text-white/40 leading-4">
                    {stat.label}
                  </div>

                </div>

              ))}

            </div>

          </div>

          <div className="order-2 w-full flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-[24px] border border-cyan-400/30 shadow-[0_20px_60px_rgba(0,212,255,0.08)] group transition-all duration-300 hover:border-cyan-300/60 hover:shadow-[0_0_40px_rgba(103,232,249,0.18)]">

              <Image
                src={hero.featured.image}
                alt={hero.featured.name}
                width={900}
                height={500}
                className="w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[330px] xl:h-[360px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#010048]/95 via-[#010048]/45 to-transparent" />

              <span className="absolute top-4 left-4 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 text-[#010048] text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                {hero.editorsPickLabel}
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">

                <p className="uppercase tracking-[0.18em] text-[10px] text-cyan-400 mb-1">
                  {hero.featured.developer}
                </p>

                <h3 className="font-bold text-xl sm:text-2xl">
                  {hero.featured.name}
                </h3>

                <p className="flex items-center gap-2 mt-2 text-white/70 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  {hero.featured.location}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                  {hero.featured.pills.map((pill) => (

                    <span
                      key={pill}
                      className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-wide text-cyan-300"
                    >
                      {pill}
                    </span>

                  ))}

                </div>

              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {hero.miniCards.map((card) => (

                <div
                  key={card.name}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:shadow-[0_0_35px_rgba(103,232,249,0.18)]"
                >

                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={600}
                    height={300}
                    className="w-full h-[220px] sm:h-[220px] md:h-[230px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#010048]/92 via-[#010048]/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5">

                    <p className="uppercase tracking-[0.15em] text-[9px] text-cyan-400">
                      {card.developer}
                    </p>

                    <h4 className="mt-1 font-bold text-base leading-snug">
                      {card.name}
                    </h4>

                    <p className="mt-1 text-sm font-medium text-amber-300">
                      {card.price}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

      <style jsx global>{`
        @keyframes newLaunchGradShift {
          0%,
          100% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0.25;
          }
        }

        .new-launch-blink-dot {
          animation: blink 2s ease-in-out infinite;
        }

        .new-launch-btn-primary {
          background: linear-gradient(
            135deg,
            #1a3aff,
            #030085,
            #00d4ff
          );
          background-size: 220% 220%;
          animation: newLaunchGradShift 4s ease infinite;
          box-shadow: 0 8px 32px rgba(26, 58, 255, 0.45);
        }

        .new-launch-btn-primary:hover {
          box-shadow: 0 12px 42px rgba(0, 212, 255, 0.35);
        }

        .new-launch-btn-ghost {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.3);
          backdrop-filter: blur(12px);
        }

        .new-launch-btn-ghost:hover {
          background: rgba(0, 212, 255, 0.08);
          border-color: #00d4ff;
          color: #00d4ff;
        }

        @media (max-width: 640px) {
          .new-launch-btn-primary,
          .new-launch-btn-ghost {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}