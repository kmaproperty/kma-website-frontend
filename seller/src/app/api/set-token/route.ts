import { NextResponse } from "next/server";

const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = Buffer.from(base64, "base64").toString();
    return JSON.parse(json);
  } catch { return null; }
}

function buildCookie(name: string, value: string, maxAge: number, httpOnly = true): string {
  let cookie = `${name}=${value}; Path=/; Max-Age=${maxAge}; Secure; SameSite=Lax`;
  if (httpOnly) cookie += "; HttpOnly";
  if (COOKIE_DOMAIN) cookie += `; Domain=${COOKIE_DOMAIN}`;
  return cookie;
}

export async function POST(req: Request) {
  const { accessToken, refreshToken } = await req.json();

  const response = NextResponse.json({ message: "Tokens set" });
  response.headers.append("Set-Cookie", buildCookie("accessToken", accessToken, 60 * 60));
  response.headers.append("Set-Cookie", buildCookie("refreshToken", refreshToken, 60 * 60 * 24 * 7));

  // Set JS-readable kma_user cookie so buyer app header can detect logged-in user
  const payload = decodeJwtPayload(accessToken);
  if (payload?.role) {
    const userObj = encodeURIComponent(JSON.stringify({
      role: payload.role,
      name: payload.name || "",
    }));
    response.headers.append("Set-Cookie", buildCookie("kma_user", userObj, 60 * 60, false));
  }

  return response;
}
