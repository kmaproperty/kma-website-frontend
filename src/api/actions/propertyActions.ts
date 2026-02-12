import { axiosInstance } from "@/services/axiosService";

export interface EndUserPropertyMedia {
  fileKey?: string;
  view?: string;
  isCoverImage?: boolean | string;
  format?: string;
}

export interface EndUserPropertyDetails {
  id: string;
  propertyName?: string;
  title?: string;
  address?: string;
  description?: string;
  images?: EndUserPropertyMedia[];
  photos?: EndUserPropertyMedia[];
  videos?: EndUserPropertyMedia[];
  [key: string]: unknown;
}

export interface GetEndUserPropertyDetailsPayload {
  id: string;
  correlationId?: string;
}

export interface GetEndUserPropertyDetailsResponse {
  success?: boolean;
  message?: string;
  property?: EndUserPropertyDetails;
  data?: EndUserPropertyDetails;
}

export interface EndUserPropertySummary {
  id: string;
  propertyName?: string;
  title?: string;
  address?: string;
  description?: string;
  imageUrl?: string;
  images?: EndUserPropertyMedia[];
  videos?: EndUserPropertyMedia[];
  isFavorite?: boolean;
  city?: string;
  locality?: string;
  category?: string;
  listingType?: string;
  propertyType?: string;
  bhkType?: string;
  furnishType?: string;
  furnishingType?: string;
  constructionStatus?: string;
  price?: number;
  monthlyRent?: number;
  plotArea?: number;
  facing?: string;
  postedBy?: string;
  owner?: {
    role?: string;
    [key: string]: unknown;
  };
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

type CsvParam = string | string[] | null | undefined;

export interface GetEndUserPropertiesPayload {
  page?: number;
  limit?: number;
  cityId?: string;
  search?: string;
  categoryIds?: CsvParam;
  listingTypeIds?: CsvParam;
  propertyTypeIds?: CsvParam;
  bhkTypeIds?: CsvParam;
  furnishingTypes?: CsvParam;
  constructionStatuses?: CsvParam;
  minPrice?: number;
  maxPrice?: number;
  latitude?: number;
  longitude?: number;
  radius?: number;
  sortBy?: "price" | "createdAt" | "updatedAt" | string;
  sortOrder?: "ASC" | "DESC" | string;
  postedBy?: CsvParam;
  sessionId?: string;
  xSessionId?: string;
  correlationId?: string;
}

export interface EndUserPropertiesPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetEndUserPropertiesResponse {
  success?: boolean;
  message?: string;
  properties?: EndUserPropertySummary[];
  data?: EndUserPropertySummary[];
  total?: number;
  pagination?: EndUserPropertiesPagination;
}

export interface GetEndUserPropertiesCountResponse {
  success?: boolean;
  message?: string;
  count?: number;
}

const getCorrelationId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const toCsvParam = (value?: CsvParam) => {
  if (!value) {
    return undefined;
  }

  if (Array.isArray(value)) {
    const filtered = value.map((item) => String(item).trim()).filter(Boolean);
    return filtered.length > 0 ? filtered.join(",") : undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const getErrorPayload = (error: unknown) => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const maybeResponse = (error as { response?: { data?: unknown } }).response;
    if (maybeResponse?.data !== undefined) {
      return maybeResponse.data;
    }
  }
  return error;
};

export const getEndUserPropertyDetailsAction = async ({
  id,
  correlationId,
}: GetEndUserPropertyDetailsPayload): Promise<GetEndUserPropertyDetailsResponse> => {
  try {
    const response = await axiosInstance.get<GetEndUserPropertyDetailsResponse>(
      `end-user/properties/${id}`,
      {
        headers: {
          "x-correlation-id": correlationId ?? getCorrelationId(),
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    throw getErrorPayload(error);
  }
};

export const getEndUserPropertiesAction = async ({
  page = 1,
  limit = 20,
  cityId,
  search,
  categoryIds,
  listingTypeIds,
  propertyTypeIds,
  bhkTypeIds,
  furnishingTypes,
  constructionStatuses,
  minPrice,
  maxPrice,
  latitude,
  longitude,
  radius,
  sortBy,
  sortOrder,
  postedBy,
  // sessionId,
  // xSessionId,
  correlationId,
}: GetEndUserPropertiesPayload): Promise<
  GetEndUserPropertiesResponse | EndUserPropertySummary[]
> => {
  try {
    const response = await axiosInstance.get<
      GetEndUserPropertiesResponse | EndUserPropertySummary[]
    >(
      "end-user/properties",
      {
        params: {
          page,
          limit,
          cityId,
          search,
          categoryIds: toCsvParam(categoryIds),
          listingTypeIds: toCsvParam(listingTypeIds),
          propertyTypeIds: toCsvParam(propertyTypeIds),
          bhkTypeIds: toCsvParam(bhkTypeIds),
          furnishingTypes: toCsvParam(furnishingTypes),
          constructionStatuses: toCsvParam(constructionStatuses),
          minPrice,
          maxPrice,
          latitude,
          longitude,
          radius,
          sortBy,
          sortOrder,
          postedBy: toCsvParam(postedBy),
          // sessionId,
        },
        headers: {
          "x-correlation-id": correlationId ?? getCorrelationId(),
          // ...(xSessionId ? { "X-Session-Id": xSessionId } : {}),
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    throw getErrorPayload(error);
  }
};

export const getEndUserPropertiesCountAction = async ({
  cityId,
  search,
  categoryIds,
  listingTypeIds,
  propertyTypeIds,
  bhkTypeIds,
  furnishingTypes,
  constructionStatuses,
  minPrice,
  maxPrice,
  latitude,
  longitude,
  radius,
  sortBy,
  sortOrder,
  postedBy,
  // sessionId,
  xSessionId,
  correlationId,
}: GetEndUserPropertiesPayload): Promise<GetEndUserPropertiesCountResponse> => {
  try {
    const response = await axiosInstance.get<GetEndUserPropertiesCountResponse>(
      "end-user/properties/count",
      {
        params: {
          cityId,
          search,
          categoryIds: toCsvParam(categoryIds),
          listingTypeIds: toCsvParam(listingTypeIds),
          propertyTypeIds: toCsvParam(propertyTypeIds),
          bhkTypeIds: toCsvParam(bhkTypeIds),
          furnishingTypes: toCsvParam(furnishingTypes),
          constructionStatuses: toCsvParam(constructionStatuses),
          minPrice,
          maxPrice,
          latitude,
          longitude,
          radius,
          sortBy,
          sortOrder,
          postedBy: toCsvParam(postedBy),
          // sessionId,
        },
        headers: {
          "x-correlation-id": correlationId ?? getCorrelationId(),
          // ...(xSessionId ? { "X-Session-Id": xSessionId } : {}),
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    throw getErrorPayload(error);
  }
};
