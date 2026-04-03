import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const profileIncomplete = req.cookies.get("profileIncomplete")?.value === "true";

  const isHomePage = pathname === "/";
  const isAbooutUsPage = pathname === "/about-us";
  const verifyProperty = pathname === "/verify-post-property";
  const isProjectsPage = pathname === "/projects" || pathname.startsWith("/projects/");
  const isUserFlowPage = pathname === "/user-flow";
  const isRecentlyViewedPage = pathname === "/recently-viewed";
  const isContactUsPage = pathname === '/contact-us';
  const isHelpCenterPage = pathname === '/help-center';
  const isJoinUsPage = pathname === '/join-us';
  const isProfilePage = pathname === "/profile";
  const isReferAndEarnPage = pathname === "/refer-and-earn";
  const isChannelPartnerPage =
    pathname === "/channel-partner" || pathname.startsWith("/channel-partner/");
  const event = searchParams.get('event')
  const isLegacySignupPage =
    pathname === "/signup" ||
    pathname === "/verify-otp";

  // Pages that require auth (post-OTP account creation flow)
  const isAccountCreationPage =
    pathname === "/create-account" ||
    pathname === "/additional-details";

  // Public pages (no login required) — always accessible
  if (
    isHomePage ||
    isAbooutUsPage ||
    verifyProperty ||
    isProjectsPage ||
    isUserFlowPage ||
    isRecentlyViewedPage ||
    isContactUsPage ||
    isHelpCenterPage ||
    isJoinUsPage ||
    isProfilePage ||
    isReferAndEarnPage ||
    isChannelPartnerPage
  ) {
    return NextResponse.next();
  }

  // Legacy signup routes redirect to user-flow.
  if (isLegacySignupPage) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/user-dashboard", req.url));
    }
    return NextResponse.redirect(new URL("/user-flow?isLogin=true", req.url));
  }

  // Account creation pages: require auth (user just verified OTP)
  if (isAccountCreationPage) {
    if (accessToken) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/user-flow?postProperty=true", req.url));
  }

  // If profile is incomplete (Owner/CP verified OTP but didn't fill details),
  // don't let them access protected pages — clear cookies and send to home
  if (accessToken && profileIncomplete) {
    const response = NextResponse.redirect(new URL("/", req.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    response.cookies.delete("profileIncomplete");
    return response;
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
