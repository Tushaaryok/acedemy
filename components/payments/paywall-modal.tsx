// components/payments/paywall-modal.tsx
'use client';

import { type FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ShieldCheck, Zap } from 'lucide-react';
import { RazorpayButton } from './razorpay-button';
import { cn } from '@/lib/utils';
import type { Plan } from '@prisma/client';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Premium Paywall experience for Krishna Academy.
 * Showcases plan benefits and triggers the Razorpay checkout flow.
 */
export const PaywallModal: FC<PaywallModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>('monthly');

  const plans = [
    {
      id: 'monthly' as Plan,
      title: 'Monthly Scholar',
      price: '₹499',
      period: '/ month',
      features: ['Full Video Access', 'Live Classes (Daily)', 'Notes Download', 'Weekly Tests'],
      color: 'bg-white'
    },
    {
      id: 'annual' as Plan,
      title: 'Annual Legend',
      price: '₹4999',
      period: '/ year',
      features: ['All Monthly Features', '2 Months Free', 'Offline Viewing', 'Priority Support'],
      color: 'bg-amber-50',
      isPopular: true
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl animate-in fade-in duration-300">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white w-full max-w-4xl rounded-[48px] overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-10 p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-all"
        >
          <X size={20} className="text-slate-400" />
        </button>

        {/* Benefits Sidebar */}
        <div className="md:w-2/5 bg-slate-900 p-12 text-white flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-amber-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-amber-500/20">
              <Zap size={32} fill="white" />
            </div>
            <h2 className="font-baloo text-4xl font-black mb-4">Upleta ki Shaan, Scholar ki Pehchaan! 🎖️</h2>
            <p className="text-slate-400 font-medium">Unlock unlimited learning with Krishna Academy Premium.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <ShieldCheck className="text-amber-500" size={24} />
              <p className="text-sm font-bold opacity-80">100% Safe Payments</p>
            </div>
          </div>
        </div>

        {/* Plan Selector */}
        <div className="flex-1 p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={cn(
                  "p-8 rounded-[32px] border-4 cursor-pointer transition-all relative flex flex-col items-center text-center",
                  selectedPlan === plan.id 
                    ? "border-slate-900 bg-slate-50" 
                    : "border-slate-100 hover:border-slate-200"
                )}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 px-4 py-1 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Best Value</span>
                )}
                <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-2">{plan.title}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-baloo font-black">{plan.price}</span>
                  <span className="text-sm text-slate-400 font-bold">{plan.period}</span>
                </div>
                <div className="space-y-3 w-full">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Check size={14} className="text-emerald-500" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <RazorpayButton 
            planType={selectedPlan} 
            onSuccess={() => window.location.reload()} 
          />
          <p className="text-center text-[10px] font-bold text-slate-400 mt-6 uppercase tracking-widest">Powered by Razorpay | Secure Checkout</p>
        </div>
      </motion.div>
    </div>
  );
};
