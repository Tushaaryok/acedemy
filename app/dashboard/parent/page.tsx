'use client';

import { useState } from 'react';
import { 
  Heart, 
  Target, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  Phone,
  MessageCircle,
  GraduationCap,
  Bell
} from 'lucide-react';
import Link from 'next/link';

export default function ParentDashboard() {
  const [activeChild, setActiveChild] = useState('Tushar K.');

  const STATS = [
    { label: 'Attendance', value: '94%', icon: <Calendar />, color: 'bg-indigo-600' },
    { label: 'Avg Score', value: '82%', icon: <Target />, color: 'bg-emerald-600' },
    { label: 'Behaviors', value: 'Excellent', icon: <Heart />, color: 'bg-rose-600' },
  ];

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 w-fit px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm">
              <ShieldCheck size={12} /> Parent Guardian Portal
           </div>
           <h1 className="text-5xl font-baloo font-bold text-slate-900 tracking-tight">Parent Desk</h1>
           <p className="text-slate-500 font-medium text-lg">Monitoring educational progress for <span className="text-slate-900 font-bold">{activeChild}</span></p>
        </div>
        
        <div className="flex gap-4">
           <button className="bg-emerald-600 text-white px-8 py-4 rounded-[24px] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-emerald-600/20 hover:scale-105 transition-all">
              <Phone size={18} /> CONTACT MENTOR
           </button>
        </div>
      </div>

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {STATS.map((s) => (
           <div key={s.label} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm group hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-6">
                 <div className={`${s.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform`}>
                    {s.icon}
                 </div>
                 <div className="bg-slate-50 px-3 py-1 rounded-full text-[8px] font-black text-slate-400 uppercase tracking-widest">Live Sync</div>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-4xl font-baloo font-bold text-slate-900 tracking-tight">{s.value}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Academic Timeline */}
         <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm space-y-10">
               <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-baloo font-bold text-slate-900 flex items-center gap-3">
                     <TrendingUp className="text-indigo-600" size={28} /> Academic Growth
                  </h2>
                  <Link href="/dashboard/parent/results" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Full Report Card</Link>
               </div>

               <div className="space-y-6">
                  {[
                    { label: 'Weekly Test #4', score: '42/50', status: 'Excellent', color: 'text-emerald-500' },
                    { label: 'Monthly Assessment', score: '180/200', status: 'In Rank list', color: 'text-indigo-600' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-transparent hover:border-slate-100 hover:bg-white transition-all group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                             <GraduationCap size={20} />
                          </div>
                          <span className="font-bold text-slate-900">{r.label}</span>
                       </div>
                       <div className="text-right">
                          <p className="text-lg font-black text-slate-900 leading-none">{r.score}</p>
                          <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${r.color}`}>{r.status}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-slate-900 rounded-[48px] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                     <h3 className="text-4xl font-baloo font-bold leading-tight tracking-tight">Support your child's journey with Pro Access.</h3>
                     <p className="text-slate-400 font-medium leading-relaxed">Unlock detailed behavioral analytics and 24/7 priority mentor support for your child.</p>
                     <button className="bg-indigo-600 text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all flex items-center gap-3">
                        UPGRADE TO PRO <ArrowRight size={18} />
                     </button>
                  </div>
                  <div className="flex justify-center">
                     <div className="w-48 h-48 bg-white/5 rounded-full border border-white/10 flex items-center justify-center relative">
                        <MessageCircle size={60} className="text-amber-400" />
                        <div className="absolute -top-4 -right-4 bg-rose-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg animate-bounce">2</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Fees & Alerts Sidebar */}
         <div className="lg:col-span-4 space-y-10">
            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Fee Status</h4>
               <div className="space-y-6">
                  <div className="p-8 bg-indigo-50 rounded-[40px] text-center space-y-2 border border-indigo-100">
                     <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">Next Due Amount</p>
                     <p className="text-4xl font-baloo font-bold text-indigo-900">₹5,000</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase">Payable by 25 June</p>
                  </div>
                  <button className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10">
                     PAY CHILD FEES <CreditCard size={16} className="inline ml-2 mb-1" />
                  </button>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
               <div className="flex justify-between items-center">
                  <h4 className="text-xl font-baloo font-bold text-slate-900">Recent Alerts</h4>
                  <Bell size={20} className="text-slate-200" />
               </div>
               <div className="space-y-6">
                  {[
                    { msg: `${activeChild} has joined the Physics Mock exam.`, time: '2h ago' },
                    { msg: 'Weekly performance report is now available.', time: 'Yesterday' },
                  ].map((alert, i) => (
                    <div key={i} className="flex gap-4 group cursor-pointer">
                       <div className="w-1.5 h-auto bg-indigo-500 rounded-full opacity-30 group-hover:opacity-100 transition-opacity" />
                       <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-700 leading-relaxed">{alert.msg}</p>
                          <p className="text-[9px] font-black text-slate-300 uppercase">{alert.time}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
