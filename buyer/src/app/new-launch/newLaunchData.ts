export type ProjectZone = "golf" | "dwarka" | "spr" | "new-gurgaon";
export type ProjectBudget = "1-3cr" | "3-6cr" | "6-10cr" | "10cr+";

export interface NewLaunchProject {
  id: string;
  developer: string;
  name: string;
  location: string;
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

export const heroFeatured = {
  developer: "Godrej Properties",
  name: "Godrej Sora",
  location: "Sector 53, Golf Course Road, Gurgaon",
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
  pills: ["3 & 4 BHK", "3050+ sq.ft", "₹9.76 Cr+", "Possession 2032"],
};

export const heroMiniCards = [
  {
    developer: "Krisumi Corporation",
    name: "Waterside Residences P5",
    price: "EOI ₹51 Lakh onwards",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    alt: "Krisumi Waterside Residences ",
  },
  {
    developer: "Sobha Limited",
    name: "Sobha Aranya",
    price: "₹7.10 Cr onwards",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
    alt: "Sobha Aranya",
  },
];

export const statsStrip = [
  { val: "10+", label: "New Launch Projects" },
  { val: "9", label: "Premium Developers" },
  { val: "15–18%", label: "Annual Appreciation" },
  { val: "RERA", label: "100% Verified Projects" },
  { val: "₹0", label: "Brokerage for Buyers" },
];

export const zoneFilters = [
  { id: "all", label: "All Projects" },
  { id: "golf", label: "Golf Course Road" },
  { id: "dwarka", label: "Dwarka Expressway" },
  { id: "spr", label: "SPR / Sohna" },
  { id: "new-gurgaon", label: "New Gurgaon" },
] as const;

export const budgetFilters = [
  { id: "all", label: "All Budgets" },
  { id: "1-3cr", label: "₹1–3 Cr" },
  { id: "3-6cr", label: "₹3–6 Cr" },
  { id: "6-10cr", label: "₹6–10 Cr" },
  { id: "10cr+", label: "₹10 Cr+" },
] as const;

export const projects: NewLaunchProject[] = [
  {
    id: "godrej-sora",
    developer: "Godrej Properties — 127+ Years Legacy",
    name: "Godrej Sora",
    location: "Sector 53, Golf Course Road, Gurugram",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
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
    developer: "Krisumi Corporation (Sumitomo Corp. Japan × Krishna Group)",
    name: "Krisumi Waterside Residences Phase 5",
    location: "Sector 36A, Krisumi City, Dwarka Expressway",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    alt: "Krisumi Waterside Residences Phase 5 Sector 36A Gurgaon",
    price: "₹51 Lakh*",
    zone: "dwarka",
    budget: "3-6cr",
    badges: [
      { label: "New Launch", variant: "new" },
      { label: "Indo-Japanese", variant: "luxury" },
    ],
    meta: [
      { val: "4 LDK+S", key: "Config" },
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
    id: "bptp-gaia",
    developer: "BPTP Ltd",
    name: "BPTP Gaia Residences",
    location: "Sector 102, Dwarka Expressway, Gurugram",
    image:
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&q=80",
    alt: "BPTP Gaia Residences Sector 102 Gurgaon",
    price: "On Request",
    zone: "dwarka",
    budget: "6-10cr",
    badges: [
      { label: "New Launch", variant: "new" },
      { label: "RERA ✓", variant: "rera" },
    ],
    meta: [
      { val: "2 Acres", key: "Land Parcel" },
      { val: "3 Towers", key: "Towers" },
      { val: "2025", key: "RERA Year" },
    ],
    amenities: [
      "Boutique Low-Density",
      "Landscaped Gardens",
      "Dwarka Expressway Frontage",
      "Near NH-8 & IGI Airport",
    ],
    rera: "RERA: 66 OF 2025 | New Launch",
  },
  {
    id: "bptp-downtown",
    developer: "BPTP Ltd",
    name: "BPTP Downtown",
    location: "Sector 66, Golf Course Extension Road",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    alt: "BPTP Downtown Sector 66 Golf Course Extension Road Gurgaon",
    price: "On Request",
    zone: "golf",
    budget: "3-6cr",
    badges: [
      { label: "New Launch", variant: "new" },
      { label: "BPTP", variant: "luxury" },
    ],
    meta: [
      { val: "3–4 BHK", key: "Config" },
      { val: "4.5 Acres", key: "Area" },
      { val: "3 Towers", key: "Towers" },
    ],
    amenities: [
      "75,000 sq.ft Clubhouse",
      "Golf Course Ext. Road",
      "Premium Finishes",
      "Expansive Balconies",
    ],
    rera: "BPTP Park Prime Ecosystem | New Launch",
  },
  {
    id: "tonino-lamborghini",
    developer: "Signature Global × Tonino Lamborghini (Italy)",
    name: "Tonino Lamborghini Residences",
    location: "Sector 71, Southern Peripheral Road (SPR)",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    alt: "Elan The Statement Sector 49 Sohna Road Gurgaon ultra luxury apartments",
    price: "₹9 Cr*",
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
    name: "Central Park Flower Valley — Bignonia Towers",
    location: "Sector 33, Sohna Road",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    alt: "Central Park Flower Valley Bignonia Towers Sector 33 Sohna Gurgaon",
    price: "On Request",
    zone: "spr",
    budget: "1-3cr",
    badges: [
      { label: "New Launch", variant: "new" },
      { label: "RERA ✓", variant: "rera" },
    ],
    meta: [
      { val: "9,000+", key: "Trees in Township" },
      { val: "Resort", key: "Living Style" },
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
    id: "m3m-elie-saab",
    developer: "M3M India × Elie Saab (France)",
    name: "M3M Elie Saab",
    location: "Sector 111, Dwarka Expressway (SCDA)",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    alt: "M3M Elie Saab Sector 111 Dwarka Expressway Gurgaon branded residences",
    price: "₹12 Cr*",
    zone: "dwarka",
    budget: "10cr+",
    badges: [
      { label: "Luxury", variant: "luxury" },
      { label: "🔥 Trending", variant: "hot" },
    ],
    meta: [
      { val: "Ultra Luxury", key: "Category" },
      { val: "3700–4000+ sq.ft", key: "Size" },
      { val: "250 Acres", key: "SCDA Ecosystem" },
    ],
    amenities: [
      "Haute Couture Interiors",
      "Private Concierge",
      "Branded Lobbies",
      "High Architectural Exclusivity",
    ],
    rera: "India's First M3M Fashion-Branded Residence | HRERA Registered",
  },
  {
    id: "puri-diplomatic",
    developer: "Puri Constructions — 50-Year Legacy",
    name: "Puri Diplomatic Residences",
    location: "Sector 111, Dwarka Expressway",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    alt: "Puri Diplomatic Residences Sector 111 Dwarka Expressway Gurgaon",
    price: "On Request",
    zone: "dwarka",
    budget: "3-6cr",
    badges: [
      { label: "New Launch", variant: "new" },
      { label: "RERA ✓", variant: "rera" },
    ],
    meta: [
      { val: "3–4 BHK", key: "Config" },
      { val: "2282–2440 sq.ft", key: "Size" },
      { val: "324 Units", key: "6 Towers · 9.07 Acres" },
    ],
    amenities: [
      "Triple-Height Lobby",
      "Rooftop Infinity Pool",
      "All-Weather Indoor Pool",
      "Multi-Tier Security",
    ],
    rera: "2 Min to Delhi Border | Possession 2029",
  },
  {
    id: "sobha-aranya",
    developer: "Sobha Limited",
    name: "Sobha Aranya",
    location: "Sector 80, Karma Lakelands, New Gurgaon",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    alt: "Sobha Aranya Sector 80 New Gurgaon Karma Lakelands luxury apartments",
    price: "₹7.10 Cr*",
    zone: "new-gurgaon",
    budget: "6-10cr",
    badges: [
      { label: "New Launch", variant: "new" },
      { label: "Sobha", variant: "luxury" },
      { label: "RERA ✓", variant: "rera" },
    ],
    meta: [
      { val: "3–4 BHK", key: "Config" },
      { val: "2836 sq.ft+", key: "Size" },
      { val: "524 Units", key: "5 Towers · 31.28 Acres" },
    ],
    amenities: [
      "75,000 sq.ft Clubhouse",
      "Karma Lakelands Golf Access",
      "Sacred Forests & Bamboo Groves",
      "Solar & Rainwater Harvesting",
      "85% Open Space",
    ],
    rera: "RERA: GGM/808/540/2024/35 | Possession Dec 2030",
    description:
      "Sobha Aranya is a low-density eco-luxury development inside the 270-acre Karma Lakelands estate on NH-48 — just 524 residences set among restored forest, sacred groves and a nine-hole golf course. With 85% open space, solar power, rainwater harvesting and a 75,000 sq.ft. clubhouse, it's one of New Gurgaon's most distinctive green addresses.",
    wide: true,
  },
];

export const whyInvestReasons = [
  {
    num: "01",
    tag: "Pre-Launch Advantage",
    title: "Buy at Launch Price, Sell at Market Peak",
    desc: "New launch projects offer the lowest entry price. Gurgaon projects on Dwarka Expressway & Golf Course Road have delivered 15–18% Year-on-Year appreciation — securing pre-launch inventory is the smartest move.",
  },
  {
    num: "02",
    tag: "Infrastructure Boom",
    title: "World-Class Connectivity Driving Value",
    desc: "Dwarka Expressway opening, new metro lines, Delhi-Mumbai Industrial Corridor proximity, Yashobhoomi Convention Centre — Gurgaon's infrastructure is transforming property values across sectors.",
  },
  {
    num: "03",
    tag: "RERA Protection",
    title: "100% Legal Security & Transparent Transactions",
    desc: "Every project we list is RERA-registered under Haryana RERA, ensuring timely delivery, transparent pricing, and complete legal protection for buyers and investors.",
  },
  {
    num: "04",
    tag: "MNC Hub",
    title: "Rental Demand Highest in North India",
    desc: "Gurgaon hosts 250+ Fortune 500 companies creating perpetual rental demand. New luxury launches command ₹60,000–₹2.5 lakh/month rental income, making them exceptional investment assets.",
  },
];

export const areas = [
  {
    count: "3 New Projects",
    name: "Golf Course Road",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    alt: "Golf Course Road Gurgaon",
    tags: ["Ultra Luxury", "₹5–10 Cr"],
  },
  {
    count: "3 New Projects",
    name: "Dwarka Expressway",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
    alt: "Dwarka Expressway Gurgaon",
    tags: ["High Growth", "₹1.8–9 Cr"],
  },
  {
    count: "2 New Projects",
    name: "SPR / Sohna Road",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    alt: "SPR Gurgaon",
    tags: ["Emerging Elite", "₹4–12 Cr"],
  },
  {
    count: "2 New Projects",
    name: "New Gurgaon",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
    alt: "New Gurgaon",
    tags: ["Best Value", "₹2–5 Cr"],
  },
];

export const developers = [
  { abbr: "GRP", name: "Godrej Properties", projects: "Sora" },
  {
    abbr: "KRS",
    name: "Krisumi Corporation",
    projects: "Waterside Residences",
  },
  { abbr: "BPT", name: "BPTP", projects: "Gaia Residences · Downtown" },
  {
    abbr: "SGL",
    name: "Signature Global",
    projects: "Tonino Lamborghini Residences",
  },
  { abbr: "ELN", name: "Elan Group", projects: "The Statement" },
  {
    abbr: "CPK",
    name: "Central Park",
    projects: "Flower Valley Bignonia Towers",
  },
  { abbr: "M3M", name: "M3M India", projects: "Elie Saab" },
  {
    abbr: "PUR",
    name: "Puri Constructions",
    projects: "Diplomatic Residences",
  },
  // { abbr: "SBH", name: "Sobha Limited", projects: "Aranya" },
];

export const buyingGuideChecks = [
  {
    num: "01",
    title: "Developer Track Record",
    desc: "Look at how many projects the builder has actually delivered, whether possession dates were honoured, and the build quality of their completed developments — not just the ones still under construction.",
  },
  {
    num: "02",
    title: "RERA Registration",
    desc: "Every legitimate project in Haryana must carry a valid HRERA registration number. This single check tells you the sanctioned layout, promised timeline, and the builder's legal obligations to buyers.",
  },
  {
    num: "03",
    title: "Location & Connectivity",
    desc: "Proximity to NH-48, the upcoming metro corridors, business districts, and the Dwarka Expressway can matter more to long-term value than the amenities list itself.",
  },
  {
    num: "04",
    title: "Construction Timeline",
    desc: "Compare the promised possession date against the builder's history of delays. A realistic, RERA-backed timeline is far more valuable than an aggressive one that's unlikely to be met.",
  },
  {
    num: "05",
    title: "Floor Plans & Carpet Area",
    desc: "Super built-up area figures can be misleading. Always ask for the actual carpet area, unit orientation, and floor-to-floor height before comparing prices across projects.",
  },
  {
    num: "06",
    title: "Social & Physical Infrastructure",
    desc: "Schools, hospitals, retail, and reliable water and power supply in the surrounding micro-market directly influence both livability and resale demand down the line.",
  },
];

export const corridorTable = [
  {
    corridor: "Golf Course Road & Extension",
    suited: "Ultra-luxury living",
    strength: "Established micro-market, premium social infra",
    profile: "End-users, HNI investors",
  },
  {
    corridor: "Dwarka Expressway",
    suited: "High-growth appreciation",
    strength: "Airport proximity, new-age infrastructure",
    profile: "Investors, NRIs",
  },
  {
    corridor: "Southern Peripheral Road (SPR)",
    suited: "Emerging luxury",
    strength: "NH-48 access, fast-developing corridor",
    profile: "Mixed end-user & investor",
  },
  {
    corridor: "New Gurgaon",
    suited: "Value-for-money homes",
    strength: "Larger inventory, competitive pricing",
    profile: "First-time buyers, young families",
  },
  {
    corridor: "Sohna Road",
    suited: "Long-term appreciation",
    strength: "Improving connectivity, upcoming projects",
    profile: "Long-horizon investors",
  },
];

export const buyerProfiles = [
  {
    title: "Families",
    desc: "Prioritise spacious configurations, proximity to reputed schools, and community-focused amenities like parks, clubhouses, and sports facilities over pure investment metrics.",
  },
  {
    title: "Working Professionals",
    desc: "Favour locations with a short commute to major business hubs, along with reliable connectivity via NH-48, SPR, or the upcoming metro extensions.",
  },
  {
    title: "Investors & NRIs",
    desc: "Focus on rental yield potential, developer resale value, and corridors with visible infrastructure-led growth rather than short-term price movement alone.",
  },
];

export const faqs = [
  {
    id: "nl-faq-1",
    question:
      "Which are the best locations for new launch projects in Gurugram?",
    answer:
      "Golf Course Road, Golf Course Extension Road, Dwarka Expressway, Southern Peripheral Road (SPR), New Gurgaon, and Sohna Road remain the most active corridors, each offering a different balance of connectivity, pricing, and long-term growth potential.",
  },
  {
    id: "nl-faq-2",
    question: "Are new launch projects in Gurugram a good investment?",
    answer:
      "They can be, provided the developer has a credible delivery record, the location has visible infrastructure momentum, and end-user demand in that micro-market is genuinely strong. Every project should be assessed on its own merits rather than general market sentiment.",
  },
  {
    id: "nl-faq-3",
    question: "Why does RERA registration matter so much?",
    answer:
      "HRERA registration is what makes a project's approvals, construction progress, and delivery timeline legally verifiable. It gives buyers recourse if a builder fails to meet stated commitments, so checking it should be a non-negotiable first step.",
  },
  {
    id: "nl-faq-4",
    question: "What should I compare before booking a unit?",
    answer:
      "Location, developer reputation, actual carpet area versus super built-up area, payment plan structure, possession timeline, nearby infrastructure, and the legal documentation of the project should all be reviewed side-by-side across shortlisted options.",
  },
  {
    id: "nl-faq-5",
    question: "Which configuration — 2, 3, or 4 BHK — should I choose?",
    answer:
      "It depends on your stage of life and purpose. Families generally lean toward 3 or 4 BHK homes for long-term comfort, while investors often pick configurations that align with the rental demand and resale liquidity typical of that specific micro-market.",
  },
  {
    id: "nl-faq-6",
    question: "How should I plan a site visit?",
    answer:
      "A guided site visit lets you assess actual construction progress, sample flat layouts, and the surrounding neighbourhood in person. Scheduling visits to two or three shortlisted projects in a single trip makes comparison far easier than judging from brochures alone.",
  },
  {
    id: "nl-faq-7",
    question: "Can NRIs buy new launch properties in Gurugram?",
    answer:
      "Yes. NRIs are permitted to purchase most categories of residential property in India, and Gurugram's strong corporate presence and ongoing infrastructure development continue to make it a preferred destination for NRI homebuyers.",
  },
];

export const ctaTrustItems = [
  "Zero Brokerage for Buyers",
  "RERA Verified Projects",
  "Best Price Guarantee",
  "Site Visit Arranged",
];

export const newLaunchPageData = {
  hero: {
    badge: "Exclusive New Launches 2025 — Gurgaon",
    titleLine1: "Gurugram's Premium",
    titleLine2: "NEW LAUNCH",
    titleAccent: "Residences",
    description:
      "Discover Gurgaon's most coveted new launch projects — handpicked by KMA Global Property experts. Godrej, Krisumi, BPTP, Signature Global, Elan, Central Park, M3M, Puri, Sobha & more. Pre-launch prices, RERA verified, zero brokerage for buyers.",
    primaryCta: {
      label: "Explore All Projects",
      scrollTo: "newLaunchProjects",
    },
    secondaryCta: { label: "Free Consultation", scrollTo: "newLaunchCta" },
    stats: [
      { val: "10+", label: "New Launches" },
      { val: "₹51L", label: "Starting EOI" },
      { val: "100%", label: "RERA Verified" },
    ],
    featured: heroFeatured,
    miniCards: heroMiniCards,
    editorsPickLabel: "⭐ Editor's Pick",
  },
  projects: {
    section: {
      kicker: "Browse Projects",
      title: "New Launch Projects in",
      titleAccent: "Gurgaon 2025",
      description:
        "Hand-picked from Gurgaon's most prestigious corridors — Golf Course Road, Dwarka Expressway, Southern Peripheral Road & more.",
    },
    zoneFilters,
    budgetFilters,
    items: projects,
    sliderThreshold: 1,
    labels: {
      starting: "Starting",
      enquire: "Enquire Now",
      enquireWide: "Enquire Now",
      brochure: "Brochure",
      noResults: "No projects match the selected filters.",
      prevAria: "Previous projects",
      nextAria: "Next projects",
    },
  },
  whyInvest: {
    section: {
      kicker: "Investment Intelligence",
      title: "Why Buy a New Launch in",
      titleAccent: "Gurgaon",
      titleSuffix: " Now?",
      description:
        "Gurugram is India's fastest-appreciating real estate market. New launches today become tomorrow's biggest returns.",
    },
    visual: {
      mainImage:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      mainAlt: "Luxury apartments Gurgaon skyline",
      accentImage:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
      accentAlt: "Premium amenities luxury pool Gurgaon",
      badgeTitle: "Growth",
      badgeValue: "15–18%",
      badgeLabel: "Annual Appreciation",
      badgeDesc:
        "Located in one of Gurgaon's fastest growing investment corridors.",
    },
    reasons: whyInvestReasons,
  },
  developers: {
    section: {
      kicker: "Trusted Partners",
      title: "Top Developers —",
      titleAccent: "Verified by KMA",
    },
    items: developers,
  },
  cta: {
    sectionId: "newLaunchCta",
    section: {
      kicker: "Free Expert Consultation",
      title: "Get Exclusive Pre-Launch",
      titleAccent: "Prices & Floor Plans",
      description:
        "Our Gurgaon real estate experts will match you with the right new launch project based on your budget, location preference, and investment goals — zero pressure, zero brokerage for buyers.",
    },
    form: {
      namePlaceholder: "Your Full Name",
      mobilePlaceholder: "Mobile Number",
      submitLabel: "Get Free Advice →",
      phoneHref: "tel:+919876543210",
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80",
    trustItems: ctaTrustItems,
  },
  buyingIntro: {
    section: {
      kicker: "Homebuyer's Handbook",
      title: "Buying a New Launch Property in",
      titleAccent: "Gurugram",
      titleSuffix: ": What Every Homebuyer Should Know",
      description:
        "Gurugram's skyline keeps redrawing itself, and with it comes a steady stream of new launch projects promising modern layouts, resort-style amenities, and strong upside for early buyers. But a good-looking brochure isn't the same as a good investment. Before you commit your savings to a new launch in Gurugram, it helps to understand what actually separates a dependable project from an overhyped one — and that's exactly what this guide walks you through.",
    },
  },
  keyFactors: {
    section: {
      title: "Key Factors to Check",
      titleAccent: "Before You Book",
      description:
        "A new launch purchase is as much about the paperwork and planning as it is about the apartment itself. Here's what a well-informed buyer looks at before signing anything.",
    },
    items: buyingGuideChecks,
  },
  primeCorridors: {
    section: {
      title: "Comparing Gurugram's",
      titleAccent: "Prime Corridors",
      description:
        "Not every part of Gurugram behaves the same way in terms of pricing or growth. Here's a quick side-by-side of the corridors most active with new launches right now.",
    },
    tableHeaders: [
      "Corridor",
      "Best Suited For",
      "Key Strength",
      "Typical Buyer Profile",
    ],
    rows: corridorTable,
  },
  buyerProfiles: {
    section: {
      title: "Who Should Consider a",
      titleAccent: "New Launch",
      titleSuffix: "?",
      description:
        "The \"right\" project depends entirely on who's buying it. Here's how priorities typically shift across buyer types.",
    },
    items: buyerProfiles,
  },
  faq: {
    section: {
      kicker: "Got Questions?",
      title: "Frequently Asked",
      titleAccent: "Questions",
      description:
        "Everything you need to know before booking a new launch property in Gurugram.",
    },
    category: {
      id: "new-launch-faq",
      title: "New Launch FAQs",
      subtitle: "Common questions from homebuyers and investors",
      faqs,
    },
  },
} as const;
