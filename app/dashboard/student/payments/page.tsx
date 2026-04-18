'use client';
import { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Trophy, 
  ArrowRight,
  ChevronDown,
  Loader2
} from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function StudentPayments() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const PLANS = [
    {
      id: 'free',
      name: 'Free Learner',
      price: 0,
      description: 'Kickstart your preparation with basic tools.',
      features: ['3 Live classes/month', 'Basic Chapter Notes', '2 Practice tests/week', 'Homework Submission'],
      cta: 'Current Plan',
      premium: false
    },
    {
      id: 'monthly',
      name: 'Monthly Pro',
      price: 149,
      description: 'Ideal for chapter-specific mastery.',
      features: ['Unlimited Live Classes', 'Full Notes Library', 'Unlimited Mock Tests', 'No Ads Interface', 'Email Support'],
      cta: 'Upgrade to Monthly',
      premium: true,
      popular: false
    },
    {
      id: 'annual',
      name: 'Academy Master Pro',
      price: 999,
      description: 'Complete board preparation powerhouse.',
      features: ['Everything in Monthly', 'Offline Video Downloads', 'Priority Doubt Support', 'Personal Mentor sessions', 'Final Exam Guess Papers'],
      cta: 'Unlock Everything',
      premium: true,
      popular: true
    }
  ];

  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handlePayment = async (plan: any) => {
    if (plan.id === 'free') return;
    
    setIsProcessing(plan.id);
    
    try {
      // 1. Create order on server
      const res = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: plan.price, planId: plan.id }),
      });
      const order = await res.json();

      if (!order.id) throw new Error('Failed to create order');

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mock_123',
        amount: order.amount,
        currency: 'INR',
        name: 'Krishna Academy',
        description: `Full Access: ${plan.name}`,
        image: '/imgs/logo.jpeg',
        order_id: order.id,
        handler: async function (response: any) {
          console.log('Payment Successful:', response);
          
          // Verify on server
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (verifyRes.ok) {
            alert('Academic records synced! Welcome to Academy Master Pro.');
            window.location.reload();
          } else {
            alert('Payment received but sync failed. Please contact support with Payment ID: ' + response.razorpay_payment_id);
          }
        },
        prefill: {
          name: 'Student Name',
          email: 'student@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#1E3A8A', // Scientific Blue
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
       console.error(error);
       alert('Portal Error: Unable to reach payment gateway. Try again later.');
    } finally {
       setIsProcessing(null);
    }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-center lg:text-left">
        <div className="max-w-xl">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Upgrade Your Learning</h1>
          <p className="text-slate-500 font-medium mt-1">
            Unlock the full potential of Krishna Academy with premium access tags.
          </p>
        </div>
        
        {/* Billing Toggle */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex border border-slate-200 shadow-inner w-full md:w-auto">
           <button 
            onClick={() => setBillingCycle('monthly')}
            className={`flex-1 md:w-32 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-white text-blue-900 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
           >
             Monthly
           </button>
           <button 
            onClick={() => setBillingCycle('annual')}
            className={`flex-1 md:w-40 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${billingCycle === 'annual' ? 'bg-white text-blue-900 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
           >
             Annual <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded ml-1">Save 45%</span>
           </button>
        </div>
      </div>

      {/* Plans Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map(plan => (
          <div 
            key={plan.id} 
            className={`relative flex flex-col bg-white rounded-[48px] p-10 border transition-all duration-300 transform hover:scale-[1.02] ${
              plan.popular ? 'border-blue-900 shadow-2xl shadow-blue-900/10 z-10' : 'border-slate-100 shadow-sm'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                <Trophy size={14} fill="currentColor" className="text-amber-500" /> Best Seller
              </div>
            )}

            <div className="mb-10">
               <h3 className={`text-2xl font-black mb-2 ${plan.premium ? 'text-blue-900' : 'text-slate-900'}`}>{plan.name}</h3>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{plan.description}</p>
            </div>

            <div className="flex items-end gap-2 mb-10">
               <span className="text-5xl font-black text-slate-900 tracking-tight">₹{plan.price}</span>
               {plan.price > 0 && <span className="text-slate-400 font-bold text-lg mb-1">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>}
            </div>

            <div className="flex-1 space-y-5">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Included Features:</p>
               <ul className="space-y-4">
                  {plan.features.map(feat => (
                    <li key={feat} className="flex items-start gap-3">
                       <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                       <span className="text-sm font-bold text-slate-600 leading-snug">{feat}</span>
                    </li>
                  ))}
               </ul>
            </div>

            <button 
              onClick={() => handlePayment(plan)}
              disabled={plan.id === 'free' || isProcessing !== null}
              className={`w-full mt-12 py-5 rounded-[24px] font-black text-xs uppercase tracking-[2px] transition-all flex items-center justify-center gap-2 shadow-xl group ${
                plan.premium 
                  ? 'bg-blue-900 text-white shadow-blue-900/20 hover:bg-blue-800' 
                  : 'bg-slate-50 text-slate-400 border border-transparent shadow-none'
              } ${isProcessing === plan.id ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isProcessing === plan.id ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  {plan.cta} 
                  {plan.premium && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Security Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-slate-100">
         {[
           { icon: <ShieldCheck className="text-emerald-500" />, title: 'Secure Gateway', desc: 'Industry-standard 256-bit SSL encrypted payments via Razorpay.' },
           { icon: <Zap className="text-amber-500" />, title: 'Instant Activation', desc: 'All premium features are unlocked immediately after successful sync.' },
           { icon: <CreditCard className="text-blue-900" />, title: 'Multiple Options', desc: 'Pay using UPI (GPay/PhonePe), Credit Cards, EMI, or Net Banking.' },
         ].map(item => (
           <div key={item.title} className="flex gap-5">
              <div className="shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-50">{item.icon}</div>
              <div>
                 <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">{item.title}</h4>
                 <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
           </div>
         ))}
      </div>

      {/* FAQ Short Section */}
      <div className="bg-slate-900 rounded-[48px] p-12 text-white mt-10 relative overflow-hidden">
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="max-w-lg">
               <h3 className="text-2xl font-black mb-4">Have more questions?</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl cursor-pointer hover:bg-white/10 transition-all border border-white/5">
                     <span className="text-xs font-bold">Can I upgrade from Monthly to Annual later?</span>
                     <ChevronDown size={16} />
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl cursor-pointer hover:bg-white/10 transition-all border border-white/5">
                     <span className="text-xs font-bold">What is the Refund Policy for 999 Plan?</span>
                     <ChevronDown size={16} />
                  </div>
               </div>
            </div>
            <div className="text-center md:text-right">
               <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2">Need Guidance?</p>
               <p className="text-3xl font-black mb-6">Talk to Account Support</p>
               <button className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all">
                  Open WhatsApp Help
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
