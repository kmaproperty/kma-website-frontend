import { NextResponse, NextRequest } from "next/server";

// Decode JWT payload without a library (base64url → JSON)
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// Routes that only OWNER and CHANNEL_PARTNER should access
const SELLER_ONLY_ROUTES = [
  "/user-dashboard",
  "/my-listing",
  "/post-property",
  "/kyc",
  "/sign-document",
  "/document-signed-success",
  "/lead-summary",
];

function isSellerOnlyRoute(pathname: string): boolean {
  return SELLER_ONLY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

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
  const isProfilePage = pathname === "/profile";
  const isReferAndEarnPage = pathname === "/refer-and-earn" || pathname.startsWith("/refer-and-earn/");
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

  // Protect all remaining routes: unauthenticated users must enter via user-flow (login).
  if (!accessToken && !event) {
    return NextResponse.redirect(new URL('/user-flow?isLogin=true', req.url));
  }

  // Role-based protection: block END_USER from seller-only routes
  if (accessToken && isSellerOnlyRoute(pathname)) {
    const payload = decodeJwtPayload(accessToken);
    const role = payload?.role as string | undefined;
    if (role === "END_USER" || role === "USER") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$.*|.*\\.jpg$).*)'],
}
