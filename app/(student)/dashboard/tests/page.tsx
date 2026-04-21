'use client';

import { useState } from 'react';
import { 
  Trophy, 
  Clock, 
  ClipboardCheck, 
  ArrowRight, 
  Timer, 
  Info,
  ChevronRight,
  TrendingUp,
  Target
} from 'lucide-react';
import Link from 'next/link';

export default function StudentTests() {
  const [activeTab, setActiveTab] = useState<'available' | 'completed'>('available');

  const TESTS = [
    { id: '1', title: 'Unit Test: Thermodynamics', subject: 'Physics', questions: 25, duration: '45m', deadline: 'Today, 6:00 PM', status: 'available', priority: 'high' },
    { id: '2', title: 'Board Pattern: Algebra', subject: 'Maths', questions: 50, duration: '120m', deadline: 'Tomorrow', status: 'available', priority: 'normal' },
    { id: '3', title: 'Periodic Class: Organic', subject: 'Chemistry', questions: 15, duration: '20m', deadline: '24 Apr', status: 'available', priority: 'normal' },
  ];

  const RESULTS = [
    { id: 'r1', title: 'Periodic Test: Optics', score: '48/50', rank: '1', date: '15 Apr' },
    { id: 'r2', title: 'Surprise Quiz: Calculus', score: '18/20', rank: '4', date: '12 Apr' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 min-h-screen bg-white/50">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
           <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 w-fit px-3 py-1 rounded-full border border-indigo-100 mb-2">
              <ClipboardCheck size={12} /> Assessment Center
           </div>
           <h1 className="text-5xl font-baloo font-bold text-slate-900 tracking-tight">Exam Hall</h1>
           <p className="text-slate-500 font-medium text-lg">Measure your progress and dominate the leaderboards.</p>
        </div>
        
        <div className="flex gap-4 p-1.5 bg-slate-100 rounded-[28px] border border-slate-200">
           {['available', 'completed'].map(tab => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`px-8 py-3 rounded-[22px] text-xs font-black uppercase tracking-widest transition-all ${
                 activeTab === tab ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Test List */}
        <div className="lg:col-span-2 space-y-8">
           {activeTab === 'available' ? (
             <div className="space-y-6">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                   <Timer size={14} /> Active for your batch
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {TESTS.map(test => (
                    <div key={test.id} className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all group relative overflow-hidden">
                       <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                          <div className="space-y-4">
                             <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                  test.priority === 'high' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-500'
                                }`}>
                                   {test.priority === 'high' ? 'Priority Test' : 'Upcoming'}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{test.subject}</span>
                             </div>
                             <h3 className="text-2xl font-baloo font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{test.title}</h3>
                             <div className="flex flex-wrap gap-x-6 gap-y-2">
                                <span className="flex items-center gap-2 text-xs font-bold text-slate-500"><ClipboardCheck size={14} /> {test.questions} Questions</span>
                                <span className="flex items-center gap-2 text-xs font-bold text-slate-500"><Clock size={14} /> {test.duration}</span>
                                <span className="flex items-center gap-2 text-xs font-bold text-slate-500 italic"><Info size={14} /> Deadline: {test.deadline}</span>
                             </div>
                          </div>
                          
                          <button className="bg-slate-900 text-white px-8 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                             Begin Assessment
                          </button>
                       </div>
                       
                       <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-indigo-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  ))}
                </div>
             </div>
           ) : (
             <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                   <Target size={14} /> Performance History
                </div>
                <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                   <table className="w-full text-left">
                      <thead className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
                         <tr>
                            <th className="px-10 py-6">Test Detail</th>
                            <th className="px-10 py-6">Achieved Score</th>
                            <th className="px-10 py-6">Batch Rank</th>
                            <th className="px-10 py-6 text-right">Action</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {RESULTS.map(res => (
                           <tr key={res.id} className="group hover:bg-indigo-50/30 transition-all">
                              <td className="px-10 py-8">
                                 <p className="font-black text-slate-900 leading-none mb-1">{res.title}</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{res.date}</p>
                              </td>
                              <td className="px-10 py-8">
                                 <span className="text-lg font-black text-slate-900">{res.score}</span>
                              </td>
                              <td className="px-10 py-8">
                                 <div className="flex items-center gap-2">
                                    <Trophy size={14} className={res.rank === '1' ? 'text-amber-500' : 'text-slate-300'} />
                                    <span className="font-black text-slate-900">#{res.rank}</span>
                                 </div>
                              </td>
                              <td className="px-10 py-8 text-right">
                                 <Link href="/dashboard/student/tests/analysis" className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-900">Analysis</Link>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
           )}
        </div>

        {/* Analytics Sidecard */}
        <div className="space-y-10">
           <div className="bg-indigo-600 p-10 rounded-[48px] text-white shadow-2xl shadow-indigo-600/20 relative overflow-hidden group">
              <div className="relative z-10 space-y-8">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-2">Academic Standing</p>
                    <h3 className="text-3xl font-black tracking-tight">Consistency King</h3>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-4xl font-black">94.2%</p>
                          <p className="text-[10px] font-black uppercase text-indigo-300 tracking-widest">Global percentile</p>
                       </div>
                       <TrendingUp className="text-emerald-400" size={32} />
                    </div>
                    
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-400 w-[94%]" />
                    </div>
                 </div>

                 <p className="text-xs font-medium text-indigo-100 leading-relaxed italic">
                    "You are currently in the Top 5% of your batch. Maintain this streak to unlock the 'Elite Scholar' badge."
                 </p>
              </div>
              <div className="absolute -right-16 -top-16 opacity-5 transform rotate-45">
                 <Target size={240} />
              </div>
           </div>

           <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
               <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Test Preparation</h4>
               <div className="space-y-3">
                  {[
                    'Previous Year Papers',
                    'Chapter Revision Notes',
                    'Doubt Resolution Portal'
                  ].map(tool => (
                    <div key={tool} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer group">
                       <span className="text-xs font-bold text-slate-700">{tool}</span>
                       <ChevronRight size={14} className="text-slate-300 group-hover:text-amber-600 transition-colors" />
                    </div>
                  ))}
               </div>
           </div>
        </div>
      </div>
    </div>
  );
}
