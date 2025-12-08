import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const accessToken = req.cookies.get("accessToken")?.value;
  console.log('accesstoken', accessToken, path)
  if (!accessToken && path != '/signup' && path != '/verify-otp') {
    return NextResponse.redirect(new URL("/signup", req.url));
  }
  return NextResponse.next();
} 

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$).*)'],
} 