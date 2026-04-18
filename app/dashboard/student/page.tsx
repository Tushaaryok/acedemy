'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Flame, 
  Trophy, 
  Star, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Bell, 
  Zap,
  Target,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: prf } = await supabase.from('users').select('*').eq('id', session.user.id).single();
      const { data: enr } = await supabase.from('enrollments').select('*, batches(*)').eq('student_id', session.user.id).single();
      const { data: ntc } = await supabase.from('notices').select('*').order('created_at', { ascending: false }).limit(3);

      setProfile(prf);
      setEnrollment(enr);
      setNotices(ntc || []);
      setLoading(false);
    }
    fetchData();
  }, [supabase]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">Accessing Student Portal...</p>
    </div>
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 min-h-screen bg-white/50">
      {/* Premium Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-600 font-black text-[10px] uppercase tracking-widest bg-amber-50 w-fit px-3 py-1 rounded-full border border-amber-100">
             <Star size={12} fill="currentColor" /> Scholar Premium Access
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
            Welcome back, {profile?.name?.split(' ')[0] || 'Scholar'}!
          </h1>
          <p className="text-slate-500 font-medium text-lg leading-none">
            {enrollment?.batches?.name || 'Academic Batch Assigning...'} • {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white px-8 py-5 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-orange-200 transition-all">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
              <Flame size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Streak</p>
              <p className="text-2xl font-black text-slate-900 leading-none">{profile?.streak || 0} Days</p>
            </div>
          </div>
          <div className="bg-white px-8 py-5 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5 group hover:border-indigo-200 transition-all">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
              <Zap size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Learning XP</p>
              <p className="text-2xl font-black text-slate-900 leading-none">{profile?.credits || 0}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Learning Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Learning Deck */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Active Lesson Card */}
          <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">Next in path</span>
                  <h2 className="text-4xl font-black tracking-tight leading-tight">Advanced Geometry <br /> & Solid Shapes</h2>
                </div>
                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                   <Target size={32} className="text-amber-500" />
                </div>
              </div>
              
              <div className="flex items-center gap-10 pt-4 border-t border-white/5">
                <div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose">Completion</p>
                   <p className="text-2xl font-black">68%</p>
                </div>
                <div className="flex-1 space-y-3">
                   <p className="text-xs font-bold text-slate-400">Mastery Level: Intermediate</p>
                   <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[68%] rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all duration-1000"></div>
                   </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard/student/courses" className="bg-white text-slate-900 px-10 py-5 rounded-[24px] font-black flex items-center justify-center gap-3 hover:bg-amber-500 hover:text-white transition-all transform hover:scale-[1.02] active:scale-95">
                  RESUME MASTERY <ArrowRight size={20} />
                </Link>
                <div className="flex items-center gap-4 px-4 h-15">
                   <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-10 w-10 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center font-bold text-xs ring-2 ring-transparent group-hover:ring-amber-500/50 transition-all">
                           👤
                        </div>
                      ))}
                   </div>
                   <p className="text-xs font-bold text-slate-400">12 batchmates active now</p>
                </div>
              </div>
            </div>

            {/* Abstract Visuals */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -ml-24 -mb-24"></div>
          </div>

          {/* Subjects Progress List */}
          <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm">
             <div className="flex justify-between items-end mb-8">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Academic Progress</h3>
                <Link href="/dashboard/student/courses" className="text-xs font-black text-amber-600 uppercase tracking-widest hover:underline">Full Curriculum</Link>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: 'Pure Physics', prog: 85, icon: '⚡', color: 'bg-indigo-600' },
                  { name: 'Calculus Math', prog: 74, icon: '📐', color: 'bg-amber-600' },
                  { name: 'Organic Chem', prog: 42, icon: '🧪', color: 'bg-rose-600' },
                  { name: 'Applied English', prog: 92, icon: '✍️', color: 'bg-emerald-600' },
                ].map(sub => (
                  <div key={sub.name} className="flex items-center gap-5 p-4 rounded-3xl hover:bg-slate-50 transition-colors group">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{sub.icon}</div>
                    <div className="flex-1 space-y-2">
                       <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-800">{sub.name}</span>
                          <span className="text-slate-400 tracking-widest">{sub.prog}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${sub.color} rounded-full transition-all duration-1000`} style={{ width: `${sub.prog}%` }}></div>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Alerts & Performance */}
        <div className="space-y-10">
          
          {/* Quick Notice Board */}
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center justify-between">
               Bulletin Board <Bell size={18} className="text-amber-500" />
            </h3>
            <div className="space-y-4">
              {notices.length > 0 ? notices.map((ntc, i) => (
                <div key={i} className={`p-5 rounded-3xl border transition-all hover:scale-[1.02] cursor-pointer ${
                  ntc.priority === 'urgent' ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      ntc.priority === 'urgent' ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>{ntc.priority}</span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{new Date(ntc.created_at).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{ntc.title}</h4>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-1 line-clamp-2">{ntc.content}</p>
                </div>
              )) : (
                <div className="py-10 text-center text-slate-300 italic text-xs">No active notices for your batch.</div>
              )}
            </div>
            <button className="w-full mt-6 py-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all border-t border-slate-50">
               View All Notices <ChevronRight size={14} />
            </button>
          </div>

          {/* Test Performance Mock */}
          <div className="bg-indigo-900 rounded-[40px] p-8 text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden group">
             <div className="relative z-10">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                   <CheckCircle2 size={12} /> Last Test Result
                </p>
                <h3 className="text-2xl font-black mb-1">Quantum Physics</h3>
                <p className="text-indigo-300 text-xs font-medium opacity-80 mb-6 tracking-wide">Weekly Assessment • 15 April</p>
                
                <div className="flex items-end gap-3 mb-6">
                   <p className="text-5xl font-black text-white">48<span className="text-xl text-indigo-400">/50</span></p>
                   <span className="bg-emerald-500 text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest mb-1 shadow-lg shadow-emerald-500/30 animate-pulse">Rank #1</span>
                </div>

                <Link href="/dashboard/student/tests" className="block w-full text-center py-4 bg-white/10 hover:bg-white/20 transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                   Analyze Performance
                </Link>
             </div>
             
             <div className="absolute -right-10 -bottom-10 opacity-10 transform -rotate-12 group-hover:scale-110 transition-transform">
                <Trophy size={180} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
