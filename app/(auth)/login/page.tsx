'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Phone, Mail, ArrowRight, Lock, Sparkles, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(''); // Email or Phone
  const [otp, setOtp] = useState('');
  const [mode, setMode] = useState<'phone' | 'email'>('phone');
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: 'info' as 'info' | 'error' | 'success' });
  
  const supabase = createClient();
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: 'info' });

    let error;
    if (mode === 'email') {
      const result = await supabase.auth.signInWithOtp({
        email: identifier,
        options: { shouldCreateUser: false },
      });
      error = result.error;
    } else {
      // Supabase Phone Auth
      const phone = identifier.startsWith('+91') ? identifier : `+91${identifier}`;
      const result = await supabase.auth.signInWithOtp({
        phone,
        options: { 
          shouldCreateUser: false,
          channel: 'sms'
        },
      });
      error = result.error;
    }

    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else {
      setStep('otp');
      setMessage({ text: `OTP sent to your ${mode}.`, type: 'success' });
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: 'info' });

    let result;
    if (mode === 'email') {
      result = await supabase.auth.verifyOtp({
        email: identifier,
        token: otp,
        type: 'email',
      });
    } else {
      const phone = identifier.startsWith('+91') ? identifier : `+91${identifier}`;
      result = await supabase.auth.verifyOtp({
        phone,
        token: otp,
        type: 'sms',
      });
    }

    if (result.error) {
      setMessage({ text: result.error.message, type: 'error' });
      setLoading(false);
    } else {
      // Fetch user role
      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', result.data.user?.id)
        .single();

      if (!userData) {
        setMessage({ text: 'User profile not found. Please contact admin.', type: 'error' });
        setLoading(false);
      } else {
        router.push(`/dashboard/${userData.role}`);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-jakarta">
      {/* Left Decoration - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-900 relative p-20 flex-col justify-between overflow-hidden">
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center font-black text-2xl text-blue-900 mb-8 shadow-2xl">KA</div>
          <h1 className="text-5xl font-black text-white leading-tight mb-6">
            Upleta's #1 <br /> 
            <span className="text-amber-500">Digital Gateway</span> <br /> 
            to Success.
          </h1>
          <p className="text-blue-200 text-lg font-medium max-w-md leading-relaxed">
            Access your courses, live classes, and masterclass content from anywhere in the world.
          </p>
        </div>

        <div className="relative z-10 flex gap-10">
           <div>
              <p className="text-3xl font-black text-white">5k+</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Enrolled Scholars</p>
           </div>
           <div>
              <p className="text-3xl font-black text-white">95%</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Board Accuracy</p>
           </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] -ml-40 -mb-40"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-20">
        <div className="w-full max-w-md space-y-10 group">
          
          <div className="text-center lg:text-left space-y-3">
             <div className="inline-flex items-center gap-2 bg-blue-900/5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-900 border border-blue-900/10 mb-4">
                <Sparkles size={12} fill="currentColor" /> Student Portal Access
             </div>
             <h2 className="text-4xl font-black text-slate-900 tracking-tight">Welcome Back!</h2>
             <p className="text-slate-500 font-medium leading-relaxed">
               {step === 'input' 
                 ? `Enter your ${mode === 'phone' ? 'mobile number' : 'email'} to receive a safe 6-digit access code.` 
                 : `We've sent a 6-digit OTP to your ${mode}. Enter it below to proceed.`}
             </p>
          </div>

          <form className="space-y-8" onSubmit={step === 'input' ? handleSendOTP : handleVerifyOTP}>
             {step === 'input' ? (
               <div className="space-y-6">
                 {/* Mode Toggle */}
                 <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
                    <button 
                      type="button" 
                      onClick={() => setMode('phone')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'phone' ? 'bg-white text-blue-900 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <Phone size={16} /> Phone
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setMode('email')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'email' ? 'bg-white text-blue-900 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <Mail size={16} /> Email
                    </button>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                       {mode === 'phone' ? 'Mobile Number' : 'Email Address'}
                    </label>
                    <div className="relative group/input">
                       <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-900 transition-colors">
                          {mode === 'phone' ? <span className="text-sm font-bold">+91</span> : <Mail size={18} />}
                       </div>
                       <input 
                         type={mode === 'phone' ? 'tel' : 'email'} 
                         required
                         placeholder={mode === 'phone' ? '00000 00000' : 'name@school.com'}
                         className="w-full bg-white border border-slate-200 rounded-[24px] pl-16 pr-8 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 transition-all shadow-sm"
                         value={identifier}
                         onChange={(e) => setIdentifier(e.target.value)}
                       />
                    </div>
                 </div>
               </div>
             ) : (
               <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                  <div className="space-y-2 text-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">One-Time Password</label>
                    <div className="relative flex justify-center pt-2">
                       <Lock size={16} className="absolute left-1/4 top-1/2 -translate-y-px text-slate-400" />
                       <input 
                         type="text" 
                         maxLength={6}
                         required
                         autoFocus
                         className="w-48 bg-slate-50 border-b-2 border-slate-200 py-4 text-center text-2xl font-black tracking-[0.8em] focus:border-blue-900 outline-none transition-all placeholder:text-slate-200"
                         placeholder="000000"
                         value={otp}
                         onChange={(e) => setOtp(e.target.value)}
                       />
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setStep('input')}
                    className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-900 transition-all"
                  >
                     <ChevronLeft size={14} /> Back to edit {mode}
                  </button>
               </div>
             )}

             <button 
               type="submit" 
               disabled={loading || (step === 'input' && !identifier) || (step === 'otp' && otp.length < 6)}
               className="w-full bg-blue-900 text-white p-6 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-900/30 hover:bg-blue-800 transform active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
             >
                {loading ? 'Authenticating...' : (
                  <>
                    {step === 'input' ? 'Get Safe Access Code' : 'Authorize & Start Learning'}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
             </button>

             {message.text && (
               <div className={`p-5 rounded-2xl text-xs font-bold leading-relaxed flex gap-3 ${
                 message.type === 'error' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
               }`}>
                  <div className="shrink-0">{message.type === 'error' ? '⚠️' : '✅'}</div>
                  <p>{message.text}</p>
               </div>
             )}
          </form>

          <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secured by Krishna Academy</p>
             <div className="flex gap-6">
                <Link href="/privacy" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-900 transition-all">Privacy Policy</Link>
                <Link href="/contact" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-900 transition-all">Portal Help</Link>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
