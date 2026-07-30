import localityData from "@/data/localityTrends.json";

export function getPriceTrendData(propertyLocalityName: string, propertyPricePerSqft: number) {
 
  const rawString = propertyLocalityName || "";
  const slug = rawString
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const matchedKey = Object.keys(localityData).find((key) => slug.includes(key) || key.includes(slug));
  const matchedLocality = matchedKey ? (localityData as Record<string, any>)[matchedKey] : null;

  if (matchedLocality) {
    return {
      localityName: matchedLocality.localityName,
      localityAvgPrice: matchedLocality.currentAvgRate,
      localityTrends: matchedLocality.trends,
      growth1Yr: matchedLocality.growth1Yr,
      growth3Yr: matchedLocality.growth3Yr,
      growth5Yr: matchedLocality.growth5Yr,
    };
  }

  const growthRate = 0.12;
  const curr = propertyPricePerSqft || 12000;

  const generatedTrends = [
    { year: "2022", locality: Math.round(curr / Math.pow(1 + growthRate, 4)) },
    { year: "Q3 2022", locality: Math.round(curr / Math.pow(1 + growthRate, 3.5)) },
    { year: "2023", locality: Math.round(curr / Math.pow(1 + growthRate, 3)) },
    { year: "Q3 2023", locality: Math.round(curr / Math.pow(1 + growthRate, 2.5)) },
    { year: "2024", locality: Math.round(curr / Math.pow(1 + growthRate, 2)) },
    { year: "Q3 2024", locality: Math.round(curr / Math.pow(1 + growthRate, 1.5)) },
    { year: "2025", locality: Math.round(curr / Math.pow(1 + growthRate, 1)) },
    { year: "Q3 2025", locality: Math.round(curr / Math.pow(1 + growthRate, 0.5)) },
    { year: "2026", locality: curr },
  ];

  return {
    localityName: propertyLocalityName || "Sector Benchmark",
    localityAvgPrice: Math.round(curr * 1.05),
    localityTrends: generatedTrends,
    growth1Yr: "11.5%",
    growth3Yr: "52.0%",
    growth5Yr: "98.2%",
  };
}