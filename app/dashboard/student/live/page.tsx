'use client';

import { useState } from 'react';
import { 
  Play, 
  Users, 
  MessageSquare, 
  Wifi, 
  Maximize2, 
  Mic, 
  Video, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function StudentLiveClass() {
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/student" className="p-2 hover:bg-white/5 rounded-xl transition-all">
             <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
              Std 12 - Physics: Quantum Mechanics
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live with S. Ram Singh • Session #12</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
              <Wifi size={12} /> HD Streaming
           </div>
           <div className="flex items-center gap-2 text-slate-400">
              <Users size={18} />
              <span className="text-xs font-bold">142 Watching</span>
           </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 relative bg-black flex items-center justify-center group">
          <div className="w-full h-full relative">
             {/* Placeholder for Video Player (YouTube/JWPlayer/WebRTC) */}
             <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center gap-6">
                <div className="w-24 h-24 bg-white/5 rounded-[40px] flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer border border-white/10">
                   <Play size={40} fill="white" />
                </div>
                <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px] animate-pulse">Initializing Secure Stream...</p>
             </div>

             {/* Teacher Overlay (Picture in Picture style) */}
             <div className="absolute bottom-10 left-10 w-48 h-32 bg-slate-800 rounded-2xl border-2 border-indigo-500 overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-slate-700 flex items-center justify-center font-black text-slate-500 italic">
                   FACULTY
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-[8px] font-bold">
                   <Mic size={8} className="text-emerald-400" /> ON
                </div>
             </div>

             {/* Controls Overlay */}
             <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl backdrop-blur-md transition-all border border-white/5"><Mic size={18} /></button>
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl backdrop-blur-md transition-all border border-white/5"><Video size={18} /></button>
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl backdrop-blur-md transition-all border border-white/5"><Maximize2 size={18} /></button>
             </div>
          </div>
        </div>

        {/* Dynamic Chat Sideboard */}
        <div className={`transition-all duration-500 flex flex-col bg-slate-800/30 border-l border-white/5 ${isChatOpen ? 'w-80 md:w-96' : 'w-0'}`}>
           <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Class Discussion</h3>
              <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="text-slate-500 hover:text-white"
              >
                <Sparkles size={16} />
              </button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {[
                { name: 'Tushar K.', msg: 'Sir, can you explain the observer effect again?', time: '08:42' },
                { name: 'Admin', msg: 'Please keep the discussion focused on the current topic.', time: '08:43', isAdmin: true },
                { name: 'Yash V.', msg: 'Calculations for part B are on slide 14 guys.', time: '08:45' },
              ].map((chat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${chat.isAdmin ? 'text-amber-500' : 'text-slate-400'}`}>
                      {chat.name}
                    </span>
                    <span className="text-[8px] text-slate-600">{chat.time}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-200 leading-relaxed bg-white/5 p-3 rounded-2xl rounded-tl-none">
                    {chat.msg}
                  </p>
                </div>
              ))}
           </div>

           <div className="p-6">
              <div className="relative">
                 <input 
                   placeholder="Ask a question..." 
                   className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-xs font-medium outline-none focus:border-indigo-500 transition-all pr-12"
                 />
                 <button className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-white transition-colors">
                    <MessageSquare size={18} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
