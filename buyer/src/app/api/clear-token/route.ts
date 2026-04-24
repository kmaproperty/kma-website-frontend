import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Cookies cleared" });

  response.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    path: "/",
  });

  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
