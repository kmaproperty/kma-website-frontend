import { NextResponse } from "next/server";

const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN || undefined;

export async function POST(req) {
  const { accessToken, refreshToken } = await req.json();

  const response = NextResponse.json({ message: "Tokens set" });

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
    ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    ...(COOKIE_DOMAIN ? { domain: COOKIE_DOMAIN } : {}),
  });

  return response;
}
