import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;

  const isPublicPage =
    pathname === "/" ||
    pathname === "/about-us" ||
    pathname === "/projects" || pathname.startsWith("/projects/") ||
    pathname === "/user-flow" ||
    pathname === "/recently-viewed" ||
    pathname === "/contact-us" ||
    pathname === "/help-center" ||
    pathname === "/join-us" ||
    pathname === "/profile" ||
    pathname === "/refer-and-earn" || pathname.startsWith("/refer-and-earn/") ||
    pathname === "/channel-partner" || pathname.startsWith("/channel-partner/") ||
    pathname === "/sales-enquiry" ||
    pathname === "/meet-the-team";

  // Pages that require auth (post-OTP account creation flow)
  const isAccountCreationPage =
    pathname === "/create-account" ||
    pathname === "/additional-details";

  const isLegacySignupPage =
    pathname === "/signup" ||
    pathname === "/verify-otp";

  // Public pages — allow without auth
  if (isPublicPage) {
    return NextResponse.next();
  }

  // Legacy signup routes redirect to user-flow
  if (isLegacySignupPage) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.redirect(new URL("/user-flow?isLogin=true", req.url));
  }

  // Account creation pages: require auth (user just verified OTP)
  if (isAccountCreationPage) {
    if (accessToken) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/user-flow?isLogin=true", req.url));
  }

  // All remaining routes require auth
  if (!accessToken) {
    return NextResponse.redirect(new URL("/user-flow?isLogin=true", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$.*|.*\\.jpg$).*)",
  ],
};
