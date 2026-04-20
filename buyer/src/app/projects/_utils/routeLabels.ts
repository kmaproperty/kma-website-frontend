interface RouteLabelArgs {
  cityName?: string;
  listingTypeId?: string | null;
  categoryId?: string | null;
  propertyTypeIds?: string[] | null;
  propertyMasterData?: unknown;
}

interface RouteLabels {
  breadcrumbLabel: string;
  headingLabel: string;
}

function listingTypeLabel(id?: string | null): string {
  if (!id) return "Properties";
  const lower = String(id).toLowerCase();
  if (lower.includes("rent")) return "Rent";
  if (lower.includes("sale") || lower.includes("sell") || lower.includes("buy")) return "Buy";
  return "Properties";
}

export function buildProjectsRouteLabels({
  cityName,
  listingTypeId,
}: RouteLabelArgs): RouteLabels {
  const action = listingTypeLabel(listingTypeId);
  const city = cityName?.trim() || "";

  const breadcrumbLabel = city
    ? `${action === "Properties" ? "Properties" : `${action} Properties`} in ${city}`
    : action === "Properties"
    ? "All Properties"
    : `Properties for ${action}`;

  const headingLabel = city
    ? `${action === "Properties" ? "Properties" : `${action} Properties`} in ${city}`
    : action === "Properties"
    ? "All Properties"
    : `Properties for ${action}`;

  return { breadcrumbLabel, headingLabel };
}
