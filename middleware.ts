import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_32char_min');

/**
 * High-fidelity authentication middleware.
 * Orchestrates token verification and role-based header injection.
 */
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value || 
                request.headers.get('authorization')?.split(' ')[1];

  // Shield all API v1 and Dashboard routes except public auth paths
  const isProtectedPath = request.nextUrl.pathname.startsWith('/api/v1/') || 
                          request.nextUrl.pathname.startsWith('/dashboard');
  
  const isPublicAuth = request.nextUrl.pathname.includes('/auth/otp') || 
                       request.nextUrl.pathname.includes('/auth/login');

  if (isProtectedPath && !isPublicAuth) {
    if (!token) {
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json({ success: false, error: { code: 'UNAUTHORIZED' } }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      
      // Inject user metadata into request headers for downstream consumption
      const response = NextResponse.next();
      response.headers.set('x-user-id', payload.userId as string);
      response.headers.set('x-user-role', payload.role as string);
      response.headers.set('x-user-plan', payload.plan as string);
      
      return response;
    } catch (err) {
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json({ success: false, error: { code: 'INVALID_TOKEN' } }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/v1/:path*',
    '/dashboard/:path*',
  ],
};
