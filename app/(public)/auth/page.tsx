// app/(public)/auth/page.tsx
'use client';

import { useState, type FC } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';
import { cn } from '@/lib/utils';

/**
 * Mobile-first high-fidelity Authentication page for Krishna Academy.
 * Handles OTP generation and verification with premium animations.
 */
const AuthPage: FC = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/otp/send', { phone });
      if (res.data.success) {
        setStep('otp');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/otp/verify', { phone, otp });
      if (res.data.success) {
        const { public_users, accessToken } = res.data.data;
        setAuth(public_users, accessToken);
        
        // Redirect based on onboarding status
        if (!public_users.onboarding_completed) {
          router.push('/onboarding');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 p-10 border border-white"
      >
        <div className="text-center mb-10">
          <h1 className="font-baloo text-3xl font-black text-slate-900 leading-tight">
            Swagat Hai! 👋
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Krishna Academy mein apne session ke liye login karein.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'phone' ? (
            <motion.form 
              key="phone-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSendOtp}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="tel"
                    placeholder="+91 99999 00000"
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-[24px] py-5 pl-14 pr-6 text-sm font-bold outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-rose-500 text-xs font-bold text-center">{error}</p>}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>Get OTP <ArrowRight size={18} /></>}
              </button>
            </motion.form>
          ) : (
            <motion.form 
              key="otp-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleVerifyOtp}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">6-Digit OTP</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text"
                    placeholder="000000"
                    required
                    maxLength={6}
                    className="w-full bg-slate-50 border border-slate-100 rounded-[24px] py-5 pl-14 pr-6 text-sm font-bold tracking-[1em] outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-bold mt-2 text-center">
                  OTP sent to {phone}. <button type="button" onClick={() => setStep('phone')} className="text-amber-600">Change number?</button>
                </p>
              </div>

              {error && <p className="text-rose-500 text-xs font-bold text-center">{error}</p>}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-amber-600 shadow-xl shadow-amber-500/20 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>Verify & Continue <ArrowRight size={18} /></>}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthPage;
