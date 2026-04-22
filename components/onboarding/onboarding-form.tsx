// components/onboarding/onboarding-form.tsx
'use client';

import { type FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  Target, 
  ArrowRight, 
  ChevronLeft,
  CheckCircle2,
  Loader2,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

interface Batch {
  id: string;
  name: string;
}

/**
 * Premium 4-Step Onboarding experience for Krishna Academy.
 * Orchestrates student profile setup with Hinglish contextual cues.
 */
export const OnboardingForm: FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    standard: '',
    stream: '',
    goal: '',
    batchId: ''
  });

  const [batches, setBatches] = useState<Batch[]>([]);

  // Fetch batches when goal or standard changes
  useEffect(() => {
    if (formData.standard && formData.goal) {
      api.get(`/batches?standard=${formData.standard}&goal=${formData.goal}`)
        .then(res => setBatches(res.data.data))
        .catch(() => setBatches([]));
    }
  }, [formData.standard, formData.goal]);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.post('/auth/onboarding', formData);
      if (res.data.success) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Onboarding error', err);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: "Apka Naam?", subtitle: "Enter your full name to get started" },
    { title: "Class & Stream", subtitle: "Select your current academic path" },
    { title: "Target Goal?", subtitle: "What are you preparing for?" },
    { title: "Batch Chunneiye", subtitle: "Select your assigned batch" }
  ];

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress Bar */}
      <div className="flex gap-2 mb-10 px-4">
        {[1, 2, 3, 4].map((s) => (
          <div 
            key={s}
            className={cn(
              "h-2 flex-1 rounded-full transition-all duration-500",
              s <= step ? "bg-amber-500" : "bg-slate-100"
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-slate-200/50"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-baloo font-black text-slate-900 mb-2">
                {steps[step - 1].title}
              </h2>
              <p className="text-slate-400 font-bold text-sm italic">
                {steps[step - 1].subtitle}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
              {step === 1 && <User size={24} />}
              {step === 2 && <GraduationCap size={24} />}
              {step === 3 && <Target size={24} />}
              {step === 4 && <Sparkles size={24} />}
            </div>
          </div>

          {/* STEP 1: NAME */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  autoFocus
                  className="w-full bg-slate-50 border-2 border-slate-50 focus:border-amber-500 focus:bg-white rounded-3xl py-6 px-6 outline-none transition-all font-bold text-lg"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  onKeyDown={(e) => e.key === 'Enter' && formData.fullName.length > 2 && nextStep()}
                />
              </div>
            </div>
          )}

          {/* STEP 2: CLASS & STREAM */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {['9', '10', '11', '12'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFormData({...formData, standard: s})}
                    className={cn(
                      "py-6 rounded-3xl border-2 transition-all font-black text-xl flex flex-col items-center gap-1",
                      formData.standard === s 
                        ? "border-amber-500 bg-amber-50 text-amber-600" 
                        : "border-slate-100 hover:border-slate-200 text-slate-400"
                    )}
                  >
                    Class {s}
                  </button>
                ))}
              </div>

              {['11', '12'].includes(formData.standard) && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-2">Select Stream</p>
                  <div className="flex gap-3">
                    {['Science', 'Commerce', 'Arts'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setFormData({...formData, stream: st})}
                        className={cn(
                          "flex-1 py-4 rounded-2xl border-2 transition-all font-bold text-xs uppercase tracking-widest",
                          formData.stream === st 
                            ? "border-amber-500 bg-amber-50 text-amber-600" 
                            : "border-slate-100 text-slate-400"
                        )}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* STEP 3: GOAL */}
          {step === 3 && (
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'boards', name: 'Board Exams', sub: 'School state/center boards' },
                { id: 'jee', name: 'JEE Main/Adv', sub: 'Engineering Entrance' },
                { id: 'neet', name: 'NEET UG', sub: 'Medical Entrance' },
                { id: 'cuet', name: 'CUET', sub: 'Central Universities' }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setFormData({...formData, goal: g.id});
                    nextStep();
                  }}
                  className={cn(
                    "p-6 rounded-3xl border-2 transition-all flex items-center justify-between text-left",
                    formData.goal === g.id 
                      ? "border-amber-500 bg-amber-50" 
                      : "border-slate-50 hover:border-slate-100"
                  )}
                >
                  <div>
                    <p className={cn("font-black text-lg", formData.goal === g.id ? "text-amber-600" : "text-slate-900")}>{g.name}</p>
                    <p className="text-xs text-slate-400 font-bold italic">{g.sub}</p>
                  </div>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    formData.goal === g.id ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-300"
                  )}>
                    <CheckCircle2 size={20} />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* STEP 4: BATCH */}
          {step === 4 && (
            <div className="space-y-4">
              {batches.length > 0 ? batches.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setFormData({...formData, batchId: b.id})}
                  className={cn(
                    "w-full p-6 rounded-3xl border-2 flex items-center justify-between transition-all",
                    formData.batchId === b.id
                      ? "border-amber-500 bg-amber-50 text-amber-600"
                      : "border-slate-100 text-slate-500"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                      <BookOpen size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <span className="font-bold text-lg block leading-tight">{b.name}</span>
                      <span className="text-[10px] font-black uppercase text-slate-400">Class {formData.standard} • {formData.goal}</span>
                    </div>
                  </div>
                  {formData.batchId === b.id && <CheckCircle2 className="text-amber-500" />}
                </button>
              )) : (
                <div className="text-center p-10 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                   <p className="text-slate-400 font-bold italic mb-2">Abhi is category ke liye batches nahi hain.</p>
                   <p className="text-[10px] font-black uppercase text-slate-400">Pehle settings change karein</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 flex items-center gap-4">
            {step > 1 && (
              <button 
                onClick={prevStep}
                className="p-5 bg-slate-100 text-slate-400 rounded-3xl hover:bg-slate-200 transition-all"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            
            {step < 4 ? (
              step !== 3 && (
                <button 
                  onClick={nextStep}
                  disabled={!formData.fullName && step === 1 || !formData.standard && step === 2}
                  className="flex-1 bg-slate-900 text-white rounded-3xl py-5 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50 shadow-xl shadow-slate-900/10"
                >
                  {step === 1 ? "Start Journey" : "Next Step"} <ArrowRight size={18} />
                </button>
              )
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={loading || !formData.batchId}
                className="flex-1 bg-amber-500 text-white rounded-3xl py-5 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>Finish Setup <CheckCircle2 size={18} /></>}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="text-center mt-8 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
        Krishna Academy Upleta • Student Portal v1.0
      </p>
    </div>
  );
};
