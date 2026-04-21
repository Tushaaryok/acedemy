// app/api/v1/payments/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { getUserFromRequest } from '@/lib/auth';
import type { ApiResponse } from '@/types';

const VerifySchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  planType: z.enum(['monthly', 'annual']),
});

/**
 * Validates financial transaction signatures and activates scholar subscriptions.
 */
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // 1. Authenticate user
    const user = await getUserFromRequest(req);

    // 2. Validate payload
    const body = await req.json();
    const parsed = VerifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERR', issues: parsed.error.issues } },
        { status: 422 }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planType } = parsed.data;

    // 3. Cryptographic Signature Verification
    const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_SIGNATURE', message: 'Fraudulent transaction detected' } },
        { status: 403 }
      );
    }

    // --- CHANGED: Added Idempotency Check ---
    const existingPayment = await prisma.subscription.findUnique({
      where: { razorpay_payment_id }
    });

    if (existingPayment) {
      return NextResponse.json(
        { success: true, data: { plan: planType, message: 'Already processed' } },
        { status: 200 }
      );
    }

    // 4. Update Database (User Plan + Create Subscription)
    const expiryDate = new Date();
    if (planType === 'monthly') {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }

    // Updated pricing for Upleta market
    const amount = planType === 'monthly' ? 149 : 1499;

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { plan: planType }
      }),
      prisma.subscription.create({
        data: {
          user_id: user.id,
          plan_type: planType,
          amount: amount,
          status: 'active',
          started_at: new Date(),
          expires_at: expiryDate,
          razorpay_order_id,
          razorpay_payment_id
        }
      })
    ]);

    // 5. Success
    return NextResponse.json({
      success: true,
      data: { plan: planType, message: 'Welcome to Krishna Academy Premium!' }
    }, { status: 200 });

  } catch (error) {
    console.error('[payments/verify]', error);
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR' } }, { status: 500 });
  }
}
