'use client';

import { useState } from 'react';
import { 
  Trophy, 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ChevronRight,
  User,
  GraduationCap,
  Sparkles,
  BarChart3
} from 'lucide-react';

export default function FacultyResults() {
  const [filter, setFilter] = useState('All Batches');

  const RESULTS = [
    { id: '1', name: 'Amit Vithani', test: 'Periodic Test 01', score: '48/50', accuracy: '96%', rank: '1', badge: 'Gold' },
    { id: '2', name: 'Priya Rathod', test: 'Periodic Test 01', score: '46/50', accuracy: '92%', rank: '2', badge: 'Silver' },
    { id: '3', name: 'Sameer Sheikh', test: 'Periodic Test 01', score: '32/50', accuracy: '64%', rank: '12', badge: 'None' },
    { id: '4', name: 'Riya Patel', test: 'Mock JEE #4', score: '182/300', accuracy: '61%', rank: '5', badge: 'Silver' },
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-2">
           <h1 className="text-5xl font-baloo font-bold text-slate-900 tracking-tight">Academic Results</h1>
           <p className="text-slate-500 font-medium text-lg italic">Monitor student performance and award academic badges.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto">
           <div className="relative flex-1 lg:w-80 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-900" size={20} />
              <input 
                placeholder="Search scholar by name..."
                className="w-full bg-white border border-slate-200 rounded-[28px] pl-16 pr-8 py-5 text-sm font-medium outline-none focus:ring-4 focus:ring-blue-900/5 transition-all shadow-sm"
              />
           </div>
           <button className="p-5 bg-white border border-slate-200 rounded-[24px] text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
              <Filter size={22} />
           </button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-indigo-900 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group h-[220px] flex flex-col justify-between">
            <div className="relative z-10">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-2">Platform Average</p>
               <h3 className="text-4xl font-baloo font-bold">78.4%</h3>
            </div>
            <div className="relative z-10 flex items-center justify-between">
               <p className="text-xs font-medium text-indigo-300">Across all batches this month</p>
               <BarChart3 className="text-indigo-500" size={32} />
            </div>
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
         </div>

         <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm h-[220px] flex flex-col justify-between">
            <div>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Top Performer</p>
               <h3 className="text-3xl font-baloo font-bold text-slate-900">Amit Vithani</h3>
            </div>
            <div className="flex items-center gap-3 text-emerald-600 font-black text-[10px] uppercase tracking-widest border border-emerald-100 bg-emerald-50 w-fit px-4 py-2 rounded-full">
               <Trophy size={14} /> Global Rank #1
            </div>
         </div>

         <div className="bg-emerald-600 p-10 rounded-[48px] text-white shadow-2xl shadow-emerald-500/20 h-[220px] flex flex-col justify-between group cursor-pointer hover:scale-105 transition-all">
            <div className="relative z-10">
               <h3 className="text-2xl font-baloo font-bold leading-tight">Generate Report Card</h3>
               <p className="text-emerald-100 text-[10px] uppercase font-black tracking-widest mt-2">Export Batch Summary (PDF)</p>
            </div>
            <Download size={40} className="relative z-10 group-hover:translate-y-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
         </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden pb-10">
         <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-xl font-baloo font-bold text-slate-900">Batch-wise Rankings</h2>
            <div className="flex gap-4">
               {['All Batches', 'Class 10', 'Class 12'].map(tab => (
                 <button 
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    filter === tab ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200'
                  }`}
                 >
                   {tab}
                 </button>
               ))}
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-white text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
                  <tr>
                     <th className="px-10 py-8">Scholar Info</th>
                     <th className="px-10 py-8">Assessment</th>
                     <th className="px-10 py-8">Result Stats</th>
                     <th className="px-10 py-8">Badge / Honor</th>
                     <th className="px-10 py-8 text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {RESULTS.map(res => (
                    <tr key={res.id} className="group hover:bg-slate-50/80 transition-all">
                       <td className="px-10 py-10">
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-baloo font-bold">
                                {res.name.charAt(0)}
                             </div>
                             <div>
                                <p className="font-bold text-slate-900 leading-none mb-1">{res.name}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Std 12 Science</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10">
                          <div className="flex flex-col gap-1">
                             <span className="text-sm font-bold text-slate-700">{res.test}</span>
                             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">14 Apr 2024</span>
                          </div>
                       </td>
                       <td className="px-10 py-10">
                          <div className="flex items-center gap-6">
                             <div>
                                <p className="text-xl font-black text-slate-900 leading-none">{res.score}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">Numerical</p>
                             </div>
                             <div className="w-px h-8 bg-slate-100"></div>
                             <div>
                                <p className="text-xl font-black text-emerald-600 leading-none">{res.accuracy}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">Accuracy</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-10">
                          <div className="flex items-center gap-3">
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 ${
                               res.badge === 'Gold' ? 'bg-amber-50 border-amber-500/20 text-amber-500' : 
                               res.badge === 'Silver' ? 'bg-slate-50 border-slate-400/20 text-slate-400' : 
                               'bg-slate-50 border-transparent text-slate-200'
                             }`}>
                                <Sparkles size={18} fill={res.badge !== 'None' ? 'currentColor' : 'none'} />
                             </div>
                             <span className="text-xs font-black text-slate-900 uppercase tracking-widest">#{res.rank} Ranking</span>
                          </div>
                       </td>
                       <td className="px-10 py-10 text-right">
                          <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-900 hover:border-blue-900 transition-all shadow-sm">
                             <ArrowUpRight size={20} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
