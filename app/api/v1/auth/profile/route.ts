
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import type { ApiResponse } from '@/types';
import { z } from 'zod';

const ProfileSchema = z.object({
  full_name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  standard: z.string().optional(),
  stream: z.string().optional(),
  goal: z.string().optional(),
  school_name: z.string().optional(),
  avatar_url: z.string().url().optional(),
});

/**
 * Universal profile synchronization endpoint.
 */
export async function PATCH(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const user = await getUserFromRequest(req);
    const body = await req.json();
    
    const parsed = ProfileSchema.safeParse(body);
    if (!parsed.success) {
       return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERR', issues: parsed.error.issues } }, { status: 422 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: parsed.data,
      select: {
        id: true,
        full_name: true,
        phone: true,
        email: true,
        role: true,
        standard: true,
        stream: true,
        goal: true,
        avatar_url: true,
        onboarding_completed: true
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedUser
    }, { status: 200 });

  } catch (error) {
    console.error('[auth/profile]', error);
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR' } }, { status: 500 });
  }
}
