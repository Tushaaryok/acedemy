// app/api/v1/auth/onboarding/route.ts
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import type { ApiResponse } from '@/types';

const OnboardingSchema = z.object({
  fullName: z.string().min(3).max(50),
  standard: z.string().min(1),
  batchId: z.string().cuid(),
  schoolName: z.string().optional(),
  city: z.string().default('Upleta'),
});

/**
 * Finalizes scholar profile setup after OTP verification.
 * Transitions user state from 'PENDING' to 'ACTIVE'.
 */
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // 1. Authenticate user
    const user = await getUserFromRequest(req);

    // 2. Validate payload
    const body = await req.json();
    const parsed = OnboardingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERR', issues: parsed.error.issues } },
        { status: 422 }
      );
    }

    // 3. Update User Profile
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        full_name: parsed.data.fullName,
        standard: parsed.data.standard,
        batch_id: parsed.data.batchId,
        onboarding_completed: true,
      }
    });

    return NextResponse.json({ 
      success: true, 
      data: updatedUser 
    }, { status: 200 });

  } catch (error) {
    console.error('[auth/onboarding]', error);
    return NextResponse.json({ 
      success: false, 
      error: { code: 'SERVER_ERROR' } 
    }, { status: 500 });
  }
}
