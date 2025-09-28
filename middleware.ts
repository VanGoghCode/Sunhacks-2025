import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protected routes
  const protectedRoutes = ['/dashboard', '/amazon/dashboard', '/marketplace'];
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // Check if user is logged in by looking for a user in localStorage
    // Note: We can't access localStorage in middleware, so we'll rely on client-side protection
    // This middleware serves as an additional layer but the main protection is client-side
    
    // In a real app, you would check for authentication cookies/tokens here
    // For this demo, we'll let the client-side protection handle it
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/amazon/:path*', '/marketplace/:path*']
};