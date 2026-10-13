export type ProjectZone = "golf" | "dwarka" | "spr" | "new-gurgaon";
export type ProjectBudget = "1-3cr" | "3-6cr" | "6-10cr" | "10cr+";

export interface NewLaunchProject {
  id: string;
  developer: string;
  name: string;
  location: string;
  webUrl?: string;
  image: string;
  alt: string;
  price: string;
  zone: ProjectZone;
  budget: ProjectBudget;
  badges: { label: string; variant: "new" | "luxury" | "hot" | "rera" }[];
  meta: { val: string; key: string }[];
  amenities: string[];
  rera: string;
  description?: string;
  wide?: boolean;
  featured?: boolean;
}

export const projects: NewLaunchProject[] = [
  {
    id: "godrej-sora",
    developer: "Godrej Properties — 127+ Years Legacy",
    name: "Godrej Sora",
    location: "Sector 53, Golf Course Road, Gurugram",
    webUrl: "https://kmaglobalproperty.in/godrejsora/",
    image:
      "/new-launch/Godrej-sora.png",
    alt: "Godrej Sora luxury apartments Sector 53 Gurgaon",
    price: "₹9.76 Cr*",
    zone: "golf",
    budget: "6-10cr",
    badges: [
      { label: "Ultra Luxury", variant: "luxury" },
      { label: "🔥 Trending", variant: "hot" },
      { label: "RERA ✓", variant: "rera" },
    ],
    meta: [
      { val: "3 & 4 BHK", key: "Configuration" },
      { val: "3050–4250 sq.ft", key: "Size Range" },
      { val: "3.6 Acres", key: "Project Area" },
      { val: "2032", key: "Possession" },
    ],
    amenities: [
      "Sunken Clubhouse",
      "Swimming Pool",
      "Zen Garden",
      "Library & Cards Room",
      "VRF Air Conditioning",
      "Tree-lined Private Road",
      "Golf Course Road Frontage",
    ],
    rera: "RERA: GGM/976/708/2025/79 | Possession Sept 2032 | Haryanarera.gov.in Verified",
    description:
      "Godrej Sora is an ultra-luxury residential development inspired by Japanese Shibui design philosophy, offering spacious 3 and 4 BHK residences on Golf Course Road. Premium amenities, elegant architecture, and excellent connectivity make it one of Gurugram's most anticipated luxury launches.",
    wide: true,
    featured: true,
  },
  {
    id: "krisumi-waterside",
    developer: "Krisumi Corporation (Krishna Group)",
    name: "Krisumi Waterside Residences Phase 5",
    location: "Sector 36A, Krisumi City, Dwarka Expressway",
    webUrl: "https://kmaglobalproperty.in/krisumi-the-forest/",
    image:
      "/new-launch/Krisumi.webp",
    alt: "Krisumi Waterside Residences Phase 5 Sector 36A Gurgaon",
    price: "₹51 Lakh* (EOI)",
    zone: "dwarka",
    budget: "3-6cr",
    badges: [
      { label: "New Launch", variant: "new" },
      { label: "Indo-Japanese", variant: "luxury" },
    ],
    meta: [
      // { val: "4 LDK+S", key: "Config" },
      { val: "3600–4000 sq.ft", key: "Size Range" },
      { val: "150 Homes", key: "Limited Units" },
    ],
    amenities: [
      "Cascades Club 1.6L sq.ft",
      "Forest Walkways",
      "Mist Ponds",
      "Japanese Zen Gardens",
      "Yoga Decks",
    ],
    rera: "Part of 33.3-Acre Krisumi City Township | New Launch",
  },
  {
    id: "tonino-lamborghini",
    developer: "Signature Global × Tonino Lamborghini (Italy)",
    name: "Tonino Lamborghini Residences",
    location: "Sector 71, Southern Peripheral Road (SPR)",
    webUrl: "https://kmaglobalproperty.in/tonino-lamborghini/",
    image:
      "/new-launch/Tonino.png",
    alt: "Tonino Lamborghini Residences Sector 71 SPR Road Gurgaon branded apartments",
    price: "₹4.80 Cr*",
    zone: "spr",
    budget: "3-6cr",
    badges: [
      { label: "Branded Residence", variant: "luxury" },
      { label: "🔥 Hot", variant: "hot" },
    ],
    meta: [
      { val: "3–4.5 BHK", key: "Config" },
      { val: "2000–3700 sq.ft", key: "Size" },
      { val: "812 Units", key: "5 Towers · 12.4 Acres" },
    ],
    amenities: [
      "Brand-Managed Clubhouse",
      "Infinity Pool",
      "Spa & Sauna",
      "Gaming Arcade",
      "4 Units Per Core",
    ],
    rera: "India's First Lamborghini-Branded Residence | Launched Apr 2026",
  },
  {
    id: "elan-statement",
    developer: "Elan Group",
    name: "Elan The Statement",
    location: "Sector 49, Sohna Road",
    webUrl: "https://kmaglobalproperty.in/elanthestatement/",
    image:
      "/new-launch/Elan.png",
    alt: "Elan The Statement Sector 49 Sohna Road Gurgaon ultra luxury apartments",
    price: "₹9 - 10 Cr*",
    zone: "spr",
    budget: "6-10cr",
    badges: [
      { label: "Ultra Luxury", variant: "luxury" },
      { label: "RERA ✓", variant: "rera" },
    ],
    meta: [
      { val: "4–4.5 BHK", key: "Config" },
      { val: "4300–5500 sq.ft", key: "Size incl. Penthouse" },
      { val: "2029", key: "Possession" },
    ],
    amenities: [
      "1 Lakh sq.ft Clubhouse",
      "Golf Putting Green",
      "Skating Rink",
      "Mini Theatre",
      "Squash & Billiards",
    ],
    rera: "RERA: GGM/1022/754/2025/125 | Possession Oct 2029",
  },
  {
    id: "central-park-bignonia",
    developer: "Central Park Group",
    name: "Central Park — Bignonia Towers",
    location: "Sector 33, Sohna Road",
    webUrl: "https://kmaglobalproperty.in/centralparkdelphine/",
    image:
      "/new-launch/CentralPark.jpg",
    alt: "Central Park Flower Valley Bignonia Towers Sector 33 Sohna Gurgaon",
    price: "8.95 Cr*",
    zone: "spr",
    budget: "1-3cr",
    badges: [
      { label: "New Launch", variant: "new" },
      { label: "RERA ✓", variant: "rera" },
    ],
    meta: [
      // { val: "9,000+", key: "Trees in Township" },
      // { val: "Resort", key: "Living Style" },
      { val: "Golf Access", key: "Feature" },
    ],
    amenities: [
      "Golf Course Access",
      "Swimming Pool",
      "1.2 Lakh sq.ft Clubhouse",
      "Shuttle to HUDA Metro",
    ],
    rera: "Part of Central Park Flower Valley Township | New Launch",
  },
  {
    id: "aipl-riviera",
    developer: "AIPL Lakecity",
    name: "Riviera (AIPL Lakecity)",
    location: "Sector 103, Dwarka Expressway",
    webUrl: "https://kmaglobalproperty.in/aiplriveria/",
    image:
      "/new-launch/riviera.webp",
    alt: "AIPL Riviera Lakecity",
    price: "1.85 - ₹3.50 Cr*",
    zone: "spr",
    budget: "1-3cr",
    badges: [
      { label: "New Launch", variant: "new" },
    ],
    meta: [
      { val: "3 - 4 BHK", key: "Config" },
      { val: "Open Green", key: "View" },
      { val: "IGI Airport access", key: "Feature" },
    ],
    amenities: [
      "Arrival Lounge",
      "Signature Pool",
      "Yoga Zone",
      "Lake Sanctuary",
    ],
    rera: "New Launch",
  },
  {
    id: "yugen-infra",
    developer: "Yugen Infra",
    name: "Yugen Golf City",
    location: "North of Goa • Near Mopa International Airport",
    webUrl: "https://kmaglobalproperty.in/yugen-golf-city-goa/",
    image:
      "/assets/yugen-card.avif",
    alt: "Yugen Golf City",
    price: "₹71 Lakhs",
    zone: "spr",
    budget: "1-3cr",
    badges: [
      { label: "New Launch", variant: "new" },
    ],
    meta: [
      { val: "Studio | 1-2 BHK", key: "Config" },
      { val: "Luxury", key: "View" },
      { val: "Mopa International Airport", key: "Airport" },
    ],
    amenities: [
      "⁠500+ Acres Proposed Township",
    ],
    rera: "New Launch",
  },
];