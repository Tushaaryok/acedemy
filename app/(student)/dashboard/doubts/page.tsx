'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
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
  CheckCircle2,
  Plus,
  X,
  Loader2
} from 'lucide-react';

export default function StudentDoubts() {
  const [doubts, setDoubts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeDoubt, setActiveDoubt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  const [newDoubt, setNewDoubt] = useState({ title: '', subject_id: '' });
  const [subjects, setSubjects] = useState<any[]>([]);

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const [doubtsRes, subjectsRes] = await Promise.all([
        supabase.from('doubts').select('*, users!teacher_id(full_name), subjects(name)').eq('student_id', session.user.id).order('created_at', { ascending: false }),
        supabase.from('subjects').select('*')
      ]);

      if (doubtsRes.data) {
        setDoubts(doubtsRes.data);
        if (doubtsRes.data.length > 0) setActiveDoubt(doubtsRes.data[0].id);
      }
      if (subjectsRes.data) setSubjects(subjectsRes.data);
      setLoading(false);
    }
    fetchData();
  }, [supabase]);

  useEffect(() => {
    if (!activeDoubt) return;
    async function fetchMessages() {
      const { data } = await supabase
        .from('doubt_messages')
        .select('*')
        .eq('doubt_id', activeDoubt)
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
    }
    fetchMessages();
  }, [activeDoubt, supabase]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeDoubt) return;
    setIsSending(true);
    const { data: { session } } = await supabase.auth.getSession();
    const { error } = await supabase.from('doubt_messages').insert([{
      doubt_id: activeDoubt,
      sender_id: session?.user?.id,
      message: newMessage
    }]);

    if (!error) {
       setNewMessage('');
       // Real-time update logic here or re-fetch
       const { data } = await supabase.from('doubt_messages').select('*').eq('doubt_id', activeDoubt).order('created_at', { ascending: true });
       if (data) setMessages(data);
    }
    setIsSending(false);
  };

  const createDoubt = async () => {
    if (!newDoubt.title || !newDoubt.subject_id) return;
    const { data: { session } } = await supabase.auth.getSession();
    const { data, error } = await supabase.from('doubts').insert([{
      ...newDoubt,
      student_id: session?.user?.id,
      status: 'pending'
    }]).select().single();

    if (!error && data) {
       setDoubts([data, ...doubts]);
       setActiveDoubt(data.id);
       setIsAsking(false);
    }
  };

  const activeDoubtData = doubts.find(d => d.id === activeDoubt);

  return (
    <div className="p-0 max-w-7xl mx-auto h-[calc(100vh-160px)] flex bg-white rounded-[48px] border border-slate-100 shadow-2xl overflow-hidden mt-6">
      
      {/* Sidebar: Doubt List */}
      <div className="w-full md:w-96 border-r border-slate-50 flex flex-col bg-slate-50/50">
         <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                  Desk <HelpCircle size={20} className="text-indigo-600" />
               </h2>
               <button 
                 onClick={() => setIsAsking(true)}
                 className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/10 active:scale-95"
               >
                  <Plus size={18} />
               </button>
            </div>
            <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                 placeholder="Search your queries..." 
                 className="w-full bg-white border border-slate-100 rounded-2xl pl-12 pr-4 py-3 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all"
               />
            </div>
         </div>

         <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-8">
            {doubts.map(doubt => (
              <div 
                key={doubt.id}
                onClick={() => setActiveDoubt(doubt.id)}
                className={`p-6 rounded-[32px] cursor-pointer transition-all border group ${
                  activeDoubt === doubt.id ? 'bg-white border-white shadow-xl scale-[1.02]' : 'bg-transparent border-transparent hover:bg-white/50'
                }`}
              >
                 <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded uppercase tracking-widest">{doubt.subjects?.name || 'Academic'}</span>
                    {doubt.status === 'resolved' ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Clock size={14} className="text-amber-500" />}
                 </div>
                 <h4 className="text-sm font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase italic">{doubt.title}</h4>
                 <div className="flex items-center gap-2 mt-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>{doubt.users?.full_name || 'Assigning...'}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span>{new Date(doubt.created_at).toLocaleDateString()}</span>
                 </div>
              </div>
            ))}
            {doubts.length === 0 && !loading && (
              <div className="py-20 text-center text-slate-300 italic text-xs px-8">
                 Submit your first academic doubt using the plus button above.
              </div>
            )}
         </div>
      </div>

      {/* Main: Chat View */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
         {activeDoubtData ? (
            <>
               <header className="p-8 border-b border-slate-50 flex justify-between items-center bg-white z-10">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-600/20">
                        {activeDoubtData.users?.full_name?.charAt(0) || '?'}
                     </div>
                     <div>
                        <h3 className="font-black text-slate-900 text-lg leading-none uppercase">{activeDoubtData.users?.full_name || 'Consulting Faculty'}</h3>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1 italic">Re: {activeDoubtData.title}</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${activeDoubtData.status === 'resolved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {activeDoubtData.status}
                     </span>
                  </div>
               </header>

               <div className="flex-1 overflow-y-auto p-12 space-y-10 bg-slate-50/30">
                  {messages.map((msg, i) => {
                    const isSystem = msg.sender_id === 'system';
                    const isOwner = msg.sender_id === activeDoubtData.student_id;
                    
                    return (
                      <div key={msg.id} className={`flex gap-6 max-w-2xl ${isOwner ? '' : 'ml-auto flex-row-reverse'}`}>
                        <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-white font-black ${isOwner ? 'bg-slate-900' : 'bg-indigo-600'}`}>
                           {isOwner ? <User size={20} /> : activeDoubtData.users?.full_name?.charAt(0) || 'F'}
                        </div>
                        <div className={`space-y-3 flex flex-col ${isOwner ? '' : 'items-end'}`}>
                           <div className={`p-8 rounded-[40px] shadow-sm leading-relaxed font-medium text-sm ${
                             isOwner ? 'bg-white border border-slate-100 text-slate-700 rounded-tl-none' : 'bg-indigo-600 text-white shadow-indigo-600/10 rounded-tr-none'
                           }`}>
                              {msg.message}
                           </div>
                           <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">
                              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </span>
                        </div>
                      </div>
                    );
                  })}
                  {messages.length === 0 && (
                     <div className="py-20 text-center text-slate-300 italic text-sm">Initializing communication link...</div>
                  )}
               </div>

               {/* Chat Input */}
               <div className="p-8 bg-white border-t border-slate-50">
                  <div className="relative group">
                     <textarea 
                       value={newMessage}
                       onChange={(e) => setNewMessage(e.target.value)}
                       placeholder="Clarify your doubt or provide more context..." 
                       className="w-full bg-slate-50 border border-slate-100 rounded-[32px] p-7 pr-32 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-600/5 resize-none transition-all"
                       rows={1}
                       onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                     />
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                        <button className="p-3 text-slate-300 hover:text-indigo-600 transition-all"><ImageIcon size={20} /></button>
                        <button 
                          onClick={sendMessage}
                          disabled={isSending}
                          className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl shadow-slate-900/10 hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-50"
                        >
                           {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={20} />}
                        </button>
                     </div>
                  </div>
               </div>
            </>
         ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-20 p-20 text-center space-y-6">
               <HelpCircle size={80} />
               <div>
                  <h3 className="text-2xl font-black uppercase tracking-widest">No Active Query</h3>
                  <p className="font-bold text-sm mt-2 italic">Select a scholastic query from the desk or initialize a new consultation.</p>
               </div>
            </div>
         )}
      </div>

      {/* Ask Doubt Modal */}
      {isAsking && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-6 z-[100] animate-in fade-in duration-300">
           <div className="bg-white rounded-[56px] p-12 max-w-xl w-full space-y-10 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
              <button 
                onClick={() => setIsAsking(false)}
                className="absolute top-10 right-10 p-2 text-slate-300 hover:text-slate-900 transition-colors"
                title="Cancel Consultation"
              >
                 <X size={24} />
              </button>

              <header>
                 <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">Academic Inquiry</h2>
                 <p className="text-slate-500 font-medium mt-2">Formalize your doubt for faculty review.</p>
              </header>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Query Subject / Chapter</label>
                    <select 
                      className="w-full bg-slate-50 border border-slate-100 rounded-[24px] px-8 py-5 text-sm font-bold outline-none"
                      onChange={(e) => setNewDoubt({...newDoubt, subject_id: e.target.value})}
                    >
                       <option value="">Select Domain</option>
                       {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                 </div>
                 <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Your Question</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe your confusion in detail. Mention specific formulas or concepts where you are stuck."
                    className="w-full bg-slate-50 border border-slate-100 rounded-[32px] p-8 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all resize-none"
                    onChange={(e) => setNewDoubt({...newDoubt, title: e.target.value})}
                  />
                 </div>
              </div>

              <button 
                onClick={createDoubt}
                className="w-full bg-slate-900 text-white py-6 rounded-[24px] font-black text-xs uppercase tracking-[3px] shadow-2xl shadow-slate-900/40 hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                 SUBMIT FOR REVIEW <Sparkles size={18} />
              </button>
           </div>
        </div>
      )}

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
