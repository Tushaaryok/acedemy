'use client';

import { 
  Users, 
  Trophy, 
  GraduationCap, 
  Atom,
  Sparkles
} from 'lucide-react';
import './StatsCounter.css';

const stats = [
  { id: 1, label: 'Success Ratio', value: '98%', icon: <Trophy />, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 2, label: 'Active Scholars', value: '480+', icon: <Users />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 3, label: 'Expert Faculty', value: '15+', icon: <GraduationCap />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 4, label: 'Distinction Wall', value: '150+', icon: <Atom />, color: 'text-rose-600', bg: 'bg-rose-50' },
];

export default function StatsCounter() {
  return (
    <section className="relative -mt-20 z-20 container mx-auto px-6">
      <div className="bg-white rounded-[48px] p-8 md:p-16 shadow-2xl shadow-slate-200/60 border border-slate-50 relative overflow-hidden group">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center space-y-4 group/item">
              <div className={`mx-auto w-16 h-16 ${stat.bg} ${stat.color} rounded-3xl flex items-center justify-center transition-all duration-500 group-hover/item:scale-110 group-hover/item:-rotate-3`}>
                 {stat.icon}
              </div>
              <div className="space-y-1">
                 <p className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Background Sparkles */}
        <div className="absolute top-4 right-4 text-amber-500/10 animate-pulse">
           <Sparkles size={80} />
        </div>
      </div>
    </section>
  );
}
