'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Bell, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Calendar,
  CreditCard,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Megaphone,
  Loader2
} from 'lucide-react';

export default function NotificationCenter() {
  const [activeTab, setActiveTab] = useState('All');
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchNotices() {
      const { data } = await supabase.from('notices').select('*').order('created_at', { ascending: false });
      if (data) setNotices(data);
      setLoading(false);
    }
    fetchNotices();
  }, [supabase]);

  const getStatusColor = (type: string) => {
    switch(type) {
      case 'urgent': return 'text-rose-500 bg-rose-50';
      case 'announcement': return 'text-amber-500 bg-amber-50';
      case 'success': return 'text-emerald-500 bg-emerald-50';
      default: return 'text-indigo-500 bg-indigo-50';
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'urgent': return <ShieldAlert size={18} />;
      case 'announcement': return <Megaphone size={18} />;
      case 'success': return <CreditCard size={18} />;
      default: return <MessageSquare size={18} />;
    }
  };

  if (loading) return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
       <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
       <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">Scanning Airwaves...</p>
     </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-12 min-h-screen bg-slate-50/20">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
           <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 w-fit px-3 py-1 rounded-full border border-indigo-100 mb-2">
              <Bell size={12} /> Intelligence Node
           </div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Notifications</h1>
           <p className="text-slate-500 font-medium text-lg mt-2">Personalized institutional logs and real-time alerts.</p>
        </div>
        
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all flex items-center gap-2">
              <CheckCircle2 size={16} /> Mark All Read
           </button>
           <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-rose-400 hover:text-rose-600 transition-all flex items-center gap-2">
              <Trash2 size={16} /> Clear Logs
           </button>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="flex bg-white p-1.5 rounded-[28px] border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
         {['All', 'Academic', 'Finance', 'Security', 'Events'].map(tab => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`px-10 py-3 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all ${
               activeTab === tab ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'
             }`}
           >
             {tab}
           </button>
         ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notices.filter(n => activeTab === 'All' || n.priority === activeTab.toLowerCase()).map(note => (
          <div key={note.id} className="bg-white rounded-[40px] p-6 border border-slate-100 shadow-sm hover:shadow-2xl hover:scale-[1.01] transition-all group flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
             <div className="flex items-center gap-6 relative z-10 w-full">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 ${getStatusColor(note.priority)}`}>
                   {getIcon(note.priority)}
                </div>
                <div className="space-y-1 flex-1">
                   <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{note.title}</h3>
                   <p className="text-slate-500 text-sm font-medium pr-10">{note.content}</p>
                   <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
                      <span className="flex items-center gap-1"><Sparkles size={12} className="text-amber-500" /> {note.priority}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full" />
                      <span>{new Date(note.created_at).toLocaleDateString()}</span>
                   </div>
                </div>
             </div>
             <button className="p-4 rounded-2xl bg-slate-50 text-slate-300 hover:bg-slate-900 hover:text-white transition-all">
                <ChevronRight size={20} />
             </button>
          </div>
        ))}

        {notices.length === 0 && (
          <div className="py-32 text-center opacity-20">
             <Bell size={64} className="mx-auto mb-4" />
             <p className="font-black italic uppercase tracking-widest text-sm">Quiet Skies. No pending signals detected.</p>
          </div>
        )}
      </div>

      {/* Archive Insights */}
      <div className="bg-slate-900 rounded-[56px] p-12 text-white shadow-2xl shadow-indigo-900/40 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative group">
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 bg-white/10 rounded-[32px] flex items-center justify-center backdrop-blur-md border border-white/10">
               <Info size={40} className="text-amber-500" />
            </div>
            <div className="text-center md:text-left space-y-2">
               <h3 className="text-2xl font-black tracking-tight leading-none">Intelligence Archive</h3>
               <p className="text-slate-400 text-sm font-medium opacity-80 uppercase tracking-widest">You have 124 archived messages from past sessions.</p>
            </div>
         </div>
         <button className="relative z-10 bg-white text-slate-900 px-10 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
            Open Archive
         </button>
         
         <div className="absolute -left-20 -bottom-20 opacity-10 group-hover:scale-110 transition-transform">
            <Bell size={300} />
         </div>
      </div>
    </div>
  );
}
