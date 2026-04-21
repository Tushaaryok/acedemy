// app/api/v1/live/[id]/leave/route.ts
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import type { ApiResponse } from '@/types';

/**
 * Marks the end of a scholar's occupancy in a live session.
 * Calculates duration and releases the seat.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse>> {
  try {
    const user = await getUserFromRequest(req);
    const sessionId = params.id;

    if (user.role !== 'student') return NextResponse.json({ success: true }, { status: 200 });

    // Find the latest open attendance for this student and session
    const lastAttendance = await prisma.liveAttendance.findFirst({
      where: {
        student_id: user.id,
        live_session_id: sessionId,
        left_at: null
      },
      orderBy: { joined_at: 'desc' }
    });

    if (lastAttendance) {
      const leftAt = new Date();
      const durationMs = leftAt.getTime() - lastAttendance.joined_at.getTime();
      const durationMin = Math.round(durationMs / 60000);

      await prisma.liveAttendance.update({
        where: { id: lastAttendance.id },
        data: {
          left_at: leftAt,
          duration: durationMin
        }
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('[live/leave]', error);
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR' } }, { status: 500 });
  }
}
