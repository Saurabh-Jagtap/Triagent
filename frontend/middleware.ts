import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

const AUTH_PAGES = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasSession = !!request.cookies.get(
    "better-auth.session_token"
  );

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthPage = AUTH_PAGES.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // User is not authenticated and trying to access a protected route
  if (!hasSession && !isPublicRoute) {
    return NextResponse.redirect(
      new URL("/signin", request.url)
    );
  }

  // User is already authenticated and trying to visit auth pages
  if (hasSession && isAuthPage) {
    return NextResponse.redirect(
      new URL("/assistant", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Skip:
     * - API routes
     * - Next.js internals
     * - Static assets
     * - Images
     * - favicon
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};