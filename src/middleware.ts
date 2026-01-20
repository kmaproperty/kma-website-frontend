import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  console.log('accesstoken', accessToken,refreshToken, pathname, searchParams.get('event'))

  const isHomePage = pathname === "/";
  const isAbooutUsPage = pathname === "/about-us";
  const isSignupPage = pathname === '/signup';
  const isVerifyOtpPage = pathname === '/verify-otp';
  const event = searchParams.get('event')

   if (isHomePage || isAbooutUsPage) {
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