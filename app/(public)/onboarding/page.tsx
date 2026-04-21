// app/(public)/onboarding/page.tsx
import { type FC } from 'react';
import { OnboardingForm } from '@/components/onboarding/onboarding-form';

/**
 * Onboarding Layout for Krishna Academy Upleta.
 * Directs newly authenticated scholars to complete their academic profiles.
 */
const OnboardingPage: FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-baloo font-black text-slate-900 mb-2">Swagat Hai! 🎓</h1>
        <p className="text-slate-500 font-bold italic">Bas kuch details aur, phir shuru karte hain apki padhai.</p>
      </div>

      <OnboardingForm />

      <footer className="mt-20 text-center">
        <p className="text-slate-300 text-xs font-black uppercase tracking-widest">
          Krishna Academy Upleta — Digital Campus
        </p>
      </footer>
    </div>
  );
};

export default OnboardingPage;
