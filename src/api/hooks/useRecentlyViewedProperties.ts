import {
  getRecentlyViewedAction,
  GetRecentlyViewedResponse,
} from "@/api/actions/propertyActions";
import { useSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";

export const RECENTLY_VIEWED_QUERY_KEY = "end-user-recently-viewed";

interface UseRecentlyViewedPropertiesParams {
  page?: number;
  limit?: number;
  enabled?: boolean;
}

export function useRecentlyViewedProperties({
  page = 1,
  limit = 20,
  enabled = true,
}: UseRecentlyViewedPropertiesParams = {}) {
  const sessionId = useSessionStore((state) => state.sessionId);

  const query = useQuery<GetRecentlyViewedResponse>({
    queryKey: [RECENTLY_VIEWED_QUERY_KEY, page, limit, sessionId ?? null],
    queryFn: () =>
      getRecentlyViewedAction({
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
