import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { 
  Calendar, 
  Users, 
  GraduationCap, 
  Clock, 
  LayoutDashboard,
  Bell,
  ArrowUpRight,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

export default async function TeacherDashboard() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  const stats = [
    { label: 'Classes Today', value: '4', icon: <Calendar size={20} />, color: 'bg-indigo-600' },
    { label: 'Avg Attendance', value: '92%', icon: <CheckCircle2 size={20} />, color: 'bg-emerald-600' },
    { label: 'Weekly Hours', value: '28h', icon: <Clock size={20} />, color: 'bg-amber-600' },
    { label: 'Total Students', value: '145', icon: <Users size={20} />, color: 'bg-rose-600' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-12 bg-white/50 min-h-screen">
      {/* Premium Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
             <LayoutDashboard size={12} /> Faculty Control Center
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Academic Hub</h1>
          <p className="text-slate-500 font-medium">Welcome back, <span className="text-slate-900 font-bold">{profile?.full_name || 'Sir'}</span>! Planning for success today?</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
             <Bell size={20} />
           </button>
           <div className="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-xl shadow-indigo-600/20">
              {profile?.full_name?.charAt(0) || 'T'}
           </div>
        </div>
      </header>

      {/* Modern Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
            <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Schedule & Classes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end">
             <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <Calendar className="text-indigo-600" /> Current Timetable
             </h2>
             <span className="text-xs font-bold text-slate-400">SATURDAY, 18 APR</span>
          </div>
          
          <div className="space-y-4">
            {[
              { time: '08:00', title: 'Std 10 - Mathematics', loc: 'Room 101', count: 42, color: 'border-amber-500' },
              { time: '10:30', title: 'Std 12 - Physics Lab', loc: 'Lab A', count: 28, color: 'border-indigo-500' },
              { time: '02:00', title: 'Std 9 - Foundation Math', loc: 'Room 204', count: 35, color: 'border-emerald-500' },
            ].map((cls, i) => (
              <div key={i} className={`flex items-center gap-6 p-6 rounded-[32px] bg-white border-l-8 ${cls.color} shadow-sm hover:shadow-md transition-all group`}>
                <div className="text-center min-w-[70px]">
                  <p className="text-lg font-black text-slate-900 leading-none">{cls.time}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase mt-1">PM</p>
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-slate-900 text-lg leading-tight">{cls.title}</h4>
                  <div className="flex items-center gap-3 mt-1 underline decoration-slate-100 underline-offset-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cls.loc}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cls.count} Students Registered</span>
                  </div>
                </div>
                <Link 
                  href="/dashboard/teacher/attendance" 
                  className="px-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-900/10"
                >
                  Mark Attendance
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Tools */}
        <div className="space-y-8">
           <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl shadow-indigo-900/20">
              <h3 className="text-xl font-black mb-2">Faculty Toolbox</h3>
              <p className="text-slate-400 text-sm font-medium mb-6">Access essential academic utilities.</p>
              
              <div className="space-y-3">
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                       <BookOpen size={18} className="text-indigo-400" />
                       <span className="text-xs font-bold uppercase tracking-widest">Post Homework</span>
                    </div>
                    <ArrowUpRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
                 </div>
                 <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                       <GraduationCap size={18} className="text-emerald-400" />
                       <span className="text-xs font-bold uppercase tracking-widest">Grade Submissions</span>
                    </div>
                    <ArrowUpRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
                 </div>
              </div>
           </div>

           <div className="bg-indigo-50 p-8 rounded-[40px] border border-indigo-100">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm mb-4">
                 <Bell size={24} />
              </div>
              <h4 className="font-black text-slate-900">Notifications</h4>
              <p className="text-xs text-slate-500 font-medium mt-1">Staff meeting today at 4:30 PM in Principal's Office.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
