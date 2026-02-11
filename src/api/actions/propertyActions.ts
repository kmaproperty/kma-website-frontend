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

const getCorrelationId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
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
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};
