// lib/razorpay.ts
import Razorpay from 'razorpay';
import { createHmac } from 'crypto';

const KEY_ID = process.env.RAZORPAY_KEY_ID!;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

/**
 * Singleton instance of the Razorpay client for financial operations.
 */
export const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

/**
 * Securely verifies the Razorpay signature to prevent payment spoofing.
 */
export function verifyRazorpaySignature(
  orderId: string, 
  paymentId: string, 
  signature: string
): boolean {
  const generated_signature = createHmac('sha256', KEY_SECRET)
    .update(orderId + "|" + paymentId)
    .digest('hex');
    
  return generated_signature === signature;
}
