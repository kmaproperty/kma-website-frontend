const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/**
 * Same rules as `getStoredUserRole` in the header store: role only if `user` in localStorage
 * has a non-empty name (incomplete profiles are treated as logged out for UI).
 */
export function getSessionUserRoleFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem("user");
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return null;
    if (!parsed.name || (typeof parsed.name === "string" && !parsed.name.trim())) return null;
    if (typeof parsed.role === "string") return parsed.role;
    return null;
  } catch {
    return null;
  }
}

/**
 * Refer & Earn is available to any logged-in KMA account (User, Owner, or Channel Partner).
 */
export function isReferralSessionActive(userRole: string | null | undefined): boolean {
  return Boolean(userRole);
}
