"use client";

import { useEffect } from "react";

type CookieUser = { role?: string; name?: string };

function readKmaUserCookie(): CookieUser | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("kma_user="));
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw.slice("kma_user=".length));
    const parsed = JSON.parse(decoded);
    if (parsed && typeof parsed === "object") return parsed as CookieUser;
    return null;
  } catch {
    return null;
  }
}

function readStoredUser(): Record<string, unknown> | null {
  try {
    const raw = window.localStorage.getItem("user");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Keeps localStorage.user in sync with the shared `kma_user` cookie that is
 * scoped to `.kmaglobalproperty.com` so both buyer and seller subdomains can
 * see it. localStorage is origin-scoped so the two apps can drift; this
 * guard rehydrates or clears on mount and on focus/pageshow.
 *
 * Behaviour:
 *  - Cookie missing + localStorage.user exists → user was logged out on the
 *    other subdomain, wipe localStorage and reload so UI snaps to signed-out.
 *  - Cookie present + role differs from localStorage → other tab upgraded
 *    the role (e.g. END_USER → OWNER via Post Property handoff), refresh
 *    localStorage and reload so guards re-evaluate.
 */
export default function CookieSessionGuard() {
  useEffect(() => {
    const check = () => {
      if (typeof window === "undefined") return;

      const cookieUser = readKmaUserCookie();
      const stored = readStoredUser();

      if (!cookieUser) {
        if (stored) {
          window.localStorage.removeItem("user");
          window.location.reload();
        }
        return;
      }

      if (!stored || stored.role !== cookieUser.role) {
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            ...(stored ?? {}),
            role: cookieUser.role,
            ...(cookieUser.name ? { name: cookieUser.name } : {}),
          }),
        );
        window.location.reload();
      }
    };

    check();
    window.addEventListener("focus", check);
    window.addEventListener("pageshow", check);
    return () => {
      window.removeEventListener("focus", check);
      window.removeEventListener("pageshow", check);
    };
  }, []);

  return null;
}
