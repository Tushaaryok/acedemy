'use client';

import { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Search, 
  public_users, 
  ChevronRight,
  Sparkles,
  HelpCircle,
  Clock,
  CheckCircle2,
  Filter,
  MoreVertical,
  Flag
} from 'lucide-react';

export default function TeacherDoubts() {
  const [activeDoubt, setActiveDoubt] = useState('1');

  const DOUBTS = [
    { id: '1', student: 'Amit Vithani', std: 'Std 10 A', title: 'Clarification on Redox balancing', priority: 'high', time: '12m ago' },
    { id: '2', student: 'Priya Rathod', std: 'Std 12 Sci', title: 'Integration by parts doubts', priority: 'normal', time: '1h ago' },
    { id: '3', student: 'Sameer Sheikh', std: 'Std 9', title: 'Definition of Newton\'s 3rd Law', priority: 'normal', time: '4h ago' },
  ];

  return (
    <div className="p-0 max-w-7xl mx-auto h-[calc(100vh-160px)] flex bg-white rounded-[48px] border border-slate-100 shadow-2xl overflow-hidden mt-6">
      
      {/* Sidebar: Faculty Inbox */}
      <div className="w-full md:w-96 border-r border-slate-50 flex flex-col bg-slate-50/50">
         <div className="p-8 space-y-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
               Student Inbox <MessageSquare size={24} className="text-amber-500" />
            </h2>
            <div className="flex gap-2">
               <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    placeholder="Search query tickets..." 
                    className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-4 py-3 text-xs font-bold outline-none focus:ring-4 focus:ring-amber-600/5 transition-all"
                  />
               </div>
               <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all"><Filter size={18} /></button>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-8">
            {DOUBTS.map(doubt => (
              <div 
                key={doubt.id}
                onClick={() => setActiveDoubt(doubt.id)}
                className={`p-6 rounded-[32px] cursor-pointer transition-all border group ${
                  activeDoubt === doubt.id ? 'bg-white border-white shadow-xl scale-[1.02]' : 'bg-transparent border-transparent hover:bg-white/50'
                }`}
              >
                 <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-amber-600 px-2 py-0.5 bg-amber-50 rounded uppercase tracking-widest">{doubt.std}</span>
                    {doubt.priority === 'high' && <Flag size={14} className="text-rose-500 fill-rose-500" />}
                 </div>
                 <h4 className="text-sm font-black text-slate-900 leading-tight group-hover:text-amber-600 transition-colors">{doubt.title}</h4>
                 <div className="flex items-center gap-2 mt-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>{doubt.student}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span>{doubt.time}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Main: Faculty Response Terminal */}
      <div className="flex-1 flex flex-col bg-white">
         <header className="p-8 border-b border-slate-50 flex justify-between items-center bg-white z-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black">
                  {DOUBTS.find(d => d.id === activeDoubt)?.student.charAt(0)}
               </div>
               <div>
                  <h3 className="font-black text-slate-900 text-lg leading-none">{DOUBTS.find(d => d.id === activeDoubt)?.student}</h3>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Student Query ID: #Q-{activeDoubt}421</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <button className="text-[10px] font-black uppercase text-slate-400 hover:text-rose-600 transition-colors">Flag Incident</button>
               <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20">Mark Resolved</button>
               <button className="p-2 text-slate-300 hover:text-slate-900 transition-all"><MoreVertical size={20} /></button>
            </div>
         </header>

         <div className="flex-1 overflow-y-auto p-12 space-y-10 bg-slate-50/10">
            {/* Student Msg */}
            <div className="flex gap-6 max-w-3xl">
               <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0 font-bold">A</div>
               <div className="space-y-4">
                  <div className="bg-white p-8 rounded-[40px] rounded-tl-none border border-slate-100 shadow-sm leading-relaxed text-slate-800 font-medium">
                     Sir, I am still confused about the redox balancing in basic medium. In the last lecture, you mentioned adding OH- ions, but shouldn't we balance oxygen first with H2O?
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                     <span>RECEIVED 12 MIN AGO</span>
                  </div>
               </div>
            </div>

            <div className="flex flex-col items-center py-6">
               <div className="h-px w-32 bg-slate-100" />
               <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] mt-4">Faculty Response Pending</p>
            </div>
         </div>

         {/* Faculty Input */}
         <div className="p-8 bg-white border-t border-slate-50">
            <div className="relative group">
               <textarea 
                 placeholder="Type your academic response or explain the protocol..." 
                 className="w-full bg-slate-50 border border-slate-100 rounded-[32px] p-8 pr-32 text-sm font-medium outline-none focus:ring-4 focus:ring-amber-600/5 resize-none transition-all"
                 rows={1}
               />
               <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                  <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-xl shadow-slate-900/10 hover:bg-emerald-600 transition-all active:scale-95 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                     TRANSMIT <Send size={16} />
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
