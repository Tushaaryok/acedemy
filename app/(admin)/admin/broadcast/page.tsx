'use client';

import { useState } from 'react';
import { 
  Send, 
  MessageSquare, 
  Bell, 
  Users, 
  Calendar, 
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  History,
  Phone
} from 'lucide-react';

export default function AdminBroadcast() {
  const [target, setTarget] = useState('All Students');
  const [isSending, setIsSending] = useState(false);

  const stats = [
    { label: 'Push Reach', value: '1,420', sub: 'Active Tokens' },
    { label: 'WhatsApp Opt-in', value: '85%', sub: 'Avg Engagement' },
    { label: 'Last Broadcast', value: '2h ago', sub: '98% Delivered' },
  ];

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => setIsSending(false), 2000);
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
           <h1 className="text-5xl font-baloo font-bold text-slate-900 tracking-tight">Broadcast Center</h1>
           <p className="text-slate-500 font-medium text-lg italic">Send real-time alerts across the academy ecosystem.</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all border border-slate-200 shadow-sm">
              <History size={16} /> Broadcast History
           </button>
        </div>
      </div>

      {/* Stats QuickView */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((s) => (
           <div key={s.label} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{s.label}</p>
              <p className="text-3xl font-baloo font-bold text-slate-900 leading-none">{s.value}</p>
              <p className="text-xs font-medium text-slate-500 mt-2">{s.sub}</p>
           </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Composer */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm p-10 space-y-10 group">
              <div className="space-y-6">
                 <h2 className="text-2xl font-baloo font-bold text-slate-900 flex items-center gap-3">
                    <Sparkles className="text-amber-500" size={28} /> Message Composer
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['All Students', 'Standard 10', 'Standard 12', 'Teachers Only'].map(tab => (
                       <button 
                         key={tab}
                         onClick={() => setTarget(tab)}
                         className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                           target === tab ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'bg-slate-50 border-transparent text-slate-400 hover:border-slate-200'
                         }`}
                       >
                          {tab}
                       </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Push Alert Title</label>
                    <input 
                      placeholder="e.g. Aaj ki Chemistry class ka time change!"
                      className="w-full bg-slate-50 border-none rounded-2xl px-8 py-5 text-lg font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-baloo"
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Detailed Message</label>
                    <textarea 
                      rows={6}
                      placeholder="Type your message here. Keep it crisp for WhatsApp visibility..."
                      className="w-full bg-slate-50 border-none rounded-[32px] px-8 py-7 text-sm font-medium text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"
                    />
                 </div>
              </div>

              <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="flex gap-4">
                    <div className="flex items-center gap-3 bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl border border-emerald-100 font-black text-[10px] uppercase tracking-widest">
                       <CheckCircle2 size={16} /> WhatsApp Integration Active
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 text-blue-600 px-6 py-3 rounded-2xl border border-blue-100 font-black text-[10px] uppercase tracking-widest">
                       <Bell size={16} /> Push Ready
                    </div>
                 </div>
                 <button 
                  onClick={handleSend}
                  className="w-full md:w-auto bg-slate-900 text-white px-12 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-900/40 flex items-center justify-center gap-3 active:scale-95 group"
                 >
                    {isSending ? <Sparkles size={18} className="animate-spin" /> : <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    {isSending ? 'Blasting Message...' : 'Launch Broadcast'}
                 </button>
              </div>
           </div>
        </div>

        {/* Audience Inspector */}
        <div className="space-y-10">
           <div className="bg-indigo-900 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-8">
                 <div>
                    <h3 className="text-2xl font-baloo font-bold">Audience Pulse</h3>
                    <p className="text-indigo-300 text-xs font-medium">Estimated reach for <span className="text-white font-bold">{target}</span></p>
                 </div>
                 <div className="space-y-6">
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                          <Users size={24} className="text-amber-400" />
                       </div>
                       <div>
                          <p className="text-2xl font-black">{target === 'All Students' ? '852' : '240'}</p>
                          <p className="text-[10px] font-black uppercase text-indigo-400">Total Contacts</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                          <Phone size={24} className="text-emerald-400" />
                       </div>
                       <div>
                          <p className="text-2xl font-black">{target === 'All Students' ? '724' : '195'}</p>
                          <p className="text-[10px] font-black uppercase text-indigo-400">WhatsApp Verified</p>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="absolute -right-20 -bottom-20 opacity-10 transform -rotate-12">
                 <MessageSquare size={300} />
              </div>
           </div>

           <div className="bg-amber-50 p-10 rounded-[48px] border-2 border-amber-100 space-y-6">
               <div className="flex items-center gap-3 text-amber-600 font-black text-[10px] uppercase tracking-widest">
                  <AlertTriangle size={16} /> Broadcast Guard
               </div>
               <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  Broadcasting to <span className="font-bold">large segments</span> can take up to 2 minutes to complete. Please do not close the console during transmission.
               </p>
           </div>
        </div>
      </div>
    </div>
  );
}
