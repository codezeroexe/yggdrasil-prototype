import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, decodeSession } from "./lib/session";

const PROTECTED = ["/dashboard", "/tasks", "/scoreboard", "/briefing", "/realms"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = decodeSession(request.cookies.get(SESSION_COOKIE)?.value);

  // Signed-in cells skip the onboarding gate entirely.
  if (pathname === "/" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const needsSession =
    pathname === "/" ? false : PROTECTED.some((p) => pathname.startsWith(p));

  if (needsSession && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/admin")) {
    if (!session) return NextResponse.redirect(new URL("/", request.url));
    if (!session.admin)
      return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/tasks/:path*",
    "/scoreboard/:path*",
    "/briefing/:path*",
    "/realms/:path*",
    "/admin/:path*",
  ],
};
