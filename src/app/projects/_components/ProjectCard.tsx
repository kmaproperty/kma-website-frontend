"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BedDouble,
  Heart,
  Maximize2,
  MessageCircle,
  Sofa,
  Trees,
  Video,
  Images,
  PhoneCall,
} from "lucide-react";
import type { Project } from "../_types";
import { useProjectsStore } from "../_store/useProjectsStore";
import { cx } from "../_utils/format";
import ImageCarousel from "./ImageCarousel";

function FeaturePill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-xs text-text-gray">
      <span className="text-text-gray">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

export default function ProjectCard({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) {
  const favorites = useProjectsStore((s) => s.favorites);
  const toggleFavorite = useProjectsStore((s) => s.toggleFavorite);
  const isFav = Boolean(favorites[project.id]);

  return (
    <div className="rounded-xl border border-border bg-white shadow-sm">
      <div className="grid grid-cols-1 gap-4 p-3 lg:grid-cols-[360px_1fr] lg:gap-5">
        <div className="relative h-[240px] w-full lg:h-[220px]">
          <ImageCarousel
            images={project.images}
            alt={project.title}
            priority={priority}
          />

          <button
            type="button"
            onClick={() => toggleFavorite(project.id)}
            className={cx(
              "absolute right-3 top-3 rounded-full border border-border bg-white/90 p-2 backdrop-blur transition hover:bg-white",
              isFav ? "text-[#E11D48]" : "text-text-gray"
            )}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={cx("h-4 w-4", isFav ? "fill-current" : "")} />
          </button>

          <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-black/55 px-2 py-1 text-xs text-white">
            <span className="inline-flex items-center gap-1">
              <Images className="h-3.5 w-3.5" /> {project.mediaCounts?.photos ?? project.images.length}
            </span>
            <span className="inline-flex items-center gap-1">
              <Video className="h-3.5 w-3.5" /> {project.mediaCounts?.videos ?? 0}
            </span>
          </div>
        </div>

        <div className="min-w-0 p-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-text-black">
                {project.title}
              </h3>
              <p className="mt-1 line-clamp-1 text-sm text-text-gray">
                {project.address}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <div className="text-lg font-semibold text-text-black">
                {project.priceLabel}
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {typeof project.plotAreaSqYd === "number" && (
              <FeaturePill
                icon={<Maximize2 className="h-4 w-4" />}
                label={`${project.plotAreaSqYd} Sq.Yd. (Plot Area)`}
              />
            )}
            {typeof project.bedrooms === "number" && project.bedrooms > 0 && (
              <FeaturePill
                icon={<BedDouble className="h-4 w-4" />}
                label={`${project.bedrooms}bhk`}
              />
            )}
            {project.view && (
              <FeaturePill
                icon={<Trees className="h-4 w-4" />}
                label={project.view}
              />
            )}
            {project.furnishing && (
              <FeaturePill
                icon={<Sofa className="h-4 w-4" />}
                label={project.furnishing === "semi-furnished" ? "Semi-Furnished" : project.furnishing}
              />
            )}
          </div>

          <p className="mt-3 line-clamp-2 text-sm text-text-gray">
            A spacious builder floor in a prime location presents a fantastic
            buying opportunity.
          </p>

          <div className="mt-2 flex items-center justify-between gap-3">
            <Link href={`/projects/${project.id}`} className="text-sm font-medium text-blue underline">
              Read More
            </Link>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919056580022"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#1B8836] bg-white px-4 text-sm font-semibold text-[#1B8836] transition hover:bg-[#E9F7EE]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#1B8836] bg-white px-4 text-sm font-semibold text-[#1B8836] transition hover:bg-[#E9F7EE]"
              >
                <PhoneCall className="h-4 w-4" />
                Get a Call Back
              </button>
            </div>
          </div>

          {project.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-list-background px-4 py-1 text-xs text-text-gray"
                >
                  {t === "prime_location"
                    ? "Prime Location"
                    : t === "reputed_builder"
                      ? "Reputed Builder"
                      : "Safe & Secure Locality"}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-border bg-[#F6F6F6] px-4 py-3">
        <div className="flex items-center gap-3">
          <Image
            src={project.agent?.avatarUrl ?? "/assets/app/call-person.svg"}
            alt={project.agent?.name ?? "Agent"}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-text-black">
              {project.agent?.name ?? "KMA Expert"}
            </div>
            {project.agent?.badge ? (
              <div className="mt-1 inline-flex items-center rounded-md bg-[#D08A2F] px-2 py-0.5 text-[11px] font-semibold text-white">
                {project.agent.badge}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

