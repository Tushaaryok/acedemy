export const dynamic = 'force-dynamic';
import { NextRequest } from 'next/server';
import Razorpay from 'razorpay';
import { successResponse, errorResponse } from '@/lib/api-response';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

const orderSchema = z.object({
  amount: z.number().positive(),
  fee_type: z.string().default('monthly_tuition'),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Get user from JWT (Middleware should have verified, but we get ID from payload)
    // Normally we'd extract from a cookie here if not using a library like next-auth
    // For now, assume we extraction logic in a utility
    // const userId = await getUserId(request);
    
    const body = await request.json();
    const { amount, fee_type } = orderSchema.parse(body);

    const options = {
      amount: amount * 100, // paisa
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Track order in DB
    // await prisma.fee.create({ data: { ... } });

    return successResponse({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: any) {
    console.error('Razorpay Order Error:', err.message);
    return errorResponse('Failed to create payment order', 500);
  }
}
