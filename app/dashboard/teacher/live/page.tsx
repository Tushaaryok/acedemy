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
  Clock
} from 'lucide-react';

export default function TeacherLiveCommand() {
  const [isLive, setIsLive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeBatch, setActiveBatch] = useState('Standard 12 - Physics');
  const [pinnedQuestion, setPinnedQuestion] = useState<{name: string, msg: string} | null>({
    name: 'Tushar K.',
    msg: 'Sir, logic gates slide is not visible. Can you re-explain the OR gate connection?'
  });

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-8 min-h-screen bg-slate-50/10">
      
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
                    <div className="absolute top-6 left-6 right-6 flex justify-between pointer-events-none">
                       <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                          Normal Latency: 42ms
                       </div>
                       <div className="bg-emerald-500 px-4 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                          1080p Crystal
                       </div>
                    </div>
                 </div>
               ) : (
                 <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center gap-8 text-center p-10">
                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10">
                       <Video size={32} className="text-slate-500" />
                    </div>
                    <div className="max-w-md space-y-3">
                       <h3 className="text-white font-black text-2xl tracking-tight">Camera & Mic Checked ✅</h3>
                       <p className="text-slate-500 font-medium text-sm italic">You are ready to start. Students will be notified immediately when you go live.</p>
                    </div>
                 </div>
               )}

               {/* Pinned Question Overlay */}
               {isLive && pinnedQuestion && (
                 <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[80%] max-w-xl animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-amber-400 p-1 rounded-[24px] shadow-2xl">
                       <div className="bg-white px-6 py-4 rounded-[20px] flex items-start gap-4">
                          <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
                             <Pin size={16} />
                          </div>
                          <div className="flex-1">
                             <p className="text-[9px] font-black text-amber-600 uppercase mb-1">Answering Question From {pinnedQuestion.name}</p>
                             <p className="text-xs font-bold text-slate-900 leading-relaxed italic">"{pinnedQuestion.msg}"</p>
                          </div>
                          <button onClick={() => setPinnedQuestion(null)} className="p-1 hover:bg-slate-50 rounded-lg text-slate-300 transition-colors">
                             <X size={14} />
                          </button>
                       </div>
                    </div>
                 </div>
               )}

               {/* Floating Controls */}
               <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-3xl px-6 py-3 rounded-[32px] border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="p-4 bg-white/5 hover:bg-white/20 rounded-2xl transition-all text-white border border-white/5"><Mic size={20} /></button>
                  <button className="p-4 bg-white/5 hover:bg-white/20 rounded-2xl transition-all text-white border border-white/5"><Video size={20} /></button>
                  <button className="p-4 bg-white/5 hover:bg-white/20 rounded-2xl transition-all text-white border border-white/5"><Share2 size={20} /></button>
                  <div className="w-px h-8 bg-white/10 mx-2"></div>
                  <button className="p-4 bg-white/5 hover:bg-indigo-600 rounded-2xl transition-all text-white border border-white/5"><Layout size={20} /></button>
                  <button className="p-4 bg-white/5 hover:bg-white/20 rounded-2xl transition-all text-white border border-white/5"><Settings size={20} /></button>
               </div>
            </div>

            {/* Engagement Tools Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 group hover:border-indigo-600 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                     <BarChart3 size={20} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Start Poll</p>
               </div>
               <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 group hover:border-amber-600 transition-all cursor-pointer relative overflow-hidden">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all">
                     <Hand size={20} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Hand Raise (3)</p>
                  <div className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
               </div>
               <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 group hover:border-emerald-600 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                     <Trophy size={20} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Leaderboard</p>
               </div>
               <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 group hover:border-rose-600 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-all">
                     <HelpCircle size={20} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">In-Class Quiz</p>
               </div>
            </div>
         </div>

         {/* Right Sidebar: Command & Chat */}
         <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-8 h-full">
            
            {/* Quick Stats Banner */}
            <div className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-2xl shadow-indigo-600/20 relative overflow-hidden group">
               <div className="relative z-10 flex justify-between items-start">
                  <div className="space-y-4">
                     <div>
                        <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest opacity-80">Connected Now</p>
                        <h4 className="text-4xl font-black italic">2,481</h4>
                     </div>
                     <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => <div key={i} className="w-7 h-7 rounded-full border-2 border-indigo-600 bg-indigo-400 flex items-center justify-center text-[8px] font-bold overflow-hidden"><User size={14} /></div>)}
                        <div className="w-7 h-7 rounded-full border-2 border-indigo-600 bg-white/20 backdrop-blur-md flex items-center justify-center text-[8px] font-black">+2.4k</div>
                     </div>
                  </div>
                  <Users className="text-indigo-400 opacity-50" size={32} />
               </div>
               <div className="mt-8 p-4 bg-white/10 rounded-2xl border border-white/5 backdrop-blur-sm group-hover:bg-white/20 transition-all cursor-pointer">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-1">Student Retention</p>
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                     <div className="h-full bg-white w-4/5 rounded-full"></div>
                  </div>
               </div>
               {/* Decorative Circle */}
               <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Moderation Hub */}
            <div className="bg-white rounded-[40px] flex-1 border border-slate-100 shadow-sm flex flex-col overflow-hidden min-h-[500px]">
               <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                      <MessageSquare size={14} className="text-indigo-600" /> Interaction Base
                    </h3>
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                    <MoreVertical size={16} className="text-slate-400" />
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
                       <div className={`relative p-4 rounded-2xl rounded-tl-none transition-all cursor-pointer ${
                         msg.type === 'critical' ? 'bg-rose-50 border border-rose-100 group-hover:bg-rose-100' : 
                         msg.type === 'doubt' ? 'bg-amber-50 border border-amber-100 group-hover:bg-amber-100' :
                         'bg-slate-50 border border-slate-50 group-hover:bg-slate-100'
                       }`}>
                          <p className="text-xs font-medium text-slate-600 leading-relaxed">
                            {msg.msg}
                          </p>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                             <button onClick={() => setPinnedQuestion(msg)} className="p-1.5 bg-white rounded-lg shadow-sm hover:text-indigo-600"><Pin size={10} /></button>
                             <button className="p-1.5 bg-white rounded-lg shadow-sm hover:text-rose-600"><X size={10} /></button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                  <div className="relative">
                     <input 
                       placeholder="Announce to 2,481 students..." 
                       className="w-full bg-white border border-slate-200 rounded-[20px] px-6 py-4 text-xs font-bold outline-none focus:border-indigo-600 shadow-sm transition-all pr-12"
                     />
                     <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2.5 rounded-xl shadow-lg hover:bg-indigo-700 transition-all">
                        <Share2 size={16} />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function User({ size }: { size?: number }) {
  return <Users size={size} />;
}

