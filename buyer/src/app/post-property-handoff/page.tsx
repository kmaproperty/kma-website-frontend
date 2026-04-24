"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { setAuthCookies } from "@/lib/helper";
import { upgradeToOwnerApiHandler } from "@/services/userService";

const SELLER_URL = process.env.NEXT_PUBLIC_SELLER_URL ?? "https://seller.kmaglobalproperty.com";
const SELLER_TARGET = `${SELLER_URL.replace(/\/$/, "")}/post-property`;

/**
 * Bridge page between buyer and seller for the "Post Property" CTA.
 *
 * Expected entry points:
 *  - Logged-in END_USER clicks Post Property → lands here → we upgrade the
 *    row to OWNER, write fresh cookies on `.kmaglobalproperty.com`, and
 *    send the user to the seller's post-property screen.
 *  - Logged-in OWNER/CP already → upgrade endpoint no-ops and just refreshes
 *    tokens so the seller app gets a warm session.
 *  - Not logged in → bounce to `/user-flow?isLogin=true` with this page as
 *    the redirect so the user comes back after OTP and finishes the handoff.
 */
export default function PostPropertyHandoffPage() {
  const router = useRouter();
  const ranRef = useRef(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const run = async () => {
      const hasSession =
        typeof document !== "undefined" &&
        document.cookie.split(";").some((c) => c.trim().startsWith("kma_user="));

      if (!hasSession) {
        router.replace("/user-flow?isLogin=true&redirect=/post-property-handoff");
        return;
      }

      try {
        const response = await upgradeToOwnerApiHandler();
        await setAuthCookies(response.accessToken, response.refreshToken);
        if (typeof window !== "undefined" && response.user) {
          window.localStorage.setItem("user", JSON.stringify(response.user));
        }
        window.location.href = SELLER_TARGET;
      } catch (error: any) {
        const message =
          typeof error?.message === "string"
            ? error.message
            : "Something went wrong while preparing your Post Property flow. Please try again.";
        setErrorMessage(message);
      }
    };

    run();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
        {errorMessage ? (
          <>
            <h1 className="text-lg font-semibold text-text-black">Handoff failed</h1>
            <p className="mt-3 text-sm text-text-gray">{errorMessage}</p>
            <button
              type="button"
              onClick={() => router.replace("/")}
              className="mt-6 rounded-xl border border-border px-6 py-2 text-sm font-medium text-text-black hover:bg-[#F8F8F9]"
            >
              Back to home
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#D0D5DD] border-t-[#05085E]" />
            <h1 className="mt-5 text-lg font-semibold text-text-black">Preparing Post Property…</h1>
            <p className="mt-2 text-sm text-text-gray">
              Upgrading your account and opening the seller dashboard.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
