import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('adminToken'); // or get it from headers if you're using headers for authentication

  // Check if the token is present
  if (!token && request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', request.url)); // Redirect to login
  }

  return NextResponse.next(); // Proceed to the requested page
}

// Optional: Define the routes for which middleware should run
export const config = {
  matcher: ['/admin/:path*'], // Apply this middleware to all admin routes
};