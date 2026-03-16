"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  Dumbbell,
  Heart,
  Hospital,
  House,
  MapPin,
  MessageCircle,
  PhoneCall,
  School,
  ShieldCheck,
  Sofa,
  Star,
  Trees,
  Tv,
  UtensilsCrossed,
  WavesLadder,
  ChevronLeft,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addEndUserFavoriteAction,
  removeEndUserFavoriteAction,
  getNearbyPlacesAction,
  NearbyPlace,
} from "@/api/actions/propertyActions";
import { usePropertyDetails } from "@/api/hooks/usePropertyDetails";
import { useSimilarProperties } from "@/api/hooks/useSimilarProperties";
import { FAVORITE_PROPERTIES_QUERY_KEY } from "@/api/hooks/useFavoriteProperties";
import MainLayout from "@/components/myList/mainLayout";
import { useProjectsStore } from "@/app/projects/_store/useProjectsStore";

const galleryImages = [
  "/assets/property/img-1.png",
  "/assets/property/img-2.png",
  "/assets/property/img-3.png",
  "/assets/property/img-4.png",
  "/assets/properties_pic_1.png",
];

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

const propertyInformation = [
  ["Listing Type", "Rent"],
  ["Building Type", "Residential"],
  ["Property Type", "Apartment"],
  ["City", "Gurgaon"],
  ["Micro market", "Sohna Road"],
  ["Locality", "Sector 49"],
  ["Project Name", "Orchid Petals"],
  ["Area", "2337 Sq.Ft. (Area)"],
  ["Facing", "North West"],
  ["View", "Park View"],
  ["Built in", "2018"],
  ["Age", "Less than 1 year"],
  ["Additional Rooms", "Servant room, Study"],
  ["Total Floor Count", "28"],
  ["Floor Number", "15"],
  ["Tower/Block", "B"],
];

const furnishingDetails = [
  { label: "1 Water Purifier", icon: "/assets/water-purifier.png" },
  { label: "5 Fan", icon: "/assets/fan.png" },
  { label: "4 Exhaust Fan", icon: "/assets/external-fan.png" },
  { label: "4 Geyser", icon: "/assets/geyser.png" },
  { label: "1 Stove", icon: "/assets/stove.png" },
  { label: "10 Light", icon: "/assets/light.png" },
  { label: "5 Curtains", icon: "/assets/curtains.png" },
  { label: "1 Modular Kitchen", icon: "/assets/kitchen.png" },
  { label: "1 Chimney", icon: "/assets/chimeny.png" },
  { label: "4 AC", icon: "/assets/air-conditioner.png" },
  { label: "4 Wardrobe", icon: "/assets/wardrobe.png" },
];

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

const localityPlacesByCategory: Record<
  (typeof localityCategories)[number]["key"],
  Array<{ name: string; distance: string }>
> = {
  schools: [
    { name: "Disneyland Nursery School", distance: "0.2km" },
    { name: "Green Valley Public School", distance: "0.5km" },
    { name: "Oxford Kids Academy", distance: "0.8km" },
    { name: "Little Learners School", distance: "1.1km" },
  ],
  busStops: [
    { name: "Rapid Bus Stop", distance: "0.4km" },
    { name: "Sector 51 Main Stop", distance: "0.7km" },
    { name: "Orchid Chowk Stop", distance: "1.0km" },
    { name: "Metro Feeder Point", distance: "1.4km" },
  ],
  hospitals: [
    { name: "City Hospital", distance: "0.8km" },
    { name: "Apex Multispeciality", distance: "1.3km" },
    { name: "LifeCare Hospital", distance: "1.8km" },
    { name: "Sunrise Medical Center", distance: "2.1km" },
  ],
  clinics: [
    { name: "Family Care Clinic", distance: "0.3km" },
    { name: "Orchid Dental Care", distance: "0.9km" },
    { name: "Wellness Clinic", distance: "1.2km" },
    { name: "Prime Health Clinic", distance: "1.6km" },
  ],
  gym: [
    { name: "Urban Gym", distance: "1.1km" },
    { name: "PowerHouse Fitness", distance: "1.4km" },
    { name: "Anytime Fitness", distance: "1.9km" },
    { name: "FitNest Studio", distance: "2.2km" },
  ],
  restaurants: [
    { name: "Spice Junction", distance: "0.6km" },
    { name: "Olive Bistro", distance: "0.9km" },
    { name: "The Curry House", distance: "1.5km" },
    { name: "Garden Dine", distance: "1.8km" },
  ],
};

const amenities = [
  { icon: <Dumbbell className="h-5 w-5" />, label: "Gymnasium" },
  { icon: <WavesLadder className="h-5 w-5" />, label: "Swimming Pool" },
  { icon: <Tv className="h-5 w-5" />, label: "Badminton Court(s)" },
  { icon: <Building2 className="h-5 w-5" />, label: "Squash Court" },
  { icon: <CheckCircle2 className="h-5 w-5" />, label: "Kids' Play Areas" },
  { icon: <Trees className="h-5 w-5" />, label: "Jogging / Cycle Track" },
  { icon: <ShieldCheck className="h-5 w-5" />, label: "Power Backup" },
  { icon: <House className="h-5 w-5" />, label: "Central AC" },
  // Duplicates per image
  { icon: <Dumbbell className="h-5 w-5" />, label: "Gymnasium" },
  { icon: <WavesLadder className="h-5 w-5" />, label: "Swimming Pool" },
  { icon: <Tv className="h-5 w-5" />, label: "Badminton Court(s)" },
  { icon: <Building2 className="h-5 w-5" />, label: "Squash Court" },
  { icon: <CheckCircle2 className="h-5 w-5" />, label: "Kids' Play Areas" },
  { icon: <Trees className="h-5 w-5" />, label: "Jogging / Cycle Track" },
  { icon: <ShieldCheck className="h-5 w-5" />, label: "Power Backup" },
  { icon: <House className="h-5 w-5" />, label: "Central AC" },
];

const ratingBreakdown = [
  { stars: 5, width: "55%" },
  { stars: 4, width: "60%" },
  { stars: 3, width: "47%" },
  { stars: 2, width: "47%" },
  { stars: 1, width: "38%" },
];

const featureRatings = [
  { icon: <CarFront className="h-4 w-4" />, label: "Connectivity", score: "4.3/5" },
  { icon: <MapPin className="h-4 w-4" />, label: "Neighbourhood", score: "4.3/5" },
  { icon: <ShieldCheck className="h-4 w-4" />, label: "Safety", score: "4.3/5" },
  { icon: <Trees className="h-4 w-4" />, label: "Livability", score: "4.3/5" },
];

const goodThings = [
  "Spacious & Large Room Sizes",
  "Well-maintained and clean area",
  "Peaceful location",
  "Lots of Green & Open Areas",
];

const badThings = ["Smaller Room Sizes", "Water supply system issues", "Noise pollution in some areas"];

const reviews = [
  {
    id: "r1",
    name: "Meera",
    role: "Teacher from India",
    rating: 5,
    review: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    avatar: "/assets/profile.png",
  },
  {
    id: "r2",
    name: "Rahul",
    role: "Software Engineer from India",
    rating: 5,
    review: "Great society with clean surroundings, good security and smooth connectivity.",
    avatar: "/assets/profile.png",
  },
  {
    id: "r3",
    name: "Aisha",
    role: "Consultant from UAE",
    rating: 4,
    review: "Amenities are impressive and maintenance quality is consistently reliable.",
    avatar: "/assets/profile.png",
  },
  {
    id: "r4",
    name: "Karan",
    role: "Entrepreneur from India",
    rating: 5,
    review: "Spacious layouts, peaceful environment and responsive management team.",
    avatar: "/assets/profile.png",
  },
  {
    id: "r5",
    name: "Naina",
    role: "Designer from India",
    rating: 4,
    review: "Location is convenient and there are enough open areas for families.",
    avatar: "/assets/profile.png",
  },
  {
    id: "r6",
    name: "Vikram",
    role: "Analyst from India",
    rating: 5,
    review: "Well-connected locality with dependable services and modern facilities.",
    avatar: "/assets/profile.png",
  },
  {
    id: "r7",
    name: "Priya",
    role: "Doctor from India",
    rating: 4,
    review: "The neighbourhood feels safe and daily essentials are available nearby.",
    avatar: "/assets/profile.png",
  },
  {
    id: "r8",
    name: "Arjun",
    role: "Architect from India",
    rating: 5,
    review: "Good value for the area with excellent community upkeep and support.",
    avatar: "/assets/profile.png",
  },
  {
    id: "r9",
    name: "Sara",
    role: "Researcher from India",
    rating: 5,
    review: "A balanced mix of comfort, amenities and accessibility for long-term living.",
    avatar: "/assets/profile.png",
  },
];

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
  const params = useParams<{ projectId: string; listingId: string }>();
  const listingId = params?.listingId ?? "";
  const { data: detailsResponse, isPending, isError } = usePropertyDetails({
    id: listingId,
  });
  const propertyDetails = detailsResponse?.property ?? null;
  const apiChannelPartner = detailsResponse?.channelPartnerDetails;
  const apiOwnerDetails = detailsResponse?.ownerDetails;
  const apiRatings = detailsResponse?.ratingsAndReviews;
  const apiSampleReviews = detailsResponse?.sampleReviews;

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

    const uniqueMediaUrls = Array.from(new Set(withUrl));
    return uniqueMediaUrls.length > 0 ? uniqueMediaUrls : galleryImages;
  }, [propertyDetails]);

  const displayGallery = useMemo(() => {
    const nextImages = resolvedGalleryImages.length > 0 ? resolvedGalleryImages : galleryImages;
    return nextImages.slice(0, 5);
  }, [resolvedGalleryImages]);

  const propertyTitle =
    asString(propertyDetails?.propertyName) ??
    asString(propertyDetails?.title) ??
    "Orchid Petals";
  const propertyAddress =
    asString(detailsResponse?.location?.address) ??
    asString(propertyDetails?.address) ??
    "9, S Isbloom 189, 3rd floor, Sector 51, Gurgaon";
  const propertyDescription =
    asString(propertyDetails?.description) ??
    "For sale in Gurgaon's Sector 93, this 2-bedroom, 2-bathroom apartment in Signature Orchard Avenue 2 offers a comfortable living space of 890 square feet.";

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
    const bedrooms = asString(propertyDetails?.bhkTypeName) ?? asString(propertyDetails?.bhkType) ?? "4 Bedrooms";
    const furnishing =
      asString(propertyDetails?.furnishType) ??
      "Semi-furnished";
    const bathrooms =
      asNumber(propertyDetails?.bathRooms) ??
      asNumber(propertyDetails?.bathrooms) ??
      4;
    const area = asNumber(propertyDetails?.buildUpAreaSqFt) ?? asNumber(propertyDetails?.builtUpArea);
    const facing = asString(propertyDetails?.facing) ?? "Park View";
    const floor = asNumber(propertyDetails?.floorNumber);
    const totalFloors = asNumber(propertyDetails?.totalFloorCount) ?? asNumber(propertyDetails?.totalFloors);

    return [
      { icon: <BedDouble className="h-4 w-4" />, label: bedrooms },
      { icon: <Sofa className="h-4 w-4" />, label: furnishing },
      { icon: <Bath className="h-4 w-4" />, label: `${bathrooms} Bathrooms` },
      {
        icon: <House className="h-4 w-4" />,
        label: area ? `${formatInr(area)} Sq. Ft (Built-up Area)` : "2337 Sq. Ft (Built-up Area)",
      },
      { icon: <Trees className="h-4 w-4" />, label: facing },
      {
        icon: <Building2 className="h-4 w-4" />,
        label:
          floor && totalFloors
            ? `${floor}th Floor out of ${totalFloors} Floors`
            : "15th Floor out of 28 Floors",
      },
    ];
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
      ["Tower/Block", asString(propertyDetails?.towerOrBlock)],
    ];

    return propertyInformation.map(([label, fallback]) => {
      const match = fromApi.find(([apiLabel]) => apiLabel === label);
      return [label, match?.[1] ?? fallback] as [string, string];
    });
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
    return reviews;
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

  const similarCarouselRef = useRef<HTMLDivElement | null>(null);

  const scrollSimilarProperties = (direction: "prev" | "next") => {
    const container = similarCarouselRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("[data-similar-card]");
    const step = card ? card.offsetWidth + 12 : 332;
    const amount = direction === "next" ? step : -step;

    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  const [activeLocalityCategory, setActiveLocalityCategory] = useState<
    (typeof localityCategories)[number]["key"]
  >(localityCategories[0].key);

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
    Record<string, Array<{ name: string; distance: string }>>
  >({});
  const [nearbyLoading, setNearbyLoading] = useState(false);

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
          [activeLocalityCategory]: res.places?.map((p) => ({ name: p.name, distance: p.distance })) ?? [],
        }));
      })
      .catch(() => { })
      .finally(() => setNearbyLoading(false));
  }, [activeLocalityCategory, lat, lng]);

  const cachedPlaces = nearbyPlacesCache[activeLocalityCategory];
  const activeLocalityPlaces =
    cachedPlaces && cachedPlaces.length > 0
      ? cachedPlaces
      : localityPlacesByCategory[activeLocalityCategory];

  return (
    <MainLayout>

      <div className="pt-10 pb-6">
        <div className="text-sm text-white absolute top-35 left-62">
          Home / Property for Rent in Gurgaon / Flats for Rent in Gurgaon / Flats for Rent in Sector 49 /  4 Bedroom 2337 Sq.Ft. Apartment in Sector 49 Gurgaon
        </div>
        <div className="text-4xl mb-8 rounded-lg font-semibold text-white">
          Property Details
        </div>
        <div className="mx-auto w-full">
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm lg:p-8">
            <div className="flex flex-col gap-4 pb-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {/* <p className="text-xs font-medium text-text-light-gray">
                Home / Projects / {params?.projectId ?? "project"} / {listingId || "property"}
              </p> */}
                <h1 className="mt-1 text-2xl font-semibold text-text-black">
                  {propertyTitle}
                </h1>
                <p className="mt-2.5 flex items-center gap-1 text-sm text-text-gray">
                  <MapPin className="h-4 w-4" />
                  {propertyAddress}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-3xl font-semibold leading-none text-blue">{currentPriceLabel}</p>
                <p className="mt-2.5 text-xs text-text-gray">{depositLabel}</p>
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

            <section className="mt-4 flex gap-3">
              <div className="relative h-[250px] w-[60%] overflow-hidden rounded-sm sm:h-[480px]">
                <Image
                  src={displayGallery[0]}
                  alt="Property cover"
                  fill
                  className="object-cover"
                  priority
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-text-black"
                >
                  <Heart className="h-3.5 w-3.5" />
                  Share
                </button>
              </div>

              <div className="w-[40%] grid grid-cols-2 gap-3">
                {displayGallery.slice(1).map((src, idx) => (
                  <div
                    key={src}
                    className="relative h-[118px] overflow-hidden rounded-sm sm:h-full"
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
                        View all 20+
                      </Link>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-4 flex flex-wrap gap-2">
              {quickFactsData.map((fact) => (
                <div
                  key={fact.label}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background-gray px-2.5 py-2 text-[13px] text-text-black"
                >
                  <span className="flex w-[30px] h-[30px] justify-center items-center rounded-md bg-white">{fact.icon}</span>
                  <span>{fact.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 border-b border-border bg-background-gray rounded-sm p-5">
              <nav className=" overflow-x-auto rounded-md bg-white text-sm">
                <div className="flex w-max min-w-full items-center">
                  {[
                    "Overview",
                    "Furnishing",
                    "Locality",
                    "Amenities",
                    "Channel Partner Details",
                    "Ratings and Reviews",
                  ].map((item, idx) => (
                    <button
                      key={item}
                      type="button"
                      className={`whitespace-nowrap border-b-2 px-6 py-4 transition ${idx === 0
                        ? "border-blue bg-white/70 text-text-black font-semibold"
                        : "border-transparent text-text-gray hover:text-text-black"
                        }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </nav>

              <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_310px]">
                <main className="space-y-5">
                  <section className="rounded-xl">
                    <h2 className="text-xl font-semibold text-text-black">Key highlights</h2>
                    <p className="mt-3 text-sm leading-6 text-text-gray">
                      {propertyDescription}
                    </p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text-gray">
                      <li>
                        Located on the 9th floor in a 14-storey building with one
                        dedicated parking spot.
                      </li>
                      <li>
                        Includes gymnasium, badminton court, tennis court, kids&apos; play
                        area, jogging and cycle track, power backup and clubhouse.
                      </li>
                      <li>
                        Less than one year old property with excellent finish quality and
                        a practical family-focused layout.
                      </li>
                    </ul>
                  </section>

                  <section className="rounded-xl">
                    <h2 className="text-xl font-semibold text-text-black">
                      Property Information
                    </h2>
                    <div className="mt-3 rounded-lg border border-border bg-white p-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                      {propertyInfoData.map(([label, value]) => (
                        <div
                          key={label}
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

                  <section className="rounded-xl">
                    <h2 className="text-xl font-semibold text-text-black">Furnishing Details</h2>
                    <div className="mt-4 rounded-lg bg-white px-5 py-4 grid grid-cols-1  gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                      {(Array.isArray(propertyDetails?.furnishingsCounts) && propertyDetails.furnishingsCounts.length > 0
                        ? propertyDetails.furnishingsCounts.map((f: { item: string; count: number }) => ({
                          label: `${f.count} ${f.item}`,
                          icon: getFurnishingIcon(f.item),
                        }))
                        : furnishingDetails
                      ).map((item: { label: string; icon: string }) => (
                        <div
                          key={item.label}
                          className="inline-flex items-center gap-3 leading-none text-text-black"
                        >
                          <Image
                            src={item.icon}
                            alt={item.label}
                            width={24}
                            height={24}
                            className="h-6 w-6 object-contain"
                          />
                          <span className="text-sm font-medium text-text-black">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-xl p-4">
                    <h2 className="text-xl font-semibold text-text-black">Locality</h2>
                    <div className="mt-3 relative h-[300px] overflow-hidden rounded-tr-lg border border-[#D4D5D8] rounded-tl-lg bg-[#ECEEF3]">
                      <Image
                        src="/assets/city/city1.svg"
                        alt="Locality map"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg bg-[#0E1730] px-5 py-2.5 text-base font-medium text-white shadow-sm"
                      >
                        <MapPin className="h-4 w-4" />
                        Check on Map
                      </button>
                    </div>

                    <div className=" divide-y divide-[#D4D5D8] rounded-br-lg rounded-bl-lg border border-[#D4D5D8] bg-white px-5">
                      <div className="py-3 flex gap-1.5 overflow-x-auto[scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                      {activeLocalityPlaces.map((place) => (
                        <div
                          key={place.name}
                          className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-2 sm:gap-6"
                        >
                          <div className="inline-flex items-start gap-3 text-sm text-text-black">
                            <School className="mt-0.5 h-6 w-6 text-[#05085E]" />
                            <div>
                              <p className="font-medium text-text-black">{place.name}</p>
                              <span className="mt-1 block text-[#888888]">{place.distance}</span>
                            </div>
                          </div>
                          <div className="inline-flex items-start gap-3 text-sm text-text-black">
                            <School className="mt-0.5 h-6 w-6 text-[#05085E]" />
                            <div>
                              <p className="font-medium text-text-black">{place.name}</p>
                              <span className="mt-1 block text-[#888888]">{place.distance}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-xl">
                    <h2 className="text-xl font-semibold text-text-black">Amenities</h2>
                    <div className="mt-4 rounded-lg bg-white p-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                      {(Array.isArray(propertyDetails?.amenitiesList) && propertyDetails.amenitiesList.length > 0
                        ? propertyDetails.amenitiesList.map((name: string) => ({
                          icon: <CheckCircle2 className="h-5 w-5" />,
                          label: name,
                        }))
                        : amenities
                      ).map((amenity: { icon: React.ReactNode; label: string }) => (
                        <div
                          key={amenity.label}
                          className="inline-flex items-center gap-3"
                        >
                          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#E7E7E9] text-text-black">
                            {amenity.icon}
                          </span>
                          <span className="text-sm font-medium text-text-black">{amenity.label}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-xl">
                    <h2 className="text-xl font-semibold text-text-black">
                      Channel Partner Details
                    </h2>
                    <div className="mt-4 rounded-xl bg-white p-4 sm:p-6">
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
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-xl border border-blue bg-white px-4 py-2.5 text-sm font-semibold text-blue"
                          >
                            <PhoneCall className="h-4 w-4" />
                            View Number
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-xl bg-[#05085E] px-4 py-2.5 text-sm font-semibold text-white"
                          >
                            Learn More
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 border-t border-[#D4D5D8] pt-5">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                          {[
                            [apiChannelPartner?.buyersServed != null && apiChannelPartner.buyersServed > 0 ? `${apiChannelPartner.buyersServed}+` : "500+", "Buyers Served"],
                            [apiChannelPartner?.yearsOfExperience != null ? String(apiChannelPartner.yearsOfExperience) : "21", "Years of Experience"],
                            [apiChannelPartner?.propertyHoldings != null ? String(apiChannelPartner.propertyHoldings) : "44", "Property Holdings"],
                            [apiChannelPartner?.areasOfOperation != null && apiChannelPartner.areasOfOperation > 0 ? `${apiChannelPartner.areasOfOperation}+` : "20+", "Areas of Operation"],
                          ].map(([value, label]) => (
                            <div key={label} className="flex items-center  gap-3">
                              <p className="text-3xl leading-none font-semibold text-[#05085E]">{value}</p>
                              <p className="max-w-[110px] text-sm leading-5 text-text-black">{label}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {[
                          ["Property for Rent", apiChannelPartner?.propertyListings?.rent != null ? String(apiChannelPartner.propertyListings.rent) : "21"],
                          ["Property for Sale", apiChannelPartner?.propertyListings?.sale != null ? String(apiChannelPartner.propertyListings.sale) : "21"],
                        ].map(([label, count]) => (
                          <button
                            key={label}
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
                  </section>

                  <section className="">
                    <h2 className="text-lg font-semibold text-text-black">Ratings and Reviews</h2>
                    <div className="mt-4 rounded-xl bg-white p-4 sm:p-6">
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
                        <div className="lg:border-r lg:border-[#CFCFD2] lg:pr-6  ">

                          <div className="flex flex-col items-center">
                            <p className="text-3xl font-semibold leading-none text-text-black">
                              {apiRatings?.averageOverallRating?.toFixed(1) ?? "4.2"}
                              <span className="ml-1 text-sm font-medium text-text-light-gray">/5</span>
                            </p>
                            <div className="mt-3 flex items-center gap-1 text-[#F4B400]">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <Star
                                  key={`star-${idx}`}
                                  className={`h-5 w-5 ${idx < Math.round(apiRatings?.averageOverallRating ?? 4) ? "fill-[#F4B400] text-[#F4B400]" : ""}`}
                                />
                              ))}
                            </div>
                            <p className="mt-1 text-xs text-text-gray">({apiRatings?.totalReviews ?? 0} Total Reviews)</p>
                          </div>

                          <div className="mt-5 space-y-1">
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
                                  <span className="min-w-10 text-right text-xs text-text-gray">
                                    {star}
                                  </span>
                                  <Star className="h-3.5 w-3.5 fill-[#8D8D91] text-[#8D8D91]" />
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-md font-semibold text-text-black">Ratings by features</h3>
                          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 border-b border-[#CFCFD2] pb-4">
                            {[
                              { icon: <CarFront className="h-4 w-4" />, label: "Connectivity", score: apiRatings?.featureRatings?.connectivity },
                              { icon: <MapPin className="h-4 w-4" />, label: "Neighbourhood", score: apiRatings?.featureRatings?.neighbourhood },
                              { icon: <ShieldCheck className="h-4 w-4" />, label: "Safety", score: apiRatings?.featureRatings?.safety },
                              { icon: <Trees className="h-4 w-4" />, label: "Livability", score: apiRatings?.featureRatings?.livability },
                            ].map((feature) => (
                              <div
                                key={feature.label}
                                className="inline-flex items-center gap-1"
                              >
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#F0BC00] text-[#05085E]">
                                  {feature.icon}
                                </span>
                                <div className="min-w-0 leading-none">
                                  <p className="text-xs text-text-black">{feature.label}</p>
                                  <p className="mt-1 text-xs font-semibold text-[#05085E]">
                                    {feature.score != null ? `${feature.score}/5` : "—"}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="border-b border-[#CFCFD2] py-4">
                            <h4 className="text-md font-semibold text-text-black">What&apos;s good</h4>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {(apiRatings?.likes?.length ? apiRatings.likes : goodThings).map((item) => (
                                <span
                                  key={item}
                                  className="rounded-full bg-[#E7E7E9] px-3 py-1.5 text-xs text-text-black"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4">
                            <h4 className="text-sm font-semibold text-text-black">What&apos;s bad</h4>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {(apiRatings?.dislikes?.length ? apiRatings.dislikes : badThings).map((item) => (
                                <span
                                  key={item}
                                  className="rounded-full bg-[#E7E7E9] px-3 py-1.5 text-xs text-text-black"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-[#CFCFD2] pt-6">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <h3 className="text-xl font-semibold text-text-black">Reviews</h3>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              className="rounded-xl border border-blue bg-white px-5 py-2.5 text-sm font-semibold text-blue"
                            >
                              Add a Review
                            </button>
                            <Link
                              href={`/projects/${params?.projectId ?? ""}/${listingId || ""}/reviews`}
                              className="inline-flex items-center gap-2 rounded-xl bg-[#05085E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0B127A]"
                            >
                              View All
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                          {currentReviews.map((review) => (
                            <article
                              key={review.id}
                              className="rounded-xl border border-border bg-[#F8F8F9] p-4"
                            >
                              <div className="flex items-start gap-3">
                                <Image
                                  src={review.avatar}
                                  alt={review.name}
                                  width={46}
                                  height={46}
                                  className="h-[46px] w-[46px] rounded-full object-cover"
                                />
                                <div>
                                  <p className="text-sm font-semibold leading-none text-text-black">
                                    {review.name}
                                  </p>
                                  <p className="mt-1 text-xs text-text-gray">{review.role}</p>
                                </div>
                              </div>

                              <div className="mt-4 flex items-center gap-1 text-[#F5A524]">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                  <Star
                                    key={`${review.id}-star-${idx}`}
                                    className="h-5 w-5 fill-[#F5A524] text-[#F5A524]"
                                  />
                                ))}
                              </div>

                              <p className="mt-4 min-h-[78px] text-sm leading-[36px] text-text-gray">
                                {review.review}
                              </p>

                              <button
                                type="button"
                                className="mt-4 text-xs font-semibold text-[#05085E] underline underline-offset-4"
                              >
                                Read More
                              </button>
                            </article>
                          ))}
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-4">
                            <p className="text-[22px] font-semibold leading-none text-[#05085E]">
                              {String(activeReviewPage + 1).padStart(2, "0")}
                              <span className="text-text-gray"> / </span>
                              <span className="text-text-gray">
                                {String(totalReviewPages).padStart(2, "0")}
                              </span>
                            </p>
                            <div className="h-[3px] w-[220px] overflow-hidden rounded-full bg-[#D4D5D8] sm:w-[320px]">
                              <div
                                className="h-full rounded-full bg-[#05085E] transition-all"
                                style={{
                                  width: `${((activeReviewPage + 1) / totalReviewPages) * 100}%`,
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
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

                  <section className="rounded-xl p-4">
                    <h2 className="text-xl font-semibold text-text-black">
                      Similar properties in your locality
                    </h2>
                    <div className="relative mt-3">
                      <div
                        ref={similarCarouselRef}
                        className="flex gap-3 overflow-x-auto pb-1 pr-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                                className="w-[300px] shrink-0 overflow-hidden rounded-2xl border border-[#D4D5D8] bg-white shadow-[0px_2px_8px_rgba(16,24,40,0.06)]"
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
                                      sizes="300px"
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

                                  <div className="mt-4 border-t border-[#D4D5D8] pt-3">
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

                                  <div className="mt-4 border-t border-[#D4D5D8] pt-4">
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

                      <button
                        type="button"
                        aria-label="Previous similar property"
                        onClick={() => scrollSimilarProperties("prev")}
                        className="absolute left-[-15px] top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4D5D8] bg-white text-[#05085E] shadow transition hover:bg-[#F8F9FF]"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Next similar property"
                        onClick={() => scrollSimilarProperties("next")}
                        className="absolute right-[-15px] top-1/2 z-8 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4D5D8] bg-white text-[#05085E] shadow transition hover:bg-[#F8F9FF]"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </section>
                </main>

                <aside className="h-fit rounded-xl border bg-white border-border p-4 xl:sticky xl:top-4">
                  <h3 className="text-xl font-semibold text-text-black">
                    Talk to our real estate specialists
                  </h3>
                  <p className="mt-1 text-sm text-text-gray">
                    Buy - Sell - Invest with expert advice.
                  </p>
                  {(() => {
                    const cp = apiChannelPartner;
                    const specialistName = asString(cp?.name) ?? "Manjeet Skyzen";
                    const specialistFirm = asString(cp?.firmName) ?? "KMA Real Partner";
                    const specialistImage = toFullAssetUrl(cp?.profileImage) || "/assets/profile.png";
                    const phone = asString(cp?.phone);
                    const whatsappHref = phone
                      ? `https://wa.me/91${phone.replace(/\D/g, "")}`
                      : "https://wa.me/919056580022";
                    const telHref = phone ? `tel:+91${phone.replace(/\D/g, "")}` : undefined;
                    return (
                      <>
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
                        {telHref ? (
                          <a
                            href={telHref}
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue px-4 py-3 text-sm font-semibold text-white"
                          >
                            <PhoneCall className="h-4 w-4" />
                            Contact Now
                          </a>
                        ) : (
                          <button
                            type="button"
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue px-4 py-3 text-sm font-semibold text-white"
                          >
                            <PhoneCall className="h-4 w-4" />
                            Contact Now
                          </button>
                        )}
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#1B8836] px-4 py-3 text-sm font-semibold text-[#1B8836]"
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp Expert
                        </a>
                      </>
                    );
                  })()}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
