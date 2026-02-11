import {
  EndUserPropertyDetails,
  getEndUserPropertyDetailsAction,
  GetEndUserPropertyDetailsResponse,
} from "@/api/actions/propertyActions";
import { useQuery } from "@tanstack/react-query";

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
    EndUserPropertyDetails | null
  >({
    queryKey: ["end-user-property-details", id ?? null],
    queryFn: () => getEndUserPropertyDetailsAction({ id: String(id) }),
    select: (response) => response?.property ?? response?.data ?? null,
    enabled: Boolean(id) && enabled,
    staleTime: 60_000,
  });
};
