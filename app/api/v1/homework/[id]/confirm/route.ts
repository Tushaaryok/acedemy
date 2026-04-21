// app/api/v1/homework/[id]/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import type { ApiResponse } from '@/types';

const ConfirmSchema = z.object({
  r2Keys: z.array(z.string()).min(1),
});

/**
 * Finalizes the homework submission after successful R2 uploads.
 * Hardens state with is_late flags and atomic DB persistence.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse>> {
  try {
    const user = await getUserFromRequest(req);
    const homeworkId = params.id;

    const body = await req.json();
    const parsed = ConfirmSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERR', issues: parsed.error.issues } },
        { status: 422 }
      );
    }

    // 1. Fetch homework to check deadline
    const homework = await prisma.homework.findUnique({
      where: { id: homeworkId }
    });

    if (!homework) return NextResponse.json({ success: false, error: { code: 'NOT_FOUND' } }, { status: 404 });

    const isLate = homework.deadline ? new Date() > homework.deadline : false;

    // 2. Upsert submission (handle re-submissions)
    const submission = await prisma.homeworkSubmission.upsert({
      where: {
        id: `sub_${homeworkId}_${user.id}` // Unique deterministic ID for student+hw
      },
      update: {
        file_urls: parsed.data.r2Keys,
        is_late: isLate,
        submitted_at: new Date(),
        status: 'submitted'
      },
      create: {
        id: `sub_${homeworkId}_${user.id}`,
        homework_id: homeworkId,
        student_id: user.id,
        file_urls: parsed.data.r2Keys,
        is_late: isLate,
        status: 'submitted'
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        id: submission.id,
        status: submission.status,
        isLate: submission.is_late
      }
    }, { status: 200 });

  } catch (error) {
    console.error('[homework/confirm]', error);
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR' } }, { status: 500 });
  }
}
