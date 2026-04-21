// app/api/v1/auth/otp/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/prisma';
import { redis } from '@/lib/redis';
import { hashString, createAccessToken } from '@/lib/auth';
import type { ApiResponse } from '@/types';

const RequestSchema = z.object({
  phone: z.string().min(10),
  otp: z.string().length(6),
});

/**
 * Verifies OTP and returns academic access tokens.
 */
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERR', issues: parsed.error.issues } },
        { status: 422 }
      );
    }

    const { phone, otp } = parsed.data;
    const hashedInputOtp = hashString(otp);

    // 1. Verify OTP from Redis
    const storedHashedOtp = await redis.get(`otp:${phone}`);
    if (!storedHashedOtp || storedHashedOtp !== hashedInputOtp) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_OTP', message: 'Sahi OTP daalo' } },
        { status: 401 }
      );
    }

    // Clear OTP after successful verify
    await redis.del(`otp:${phone}`);

    // 2. Find or Create User
    let user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      user = await prisma.user.create({
        data: { phone, role: 'student', plan: 'free' }
      });
    }

    // 3. Generate Access Token (JWT)
    const accessToken = await createAccessToken(user);

    // 4. Generate Refresh Token (UUID hashed)
    const refreshToken = uuidv4();
    const refreshTokenHash = hashString(refreshToken);
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        refresh_token_hash: refreshTokenHash,
        refresh_token_expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      }
    });

    // 5. Build Response + HttpOnly Cookie
    const response = NextResponse.json(
      { 
        success: true, 
        data: { 
          accessToken, 
          user: { id: user.id, phone: user.phone, role: user.role, plan: user.plan, onboarding_completed: user.onboarding_completed } 
        } 
      },
      { status: 200 }
    );

    response.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('[auth/otp/verify]', error);
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR' } }, { status: 500 });
  }
}
