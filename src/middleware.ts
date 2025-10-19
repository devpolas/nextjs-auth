import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isToken = request.cookies.get("loginToken")?.value || "";

  const publicPaths = path === "/login" || path === "/signup";

  if (publicPaths && isToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!publicPaths && !isToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
export const config = {
  matcher: ["/", "/profile", "/profile/:path*", "/login", "/signup"],
};
