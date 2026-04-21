'use client';

import { useState, useEffect } from 'react';
export const dynamic = 'force-dynamic';
import { 
  Play, 
  Users, 
  MessageSquare, 
  Wifi, 
  Maximize2, 
  Mic, 
  Video, 
  Sparkles,
  ArrowLeft,
  Hand,
  BarChart2,
  Send,
  HelpCircle,
  Trophy,
  Star,
  Target
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import nextDynamic from 'next/dynamic';

const AgoraPlayer = nextDynamic(
  () => import('@/components/live/live-room').then((mod) => mod.LiveRoom),
  { ssr: false }
);

export default function StudentLiveClass() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'doubts' | 'leaderboard'>('chat');
  const [handRaised, setHandRaised] = useState(false);
  const [showPoll, setShowPoll] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white overflow-hidden">
      {/* Premium Header */}
      <div className="flex items-center justify-between px-8 py-5 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 relative z-20">
        <div className="flex items-center gap-6">
          <Link href="/dashboard/student" className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 shadow-xl">
             <ArrowLeft size={20} />
          </Link>
          <div className="space-y-1">
            <h1 className="text-xl font-baloo font-bold tracking-tight flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              Std 12 - Physics: Theory of Relativity
            </h1>
            <div className="flex items-center gap-4">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live with Dr. Ram Singh • Episode #24</p>
               <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
               <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                  <Wifi size={12} /> 1080p Ultra HD
               </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
           <div className="hidden md:flex items-center gap-4 bg-white/5 px-6 py-2.5 rounded-full border border-white/5">
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden text-[8px] flex items-center justify-center font-bold">
                      U{i}
                   </div>
                 ))}
              </div>
              <span className="text-[10px] font-black text-slate-300">542+ LEARNERS ONLINE</span>
           </div>
           
           <button 
            onClick={() => setHandRaised(!handRaised)}
            className={`p-4 rounded-2xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border-2 ${
              handRaised 
                ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-xl shadow-amber-500/20' 
                : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
            }`}
           >
              <Hand size={18} fill={handRaised ? "black" : "none"} /> {handRaised ? 'Waiting for Mic...' : 'Unmute Request'}
           </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Theater Area */}
        <div className="flex-1 relative bg-black flex items-center justify-center group overflow-hidden">
          <div className="w-full h-full relative cursor-none">
             {/* Real Agora Stream */}
             <div className="absolute inset-0">
               <AgoraPlayer 
                 sessionId="demo_session"
                 token="demo_token"
                 appId={process.env.AGORA_APP_ID || ''} 
                 channel="class_12_physics" // Dynamic in future
                 role="audience"
               />
             </div>

             {/* Live Podium Notification (Toast style) */}
             <AnimatePresence>
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="absolute top-10 right-10 z-30 bg-slate-900/90 backdrop-blur-xl p-4 rounded-3xl border border-amber-500/30 flex items-center gap-4 shadow-2xl"
                >
                    <div className="w-10 h-10 bg-amber-500 text-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                       <Trophy size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-amber-500 tracking-widest">Live Podium Update</p>
                       <p className="text-xs font-bold text-white">Amit V. just topped the last poll!</p>
                    </div>
                </motion.div>
             </AnimatePresence>

             {/* Floating Class Tools (In-Video) */}
             <AnimatePresence>
                {showPoll && (
                   <motion.div 
                     initial={{ y: 50, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: 50, opacity: 0 }}
                     className="absolute bottom-32 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white p-8 rounded-[40px] text-slate-900 shadow-2xl border border-white/20"
                   >
                       <div className="flex items-center gap-3 mb-6 text-indigo-600">
                          <BarChart2 size={24} />
                          <h4 className="text-xl font-baloo font-bold">Concept Check! (Poll)</h4>
                       </div>
                       <p className="font-bold mb-6 italic">"If light speed is constant, what happens to time for a moving observer?"</p>
                       <div className="space-y-3">
                          {['Time speeds up', 'Time slows down (Dilation)', 'No change', 'Time stops'].map((opt, i) => (
                             <button key={i} onClick={() => setShowPoll(false)} className="w-full p-4 rounded-2xl border-2 border-slate-100 font-bold hover:border-indigo-600 hover:bg-indigo-50 transition-all text-left">
                                {opt}
                             </button>
                          ))}
                       </div>
                   </motion.div>
                )}
             </AnimatePresence>

             {/* Teacher Cam overlay (PiP) */}
             <motion.div 
               drag 
               dragConstraints={{ left: 0, right: 800, top: 0, bottom: 500 }}
               className="absolute top-10 left-10 w-64 h-44 bg-slate-800 rounded-[32px] border-4 border-indigo-500/50 shadow-2xl overflow-hidden cursor-move hidden md:block"
             >
                <div className="w-full h-full bg-slate-800 flex items-center justify-center font-baloo font-bold text-slate-600 text-2xl uppercase italic">
                   Dr. Singh
                </div>
                <div className="absolute top-4 left-4 bg-indigo-600 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">Speaker</div>
             </motion.div>

             {/* Control HUD (Floating) */}
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-slate-900/60 backdrop-blur-2xl px-10 py-5 rounded-[40px] border border-white/10 shadow-2xl opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <button onClick={() => setShowPoll(true)} className="flex flex-col items-center gap-1.5 p-3 hover:bg-white/5 rounded-2xl transition-all group/hu">
                   <div className="bg-indigo-600 p-2.5 rounded-xl group-hover/hu:scale-110 transition-transform"><BarChart2 size={18} /></div>
                   <span className="text-[8px] font-black uppercase tracking-tighter">Polls</span>
                </button>
                <div className="h-10 w-px bg-white/10 mx-2"></div>
                <button className="flex flex-col items-center gap-1.5 p-3 hover:bg-white/5 rounded-2xl transition-all group/hu text-white">
                   <Mic size={24} />
                   <span className="text-[8px] font-black uppercase tracking-tighter">Mic</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 p-3 hover:bg-amber-500 hover:text-slate-950 rounded-2xl transition-all group/hu text-amber-500">
                   <Sparkles size={24} />
                   <span className="text-[8px] font-black uppercase tracking-tighter">Notes</span>
                </button>
                <div className="h-10 w-px bg-white/10 mx-2"></div>
                <button className="flex flex-col items-center gap-1.5 p-3 hover:bg-white/5 rounded-2xl transition-all group/hu">
                   <Maximize2 size={24} />
                   <span className="text-[8px] font-black uppercase tracking-tighter">Fullscreen</span>
                </button>
             </div>
          </div>
        </div>

        {/* Interaction Sideboard */}
        <div className={`transition-all duration-500 flex flex-col bg-slate-900 border-l border-white/5 ${isChatOpen ? 'w-80 md:w-[500px]' : 'w-0'}`}>
           {/* Tab Switcher */}
           <div className="p-4 flex gap-2">
              <button 
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'chat' ? 'bg-white text-slate-950 shadow-xl' : 'text-slate-500 hover:text-white'
                }`}
              >
                 <MessageSquare size={14} /> Chat
              </button>
              <button 
                onClick={() => setActiveTab('doubts')}
                className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'doubts' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-500 hover:text-white'
                }`}
              >
                 <HelpCircle size={14} /> Doubts
              </button>
              <button 
                onClick={() => setActiveTab('leaderboard')}
                className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'leaderboard' ? 'bg-amber-500 text-slate-950 shadow-xl shadow-amber-500/20' : 'text-slate-500 hover:text-white'
                }`}
              >
                 <Trophy size={14} /> Podium
              </button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar">
              <AnimatePresence mode="wait">
                {activeTab === 'chat' ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                     {[
                       { name: 'Sameer Rathod', msg: 'Quantum physics is so cool!', avatar: '👨‍🎓', time: '14:20' },
                       { name: 'Admin', msg: 'Poll starting in 2 minutes. Get ready!', avatar: '🛡️', time: '14:22', isAdmin: true },
                       { name: 'Priya Joshi', msg: 'Sir will explain the derivation now.', avatar: '👩‍🏫', time: '14:25' },
                     ].map((item, i) => (
                       <div key={i} className="flex gap-4">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${item.isAdmin ? 'bg-amber-500 text-slate-950' : 'bg-slate-800'}`}>
                             {item.avatar}
                          </div>
                          <div className="space-y-2 flex-1">
                             <div className="flex justify-between items-center">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${item.isAdmin ? 'text-amber-500' : 'text-slate-500'}`}>
                                   {item.name}
                                </span>
                                <span className="text-[8px] text-slate-700">{item.time}</span>
                             </div>
                             <p className={`text-xs p-4 rounded-3xl rounded-tl-none leading-relaxed italic ${item.isAdmin ? 'bg-amber-500/10 text-amber-100 border border-amber-500/20' : 'bg-white/5 text-slate-300 border border-white/5'}`}>
                                {item.msg}
                             </p>
                          </div>
                       </div>
                     ))}
                  </motion.div>
                ) : activeTab === 'doubts' ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                      <div className="bg-indigo-600/10 border-2 border-indigo-500/20 p-8 rounded-[40px] text-center space-y-4">
                         <HelpCircle size={40} className="mx-auto text-indigo-400" />
                         <h4 className="font-baloo font-bold text-xl">Doubt Resolver</h4>
                         <p className="text-xs text-indigo-200">Type your doubt below. Selected doubts will be answered by Dr. Singh live!</p>
                      </div>
                      <div className="space-y-4">
                         <div className="bg-white/5 p-6 rounded-3xl border border-white/5 opacity-50">
                            <p className="text-[10px] font-black uppercase text-indigo-400 mb-2 italic">Previous Question</p>
                            <p className="text-xs font-medium">"How does time dilation affect GPS satellites?"</p>
                         </div>
                      </div>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                      <h4 className="text-2xl font-baloo font-bold text-center mb-10 text-amber-500">Live Rankings</h4>
                      {[
                        { rank: 1, name: 'Amit Vithani', pts: '1240 XP', star: true },
                        { rank: 2, name: 'Riya Patel', pts: '1120 XP' },
                        { rank: 3, name: 'Sameer Sheikh', pts: '980 XP' },
                        { rank: 4, name: 'Priya Joshi', pts: '850 XP' },
                      ].map((lead, i) => (
                        <div key={i} className={`flex items-center justify-between p-6 rounded-[32px] border transition-all ${
                          lead.rank === 1 ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-white/5 border-white/5'
                        }`}>
                           <div className="flex items-center gap-6">
                              <span className={`text-xl font-baloo font-bold w-6 ${lead.rank === 1 ? 'text-slate-950' : 'text-slate-500'}`}>#{lead.rank}</span>
                              <div>
                                 <p className="font-bold text-sm leading-none mb-1">{lead.name}</p>
                                 <p className={`text-[10px] font-black uppercase tracking-widest ${lead.rank === 1 ? 'text-slate-800' : 'text-slate-400'}`}>Session Points</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-3">
                              <span className="font-black text-xs">{lead.pts}</span>
                              {lead.star ? <Star fill="currentColor" size={16} /> : <Target size={16} className="opacity-30" />}
                           </div>
                        </div>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
           </div>

           <div className="p-8 bg-slate-900 border-t border-white/5">
              <div className="relative group">
                 <input 
                   placeholder={activeTab === 'chat' ? "Message class..." : activeTab === 'doubts' ? "Write your doubt for Dr. Singh..." : "Cheer for the top scholars!"} 
                   className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all pr-16 placeholder:text-slate-600"
                 />
                 <button className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all">
                    <Send size={18} />
                 </button>
              </div>
              <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest text-center mt-4">
                Be kind and focused. All sessions are monitored by Vidyakul AI.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
