import { NextResponse } from "next/server";

const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || undefined;

export async function POST() {
  const response = NextResponse.json({ message: "Cookies cleared" });

  response.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    path: "/",
    ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
  });

  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    path: "/",
    ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
  });

  // Also clear kma_user cookie
  response.cookies.set("kma_user", "", {
    httpOnly: false,
    secure: true,
    expires: new Date(0),
    path: "/",
    ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
  });

  return response;
}
