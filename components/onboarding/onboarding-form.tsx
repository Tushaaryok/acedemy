// components/onboarding/onboarding-form.tsx
'use client';

import { type FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  School, 
  ArrowRight, 
  ChevronLeft,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import api from '@/lib/api';

interface Batch {
  id: string;
  name: string;
}

/**
 * Premium 5-Step Onboarding experience for Krishna Academy.
 * Orchestrates student profile setup with Hinglish contextual cues.
 */
export const OnboardingForm: FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    standard: '',
    batchId: '',
    schoolName: '',
    city: 'Upleta'
  });

  const [batches, setBatches] = useState<Batch[]>([]);

  // Fetch batches when standard changes
  useEffect(() => {
    if (formData.standard) {
      api.get(`/batches?standard=${formData.standard}`)
        .then(res => setBatches(res.data.data))
        .catch(() => setBatches([]));
    }
  }, [formData.standard]);

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
    { title: "Konsi Class Mein Ho?", subtitle: "Select your current academic standard" },
    { title: "Batch Chunneiye", subtitle: "Select your assigned batch for this session" },
    { title: "School ka Naam?", subtitle: "Tell us where you study (Optional)" },
    { title: "Final Review", subtitle: "Ensure everything is correct" }
  ];

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress Bar */}
      <div className="flex gap-2 mb-10 px-4">
        {[1, 2, 3, 4, 5].map((s) => (
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
          <h2 className="text-3xl font-baloo font-black text-slate-900 mb-2">
            {steps[step - 1].title}
          </h2>
          <p className="text-slate-400 font-bold mb-10 text-sm italic">
            {steps[step - 1].subtitle}
          </p>

          {/* STEP 1: NAME */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                <input 
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 border-2 border-slate-50 focus:border-amber-500 focus:bg-white rounded-3xl py-6 pl-16 pr-6 outline-none transition-all font-bold"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>
          )}

          {/* STEP 2: STANDARD */}
          {step === 2 && (
            <div className="grid grid-cols-2 gap-4">
              {['9', '10', '11', '12'].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setFormData({...formData, standard: s});
                    nextStep();
                  }}
                  className={cn(
                    "py-8 rounded-3xl border-2 transition-all font-black text-2xl flex flex-col items-center gap-2",
                    formData.standard === s 
                      ? "border-amber-500 bg-amber-50 text-amber-600" 
                      : "border-slate-100 hover:border-slate-200 text-slate-400"
                  )}
                >
                  <GraduationCap size={32} />
                  Class {s}
                </button>
              ))}
            </div>
          )}

          {/* STEP 3: BATCH */}
          {step === 3 && (
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
                  <span className="font-bold text-lg">{b.name} ({formData.standard}th)</span>
                  {formData.batchId === b.id && <CheckCircle2 className="text-amber-500" />}
                </button>
              )) : (
                <p className="text-center text-slate-400 italic">Is class ke liye abhi batches nahi hain.</p>
              )}
            </div>
          )}

          {/* STEP 4: SCHOOL */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="relative">
                <School className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                <input 
                  type="text"
                  placeholder="e.g. Upleta High School"
                  className="w-full bg-slate-50 border-2 border-slate-50 focus:border-amber-500 focus:bg-white rounded-3xl py-6 pl-16 pr-6 outline-none transition-all font-bold"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                />
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW */}
          {step === 5 && (
            <div className="space-y-4 bg-slate-50 p-6 rounded-3xl">
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Name</span>
                <span className="font-bold">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Education</span>
                <span className="font-bold">Class {formData.standard}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Batch</span>
                <span className="font-bold">{batches.find(b => b.id === formData.batchId)?.name || 'N/A'}</span>
              </div>
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
            
            {step < 5 ? (
              step !== 2 && (
                <button 
                  onClick={nextStep}
                  disabled={!formData.fullName && step === 1 || !formData.batchId && step === 3}
                  className="flex-1 bg-slate-900 text-white rounded-3xl py-5 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  Aage Badhein <ArrowRight size={18} />
                </button>
              )
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-amber-500 text-white rounded-3xl py-5 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>Shuru Karein! <CheckCircle2 size={18} /></>}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
