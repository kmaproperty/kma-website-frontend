import {
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
  return useQuery<GetEndUserPropertyDetailsResponse>({
    queryKey: ["end-user-property-details", id ?? null],
    queryFn: () => getEndUserPropertyDetailsAction({ id: String(id) }),
    enabled: Boolean(id) && enabled,
    staleTime: 60_000,
  });
};
