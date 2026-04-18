'use client';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  ChevronRight, 
  PieChart, 
  Clock, 
  Target,
  ArrowUpRight,
  TrendingUp,
  Download
} from 'lucide-react';
import Link from 'next/link';

export default function TestResults() {
  const RESULTS = {
    score: 82,
    total: 100,
    correct: 21,
    incorrect: 3,
    skipped: 1,
    percentile: 94.2,
    timeTaken: '22:15',
    accuracy: 88,
    accuracyChange: '+5%',
    breakdown: [
      { chapter: 'Trigonometry', accuracy: 100, status: 'Mastered' },
      { chapter: 'Real Numbers', accuracy: 80, status: 'Improving' },
      { chapter: 'Polynomials', accuracy: 65, status: 'Needs Review' },
    ]
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-20">
      {/* Result Hero */}
      <div className="bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden text-center md:text-left">
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="space-y-6">
               <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/30">
                  <Trophy size={14} /> Outstanding Performance
               </div>
               <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                  You scored <span className="text-blue-400">{RESULTS.score}%</span>
               </h1>
               <p className="text-slate-400 text-lg font-medium max-w-md">
                  Great work! You are performing better than {RESULTS.percentile}% of students in this batch.
               </p>
               <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <button className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-900/40">Review Answers</button>
                  <button className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"><Download size={16} /> Download PDF</button>
               </div>
            </div>

            {/* Circular Progress Ring Mock */}
            <div className="relative w-64 h-64 shrink-0 flex items-center justify-center">
               <div className="absolute inset-0 rounded-full border-[16px] border-white/5"></div>
               <div className="absolute inset-0 rounded-full border-[16px] border-blue-500 border-t-transparent border-l-transparent -rotate-45"></div>
               <div className="text-center">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Accuracy</p>
                  <p className="text-5xl font-black text-white">{RESULTS.accuracy}%</p>
               </div>
            </div>
         </div>
         
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {[
           { label: 'Correct', value: RESULTS.correct, icon: <CheckCircle2 className="text-emerald-500" />, color: 'bg-emerald-50' },
           { label: 'Incorrect', value: RESULTS.incorrect, icon: <XCircle className="text-rose-500" />, color: 'bg-rose-50' },
           { label: 'Skipped', value: RESULTS.skipped, icon: <MinusCircle className="text-slate-400" />, color: 'bg-slate-50' },
           { label: 'Time', value: RESULTS.timeTaken, icon: <Clock className="text-blue-500" />, color: 'bg-blue-50' },
         ].map(stat => (
           <div key={stat.label} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className={`${stat.color} p-4 rounded-2xl mb-4`}>{stat.icon}</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Chapter Breakdown */}
         <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center justify-between">
               Topic Proficiency <PieChart className="text-blue-900" size={24} />
            </h2>
            <div className="space-y-8">
               {RESULTS.breakdown.map((item, i) => (
                 <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-sm font-bold text-slate-900">{item.chapter}</p>
                          <p className={`text-[10px] font-black uppercase tracking-widest ${item.status === 'Mastered' ? 'text-emerald-500' : item.status === 'Improving' ? 'text-amber-500' : 'text-rose-500'}`}>{item.status}</p>
                       </div>
                       <span className="text-base font-black text-slate-900">{item.accuracy}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden shadow-inner">
                       <div className={`h-full transition-all duration-1000 ${
                         item.accuracy > 80 ? 'bg-emerald-500' : item.accuracy > 50 ? 'bg-amber-500' : 'bg-rose-500'
                       }`} style={{ width: `${item.accuracy}%` }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Growth Insights */}
         <div className="bg-blue-900 rounded-[40px] p-10 text-white relative overflow-hidden">
            <TrendingUp size={120} className="absolute -bottom-10 -right-10 text-white/5" />
            <div className="relative z-10">
               <h2 className="text-2xl font-black mb-6">Learning Path Insight</h2>
               <p className="text-blue-200 text-lg font-medium leading-relaxed mb-10">
                  Your accuracy in **Real Numbers** has increased by 15% since the last attempt. To reach the 98th percentile, you should focus on **Polynomials** as they represent your current weakest link.
               </p>
               <div className="space-y-4">
                  <div className="bg-white/10 p-6 rounded-3xl border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/20 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white"><Target size={20} /></div>
                        <div>
                           <p className="text-xs font-bold">Recommended Resource</p>
                           <p className="text-[10px] font-black uppercase text-blue-300">Polynomials Advanced Masterclass</p>
                        </div>
                     </div>
                     <ArrowUpRight size={20} className="text-blue-300 group-hover:text-white transition-all" />
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="pt-10 flex flex-col md:flex-row justify-center gap-6">
         <Link href="/dashboard/student/tests" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-center shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all">Back to Tests Hub</Link>
         <Link href="/dashboard/student" className="bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-center shadow-sm hover:bg-slate-50 transition-all">Go to Dashboard</Link>
      </div>
    </div>
  );
}
