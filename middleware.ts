import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from './lib/auth';

const publicRoutes = ['/login', '/'];
const userRoutes = ['/dashboard'];
const adminRoutes = ['/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-session')?.value;

  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith('/_next') || pathname.startsWith('/api/auth')
  );

  if (pathname.startsWith('/certificates/') || pathname.includes('.')) {
    return NextResponse.next();
  }

  let session = null;
  if (token) {
    session = await verifySession(token);
  }

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session) {
    if (pathname === '/login') {
      const redirectUrl = session.role === 'admin' ? '/admin' : '/dashboard';
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
    const isUserRoute = userRoutes.some(route => pathname.startsWith(route));

    if (isAdminRoute && session.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (isUserRoute && session.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
