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

  // If profile is incomplete (Owner/CP verified OTP but didn't fill details),
  // force them to /create-account — don't let them access anything else
  if (accessToken && profileIncomplete) {
    if (isAccountCreationPage) {
      return NextResponse.next();
    }
    // Redirect to create-account — don't let them go anywhere else
    return NextResponse.redirect(new URL("/create-account", req.url));
  }

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
