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

/** GET /end-user/properties/{propertyId}/rating-reviews */
export interface PropertyRatingReviewSummary {
  averageRating: number;
  totalReviews: number;
  starDistribution: Record<string, number>;
}

export interface PropertyRatingReviewFeatureRatings {
  connectivity?: number;
  neighbourhood?: number;
  safety?: number;
  livability?: number;
}

export interface PropertyRatingReviewItem {
  id: string;
  reviewerName: string;
  reviewerProfileImage?: string | null;
  reviewerDetail?: string | null;
  overallRating: number;
  role?: string | null;
  likeText?: Record<string, unknown>;
  dislikeText?: Record<string, unknown>;
  createdAt: string;
}

export interface GetPropertyRatingReviewsPayload {
  propertyId: string;
  page?: number;
  limit?: number;
  q?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  sortBy?: "recommended" | "newest" | "oldest" | "highest" | "lowest";
  correlationId?: string;
}

export interface GetPropertyRatingReviewsResponse {
  success: boolean;
  summary: PropertyRatingReviewSummary;
  featureRatings: PropertyRatingReviewFeatureRatings;
  whatsGood: string[];
  whatsBad: string[];
  reviews: PropertyRatingReviewItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface EndUserPropertySummary {
  id: string;
  propertyName?: string;
  title?: string;
  address?: string;
  description?: string;
  imageUrl?: string;
  images?: EndUserPropertyMedia[];
  photos?: EndUserPropertyMedia[];
  videos?: EndUserPropertyMedia[];
  isFavorite?: boolean;
  city?: string | { id?: string; name?: string; code?: string; state?: string };
  locality?: string | { id?: string; name?: string; sector?: string; cityId?: string };
  category?: string | { id?: string; name?: string; code?: string };
  listingType?: string | { id?: string; name?: string; code?: string };
  propertyType?: string | { id?: string; name?: string; code?: string };
  bhkType?: string | { id?: string; name?: string; code?: string };
  society?: { id?: string; name?: string; address?: string; localityName?: string; cityId?: string };
  furnishType?: string;
  furnishingType?: string;
  constructionStatus?: string;
  price?: number | null;
  monthlyRent?: number | null;
  plotArea?: number | null;
  builtUpArea?: number | null;
  carpetArea?: number | null;
  facing?: string | null;
  postedBy?: string;
  owner?: {
    role?: string;
    [key: string]: unknown;
  };
  user?: {
    id?: string;
    name?: string;
    role?: string;
    [key: string]: unknown;
  };
  listingTypeId?: string;
  categoryId?: string;
  propertyTypeId?: string;
  bhkTypeId?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

type CsvParam = string | string[] | null | undefined;

/** Filter option item from GET /end-user/filters */
export interface EndUserFilterOption {
  id: string;
  name: string;
  code: string;
  icon?: string | null;
}

export interface GetEndUserFiltersPayload {
  listingTypeId?: string;
  categoryId?: string;
  propertyTypeId?: string;
  correlationId?: string;
}

export interface GetEndUserFiltersResponse {
  success?: boolean;
  listingTypes: EndUserFilterOption[];
  categories: EndUserFilterOption[];
  propertyTypes: EndUserFilterOption[];
  bhkTypes: EndUserFilterOption[];
  amenities: EndUserFilterOption[];
  furnishing: EndUserFilterOption[];
}

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

/** Similar property item from GET /end-user/properties/similar */
export interface SimilarProperty {
  id: string;
  title: string;
  address: string;
  imageUrl: string;
  propertyType: string;
  averageRating: number;
  totalReviews: number;
  price: number;
  priceType: "sale" | "rent";
  listedOn: string;
  possessionStatus: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  owner: {
    id: string;
    name: string;
    profileImage?: string | null;
    role?: string;
  };
  isFavorite?: boolean;
}

export interface GetSimilarPropertiesPayload {
  cityId: string;
  propertyTypeId?: string;
  limit?: number;
  correlationId?: string;
}

export interface GetSimilarPropertiesResponse {
  success: boolean;
  properties: SimilarProperty[];
  total: number;
}

export interface UpdateEndUserFavoritePayload {
  propertyId: string;
  correlationId?: string;
}

export interface UpdateEndUserFavoriteResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}

export interface SendPropertyContactOtpPayload {
  propertyId: string;
  phone: string;
  correlationId?: string;
}

export interface SendPropertyContactOtpResponse {
  success?: boolean;
  message?: string;
  otp?: string;
  sessionId?: string;
}

export interface SubmitPropertyContactPayload {
  propertyId: string;
  name: string;
  email?: string;
  phone: string;
  countryCode?: string;
  otp?: string;
  sessionId?: string;
  correlationId?: string;
}

export interface SubmitPropertyContactResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
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

/** GET /end-user/filters - list property filters for dropdowns */
export const getEndUserFiltersAction = async ({
  listingTypeId,
  categoryId,
  propertyTypeId,
  correlationId,
}: GetEndUserFiltersPayload): Promise<GetEndUserFiltersResponse> => {
  try {
    const response = await axiosInstance.get<GetEndUserFiltersResponse>(
      "end-user/filters",
      {
        params: {
          ...(listingTypeId ? { listingTypeId } : {}),
          ...(categoryId ? { categoryId } : {}),
          ...(propertyTypeId ? { propertyTypeId } : {}),
        },
        headers: {
          "x-correlation-id": correlationId ?? getCorrelationId(),
        },
      }
    );
    const data = response.data;
    return {
      success: data?.success ?? true,
      listingTypes: Array.isArray(data?.listingTypes) ? data.listingTypes : [],
      categories: Array.isArray(data?.categories) ? data.categories : [],
      propertyTypes: Array.isArray(data?.propertyTypes) ? data.propertyTypes : [],
      bhkTypes: Array.isArray(data?.bhkTypes) ? data.bhkTypes : [],
      amenities: Array.isArray(data?.amenities) ? data.amenities : [],
      furnishing: Array.isArray(data?.furnishing) ? data.furnishing : [],
    };
  } catch (error: unknown) {
    throw getErrorPayload(error);
  }
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
          // sortBy,
          // sortOrder,
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

export const getSimilarPropertiesAction = async ({
  cityId,
  propertyTypeId,
  limit = 10,
  correlationId,
}: GetSimilarPropertiesPayload): Promise<GetSimilarPropertiesResponse> => {
  try {
    const response = await axiosInstance.get<GetSimilarPropertiesResponse>(
      "end-user/properties/similar",
      {
        params: { cityId, propertyTypeId, limit },
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

export const addEndUserFavoriteAction = async ({
  propertyId,
  correlationId,
}: UpdateEndUserFavoritePayload): Promise<UpdateEndUserFavoriteResponse> => {
  try {
    const response = await axiosInstance.post<UpdateEndUserFavoriteResponse>(
      "end-user/favorites",
      { propertyId },
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

export const removeEndUserFavoriteAction = async ({
  propertyId,
  correlationId,
}: UpdateEndUserFavoritePayload): Promise<UpdateEndUserFavoriteResponse> => {
  try {
    const response = await axiosInstance.delete<UpdateEndUserFavoriteResponse>(
      "end-user/favorites",
      {
        data: { propertyId },
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

export const sendEndUserPropertyContactOtpAction = async ({
  propertyId,
  phone,
  correlationId,
}: SendPropertyContactOtpPayload): Promise<SendPropertyContactOtpResponse> => {
  try {
    const response = await axiosInstance.post<SendPropertyContactOtpResponse>(
      `end-user/properties/${propertyId}/contact/send-otp`,
      { phone },
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

export const submitEndUserPropertyContactAction = async ({
  propertyId,
  name,
  email,
  phone,
  countryCode,
  otp,
  sessionId,
  correlationId,
}: SubmitPropertyContactPayload): Promise<SubmitPropertyContactResponse> => {
  try {
    const response = await axiosInstance.post<SubmitPropertyContactResponse>(
      `end-user/properties/${propertyId}/contact`,
      {
        name,
        phone,
        ...(email ? { email } : {}),
        ...(countryCode ? { countryCode } : {}),
        ...(otp ? { otp } : {}),
      },
      {
        headers: {
          "x-correlation-id": correlationId ?? getCorrelationId(),
          ...(sessionId ? { "X-Session-Id": sessionId } : {}),
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    throw getErrorPayload(error);
  }
};

export const getPropertyRatingReviewsAction = async ({
  propertyId,
  page = 1,
  limit = 10,
  q,
  rating,
  sortBy = "recommended",
  correlationId,
}: GetPropertyRatingReviewsPayload): Promise<GetPropertyRatingReviewsResponse> => {
  try {
    const response = await axiosInstance.get<GetPropertyRatingReviewsResponse>(
      `end-user/properties/${propertyId}/rating-reviews`,
      {
        params: { page, limit, q, rating, sortBy },
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

/** POST /end-user/properties/{propertyId}/rating-review (submit or update review, logged-in users only) */
export interface SubmitPropertyRatingReviewPayload {
  propertyId: string;
  role?: string;
  connectivityRating: number;
  neighbourhoodRating: number;
  safetyRating: number;
  livabilityRating: number;
  likeText?: string;
  dislikeText?: string;
  correlationId?: string;
}

export interface SubmitPropertyRatingReviewResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}

export const submitPropertyRatingReviewAction = async ({
  propertyId,
  role,
  connectivityRating,
  neighbourhoodRating,
  safetyRating,
  livabilityRating,
  likeText,
  dislikeText,
  correlationId,
}: SubmitPropertyRatingReviewPayload): Promise<SubmitPropertyRatingReviewResponse> => {
  try {
    const response = await axiosInstance.post<SubmitPropertyRatingReviewResponse>(
      `end-user/properties/${propertyId}/rating-review`,
      {
        ...(role ? { role } : {}),
        connectivityRating,
        neighbourhoodRating,
        safetyRating,
        livabilityRating,
        ...(likeText != null && likeText !== "" ? { likeText } : {}),
        ...(dislikeText != null && dislikeText !== "" ? { dislikeText } : {}),
      },
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
