"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BusFront,
  BedDouble,
  Building2,
  CarFront,
  ChevronRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Heart,
  Hospital,
  House,
  MapPin,
  PhoneCall,
  School,
  ShieldCheck,
  Star,
  Trees,
  UtensilsCrossed,
  ChevronLeft,
  Share2,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  addEndUserFavoriteAction,
  removeEndUserFavoriteAction,
  getNearbyPlacesAction,
} from "@/api/actions/propertyActions";
import { usePropertyDetails } from "@/api/hooks/usePropertyDetails";
import { useSimilarProperties } from "@/api/hooks/useSimilarProperties";
import { FAVORITE_PROPERTIES_QUERY_KEY } from "@/api/hooks/useFavoriteProperties";
import MainLayout from "@/components/myList/mainLayout";
import { useProjectsStore } from "@/app/projects/_store/useProjectsStore";
import { useRouter } from "nextjs-toploader/app";
import { useSelector } from "react-redux";
import { getPropertyMasterData } from "@/store/homeHeaderSlice";
import { buildProjectsRouteLabels } from "@/app/projects/_utils/routeLabels";
import { useSearchParams } from "next/navigation";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HomeFooter from "@/components/footer/homeFooter";
import ProjectCallBackModal from "@/app/projects/_components/ProjectCallBackModal";
import type { Project } from "@/app/projects/_types";

const placeholderImage = "/assets/property/img-1.png";

const awsBaseUrl = process.env.NEXT_PUBLIC_AWS_URL ?? "";

const toFullAssetUrl = (value?: string | null) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (!awsBaseUrl) return value;
  return `${awsBaseUrl}${value}`;
};

const asString = (value: unknown): string | null => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return null;
};

const asNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string") {
    const n = Number(value.trim());
    return Number.isFinite(n) ? n : null;
  }
  return null;
};

const formatInr = (value: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);



const furnishingIconMap: Record<string, string> = {
  "water purifier": "/assets/water-purifier.png",
  fan: "/assets/fan.png",
  "exhaust fan": "/assets/external-fan.png",
  geyser: "/assets/geyser.png",
  stove: "/assets/stove.png",
  light: "/assets/light.png",
  curtains: "/assets/curtains.png",
  curtain: "/assets/curtains.png",
  "modular kitchen": "/assets/kitchen.png",
  kitchen: "/assets/kitchen.png",
  chimney: "/assets/chimeny.png",
  ac: "/assets/air-conditioner.png",
  "air conditioner": "/assets/air-conditioner.png",
  wardrobe: "/assets/wardrobe.png",
  bed: "/assets/bed.png",
  sofa: "/assets/sofa.png",
  fridge: "/assets/fridge.png",
  refrigerator: "/assets/fridge.png",
  "washing machine": "/assets/washing-machine.png",
  microwave: "/assets/microwave.png",
  "dining table": "/assets/dining.png",
  dining: "/assets/dining.png",
  tv: "/assets/sofa.png",
  chair: "/assets/chair.png",
  "coffee machine": "/assets/coffee_machine.png",
  "printing machine": "/assets/printing-machine.png",
};

const getFurnishingIcon = (itemName: string): string => {
  const lower = itemName.toLowerCase().trim();
  return furnishingIconMap[lower] ?? "/assets/sofa.png";
};

const localityCategories = [
  { key: "schools", label: "Schools", icon: School },
  { key: "busStops", label: "Bus Stops", icon: BusFront },
  { key: "hospitals", label: "Hospitals", icon: Hospital },
  { key: "clinics", label: "Clinics", icon: Building2 },
  { key: "gym", label: "Gym Fitness", icon: Dumbbell },
  { key: "restaurants", label: "Restaurants", icon: UtensilsCrossed },
] as const;

type ListingSectionId =
  | "overview"
  | "furnishing"
  | "locality"
  | "amenities"
  | "channel-partner-details"
  | "ratings-and-reviews";

const listingSectionTabs: Array<{ id: ListingSectionId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "furnishing", label: "Furnishing" },
  { id: "locality", label: "Locality" },
  { id: "amenities", label: "Amenities" },
  { id: "channel-partner-details", label: "Channel Partner Details" },
  { id: "ratings-and-reviews", label: "Ratings and Reviews" },
];

type AmenityListItem = { id: string; name: string };

const normalizeAmenityItems = (value: unknown): AmenityListItem[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item, idx) => {
      if (typeof item === "string") {
        const name = item.trim();
        if (!name) return null;
        return { id: `${name}-${idx}`, name };
      }
      if (typeof item === "object" && item !== null) {
        const rec = item as Record<string, unknown>;
        const rawName =
          typeof rec.name === "string" ? rec.name :
          typeof rec.label === "string" ? rec.label :
          typeof rec.amenityName === "string" ? rec.amenityName :
          typeof rec.value === "string" ? rec.value : "";
        const name = rawName.trim();
        if (!name) return null;
        const rawId = typeof rec.id === "string" && rec.id ? rec.id : `${name}-${idx}`;
        return { id: rawId, name };
      }
      return null;
    })
    .filter((item): item is AmenityListItem => Boolean(item));
};


const formatListedOn = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function ListingDetailsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const params = useParams<{ projectId: string; listingId: string }>();
  const listingId = params?.listingId ?? "";
  const { data: detailsResponse, isPending, isError, error } = usePropertyDetails({
    id: listingId,
  });

  // Check if view limit exceeded (guest user saw 3+ properties)
  const viewLimitExceeded = useMemo(() => {
    if (!error || typeof error !== "object") return false;
    const err = error as { requiresLogin?: boolean; remainingViews?: number };
    return err.requiresLogin === true && err.remainingViews === 0;
  }, [error]);

  const propertyDetails = detailsResponse?.property ?? null;
  const apiChannelPartner = detailsResponse?.channelPartnerDetails;
  const apiOwnerDetails = detailsResponse?.ownerDetails;
  const apiRatings = detailsResponse?.ratingsAndReviews;
  const apiSampleReviews = detailsResponse?.sampleReviews;
  const channelPartnerDetailsHref = apiChannelPartner?.id
    ? `/channel-partner/${apiChannelPartner.id}`
    : "/channel-partner";

  const searchParams = useSearchParams();
  const propertyMasterData = useSelector(getPropertyMasterData) as Array<{
    id?: string;
    code?: string;
    categories?: Array<{
      id?: string;
      code?: string;
      propertyTypes?: Array<{ id?: string; name?: string }>;
    }>;
  }>;

  const similarParams = useMemo(() => {
    const city =
      propertyDetails?.city && typeof propertyDetails.city === "object"
        ? (propertyDetails.city as { id?: string })
        : undefined;
    const locality =
      propertyDetails?.locality && typeof propertyDetails.locality === "object"
        ? (propertyDetails.locality as { cityId?: string })
        : undefined;
    const society =
      propertyDetails?.society && typeof propertyDetails.society === "object"
        ? (propertyDetails.society as { cityId?: string })
        : undefined;
    const cityId =
      city?.id ?? locality?.cityId ?? society?.cityId ?? (propertyDetails as { cityId?: string })?.cityId ?? "";

    const pType =
      propertyDetails?.propertyType && typeof propertyDetails.propertyType === "object"
        ? (propertyDetails.propertyType as { id?: string })
        : undefined;
    const propertyTypeId =
      pType?.id ?? (propertyDetails as { propertyTypeId?: string })?.propertyTypeId ?? undefined;

    return { cityId, propertyTypeId };
  }, [propertyDetails]);

  const { data: similarProperties = [] } = useSimilarProperties({
    cityId: similarParams.cityId || null,
    propertyTypeId: similarParams.propertyTypeId ?? null,
    limit: 10,
    enabled: Boolean(similarParams.cityId),
  });

  const queryClient = useQueryClient();
  const favorites = useProjectsStore((s) => s.favorites);
  const setFavorite = useProjectsStore((s) => s.setFavorite);
  const { mutate: updateSimilarFavorite, isPending: isSimilarFavoriteUpdating } = useMutation({
    mutationFn: async ({
      propertyId,
      nextIsFavorite,
    }: {
      propertyId: string;
      nextIsFavorite: boolean;
    }) =>
      nextIsFavorite
        ? addEndUserFavoriteAction({ propertyId })
        : removeEndUserFavoriteAction({ propertyId }),
    onSuccess: (_data, variables) => {
      setFavorite(variables.propertyId, variables.nextIsFavorite);
      queryClient.invalidateQueries({ queryKey: ["end-user-properties-similar"] });
      queryClient.invalidateQueries({ queryKey: [FAVORITE_PROPERTIES_QUERY_KEY] });
    },
    onError: (_err, variables) => {
      setFavorite(variables.propertyId, !variables.nextIsFavorite);
    },
  });

  const resolvedGalleryImages = useMemo(() => {
    const media = [...(propertyDetails?.photos ?? []), ...(propertyDetails?.images ?? [])];
    const withUrl = media
      .map((item) => toFullAssetUrl(asString(item?.fileKey)))
      .filter((url): url is string => Boolean(url));

    return Array.from(new Set(withUrl));
  }, [propertyDetails]);

  const displayGallery = useMemo(() => {
    return resolvedGalleryImages.slice(0, 5);
  }, [resolvedGalleryImages]);

  const propertyTitle =
    asString(propertyDetails?.propertyName) ??
    asString(propertyDetails?.title) ??
    "Property Details";
  const propertyAddress =
    asString(detailsResponse?.location?.address) ??
    asString(propertyDetails?.address) ??
    "";
  const propertyDescription =
    asString(propertyDetails?.description) ?? "";

  const monthlyRent = asNumber(propertyDetails?.monthlyRent);
  const salePrice = asNumber(propertyDetails?.price);
  const currentPriceLabel =
    monthlyRent && monthlyRent > 0
      ? `Rs ${formatInr(monthlyRent)}`
      : salePrice && salePrice > 0
        ? `Rs ${formatInr(salePrice)}`
        : "Price on request";

  const securityDeposit = asNumber(propertyDetails?.securityDepositAmount);
  const depositLabel =
    securityDeposit && securityDeposit > 0
      ? `Deposit Amount: Rs ${formatInr(securityDeposit)}`
      : "Deposit Amount: Two months";

  const quickFactsData = useMemo(() => {
    const bedrooms = asString(propertyDetails?.bhkTypeName) ?? asString(propertyDetails?.bhkType);
    const furnishing = asString(propertyDetails?.furnishType);
    const bathrooms = asNumber(propertyDetails?.bathRooms) ?? asNumber(propertyDetails?.bathrooms);
    const area = asNumber(propertyDetails?.buildUpAreaSqFt) ?? asNumber(propertyDetails?.builtUpArea);
    const facing = asString(propertyDetails?.facing);
    const floor = asNumber(propertyDetails?.floorNumber);
    const totalFloors = asNumber(propertyDetails?.totalFloorCount) ?? asNumber(propertyDetails?.totalFloors);

    const facts: Array<{ icon: React.ReactNode; label: string }> = [];
    if (bedrooms) facts.push({ icon: <Image src="/assets/app/bed.svg" width={20} height={20} alt="bedrooms" className="h-5 w-5" />, label: bedrooms });
    if (furnishing) facts.push({ icon: <Image src="/assets/app/sofa.svg" width={20} height={20} alt="furnishing" className="h-5 w-5" />, label: furnishing });
    if (bathrooms) facts.push({ icon: <Bath strokeWidth={1.5} className="h-5 w-5" />, label: `${bathrooms} Bathrooms` });
    if (area) facts.push({ icon: <Image src="/assets/app/area.svg" width={20} height={20} alt="area" className="h-5 w-5" />, label: `${formatInr(area)} Sq. Ft (Built-up Area)` });
    if (facing) facts.push({ icon: <Trees strokeWidth={1.5} className="h-5 w-5" />, label: facing });
    if (floor && totalFloors) facts.push({ icon: <Building2 className="h-5 w-5" strokeWidth={1.5} />, label: `${floor}th Floor out of ${totalFloors} Floors` });
    return facts;
  }, [propertyDetails]);

  const propertyInfoData = useMemo(() => {
    const fromApi: Array<[string, string | null]> = [
      ["Listing Type", asString(propertyDetails?.listingTypeName)],
      ["Building Type", asString(propertyDetails?.categoryName)],
      ["Property Type", asString(propertyDetails?.propertyTypeName)],
      ["City", asString(propertyDetails?.cityName) ?? asString(detailsResponse?.location?.city)],
      ["Micro market", asString(propertyDetails?.localityName) ?? asString(detailsResponse?.location?.locality)],
      ["Locality", asString(propertyDetails?.localityName) ?? asString(detailsResponse?.location?.locality)],
      ["Project Name", asString(propertyDetails?.projectName) ?? asString(detailsResponse?.location?.society)],
      [
        "Area",
        asNumber(propertyDetails?.buildUpAreaSqFt)
          ? `${formatInr(Number(propertyDetails?.buildUpAreaSqFt))} Sq.Ft. (Area)`
          : null,
      ],
      ["Facing", asString(propertyDetails?.facing)],
      ["View", asString(propertyDetails?.facing)],
      ["Built in", asString(propertyDetails?.age)],
      ["Age", asString(propertyDetails?.age)],
      ["Additional Rooms", asString(propertyDetails?.additionalRoomsText)],
      ["Total Floor Count", asString(propertyDetails?.totalFloorCount)],
      ["Floor Number", asString(propertyDetails?.floorNumber)],
      ["Block", asString(propertyDetails?.towerOrBlock)],
    ];

    return fromApi.filter(([, value]) => value != null) as Array<[string, string]>;
  }, [propertyDetails]);

  const resolvedReviews = useMemo(() => {
    if (apiSampleReviews && apiSampleReviews.length > 0) {
      return apiSampleReviews.map((r) => ({
        id: r.id,
        name: r.reviewerName || "Anonymous",
        role: r.role === "owner" ? "Owner" : r.role === "tenant" ? "Tenant" : "Resident",
        rating: r.overallRating,
        review: [r.likeText, r.dislikeText].filter(Boolean).join(" ") || "No comment",
        avatar: "/assets/profile.png",
      }));
    }
    return [];
  }, [apiSampleReviews]);

  const reviewsPerPage = 3;
  const totalReviewPages = Math.ceil(resolvedReviews.length / reviewsPerPage);
  const [activeReviewPage, setActiveReviewPage] = useState(0);

  const currentReviews = useMemo(() => {
    const start = activeReviewPage * reviewsPerPage;
    return resolvedReviews.slice(start, start + reviewsPerPage);
  }, [activeReviewPage, resolvedReviews]);

  const goToPrevReviewPage = () => {
    setActiveReviewPage((prev) => (prev === 0 ? totalReviewPages - 1 : prev - 1));
  };

  const goToNextReviewPage = () => {
    setActiveReviewPage((prev) => (prev === totalReviewPages - 1 ? 0 : prev + 1));
  };

  const mobileGalleryRef = useRef<HTMLDivElement | null>(null);
  const [activeMobileImageIndex, setActiveMobileImageIndex] = useState(1);

  const similarCarouselRef = useRef<HTMLDivElement | null>(null);

  const [similarScrollState, setSimilarScrollState] = useState(() => ({
    canScroll: false,
    canPrev: false,
    canNext: false,
  }));

  useEffect(() => {
    const container = similarCarouselRef.current;
    if (!container) return;

    const update = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const canScroll = container.scrollWidth > container.clientWidth + 1;
      const canPrev = canScroll && container.scrollLeft > 1;
      const canNext = canScroll && container.scrollLeft < maxScrollLeft - 1;
      setSimilarScrollState({ canScroll, canPrev, canNext });
    };

    update();

    const onScroll = () => update();
    container.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => update();
    window.addEventListener("resize", onResize);

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => update()) : null;
    ro?.observe(container);

    const raf = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener("resize", onResize);
      container.removeEventListener("scroll", onScroll);
    };
  }, [similarProperties.length]);

  const scrollSimilarProperties = (direction: "prev" | "next") => {
    const container = similarCarouselRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("[data-similar-card]");
    const step = card ? card.offsetWidth + 12 : 332;
    const amount = direction === "next" ? step : -step;

    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    const container = mobileGalleryRef.current;
    if (!container || resolvedGalleryImages.length === 0) {
      setActiveMobileImageIndex(1);
      return;
    }

    const updateActiveIndex = () => {
      const card = container.firstElementChild as HTMLElement | null;
      if (!card) {
        setActiveMobileImageIndex(1);
        return;
      }

      const style = window.getComputedStyle(container);
      const gap = Number.parseFloat(style.columnGap || style.gap || "0") || 0;
      const step = card.offsetWidth + gap;
      const nextIndex = Math.round(container.scrollLeft / Math.max(step, 1)) + 1;
      setActiveMobileImageIndex(Math.min(Math.max(nextIndex, 1), resolvedGalleryImages.length));
    };

    updateActiveIndex();
    container.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      container.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [resolvedGalleryImages.length]);

  const [activeLocalityCategory, setActiveLocalityCategory] = useState<
    (typeof localityCategories)[number]["key"]
  >(localityCategories[0].key);
  const [isPropertyInfoOpen, setIsPropertyInfoOpen] = useState(true);
  const [isLocalityOpen, setIsLocalityOpen] = useState(true);
  const [isChannelPartnerOpen, setIsChannelPartnerOpen] = useState(true);
  const [isFurnishingOpen, setIsFurnishingOpen] = useState(true);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(true);

  const categoryToApiType: Record<string, string> = {
    schools: "school",
    busStops: "bus_stop",
    hospitals: "hospital",
    clinics: "clinic",
    gym: "gym",
    restaurants: "restaurant",
  };

  const lat = detailsResponse?.location?.latitude;
  const lng = detailsResponse?.location?.longitude;

  const [nearbyPlacesCache, setNearbyPlacesCache] = useState<
    Record<string, Array<{ name: string; distance: string; address: string | null }>>
  >({});
  const [nearbyLoading, setNearbyLoading] = useState(false);

  // Sticky tab navigation state + refs
  const [activeSectionTab, setActiveSectionTab] = useState<ListingSectionId>("overview");
  const tabsNavRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<Record<ListingSectionId, HTMLElement | null>>({
    overview: null,
    furnishing: null,
    locality: null,
    amenities: null,
    "channel-partner-details": null,
    "ratings-and-reviews": null,
  });
  const setSectionRef = (sectionId: ListingSectionId) => (element: HTMLElement | null) => {
    sectionRefs.current[sectionId] = element;
  };
  const furnishingsCounts = Array.isArray(propertyDetails?.furnishingsCounts)
    ? (propertyDetails.furnishingsCounts as Array<{ item: string; count: number }>)
    : [];
  const amenitiesList = normalizeAmenityItems(propertyDetails?.amenitiesList);
  const hasFurnishingSection = furnishingsCounts.length > 0;
  const hasAmenitiesSection = amenitiesList.length > 0;
  const availableSectionTabs = useMemo(
    () =>
      listingSectionTabs.filter((tab) => {
        if (tab.id === "furnishing") return hasFurnishingSection;
        if (tab.id === "amenities") return hasAmenitiesSection;
        return true;
      }),
    [hasAmenitiesSection, hasFurnishingSection],
  );
  useEffect(() => {
    if (!availableSectionTabs.some((tab) => tab.id === activeSectionTab)) {
      setActiveSectionTab(availableSectionTabs[0]?.id ?? "overview");
    }
  }, [activeSectionTab, availableSectionTabs]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topVisibleSection = visibleEntries[0]?.target.id as ListingSectionId | undefined;
        if (topVisibleSection) setActiveSectionTab(topVisibleSection);
      },
      { root: null, rootMargin: "-160px 0px -55% 0px", threshold: [0.2, 0.4, 0.6] },
    );
    const sectionsToObserve = availableSectionTabs
      .map((tab) => sectionRefs.current[tab.id])
      .filter((section): section is HTMLElement => Boolean(section));
    sectionsToObserve.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [availableSectionTabs]);
  const scrollToSection = (sectionId: ListingSectionId) => {
    const section = sectionRefs.current[sectionId] ?? document.getElementById(sectionId);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSectionTab(sectionId);
  };
  const routeLabels = useMemo(() => {
    const propertyTypeIds = searchParams.get("propertyTypeIds")?.split(",").filter(Boolean) ?? [];
    const categoryId = searchParams.get("categoryIds")?.split(",").filter(Boolean)[0] ?? null;
    const cityName =
      asString(propertyDetails?.cityName) ??
      asString(detailsResponse?.location?.city) ??
      undefined;
    return buildProjectsRouteLabels({
      cityName,
      listingTypeId: searchParams.get("listingTypeId"),
      categoryId,
      propertyTypeIds,
      propertyMasterData,
    });
  }, [searchParams, propertyDetails?.cityName, detailsResponse?.location?.city, propertyMasterData]);

  useEffect(() => {
    if (!lat || !lng) return;
    const apiType = categoryToApiType[activeLocalityCategory];
    if (!apiType) return;
    if (nearbyPlacesCache[activeLocalityCategory]) return;

    setNearbyLoading(true);
    getNearbyPlacesAction({ latitude: lat, longitude: lng, type: apiType })
      .then((res) => {
        setNearbyPlacesCache((prev) => ({
          ...prev,
          [activeLocalityCategory]: res.places?.map((p) => ({ name: p.name, distance: p.distance, address: p.address ?? null })) ?? [],
        }));
      })
      .catch(() => { })
      .finally(() => setNearbyLoading(false));
  }, [activeLocalityCategory, lat, lng]);

  const activeLocalityPlaces = nearbyPlacesCache[activeLocalityCategory] ?? [];
  const specialistName = asString(apiChannelPartner?.name) ?? "KMA Property";
  const specialistFirm = asString(apiChannelPartner?.firmName) ?? "KMA Expert Pro";
  const specialistImage = toFullAssetUrl(apiChannelPartner?.profileImage) || "/assets/profile.png";
  const specialistPhone = asString(apiChannelPartner?.phone);
  const specialistCleanPhone = specialistPhone?.replace(/\D/g, "") ?? "";
  const specialistNormalizedPhone =
    specialistCleanPhone && specialistCleanPhone.length > 0
      ? specialistCleanPhone.startsWith("91") && specialistCleanPhone.length > 10
        ? specialistCleanPhone
        : `91${specialistCleanPhone}`
      : "";
  const specialistTelHref = specialistNormalizedPhone ? `tel:+${specialistNormalizedPhone}` : undefined;
  const navigatePostProperty = () => {
    router.push("/user-flow?postProperty=true");
  };

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const contactProject = useMemo<Project | null>(() => {
    if (!propertyDetails?.id) return null;
    return {
      id: propertyDetails.id,
      title: asString((propertyDetails as any)?.propertyName) ?? asString((propertyDetails as any)?.title) ?? "",
      address: asString((propertyDetails as any)?.address) ?? "",
      city: asString((propertyDetails as any)?.city) ?? "",
      isFavorite: false,
      postedBy: apiChannelPartner ? "channel_partner" : "owner",
      listingIntent: (propertyDetails as any)?.listingType === "Rent" ? "rent" : "sale",
      priceValue: 0,
      priceLabel: "",
      images: [],
      agent: {
        name: specialistName,
        avatarUrl: specialistImage,
        badge: apiChannelPartner ? "KMA Expert Pro" : undefined,
      },
    };
  }, [propertyDetails, apiChannelPartner, specialistName, specialistImage]);
  const openContactModal = () => setIsContactModalOpen(true);

  // Show login prompt when guest user has exceeded 3 free views
  if (viewLimitExceeded) {
    return (
      <>
        <MainLayout>
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
              <div className="w-16 h-16 bg-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-blue" />
              </div>
              <h2 className="text-2xl font-semibold text-text-black mb-2">
                Login to Continue
              </h2>
              <p className="text-text-gray text-sm mb-6">
                You have viewed 3 free properties. Please login or sign up to continue exploring more properties.
              </p>
              <button
                onClick={() => router.push(`/user-flow?isLogin=true&redirect=/projects/${params?.projectId}/${listingId}`)}
                className="w-full bg-blue text-white py-3 px-6 rounded-full font-medium hover:bg-blue/90 transition cursor-pointer"
              >
                Login / Sign Up
              </button>
              <button
                onClick={() => router.push(`/projects/${params?.projectId ?? ""}`)}
                className="w-full mt-3 text-text-gray py-2 px-6 rounded-full font-medium hover:bg-gray-100 transition cursor-pointer"
              >
                Go Back
              </button>
            </div>
          </div>
        </MainLayout>
        <AboutusDataSync />
        <HomeFooter />
      </>
    );
  }

  return (
    <>
      <MainLayout>

        <div className="w-full min-w-0 pb-0 pt-6 sm:pt-8 md:pb-6 md:pt-10">
          <div className="md:px-0 px-4">
            <div className="mb-2 flex items-start gap-2 md:hidden">
              <button
                type="button"
                onClick={() => router.push(`/projects/${params?.projectId ?? ""}`)}
                aria-label="Go back"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#D8DAE1] bg-white text-[#0A0E67]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <nav className="min-w-0 text-xs font-medium text-text-gray" aria-label="Breadcrumb">
                <p className="truncate">Home / {propertyTitle}</p>
                <p className="truncate pt-0.5 font-semibold text-[#0A0E67] underline underline-offset-2">
                  {propertyTitle}
                </p>
              </nav>
            </div>
            <nav className="hidden text-xs text-white/90 sm:text-sm md:block" aria-label="Breadcrumb">
              <span className="line-clamp-2 break-words">Home / {propertyTitle}</span>
            </nav>
            <h2 className="mb-3 mt-5 text-[20px] font-semibold leading-none text-[#0A0E67] sm:mb-8 sm:text-3xl md:mt-3 md:text-4xl md:text-white">
              Property Details
            </h2>
          </div>
          <div className="mx-auto w-full min-w-0">
            <div className="md:rounded-2xl md:border md:border-border md:bg-white md:shadow-sm md:p-5 lg:p-8">
              <div className="md:px-0 px-4">
              <div className="flex min-w-0 items-start justify-between gap-3 rounded-md bg-[#F2F2F2] p-3 pb-4 md:rounded-none md:bg-transparent md:p-0 md:pb-2">
                <div className="min-w-0 flex-1">
                  {/* <p className="text-xs font-medium text-text-light-gray">
                Home / Projects / {params?.projectId ?? "project"} / {listingId || "property"}
              </p> */}
                  <h1 className="mt-1 break-words font-semibold leading-tight text-text-black 2md:text-[24px] md:text-[20px] sm:text-[18px] text-[16px]">
                    {propertyTitle}
                  </h1>
                  <p className="mt-2.5 flex min-w-0 items-start gap-1 text-sm text-text-gray">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span className="min-w-0 break-words">{propertyAddress}</span>
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-[20px] font-bold leading-none text-blue sm:text-3xl">{currentPriceLabel}</p>
                  <p className="mt-2 text-xs font-semibold text-blue">Deposit Amount:</p>
                  <p className="mt-0.5 text-xs font-medium text-text-gray">
                    {depositLabel.replace("Deposit Amount:", "").trim()}
                  </p>
                </div>
              </div>
              </div>

              {isPending ? (
                <p className="mt-3 text-sm text-text-gray">Loading property details...</p>
              ) : null}
              {isError ? (
                <p className="mt-2 text-sm text-red-600">
                  Unable to fetch latest details. Showing fallback content.
                </p>
              ) : null}

              <section className="mt-4 flex min-w-0 flex-col gap-3 md:flex-row md:gap-3 md:px-0 px-4">
                <div className="mb-1 flex items-center justify-between md:hidden">
                  <h3 className="text-[18px] font-semibold text-text-black">Images</h3>
                  <button
                    type="button"
                    className="cursor-pointer inline-flex items-center gap-2 rounded-[5px] text-sm bg-[#0A0E67] hover:bg-black px-2 py-1.5 font-medium text-white"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    Share
                  </button>
                </div>
                <div
                  ref={mobileGalleryRef}
                  className="flex w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden"
                >
                  {resolvedGalleryImages.map((src, idx) => (
                    <div
                      key={`mobile-gallery-${src}-${idx}`}
                      className="relative h-56 w-[88%] min-w-[88%] overflow-hidden rounded-sm"
                    >
                      <Image
                        src={src}
                        alt={`Property image ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                      {idx === 0 ? (
                        <button
                          type="button"
                          className="absolute right-3 top-3 hidden items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-xs font-medium text-text-black"
                        >
                          <Share2 className="h-3.5 w-3.5" />
                          Share
                        </button>
                      ) : null}
                    </div>
                  ))}
                </div>
                {resolvedGalleryImages.length > 0 ? (
                  <div className="flex items-center gap-3 md:hidden">
                    <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#E4E5E8]">
                      <div
                        className="h-full rounded-full bg-[#05085E] transition-all duration-200"
                        style={{
                          width: `${(Math.min(activeMobileImageIndex, resolvedGalleryImages.length) / resolvedGalleryImages.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#D4D5D8] bg-[#F8F8F9] px-3 py-1 text-sm font-medium leading-none text-text-black">
                      {Math.min(activeMobileImageIndex, resolvedGalleryImages.length)}/{resolvedGalleryImages.length}
                    </span>
                  </div>
                ) : null}

                <div className="relative hidden h-56 w-full min-w-0 overflow-hidden rounded-sm sm:h-72 md:block md:h-[420px] md:w-[58%] lg:h-[480px] lg:w-[60%]">
                  <Image
                    src={displayGallery[0] ?? placeholderImage}
                    alt="Property cover"
                    fill
                    className="object-cover"
                    priority
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-xs font-medium text-text-black"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    Share
                  </button>
                </div>

                <div className="hidden w-full min-h-0 min-w-0 grid-cols-2 grid-rows-2 gap-2 sm:gap-3 md:grid md:h-[420px] md:w-[42%] md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] md:self-stretch lg:h-[480px] lg:w-[40%]">
                  {displayGallery.slice(1).map((src, idx) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] min-h-[96px] w-full min-w-0 overflow-hidden rounded-sm md:aspect-auto md:h-full md:min-h-0"
                    >
                      <Image
                        src={src}
                        alt={`Property image ${idx + 2}`}
                        fill
                        className="object-cover"
                      />
                      {idx === displayGallery.slice(1).length - 1 ? (
                        <Link
                          href={`/projects/${params?.projectId ?? ""}/${listingId || ""}/gallery`}
                          className="absolute inset-0 flex items-center justify-center bg-black/45 text-sm font-semibold text-white"
                        >
                          View all {resolvedGalleryImages.length}+
                        </Link>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>

              <div className="mt-4 md:px-0 px-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible md:pb-0">
                {quickFactsData.map((fact) => (
                  <div
                    key={fact.label}
                    className="inline-flex max-w-full min-w-0 shrink-0 items-center gap-2 rounded-md border border-border bg-background-gray px-2.5 py-2 pr-4 text-[13px] text-text-black md:shrink"
                  >
                    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-md bg-white">{fact.icon}</span>
                    <span className="min-w-0 break-words">{fact.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-sm md:border-b border-border md:bg-background-gray md:p-5">
                <nav
                  ref={tabsNavRef}
                  className="sticky top-0 z-20 -mx-1 overflow-x-auto rounded-md bg-white px-1 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  aria-label="Property sections"
                >
                  <div className="flex w-max min-w-full items-stretch">
                    {availableSectionTabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => scrollToSection(tab.id)}
                        className={`whitespace-nowrap border-b-2 px-3 py-3 text-xs transition sm:px-5 sm:py-4 sm:text-sm ${activeSectionTab === tab.id
                          ? "border-blue bg-white/70 font-semibold text-text-black"
                          : "border-transparent text-text-gray hover:text-text-black"
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </nav>

                <div className="mt-5 grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(260px,310px)]">
                  <main className="min-w-0 space-y-5 [&>section+section]:mt-5 [&>section+section]:border-t [&>section+section]:border-[#D4D5D8] [&>section+section]:pt-5 md:[&>section+section]:mt-0 md:[&>section+section]:border-0 md:[&>section+section]:pt-0">
                    {propertyDescription ? (
                      <section className="rounded-xl">
                        <h2 className="text-xl font-semibold text-text-black">Key highlights</h2>
                        <p className="mt-3 text-sm leading-6 text-text-gray">{propertyDescription}</p>
                      </section>
                    ) : null}

                    <section
                      id="overview"
                      ref={setSectionRef("overview")}
                      className="scroll-mt-32 md:px-0 px-4"
                    >
                      <button
                        type="button"
                        onClick={() => setIsPropertyInfoOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between text-left md:hidden pb-2 relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-[30%] before:bg-[#00000052]"
                        aria-expanded={isPropertyInfoOpen}
                        aria-controls="property-information-content"
                      >
                        <h2 className="text-xl font-semibold text-text-black">
                          Property Information
                        </h2>
                        {isPropertyInfoOpen ? (
                          <ChevronUp className="h-5 w-5 text-text-black" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-text-black" />
                        )}
                      </button>
                      <h2 className="hidden text-xl font-semibold text-text-black md:block">
                        Property Information
                      </h2>
                      <div className="md:bg-transparent bg-background-gray md:p-0 p-2 md:mt-0 mt-3 md:rounded-0 rounded-[10px]">
                      <div
                        id="property-information-content"
                        className={`md:mt-3 md:-mx-3 overflow-x-auto md:px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden ${isPropertyInfoOpen ? "block" : "hidden"}`}
                      >
                        <div className="inline-grid min-w-max grid-cols-4 gap-2">
                          {propertyInfoData.map(([label, value]) => (
                            <div
                              key={label}
                              className="w-[160px] md:bg-transparent bg-white rounded-lg border border-border px-3 py-2"
                            >
                              <p className="text-[12px] text-text-gray">
                                {label}
                              </p>
                              <p className="mt-0.5 text-sm font-medium text-text-black">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      </div>
                      <div className="mt-3 hidden rounded-lg border border-border bg-white p-3 md:grid md:grid-cols-2 md:gap-2 lg:grid-cols-4">
                        {propertyInfoData.map(([label, value]) => (
                          <div
                            key={`${label}-desktop`}
                            className="rounded-lg border border-border px-3 py-2"
                          >
                            <p className="text-[12px] text-text-gray">
                              {label}
                            </p>
                            <p className="mt-0.5 text-sm font-medium text-text-black">{value}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    {Array.isArray(propertyDetails?.furnishingsCounts) && propertyDetails.furnishingsCounts.length > 0 ? (
                      <section
                        id="furnishing"
                        ref={setSectionRef("furnishing")}
                        className="scroll-mt-32 md:mx-0 mx-4"
                      >
                        <button
                          type="button"
                          onClick={() => setIsFurnishingOpen((prev) => !prev)}
                          className="flex w-full items-center justify-between text-left md:hidden pb-2 relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-[30%] before:bg-[#00000052]"
                          aria-expanded={isFurnishingOpen}
                          aria-controls="furnishing-content"
                        >
                          <h2 className="text-xl font-semibold text-text-black">Furnishing Details</h2>
                          {isFurnishingOpen ? (
                            <ChevronUp className="h-5 w-5 text-text-black" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-text-black" />
                          )}
                        </button>
                        <h2 className="hidden text-xl font-semibold text-text-black md:block">Furnishing Details</h2>

                        <div id="furnishing-content" className={isFurnishingOpen ? "mt-4 md:mt-4" : "hidden md:mt-4 md:block"}>
                          <div className="overflow-hidden rounded-lg border border-[#D4D5D8] bg-white md:hidden">
                            <div className="grid grid-cols-2">
                              {propertyDetails.furnishingsCounts.map((f: { item: string; count: number }, idx: number) => (
                                <div
                                  key={`furnishing-mobile-${f.item}-${idx}`}
                                  className="inline-flex items-center gap-3 border-r border-b border-[#D4D5D8] px-4 py-3 leading-none text-text-black even:border-r-0"
                                >
                                  <Image
                                    src={getFurnishingIcon(f.item)}
                                    alt={f.item}
                                    width={24}
                                    height={24}
                                    className="h-6 w-6 shrink-0 object-contain"
                                  />
                                  <span className="text-sm font-medium text-text-black">{f.count} {f.item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="hidden rounded-lg bg-white px-5 py-4 md:grid md:grid-cols-1 md:gap-x-6 md:gap-y-5 lg:grid-cols-4">
                            {propertyDetails.furnishingsCounts.map((f: { item: string; count: number }) => (
                              <div
                                key={`${f.count}-${f.item}`}
                                className="inline-flex items-center gap-3 leading-none text-text-black"
                              >
                                <Image
                                  src={getFurnishingIcon(f.item)}
                                  alt={f.item}
                                  width={24}
                                  height={24}
                                  className="h-6 w-6 object-contain"
                                />
                                <span className="text-sm font-medium text-text-black">{f.count} {f.item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>
                    ) : null}

                    <section
                      id="locality"
                      ref={setSectionRef("locality")}
                      className="scroll-mt-32 mx-4 md:mx-0"
                    >
                      <button
                        type="button"
                        onClick={() => setIsLocalityOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between text-left md:hidden pb-2 relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-[30%] before:bg-[#00000052]"
                        aria-expanded={isLocalityOpen}
                        aria-controls="locality-content"
                      >
                        <h2 className="text-lg font-semibold text-text-black sm:text-xl">Locality</h2>
                        {isLocalityOpen ? (
                          <ChevronUp className="h-5 w-5 text-text-black" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-text-black" />
                        )}
                      </button>
                      <h2 className="hidden text-lg font-semibold text-text-black sm:text-xl md:block">Locality</h2>
                      <div id="locality-content" className={isLocalityOpen ? "block" : "hidden md:block"}>
                        <div className="relative mt-3 h-[200px] overflow-hidden rounded-tl-lg rounded-tr-lg border border-[#D4D5D8] bg-[#ECEEF3] sm:h-[260px] md:h-[300px]">
                          {lat && lng ? (
                            <>
                              <iframe
                                src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                                title="Property location"
                              />
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute left-1/2 top-1/2 inline-flex max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg bg-[#0E1730] px-3 py-2 text-sm font-medium text-white shadow-sm sm:px-5 sm:py-2.5 sm:text-base"
                              >
                                <MapPin className="h-4 w-4 shrink-0" />
                                Check on Map
                              </a>
                            </>
                          ) : (
                            <div className="flex h-full items-center justify-center text-text-gray">
                              <MapPin className="mr-2 h-5 w-5" />
                              Location not available
                            </div>
                          )}
                        </div>

                        <div className="divide-y divide-[#D4D5D8] md:rounded-br-lg md:rounded-bl-lg md:border border-[#D4D5D8] bg-white md::px-5 pb-3 sm:pb-5">
                          <div className="flex gap-1.5 overflow-x-auto md:p-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {localityCategories.map((category) => {
                              const Icon = category.icon;
                              const isActive = activeLocalityCategory === category.key;

                              return (
                                <button
                                  key={category.key}
                                  type="button"
                                  onClick={() => setActiveLocalityCategory(category.key)}
                                  className={`inline-flex shrink-0 items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition ${isActive
                                    ? "border-[#05085E] bg-[#05085E] text-white"
                                    : "border-[#D4D5D8] bg-[#fff] text-text-black hover:bg-white"
                                    }`}
                                >
                                  <Icon className="h-5 w-5" />
                                  {category.label}
                                </button>
                              );
                            })}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2">
                            {nearbyLoading ? (
                              <p className="py-5 text-sm text-text-gray">Loading nearby places...</p>
                            ) : activeLocalityPlaces.length > 0 ? (
                              activeLocalityPlaces.map((place) => {
                                const mapsQuery = encodeURIComponent(
                                  [place.name, place.address].filter(Boolean).join(", "),
                                );
                                const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
                                return (
                                  <a
                                    key={place.name}
                                    href={mapsHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-start justify-between gap-3 md:p-4 py-4 text-sm text-text-black border-b border-[#D9D9D9] cursor-pointer hover:bg-[#F5F6FA]"
                                  >
                                    <div className="inline-flex items-start gap-3 ">
                                    <School className="shrink-0 mt-0.5 h-6 w-6 text-[#05085E]" />
                                    <div>
                                      <p className="font-medium text-text-black">{place.name}</p>
                                      <span className="md:block hidden mt-1 block text-[#888888]">{place.distance}</span>
                                    </div>
                                    </div>
                                    <span className="md:hidden block text-[#888888]">{place.distance}</span>
                                  </a>
                                );
                              })
                            ) : (
                              <p className="py-5 text-sm text-text-gray">No nearby places found.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </section>

                    {Array.isArray(propertyDetails?.amenitiesList) && propertyDetails.amenitiesList.length > 0 ? (
                      <section
                        id="amenities"
                        ref={setSectionRef("amenities")}
                        className="scroll-mt-32 rounded-xl"
                      >
                        <button
                          type="button"
                          onClick={() => setIsAmenitiesOpen((prev) => !prev)}
                          className="flex w-full items-center justify-between text-left md:hidden pb-2 relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-[30%] before:bg-[#00000052]"
                          aria-expanded={isAmenitiesOpen}
                          aria-controls="amenities-content"
                        >
                          <h2 className="text-xl font-semibold text-text-black">Amenities</h2>
                          {isAmenitiesOpen ? (
                            <ChevronUp className="h-5 w-5 text-text-black" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-text-black" />
                          )}
                        </button>
                        <h2 className="hidden text-xl font-semibold text-text-black md:block">Amenities</h2>

                        <div id="amenities-content" className={isAmenitiesOpen ? "mt-4 md:mt-4" : "hidden md:mt-4 md:block"}>
                          <div className="grid grid-cols-2 gap-3 md:hidden">
                            {propertyDetails.amenitiesList.map((name: string) => (
                              <div
                                key={`amenity-mobile-${name}`}
                                className="inline-flex items-center gap-2 rounded-lg border border-[#E2E5EC] bg-white px-3 py-2.5"
                              >
                                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#EDEEF2] text-text-black">
                                  <CheckCircle2 className="h-4.5 w-4.5" />
                                </span>
                                <span className="text-sm font-medium text-text-black">{name}</span>
                              </div>
                            ))}
                          </div>

                          <div className="hidden rounded-lg bg-white p-4 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-6 lg:grid-cols-4">
                            {propertyDetails.amenitiesList.map((name: string) => (
                              <div
                                key={`amenity-desktop-${name}`}
                                className="inline-flex items-center gap-3"
                              >
                                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#E7E7E9] text-text-black">
                                  <CheckCircle2 className="h-5 w-5" />
                                </span>
                                <span className="text-sm font-medium text-text-black">{name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </section>
                    ) : null}

                    <section
                      id="channel-partner-details"
                      ref={setSectionRef("channel-partner-details")}
                      className="scroll-mt-32 md:mx-0 mx-4"
                    >
                      <button
                        type="button"
                        onClick={() => setIsChannelPartnerOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between text-left md:hidden pb-2 relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-[30%] before:bg-[#00000052]"
                        aria-expanded={isChannelPartnerOpen}
                        aria-controls="channel-partner-content"
                      >
                        <h2 className="text-xl font-semibold text-text-black">Channel Partner Details</h2>
                        {isChannelPartnerOpen ? (
                          <ChevronUp className="h-5 w-5 text-text-black" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-text-black" />
                        )}
                      </button>
                      <h2 className="hidden text-xl font-semibold text-text-black md:block">
                        Channel Partner Details
                      </h2>

                      <div id="channel-partner-content" className={isChannelPartnerOpen ? "mt-4 md:mt-4" : "hidden md:mt-4 md:block"}>
                        <div className="rounded-xl bg-white md:p-4 md:hidden">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <Image
                                src={apiChannelPartner?.profileImage || apiOwnerDetails?.profileImage || "/assets/profile.png"}
                                alt="Agent avatar"
                                width={52}
                                height={52}
                                className="h-[52px] w-[52px] shrink-0 rounded-full object-cover"
                              />
                              <div className="min-w-0">
                                <p className="truncate text-[22px] font-semibold leading-none text-text-black">
                                  {apiChannelPartner?.name || apiOwnerDetails?.name || "Property Owner"}
                                </p>
                                {apiChannelPartner && (
                                  <span className="mt-1 inline-block rounded bg-[#E69D48] px-2 py-1 text-[11px] font-medium text-white">
                                    Channel Partner
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 rounded-xl border border-[#D4D5D8] bg-background-gray">
                            <div className="grid grid-cols-2 divide-x divide-[#D4D5D8] border-b border-[#D4D5D8]">
                              {[
                                [apiChannelPartner?.buyersServed != null && apiChannelPartner.buyersServed > 0 ? `${apiChannelPartner.buyersServed}+` : "—", "Buyers Served"],
                                [apiChannelPartner?.yearsOfExperience != null ? String(apiChannelPartner.yearsOfExperience) : "—", "Years of Experience"],
                              ].map(([value, label]) => (
                                <div key={label} className="px-4 py-3">
                                  <p className="text-2xl font-semibold leading-none text-[#05085E]">{value}</p>
                                  <p className="mt-1 text-sm text-text-black">{label}</p>
                                </div>
                              ))}
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-[#D4D5D8]">
                              {[
                                [apiChannelPartner?.propertyHoldings != null ? String(apiChannelPartner.propertyHoldings) : "—", "Property Holdings"],
                                [apiChannelPartner?.areasOfOperation != null && apiChannelPartner.areasOfOperation > 0 ? `${apiChannelPartner.areasOfOperation}+` : "—", "Areas of Operation"],
                              ].map(([value, label]) => (
                                <div key={label} className="px-4 py-3">
                                  <p className="text-2xl font-semibold leading-none text-[#05085E]">{value}</p>
                                  <p className="mt-1 text-sm text-text-black">{label}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-1 gap-3">
                            {[
                              ["Property for Rent", apiChannelPartner?.propertyListings?.rent != null ? String(apiChannelPartner.propertyListings.rent) : "—"],
                              ["Property for Sale", apiChannelPartner?.propertyListings?.sale != null ? String(apiChannelPartner.propertyListings.sale) : "—"],
                            ].map(([label, count]) => (
                              <button
                                key={`${label}-mobile`}
                                type="button"
                                className="inline-flex w-full items-center justify-between rounded-lg border border-[#D1D5DB] bg-background-gray px-3 py-2.5 text-left"
                              >
                                <span className="text-sm font-medium text-text-black">{label}</span>
                                <span className="inline-flex items-center gap-2">
                                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#D1D5DB] text-sm text-text-gray">
                                    {count}
                                  </span>
                                  <ChevronRight className="h-4 w-4 text-text-light-black" />
                                </span>
                              </button>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => router.push(channelPartnerDetailsHref)}
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#05085E] px-4 py-3 text-sm font-semibold text-white"
                          >
                            Learn More
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="hidden rounded-xl bg-white p-4 sm:p-6 md:block">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                              <Image
                                src={apiChannelPartner?.profileImage || apiOwnerDetails?.profileImage || "/assets/profile.png"}
                                alt="Agent avatar"
                                width={52}
                                height={52}
                                className="h-[52px] w-[52px] rounded-full object-cover"
                              />
                              <div>
                                <p className="text-base font-semibold text-text-black">
                                  {apiChannelPartner?.name || apiOwnerDetails?.name || "Property Owner"}
                                </p>
                                {apiChannelPartner && (
                                  <span className="mt-1 inline-block rounded bg-[#E69D48] px-2 py-1 text-[11px] font-medium text-white">
                                    Channel Partner
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
                              <button
                                type="button"
                                onClick={() => router.push(channelPartnerDetailsHref)}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#05085E] px-4 py-2.5 text-sm font-semibold text-white sm:w-auto"
                              >
                                Learn More
                                <ArrowRight className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-4 border-t border-[#D4D5D8] pt-5">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                              {[
                                [apiChannelPartner?.buyersServed != null && apiChannelPartner.buyersServed > 0 ? `${apiChannelPartner.buyersServed}+` : "—", "Buyers Served"],
                                [apiChannelPartner?.yearsOfExperience != null ? String(apiChannelPartner.yearsOfExperience) : "—", "Years of Experience"],
                                [apiChannelPartner?.propertyHoldings != null ? String(apiChannelPartner.propertyHoldings) : "—", "Property Holdings"],
                                [apiChannelPartner?.areasOfOperation != null && apiChannelPartner.areasOfOperation > 0 ? `${apiChannelPartner.areasOfOperation}+` : "—", "Areas of Operation"],
                              ].map(([value, label]) => (
                                <div key={`${label}-desktop`} className="flex min-w-0 items-center gap-3">
                                  <p className="shrink-0 text-2xl font-semibold leading-none text-[#05085E] sm:text-3xl">{value}</p>
                                  <p className="min-w-0 text-sm leading-5 text-text-black">{label}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {[
                              ["Property for Rent", apiChannelPartner?.propertyListings?.rent != null ? String(apiChannelPartner.propertyListings.rent) : "—"],
                              ["Property for Sale", apiChannelPartner?.propertyListings?.sale != null ? String(apiChannelPartner.propertyListings.sale) : "—"],
                            ].map(([label, count]) => (
                              <button
                                key={`${label}-desktop`}
                                type="button"
                                className="inline-flex w-full items-center justify-between rounded-lg border border-[#D1D5DB] px-3 py-2.5 text-left hover:bg-white/60 bg-background-gray"
                              >
                                <span className="text-sm font-medium text-text-black">{label}</span>
                                <span className="inline-flex items-center gap-2">
                                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#D1D5DB] text-sm text-text-gray">
                                    {count}
                                  </span>
                                  <ChevronRight className="h-4 w-4 text-text-light-black" />
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>

                    <section
                      id="ratings-and-reviews"
                      ref={setSectionRef("ratings-and-reviews")}
                      className="scroll-mt-32 !border-0 md:bg-transparent bg-background-gray md:px-0 px-4 md:!py-0 !py-10"
                    >
                      <h2 className="text-lg font-semibold text-text-black">Ratings and Reviews</h2>
                      <div className="mt-4 rounded-xl bg-white p-4 sm:p-6">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
                          <div className="lg:border-r lg:border-[#CFCFD2] lg:pr-5">
                            <div className="grid grid-cols-[128px_1fr] items-start gap-4 lg:block">
                              <div className="flex flex-col items-start lg:items-center">
                                <p className="text-3xl font-semibold leading-none text-text-black">
                                  {apiRatings?.averageOverallRating != null
                                    ? apiRatings.averageOverallRating.toFixed(1)
                                    : "0.0"}
                                  <span className="ml-1 text-sm font-medium text-text-light-gray">/5</span>
                                </p>
                                <div className="mt-3 flex items-center gap-1 text-[#F4B400]">
                                  {Array.from({ length: 5 }).map((_, idx) => (
                                    <Star
                                      key={`star-${idx}`}
                                      className={`h-5 w-5 ${idx < Math.round(apiRatings?.averageOverallRating ?? 0) ? "fill-[#F4B400] text-[#F4B400]" : ""}`}
                                    />
                                  ))}
                                </div>
                                <p className="mt-1 text-xs text-text-gray">({apiRatings?.totalReviews ?? 0} Total Reviews)</p>
                              </div>

                              <div className="mt-0 space-y-1 lg:mt-5">
                                {[5, 4, 3, 2, 1].map((star) => {
                                  const count = apiRatings?.starDistribution?.[String(star)] ?? 0;
                                  const total = apiRatings?.totalReviews ?? 1;
                                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                                  return (
                                    <div key={star} className="flex items-center gap-2">
                                      <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#E2E2E4]">
                                        <div
                                          className="h-full rounded-full bg-[#05085E]"
                                          style={{ width: `${pct}%` }}
                                        />
                                      </div>
                                      <span className="min-w-4 text-right text-[13px] text-text-gray">
                                        {star}
                                      </span>
                                      <Star className="h-3 w-3 fill-[#8D8D91] text-[#8D8D91]" />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-md font-semibold text-text-black">Ratings by features</h3>
                            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 border-b border-[#CFCFD2] pb-4">
                              {[
                                { icon: <CarFront className="h-5 w-5" />, label: "Connectivity", score: apiRatings?.featureRatings?.connectivity },
                                { icon: <MapPin className="h-5 w-5" />, label: "Neighbourhood", score: apiRatings?.featureRatings?.neighbourhood },
                                { icon: <ShieldCheck className="h-5 w-5" />, label: "Safety", score: apiRatings?.featureRatings?.safety },
                                { icon: <Trees className="h-5 w-5" />, label: "Livability", score: apiRatings?.featureRatings?.livability },
                              ].map((feature) => (
                                <div
                                  key={feature.label}
                                  className="inline-flex items-center gap-2"
                                >
                                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#F0BC00] text-[#05085E]">
                                    {feature.icon}
                                  </span>
                                  <div className="min-w-0 leading-none">
                                    <p className="text-[14px] text-gray-600">{feature.label}</p>
                                    <p className="mt-0.5 text-xs font-semibold text-[#05085E]">
                                      {feature.score != null ? `${feature.score}/5` : "—"}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {apiRatings?.likes?.length ? (
                              <div className="border-b border-[#CFCFD2] py-4">
                                <h4 className="text-md font-semibold text-text-black">What&apos;s good</h4>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {apiRatings.likes.map((item: string) => (
                                    <span
                                      key={item}
                                      className="rounded-full bg-[#f5f5f5] px-3 py-1.5 text-xs text-gray-600"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : null}

                            {apiRatings?.dislikes?.length ? (
                              <div className="pt-4">
                                <h4 className="text-sm font-semibold text-text-black">What&apos;s bad</h4>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {apiRatings.dislikes.map((item: string) => (
                                    <span
                                      key={item}
                                      className="rounded-full bg-[#f5f5f5] px-3 py-1.5 text-xs text-gray-600"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="mt-6 hidden border-t border-[#CFCFD2] pt-6 md:block">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="text-lg font-semibold text-text-black sm:text-xl">Reviews</h3>
                            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                              <button
                                type="button"
                                className="w-full rounded-xl border border-blue bg-white px-5 py-2.5 text-sm font-semibold text-blue sm:w-auto"
                              >
                                Add a Review
                              </button>
                              <Link
                                href={`/projects/${params?.projectId ?? ""}/${listingId || ""}/reviews`}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#05085E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0B127A] sm:w-auto"
                              >
                                View All
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </div>
                          </div>

                          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {currentReviews.length === 0 && (
                              <p className="text-sm text-text-gray col-span-full">No reviews yet. Be the first to add one!</p>
                            )}
                            {currentReviews.map((review) => (
                              <article
                                key={review.id}
                                className="rounded-xl border border-border p-4"
                              >
                                <div className="flex items-center gap-3">
                                  <Image
                                    src={review.avatar}
                                    alt={review.name}
                                    width={54}
                                    height={54}
                                    className="h-[50px] w-[50px] rounded-full object-cover"
                                  />
                                  <div>
                                    <p className="text-md font-semibold leading-none text-text-black">
                                      {review.name}
                                    </p>
                                    <p className="mt-1 text-xs text-text-gray">{review.role}</p>
                                  </div>
                                </div>

                                <div className="mt-4 flex items-center gap-1 text-[#F5A524]">
                                  {Array.from({ length: 5 }).map((_, idx) => (
                                    <Star
                                      key={`${review.id}-star-${idx}`}
                                      className="h-5 w-5"
                                      fill={idx < review.rating ? "#F5A524" : "none"}
                                      stroke="#F5A524"
                                      style={{
                                        color: idx < review.rating ? "#F5A524" : "#E5E7EB", // Tailwind slate-200
                                      }}
                                    />
                                  ))}
                                </div>

                                <p className="mt-4 min-h-[78px] text-sm leading-[26px] text-text-gray">
                                  {review.review}
                                </p>

                                <Link
                                  href={`/projects/${params?.projectId ?? ""}/${listingId || ""}/reviews`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-4 inline-block text-xs font-semibold text-[#05085E] underline underline-offset-4"
                                >
                                  Read More
                                </Link>
                              </article>
                            ))}
                          </div>

                          <div className="mt-6 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                            <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                              <p className="shrink-0 text-lg font-semibold leading-none text-[#05085E] sm:text-[22px]">
                                {String(activeReviewPage + 1).padStart(2, "0")}
                                <span className="text-text-gray"> / </span>
                                <span className="text-text-gray">
                                  {String(totalReviewPages).padStart(2, "0")}
                                </span>
                              </p>
                              <div className="h-[3px] min-w-0 flex-1 max-w-[320px] overflow-hidden rounded-full bg-[#D4D5D8]">
                                <div
                                  className="h-full rounded-full bg-[#05085E] transition-all"
                                  style={{
                                    width: `${((activeReviewPage + 1) / Math.max(1, totalReviewPages)) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-3 self-start sm:self-center">
                              <button
                                type="button"
                                aria-label="Previous reviews"
                                onClick={goToPrevReviewPage}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#05085E] text-[#05085E] transition hover:bg-[#F1F3F9]"
                              >
                                <ArrowLeft className="h-5 w-5" />
                              </button>
                              <button
                                type="button"
                                aria-label="Next reviews"
                                onClick={goToNextReviewPage}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#05085E] text-white transition hover:bg-[#0B127A]"
                              >
                                <ArrowRight className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="md:p-4 px-4 !border-0">
                      <h2 className="text-lg font-semibold text-text-black sm:text-xl">
                        Similar properties in your locality
                      </h2>
                      <div className="relative mt-3 min-w-0 px-1 sm:px-0">
                        <div
                          ref={similarCarouselRef}
                          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                          {similarProperties
                            // .filter((item) => item.id !== listingId)
                            .map((item) => {
                              const isFav = favorites[item.id] ?? Boolean(item.isFavorite);
                              const imageSrc = toFullAssetUrl(item.imageUrl) || "/assets/property/img-4.png";
                              const ownerImage = toFullAssetUrl(item.owner?.profileImage) || "/assets/profile.png";
                              const rating = Number.isFinite(item.averageRating) ? item.averageRating : 5;
                              const priceLabel =
                                item.priceType === "rent"
                                  ? `Rs ${formatInr(item.price)}/mo`
                                  : `Rs ${formatInr(item.price)}`;

                              return (
                                <article
                                  key={item.id}
                                  data-similar-card
                                  className="w-[min(18rem,calc(100vw-2.5rem))] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#D4D5D8] bg-white shadow-[0px_2px_8px_rgba(16,24,40,0.06)] sm:w-[300px]"
                                >
                                  <Link
                                    href={`/projects/${params?.projectId ?? ""}/${item.id}`}
                                    className="block"
                                  >
                                    <div className="relative h-[150px]">
                                      <Image
                                        src={imageSrc}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width:640px) 85vw, 300px"
                                      />
                                      <span className="absolute right-3 top-3 rounded-md bg-[#6950F3] px-3 py-1.5 text-xs font-semibold text-white">
                                        {item.propertyType || "Apartment"}
                                      </span>
                                      <div className="absolute -bottom-5 left-4 h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-white">
                                        <Image
                                          src={ownerImage}
                                          alt={item.owner?.name ?? "Agent"}
                                          fill
                                          className="object-cover"
                                          sizes="40px"
                                        />
                                      </div>
                                    </div>
                                  </Link>

                                  <div className="p-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-1 text-[#F4B400]">
                                        {Array.from({ length: 5 }).map((_, idx) => (
                                          <Star
                                            key={`${item.id}-property-star-${idx}`}
                                            className={`h-4 w-4 ${idx < Math.round(rating) ? "fill-[#F4B400] text-[#F4B400]" : "text-[#E5E7EB]"}`}
                                          />
                                        ))}
                                        <span className="ml-1 text-sm text-text-gray">
                                          {rating.toFixed(1)}
                                          {item.totalReviews != null && item.totalReviews > 0 && (
                                            <span className="text-text-gray"> ({item.totalReviews})</span>
                                          )}
                                        </span>
                                      </div>
                                      <button
                                        type="button"
                                        aria-label={isFav ? "Remove from favorites" : "Save"}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          if (isSimilarFavoriteUpdating) return;
                                          setFavorite(item.id, !isFav);
                                          updateSimilarFavorite({
                                            propertyId: item.id,
                                            nextIsFavorite: !isFav,
                                          });
                                        }}
                                        disabled={isSimilarFavoriteUpdating}
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-light-black hover:bg-background-gray disabled:opacity-70"
                                      >
                                        <Heart
                                          className={`h-5 w-5 ${isFav ? "fill-red-500 text-red-500" : ""}`}
                                        />
                                      </button>
                                    </div>

                                    <Link
                                      href={`/projects/${params?.projectId ?? ""}/${item.id}`}
                                      className="block"
                                    >
                                      <h3 className="mt-2 text-lg font-semibold leading-tight text-text-black">
                                        {item.title}
                                      </h3>
                                      <p className="mt-1 flex items-center gap-1 text-sm text-text-gray">
                                        <MapPin className="h-4 w-4 shrink-0" />
                                        {item.address}
                                      </p>
                                      <p className="mt-2 text-xl font-semibold leading-none text-[#05085E]">
                                        {priceLabel}
                                      </p>
                                    </Link>

                                    <div className="mt-4 hidden border-t border-[#D4D5D8] pt-3 md:block">
                                      <p className="text-xs text-text-gray">
                                        Listed on :{" "}
                                        <span className="font-medium text-text-black">
                                          {item.listedOn ? formatListedOn(item.listedOn) : "—"}
                                        </span>
                                      </p>
                                      <p className="mt-1 text-xs text-text-gray">
                                        Possession status:{" "}
                                        <span className="font-medium text-text-black">
                                          {item.possessionStatus || "—"}
                                        </span>
                                      </p>
                                    </div>

                                    <div className="mt-4 hidden border-t border-[#D4D5D8] pt-4 md:block">
                                      <div className="grid grid-cols-3 gap-2 text-xs text-text-black">
                                        <div className="inline-flex items-center gap-2">
                                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#D4D5D8] bg-[#F4F4F5] text-text-gray">
                                            <BedDouble className="h-4 w-4" />
                                          </span>
                                          <span className="text-xs">{item.bedrooms ?? 0} Bed</span>
                                        </div>
                                        <div className="inline-flex items-center gap-2">
                                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#D4D5D8] bg-[#F4F4F5] text-text-gray">
                                            <Bath className="h-4 w-4" />
                                          </span>
                                          <span className="text-xs">{item.bathrooms ?? 0} Bath</span>
                                        </div>
                                        <div className="inline-flex items-center gap-2">
                                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#D4D5D8] bg-[#F4F4F5] text-text-gray">
                                            <House className="h-4 w-4" />
                                          </span>
                                          <span className="text-xs">
                                            {item.area != null ? `${item.area} ${item.areaUnit || "Sq Ft"}` : "—"}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </article>
                              );
                            })}
                        </div>

                        {similarScrollState.canScroll && (
                          <>
                            <button
                              type="button"
                              aria-label="Previous similar property"
                              onClick={() => scrollSimilarProperties("prev")}
                              disabled={!similarScrollState.canPrev}
                              className="absolute left-0 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4D5D8] bg-white text-[#05085E] shadow transition hover:bg-[#F8F9FF] disabled:cursor-not-allowed disabled:opacity-40 sm:-left-3 md:-left-4"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              aria-label="Next similar property"
                              onClick={() => scrollSimilarProperties("next")}
                              disabled={!similarScrollState.canNext}
                              className="absolute right-0 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4D5D8] bg-white text-[#05085E] shadow transition hover:bg-[#F8F9FF] disabled:cursor-not-allowed disabled:opacity-40 sm:-right-3 md:-right-4"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </section>
                  </main>

                  <aside className="hidden h-fit min-w-0 rounded-xl border border-border bg-white p-4 xl:sticky xl:top-4 xl:block">
                    <h3 className="text-xl font-semibold text-text-black">
                      Talk to our real estate specialists
                    </h3>
                    <p className="mt-1 text-sm text-text-gray">
                      Buy - Sell - Invest with expert advice.
                    </p>
                    <div className="mt-4 flex items-center gap-3 rounded-lg py-3">
                      <Image
                        src={specialistImage}
                        alt={specialistName}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-text-black">{specialistName}</p>
                        <p className="text-xs text-black">{specialistFirm}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={openContactModal}
                      disabled={!contactProject}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <PhoneCall className="h-4 w-4" />
                      Contact Now
                    </button>
                  </aside>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed inset-x-3 bottom-3 z-20 rounded-full border border-[#D4D5D8] bg-[#F6F6F7] p-3.5 shadow-[0_2px_8px_rgba(16,24,40,0.10),0_6px_20px_rgba(16,24,40,0.12)] md:hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Image
                  src={specialistImage}
                  alt={specialistName}
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-[20px] font-semibold leading-none text-text-black">{specialistName}</p>
                  <span className="mt-1 inline-block rounded bg-[#D69549] px-2 py-0.5 text-xs font-medium text-white">
                    KMA Expert Pro
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={openContactModal}
                disabled={!contactProject}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#05085E] px-5 py-3 text-sm font-semibold text-white shadow-[0_1px_3px_rgba(16,24,40,0.20)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <PhoneCall className="h-4 w-4" />
                Contact Now
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
      {contactProject ? (
        <ProjectCallBackModal
          open={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          project={contactProject}
        />
      ) : null}
      <AboutusDataSync />
      <HomeFooter />
    </>
  );
}