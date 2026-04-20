'use client';

import { 
  Trophy, 
  Target, 
  Flame, 
  Zap, 
  Star, 
  Award, 
  Lock, 
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

export default function StudentAchievements() {
  const BADGES = [
    { id: '1', title: 'First Flight', desc: 'Completed your first 1:1 Live Class.', icon: <Star />, unlocked: true, color: 'text-amber-500 bg-amber-50' },
    { id: '2', title: 'Quiz Master', desc: 'Scored 100% in any periodic assessment.', icon: <Target />, unlocked: true, color: 'text-emerald-500 bg-emerald-50' },
    { id: '3', title: 'Atomic Habit', desc: 'Maintained a 7-day login streak.', icon: <Flame />, unlocked: true, color: 'text-orange-500 bg-orange-50' },
    { id: '4', title: 'Curriculum King', desc: 'Completed 100% of any subject syllabus.', icon: <Award />, unlocked: false, color: 'text-slate-400 bg-slate-50' },
    { id: '5', title: 'Helper Hand', desc: 'Resolved 10 doubts in the community.', icon: <Zap />, unlocked: false, color: 'text-slate-400 bg-slate-50' },
  ];

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-4">
           <Link href="/dashboard/student" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
              <ArrowLeft size={14} /> Back to Dashboard
           </Link>
           <h1 className="text-5xl font-baloo font-bold text-slate-900 tracking-tight">Hall of Fame</h1>
           <p className="text-slate-500 font-medium text-lg">Your academic milestones and reward badges.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white px-8 py-4 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-4">
              <Zap className="text-indigo-600" size={24} />
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase">Season XP</p>
                 <p className="text-xl font-black text-slate-900">4,280</p>
              </div>
           </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {BADGES.map((badge) => (
          <div key={badge.id} className={`p-10 rounded-[48px] border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-6 transition-all group relative overflow-hidden ${!badge.unlocked ? 'opacity-60 grayscale' : 'hover:shadow-2xl hover:-translate-y-2'}`}>
            
            <div className={`w-24 h-24 rounded-[32px] flex items-center justify-center text-3xl shadow-lg transform transition-transform group-hover:rotate-12 ${badge.color}`}>
               {badge.unlocked ? badge.icon : <Lock size={32} />}
            </div>

            <div className="space-y-2">
               <h3 className="text-2xl font-baloo font-bold text-slate-900 leading-tight">{badge.title}</h3>
               <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">{badge.desc}</p>
            </div>

            {badge.unlocked ? (
              <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                 <CheckCircle2 size={14} /> Achievement Unlocked
              </div>
            ) : (
              <div className="w-full bg-slate-50 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                 Keep Learning to Unlock
              </div>
            )}

            {/* Premium Shine Effect */}
            {badge.unlocked && (
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 -rotate-45 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
            )}
          </div>
        ))}
        
        {/* Placeholder for future growth */}
        <div className="p-10 rounded-[48px] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center space-y-4 opacity-30">
           <Trophy size={48} />
           <p className="text-[10px] font-black uppercase tracking-widest leading-loose">New Achievements Coming with Term 2</p>
        </div>
      </div>

      {/* Rewards System Info */}
      <div className="bg-indigo-600 rounded-[64px] p-12 md:p-20 text-white relative overflow-hidden group">
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
               <h2 className="text-4xl md:text-6xl font-baloo font-bold leading-none tracking-tight">Convert your XP into Scholarship Benefits.</h2>
               <p className="text-indigo-100 text-lg md:text-xl font-medium opacity-80 max-w-lg">Every lecture watched and every quiz completed brings you closer to exclusive academic rewards.</p>
               <button className="bg-white text-indigo-600 px-12 py-6 rounded-[32px] font-black text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all transform active:scale-95 shadow-2xl">
                  VIEW REDEMPTION STORE <ChevronRight size={18} className="inline ml-2" />
               </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 relative">
               <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/10 flex flex-col items-center text-center">
                  <Award size={48} className="text-amber-400 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">Scholarship</p>
                  <p className="text-2xl font-black">Up to 40% OFF</p>
               </div>
               <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/10 flex flex-col items-center text-center translate-y-12">
                  <BookOpen size={48} className="text-indigo-300 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">Premium Notes</p>
                  <p className="text-2xl font-black">Full Access</p>
               </div>
            </div>
         </div>
         <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}
