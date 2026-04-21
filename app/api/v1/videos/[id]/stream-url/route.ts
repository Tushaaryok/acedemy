import { headers } from 'next/headers';
// app/api/v1/videos/[id]/stream-url/route.ts
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { checkGate } from '@/lib/planGates';
import { getPresignedStreamUrl } from '@/lib/r2';
import { ApiResponse } from '@/types';

/**
 * Generates a signed HLS stream URL for a specific lecture.
 * Enforces freemium gates and plan restrictions server-side.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse>> {
  try {
    headers();
    // 1. Authenticate user
    const user = await getUserFromRequest(req);
    const lectureId = params.id;

    // 2. Fetch lecture metadata
    const lecture = await prisma.lecture.findUnique({
      where: { id: lectureId },
      include: {
        chapter: {
          select: { title: true }
        }
      }
    });

    if (!lecture || lecture.deletedAt) {
  headers();
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Lecture nahi mili' } },
        { status: 404 }
      );
    }

    // 3. Enforce Freemium Gates
    const gateCheck = await checkGate({
      userId: user.id,
      feature: 'video_stream',
      metadata: { isFree: lecture.is_free }
    });

    if (!gateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: gateCheck.error },
        { status: 403 }
      );
    }

    if (!lecture.r2_path) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_STREAM', message: 'Video stream available nahi hai' } },
        { status: 400 }
      );
    }

    // 4. Generate Audit-Ready Presigned URL
    const streamUrl = await getPresignedStreamUrl(lecture.r2_path, user.id);

    // 5. Success
    return NextResponse.json(
      { 
        success: true, 
        data: { 
          streamUrl,
          title: lecture.title,
          chapter: lecture.chapter.title,
          isFree: lecture.is_free
        } 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('[videos/stream-url]', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR' } },
      { status: 500 }
    );
  }
}
