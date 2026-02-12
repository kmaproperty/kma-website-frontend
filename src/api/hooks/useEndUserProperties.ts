import {
  EndUserPropertySummary,
  getEndUserPropertiesAction,
  getEndUserPropertiesCountAction,
  GetEndUserPropertiesCountResponse,
  GetEndUserPropertiesPayload,
  GetEndUserPropertiesResponse,
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

export const useEndUserProperties = (
  params: EndUserPropertiesQueryParams = {},
  options: UseEndUserPropertiesOptions = {}
) => {
  const sessionId = useSessionStore((state) => state.sessionId);

  return useQuery<
    GetEndUserPropertiesResponse | EndUserPropertySummary[],
    unknown,
    EndUserPropertySummary[]
  >({
    queryKey: ["end-user-properties", params, sessionId ?? null],
    queryFn: () =>
      getEndUserPropertiesAction({
        ...params,
        // xSessionId: sessionId ?? undefined,
      }),
    select: (response) => {
      if (Array.isArray(response)) {
        return response;
      }
      return response?.properties ?? response?.data ?? [];
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

