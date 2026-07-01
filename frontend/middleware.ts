import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Grab the token
  const token = request.cookies.get('token')?.value; 
  const { pathname } = request.nextUrl;

  // 2. Define your protected routes (matching your matcher list)
  const protectedRoutes = ['/dashboard', '/assistant', '/calendar', '/connect', '/inbox', '/settings'];

  // 3. Check if the current path matches or starts with any protected route
  const isProtected = protectedRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));

  // 4. Fallback Redirect Logic: If trying to access a protected route without a token
  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    // Passing the callbackUrl allows you to redirect them back here after a successful login
    loginUrl.searchParams.set('callbackUrl', pathname);
    
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 5. Explicitly match exact routes AND their sub-paths
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/assistant/:path*',
    '/calendar/:path*',
    '/connect/:path*',
    '/inbox/:path*',
    '/settings/:path*'
  ], 
};