import { NextResponse } from "next/server";

const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;

function buildCookie(name: string, value: string, maxAge: number): string {
  let cookie = `${name}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
  if (COOKIE_DOMAIN) cookie += `; Domain=${COOKIE_DOMAIN}`;
  return cookie;
}

export async function POST(req: Request) {
  const { accessToken, refreshToken } = await req.json();

  const response = NextResponse.json({ message: "Tokens set" });
  response.headers.append("Set-Cookie", buildCookie("accessToken", accessToken, 60 * 60));
  response.headers.append("Set-Cookie", buildCookie("refreshToken", refreshToken, 60 * 60 * 24 * 7));

  return response;
}
