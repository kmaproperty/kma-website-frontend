import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const accessToken = req.cookies.get("accessToken")?.value;
  console.log('accesstoken', accessToken, path)
  
  const publicPaths = ["/signup", "/verify-otp", "/kyc"];
  if ( publicPaths.includes(path)) {
    return NextResponse.next();
  }

  if(!accessToken){
    return NextResponse.redirect(new URL("/signup", req.url));
  }
  return NextResponse.next();
} 

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$).*)'],
} 