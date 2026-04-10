import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Cross-app auth: seller passes tokens via URL params
  const tokenParam = searchParams.get("_token");
  const refreshParam = searchParams.get("_refresh");
  const roleParam = searchParams.get("_role");
  const nameParam = searchParams.get("_name");
  if (tokenParam) {
    const cleanUrl = req.nextUrl.clone();
    cleanUrl.searchParams.delete("_token");
    cleanUrl.searchParams.delete("_refresh");
    cleanUrl.searchParams.delete("_role");
    cleanUrl.searchParams.delete("_name");
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set("accessToken", tokenParam, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });
    if (refreshParam) {
      response.cookies.set("refreshToken", refreshParam, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    // Store user info in a JS-readable cookie so the header can pick it up
    if (roleParam) {
      const userObj = JSON.stringify({ role: roleParam, name: nameParam || "" });
      response.cookies.set("kma_user", userObj, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
      });
    }
    return response;
  }

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
