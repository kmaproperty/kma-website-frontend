import { CitiesPayload, CitiesResponse, GetPropertyMasterDataResponse } from "@/services/homeService";

export const fetchPropertyMasterData = async (): Promise<GetPropertyMasterDataResponse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(
      `${baseUrl}/end-user/property-master-data`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache", // or 'no-store' if dynamic
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: GetPropertyMasterDataResponse = await response.json();

    if (result.success) {
      return result;
    }

    return null;
  } catch (error) {
    console.error("Property Master Data Error", error);
    return error;
  }
};

export const fetchPropertyCitiesData = async (): Promise<CitiesResponse> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(
      `${baseUrl}/end-user/home/cities`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache", // or 'no-store' if dynamic
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: CitiesResponse = await response.json();

    if (result.success) {
      return result;
    }

    return null;
  } catch (error) {
    console.error("Property Master Data Error", error);
    return error;
  }
};
