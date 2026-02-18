"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CarFront,
  ChevronRight,
  CheckCircle2,
  Dumbbell,
  Heart,
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
  WavesLadder,
} from "lucide-react";
import { usePropertyDetails } from "@/api/hooks/usePropertyDetails";
import MainLayout from "@/components/signUp/mainLayout";

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

const nearbyPlaces = [
  { icon: <School className="h-4 w-4" />, name: "Disneyland Nursery School", time: "0.2 km" },
  { icon: <CarFront className="h-4 w-4" />, name: "Rapid Bus Stop", time: "0.4 km" },
  { icon: <ShieldCheck className="h-4 w-4" />, name: "City Hospital", time: "0.8 km" },
  { icon: <Dumbbell className="h-4 w-4" />, name: "Urban Gym", time: "1.1 km" },
];

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

const similarProperties = [
  {
    id: "sp1",
    image: "/assets/property/img-4.png",
    title: "Royal Apartment",
    address: "25, Ville Cresent Apartment",
    price: "$400.00",
  },
  {
    id: "sp2",
    image: "/assets/property/img-3.png",
    title: "Royal Apartment",
    address: "25, Ville Cresent Apartment",
    price: "$400.00",
  },
  {
    id: "sp3",
    image: "/assets/property/img-2.png",
    title: "Royal Apartment",
    address: "25, Ville Cresent Apartment",
    price: "$400.00",
  },
];

export default function ListingDetailsPage() {
  const params = useParams<{ projectId: string; listingId: string }>();
  const listingId = params?.listingId ?? "";
  const { data: propertyDetails, isPending, isError } = usePropertyDetails({
    id: listingId,
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
    if (nextImages.length >= 5) {
      return nextImages;
    }

    return [...nextImages, ...galleryImages].slice(0, 5);
  }, [resolvedGalleryImages]);

  const propertyTitle =
    asString(propertyDetails?.propertyName) ??
    asString(propertyDetails?.title) ??
    "Orchid Petals";
  const propertyAddress =
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
    const bedrooms = asString(propertyDetails?.bhkType) ?? "4 Bedrooms";
    const furnishing =
      asString(propertyDetails?.furnishingType) ??
      asString(propertyDetails?.furnishType) ??
      "Semi-furnished";
    const bathrooms =
      asNumber(propertyDetails?.bathRooms) ??
      asNumber(propertyDetails?.bathrooms) ??
      4;
    const area = asNumber(propertyDetails?.buildUpAreaSqFt) ?? asNumber(propertyDetails?.area);
    const facing = asString(propertyDetails?.facing) ?? "Park View";
    const floor = asNumber(propertyDetails?.floorNumber);
    const totalFloors = asNumber(propertyDetails?.totalFloorCount);

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
      ["Listing Type", asString(propertyDetails?.listingType)],
      ["Building Type", asString(propertyDetails?.category)],
      ["Property Type", asString(propertyDetails?.propertyType)],
      ["City", asString(propertyDetails?.city)],
      ["Micro market", asString(propertyDetails?.microMarket)],
      ["Locality", asString(propertyDetails?.locality)],
      ["Project Name", asString(propertyDetails?.projectName)],
      [
        "Area",
        asNumber(propertyDetails?.buildUpAreaSqFt)
          ? `${formatInr(Number(propertyDetails?.buildUpAreaSqFt))} Sq.Ft. (Area)`
          : null,
      ],
      ["Facing", asString(propertyDetails?.facing)],
      ["View", asString(propertyDetails?.view)],
      ["Built in", asString(propertyDetails?.builtIn)],
      ["Age", asString(propertyDetails?.age)],
      ["Additional Rooms", asString(propertyDetails?.additionalRooms)],
      ["Total Floor Count", asString(propertyDetails?.totalFloorCount)],
      ["Floor Number", asString(propertyDetails?.floorNumber)],
      ["Tower/Block", asString(propertyDetails?.towerOrBlock)],
    ];

    return propertyInformation.map(([label, fallback]) => {
      const match = fromApi.find(([apiLabel]) => apiLabel === label);
      return [label, match?.[1] ?? fallback] as [string, string];
    });
  }, [propertyDetails]);

  return (
    <MainLayout>
      <div className="py-8">
        <div className="mx-auto w-full max-w-[1180px] px-4 lg:px-6">
          <div className="rounded-2xl border border-border bg-white p-4 shadow-sm lg:p-6">
            <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {/* <p className="text-xs font-medium text-text-light-gray">
                Home / Projects / {params?.projectId ?? "project"} / {listingId || "property"}
              </p> */}
                <h1 className="mt-1 text-2xl font-semibold text-text-black">
                  {propertyTitle}
                </h1>
                <p className="mt-1 flex items-center gap-1 text-sm text-text-gray">
                  <MapPin className="h-4 w-4" />
                  {propertyAddress}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-3xl font-semibold leading-none text-blue">{currentPriceLabel}</p>
                <p className="mt-1 text-xs text-text-gray">{depositLabel}</p>
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

            <section className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr]">
              <div className="relative h-[250px] overflow-hidden rounded-sm sm:h-[330px]">
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

              <div className="grid grid-cols-2 gap-3">
                {displayGallery.slice(1).map((src, idx) => (
                  <div
                    key={src}
                    className="relative h-[118px] overflow-hidden rounded-sm sm:h-[158px]"
                  >
                    <Image
                      src={src}
                      alt={`Property image ${idx + 2}`}
                      fill
                      className="object-cover"
                    />
                    {idx === displayGallery.slice(1).length - 1 ? (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-sm font-semibold text-white">
                        View all 20+
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-4 flex flex-wrap gap-2">
              {quickFactsData.map((fact) => (
                <div
                  key={fact.label}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background-gray px-3 py-2 text-xs font-medium text-text-black"
                >
                  <span>{fact.icon}</span>
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
                      className={`whitespace-nowrap border-b-2 px-6 py-4 font-medium transition ${idx === 0
                          ? "border-blue bg-white/70 text-text-black"
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
                          className="rounded-lg border border-border p-3"
                        >
                          <p className="text-[11px] text-text-gray">
                            {label}
                          </p>
                          <p className="mt-1 text-sm font-medium text-text-black">{value}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-xl">
                    <h2 className="text-xl font-semibold text-text-black">Furnishing Details</h2>
                    <div className="mt-4 rounded-lg bg-white p-3 grid grid-cols-1  gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                      {furnishingDetails.map((item) => (
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

                  <section className="rounded-xl border border-border p-4">
                    <h2 className="text-xl font-semibold text-text-black">Locality</h2>
                    <div className="mt-3 relative h-[210px] overflow-hidden rounded-xl bg-[#ECEEF3]">
                      <Image
                        src="/assets/city/city1.svg"
                        alt="Locality map"
                        fill
                        className="object-cover opacity-70"
                      />
                      <button
                        type="button"
                        className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-blue px-4 py-2 text-xs font-semibold text-white"
                      >
                        Check on Map
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {nearbyPlaces.map((place) => (
                        <div
                          key={place.name}
                          className="flex items-center justify-between rounded-lg border border-border p-3"
                        >
                          <div className="inline-flex items-center gap-2 text-sm text-text-black">
                            {place.icon}
                            {place.name}
                          </div>
                          <span className="text-xs font-medium text-text-light-gray">
                            {place.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-xl">
                    <h2 className="text-xl font-semibold text-text-black">Amenities</h2>
                    <div className="mt-4 rounded-lg bg-white p-3 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                      {amenities.map((amenity) => (
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
                            src="/assets/profile.png"
                            alt="Agent avatar"
                            width={52}
                            height={52}
                            className="h-[52px] w-[52px] rounded-full object-cover"
                          />
                          <div>
                            <p className="text-base font-semibold text-text-black">
                              Manjeet Skyzen
                            </p>
                            <span className="mt-1 inline-block rounded bg-[#E69D48] px-2 py-1 text-[11px] font-medium text-white">
                              Channel Partner
                            </span>
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
                          ["500+", "Buyers Served"],
                          ["21", "Years of Experience"],
                          ["44", "Property Holdings"],
                          ["20+", "Areas of Operation"],
                        ].map(([value, label]) => (
                          <div key={label} className="flex items-center  gap-3">
                            <p className="text-2xl leading-none font-semibold text-[#05085E]">{value}</p>
                            <p className="max-w-[110px] text-xs leading-5 text-text-black">{label}</p>
                          </div>
                        ))}
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {[
                          ["Property for Rent", "21"],
                          ["Property for Sale", "21"],
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
                              4.2
                              <span className="ml-1 text-sm font-medium text-text-light-gray">/5</span>
                            </p>
                            <div className="mt-3 flex items-center gap-1 text-[#F4B400]">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <Star
                                  key={`star-${idx}`}
                                  className="h-5 w-5"
                                  // fill={idx < 4 ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                            <p className="mt-1 text-xs text-text-gray">(120 Total Reviews)</p>
                          </div>

                          <div className="mt-5 space-y-1">
                            {ratingBreakdown.map((item) => (
                              <div key={item.stars} className="flex items-center gap-2">
                                <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#E2E2E4]">
                                  <div
                                    className="h-full rounded-full bg-[#05085E]"
                                    style={{ width: item.width }}
                                  />
                                </div>
                                <span className="min-w-10 text-right text-xs text-text-gray">
                                  {item.stars}
                                </span>
                                <Star className="h-3.5 w-3.5 fill-[#8D8D91] text-[#8D8D91]" />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-md font-semibold text-text-black">Ratings by features</h3>
                          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 border-b border-[#CFCFD2] pb-4">
                            {featureRatings.map((feature) => (
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
                                    {feature.score}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="border-b border-[#CFCFD2] py-4">
                            <h4 className="text-md font-semibold text-text-black">What&apos;s good</h4>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {goodThings.map((item) => (
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
                              {badThings.map((item) => (
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
                    </div>
                  </section>

                  <section className="rounded-xl border border-border p-4">
                    <h2 className="text-xl font-semibold text-text-black">
                      Similar properties in your locality
                    </h2>
                    <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {similarProperties.map((item) => (
                        <article key={item.id} className="overflow-hidden rounded-xl border border-border">
                          <div className="relative h-[160px]">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                            <span className="absolute right-3 top-3 rounded-full bg-light-purple px-2 py-1 text-[10px] font-semibold text-blue">
                              Apartment
                            </span>
                          </div>
                          <div className="p-3">
                            <h3 className="text-base font-semibold text-text-black">{item.title}</h3>
                            <p className="mt-1 text-xs text-text-gray">{item.address}</p>
                            <p className="mt-2 text-lg font-semibold text-blue">{item.price}</p>
                            <div className="mt-2 flex flex-wrap gap-2 text-xs text-text-gray">
                              <span className="rounded bg-background-gray px-2 py-1">2 Bed</span>
                              <span className="rounded bg-background-gray px-2 py-1">2 Bath</span>
                              <span className="rounded bg-background-gray px-2 py-1">350 Sq Ft</span>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                </main>

                <aside className="h-fit rounded-xl border border-border p-4 xl:sticky xl:top-4">
                  <h3 className="text-xl font-semibold text-text-black">
                    Talk to our real estate specialists
                  </h3>
                  <p className="mt-1 text-sm text-text-gray">
                    Buy - Sell - Invest with expert advice.
                  </p>
                  <div className="mt-4 flex items-center gap-3 rounded-lg bg-[#FAFAFB] p-3">
                    <Image
                      src="/assets/profile.png"
                      alt="Specialist"
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-text-black">Manjeet Skyzen</p>
                      <p className="text-xs text-text-light-gray">KMA Real Partner</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue px-4 py-3 text-sm font-semibold text-white"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Contact Now
                  </button>
                  <a
                    href="https://wa.me/919056580022"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#1B8836] px-4 py-3 text-sm font-semibold text-[#1B8836]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Expert
                  </a>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
