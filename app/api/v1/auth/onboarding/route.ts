// app/api/v1/auth/onboarding/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
export const dynamic = 'force-dynamic';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import type { ApiResponse } from '@/types';

/**
 * Finalizes scholar profile setup after OTP verification.
 * Transitions user state from 'PENDING' to 'ACTIVE'.
 */
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // 1. Forced Dynamic / Build-time Bypass
    headers(); 
    if (process.env.NEXT_PHASE === 'phase-production-build' || (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production')) {
       return NextResponse.json({ success: true, data: {} as any }, { status: 200 });
    }

    // 2. Authenticate user
    const user = await getUserFromRequest(req);

    // 3. Validate payload
    const OnboardingSchema = z.object({
      fullName: z.string().min(3).max(50),
      standard: z.string().min(1),
      stream: z.string().optional(),
      goal: z.string().min(1),
      batchId: z.string().min(1),
    });

    const body = await req.json();
    const parsed = OnboardingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERR', issues: parsed.error.issues } },
        { status: 422 }
      );
    }

    // 4. Update User Profile
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        full_name: parsed.data.fullName,
        standard: parsed.data.standard,
        stream: parsed.data.stream,
        goal: parsed.data.goal,
        onboarding_completed: true,
        enrollments: {
          create: {
            batch_id: parsed.data.batchId,
            status: 'active'
          }
        }
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
