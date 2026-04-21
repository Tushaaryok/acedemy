'use client';

import { useState } from 'react';
import { 
  Plus,
  Play,
  Users,
  MessageSquare,
  Settings,
  Mic,
  Video,
  Share2,
  StopCircle,
  X,
  Sparkles,
  Layout,
  BarChart3,
  Mic2,
  VideoOff,
  HelpCircle,
  Trophy,
  MoreVertical,
  Pin,
  Hand,
  Radio,
  Clock,
  Send,
  Zap,
  BarChart2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TeacherLiveCommand() {
  const [isLive, setIsLive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [activeBatch, setActiveBatch] = useState('Standard 12 - Physics');
  const [pinnedQuestion, setPinnedQuestion] = useState<{name: string, msg: string} | null>({
    name: 'Tushar K.',
    msg: 'Sir, logic gates slide is not visible. Can you re-explain the OR gate connection?'
  });

  const [handRaiseQueue, setHandRaiseQueue] = useState([
    { id: 1, name: 'Amit Vithani', time: '1m ago' },
    { id: 2, name: 'Priya Rathod', time: 'Just now' },
  ]);

  return (
    <div className="p-4 md:p-8 max-w-[1700px] mx-auto space-y-8 min-h-screen bg-slate-50/10">
      
      {/* Header Area */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="space-y-1">
           <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 text-rose-600 font-black text-[10px] uppercase tracking-widest bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100 shadow-sm">
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-rose-600 animate-pulse' : 'bg-slate-400'}`}></div>
                {isLive ? 'BROADCAST ACTIVE' : 'STUDIO OFFLINE'}
             </div>
             {isRecording && (
                <div className="flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
                  <Radio size={12} className="text-rose-600 animate-pulse" /> REC
                </div>
             )}
             <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 shadow-sm">
                <Clock size={12} /> 10:45 AM
             </div>
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mt-2 font-baloo">Live Class Studio</h1>
           <p className="text-slate-500 font-medium text-base">Streaming to <span className="text-indigo-600 font-bold">{activeBatch}</span> • High Fidelity Mode</p>
        </div>
        
        <div className="flex items-center gap-4 w-full xl:w-auto">
           {isLive ? (
             <>
               <div className="hidden md:flex flex-col items-end mr-4">
                  <p className="text-[10px] font-black text-emerald-500 uppercase">Stream Health</p>
                  <div className="flex gap-1 mt-1">
                     {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-emerald-500 rounded-full"></div>)}
                  </div>
               </div>
               <button 
                 onClick={() => setIsRecording(!isRecording)}
                 className={`px-6 py-4 rounded-[20px] font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-3 active:scale-95 border ${isRecording ? 'bg-white text-rose-600 border-rose-100' : 'bg-slate-900 text-white border-slate-900'}`}
               >
                  <Radio size={18} /> {isRecording ? 'STOP RECORDING' : 'START RECORDED SESSION'}
               </button>
               <button 
                 onClick={() => setIsLive(false)}
                 className="bg-rose-600 text-white px-8 py-4 rounded-[20px] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-600/30 hover:bg-rose-700 transition-all flex items-center gap-3 active:scale-95"
               >
                  <StopCircle size={18} /> END STREAM
               </button>
             </>
           ) : (
             <button 
               onClick={() => setIsLive(true)}
               className="bg-slate-900 text-white px-10 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-900/40 hover:bg-slate-800 transition-all flex items-center gap-3 active:scale-95 group"
             >
                <Play size={20} className="fill-white" /> GO LIVE NOW
             </button>
           )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* Main Stage */}
         <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            <div className="bg-slate-950 rounded-[48px] aspect-video relative overflow-hidden group shadow-2xl border-[12px] border-white ring-1 ring-slate-100">
               {isLive ? (
                 <div className="absolute inset-0 bg-slate-900">
                    {/* Mock Camera Feed */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                       <Video className="text-white w-32 h-32" />
                    </div>
                    {/* Visual Overlay */}
                    <div className="absolute top-10 left-10 flex flex-col gap-4">
                       <div className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          <Users size={12} className="text-indigo-400" /> 1,240 Watching
                       </div>
                       <div className="bg-emerald-500/90 backdrop-blur-md px-6 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          <Zap size={12} /> Low Latency Mode
                       </div>
                    </div>
                 </div>
               ) : (
                 <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center gap-8 text-center p-10">
                    <div className="w-24 h-24 bg-white/5 rounded-[40px] flex items-center justify-center border border-white/10 shadow-2xl">
                       <Video size={40} className="text-slate-500" />
                    </div>
                    <div className="max-w-md space-y-4">
                       <h3 className="text-white font-baloo font-bold text-3xl tracking-tight">Studio Setup Ready ✅</h3>
                       <p className="text-slate-500 font-medium text-sm italic">Students are waiting in the lobby. Click "Go Live" to start teaching physics!</p>
                    </div>
                 </div>
               )}

               {/* Pinned Question Overlay */}
               {isLive && pinnedQuestion && (
                 <div className="absolute top-10 right-10 w-full max-w-sm animate-in fade-in slide-in-from-right duration-500">
                    <div className="bg-amber-400 p-1 rounded-[32px] shadow-2xl transform shadow-amber-500/20">
                       <div className="bg-white px-8 py-6 rounded-[28px] space-y-3">
                          <div className="flex items-center justify-between">
                             <div className="bg-amber-100 px-3 py-1 rounded-full text-amber-600 flex items-center gap-2 text-[9px] font-black uppercase">
                                <Pin size={12} /> Discussion Focus
                             </div>
                             <button onClick={() => setPinnedQuestion(null)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-300"><X size={16} /></button>
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">From {pinnedQuestion.name}</p>
                             <p className="text-sm font-bold text-slate-800 leading-relaxed italic">"{pinnedQuestion.msg}"</p>
                          </div>
                       </div>
                    </div>
                 </div>
               )}

               {/* Floating Controls */}
               <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-3xl px-8 py-4 rounded-[40px] border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <button className="p-5 bg-white/5 hover:bg-white/20 rounded-[24px] transition-all text-white border border-white/5"><Mic size={24} /></button>
                  <button className="p-5 bg-white/5 hover:bg-white/20 rounded-[24px] transition-all text-white border border-white/5"><Video size={24} /></button>
                  <button className="p-5 bg-white/5 hover:bg-white/20 rounded-[24px] transition-all text-white border border-white/5"><Share2 size={24} /></button>
                  <div className="w-px h-10 bg-white/10 mx-2"></div>
                  <button className="p-5 bg-white/5 hover:bg-indigo-600 rounded-[24px] transition-all text-white border border-white/5"><Layout size={24} /></button>
                  <button className="p-5 bg-white/5 hover:bg-rose-600 rounded-[24px] transition-all text-white border border-white/5"><Settings size={24} /></button>
               </div>
            </div>

            {/* Admin Command Panel */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
               {/* Engagement Actions */}
               <div className="md:col-span-4 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Class Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                     <button onClick={() => setShowPollCreator(true)} className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-indigo-50 border-2 border-transparent hover:border-indigo-200 transition-all text-indigo-600 group">
                        <BarChart2 size={24} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase">Poll</span>
                     </button>
                     <button className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-amber-50 border-2 border-transparent hover:border-amber-200 transition-all text-amber-600 group">
                        <HelpCircle size={24} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase">Quiz</span>
                     </button>
                     <button className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-emerald-50 border-2 border-transparent hover:border-emerald-200 transition-all text-emerald-600 group">
                        <Sparkles size={24} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase">Reward</span>
                     </button>
                     <button className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-rose-50 border-2 border-transparent hover:border-rose-200 transition-all text-rose-600 group">
                        <Users size={24} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase">Attendance</span>
                     </button>
                  </div>
               </div>

               {/* Hand Raise Queue */}
               <div className="md:col-span-8 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm space-y-8">
                  <div className="flex justify-between items-center">
                     <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                        <Hand size={14} className="text-amber-500" /> Mic Requests Queue
                     </h3>
                     <span className="bg-rose-500 text-white text-[9px] font-black px-3 py-1 rounded-full animate-pulse">{handRaiseQueue.length} NEW</span>
                  </div>
                  
                  <div className="space-y-4">
                     {handRaiseQueue.map(q => (
                       <div key={q.id} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100">
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center font-baloo font-bold text-slate-400">
                                {q.name.charAt(0)}
                             </div>
                             <div>
                                <p className="font-bold text-slate-900 mb-1">{q.name}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{q.time}</p>
                             </div>
                          </div>
                          <div className="flex gap-3">
                             <button className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-emerald-600/20 active:scale-95 transition-all">UNMUTE</button>
                             <button onClick={() => setHandRaiseQueue(handRaiseQueue.filter(x => x.id !== q.id))} className="p-3 bg-slate-100 text-slate-400 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all">
                                <X size={20} />
                             </button>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Right Sidebar: Command & Chat */}
         <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-8 h-full">
            
            {/* Real-time Insights */}
            <div className="bg-slate-900 p-10 rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
               <div className="relative z-10 space-y-10">
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-80 mb-2">Live Engagement</p>
                     <h4 className="text-5xl font-baloo font-bold italic tracking-tighter">84%</h4>
                  </div>
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase text-indigo-400">Top Doubt Clusters Today</p>
                     <div className="flex flex-wrap gap-2">
                        {['Relativity', 'Formula Derivation', 'Slide 14'].map(tag => (
                          <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-white/60">{tag}</span>
                        ))}
                     </div>
                  </div>
               </div>
               <div className="absolute -right-20 -bottom-20 opacity-10 transform scale-150">
                  <Trophy size={300} />
               </div>
            </div>

            {/* Interaction Base (Moderation) */}
            <div className="bg-white rounded-[40px] flex-1 border border-slate-100 shadow-sm flex flex-col overflow-hidden min-h-[600px]">
               <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                     <MessageSquare size={14} className="text-indigo-600" /> Class Interaction
                  </h3>
                  <div className="flex gap-2">
                     <button className="p-2 transition-all hover:bg-slate-100 rounded-xl text-slate-300"><Settings size={16} /></button>
                  </div>
               </div>
               
               <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                  {[
                    { name: 'Arjun P.', msg: 'Sir, acceleration ka formula ek baar aur clear kar dijiye?', time: '10:42 AM', type: 'doubt' },
                    { name: 'Priya S.', msg: 'Amazing explanation of the free body diagram!', time: '10:43 AM', type: 'msg' },
                    { name: 'Rahul V.', msg: 'Sir logic gates slide is not visible.', time: '10:44 AM', type: 'critical' },
                    { name: 'Sonia M.', msg: 'Bahut clear hua, thank you sir! 🙏', time: '10:45 AM', type: 'msg' },
                  ].map((msg, i) => (
                    <div key={i} className="group animate-in fade-in slide-in-from-bottom-2 duration-300">
                       <div className="flex justify-between items-center mb-1">
                          <span className={`text-[9px] font-black uppercase ${msg.type === 'critical' ? 'text-rose-600' : 'text-slate-900'}`}>{msg.name}</span>
                          <span className="text-[8px] text-slate-300">{msg.time}</span>
                       </div>
                       <div className={`relative p-5 rounded-3xl rounded-tl-none transition-all cursor-pointer border-2 ${
                         msg.type === 'critical' ? 'bg-rose-50 border-rose-100 hover:bg-rose-100' : 
                         msg.type === 'doubt' ? 'bg-amber-50 border-amber-100 hover:bg-amber-100' :
                         'bg-slate-50 border-transparent hover:border-slate-100 hover:bg-white'
                       }`}>
                          <p className="text-xs font-medium text-slate-700 leading-relaxed italic">
                             {msg.msg}
                          </p>
                          <div className="absolute -top-3 right-4 opacity-0 group-hover:opacity-100 transition-all flex gap-1">
                             <button onClick={() => setPinnedQuestion(msg)} className="p-2 bg-white rounded-xl shadow-lg border border-slate-100 hover:text-indigo-600 active:scale-90"><Pin size={12} /></button>
                             <button className="p-2 bg-white rounded-xl shadow-lg border border-slate-100 hover:text-rose-600 active:scale-90"><X size={12} /></button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="p-8 bg-slate-50/50 border-t border-slate-100">
                  <div className="relative group">
                     <input 
                       placeholder="Announce to class..." 
                       className="w-full bg-white border border-slate-200 rounded-[28px] px-8 py-5 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 shadow-sm transition-all pr-16 placeholder:text-slate-400"
                     />
                     <button className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 text-white rounded-[20px] shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all">
                        <Send size={18} />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Poll Creator Modal (Mock) */}
      <AnimatePresence>
         {showPollCreator && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-10">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPollCreator(false)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />
              <motion.div 
               initial={{ scale: 0.9, y: 20, opacity: 0 }} 
               animate={{ scale: 1, y: 0, opacity: 1 }} 
               exit={{ scale: 0.9, y: 20, opacity: 0 }} 
               className="relative w-full max-w-xl bg-white rounded-[48px] shadow-2xl p-12 space-y-10 border border-slate-100"
              >
                 <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-baloo font-bold text-slate-900">Create Live Poll</h3>
                    <button onClick={() => setShowPollCreator(false)} className="p-3 hover:bg-slate-50 rounded-2xl transition-all"><X size={24} /></button>
                 </div>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Question Prompt</label>
                       <input 
                        placeholder="e.g. Is light speed constant in all mediums?" 
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-lg font-bold outline-none ring-2 ring-transparent focus:ring-indigo-500/10 focus:bg-white transition-all shadow-inner"
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <input placeholder="Option A" className="bg-slate-50 p-4 rounded-xl text-sm" />
                       <input placeholder="Option B" className="bg-slate-50 p-4 rounded-xl text-sm" />
                       <input placeholder="Option C" className="bg-slate-50 p-4 rounded-xl text-sm" />
                       <input placeholder="Option D" className="bg-slate-50 p-4 rounded-xl text-sm" />
                    </div>
                 </div>
                 <button onClick={() => setShowPollCreator(false)} className="w-full py-6 bg-slate-900 text-white rounded-[28px] font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3">
                    PUSH POLL TO ALL LEARNERS <BarChart3 size={20} />
                 </button>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}
