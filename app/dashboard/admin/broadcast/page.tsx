'use client';
import { useState, useEffect } from 'react';
import { 
  Megaphone, 
  Send, 
  Users, 
  Smartphone, 
  MessageSquare, 
  Sparkles,
  ChevronRight,
  ShieldAlert,
  History,
  Loader2
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminBroadcast() {
  const [target, setTarget] = useState('all');
  const [priority, setPriority] = useState('Normal');
  const [channels, setChannels] = useState({ push: true, whatsapp: true, email: false });
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [pastAlerts, setPastAlerts] = useState<any[]>([]);

  const supabase = createClient();

  useEffect(() => {
    async function fetchAlerts() {
      const { data } = await supabase.from('notices').select('*').order('created_at', { ascending: false });
      if (data) setPastAlerts(data);
    }
    fetchAlerts();
  }, [supabase]);

  const handleSendBroadcast = async () => {
    if (!title || !message) {
      alert('Broadcast Title and Content are required.');
      return;
    }

    setIsSending(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    const { error } = await supabase.from('notices').insert([{
      title,
      content: message,
      priority: priority.toLowerCase(),
      created_by: session?.user?.id
    }]);

    if (!error) {
       alert('Broadcast Signal Initiated Successfully!');
       setTitle('');
       setMessage('');
       window.location.reload();
    } else {
       alert('Broadcast Failure: ' + error.message);
    }
    setIsSending(false);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 min-h-screen bg-slate-50/20">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
           <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100 mb-2">
              <Megaphone size={12} /> Communication Node
           </div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Global Broadcast</h1>
           <p className="text-slate-500 font-medium text-lg mt-2">Send instant multi-channel notifications to the academy community.</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-[28px] border border-slate-200 shadow-sm">
           {['active', 'scheduled', 'history'].map(tab => (
             <button 
               key={tab}
               className={`px-8 py-3 rounded-[22px] text-xs font-black uppercase tracking-widest transition-all ${
                 tab === 'active' ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Composition Desk */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-[56px] p-10 md:p-16 border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="relative z-10 space-y-10">
                 <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                       <div className="flex-1 space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Broadcast Target</label>
                          <select 
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-600/5 appearance-none"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                          >
                             <option value="all">All Students & Parents</option>
                             <option value="std10">Std 10 (Board Prep)</option>
                             <option value="std12">Std 12 (Science/Comm)</option>
                             <option value="teachers">All Faculty</option>
                          </select>
                       </div>
                       <div className="flex-1 space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Urgency Level</label>
                          <div className="flex gap-2">
                             {['Normal', 'Urgent', 'Announcement'].map(l => (
                               <button 
                                 key={l} 
                                 onClick={() => setPriority(l)}
                                 className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                 l === priority ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-100 text-slate-400'
                               }`}>{l}</button>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Broadcast Heading</label>
                          <input 
                            placeholder="e.g. Academy Holiday Notice"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Signal Message Body</label>
                          <textarea 
                            rows={5}
                            placeholder="Type your official announcement here..."
                            className="w-full bg-slate-50 border border-slate-100 rounded-[32px] p-8 text-sm font-medium outline-none focus:ring-4 focus:ring-blue-600/5 resize-none transition-all"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-10 border-t border-slate-50">
                    <div className="flex gap-4">
                       {[
                         { id: 'push', label: 'Push', icon: <Smartphone size={16} /> },
                         { id: 'whatsapp', label: 'WApp', icon: <MessageSquare size={16} /> },
                         { id: 'email', label: 'Email', icon: <Megaphone size={16} /> },
                       ].map(ch => (
                         <div 
                           key={ch.id}
                           onClick={() => setChannels({...channels, [ch.id]: !channels[ch.id as keyof typeof channels]})}
                           className={`flex items-center gap-2 px-5 py-3 rounded-2xl cursor-pointer border transition-all ${
                             channels[ch.id as keyof typeof channels] ? 'bg-emerald-50 border-emerald-100 text-emerald-600 shadow-sm' : 'border-slate-100 text-slate-400 opacity-50'
                           }`}
                         >
                            {ch.icon} <span className="text-[10px] font-black uppercase tracking-widest">{ch.label}</span>
                         </div>
                       ))}
                    </div>
                    <button 
                      onClick={handleSendBroadcast}
                      disabled={isSending}
                      className="w-full sm:w-auto bg-slate-900 text-white px-12 py-5 rounded-[24px] font-black text-[12px] uppercase tracking-[3px] shadow-2xl shadow-slate-900/40 hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                       {isSending ? <Loader2 size={18} className="animate-spin" /> : 'INITIATE ALERT'} <Send size={18} />
                    </button>
                 </div>
              </div>

              {/* Background Accent */}
              <div className="absolute -right-20 -top-20 opacity-5 group-hover:scale-110 transition-transform">
                 <Megaphone size={400} />
              </div>
           </div>
        </div>

        {/* Analytics & Past Stats */}
        <div className="space-y-10">
           <div className="bg-slate-900 rounded-[48px] p-10 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-8">Reach Intelligence</h3>
              <div className="space-y-6">
                 <div className="flex justify-between items-end">
                    <div>
                       <p className="text-4xl font-black">482</p>
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">Verified Nodes</p>
                    </div>
                    <Users className="text-blue-500" size={32} />
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                       <span>Delivery Reliability</span>
                       <span className="text-emerald-400">99.8%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-400 w-[99.8%]" />
                    </div>
                 </div>
              </div>
              <div className="absolute -left-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
                 <Sparkles size={200} />
              </div>
           </div>

           <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
              <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2">
                 <History size={16} /> Global History
              </h3>
              <div className="space-y-5">
                 {pastAlerts.map(alert => (
                    <div key={alert.id} className="flex items-center justify-between group/item cursor-pointer">
                       <div>
                          <p className="text-xs font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors uppercase tracking-tight">{alert.title}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{alert.priority} • {new Date(alert.created_at).toLocaleDateString()}</p>
                       </div>
                       <ChevronRight size={14} className="text-slate-200 group-hover/item:text-slate-900 transition-all" />
                    </div>
                 ))}
                 {pastAlerts.length === 0 && (
                   <div className="py-10 text-center opacity-20">
                     <p className="text-[10px] font-black uppercase">No signal history</p>
                   </div>
                 )}
              </div>
              <button className="w-full mt-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all border-t border-slate-50">Full Audit Log</button>
           </div>
           
           <div className="bg-rose-50 rounded-[48px] p-10 border border-rose-100">
              <div className="flex gap-4 items-start">
                 <ShieldAlert className="text-rose-600 shrink-0" />
                 <div>
                    <h4 className="text-xs font-black text-rose-900 uppercase tracking-widest">Protocol Guard</h4>
                    <p className="text-[10px] text-rose-600 font-medium leading-relaxed mt-2 uppercase tracking-tight">
                       Broadcasting to 'All Students' triggers high-frequency servers. Use only for institutional emergencies.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
