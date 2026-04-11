import { NextResponse } from "next/server";

const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;

const cookieOpts = (maxAge: number) => {
  const opts: Record<string, unknown> = {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
  if (COOKIE_DOMAIN) opts.domain = COOKIE_DOMAIN;
  return opts;
};

export async function POST(req: Request) {
  const { accessToken, refreshToken } = await req.json();

  const response = NextResponse.json({ message: "Tokens set" });

  response.cookies.set("accessToken", accessToken, cookieOpts(60 * 60));
  response.cookies.set("refreshToken", refreshToken, cookieOpts(60 * 60 * 24 * 7));

  return response;
}
