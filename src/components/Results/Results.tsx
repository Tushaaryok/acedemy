'use client';

import { Trophy, Star, Sparkles, ChevronRight, Award } from 'lucide-react';
import './Results.css';

const topStudents = [
  { id: 1, name: 'Aarushi Patel', class: 'Std 12 Science', percent: '98.5%', img: 'https://images.unsplash.com/photo-1544717297-fa3274296901?q=80&w=200&h=200&auto=format&fit=crop' },
  { id: 2, name: 'Siddharth Rao', class: 'Std 10 Board', percent: '97.2%', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop' },
  { id: 3, name: 'Kavya Shah', class: 'Std 12 Commerce', percent: '96.8%', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop' },
  { id: 4, name: 'Dev Joshi', class: 'Std 12 Science', percent: '96.5%', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop' },
  { id: 5, name: 'Prisha Mehta', class: 'Std 10 Board', percent: '95.9%', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop' },
  { id: 6, name: 'Rohan Desai', class: 'Std 12 Science', percent: '95.1%', img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=200&h=200&auto=format&fit=crop' },
];

export default function Results() {
  return (
    <section id="results-wall" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl space-y-4">
             <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-amber-100">
                <Trophy size={12} fill="currentColor" /> THE DISTINCTION WALL
             </div>
             <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                Our Students, <br />
                <span className="text-amber-600">Our Institutional Pride.</span>
             </h2>
             <p className="text-slate-500 font-medium text-lg">
                Consistently producing city toppers and academic high-achievers year after year. 
             </p>
          </div>
          <div className="flex bg-slate-100 p-2 rounded-[28px] border border-slate-200 shadow-inner">
             <div className="px-8 py-3 bg-white text-slate-900 rounded-[20px] text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                <Award size={14} className="text-amber-500" /> SESSION 2023-24
             </div>
          </div>
        </div>
        
        {/* Continuous Smooth Marquee */}
        <div className="relative group p-4 -mx-6 md:-mx-12">
          <div className="flex gap-8 animate-marquee group-hover:pause-animation">
            {[...topStudents, ...topStudents, ...topStudents].map((student, idx) => (
              <div 
                key={`${student.id}-${idx}`} 
                className="flex-shrink-0 w-[400px] bg-white rounded-[48px] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center gap-6 group/card"
              >
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-slate-50 shadow-lg">
                    <img src={student.img} alt={student.name} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white w-8 h-8 rounded-xl flex items-center justify-center shadow-lg border-2 border-white">
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-1">
                  <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase italic">{student.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{student.class}</p>
                  <div className="pt-2">
                     <span className="text-2xl font-black text-amber-600 tracking-tighter">{student.percent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Statistics Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-24">
           {[
             { label: 'Academic Curriculum', val: 'GSEB Board', icon: <Sparkles className="text-indigo-400" /> },
             { label: 'Cumulative Distinction', val: '98.2%', icon: <Award className="text-emerald-400" /> },
             { label: 'University Placements', val: '1000+', icon: <Trophy className="text-amber-400" /> },
           ].map((hl, i) => (
             <div key={i} className="bg-slate-50 p-10 rounded-[48px] border border-slate-100 flex flex-col items-center text-center space-y-4 hover:bg-slate-100 transition-colors">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                   {hl.icon}
                </div>
                <div className="space-y-1">
                   <p className="text-3xl font-black text-slate-900 tracking-tighter">{hl.val}</p>
                   <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{hl.label}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="mt-20 text-center">
           <button className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-slate-900/40 hover:bg-amber-600 transition-all active:scale-95">
              EXPLORE FULL ARCHIVE <ChevronRight size={18} />
           </button>
        </div>
      </div>

      {/* Modern Background Accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-100/30 rounded-full blur-[100px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-[120px] translate-x-1/2" />
    </section>
  );
}
