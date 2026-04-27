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
  listingType?: "sale" | "rent";
  sort?: "newest" | "oldest" | "price_high" | "price_low";
  enabled?: boolean;
}

export function useRecentlyViewedProperties({
  page = 1,
  limit = 20,
  listingType,
  sort,
  enabled = true,
}: UseRecentlyViewedPropertiesParams = {}) {
  const sessionId = useSessionStore((state) => state.sessionId);
  // Wait for the persisted session to rehydrate from localStorage before
  // firing. Otherwise the first call goes out with sessionId=null and the
  // backend returns an empty list, leaving the UI stuck at "0 of 0".
  const hasHydrated = useSessionStore((state) => state._hasHydrated);

  const query = useQuery<GetRecentlyViewedResponse>({
    queryKey: [RECENTLY_VIEWED_QUERY_KEY, page, limit, listingType ?? null, sort ?? null, sessionId ?? null],
    queryFn: () =>
      getRecentlyViewedAction({
        page,
        limit,
        listingType,
        sort,
        xSessionId: sessionId ?? undefined,
      }),
    enabled: enabled && hasHydrated,
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
