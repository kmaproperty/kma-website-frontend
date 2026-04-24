import { NextResponse, NextRequest } from "next/server";

const SELLER_URL =
  process.env.NEXT_PUBLIC_SELLER_URL || "https://seller.kmaglobalproperty.com";

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // All seller-owned paths redirect to the seller domain.
  const sellerPathPrefixes = [
    "/additional-details",
    "/create-account",
    "/document-signed-success",
    "/kyc",
    "/lead-summary",
    "/my-listing",
    "/post-property",
    "/sign-document",
    "/signup",
    "/user-dashboard",
    "/verify-otp",
    "/verify-post-property",
  ];
  if (sellerPathPrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    const target = new URL(
      `${SELLER_URL}${pathname}${req.nextUrl.search}`,
    );
    return NextResponse.redirect(target);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$.*|.*\\.jpg$).*)'],
}
