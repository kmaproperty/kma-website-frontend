import { NextResponse } from "next/server";

const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;

const clearOpts = () => {
  const opts: Record<string, unknown> = {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    path: "/",
  };
  if (COOKIE_DOMAIN) opts.domain = COOKIE_DOMAIN;
  return opts;
};

export async function POST() {
  const response = NextResponse.json({ message: "Cookies cleared" });

  response.cookies.set("accessToken", "", clearOpts());
  response.cookies.set("refreshToken", "", clearOpts());
  response.cookies.set("kma_user", "", { ...clearOpts(), httpOnly: false });

  return response;
}
