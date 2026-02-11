"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BedDouble,
  Heart,
  Leaf,
  Maximize2,
  MessageCircle,
  Shield,
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
    <div className="flex items-center gap-2.5 px-1 py-1 text-sm font-semibold text-text-black">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-text-gray shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
        {icon}
      </span>
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

  const postedBy =
    project.postedBy === "owner"
      ? {
        label: "Owner",
        icon: <Leaf className="h-3.5 w-3.5 text-[#16A34A]" />,
      }
      : {
        label: "Channel Partner",
        icon: <Shield className="h-3.5 w-3.5 text-text-black" />,
      };

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-[#F2F2F2] shadow-sm transition will-change-transform hover:-translate-y-[1px] hover:shadow-md">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[350px_1fr]">
        <div className="relative h-[240px] w-full lg:h-[318px]">
          <ImageCarousel
            images={project.images}
            alt={project.title}
            priority={priority}
          />

          {/* <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-border  px-3 py-1 text-xs font-semibold text-text-black backdrop-blur">
            <span aria-hidden>{postedBy.icon}</span>
            <span>{postedBy.label}</span>
          </div> */}

          <button
            type="button"
            onClick={() => toggleFavorite(project.id)}
            className={cx(
              "absolute right-3 top-3 rounded-full p-2 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/30",
              isFav ? "text-[#E11D48]" : "text-white"
            )}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            // style={{
            //   background: "linear-gradient(180deg, #1894F8 0%, #0B57C7 100%)",
            //   boxShadow: "0 4px 16px 0 rgba(26,110,254,0.18)",
            // }}
          >
            <Heart className={cx("h-6 w-6", isFav ? "fill-current" : "")} stroke="white" />
          </button>

          <div className="absolute bottom-3 right-3 flex items-center gap-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
            <span className="inline-flex items-center gap-1">
              <Images className="h-3.5 w-3.5" />{" "}
              {project.mediaCounts?.photos ?? project.images.length}
            </span>
            <span className="inline-flex items-center gap-1">
              <Video className="h-3.5 w-3.5" /> {project.mediaCounts?.videos ?? 0}
            </span>
          </div>
        </div>

        <div className="min-w-0 px-5 pb-3 pt-4 lg:pr-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="line-clamp-1 text-lg font-semibold text-text-black">
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

          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
            {typeof project.plotAreaSqYd === "number" && (
              <>
                <FeaturePill
                  icon={<Maximize2 className="h-4 w-4" />}
                  label={`${project.plotAreaSqYd} Sq.Yd. (Plot Area)`}
                />
                <span className="hidden h-8 w-px bg-border sm:block" />
              </>
            )}
            {typeof project.bedrooms === "number" && project.bedrooms > 0 && (
              <>
                <FeaturePill
                  icon={<BedDouble className="h-4 w-4" />}
                  label={`${project.bedrooms}Bhk`}
                />
                <span className="hidden h-8 w-px bg-border md:block" />
              </>
            )}
            {project.view && (
              <>
                <FeaturePill
                  icon={<Trees className="h-4 w-4" />}
                  label={project.view}
                />
                <span className="hidden h-8 w-px bg-border lg:block" />
              </>
            )}
            {project.furnishing && (
              <FeaturePill
                icon={<Sofa className="h-4 w-4" />}
                label={
                  project.furnishing === "semi-furnished"
                    ? "Semi-Furnished"
                    : project.furnishing
                }
              />
            )}
          </div>

          <p className="mt-3 line-clamp-2 text-sm text-text-gray">
            A spacious builder floor in a prime location presents a fantastic
            buying opportunity.
          </p>

          <div className="mt-3">
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#E4E4E8] px-4 text-sm font-semibold text-[#262B58] transition hover:bg-[#d9d9df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/30"
            >
              Read More
            </Link>
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

      <div className="flex flex-col gap-3 border-t border-border bg-[#EFEFEF] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
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
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://wa.me/919056580022"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#4CAF50] bg-transparent px-6 text-sm font-semibold text-[#2F9E44] transition hover:bg-[#E9F7EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B8836]/25"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>
          <button
            type="button"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#4CAF50] bg-transparent px-6 text-sm font-semibold text-[#2F9E44] transition hover:bg-[#E9F7EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B8836]/25"
          >
            <PhoneCall className="h-5 w-5" />
            Get a Call Back
          </button>
        </div>
      </div>
    </div>
  );
}

