'use client';

import { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Image as ImageIcon, 
  FileText, 
  User, 
  ChevronRight,
  Sparkles,
  HelpCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';

export default function StudentDoubts() {
  const [activeDoubt, setActiveDoubt] = useState('1');

  const DOUBTS = [
    { id: '1', subject: 'Mathematics', title: 'Integration by parts method clarification', status: 'resolved', time: '2h ago', teacher: 'Ram Sir' },
    { id: '2', subject: 'Physics', title: 'Why is the refractive index variable in some mediums?', status: 'pending', time: '5h ago', teacher: 'Ram Sir' },
    { id: '3', subject: 'Chemistry', title: 'Need more examples of redox reactions', status: 'pending', time: '1d ago', teacher: 'Jayesh Sir' },
  ];

  return (
    <div className="p-0 max-w-7xl mx-auto h-[calc(100vh-160px)] flex bg-white rounded-[48px] border border-slate-100 shadow-2xl overflow-hidden mt-6">
      
      {/* Sidebar: Doubt List */}
      <div className="w-full md:w-96 border-r border-slate-50 flex flex-col bg-slate-50/50">
         <div className="p-8 space-y-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
               Doubt Desk <HelpCircle size={24} className="text-indigo-600" />
            </h2>
            <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                 placeholder="Search your queries..." 
                 className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-4 py-3 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all"
               />
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
                    <span className="text-[10px] font-black text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded uppercase tracking-widest">{doubt.subject}</span>
                    {doubt.status === 'resolved' ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Clock size={14} className="text-amber-500" />}
                 </div>
                 <h4 className="text-sm font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{doubt.title}</h4>
                 <div className="flex items-center gap-2 mt-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>{doubt.teacher}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span>{doubt.time}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Main: Chat View */}
      <div className="flex-1 flex flex-col bg-white">
         <header className="p-8 border-b border-slate-50 flex justify-between items-center">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black">
                  {DOUBTS.find(d => d.id === activeDoubt)?.teacher.charAt(0)}
               </div>
               <div>
                  <h3 className="font-black text-slate-900 text-lg leading-none">{DOUBTS.find(d => d.id === activeDoubt)?.teacher}</h3>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Responding to your Academic Query</p>
               </div>
            </div>
            <button className="bg-slate-50 text-slate-400 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Close Query</button>
         </header>

         <div className="flex-1 overflow-y-auto p-12 space-y-10 bg-slate-50/20">
            {/* Student Msg */}
            <div className="flex gap-6 max-w-3xl">
               <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0"><User size={20} /></div>
               <div className="space-y-4">
                  <div className="bg-white p-8 rounded-[40px] rounded-tl-none border border-slate-100 shadow-sm leading-relaxed text-slate-700 font-medium">
                     How should I approach the integration of 1 / (1 + sin x) using the substitution method or the identity method? I'm getting confused between the two protocols.
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                     <span>SENT 09:12 AM</span>
                  </div>
               </div>
            </div>

            {/* Teacher Msg */}
            <div className="flex gap-6 max-w-3xl ml-auto flex-row-reverse">
               <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 font-black">R</div>
               <div className="space-y-4 flex flex-col items-end">
                  <div className="bg-indigo-600 text-white p-8 rounded-[40px] rounded-tr-none shadow-xl shadow-indigo-600/20 leading-relaxed font-medium">
                     That's a great question! For this specific integral, using the identity approach (multiplying by 1-sin x) is much more robust than a direct substitution. I'll share a step-by-step resolution PDF below to help you visualize the identity transformation.
                  </div>
                  <div className="bg-white/50 border border-slate-100 p-4 rounded-3xl flex items-center gap-4 group cursor-pointer hover:bg-white transition-all shadow-sm">
                     <FileText className="text-indigo-600" />
                     <div className="text-left pr-4">
                        <p className="text-xs font-black text-slate-900 leading-none">Integral_Protocol_12.pdf</p>
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mt-1">Ready for study</p>
                     </div>
                     <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-600 transition-all" />
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                     <span>RECIEVED 10:45 AM</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Chat Input */}
         <div className="p-8 bg-white border-t border-slate-50">
            <div className="relative group">
               <textarea 
                 placeholder="Type your academic doubt or follow-up question..." 
                 className="w-full bg-slate-50 border border-slate-100 rounded-[32px] p-8 pr-32 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-600/5 resize-none transition-all"
                 rows={1}
               />
               <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                  <button className="p-3 text-slate-300 hover:text-indigo-600 transition-all"><ImageIcon size={20} /></button>
                  <button className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl shadow-slate-900/10 hover:bg-indigo-600 transition-all active:scale-95">
                     <Send size={20} />
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Context Panel (Hidden on Small screens) */}
      <div className="hidden lg:flex w-80 border-l border-slate-50 flex-col p-10 space-y-10 bg-slate-50/50">
         <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Query Metadata</h4>
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 space-y-4 shadow-sm">
               <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase">Assigned Faculty</p>
                  <p className="text-sm font-bold text-slate-900">Ram Prakash Singh</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase">Avg Response Time</p>
                  <p className="text-sm font-bold text-slate-900">4 Hours</p>
               </div>
            </div>
         </div>

         <div className="bg-indigo-600 rounded-[40px] p-8 text-white relative overflow-hidden group shadow-2xl shadow-indigo-600/20">
            <Sparkles className="text-amber-400 mb-4" size={32} />
            <h5 className="text-lg font-black leading-tight">Fastest Response Guaranteed.</h5>
            <p className="text-indigo-200 text-[10px] font-medium mt-2 leading-relaxed opacity-80 italic">Verified Scholastic Support active for your account.</p>
         </div>
         
         <div className="pt-10 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Quick Resource</p>
            <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 cursor-pointer hover:shadow-md transition-all">
               <BookOpen size={16} className="text-slate-400" />
               <span className="text-xs font-bold text-slate-800">Syllabus Index</span>
            </div>
         </div>
      </div>
    </div>
  );
}

function BookOpen({ size, className }: { size?: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
