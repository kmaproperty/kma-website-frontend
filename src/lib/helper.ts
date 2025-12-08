type ParamValue = string | number | boolean;
type ParamObject = Record<string, ParamValue | undefined | null>;

export function createURLSearchParam(
  key: string,
  value: ParamValue
): string;

export function createURLSearchParam(
  params: ParamObject
): string;

export function createURLSearchParam(
  arg1: string | ParamObject,
  arg2?: ParamValue
): string {
  const params = new URLSearchParams();

  if (typeof arg1 === "string" && arg2 !== undefined) {
    params.set(arg1, String(arg2));
  } else if (typeof arg1 === "object") {
    Object.entries(arg1).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        params.set(key, String(val));
      }
    });
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

export const setAuthCookies = async (accessToken: string, refreshToken: string) => {
  try{
    await fetch("/api/set-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken,
        refreshToken: refreshToken,
      }),
    });
  }catch(error){
    console.error("Failed to set auth cookies:", error);
  }
}

export const clearAuthCookies = async () => {
  try {
    await fetch("/api/clear-token", {
      method: "POST",
    });
  } catch (error) {
    console.error("Failed to clear cookies:", error);
  }
};