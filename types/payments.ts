// types/payments.ts
import { Plan } from '@prisma/client';

/**
 * Metadata for a Razorpay checkout session.
 */
export interface CheckoutSession {
  orderId: string;
  amount: number;
  keyId: string;
  userName: string;
  userPhone: string;
}

/**
 * Details required for secure server-side payment verification.
 */
export interface PaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  planType: Plan;
}
