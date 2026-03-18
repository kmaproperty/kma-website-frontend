import {
  getEndUserPropertyDetailsAction,
  GetEndUserPropertyDetailsResponse,
} from "@/api/actions/propertyActions";
import { useQuery } from "@tanstack/react-query";
import { useSessionStore } from "@/store/useSessionStore";

interface UsePropertyDetailsParams {
  id?: string | null;
  enabled?: boolean;
}

export const usePropertyDetails = ({
  id,
  enabled = true,
}: UsePropertyDetailsParams) => {
  const sessionId = useSessionStore((s) => s.sessionId);

  return useQuery<GetEndUserPropertyDetailsResponse>({
    queryKey: ["end-user-property-details", id ?? null, sessionId],
    queryFn: () => getEndUserPropertyDetailsAction({ id: String(id) }),
    enabled: Boolean(id) && enabled,
    staleTime: 60_000,
    retry: (failureCount, error: unknown) => {
      // Don't retry if it's a view limit error
      if (
        error &&
        typeof error === "object" &&
        "requiresLogin" in error &&
        (error as { requiresLogin?: boolean }).requiresLogin === true
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
};
