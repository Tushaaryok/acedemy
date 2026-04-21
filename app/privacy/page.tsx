'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { ShieldCheck, Lock, Eye, FileText, ChevronRight } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      
      <main className="pt-40 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
           <header className="text-center space-y-6 mb-20">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100">
                 <ShieldCheck size={12} /> Compliance Certified
              </div>
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">Privacy Guard.</h1>
              <p className="text-slate-500 font-medium text-xl">Integrated digital transparency for parents and students.</p>
           </header>

           <div className="bg-white rounded-[64px] p-12 md:p-24 shadow-2xl shadow-slate-200/40 space-y-16 border border-white">
              
              <section className="space-y-6">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                       <Lock size={20} />
                    </div>
                    Data Collection Philosophy
                 </h2>
                 <p className="text-slate-600 leading-relaxed font-medium">
                    Krishna Academy Upleta is committed to the absolute security of student data. We collect essential identification (Name, Grade, Parent Mobile) exclusively to facilitate academic tracking and government compliance.
                 </p>
              </section>

              <section className="space-y-8">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                       <Eye size={20} />
                    </div>
                    Usage Protocol
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { t: 'Course Progress', d: 'Tracking lesson completion and test performance.' },
                      { t: 'Attendance Audits', d: 'Sharing daily entry/exit with registered parents.' },
                      { t: 'Fee Verification', d: 'Securing transaction audit trails for audits.' },
                      { t: 'Broadcasting', d: 'Sending critical alerts via specialized servers.' },
                    ].map(item => (
                      <div key={item.t} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                         <h4 className="font-black text-slate-900 text-sm italic uppercase tracking-widest border-b border-slate-200 pb-2 mb-3 leading-none">{item.t}</h4>
                         <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.d}</p>
                      </div>
                    ))}
                 </div>
              </section>

              <section className="space-y-6">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                       <FileText size={20} />
                    </div>
                    Third-Party Governance
                 </h2>
                 <p className="text-slate-600 leading-relaxed font-medium">
                    We utilize high-tier encryption via Supabase for database management and Razorpay for financial transactions. Your banking credentials are never stored within the Academy’s internal repositories.
                 </p>
              </section>

              <footer className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                 <span>Last Audit: April 2024</span>
                 <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-900 transition-colors">
                    Request Full Data Log <ChevronRight size={14} />
                 </button>
              </footer>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
