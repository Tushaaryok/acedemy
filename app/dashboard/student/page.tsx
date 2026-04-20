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
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import NotificationCenter from '@/src/components/Global/NotificationCenter';
import { DashboardSkeleton } from '@/src/components/Global/Skeleton';
import StudentAIChat from '@/src/components/Global/StudentAIChat';

export default function StudentDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const supabase = createClient();

  useEffect(() => {
    async function getDashboardData() {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
          const { data: enr } = await supabase.from('enrollments').select('*, courses(*)').eq('student_id', user.id).single();
          const { data: ntc } = await supabase.from('notices').select('*').order('created_at', { ascending: false }).limit(3);
          
          setProfile(prof);
          setEnrollment(enr);
          setNotices(ntc || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    getDashboardData();
  }, [supabase]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-12">
      {/* Dynamic Welcome Hero */}
      <div className="relative bg-slate-900 rounded-[56px] p-10 md:p-20 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-400/20">
               <Zap size={12} fill="currentColor" /> Welcome Back, Scholar
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter font-baloo">
               Hello, {profile?.full_name?.split(' ')[0] || 'Genius'}!
            </h1>
            <p className="text-slate-400 font-medium text-lg max-w-lg leading-relaxed italic">
               "{enrollment?.courses?.title || 'Batch 2024'}" is active. Your current streak is 12 days. Keep it up!
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
               <Link href="/dashboard/student/live" className="bg-indigo-600 text-white px-10 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all flex items-center gap-3 active:scale-95">
                  ENTER LIVE CLASS <ArrowRight size={18} />
               </Link>
               <button onClick={() => setIsNotifOpen(true)} className="bg-white/5 text-white border border-white/5 px-8 py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                  VIEW UPDATES
               </button>
            </div>
          </div>
          
          {/* Streak & Stats Card */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[48px] p-10 space-y-10 min-w-[300px]">
             <div className="flex justify-between items-start gap-12">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Rank</p>
                   <p className="text-4xl font-black text-white">#42</p>
                </div>
                <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-900 shadow-xl shadow-amber-500/20">
                   <Trophy size={28} />
                </div>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weekly Goal</p>
                      <p className="text-sm font-bold text-slate-200">85% Syllabus</p>
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-black text-emerald-400">12/15 Hrs</p>
                   </div>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-4/5 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[8px] font-bold">U{i}</div>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Progress & Curriculum */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* AI Academic Mentor */}
          <StudentAIChat />

          {/* Subjects Progress List */}
          <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm">
             <div className="flex justify-between items-end mb-8">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight font-baloo">Academic Progress</h3>
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
        <div className="lg:col-span-4 space-y-10">
          
          {/* Quick Notice Board */}
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center justify-between font-baloo">
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
                <h3 className="text-2xl font-black mb-1 font-baloo">Quantum Physics</h3>
                <p className="text-indigo-300 text-xs font-medium opacity-80 mb-6 tracking-wide">Weekly Assessment • 15 April</p>
                
                <div className="flex items-end gap-3 mb-6">
                   <p className="text-5xl font-black text-white">48<span className="text-xl text-indigo-400">/50</span></p>
                   <span className="bg-emerald-500 text-white px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest mb-1 shadow-lg shadow-emerald-500/30 animate-pulse">Rank #1</span>
                </div>

                <Link href="/dashboard/student/tests" className="block w-full text-center py-4 bg-white/10 hover:bg-white/20 transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                   Analyze Performance
                </Link>
             </div>
             <div className="absolute -right-10 -bottom-10 opacity-10 transform -rotate-12 group-hover:scale-110 transition-transform text-white">
                <Trophy size={180} />
             </div>
          </div>

          {/* Security Guard Mock */}
          <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-200/50 space-y-4">
             <div className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                <ShieldCheck size={16} /> Security Guard
             </div>
             <div className="space-y-1">
                <p className="text-xs font-bold text-slate-900">Current Device: <span className="text-indigo-600 font-black">Windows Desktop</span></p>
                <p className="text-[10px] text-slate-500 font-medium">Last session: Active now from Upleta, IN</p>
             </div>
             <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter leading-tight italic">
                Device locking enabled. Contact Admin to reset primary device.
             </p>
          </div>
        </div>
      </div>

      <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </div>
  );
}
