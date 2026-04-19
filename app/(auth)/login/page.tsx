'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Phone, ArrowRight, Sparkles, ChevronLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { getAuthErrorMessage } from '@/lib/types/auth';

// ============================================================
// OTP Box Component - 6 individual input boxes
// ============================================================
function OtpBoxes({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (index: number, char: string) => {
    // Sirf numbers accept karo
    if (!/^\d*$/.test(char)) return;

    const arr = value.padEnd(6, ' ').split('');
    arr[index] = char || ' ';
    const newVal = arr.join('').trimEnd();
    onChange(newVal);

    // Agla box pe focus
    if (char && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        inputs.current[index - 1]?.focus();
        const arr = value.padEnd(6, ' ').split('');
        arr[index - 1] = ' ';
        onChange(arr.join('').trimEnd());
      } else {
        const arr = value.padEnd(6, ' ').split('');
        arr[index] = ' ';
        onChange(arr.join('').trimEnd());
      }
    }
    // Arrow keys
    if (e.key === 'ArrowLeft' && index > 0) inputs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < 5) inputs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasted);
    // Last filled box pe focus
    const lastIndex = Math.min(pasted.length, 5);
    inputs.current[lastIndex]?.focus();
  };

  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleInput(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          autoFocus={i === 0}
          className={`
            w-12 h-14 text-center text-2xl font-black rounded-2xl border-2 outline-none
            transition-all duration-200
            ${value[i]
              ? 'border-amber-500 bg-amber-50 text-slate-900 shadow-md shadow-amber-200'
              : 'border-slate-200 bg-white text-slate-300'
            }
            focus:border-blue-900 focus:bg-blue-50 focus:scale-105
          `}
        />
      ))}
    </div>
  );
}

// ============================================================
// Main Login Page
// ============================================================
export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Resend cooldown (30 seconds - PRD requirement)
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const supabase = createClient();
  const router = useRouter();

  // Countdown timer cleanup
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // 30-second countdown start karo
  const startCountdown = useCallback(() => {
    setCountdown(30);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Phone number validate karo
  const validatePhone = (num: string) => {
    const cleaned = num.replace(/\D/g, '');
    if (cleaned.length !== 10) return 'Phone number 10 digits ka hona chahiye';
    if (!/^[6-9]/.test(cleaned)) return 'Valid Indian mobile number dalo (6-9 se shuru)';
    return null;
  };

  // Step 1: OTP bhejo
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Validation
    const phoneErr = validatePhone(phone);
    if (phoneErr) { setError(phoneErr); return; }

    setLoading(true);

    const formattedPhone = `+91${phone.replace(/\D/g, '')}`;

    const { error: authError } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
      options: {
        shouldCreateUser: true, // Naye users allow karo
        channel: 'sms',
      },
    });

    if (authError) {
      setError(getAuthErrorMessage(authError.message));
    } else {
      setStep('otp');
      setSuccessMsg(`OTP +91-${phone} pe bheja gaya ✅`);
      startCountdown();
    }

    setLoading(false);
  };

  // Resend OTP
  const handleResend = async () => {
    if (countdown > 0) return;
    setError('');
    setSuccessMsg('');
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithOtp({
      phone: `+91${phone.replace(/\D/g, '')}`,
      options: { shouldCreateUser: true, channel: 'sms' },
    });

    if (authError) {
      setError(getAuthErrorMessage(authError.message));
    } else {
      setOtp('');
      setSuccessMsg('Naya OTP bheja gaya! ✅');
      startCountdown();
    }
    setLoading(false);
  };

  // Step 2: OTP verify karo
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.replace(/\s/g, '').length < 6) {
      setError('6-digit OTP poora bharo');
      return;
    }

    setLoading(true);

    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      phone: `+91${phone.replace(/\D/g, '')}`,
      token: otp.replace(/\s/g, ''),
      type: 'sms',
    });

    if (verifyError) {
      setError(getAuthErrorMessage(verifyError.message));
      setLoading(false);
      return;
    }

    // User profile check karo
    const { data: userData, error: profileError } = await supabase
      .from('users')
      .select('role, onboarding_completed, full_name')
      .eq('id', data.user?.id)
      .single();

    if (profileError || !userData) {
      // Naya user - onboarding pe bhejo
      router.push('/onboarding');
    } else if (!userData.onboarding_completed) {
      // Onboarding adhoori - complete karo
      router.push('/onboarding');
    } else {
      // Purana user - seedha dashboard
      router.push(`/dashboard/${userData.role}`);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* ====================================================
          LEFT SIDE - Branding (Desktop only)
          ==================================================== */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-950 to-blue-800 relative p-20 flex-col justify-between overflow-hidden">
        <div className="relative z-10">
          {/* Logo */}
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center font-black text-2xl text-white mb-8 shadow-2xl">
            KA
          </div>

          <h1 className="text-5xl font-black text-white leading-tight mb-6">
            Upleta ka<br />
            <span className="text-amber-400">#1 Digital</span><br />
            Classroom.
          </h1>
          <p className="text-blue-200 text-lg font-medium max-w-md leading-relaxed">
            Ghar baithe padho, teachers se seekho, aur apna future banao.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-2 gap-8">
          {[
            { num: '500+', label: 'Students' },
            { num: '95%', label: 'Board Results' },
            { num: '14+', label: 'Saal ka Anubhav' },
            { num: '3', label: 'Expert Faculty' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-black text-white">{s.num}</p>
              <p className="text-xs font-black uppercase tracking-widest text-blue-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -ml-32 -mb-32" />
      </div>

      {/* ====================================================
          RIGHT SIDE - Login Form
          ==================================================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16">
        <div className="w-full max-w-sm space-y-8">

          {/* Header */}
          <div className="text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-2 bg-amber-50 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-amber-700 border border-amber-200 mb-2">
              <Sparkles size={12} fill="currentColor" />
              Student Portal
            </div>

            {step === 'phone' ? (
              <>
                <h2 className="text-3xl font-black text-slate-900">Namaskar! 🙏</h2>
                <p className="text-slate-500 font-medium">
                  Apna mobile number dalo, hum OTP bhejenge
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-black text-slate-900">OTP dalein 🔐</h2>
                <p className="text-slate-500 font-medium">
                  +91-{phone} pe 6-digit OTP bheja hai
                </p>
              </>
            )}
          </div>

          {/* ================================================
              STEP 1: Phone Input
              ================================================ */}
          {step === 'phone' && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Mobile Number
                </label>
                <div className="flex rounded-2xl border-2 border-slate-200 bg-white overflow-hidden focus-within:border-blue-900 transition-colors shadow-sm">
                  {/* +91 prefix */}
                  <div className="flex items-center gap-2 pl-5 pr-3 border-r border-slate-200 bg-slate-50">
                    <span className="text-2xl">🇮🇳</span>
                    <span className="text-sm font-black text-slate-600">+91</span>
                  </div>
                  <input
                    id="phone-input"
                    type="tel"
                    inputMode="numeric"
                    required
                    placeholder="00000 00000"
                    className="flex-1 px-4 py-4 text-lg font-bold outline-none bg-transparent text-slate-900 placeholder:text-slate-300 tracking-wider"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setPhone(val);
                      setError('');
                    }}
                    autoFocus
                  />
                </div>
                {phone.length > 0 && phone.length < 10 && (
                  <p className="text-xs text-slate-400 ml-1">{phone.length}/10 digits</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || phone.length !== 10}
                className="w-full bg-blue-900 text-white py-4 px-8 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 active:scale-95 transition-all disabled:opacity-40 disabled:scale-100 flex items-center justify-center gap-3 group"
              >
                {loading ? (
                  <><RefreshCw size={18} className="animate-spin" /> OTP bhej rahe hain...</>
                ) : (
                  <>OTP Bhejo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>
          )}

          {/* ================================================
              STEP 2: OTP Verification
              ================================================ */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              {/* 6-Box OTP Input */}
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 text-center">
                  6-Digit OTP
                </label>
                <OtpBoxes value={otp} onChange={setOtp} />
              </div>

              {/* Resend Section */}
              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-slate-400 font-medium">
                    Dobara OTP ke liye{' '}
                    <span className="font-black text-blue-900">{countdown}s</span>{' '}
                    wait karo
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={loading}
                    className="text-sm font-black text-amber-600 hover:text-amber-700 underline underline-offset-2 transition-colors disabled:opacity-50"
                  >
                    OTP nahi mila? Dobara bhejo
                  </button>
                )}
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading || otp.replace(/\s/g, '').length < 6}
                className="w-full bg-blue-900 text-white py-4 px-8 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 active:scale-95 transition-all disabled:opacity-40 disabled:scale-100 flex items-center justify-center gap-3 group"
              >
                {loading ? (
                  <><RefreshCw size={18} className="animate-spin" /> Verify ho raha hai...</>
                ) : (
                  <>Portal Mein Jaao <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>

              {/* Back button */}
              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setOtp('');
                  setError('');
                  setSuccessMsg('');
                  if (timerRef.current) clearInterval(timerRef.current);
                  setCountdown(0);
                }}
                className="w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-900 transition-colors py-2"
              >
                <ChevronLeft size={14} /> Number badlo
              </button>
            </form>
          )}

          {/* ================================================
              Messages (Error / Success)
              ================================================ */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 text-sm font-bold flex gap-3 items-start">
              <span className="text-lg">⚠️</span>
              <p>{error}</p>
            </div>
          )}
          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold flex gap-3 items-start">
              <span className="text-lg">✅</span>
              <p>{successMsg}</p>
            </div>
          )}

          {/* Footer */}
          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
            <p className="text-xs font-bold text-slate-400">© Krishna Academy</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="text-xs font-bold text-slate-400 hover:text-blue-900 transition-colors">
                Privacy
              </Link>
              <Link href="/#contact" className="text-xs font-bold text-slate-400 hover:text-blue-900 transition-colors">
                Help
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
