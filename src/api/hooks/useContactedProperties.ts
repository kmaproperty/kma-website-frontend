import {
  getContactedPropertiesAction,
  GetContactedPropertiesResponse,
} from "@/api/actions/propertyActions";
import { useSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";

export const CONTACTED_PROPERTIES_QUERY_KEY = "end-user-contacted-properties";

interface UseContactedPropertiesParams {
  page?: number;
  limit?: number;
  enabled?: boolean;
}

export function useContactedProperties({
  page = 1,
  limit = 20,
  enabled = true,
}: UseContactedPropertiesParams = {}) {
  const sessionId = useSessionStore((state) => state.sessionId);

  const query = useQuery<GetContactedPropertiesResponse>({
    queryKey: [CONTACTED_PROPERTIES_QUERY_KEY, page, limit, sessionId ?? null],
    queryFn: () =>
      getContactedPropertiesAction({
        page,
        limit,
        xSessionId: sessionId ?? undefined,
      }),
    enabled,
    staleTime: 60_000,
  });

  return {
    ...query,
    properties: query.data?.properties ?? [],
    total: query.data?.total ?? 0,
    totalPages: query.data?.totalPages ?? 1,
    currentPage: query.data?.page ?? page,
  };
}
