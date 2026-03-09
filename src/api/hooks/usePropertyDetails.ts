import {
  EndUserPropertyDetails,
  getEndUserPropertyDetailsAction,
  GetEndUserPropertyDetailsResponse,
  PropertyDetailsChannelPartner,
  PropertyDetailsLocation,
} from "@/api/actions/propertyActions";
import { useQuery } from "@tanstack/react-query";

export type PropertyDetailsWithLocation = EndUserPropertyDetails & {
  location?: PropertyDetailsLocation;
  channelPartnerDetails?: PropertyDetailsChannelPartner | null;
};

interface UsePropertyDetailsParams {
  id?: string | null;
  enabled?: boolean;
}

export const usePropertyDetails = ({
  id,
  enabled = true,
}: UsePropertyDetailsParams) => {
  return useQuery<
    GetEndUserPropertyDetailsResponse,
    unknown,
    PropertyDetailsWithLocation | null
  >({
    queryKey: ["end-user-property-details", id ?? null],
    queryFn: () => getEndUserPropertyDetailsAction({ id: String(id) }),
    select: (response) => {
      const prop = response?.property ?? response?.data ?? null;
      if (!prop) return null;
      return {
        ...prop,
        location: response?.location,
        channelPartnerDetails: response?.channelPartnerDetails ?? null,
      };
    },
    enabled: Boolean(id) && enabled,
    staleTime: 60_000,
  });
};
