import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CarFront,
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
import MainLayout from "@/components/signUp/mainLayout";

const galleryImages = [
  "/assets/property/img-1.png",
  "/assets/property/img-2.png",
  "/assets/property/img-3.png",
  "/assets/property/img-4.png",
  "/assets/properties_pic_1.png",
];

const quickFacts = [
  { icon: <BedDouble className="h-4 w-4" />, label: "4 Bedrooms" },
  { icon: <Sofa className="h-4 w-4" />, label: "Semi-furnished" },
  { icon: <Bath className="h-4 w-4" />, label: "4 Bathrooms" },
  { icon: <House className="h-4 w-4" />, label: "2337 Sq. Ft (Built-up Area)" },
  { icon: <Trees className="h-4 w-4" />, label: "Park View" },
  { icon: <Building2 className="h-4 w-4" />, label: "15th Floor out of 28 Floors" },
];

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
  "1 Water Purifier",
  "5 Fan",
  "4 Exhaust Fan",
  "4 Geyser",
  "1 Stove",
  "10 Light",
  "5 Curtains",
  "1 Modular Kitchen",
  "1 Chimney",
  "4 AC",
  "4 Wardrobe",
];

const nearbyPlaces = [
  { icon: <School className="h-4 w-4" />, name: "Disneyland Nursery School", time: "0.2 km" },
  { icon: <CarFront className="h-4 w-4" />, name: "Rapid Bus Stop", time: "0.4 km" },
  { icon: <ShieldCheck className="h-4 w-4" />, name: "City Hospital", time: "0.8 km" },
  { icon: <Dumbbell className="h-4 w-4" />, name: "Urban Gym", time: "1.1 km" },
];

const amenities = [
  { icon: <Dumbbell className="h-4 w-4" />, label: "Gymnasium" },
  { icon: <WavesLadder className="h-4 w-4" />, label: "Swimming Pool" },
  { icon: <Tv className="h-4 w-4" />, label: "Club House" },
  { icon: <Trees className="h-4 w-4" />, label: "Jogging / Cycle Track" },
  { icon: <ShieldCheck className="h-4 w-4" />, label: "Power Backup" },
  { icon: <CheckCircle2 className="h-4 w-4" />, label: "Kids Play Area" },
];

const reviews = [
  {
    id: "r1",
    user: "Meera",
    role: "Teacher from India",
    body: "Quiet locality and clean surroundings. The nearby schools and groceries are very convenient.",
  },
  {
    id: "r2",
    user: "Meera",
    role: "Teacher from India",
    body: "Maintenance quality is good and the common amenities are functional. Security is active all day.",
  },
  {
    id: "r3",
    user: "Meera",
    role: "Teacher from India",
    body: "Rooms are spacious and well ventilated. A nice fit for families looking for a peaceful neighborhood.",
  },
];

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

export default function ListingDetailsPage({
  params,
}: {
  params: { projectId: string; listingId: string };
}) {
  return (
    <MainLayout>
      <div className="bg-[#F4F4F6] py-8">
      <div className="mx-auto w-full max-w-[1180px] px-4 lg:px-6">
        <div className="rounded-2xl border border-border bg-white p-4 shadow-sm lg:p-6">
          <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium text-text-light-gray">
                Home / Projects / {params.projectId} / {params.listingId}
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-text-black">
                Orchid Petals
              </h1>
              <p className="mt-1 flex items-center gap-1 text-sm text-text-gray">
                <MapPin className="h-4 w-4" />
                9, S Isbloom 189, 3rd floor, Sector 51, Gurgaon
              </p>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-3xl font-semibold leading-none text-blue">Rs 85,000</p>
              <p className="mt-1 text-xs text-text-gray">Deposit Amount: Two months</p>
            </div>
          </div>

          <section className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr]">
            <div className="relative h-[250px] overflow-hidden rounded-xl sm:h-[330px]">
              <Image
                src={galleryImages[0]}
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
              {galleryImages.slice(1).map((src, idx) => (
                <div
                  key={src}
                  className="relative h-[118px] overflow-hidden rounded-xl sm:h-[158px]"
                >
                  <Image
                    src={src}
                    alt={`Property image ${idx + 2}`}
                    fill
                    className="object-cover"
                  />
                  {idx === galleryImages.slice(1).length - 1 ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-sm font-semibold text-white">
                      View all 20+
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <div className="mt-4 flex flex-wrap gap-2">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background-gray px-3 py-2 text-xs font-medium text-text-gray"
              >
                <span>{fact.icon}</span>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>

          <nav className="mt-5 flex flex-wrap gap-2 border-b border-border pb-3 text-sm">
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
                className={`rounded-md px-3 py-1.5 font-medium transition ${
                  idx === 0
                    ? "bg-light-purple text-blue"
                    : "text-text-gray hover:bg-background-gray"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_310px]">
            <main className="space-y-5">
              <section className="rounded-xl border border-border p-4">
                <h2 className="text-xl font-semibold text-text-black">Key highlights</h2>
                <p className="mt-3 text-sm leading-6 text-text-gray">
                  For sale in Gurgaon&apos;s Sector 93, this 2-bedroom, 2-bathroom
                  apartment in Signature Orchard Avenue 2 offers a comfortable living
                  space of 890 square feet.
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

              <section className="rounded-xl border border-border p-4">
                <h2 className="text-xl font-semibold text-text-black">
                  Property Information
                </h2>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {propertyInformation.map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-lg border border-border bg-[#FAFAFB] p-3"
                    >
                      <p className="text-[11px] uppercase tracking-wide text-text-light-gray">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-text-black">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-border p-4">
                <h2 className="text-xl font-semibold text-text-black">Furnishing Details</h2>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {furnishingDetails.map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-[#FAFAFB] px-3 py-2 text-sm text-text-gray"
                    >
                      <CheckCircle2 className="h-4 w-4 text-blue" />
                      {item}
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

              <section className="rounded-xl border border-border p-4">
                <h2 className="text-xl font-semibold text-text-black">Amenities</h2>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {amenities.map((amenity) => (
                    <div
                      key={amenity.label}
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-gray"
                    >
                      {amenity.icon}
                      {amenity.label}
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-xl border border-border p-4">
                <h2 className="text-xl font-semibold text-text-black">
                  Channel Partner Details
                </h2>
                <div className="mt-3 rounded-xl border border-border bg-[#FAFAFB] p-4">
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
                        <p className="mt-1 text-xs text-text-light-gray">Real estate partner</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-black"
                      >
                        View Number
                      </button>
                      <button
                        type="button"
                        className="rounded-lg bg-blue px-3 py-2 text-sm font-semibold text-white"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      ["500+", "Buyers Served"],
                      ["21", "Years of Experience"],
                      ["44", "Property Holdings"],
                      ["20+", "Areas of Operation"],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-lg border border-border bg-white p-3">
                        <p className="text-xl font-semibold text-blue">{value}</p>
                        <p className="text-xs text-text-gray">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-border p-4">
                <h2 className="text-xl font-semibold text-text-black">Ratings and Reviews</h2>
                <div className="mt-3 rounded-xl border border-border bg-[#FAFAFB] p-4">
                  <div className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-3xl font-semibold text-text-black">4.2</p>
                      <div className="mt-1 flex items-center gap-1 text-[#F59E0B]">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={`star-${idx}`}
                            className="h-4 w-4"
                            fill={idx < 4 ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-text-gray">
                      Great connectivity and family-friendly amenities.
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                    {reviews.map((review) => (
                      <article key={review.id} className="rounded-xl border border-border bg-white p-4">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/assets/profile.png"
                            alt={review.user}
                            width={34}
                            height={34}
                            className="h-[34px] w-[34px] rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-semibold text-text-black">{review.user}</p>
                            <p className="text-[11px] text-text-light-gray">{review.role}</p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-text-gray">{review.body}</p>
                        <Link
                          href="#"
                          className="mt-3 inline-flex text-sm font-medium text-blue hover:underline"
                        >
                          Read More
                        </Link>
                      </article>
                    ))}
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
    </MainLayout>
  );
}
