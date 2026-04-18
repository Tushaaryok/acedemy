import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = await req.json();

    const supabase = createClient();

    // Verify signature
    const text = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Update fee record in database
    const { error } = await supabase
      .from('fees')
      .update({ 
        status: 'paid',
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        paid_at: new Date().toISOString()
      })
      .eq('razorpay_order_id', razorpay_order_id);

    if (error) throw error;

    return NextResponse.json({ message: 'Payment verified and recorded' });
  } catch (error: any) {
    console.error('Verification Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
