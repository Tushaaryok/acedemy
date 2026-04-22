
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import type { ApiResponse } from '@/types';

/**
 * Tactical overview for Teaching Faculty.
 */
export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // 1. Build-time safety
    headers();
    if (process.env.NEXT_PHASE === 'phase-production-build' || (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production')) {
      return NextResponse.json({ success: true, data: {} as any });
    }

    // 2. Authenticate & Role Check
    const user = await getUserFromRequest(req);
    if (user.role !== 'teacher' && user.role !== 'admin') {
      return NextResponse.json({ success: false, error: { code: 'FORBIDDEN' } }, { status: 403 });
    }

    // 3. Faculty Dashboard Data
    const [batches, pendingHomework, todaysLive] = await Promise.all([
      prisma.batch.findMany({
        where: { subjects: { some: { teacher_id: user.id } } },
        select: { id: true, name: true, _count: { select: { enrollments: true } } }
      }),
      prisma.homeworkSubmission.count({
        where: { homework: { teacher_id: user.id }, status: 'submitted' }
      }),
      prisma.liveSession.findMany({
        where: { 
          teacher_id: user.id,
          scheduled_at: {
            gte: new Date(new Date().setHours(0,0,0,0)),
            lte: new Date(new Date().setHours(23,59,59,999))
          }
        },
        include: { batch: { select: { name: true } } }
      })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        batches,
        pendingHomeworkCount: pendingHomework,
        todaysLive
      }
    }, { status: 200 });

  } catch (error) {
    console.error('[dashboard/teacher]', error);
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR' } }, { status: 500 });
  }
}
