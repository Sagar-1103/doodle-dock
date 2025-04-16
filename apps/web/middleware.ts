import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PUBLIC_ROUTES = ["/", "/signin"];
const PRIVATE_PREFIXES = ["/canvas/","/dashboard"];

export async function middleware(req: NextRequest) {
  const token = (await cookies()).get('jwtToken')?.value;
  const { pathname } = req.nextUrl;
  const isPublic = PUBLIC_ROUTES.includes(pathname);
  const isPrivate = PRIVATE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if(pathname==="/canvas"){
    return NextResponse.next();
  }

  if (!token && isPrivate) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && isPublic) {
    return NextResponse.next();
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (token && isPrivate) {
    return NextResponse.next();
  }

 
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/canvas/:path*",
    "/signin/:path*",
  ],
};