import type { Project } from "../_types";

const u = (path: string) =>
  `https://images.unsplash.com/${path}?auto=format&fit=crop&w=1400&q=80`;

export const mockProjects: Project[] = [
  {
    id: "p_1001",
    title: "lorem ipsum",
    address: "742 Evergreen Terrace, Springfield, IL 62704",
    city: "Chandigarh",
    postedBy: "owner",
    listingIntent: "sale",
    priceValue: 1.91,
    priceLabel: "₹ 1.91 Cr",
    plotAreaSqYd: 119,
    bedrooms: 3,
    view: "Park View",
    furnishing: "semi-furnished",
    locality: "East of Kailash",
    propertyType: "villa",
    buildingType: "residential",
    possessionStatus: "ready_to_move",
    amenities: ["security_24x7", "power_backup"],
    images: [
      u("photo-1568605114967-8130f3a36994"),
      u("photo-1570129477492-45c003edd2be"),
      u("photo-1501183638710-841dd1904471"),
      u("photo-1512918728675-ed5a9ecdebfd"),
    ],
    mediaCounts: { photos: 4, videos: 2 },
    agent: {
      name: "Dwayne Douglas",
      badge: "KMA Expert Pro",
      avatarUrl: u("photo-1502685104226-ee32379fefbe"),
    },
    tags: ["prime_location", "reputed_builder"],
  },
  {
    id: "p_1002",
    title: "lorem ipsum",
    address: "Phase-1 Sector 1-19, Chandigarh",
    city: "Chandigarh",
    postedBy: "channel_partner",
    listingIntent: "rent",
    priceValue: 1,
    priceLabel: "₹ 1 lakh/month",
    plotAreaSqYd: 119,
    bedrooms: 3,
    view: "Park View",
    furnishing: "semi-furnished",
    locality: "Sector 1-19",
    propertyType: "apartment",
    buildingType: "residential",
    possessionStatus: "ready_to_move",
    amenities: ["security_24x7", "attached_market"],
    images: [
      u("photo-1564013799919-ab600027ffc6"),
      u("photo-1560448075-bb485b067938"),
      u("photo-1523217582562-09d0def993a6"),
    ],
    mediaCounts: { photos: 3, videos: 0 },
    agent: {
      name: "Dwayne Douglas",
      badge: "KMA Expert Pro",
      avatarUrl: u("photo-1502685104226-ee32379fefbe"),
    },
    tags: ["prime_location", "safe_secure_locality", "reputed_builder"],
  },
  {
    id: "p_1003",
    title: "Greenwood Residency",
    address: "Golf Course Road, Gurugram, Haryana",
    city: "Gurugram",
    postedBy: "owner",
    listingIntent: "sale",
    priceValue: 1.96,
    priceLabel: "₹ 1.96 Cr",
    plotAreaSqYd: 150,
    bedrooms: 3,
    view: "City View",
    furnishing: "furnished",
    locality: "Golf Course Rd",
    propertyType: "ind_floor",
    buildingType: "residential",
    possessionStatus: "under_construction",
    amenities: ["power_backup", "security_24x7", "attached_market"],
    images: [
      u("photo-1507089947368-19c1da9775ae"),
      u("photo-1494526585095-c41746248156"),
      u("photo-1522708323590-d24dbb6b0267"),
    ],
    mediaCounts: { photos: 3, videos: 1 },
    agent: {
      name: "Aarav Singh",
      badge: "KMA Expert Pro",
      avatarUrl: u("photo-1544723795-3fb6469f5b39"),
    },
    tags: ["reputed_builder"],
  },
  {
    id: "p_1004",
    title: "Skyline Office Spaces",
    address: "Cyber City, Gurugram, Haryana",
    city: "Gurugram",
    postedBy: "channel_partner",
    listingIntent: "rent",
    priceValue: 2,
    priceLabel: "₹ 2 lakh/month",
    plotAreaSqYd: 220,
    bedrooms: 0,
    view: "City View",
    furnishing: "semi-furnished",
    locality: "Cyber City",
    propertyType: "office_space",
    buildingType: "commercial",
    possessionStatus: "ready_to_move",
    amenities: ["power_backup", "security_24x7"],
    images: [
      u("photo-1486406146926-c627a92ad1ab"),
      u("photo-1521737604893-d14cc237f11d"),
      u("photo-1524758631624-e2822e304c36"),
    ],
    mediaCounts: { photos: 3, videos: 1 },
    agent: {
      name: "Neha Kapoor",
      badge: "KMA Expert Pro",
      avatarUrl: u("photo-1524504388940-b1c1722653e1"),
    },
    tags: ["prime_location", "safe_secure_locality"],
  },
].flatMap((p, baseIdx) => {
  // Create a longer list so the design looks realistic without hitting APIs yet.
  return Array.from({ length: 6 }).map((_, i) => {
    const n = baseIdx * 6 + i + 1;
    return {
      ...p,
      id: `${p.id}_${n}`,
      title: i % 2 === 0 ? p.title : `${p.title} ${n}`,
      city: i % 3 === 0 ? "Chandigarh" : p.city,
      address:
        i % 2 === 0
          ? p.address
          : `${p.address.split(",")[0]}, Sector ${10 + n}, ${p.city}`,
    } satisfies Project;
  });
});

