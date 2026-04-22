// app/api/v1/dashboard/student/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import type { ApiResponse } from '@/types';

/**
 * Aggregated dashboard data for the active scholar.
 */
export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // 1. Force dynamic / Build-time safety
    headers();
    if (process.env.NEXT_PHASE === 'phase-production-build' || (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production')) {
      return NextResponse.json({ success: true, data: {} as any });
    }

    // 2. Authenticate
    const user = await getUserFromRequest(req);

    // 3. Fetch Aggregate Data
    const [profile, enrollment, notices] = await Promise.all([
      prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          full_name: true,
          phone: true,
          role: true,
          plan: true,
          standard: true,
          stream: true,
          goal: true,
          avatar_url: true,
          streak: true,
          credits: true,
        },
      }),
      prisma.enrollment.findFirst({
        where: { student_id: user.id, status: 'active' },
        include: {
          batch: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      }),
      prisma.notice.findMany({
        where: {
          OR: [
            { batch_id: null }, // Global notices
            { batch_id: { in: await prisma.enrollment.findMany({ where: { student_id: user.id }, select: { batch_id: true } }).then(e => e.map(b => b.batch_id)) } }
          ]
        },
        orderBy: { created_at: 'desc' },
        take: 3,
      })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        profile,
        enrollment,
        notices,
      }
    }, { status: 200 });

  } catch (error) {
    console.error('[dashboard/student]', error);
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR' } }, { status: 500 });
  }
}
