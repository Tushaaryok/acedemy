import { headers } from 'next/headers';
// app/api/v1/live/[id]/token/route.ts
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { checkGate } from '@/lib/planGates';
import { generateLiveToken } from '@/lib/agora';
import type { ApiResponse } from '@/types';

/**
 * Generates an Agora RTC token for a live session.
 * Enforces freemium monthly quotas and tracks scholar occupancy.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse>> {
  try {
    headers();
    // 1. Authenticate user
    const user = await getUserFromRequest(req);
    const sessionId = params.id;

    // 2. Fetch session details
    const session = await prisma.liveSession.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.deletedAt) {
  headers();
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Session nahi mili' } },
        { status: 404 }
      );
    }

    if (session.status === 'finished') {
      return NextResponse.json(
        { success: false, error: { code: 'FINISHED', message: 'Class khatam ho chuki hai' } },
        { status: 400 }
      );
    }

    // 3. Freemium Gate Check (Scholars only)
    if (user.role === 'student') {
      const gateCheck = await checkGate({
        userId: user.id,
        feature: 'live_class',
      });

      if (!gateCheck.allowed) {
        return NextResponse.json({ success: false, error: gateCheck.error }, { status: 403 });
      }

      // Record join event in Attendance
      await prisma.liveAttendance.create({
        data: {
          student_id: user.id,
          live_session_id: sessionId,
          joined_at: new Date()
        }
      });
    }

    // 4. Generate Token
    const role = user.role === 'teacher' ? 'PUBLISHER' : 'SUBSCRIBER';
    const expiry = user.role === 'teacher' ? 14400 : 7200; // 4h vs 2h
    
    // Fallback channel name if not generated yet
    const channelName = session.channel_name || `ka_${session.id}`;

    const token = generateLiveToken(channelName, role, expiry);

    // 5. Success
    return NextResponse.json({
      success: true,
      data: {
        token,
        channelName,
        agoraAppId: process.env.AGORA_APP_ID,
        title: session.title,
        status: session.status
      }
    }, { status: 200 });

  } catch (error) {
    console.error('[live/token]', error);
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR' } }, { status: 500 });
  }
}
