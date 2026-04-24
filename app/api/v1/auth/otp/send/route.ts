// app/api/v1/auth/otp/send/route.ts
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { z } from 'zod';
import { redis } from '@/lib/redis';
import { sendOtpSms } from '@/lib/msg91';
import { hashString } from '@/lib/auth';
import { ApiResponse } from '@/types';

const RequestSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Valid phone number daalo"),
});

/**
 * Generates and sends a hashed OTP to the public_users's phone.
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

    const { phone } = parsed.data;

    // Rate limiting (max 1 OTP per 60s)
    const canResend = await redis.set(`otp_limit:${phone}`, '1', { nx: true, ex: 60 });
    if (!canResend) {
      return NextResponse.json(
        { success: false, error: { code: 'RATE_LIMIT', message: 'Wait karo thodi der, fir try karna' } },
        { status: 429 }
      );
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = hashString(otp);

    // Store in Redis (5 min expiry)
    await redis.set(`otp:${phone}`, hashedOtp, { ex: 300 });

    // Send via SMS
    const sent = await sendOtpSms(phone, otp);
    if (!sent) {
      throw new Error('FAILED_TO_SEND_SMS');
    }

    return NextResponse.json({ success: true, data: { message: 'OTP bhej diya gaya hai' } }, { status: 200 });

  } catch (error) {
    console.error('[auth/otp/send]', error);
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR' } }, { status: 500 });
  }
}
