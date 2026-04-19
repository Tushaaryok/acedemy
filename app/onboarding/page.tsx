'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ArrowRight, ArrowLeft, CheckCircle2, User, BookOpen, School, Target, Sparkles } from 'lucide-react';
import { STANDARD_OPTIONS, type UserStandard, type OnboardingData } from '@/lib/types/auth';

// ============================================================
// Onboarding Steps Config
// ============================================================
const STEPS = [
  {
    id: 1,
    icon: User,
    title: 'Apna Naam Batao 👋',
    subtitle: 'Hum tumhe naam se bulayenge',
    color: 'from-blue-900 to-blue-700',
    accent: 'blue',
  },
  {
    id: 2,
    icon: BookOpen,
    title: 'Kaunsi Class Mein Ho? 📚',
    subtitle: 'Sahi content dikhane ke liye',
    color: 'from-amber-600 to-amber-500',
    accent: 'amber',
  },
  {
    id: 3,
    icon: School,
    title: 'School ka Naam Batao 🏫',
    subtitle: 'Optional - skip kar sakte ho',
    color: 'from-emerald-700 to-emerald-500',
    accent: 'emerald',
  },
  {
    id: 4,
    icon: Target,
    title: 'Tumhara Goal Kya Hai? 🎯',
    subtitle: 'Hum tumhara sapna poora karne mein help karenge',
    color: 'from-purple-700 to-purple-500',
    accent: 'purple',
  },
  {
    id: 5,
    icon: Sparkles,
    title: 'Sab Ready Hai! 🎉',
    subtitle: 'Tumhara portal tayaar hai',
    color: 'from-rose-600 to-rose-500',
    accent: 'rose',
  },
];

const GOAL_OPTIONS = [
  { value: 'board_exam', label: '📝 Board Exam mein top karna', icon: '📝' },
  { value: 'jee', label: '🔬 JEE crack karna', icon: '🔬' },
  { value: 'neet', label: '🏥 NEET clear karna', icon: '🏥' },
  { value: 'cuet', label: '🎓 CUET ke liye prepare', icon: '🎓' },
  { value: 'foundation', label: '📖 Strong foundation banana', icon: '📖' },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    full_name: '',
    standard: '',
    school_name: '',
    goal: '',
  });

  const supabase = createClient();
  const router = useRouter();

  const step = STEPS[currentStep - 1];
  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  const canProceed = () => {
    if (currentStep === 1) return data.full_name.trim().length >= 2;
    if (currentStep === 2) return data.standard !== '';
    if (currentStep === 3) return true; // Optional step
    if (currentStep === 4) return data.goal !== '';
    return true;
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((p) => p + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((p) => p - 1);
  };

  const handleFinish = async () => {
    setLoading(true);

    const { data: session } = await supabase.auth.getUser();
    if (!session.user) {
      router.push('/login');
      return;
    }

    const { error } = await supabase
      .from('users')
      .update({
        full_name: data.full_name.trim(),
        standard: data.standard || null,
        school_name: data.school_name.trim() || null,
        onboarding_completed: true,
        onboarding_step: 5,
      })
      .eq('id', session.user.id);

    if (error) {
      console.error('Onboarding save error:', error);
      setLoading(false);
      return;
    }

    // Role check karo
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();

    router.push(`/dashboard/${userData?.role || 'student'}`);
  };

  const IconComponent = step.icon;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">

        {/* ====================================================
            Progress Bar
            ==================================================== */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-xs font-black text-slate-400">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-900 to-amber-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step dots */}
          <div className="flex justify-between mt-3">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`w-2 h-2 rounded-full transition-all ${
                  s.id < currentStep
                    ? 'bg-amber-500'
                    : s.id === currentStep
                    ? 'bg-blue-900 scale-150'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ====================================================
            Card
            ==================================================== */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
          {/* Card Header */}
          <div className={`bg-gradient-to-r ${step.color} p-8 text-white`}>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
              <IconComponent size={28} />
            </div>
            <h2 className="text-2xl font-black leading-tight">{step.title}</h2>
            <p className="text-white/70 font-medium mt-1 text-sm">{step.subtitle}</p>
          </div>

          {/* Card Body */}
          <div className="p-8 space-y-6">

            {/* ======== STEP 1: Name ======== */}
            {currentStep === 1 && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Pura Naam
                </label>
                <input
                  type="text"
                  placeholder="Ram Kumar"
                  autoFocus
                  value={data.full_name}
                  onChange={(e) => setData({ ...data, full_name: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-lg font-bold text-slate-900 outline-none focus:border-blue-900 focus:bg-white transition-all"
                />
                {data.full_name.length > 0 && data.full_name.length < 2 && (
                  <p className="text-xs text-rose-500 font-bold">Naam kam se kam 2 characters ka hona chahiye</p>
                )}
              </div>
            )}

            {/* ======== STEP 2: Standard ======== */}
            {currentStep === 2 && (
              <div className="grid grid-cols-2 gap-3">
                {STANDARD_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setData({ ...data, standard: opt.value as UserStandard })}
                    className={`py-3 px-4 rounded-2xl text-sm font-black border-2 transition-all ${
                      data.standard === opt.value
                        ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-md shadow-amber-200'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* ======== STEP 3: School Name ======== */}
            {currentStep === 3 && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  School / College (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Upleta High School"
                  autoFocus
                  value={data.school_name}
                  onChange={(e) => setData({ ...data, school_name: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-lg font-bold text-slate-900 outline-none focus:border-emerald-700 focus:bg-white transition-all"
                />
                <p className="text-xs text-slate-400 font-medium">
                  Ye optional hai, skip kar sakte ho ➡️
                </p>
              </div>
            )}

            {/* ======== STEP 4: Goal ======== */}
            {currentStep === 4 && (
              <div className="space-y-3">
                {GOAL_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setData({ ...data, goal: opt.value })}
                    className={`w-full py-4 px-5 rounded-2xl text-sm font-bold border-2 transition-all text-left flex items-center gap-3 ${
                      data.goal === opt.value
                        ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md shadow-purple-200'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {data.goal === opt.value && <CheckCircle2 size={18} className="text-purple-500 shrink-0" />}
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* ======== STEP 5: All Done ======== */}
            {currentStep === 5 && (
              <div className="text-center space-y-6">
                <div className="text-6xl">🎉</div>
                <div className="space-y-2">
                  <p className="text-xl font-black text-slate-900">
                    Swagat hai, {data.full_name.split(' ')[0]}!
                  </p>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">
                    Tumhara profile ready hai. Ab padhai shuru karte hain!
                  </p>
                </div>
                {/* Summary */}
                <div className="bg-slate-50 rounded-2xl p-4 text-left space-y-2">
                  {[
                    { label: 'Naam', value: data.full_name },
                    { label: 'Class', value: STANDARD_OPTIONS.find((o) => o.value === data.standard)?.label || '-' },
                    { label: 'School', value: data.school_name || 'Not provided' },
                    { label: 'Goal', value: GOAL_OPTIONS.find((o) => o.value === data.goal)?.label || '-' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span className="text-slate-400 font-bold">{item.label}</span>
                      <span className="text-slate-700 font-black">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Card Footer - Navigation Buttons */}
          <div className="px-8 pb-8 flex gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-black text-sm uppercase tracking-widest hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> Peeche
              </button>
            )}

            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 py-4 rounded-2xl bg-blue-900 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-800 active:scale-95 transition-all disabled:opacity-40 disabled:scale-100 flex items-center justify-center gap-2 group"
              >
                Aage <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                disabled={loading}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-amber-500/30 hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  'Saving...'
                ) : (
                  <>
                    <Sparkles size={16} fill="currentColor" />
                    Dashboard Kholo!
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
