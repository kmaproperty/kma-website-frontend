"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { newLaunchPageData, type NewLaunchProject } from "./newLaunchData";
import NewLaunchSectionHeading from "./NewLaunchSectionHeading";

const { projects: projectsData } = newLaunchPageData;
const badgeStyles = {
  new: "bg-gradient-to-r from-cyan-400 to-teal-400 text-[#010048]",
  luxury: "bg-gradient-to-r from-amber-300 to-amber-500 text-[#010048]",
  hot: "bg-gradient-to-r from-red-500 to-rose-400 text-white",
  rera: "bg-teal-400 border border-teal-600/30 text-teal-900",
};

const handleWhatsAppEnquiry = (project: NewLaunchProject) => {
  const phoneNumber = "919289977646";

  const message = `Hello,

I'm interested in the following property:

*Project:* ${project.name}
*Developer:* ${project.developer}
*Location:* ${project.location}
*Starting Price:* ${project.price}

Please share more details.`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};

function ProjectCard({ project }: { project: NewLaunchProject }) {
  const { labels } = projectsData;

  return (
    <article className="flex flex-col h-full rounded-[22px] overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.alt}
          width={800}
          height={230}
          className="w-full h-[230px] object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010048]/80 via-[#010048]/20 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {project.badges.map((badge) => (
            <span
              key={badge.label}
              className={`text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full ${badgeStyles[badge.variant]}`}
            >
              {badge.label}
            </span>
          ))}
        </div>
        <div className="absolute bottom-3 right-3 bg-[#010048]/90 backdrop-blur border border-cyan-400/30 rounded-xl px-3 py-1.5 text-right">
          <span className="text-[9px] uppercase tracking-wider text-white/50 block">
            {labels.starting}
          </span>
          <span className="text-base font-bold text-amber-300">
            {project.price}
          </span>
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        <p className="text-[10px] tracking-[0.18em] uppercase text-blue font-bold mb-1">
          {project.developer}
        </p>
        <h3 className="font-extrabold text-[#010048] mb-2 text-lg">
          {project.name}
        </h3>
        <p className="text-xs text-gray-500 flex items-center gap-1 mb-4">
          <MapPin className="w-3 h-3 text-blue shrink-0" />
          {project.location}
        </p>

        <div
          className={`grid border border-gray-200 rounded-xl overflow-hidden mb-4 ${
            project.meta.length === 4 ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {project.meta.map((item, index) => {
            const cols = project.meta.length === 4 ? 2 : 3;

            return (
              <div
                key={item.key}
                className={`
          px-2 py-3 text-center
          border-gray-200
          ${index % cols !== cols - 1 ? "border-r" : ""}
          ${index < project.meta.length - cols ? "border-b" : ""}
        `}
              >
                <span className="block text-xs font-bold text-[#010048] text-nowrap">
                  {item.val}
                </span>
                <span className="block text-[9px] uppercase tracking-wide text-gray-400 mt-0.5">
                  {item.key}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.amenities.map((am) => (
            <span
              key={am}
              className="text-[10px] px-2 py-0.5 rounded-full border border-gray-200 text-gray-500 capitalize"
            >
              {am}
            </span>
          ))}
        </div>

        <p className="text-[10px] text-gray-400 flex items-center gap-1.5 mt-auto pt-3 border-t border-gray-100">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
          {project.rera}
        </p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => handleWhatsAppEnquiry(project)}
            className="flex-1 py-2.5 rounded-xl bg-[#010048] text-white text-[10px] font-bold tracking-wider uppercase cursor-pointer hover:shadow-lg transition-all"
          >
            {project.wide ? labels.enquireWide : labels.enquire}
          </button>
          <button
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-[10px] font-bold tracking-wider uppercase cursor-pointer hover:border-blue hover:text-blue transition-all"
          >
            {labels.brochure}
          </button>
        </div>
      </div>
    </article>
  );
}

function ProjectsSlider({ items }: { items: NewLaunchProject[] }) {
  const { labels } = projectsData;

  return (
    <div className="relative new-launch-projects-swiper">
      <div className="flex absolute top-[42%] -left-3 lg:-left-5 -right-3 lg:-right-5 -translate-y-1/2 justify-between pointer-events-none z-20">
        <button
          type="button"
          aria-label={labels.prevAria}
          className="new-launch-swiper-prev pointer-events-auto w-11 h-11 rounded-full bg-white border border-[#010048]/15 shadow-[0_4px_20px_rgba(1,0,72,0.12)] flex items-center justify-center text-[#010048] hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label={labels.nextAria}
          className="new-launch-swiper-next pointer-events-auto w-11 h-11 rounded-full bg-white border border-[#010048]/15 shadow-[0_4px_20px_rgba(1,0,72,0.12)] flex items-center justify-center text-[#010048] hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <Swiper
        observer
        observeParents
        observeSlideChildren
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".new-launch-swiper-prev",
          nextEl: ".new-launch-swiper-next",
        }}
        breakpoints={{
          640: { slidesPerView: 2.01, spaceBetween: 20, slidesPerGroup: 2 },
          1024: { slidesPerView: 3.01, spaceBetween: 24, slidesPerGroup: 3 },
        }}
        className="pb-12"
      >
        {items.map((project) => (
          <SwiperSlide key={project.id} className="!h-auto">
            <ProjectCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default function NewLaunchProjects() {
  const { section, zoneFilters, budgetFilters, items, sliderThreshold, labels } = projectsData;
  const [zone, setZone] = useState("all");
  const [budget, setBudget] = useState("all");

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const zoneMatch = zone === "all" || p.zone === zone;
      const budgetMatch = budget === "all" || p.budget === budget;
      return zoneMatch && budgetMatch;
    });
  }, [zone, budget, items]);

  const useSlider = filtered.length > sliderThreshold;

  return (
    <section
      id="newLaunchProjects"
      className="relative w-full bg-white text-[#010048] py-20 px-6 md:px-12 overflow-hidden border-t border-gray-100"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <NewLaunchSectionHeading
          kicker={section.kicker}
          title={section.title}
          titleAccent={section.titleAccent}
          description={section.description}
          theme="white"
          align="center"
          className="mb-12"
        />

        <div className="flex flex-wrap gap-2 justify-center mb-4 p-2 bg-gray-50 border border-gray-200 rounded-md lg:rounded-full w-fit mx-auto">
          {zoneFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setZone(f.id)}
              className={`text-[10px] font-bold tracking-wider uppercase px-4 py-2 rounded-full transition-all cursor-pointer ${
                zone === f.id
                  ? "bg-[#010048] text-white shadow-md"
                  : "text-gray-500 hover:text-blue"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {budgetFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setBudget(f.id)}
              className={`text-[10px] font-bold tracking-wider uppercase px-4 py-2 rounded-full border transition-all cursor-pointer ${
                budget === f.id
                  ? "border-amber-400 text-amber-600 bg-amber-50"
                  : "border-gray-200 text-gray-400 hover:border-amber-300 hover:text-amber-500"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-12 font-medium">
            {labels.noResults}
          </p>
        ) : useSlider ? (
          <ProjectsSlider items={filtered} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .new-launch-projects-swiper .swiper-pagination {
          position: relative;
          bottom: auto;
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
        .new-launch-projects-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          margin: 0 !important;
          background: #01004833;
          opacity: 1;
          border-radius: 9999px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .new-launch-projects-swiper .swiper-pagination-bullet-active {
          width: 28px;
          background: linear-gradient(90deg, #010048, #2563eb);
        }
        .new-launch-projects-swiper .swiper-pagination-bullet:hover {
          background: #01004866;
        }
        .new-launch-projects-swiper .swiper-pagination-bullet-active:hover {
          background: linear-gradient(90deg, #010048, #2563eb);
        }
      `}</style>
    </section>
  );
}
