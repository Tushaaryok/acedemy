'use client';

import { Smartphone, CheckCircle, Apple, Play } from 'lucide-react';
import Image from 'next/image';

export default function AppDownload() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Visual Side */}
          <div className="flex-1 relative">
             <div className="w-[320px] h-[640px] bg-slate-900 rounded-[60px] border-[8px] border-slate-800 shadow-2xl relative z-10 overflow-hidden mx-auto">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl"></div>
                <div className="p-8 pt-12 space-y-8">
                   <div className="h-4 w-24 bg-white/5 rounded-full"></div>
                   <div className="space-y-4">
                      <div className="h-32 w-full bg-indigo-600 rounded-[32px] animate-pulse"></div>
                      <div className="h-6 w-3/4 bg-white/10 rounded-full"></div>
                      <div className="h-4 w-1/2 bg-white/5 rounded-full"></div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-white/5 rounded-2xl"></div>
                      <div className="h-24 bg-white/5 rounded-2xl"></div>
                   </div>
                </div>
                {/* Floating HUD in phone */}
                <div className="absolute bottom-10 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
                   <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-1">Coming Soon</p>
                   <p className="text-[10px] font-bold text-white">Vidyakul App v2.0</p>
                </div>
             </div>
             {/* Glows */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
          </div>

          {/* Content Side */}
          <div className="flex-1 space-y-10 text-white text-center lg:text-left">
             <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-indigo-600/20 text-indigo-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20 mx-auto lg:mx-0">
                   <Smartphone size={14} /> NEW MOBILE EXPERIENCE
                </div>
                <h2 className="text-5xl md:text-6xl font-baloo font-bold tracking-tight leading-tight">
                   Learning That <br />
                   <span className="text-indigo-500">Goes With You.</span>
                </h2>
                <p className="text-slate-400 font-medium text-lg max-w-lg mx-auto lg:mx-0">
                   Experience Upleta's first fully digital academy on your phone. Attend live classes, take mock tests, and track progress anywhere.
                </p>
             </div>

             <div className="space-y-4">
                {[
                  "Offline Video Downloads",
                  "Instant Doubt Resolution",
                  "Daily Performance Alerts",
                  "Digital Library Access"
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 justify-center lg:justify-start">
                     <CheckCircle size={18} className="text-indigo-500" />
                     <span className="text-sm font-bold text-slate-300">{f}</span>
                  </div>
                ))}
             </div>

             <div className="flex flex-wrap gap-4 pt-10 justify-center lg:justify-start">
                <button className="bg-white text-slate-950 px-10 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-2xl hover:bg-slate-100 transition-all active:scale-95">
                   <Play size={20} fill="black" /> GOOGLE PLAY
                </button>
                <button className="bg-slate-800/50 text-white border border-white/5 px-10 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-slate-800 transition-all active:scale-95 backdrop-blur-md">
                   <Apple size={20} fill="white" /> APP STORE
                </button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
