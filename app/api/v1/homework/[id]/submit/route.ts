// app/api/v1/homework/[id]/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { getPresignedUploadUrl } from '@/lib/r2';
import type { ApiResponse } from '@/types';

const SubmitRequestSchema = z.object({
  files: z.array(z.object({
    name: z.string(),
    type: z.enum(['image/jpeg', 'image/png', 'application/pdf']),
    size: z.number().max(10 * 1024 * 1024, "File size 10MB se kam honi chahiye")
  })).max(5, "Maximum 5 files allow hain")
});

/**
 * Initiates the multi-file homework submission process.
 * Issues SHA-256 signed R2 PUT URLs for direct browser uploads.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse>> {
  try {
    const user = await getUserFromRequest(req);
    const homeworkId = params.id;

    // 1. Fetch homework and check existence
    const homework = await prisma.homework.findUnique({
      where: { id: homeworkId }
    });

    if (!homework || homework.deletedAt) {
      return NextResponse.json({ success: false, error: { code: 'NOT_FOUND' } }, { status: 404 });
    }

    // 2. Validate request
    const body = await req.json();
    const parsed = SubmitRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERR', issues: parsed.error.issues } },
        { status: 422 }
      );
    }

    // 3. Generate Signed URLs for each file
    const uploadRequests = await Promise.all(parsed.data.files.map(async (file, index) => {
      const extension = file.type.split('/')[1];
      const r2Key = `submissions/${homeworkId}/${user.id}/${Date.now()}_${index}.${extension}`;
      const uploadUrl = await getPresignedUploadUrl(r2Key, file.type);
      
      return {
        fileIndex: index,
        uploadUrl,
        r2Key
      };
    }));

    return NextResponse.json({
      success: true,
      data: {
        uploadRequests,
        isLate: homework.deadline ? new Date() > homework.deadline : false
      }
    }, { status: 200 });

  } catch (error) {
    console.error('[homework/submit]', error);
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR' } }, { status: 500 });
  }
}
