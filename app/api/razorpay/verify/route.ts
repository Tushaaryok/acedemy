import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      student_id,
      fee_id
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const supabase = createClient();
      
      // Update fees table
      const { error: updateError } = await supabase
        .from('fees')
        .update({ 
          status: 'paid', 
          razorpay_order_id, 
          razorpay_payment_id,
          paid_at: new Date().toISOString()
        })
        .eq('id', fee_id);

      if (updateError) throw updateError;

      // Add XP for payment
      await supabase.from('xp_points').insert({
        student_id,
        points: 50,
        reason: 'fee_payment'
      });

      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Signature verification failed" }, { status: 400 });
    }
  } catch (error) {
    console.error('Verification Error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
