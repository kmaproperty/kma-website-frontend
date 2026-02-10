import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isHomePage = pathname === "/";
  const isAbooutUsPage = pathname === "/about-us";
  const verifyProperty = pathname === "/verify-post-property";
  const isProjectsPage = pathname === "/projects" || pathname.startsWith("/projects/");
  const isSignupPage = pathname === '/signup';
  const isVerifyOtpPage = pathname === '/verify-otp';
  const event = searchParams.get('event')

  // Public pages (no login required)
  if (isHomePage || isAbooutUsPage || verifyProperty || isProjectsPage) {
    return NextResponse.next();
  }

  if (accessToken && (isSignupPage || isVerifyOtpPage)) {
    return NextResponse.redirect(new URL('/user-dashboard', req.url));
  }

  if (!accessToken && !isSignupPage && !isVerifyOtpPage && !event) {
    return NextResponse.redirect(new URL('/signup', req.url));
  }

  return NextResponse.next();
} 

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$.*|.*\\.jpg$).*)'],
} 