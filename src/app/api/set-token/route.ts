import { NextResponse } from "next/server";

export async function POST(req) {
  const { accessToken, refreshToken } = await req.json();

  const response = NextResponse.json({ message: "Tokens set" });

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
