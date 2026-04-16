"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Heart,
  Trees,
  Video,
  Images,
  PhoneCall,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addEndUserFavoriteAction,
  removeEndUserFavoriteAction,
  submitEndUserPropertyContactAction,
} from "@/api/actions/propertyActions";
import { FAVORITE_PROPERTIES_QUERY_KEY } from "@/api/hooks/useFavoriteProperties";
import Spinner from "@/components/common/spinner";
import { useSessionStore } from "@/store/useSessionStore";
import type { Project } from "../_types";
import { useProjectsStore } from "../_store/useProjectsStore";
import { cx } from "../_utils/format";
import ImageCarousel from "./ImageCarousel";
import ProjectCallBackModal from "./ProjectCallBackModal";
import LoginCard from "@/components/channelParterner/loginCard";
import LoginOtpCard from "@/components/channelParterner/loginOtpCard";

function FeaturePill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 px-1.5 py-1 text-[15px] font-normal text-[#0D1520] xl:px-2 xl:text-sm xl:font-medium">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-[#0D1520] shadow-[0_0_0_1px_rgba(0,0,0,0.05)] xl:h-10 xl:w-10">
        {icon}
      </span>
      <span className="min-w-0 truncate">{label}</span>
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
  const router = useRouter();
  const params = useParams<{ projectId?: string | string[] }>();
  const [isCallBackModalOpen, setIsCallBackModalOpen] = React.useState(false);
  const [isQuickCallBackModalOpen, setIsQuickCallBackModalOpen] = React.useState(false);
  const [isAuthChecking, setIsAuthChecking] = React.useState(false);
  const [isFavoriteAuthChecking, setIsFavoriteAuthChecking] = React.useState(false);
  const searchParams = useSearchParams();
  const [userContact, setUserContact] = React.useState<{
    name: string;
    email: string;
    phone: string;
    countryCode: string;
  }>({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
  });
  const persistedSessionId = useSessionStore((state) => state.sessionId);
  const favorites = useProjectsStore((s) => s.favorites);
  const setFavorite = useProjectsStore((s) => s.setFavorite);
  const favoriteOverride = favorites[project.id];
  const isFav = favoriteOverride ?? Boolean(project.isFavorite);

  const queryClient = useQueryClient();
  const isLoginParam = searchParams.get("isLogin") === "true";
  const isOtpParam = searchParams.get("isOtp") === "true";
  const flowParam = searchParams.get("flow");
  const isFavoriteAuthDialogOpen = isLoginParam || (isOtpParam && flowParam === "login");

  const openFavoriteAuthDialog = () => {
    if (typeof window === "undefined") {
      return;
    }

    const currentSearchParams = new URLSearchParams(window.location.search);
    currentSearchParams.delete("isOtp");
    currentSearchParams.delete("flow");
    currentSearchParams.delete("mobile");
    currentSearchParams.delete("code");
    currentSearchParams.delete("redirect");
    currentSearchParams.set("isLogin", "true");

    const redirectParams = new URLSearchParams(window.location.search);
    redirectParams.delete("isLogin");
    redirectParams.delete("isOtp");
    redirectParams.delete("flow");
    redirectParams.delete("mobile");
    redirectParams.delete("code");
    redirectParams.delete("redirect");
    const redirectSearch = redirectParams.toString();
    const redirect = `${window.location.pathname}${redirectSearch ? `?${redirectSearch}` : ""}`;

    currentSearchParams.set("redirect", redirect);
    router.replace(`${window.location.pathname}?${currentSearchParams.toString()}`);
  };

  const closeFavoriteAuthDialog = () => {
    if (typeof window === "undefined") {
      return;
    }

    const nextParams = new URLSearchParams(window.location.search);
    nextParams.delete("isLogin");
    nextParams.delete("isOtp");
    nextParams.delete("flow");
    nextParams.delete("mobile");
    nextParams.delete("code");
    nextParams.delete("redirect");
    const query = nextParams.toString();
    router.replace(`${window.location.pathname}${query ? `?${query}` : ""}`);
  };

  const { mutate: updateFavorite, isPending: isFavoriteUpdating } = useMutation({
    mutationFn: async ({
      propertyId,
      nextIsFavorite,
    }: {
      propertyId: string;
      nextIsFavorite: boolean;
    }) => {
      if (nextIsFavorite) {
        return addEndUserFavoriteAction({ propertyId });
      }

      return removeEndUserFavoriteAction({ propertyId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FAVORITE_PROPERTIES_QUERY_KEY] });
    },
    onError: (_error, variables) => {
      // Revert optimistic update if API fails.
      setFavorite(variables.propertyId, !variables.nextIsFavorite);
    },
  });

  const handleFavoriteClick = async () => {
    if (isFavoriteUpdating || isFavoriteAuthChecking) {
      return;
    }

    setIsFavoriteAuthChecking(true);
    try {
      const response = await fetch("/api/get-token");
      const data = (await response.json()) as { accessToken?: string | null };
      const isUserLoggedIn = Boolean(data?.accessToken);

      if (!isUserLoggedIn) {
        openFavoriteAuthDialog();
        return;
      }
    } catch {
      openFavoriteAuthDialog();
      return;
    } finally {
      setIsFavoriteAuthChecking(false);
    }

    const nextIsFavorite = !isFav;
    setFavorite(project.id, nextIsFavorite);
    updateFavorite({
      propertyId: project.id,
      nextIsFavorite,
    });
  };

  const { mutate: submitContactRequest, isPending: isSubmittingContactRequest } =
    useMutation({
      mutationFn: submitEndUserPropertyContactAction,
      onSuccess: (response) => {
        toast.success(response?.message ?? "Request submitted successfully");
        setIsQuickCallBackModalOpen(false);
      },
      onError: (error: unknown) => {
        const maybeMessage =
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message?: string | string[] }).message
            : undefined;
        const message = Array.isArray(maybeMessage)
          ? maybeMessage.join(", ")
          : maybeMessage ?? "Unable to submit request";
        toast.error(message);
      },
    });

  const handleCallBackClick = async () => {
    if (typeof window === "undefined") {
      return;
    }

    let nextName = "";
    let nextEmail = "";
    let nextPhone = "";
    let nextCountryCode = "+91";

    try {
      const rawUser = localStorage.getItem("user");
      if (rawUser) {
        const parsed = JSON.parse(rawUser) as {
          name?: string;
          email?: string;
          phone?: string;
          countryCode?: string;
        };
        nextName = parsed?.name ?? "";
        nextEmail = parsed?.email ?? "";
        nextPhone = parsed?.phone ?? "";
        nextCountryCode = parsed?.countryCode ?? "+91";
      }
    } catch {}

    setUserContact({
      name: nextName,
      email: nextEmail,
      phone: nextPhone,
      countryCode: nextCountryCode,
    });

    setIsAuthChecking(true);
    try {
      const response = await fetch("/api/get-token");
      const data = (await response.json()) as { accessToken?: string | null };
      const isUserLoggedIn = Boolean(data?.accessToken);

      if (isUserLoggedIn && nextName.trim() && nextPhone.trim()) {
        setIsQuickCallBackModalOpen(true);
        return;
      }

      setIsCallBackModalOpen(true);
    } catch {
      setIsCallBackModalOpen(true);
    } finally {
      setIsAuthChecking(false);
    }
  };

  const handleQuickContactNow = () => {
    if (!userContact.name.trim() || !userContact.phone.trim()) {
      setIsQuickCallBackModalOpen(false);
      setIsCallBackModalOpen(true);
      return;
    }

    submitContactRequest({
      propertyId: project.id,
      name: userContact.name.trim(),
      email: userContact.email.trim() || undefined,
      phone: userContact.phone.trim(),
      countryCode: userContact.countryCode,
      sessionId: persistedSessionId ?? undefined,
    });
  };

  const projectIdParam = params?.projectId;
  const activeProjectId = Array.isArray(projectIdParam)
    ? projectIdParam[0]
    : projectIdParam;
  const detailsHref = activeProjectId
    ? `/projects/${activeProjectId}/${project.id}`
    : `/projects/${project.id}`;
  const [pricePrimary, priceSuffix] = React.useMemo(() => {
    const raw = project.priceLabel ?? "";
    const slashIndex = raw.indexOf("/");
    if (slashIndex === -1) {
      return [raw, ""];
    }
    return [raw.slice(0, slashIndex).trimEnd(), raw.slice(slashIndex).trimStart()];
  }, [project.priceLabel]);
  const featureItems: Array<{ key: string; icon: React.ReactNode; label: string }> = [];
  if (typeof project.plotAreaSqYd === "number") {
    featureItems.push({
      key: "plot",
      icon: <Image src="/assets/app/area.svg" width={20} height={20} alt="area" className="h-6 w-6" />,
      label: `${project.plotAreaSqYd} Sq.Yd. (Plot Area)`,
    });
  }
  if (typeof project.bedrooms === "number" && project.bedrooms > 0) {
    featureItems.push({
      key: "bed",
      icon: <Image src="/assets/app/bed.svg" width={20} height={20} alt="area" className="h-6 w-6" />,
      label: `${project.bedrooms}Bhk`,
    });
  }
  if (project.view) {
    featureItems.push({
      key: "view",
      icon: <Trees className="h-6 w-6" />,
      label: project.view,
    });
  }
  if (project.furnishing) {
    featureItems.push({
      key: "furnishing",
      icon: <Image src="/assets/app/sofa.svg" width={20} height={20} alt="area" className="h-6 w-6" />,
      label:
        project.furnishing === "semi-furnished"
          ? "Semi-Furnished"
          : project.furnishing,
    });
  }
  const featureRows = featureItems.reduce<Array<Array<{ key: string; icon: React.ReactNode; label: string }>>>(
    (rows, item, index) => {
      if (index % 2 === 0) {
        rows.push([item]);
      } else {
        rows[rows.length - 1].push(item);
      }
      return rows;
    },
    []
  );

  const shouldSkipCardNavigation = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) {
      return false;
    }

    return Boolean(
      target.closest(
        'a,button,input,select,textarea,[role="button"],[data-no-card-nav="true"]'
      )
    );
  };

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldSkipCardNavigation(event.target)) {
      return;
    }

    router.push(detailsHref);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    if (shouldSkipCardNavigation(event.target)) {
      return;
    }

    event.preventDefault();
    router.push(detailsHref);
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-[14px] border border-[#DADCE2] border-b-2 border-b-black bg-[#F5F5F5] transition will-change-transform xl:rounded-lg xl:border-0 xl:shadow-sm xl:hover:-translate-y-[1px] xl:hover:shadow-md"
      role="link"
      tabIndex={0}
      
      onKeyDown={handleCardKeyDown}
      aria-label={`Open details for ${project.title}`}
    >
      <div className="grid grid-cols-1 gap-0 xl:grid-cols-[350px_1fr]">
        <div className="relative h-[240px] w-full lg:h-[300px] xl:h-[318px]">
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
            onClick={handleFavoriteClick}
            disabled={isFavoriteUpdating || isFavoriteAuthChecking}
            className={cx(
              "absolute right-3 top-3 rounded-full bg-[#00000066] p-2 backdrop-blur transition hover:bg-[#00000080] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/30",
              isFav ? "text-[#E11D48]" : "text-white",
              (isFavoriteUpdating || isFavoriteAuthChecking) && "cursor-not-allowed opacity-70"
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

        <div className="min-w-0 px-3.5 pb-3 pt-3.5 lg:pr-4 xl:px-5 xl:pb-3 xl:pt-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="line-clamp-1 text-lg font-medium leading-tight text-[#0D1520] xl:font-semibold">
                {project.title}
              </h3>
              <p className="mt-1 line-clamp-1 text-[15px] text-text-gray xl:mt-0.5 xl:text-sm">
                {project.address}
              </p>
            </div>
          </div>
          <div className="mt-3">
              <div className="text-lg leading-tight text-[#010048]">
                <span>{pricePrimary}</span>
                {priceSuffix ? <span className="ml-1 text-[#888888]">{priceSuffix}</span> : null}
              </div>
            </div>

          <div className="mt-3.5 space-y-1.5 xl:mt-4 xl:space-y-0 xl:flex xl:flex-wrap xl:items-center xl:gap-x-2 xl:gap-y-2">
            <div className="space-y-1.5 xl:hidden">
              {featureRows.map((row, rowIdx) => (
                <div key={`row-${rowIdx}`} className="flex items-center">
                  <div className="min-w-0 flex-1">
                    <FeaturePill icon={row[0].icon} label={row[0].label} />
                  </div>
                  {row[1] ? (
                    <>
                      <span className="mx-1 h-8 w-px bg-border" />
                      <div className="min-w-0 flex-1">
                        <FeaturePill icon={row[1].icon} label={row[1].label} />
                      </div>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="hidden xl:flex xl:flex-wrap xl:items-center xl:gap-x-2 xl:gap-y-2">
              {featureItems.map((item, idx) => (
                <React.Fragment key={item.key}>
                  <FeaturePill icon={item.icon} label={item.label} />
                  {idx < featureItems.length - 1 ? (
                    <span className="h-8 w-px bg-border" />
                  ) : null}
                </React.Fragment>
              ))}
            </div>
          </div>

          <p className="mt-3 line-clamp-2 text-[15px] font-normal text-[#888888] xl:text-sm">
            A spacious builder floor in a prime location presents a fantastic
            buying opportunity.
          </p>

          <div className="mt-3" onClick={handleCardClick}>
            <Link
              href={detailsHref}
              className="inline-flex h-8 items-center justify-center rounded-full bg-[#E4E4E8] px-4 text-sm font-medium text-[#010048] transition hover:bg-[#d9d9df] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/30"
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

      <div className="flex items-center justify-between gap-3 border-t border-border bg-[#f5f5f5] px-3.5 py-3 xl:px-4">
        <div className="flex items-center gap-3">
          <Image
            src={project.agent?.avatarUrl ?? "/assets/app/call-person.svg"}
            alt={project.agent?.name ?? "Agent"}
            width={36}
            height={36}
            className="h-11 w-11 rounded-full object-cover"
          />
          <div className="min-w-0 leading-tight">
            <div className="line-clamp-1 text-[15px] font-medium text-text-black xl:text-sm xl:font-semibold">
              {project.agent?.name ?? "KMA Expert"}
            </div>
            {project.agent?.badge ? (
              <div className="mt-1 gap-1 inline-flex items-center rounded-md bg-[#C75C10] px-2.5 py-1 text-[13px] text-white">
                <Image
                src='/assets/app/shield.svg'
                width={20}
                height={20}
                alt="Shield"
                className="w-4 h-4 "
                />
                {project.agent.badge}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* <a
            href="https://wa.me/919056580022"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#4CAF50] bg-transparent px-6 text-sm font-semibold text-[#2F9E44] transition hover:bg-[#E9F7EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B8836]/25"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a> */}
          <button
            type="button"
            onClick={handleCallBackClick}
            disabled={isAuthChecking}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#4CAF50] bg-white text-[#2F9E44] transition hover:bg-[#E9F7EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B8836]/25 xl:h-12 xl:w-auto xl:gap-2 xl:px-6 xl:text-sm xl:font-semibold"
          >
            <PhoneCall className="h-5 w-5" />
            <span className="hidden xl:inline">{isAuthChecking ? <Spinner size={16} /> : "Get a Call Back"}</span>
          </button>
        </div>
      </div>
      <Dialog
        open={isQuickCallBackModalOpen}
        onClose={() => setIsQuickCallBackModalOpen(false)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "0.75rem",
            },
          },
        }}
      >
        <DialogContent sx={{ padding: 0 }}>
          <div className="w-full rounded-xl bg-[#EFEFEF] p-4 sm:w-[520px]">
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="text-[28px] font-semibold text-[#1E2236]">
                Contact Our Channel Partners
              </h3>
              <button
                type="button"
                onClick={() => setIsQuickCallBackModalOpen(false)}
                className="rounded-full p-1 text-[#1E2236] transition hover:bg-black/5"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mb-3 flex items-center justify-between gap-3 rounded-lg bg-[#E3E3E3] px-3 py-2">
              <div className="flex items-center gap-3">
                <Image
                  src={project.agent?.avatarUrl ?? "/assets/app/call-person.svg"}
                  alt={project.agent?.name ?? "KMA Expert"}
                  width={40}
                  height={40}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-text-black">
                    {project.agent?.name ?? "KMA Expert"}
                  </p>
                  {project.agent?.badge ? (
                    <span className="mt-0.5 inline-flex rounded-md bg-[#D08A2F] px-2 py-1 text-[12px] text-white">
                      {project.agent.badge}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <p className="mb-4 rounded-md bg-white px-3 py-2 text-sm text-[#7A7A7A]">
              Hi {userContact.name || "there"}, would you like to connect with{" "}
              {project.agent?.name ?? "our channel partner"} for {project.title} in{" "}
              {project.address}?
            </p>

            <button
              type="button"
              onClick={handleQuickContactNow}
              disabled={isSubmittingContactRequest}
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#0A0A63] px-6 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmittingContactRequest ? <Spinner size={18} /> : "Contact Now"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <ProjectCallBackModal
        open={isCallBackModalOpen}
        onClose={() => setIsCallBackModalOpen(false)}
        project={project}
      />
      <Dialog
        open={isFavoriteAuthDialogOpen}
        onClose={closeFavoriteAuthDialog}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "0.75rem",
            },
          },
        }}
      >
        <DialogContent sx={{ padding: 0 }}>
          <div className="relative w-full rounded-xl bg-white sm:w-[460px]">
            <button
              type="button"
              onClick={closeFavoriteAuthDialog}
              className="absolute right-4 top-4 z-10 rounded-full p-1 text-[#1E2236] transition hover:bg-black/5"
              aria-label="Close login dialog"
            >
              ✕
            </button>
            {isOtpParam && flowParam === "login" ? <LoginOtpCard /> : <LoginCard />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

