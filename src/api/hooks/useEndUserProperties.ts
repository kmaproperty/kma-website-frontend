import {
  EndUserPropertySummary,
  getEndUserPropertiesAction,
  getEndUserPropertiesCountAction,
  GetEndUserPropertiesCountResponse,
  GetEndUserPropertiesPayload,
  GetEndUserPropertiesResult,
} from "@/api/actions/propertyActions";
import { useSessionStore } from "@/store/useSessionStore";
import { useQuery } from "@tanstack/react-query";

interface UseEndUserPropertiesOptions {
  enabled?: boolean;
}

type EndUserPropertiesQueryParams = Omit<
  GetEndUserPropertiesPayload,
  "xSessionId" | "correlationId"
>;

export type EndUserPropertiesListResult = {
  list: EndUserPropertySummary[];
  totalCountFromHeader?: number;
};

export const useEndUserProperties = (
  params: EndUserPropertiesQueryParams = {},
  options: UseEndUserPropertiesOptions = {}
) => {
  const sessionId = useSessionStore((state) => state.sessionId);

  return useQuery<
    GetEndUserPropertiesResult,
    unknown,
    EndUserPropertiesListResult
  >({
    queryKey: ["end-user-properties", params, sessionId ?? null],
    queryFn: () =>
      getEndUserPropertiesAction({
        ...params,
        xSessionId: sessionId ?? undefined,
      }),
    select: (response) => {
      const res = response as GetEndUserPropertiesResult;
      const list = Array.isArray(response)
        ? response
        : ((res as { properties?: EndUserPropertySummary[] }).properties ??
           (res as { data?: EndUserPropertySummary[] }).data ??
           []);
      const totalCountFromHeader = res._totalCountHeader;
      return { list, totalCountFromHeader };
    },
    enabled: options.enabled ?? true,
    staleTime: 60_000,
  });
};

export const useEndUserPropertiesCount = (
  params: EndUserPropertiesQueryParams = {},
  options: UseEndUserPropertiesOptions = {}
) => {
  const sessionId = useSessionStore((state) => state.sessionId);

  return useQuery<GetEndUserPropertiesCountResponse, unknown, number>({
    queryKey: ["end-user-properties-count", params, sessionId ?? null],
    queryFn: () =>
      getEndUserPropertiesCountAction({
        ...params,
        xSessionId: sessionId ?? undefined,
      }),
    select: (response) => response?.count ?? 0,
    enabled: options.enabled ?? true,
    staleTime: 60_000,
  });
};

