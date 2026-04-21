// app/api/v1/payments/create-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { z } from 'zod';
import { razorpay } from '@/lib/razorpay';
import { getUserFromRequest } from '@/lib/auth';
import type { ApiResponse } from '@/types';

const OrderSchema = z.object({
  planType: z.enum(['monthly', 'annual']),
});

/**
 * Creates a new financial order in Razorpay based on the scholar's chosen plan.
 */
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // 1. Authenticate user
    const user = await getUserFromRequest(req);

    // 2. Validate payload
    const body = await req.json();
    const parsed = OrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERR', issues: parsed.error.issues } },
        { status: 422 }
      );
    }

    const { planType } = parsed.data;

    // 3. Determine pricing (in Paise)
    // Pricing logic: Monthly = 499 INR, Annual = 4999 INR (example)
    const amountInInr = planType === 'monthly' ? 499 : 4999;
    const amountInPaise = amountInInr * 100;

    // 4. Create Razorpay Order
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${user.id}_${Date.now()}`,
      notes: {
        userId: user.id,
        planType: planType
      }
    });

    // 5. Success
    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        userName: user.full_name || 'Student',
        userPhone: user.phone
      }
    }, { status: 200 });

  } catch (error) {
    console.error('[payments/create-order]', error);
    return NextResponse.json({ success: false, error: { code: 'SERVER_ERROR' } }, { status: 500 });
  }
}
