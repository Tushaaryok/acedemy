// app/api/v1/payments/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { createHmac } from 'crypto';
import prisma from '@/lib/prisma';

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;

/**
 * Handles asynchronous payment notifications from Razorpay.
 * Enforces strict X-Razorpay-Signature validation before processing.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ success: false, message: 'Signature missing' }, { status: 400 });
    }

    // 1. Verify Webhook Signature
    const expectedSignature = createHmac('sha256', WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 403 });
    }

    const payload = JSON.parse(body);
    const event = payload.event;

    // 2. Process Event
    if (event === 'payment.captured' || event === 'order.paid') {
      const payment = payload.payload.payment.entity;
      const orderId = payment.order_id;
      const userId = payment.notes.userId;
      const planType = payment.notes.planType;

      // Handle async upgrade (idempotency managed by verify route)
      // This is a safety net for failed client-side verification
      await prisma.public_users.update({
        where: { id: userId },
        data: { plan: planType }
      });
      
      console.log(`[Webhook] Payment successful for public_users ${userId}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('[payments/webhook]', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
