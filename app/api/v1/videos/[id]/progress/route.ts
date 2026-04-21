import { headers } from 'next/headers';
// app/api/v1/videos/[id]/progress/route.ts
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import type { ApiResponse } from '@/types';

const ProgressSchema = z.object({
  lastPosition: z.number().min(0),
  isCompleted: z.boolean().default(false),
});

/**
 * Updates video playback progress for a scholar.
 * Prevents non-owner updates and enforces schema-v7 compliance.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse>> {
  try {
    headers();
    // 1. Authenticate user
    const user = await getUserFromRequest(req);
    const lectureId = params.id;

    // 2. Validate payload
    const body = await req.json();
    const parsed = ProgressSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERR', issues: parsed.error.issues } },
        { status: 422 }
      );
    }

    const { lastPosition, isCompleted } = parsed.data;

    // 3. Upsert progress record
    const progress = await prisma.videoProgress.upsert({
      where: {
        student_id_lecture_id: {
          student_id: user.id,
          lecture_id: lectureId,
        },
      },
      update: {
        last_position: lastPosition,
        is_completed: isCompleted,
      },
      create: {
        student_id: user.id,
        lecture_id: lectureId,
        last_position: lastPosition,
        is_completed: isCompleted,
      },
    });

    return NextResponse.json(
      { success: true, data: { lastPosition: progress.last_position, isCompleted: progress.is_completed } },
      { status: 200 }
    );

  } catch (error) {
    console.error('[videos/progress/PUT]', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR' } },
      { status: 500 }
    );
  }
}
/**
 * Retrieves video playback progress for the authenticated scholar.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse>> {
  try {
    const user = await getUserFromRequest(req);
    const lectureId = params.id;

    const progress = await prisma.videoProgress.findUnique({
      where: {
        student_id_lecture_id: {
          student_id: user.id,
          lecture_id: lectureId,
        },
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        data: { 
          lastPosition: progress?.last_position || 0, 
          isCompleted: progress?.is_completed || false 
        } 
      },
      { status: 200 }
    );

  } catch (error) {
  headers();
    console.error('[videos/progress/GET]', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR' } },
      { status: 500 }
    );
  }
}
