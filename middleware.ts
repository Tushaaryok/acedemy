import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Response object banao jo cookies handle kare
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // Supabase server client banao (middleware mein)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Session check karo
  const { data: { session } } = await supabase.auth.getSession()
  const url = request.nextUrl.clone()

  // ============================================================
  // 1. Login page - already logged in hain toh dashboard pe bhejo
  // ============================================================
  if (url.pathname === '/login') {
    if (session) {
      const { data: userData } = await supabase
        .from('users')
        .select('role, onboarding_completed')
        .eq('id', session.user.id)
        .single()

      // Onboarding adhoori hai toh wahan bhejo
      if (!userData?.onboarding_completed) {
        return NextResponse.redirect(new URL('/onboarding', request.url))
      }

      // Seedha dashboard
      return NextResponse.redirect(
        new URL(`/dashboard/${userData?.role || 'student'}`, request.url)
      )
    }
    return response
  }

  // ============================================================
  // 2. Onboarding page - login zaroori hai
  // ============================================================
  if (url.pathname.startsWith('/onboarding')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Agar onboarding complete ho chuki hai toh dashboard pe bhejo
    const { data: userData } = await supabase
      .from('users')
      .select('role, onboarding_completed')
      .eq('id', session.user.id)
      .single()

    if (userData?.onboarding_completed) {
      return NextResponse.redirect(
        new URL(`/dashboard/${userData.role}`, request.url)
      )
    }

    return response
  }

  // ============================================================
  // 3. Dashboard routes - protected + role-based access
  // ============================================================
  if (url.pathname.startsWith('/dashboard')) {
    // Login nahi kiya - login pe bhejo
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const { data: userData } = await supabase
      .from('users')
      .select('role, onboarding_completed')
      .eq('id', session.user.id)
      .single()

    // Onboarding complete nahi hui - wahan bhejo
    if (!userData?.onboarding_completed) {
      return NextResponse.redirect(new URL('/onboarding', request.url))
    }

    const role = userData?.role

    // Role-based protection - galat dashboard pe nahi jaane denge
    if (url.pathname.startsWith('/dashboard/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url))
    }
    if (url.pathname.startsWith('/dashboard/teacher') && role !== 'teacher') {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url))
    }
    if (url.pathname.startsWith('/dashboard/student') && role !== 'student') {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url))
    }

    return response
  }

  return response
}

export const config = {
  matcher: [
    '/login',
    '/onboarding/:path*',
    '/dashboard/:path*',
  ],
}
