import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isHomePage = pathname === "/";
  const isAbooutUsPage = pathname === "/about-us";
  const verifyProperty = pathname === "/verify-post-property";
  const isProjectsPage = pathname === "/projects" || pathname.startsWith("/projects/");
  const isUserFlowPage = pathname === "/user-flow";
  const isRecentlyViewedPage = pathname === "/recently-viewed";
  const isContactUsPage = pathname === '/contact-us';
  const isHelpCenterPage = pathname === '/help-center';
  const isJoinUsPage = pathname === '/join-us';
  const event = searchParams.get('event')
  const isLegacySignupPage =
    pathname === "/signup" ||
    pathname === "/create-account" ||
    pathname === "/verify-otp" ||
    pathname === "/additional-details";

  // Public pages (no login required)
  if (
    isHomePage ||
    isAbooutUsPage ||
    verifyProperty ||
    isProjectsPage ||
    isUserFlowPage ||
    isRecentlyViewedPage ||
    isContactUsPage ||
    isHelpCenterPage ||
    isJoinUsPage
  ) {
    return NextResponse.next();
  }

  // Legacy signup routes should never be used anymore.
  if (isLegacySignupPage) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/user-dashboard", req.url));
    }
    return NextResponse.redirect(new URL("/user-flow?isLogin=true", req.url));
  }

  // Allow logged-in users to stay in user-flow.
  // This prevents "user-flow" login from being forced to /user-dashboard.
  if (accessToken && isUserFlowPage) {
    return NextResponse.next();
  }

  // Protect all remaining routes: unauthenticated users must enter via user-flow (login).
  if (!accessToken && !event) {
    return NextResponse.redirect(new URL('/user-flow?isLogin=true', req.url));
  }

  return NextResponse.next();
} 

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$.*|.*\\.jpg$).*)'],
} 