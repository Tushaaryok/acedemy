'use client';

import Header from '@/src/components/Header/Header';
import Footer from '@/src/components/Footer/Footer';
import { FileText, Gavel, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      
      <main className="pt-40 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
           <header className="text-center space-y-6 mb-20">
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-900/20">
                 <FileText size={12} /> Institutional Terms
              </div>
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Agreement Ops.</h1>
              <p className="text-slate-500 font-medium text-xl">Rules and regulations for the Krishna Academy community.</p>
           </header>

           <div className="bg-white rounded-[64px] p-12 md:p-24 shadow-2xl shadow-slate-200/40 space-y-16 border border-white">
              
              <section className="space-y-6">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                       <Gavel size={20} />
                    </div>
                    Enrollment Protocol
                 </h2>
                 <p className="text-slate-600 leading-relaxed font-medium">
                    Admission to Krishna Academy is subject to faculty review. Students must adhere to the 75% attendance rule for board preparation stability. Continuous absence without notification may result in batch reassignment.
                 </p>
              </section>

              <section className="space-y-8">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                       <AlertCircle size={20} />
                    </div>
                    Fee Policy & Refund Structure
                 </h2>
                 <div className="space-y-4">
                    {[
                      'Tuition fees are payable monthly via the digital portal.',
                      'A grace period of 5 days is allowed before late-entry flags.',
                      'Fees once paid for a specific term are non-refundable.',
                      'Refund requests for medical emergencies are reviewed by the board.',
                    ].map(rule => (
                      <div key={rule} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors">
                         <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                         <span className="text-sm font-bold text-slate-700 leading-relaxed">{rule}</span>
                      </div>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                    <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
                       <ShieldAlert size={20} />
                    </div>
                    Digital Conduct
                 </h2>
                 <p className="text-slate-600 leading-relaxed font-medium">
                    Students are granted personal licenses to study materials. Redistribution, recording, or publishing Academy resources on unauthorized platforms will result in immediate termination of the Digital ID and legal audit.
                 </p>
              </section>

              <footer className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                 <span>Operational Since 2014</span>
                 <p className="text-center md:text-right">For legal inquiries: <span className="text-slate-900 font-bold">legal@krishnaacademy.com</span></p>
              </footer>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ShieldAlert({ size, className }: { size?: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
       <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
       <line x1="12" y1="8" x2="12" y2="12" />
       <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
