'use client';

import { 
  TrendingUp, 
  Target, 
  Clock, 
  Brain, 
  ChevronRight, 
  ArrowLeft,
  Info,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ExamAnalysis() {
  const SUBJECTS = [
    { name: 'Physics', score: 85, accuracy: '92%', status: 'Strength', color: 'bg-blue-600' },
    { name: 'Mathematics', score: 94, accuracy: '98%', status: 'Master', color: 'bg-emerald-600' },
    { name: 'Chemistry', score: 42, accuracy: '45%', status: 'Weakness', color: 'bg-rose-600' },
  ];

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-4">
           <Link href="/dashboard/student/tests" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
              <ArrowLeft size={14} /> Back to Exam Hall
           </Link>
           <h1 className="text-5xl font-baloo font-bold text-slate-900 tracking-tight">Performance Deep-Dive</h1>
           <p className="text-slate-500 font-medium">Periodic Test: Thermodynamics & Optics • 15 April 2024</p>
        </div>
        <div className="bg-indigo-600 text-white px-10 py-6 rounded-[32px] shadow-2xl shadow-indigo-600/20 text-center">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Global Percentile</p>
           <p className="text-4xl font-baloo font-bold">94.2%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Subject Breakdown */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm space-y-10">
              <h2 className="text-2xl font-baloo font-bold text-slate-900 flex items-center gap-3">
                 <Brain className="text-indigo-600" size={28} /> Subject-wise Precision
              </h2>

              <div className="space-y-10">
                 {SUBJECTS.map((sub) => (
                   <div key={sub.name} className="space-y-4 group">
                      <div className="flex justify-between items-end">
                         <div>
                            <h4 className="text-lg font-bold text-slate-900">{sub.name}</h4>
                            <p className={`text-[10px] font-black uppercase tracking-widest ${
                              sub.status === 'Strength' ? 'text-blue-500' : sub.status === 'Master' ? 'text-emerald-500' : 'text-rose-500'
                            }`}>
                               Knowledge Tier: {sub.status}
                            </p>
                         </div>
                         <div className="text-right">
                            <p className="text-xl font-black text-slate-900">{sub.accuracy}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Correctness</p>
                         </div>
                      </div>
                      <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden">
                         <div 
                           className={`h-full ${sub.color} transition-all duration-1000 group-hover:scale-x-105 origin-left`} 
                           style={{ width: sub.accuracy }}
                         ></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden">
              <div className="relative z-10 space-y-10">
                 <h2 className="text-2xl font-baloo font-bold flex items-center gap-3">
                    <Target className="text-amber-500" size={28} /> Error Correction Roadmap
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
                       <div className="flex items-center gap-3 text-rose-400">
                          <XCircle size={20} /> <span className="text-[10px] font-black uppercase tracking-widest">Weak Chapter</span>
                       </div>
                       <h4 className="font-bold text-lg">Organic Conversions</h4>
                       <p className="text-xs text-slate-400 leading-relaxed italic">"Focus on Nucleophilic Substitution mechanisms. Refer to Ram Sir's Chapter 4 Notes."</p>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
                       <div className="flex items-center gap-3 text-amber-400">
                          <AlertCircle size={20} /> <span className="text-[10px] font-black uppercase tracking-widest">Time Pitfall</span>
                       </div>
                       <h4 className="font-bold text-lg">Question 14 (Maths)</h4>
                       <p className="text-xs text-slate-400 leading-relaxed italic">"You spent 4.5 minutes here. Average time was 1.2 minutes. Master the shortcut trick."</p>
                    </div>
                 </div>
              </div>
              <TrendingUp className="absolute -bottom-10 -right-10 text-white opacity-5" size={300} />
           </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-10">
           <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm text-center space-y-8">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                 <CheckCircle2 size={32} />
              </div>
              <div>
                 <h4 className="text-xl font-baloo font-bold text-slate-900">Elite Standing</h4>
                 <p className="text-xs text-slate-500 font-medium px-4">You have achieved a Rank #1 in your batch for this assessment.</p>
              </div>
              <button className="w-full py-5 bg-slate-900 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10">
                 SHARE ACHIEVEMENT
              </button>
           </div>

           <div className="bg-indigo-600 p-10 rounded-[48px] text-white shadow-2xl shadow-indigo-500/20 space-y-10">
              <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-2">Next Leap</p>
                 <h3 className="text-2xl font-baloo font-bold">Bridge the Gap</h3>
              </div>
              <div className="space-y-4">
                 {[
                   'Solve 15 Chemistry PYQs',
                   'Watch Integration Masterclass',
                   'Review Question 14 Solution'
                 ].map((task, i) => (
                   <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-6 h-6 border-2 border-indigo-400 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all">
                        <CheckCircle2 size={12} className="text-transparent group-hover:text-white" />
                      </div>
                      <span className="text-xs font-bold opacity-80">{task}</span>
                   </div>
                 ))}
              </div>
              <button className="w-full py-5 bg-white text-indigo-600 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all transform active:scale-95">
                 START PRACTICE <ChevronRight size={16} className="inline ml-1" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
