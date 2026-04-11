import { NextResponse, NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://15.207.193.17:3000";

export async function middleware(req: NextRequest) {
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

    let finalAccessToken = tokenParam;
    let finalRefreshToken = refreshParam || "";
    const originalRole = roleParam || "";
    const originalName = nameParam || "";

    // Owner/CP arriving from seller: swap for END_USER tokens so all buyer APIs work
    if (roleParam === "OWNER" || roleParam === "CHANNEL_PARTNER") {
      try {
        const res = await fetch(`${BACKEND_URL}/end-user/cross-app-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: tokenParam }),
        });
        if (res.ok) {
          const data = await res.json();
          finalAccessToken = data.accessToken;
          finalRefreshToken = data.refreshToken;
        }
      } catch {
        // If swap fails, fall through with original tokens
      }
    }

    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set("accessToken", finalAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });
    if (finalRefreshToken) {
      response.cookies.set("refreshToken", finalRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    // Store user info in JS-readable cookie — keep ORIGINAL role so UI shows "Seller Dashboard"
    // crossApp flag tells the header to use end-user/profile API (since token is END_USER)
    if (originalRole) {
      const isCrossApp = originalRole === "OWNER" || originalRole === "CHANNEL_PARTNER";
      const userObj = JSON.stringify({ role: originalRole, name: originalName, ...(isCrossApp ? { crossApp: true } : {}) });
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
