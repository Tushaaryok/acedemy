// components/payments/razorpay-button.tsx
'use client';

import { type FC, useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { cn } from '@/lib/utils';
import type { Plan } from '@prisma/client';

interface RazorpayButtonProps {
  planType: Plan;
  onSuccess: (plan: Plan) => void;
  className?: string;
}

/**
 * Premium Checkout Button with integrated Razorpay Script loading.
 * Follows the mandatory React Component Pattern.
 */
export const RazorpayButton: FC<RazorpayButtonProps> = ({ 
  planType, 
  onSuccess, 
  className 
}) => {
  const [loading, setLoading] = useState(false);

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // 1. Load Razorpay SDK
    const isLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!isLoaded) {
      alert('Razorpay SDK failed to load. Check your internet.');
      setLoading(false);
      return;
    }

    try {
      // 2. Create Order
      const orderRes = await api.post('/payments/create-order', { planType });
      const { orderId, amount, keyId, userName, userPhone } = orderRes.data.data;

      // 3. Open Checkout
      const options = {
        key: keyId,
        amount: amount,
        currency: "INR",
        name: "Krishna Academy Upleta",
        description: `${planType.toUpperCase()} Subscription Plan`,
        order_id: orderId,
        handler: async (response: any) => {
          // 4. Verify Payment
          try {
            const verifyRes = await api.post('/payments/verify', {
              ...response,
              planType
            });
            if (verifyRes.data.success) {
              onSuccess(planType);
            }
          } catch (err) {
            alert('Verification failed. Contact support.');
          }
        },
        prefill: {
          name: userName,
          contact: userPhone
        },
        theme: {
          color: "#0f172a" // slate-900
        }
      };

      const razorpayWindow = new (window as any).Razorpay(options);
      razorpayWindow.open();
    } catch (error) {
      console.error('Payment initialization failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment}
      disabled={loading}
      className={cn(
        "w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50",
        className
      )}
    >
      {loading ? <Loader2 size={18} className="animate-spin" /> : <>Pay Now <CreditCard size={18} /></>}
    </button>
  );
};
