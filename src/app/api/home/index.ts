import { GetPropertyMasterDataResponse } from "@/services/homeService";

export const fetchPropertyMasterData = async (): Promise<GetPropertyMasterDataResponse> => {
  try {
    const baseUrl = process.env.API_URL;

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
