'use client';

import { useState } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentButton({ amount, feeId, studentId, studentEmail, studentName }: any) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create order on server
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, feeId })
      });
      const order = await res.json();

      // 2. Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Krishna Academy",
        description: "Monthly Tuition Fees",
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify payment on server
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              student_id: studentId,
              fee_id: feeId
            })
          });

          const result = await verifyRes.json();
          if (result.success) {
            alert("Payment Successful!");
            window.location.reload();
          } else {
            alert("Verification Failed: " + result.message);
          }
        },
        prefill: {
          name: studentName,
          email: studentEmail
        },
        theme: {
          color: "#f59e0b"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment initiation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment}
      disabled={loading}
      className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}
